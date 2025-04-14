import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { AccountData } from '@/types/account';
import { useCharacterStore } from './useCharacterStore';
import { QuestResetTimestamps } from '@/types/reset';

interface AccountState {
  accounts: AccountData[];
  currentAccountId: string;
  resetTimestamps: QuestResetTimestamps;

  addAccount: (name: string) => { success: boolean; message: string };
  deleteSelectedAccount: (id: string) => { success: boolean; message: string };
  updateAccount: (
    accountId: string,
    updatedAccountData: Partial<AccountData>
  ) => void;
  setCurrentAccountId: (id: string) => void;
  updateResetTimestamps: (timestamps: QuestResetTimestamps) => void;
}

// 새 계정 데이터 생성 헬퍼 함수
const createNewAccountData = (name: string): AccountData => ({
  id: uuidv4(),
  name,
});

export const useAccountStore = create<AccountState>()(
  persist(
    (set, get) => ({
      accounts: [],
      currentAccountId: '',
      resetTimestamps: {
        daily: null,
        weekly: null,
        'weekly-thursday': null,
        monthly: null,
      }, // 기본 또는 초기값

      addAccount: (name) => {
        const { accounts } = get();
        if (accounts.length >= 4) {
          return {
            success: false,
            message: '계정 추가는 4개 까지만 가능합니다.',
          };
        }
        if (!name.trim()) {
          // 공백 제거 후 유효성 검사
          return { success: false, message: '이름을 작성해주세요.' };
        }
        const newAccount = createNewAccountData(name);
        set({ accounts: [...accounts, newAccount] });
        return {
          success: true,
          message: '계정 추가가 성공적으로 완료되었습니다.',
        };
      },

      deleteSelectedAccount: (id) => {
        if (id.length === 0) {
          return { success: false, message: '삭제할 계정을 선택해주세요.' };
        }

        useCharacterStore.getState().removeCharactersByAccountId(id);

        set(
          produce((state: AccountState) => {
            state.accounts = state.accounts.filter(
              (acc) => !id.includes(acc.id)
            );
            if (id.includes(state.currentAccountId)) {
              state.currentAccountId =
                state.accounts.length > 0 ? state.accounts[0].id : '';
            }
          })
        );
        return { success: true, message: '선택한 계정이 삭제되었습니다.' };
      },

      updateAccount: (accountId, updatedAccountData) =>
        set(
          produce((state: AccountState) => {
            const index = state.accounts.findIndex(
              (acc) => acc.id === accountId
            );
            if (index !== -1) {
              state.accounts[index] = {
                ...state.accounts[index],
                ...updatedAccountData,
              };
            }
          })
        ),

      setCurrentAccountId: (id) => set({ currentAccountId: id }),
      updateResetTimestamps: (timestamps) =>
        set({ resetTimestamps: timestamps }),
    }),
    {
      name: 'account-data-storage',
      partialize: (state) => ({
        accounts: state.accounts,
        currentAccountId: state.currentAccountId,
        resetTimestamps: state.resetTimestamps,
      }),
    }
  )
);
