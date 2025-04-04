import { useState } from 'react';
import { toast } from 'sonner';
import { useQuestStore } from '@/store/useQuestStore';
import { useBossStore } from '@/store/useBossStore';
import { TaskCategory } from '@/types/enums';
import { useCharacterTasks } from './useCharacterTasks';

type TaskType = 'quest' | 'boss';

export const useTaskManager = (
  characterId: string,
  category: TaskCategory,
  type: TaskType
) => {
  const [newTaskName, setNewTaskName] = useState('');
  const [open, setOpen] = useState(false);

  const { tasks, currentAccountId } = useCharacterTasks(
    characterId,
    category,
    type
  );

  const {
    addTaskItem: addQuestItem,
    removeTaskItem: removeQuestItem,
    updateTask: updateQuest,
  } = useQuestStore();

  const {
    addTaskItem: addBossItem,
    removeTaskItem: removeBossItem,
    updateTask: updateBoss,
  } = useBossStore();

  // store method 분기
  const addTaskItem = type === 'quest' ? addQuestItem : addBossItem;
  const removeTaskItem = type === 'quest' ? removeQuestItem : removeBossItem;
  const updateTask = type === 'quest' ? updateQuest : updateBoss;

  const toggleTask = (taskName: string) => {
    const task = tasks?.find((t) => t.name === taskName);
    if (!task || !currentAccountId) return;

    updateTask({
      characterId,
      taskType: category,
      taskName,
      isDone: !task.do,
    });
  };

  const addNewTask = (taskName: string) => {
    if (!currentAccountId)
      return { success: false, message: '계정을 찾을 수 없습니다.' };

    return addTaskItem({
      characterId,
      taskName,
      taskType: category,
    });
  };

  const deleteTask = (taskName: string) => {
    if (!currentAccountId)
      return { success: false, message: '계정을 찾을 수 없습니다.' };

    return removeTaskItem({
      characterId,
      taskName,
      taskType: category,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = addNewTask(newTaskName);

    if (result.success) {
      toast.success(result.message);
      setNewTaskName('');
      setOpen(false);
    } else {
      toast.error(result.message);
    }
  };

  return {
    tasks,
    newTaskName,
    setNewTaskName,
    open,
    setOpen,
    toggleTask,
    handleSubmit,
    deleteTask,
  };
};
