"use client";

import { useState } from "react";
import { MOCK_TASKS, MOCK_BOSSES } from "@/lib/mock-data";
import type { Task } from "@/types/scheduler";

export const useScheduler = () => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {},
  );

  const handleCheckChange = (itemId: string, isChecked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [itemId]: isChecked }));
  };

  const handleBulkUpdate = (items: Task[], isChecked: boolean) => {
    setCheckedItems((prev) => {
      const newCheckedItems = { ...prev };
      items.forEach((item) => {
        newCheckedItems[item.id] = isChecked;
      });
      return newCheckedItems;
    });
  };

  const handleDeleteTask = (taskId: string) => {
    alert(`과제 삭제 기능 구현 예정: ${taskId}`);
  };

  const handleDeleteBoss = (bossId: string) => {
    alert(`보스 삭제 기능 구현 예정: ${bossId}`);
  };

  const handleEditTask = (taskId: string) => {
    alert(`과제 수정 기능 구현 예정: ${taskId}`);
  };

  const handleEditBoss = (bossId: string) => {
    alert(`보스 수정 기능 구현 예정: ${bossId}`);
  };

  const handleAddTask = (
    category: "daily" | "weekly" | "monthly",
    taskName: string,
  ) => {
    alert(`[${category}] 과제 '${taskName}' 추가 기능 구현 예정`);
  };

  const handleAddBoss = (
    category: "daily" | "weekly" | "monthly",
    bossName: string,
  ) => {
    alert(`[${category}] 보스 '${bossName}' 추가 기능 구현 예정`);
  };

  const getCompletedCount = (items: Task[]) =>
    items.filter((item) => checkedItems[item.id]).length;

  return {
    tasks: MOCK_TASKS,
    bosses: MOCK_BOSSES,
    checkedItems,
    dailyTasksCount: getCompletedCount(MOCK_TASKS.daily),
    weeklyTasksCount: getCompletedCount(MOCK_TASKS.weekly),
    monthlyTasksCount: getCompletedCount(MOCK_TASKS.monthly),
    dailyBossesCount: getCompletedCount(MOCK_BOSSES.daily),
    weeklyBossesCount: getCompletedCount(MOCK_BOSSES.weekly),
    monthlyBossesCount: getCompletedCount(MOCK_BOSSES.monthly),

    handleCheckChange,
    handleBulkUpdate,
    handleAddTask,
    handleAddBoss,
    handleDeleteTask,
    handleDeleteBoss,
    handleEditTask,
    handleEditBoss,
  };
};
