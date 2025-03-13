import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Account, Character } from '@/types/account';

interface AccountState {
  accounts: Account[];
  selectionMode: boolean;
  selectedIds: string[];
  currentAccountId: string;
  addAccount: (
    name: string,
    memo: string
  ) => { success: boolean; message: string };
  toggleSelectionMode: () => void;
  selectAccount: (id: string, selected: boolean) => void;
  resetSelection: () => void;
  deleteSelectedAccounts: () => { success: boolean; message: string };
  addCharacter: (accountId: string, server: string, name: string) => void; // 캐릭터 추가
  removeCharacter: (accountId: string, characterId: string) => void; // 캐릭터 삭제
  setCurrentAccountId: (id: string) => void; // 현재 계정 ID 설정 함수 추가
}

export const useAccountStore = create<AccountState>()(
  persist(
    (set, get) => ({
      accounts: [],
      selectionMode: false,
      selectedIds: [],
      currentAccountId: '',
      addAccount: (name: string, memo: string) => {
        const { accounts } = get();
        if (accounts.length >= 3) {
          return {
            success: false,
            message: '계정 추가는 3개 까지만 가능합니다.',
          };
        }
        if (name === '' || memo === '') {
          return {
            success: false,
            message: '이름 혹은 메모를 작성해주세요.',
          };
        }
        const newAccount: Account = {
          id: uuidv4(),
          name,
          subtitle: memo,
          content: '메롱',
          characters: [], // 빈 캐릭터 배열 초기화
        };
        set((state) => ({ accounts: [...state.accounts, newAccount] }));
        return {
          success: true,
          message: '계정 추가가 성공적으로 완료되었습니다.',
        };
      },
      toggleSelectionMode: () => {
        set((state) => ({
          selectionMode: !state.selectionMode,
          selectedIds: state.selectionMode ? [] : state.selectedIds,
        }));
      },
      selectAccount: (id: string, selected: boolean) => {
        set((state) => {
          if (selected) {
            return { selectedIds: [...state.selectedIds, id] };
          } else {
            return { selectedIds: state.selectedIds.filter((x) => x !== id) };
          }
        });
      },
      resetSelection: () => set({ selectedIds: [] }),
      deleteSelectedAccounts: () => {
        set((state) => ({
          accounts: state.accounts.filter(
            (account) => !state.selectedIds.includes(account.id)
          ),
          selectedIds: [],
          selectionMode: !state.selectionMode,
        }));
        return { success: true, message: '선택한 계정이 삭제되었습니다.' };
      },
      addCharacter: (accountId: string, server: string, name: string) => {
        const newCharacter: Character = {
          id: uuidv4(),
          server,
          name,
        };
        set((state) => ({
          accounts: state.accounts.map((acc) =>
            acc.id === accountId
              ? { ...acc, characters: [...acc.characters, newCharacter] }
              : acc
          ),
        }));
      },
      removeCharacter: (accountId: string, characterId: string) => {
        set((state) => ({
          accounts: state.accounts.map((acc) =>
            acc.id === accountId
              ? {
                  ...acc,
                  characters: acc.characters.filter(
                    (char) => char.id !== characterId
                  ),
                }
              : acc
          ),
        }));
      },
      setCurrentAccountId: (id: string) => {
        set({ currentAccountId: id });
      },
    }),
    {
      name: 'account-storage',
      partialize: (state) => ({ accounts: state.accounts }), // currentAccountId는 저장하지 않음
    }
  )
);
