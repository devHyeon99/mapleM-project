import { useAccountStore } from '@/store/useAccountStore';
import { useQuestStore } from '@/store/useQuestStore';
import { useBossStore } from '@/store/useBossStore';
import { TaskCategory } from '@/types/enums';
import { Task } from '@/types/task';

type TaskType = 'quest' | 'boss';

export const useCharacterTasks = (
  characterId: string,
  category: TaskCategory,
  type: TaskType
) => {
  const currentAccountId = useAccountStore((state) => state.currentAccountId);

  const questTasksByCharacterId = useQuestStore(
    (state) => state.questsByCharacterId
  );

  const bossTasksByCharacterId = useBossStore(
    (state) => state.bossesByCharacterId
  );

  const tasksByCharacterId =
    type === 'quest' ? questTasksByCharacterId : bossTasksByCharacterId;

  const tasks: Task[] | null = (() => {
    if (!characterId || !tasksByCharacterId[characterId]) return null;
    return tasksByCharacterId[characterId][category] || null;
  })();

  return { tasks, currentAccountId };
};
