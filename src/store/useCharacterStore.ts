import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { CharacterData, CharacterBasicData } from '@/types/character';
import { fetchCharacterOcid, fetchCharacterBasic } from '@/api/character';
import { useQuestStore } from './useQuestStore';
import { useBossStore } from './useBossStore';

interface CharacterStoreState {
  charactersByAccountId: Record<string, CharacterData[]>; // 키: accountId

  addCharacter: (
    accountId: string,
    server: string,
    name: string
  ) => Promise<{ success: boolean; message: string; characterId?: string }>;
  getCharacter: (
    accountId: string,
    characterId: string,
    forceUpdate?: boolean
  ) => Promise<CharacterData | null>;
  removeCharacter: (accountId: string, characterId: string) => void;
  removeCharactersByAccountId: (accountId: string) => void; // 연쇄 삭제용
  updateCharacterData: (
    accountId: string,
    characterId: string,
    updatedData: Partial<CharacterData>
  ) => void;
}

// 새 캐릭터 데이터 생성 헬퍼 함수
const createNewCharacterData = (
  ocid: string,
  lastUpdatedAt: string | null,
  basicData: CharacterBasicData
): CharacterData => ({
  id: uuidv4(),
  ocid,
  lastUpdatedAt,
  basic: basicData,
});

export const useCharacterStore = create<CharacterStoreState>()(
  persist(
    (set, get) => ({
      charactersByAccountId: {},

      addCharacter: async (accountId, server, name) => {
        if (!accountId)
          return { success: false, message: '계정 ID가 필요합니다.' }; // 계정 ID 유효성 검사
        try {
          const ocid = await fetchCharacterOcid(name, server);

          if (!ocid) throw new Error('OCID를 가져올 수 없습니다.'); // OCID 검증 추가

          const characterBasicData = await fetchCharacterBasic(ocid);
          const newCharacter = createNewCharacterData(
            ocid,
            new Date().toISOString(), // 생성 시 lastUpdatedAt 설정
            characterBasicData
          );

          set(
            produce((state: CharacterStoreState) => {
              if (!state.charactersByAccountId[accountId]) {
                state.charactersByAccountId[accountId] = [];
              }
              state.charactersByAccountId[accountId].push(newCharacter);
            })
          );

          // 새 캐릭터에 대한 퀘스트 초기화
          useQuestStore
            .getState()
            .initializeQuestsForCharacter(newCharacter.id);
          // 새 캐릭터에 대한 보스 초기화
          useBossStore.getState().initializeBossesForCharacter(newCharacter.id);
          return {
            success: true,
            message: '캐릭터가 추가되었습니다.',
            characterId: newCharacter.id,
          };
        } catch (error) {
          console.error('캐릭터 추가 중 오류:', error);
          const errorMessage =
            error instanceof Error
              ? error.message
              : '알 수 없는 오류가 발생했습니다.';
          return {
            success: false,
            message: `캐릭터 추가 실패: ${errorMessage}`,
          };
        }
      },

      getCharacter: async (accountId, characterId, forceUpdate = false) => {
        const { charactersByAccountId } = get();
        const accountCharacters = charactersByAccountId[accountId];
        if (!accountCharacters) return null;

        const character = accountCharacters.find(
          (char) => char.id === characterId
        );
        if (!character) return null;

        const now = Date.now();
        const last = character.lastUpdatedAt
          ? new Date(character.lastUpdatedAt).getTime()
          : 0;
        const isFresh = now - last < 1000 * 60 * 30; // 30분 이내 데이터는 최신으로 간주

        if (isFresh && !forceUpdate) {
          // 데이터가 최신이고 강제 업데이트가 아니면 캐시된 데이터 반환
          return character;
        }

        try {
          const updatedBasicData = await fetchCharacterBasic(character.ocid);
          const updatedCharacter: CharacterData = {
            ...character,
            basic: updatedBasicData,
            lastUpdatedAt: new Date().toISOString(),
          };

          set(
            produce((state: CharacterStoreState) => {
              const accChars = state.charactersByAccountId[accountId];
              if (accChars) {
                const charIndex = accChars.findIndex(
                  (char) => char.id === characterId
                );
                if (charIndex !== -1) {
                  accChars[charIndex] = updatedCharacter;
                }
              }
            })
          );
          return updatedCharacter;
        } catch (error) {
          console.error('캐릭터 정보 업데이트 중 오류:', error);
          return character;
        }
      },

      removeCharacter: (accountId, characterId) => {
        set(
          produce((state: CharacterStoreState) => {
            if (state.charactersByAccountId[accountId]) {
              state.charactersByAccountId[accountId] =
                state.charactersByAccountId[accountId].filter(
                  (char) => char.id !== characterId
                );
            }
          })
        );
        // 캐릭터에 대한 퀘스트 제거
        useQuestStore.getState().removeQuestsByCharacterId(characterId);
        useBossStore.getState().removeBossesByCharacterId(characterId);
      },

      removeCharactersByAccountId: (accountId) => {
        // 계정 삭제 시 호출됨
        const { charactersByAccountId } = get();
        const charactersToRemove = charactersByAccountId[accountId] || [];

        charactersToRemove.forEach((char) => {
          useQuestStore.getState().removeQuestsByCharacterId(char.id);
          useBossStore.getState().removeBossesByCharacterId(char.id);
        });

        set(
          produce((state: CharacterStoreState) => {
            delete state.charactersByAccountId[accountId];
          })
        );
      },

      updateCharacterData: (accountId, characterId, updatedData) => {
        // 캐릭터 부분 업데이트
        set(
          produce((state: CharacterStoreState) => {
            const accountChars = state.charactersByAccountId[accountId];
            if (accountChars) {
              const charIndex = accountChars.findIndex(
                (char) => char.id === characterId
              );
              if (charIndex !== -1) {
                accountChars[charIndex] = {
                  ...accountChars[charIndex],
                  ...updatedData,
                };
              }
            }
          })
        );
      },
    }),
    {
      name: 'character-data-storage',
    }
  )
);
