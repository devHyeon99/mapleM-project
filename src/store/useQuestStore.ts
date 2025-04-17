import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { produce } from 'immer';
import { TaskData, Task } from '@/types/task';
import { TaskCategory } from '@/types/enums';
import { DEFAULT_QUEST_DATA } from '@/constants/task_data';

interface QuestStoreState {
  questsByCharacterId: Record<string, TaskData>;

  initializeQuestsForCharacter: (characterId: string) => void;
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
  resetQuests: (taskTypeOrAll?: TaskCategory | 'all') => void;
  removeQuestsByCharacterId: (characterId: string) => void;
  getQuestsByCharacterId: (characterId: string) => TaskData | undefined;
}

export const useQuestStore = create<QuestStoreState>()(
  persist(
    (set, get) => ({
      questsByCharacterId: {},

      initializeQuestsForCharacter: (characterId) => {
        set(
          produce((state: QuestStoreState) => {
            if (!state.questsByCharacterId[characterId]) {
              state.questsByCharacterId[characterId] = JSON.parse(
                JSON.stringify(DEFAULT_QUEST_DATA)
              );
            }
          })
        );
      },

      addTaskItem: ({ characterId, taskType, taskName, isDone = false }) => {
        const state = get(); // 현재 상태를 가져와서 사전 검사
        const characterQuests = state.questsByCharacterId[characterId];

        if (!characterQuests) {
          return {
            success: false,
            message: '해당 캐릭터의 퀘스트 데이터를 찾을 수 없습니다.',
          };
        }
        if (!characterQuests[taskType]) {
          // 이 경우는 initializeQuestsForCharacter가 호출되었다면 발생하지 않아야 함
          return { success: false, message: '잘못된 퀘스트 카테고리입니다.' };
        }

        if (!taskName.trim()) {
          return { success: false, message: '퀘스트 이름을 작성해주세요.' };
        }

        const questList = characterQuests[taskType] as Task[];
        if (questList.some((q) => q.name === taskName)) {
          return {
            success: false,
            message: '이미 동일한 이름의 퀘스트가 존재합니다.',
          };
        }

        const newQuest: Task = { name: taskName, do: isDone };
        set(
          produce((draft: QuestStoreState) => {
            // set 내부에서는 draft 상태를 사용
            const currentCharacterQuests =
              draft.questsByCharacterId[characterId];
            // 여기서 다시 한번 확인하는 것은 동시성 문제 방지에 도움이 될 수 있지만,
            // get()으로 이미 외부에서 체크했으므로 이 부분에서는 직접 추가합니다.
            (currentCharacterQuests[taskType] as Task[]).push(newQuest);
          })
        );
        return { success: true, message: '퀘스트 아이템이 추가되었습니다.' };
      },

      removeTaskItem: ({ characterId, taskType, taskName }) => {
        const state = get();
        const characterQuests = state.questsByCharacterId[characterId];

        if (!characterQuests || !characterQuests[taskType]) {
          return {
            success: false,
            message: '퀘스트 데이터를 찾을 수 없거나 잘못된 카테고리입니다.',
          };
        }

        const questList = characterQuests[taskType] as Task[];
        const initialLength = questList.length;

        set(
          produce((draft: QuestStoreState) => {
            const currentCharacterQuests =
              draft.questsByCharacterId[characterId];
            if (currentCharacterQuests && currentCharacterQuests[taskType]) {
              (currentCharacterQuests[taskType] as Task[]) = (
                currentCharacterQuests[taskType] as Task[]
              ).filter((q) => q.name !== taskName);
            }
          })
        );

        // 삭제 후 길이를 비교하여 실제로 삭제되었는지 확인 (선택적)
        const finalLength =
          get().questsByCharacterId[characterId]?.[taskType]?.length ??
          initialLength;
        if (initialLength > finalLength) {
          return { success: true, message: '퀘스트 아이템이 삭제되었습니다.' };
        } else {
          return {
            success: false,
            message: '삭제할 퀘스트 아이템을 찾지 못했습니다.',
          };
        }
      },

      updateTask: ({ characterId, taskType, taskName, isDone }) => {
        set(
          produce((state: QuestStoreState) => {
            const characterQuests = state.questsByCharacterId[characterId];
            if (characterQuests && characterQuests[taskType]) {
              const questList = characterQuests[taskType] as Task[];
              const questIndex = questList.findIndex(
                (q) => q.name === taskName
              );
              if (questIndex !== -1) {
                questList[questIndex].do = isDone;
              }
            }
          })
        );
      },

      resetQuests: (taskTypeOrAll = 'all') => {
        set(
          produce((state: QuestStoreState) => {
            const questsByCharacterId = state.questsByCharacterId;

            for (const characterId in questsByCharacterId) {
              const characterQuests = questsByCharacterId[characterId];
              if (!characterQuests) continue;

              const resetCategory = (category: TaskCategory) => {
                if (characterQuests[category]) {
                  characterQuests[category] = characterQuests[category].map(
                    (quest) => ({
                      ...quest,
                      do: false,
                    })
                  );
                }
              };

              if (taskTypeOrAll === 'all') {
                (Object.keys(characterQuests) as TaskCategory[]).forEach(
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

      removeQuestsByCharacterId: (characterId) => {
        set(
          produce((state: QuestStoreState) => {
            delete state.questsByCharacterId[characterId];
          })
        );
      },

      getQuestsByCharacterId: (characterId: string) => {
        return get().questsByCharacterId[characterId];
      },
    }),
    {
      name: 'quest-data-storage',
    }
  )
);
