import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { produce } from 'immer';
import { TaskData, Task } from '@/types/task';
import { TaskCategory } from '@/types/enums';
import { DEFAULT_BOSS_DATA } from '@/constants/task_data';

interface BossesStoreState {
  bossesByCharacterId: Record<string, TaskData>;

  initializeBossesForCharacter: (characterId: string) => void;
  updateTask: (params: {
    characterId: string;
    taskType: TaskCategory;
    taskName: string;
    isDone: boolean;
  }) => void;
  addTaskItem: (params: {
    characterId: string;
    taskType: TaskCategory;
    taskName: string;
    isDone?: boolean;
  }) => { success: boolean; message: string };
  removeTaskItem: (params: {
    characterId: string;
    taskType: TaskCategory;
    taskName: string;
  }) => { success: boolean; message: string };
  resetBosses: (taskTypeOrAll?: TaskCategory | 'all') => void;
  removeBossesByCharacterId: (characterId: string) => void;
  getBossesByCharacterId: (characterId: string) => TaskData | undefined;
}

export const useBossStore = create<BossesStoreState>()(
  persist(
    (set, get) => ({
      bossesByCharacterId: {},

      initializeBossesForCharacter: (characterId) => {
        set(
          produce((state: BossesStoreState) => {
            if (!state.bossesByCharacterId[characterId]) {
              state.bossesByCharacterId[characterId] = JSON.parse(
                JSON.stringify(DEFAULT_BOSS_DATA)
              );
            }
          })
        );
      },

      addTaskItem: ({ characterId, taskType, taskName, isDone = false }) => {
        const state = get(); // 현재 상태를 가져와서 사전 검사
        const characterBosses = state.bossesByCharacterId[characterId];

        if (!characterBosses) {
          return {
            success: false,
            message: '해당 캐릭터의 보스 데이터를 찾을 수 없습니다.',
          };
        }

        if (!characterBosses[taskType]) {
          // 이 경우는 initializeBossesForCharacter가 호출되었다면 발생하지 않아야 함
          return { success: false, message: '잘못된 보스 카테고리입니다.' };
        }

        if (!taskName.trim()) {
          return { success: false, message: '보스 이름을 작성해주세요.' };
        }

        const bossList = characterBosses[taskType] as Task[];
        if (bossList.some((b) => b.name === taskName)) {
          return {
            success: false,
            message: '이미 동일한 이름의 보스가 존재합니다.',
          };
        }

        const newBoss: Task = { name: taskName, do: isDone };
        set(
          produce((draft: BossesStoreState) => {
            const currentCharacterBosses =
              draft.bossesByCharacterId[characterId];
            (currentCharacterBosses[taskType] as Task[]).push(newBoss);
          })
        );
        return { success: true, message: '보스 아이템이 추가되었습니다.' };
      },

      removeTaskItem: ({ characterId, taskType, taskName }) => {
        const state = get();
        const characterBosses = state.bossesByCharacterId[characterId];

        if (!characterBosses || !characterBosses[taskType]) {
          return {
            success: false,
            message: '보스 데이터를 찾을 수 없거나 잘못된 카테고리입니다.',
          };
        }

        const bossList = characterBosses[taskType] as Task[];
        const initialLength = bossList.length;

        set(
          produce((draft: BossesStoreState) => {
            const currentCharacterBosses =
              draft.bossesByCharacterId[characterId];
            if (currentCharacterBosses && currentCharacterBosses[taskType]) {
              (currentCharacterBosses[taskType] as Task[]) = (
                currentCharacterBosses[taskType] as Task[]
              ).filter((b) => b.name !== taskName);
            }
          })
        );

        const finalLength =
          get().bossesByCharacterId[characterId]?.[taskType]?.length ??
          initialLength;
        if (initialLength > finalLength) {
          return { success: true, message: '보스 아이템이 삭제되었습니다.' };
        } else {
          return {
            success: false,
            message: '삭제할 보스 아이템을 찾지 못했습니다.',
          };
        }
      },

      updateTask: ({ characterId, taskType, taskName, isDone }) => {
        set(
          produce((state: BossesStoreState) => {
            const characterBosses = state.bossesByCharacterId[characterId];
            if (characterBosses && characterBosses[taskType]) {
              const bossList = characterBosses[taskType] as Task[];
              const bossIndex = bossList.findIndex((b) => b.name === taskName);
              if (bossIndex !== -1) {
                bossList[bossIndex].do = isDone;
              }
            }
          })
        );
      },

      resetBosses: (taskTypeOrAll = 'all') => {
        set(
          produce((state: BossesStoreState) => {
            const bossesByCharacterId = state.bossesByCharacterId;

            for (const characterId in bossesByCharacterId) {
              const characterBosses = bossesByCharacterId[characterId];
              if (!characterBosses) continue;

              const resetCategory = (category: TaskCategory) => {
                if (characterBosses[category]) {
                  characterBosses[category] = characterBosses[category].map(
                    (boss) => ({
                      ...boss,
                      do: false,
                    })
                  );
                }
              };

              if (taskTypeOrAll === 'all') {
                (Object.keys(characterBosses) as TaskCategory[]).forEach(
                  (category) => {
                    resetCategory(category);
                  }
                );
              } else {
                resetCategory(taskTypeOrAll);
              }
            }
          })
        );
      },

      removeBossesByCharacterId: (characterId) => {
        set(
          produce((state: BossesStoreState) => {
            delete state.bossesByCharacterId[characterId];
          })
        );
      },

      getBossesByCharacterId: (characterId: string) => {
        return get().bossesByCharacterId[characterId];
      },
    }),
    {
      name: 'boss-data-storage',
    }
  )
);
