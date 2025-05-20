"use client";

import { useState, useMemo } from "react";
import {
  MOCK_ACCOUNTS,
  MOCK_CHARACTERS,
  MOCK_TASKS,
  MOCK_BOSSES,
} from "@/lib/mock-data";
import type { Task } from "@/types/scheduler";

export const useScheduler = () => {
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null,
  );
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(
    null,
  );
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {},
  );

  const handleAccountChange = (accountId: string) => {
    setSelectedAccountId(accountId);
    setSelectedCharacterId(null);
  };

  const handleCharacterChange = (characterId: string) => {
    if (characterId) setSelectedCharacterId(characterId);
  };

  const handleAddAccount = () => alert("계정 추가 기능 구현 예정");
  const handleDeleteAccount = (accountId: string, accountName: string) =>
    alert(`'${accountName}' 계정 삭제 기능 구현 예정 (ID: ${accountId})`);
  const handleAddCharacter = (characterName: string) =>
    alert(`'${characterName}' 캐릭터 추가 기능 구현 예정`);
  const handleDeleteCharacter = (characterId: string) => {
    const characterToDelete = MOCK_CHARACTERS.find((c) => c.id === characterId);
    alert(
      `'${characterToDelete?.name}' 캐릭터 삭제 기능 구현 예정 (ID: ${characterId})`,
    );
    setSelectedCharacterId(null);
  };

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

  const charactersForSelectedAccount = useMemo(
    () =>
      MOCK_CHARACTERS.filter((char) => char.accountId === selectedAccountId),
    [selectedAccountId],
  );
  const selectedCharacter = useMemo(
    () => MOCK_CHARACTERS.find((char) => char.id === selectedCharacterId),
    [selectedCharacterId],
  );
  const getCompletedCount = (items: Task[]) =>
    items.filter((item) => checkedItems[item.id]).length;

  return {
    accounts: MOCK_ACCOUNTS,
    tasks: MOCK_TASKS,
    bosses: MOCK_BOSSES,
    selectedAccountId,
    selectedCharacterId,
    checkedItems,
    charactersForSelectedAccount,
    selectedCharacter,
    dailyTasksCount: getCompletedCount(MOCK_TASKS.daily),
    weeklyTasksCount: getCompletedCount(MOCK_TASKS.weekly),
    monthlyTasksCount: getCompletedCount(MOCK_TASKS.monthly),
    dailyBossesCount: getCompletedCount(MOCK_BOSSES.daily),
    weeklyBossesCount: getCompletedCount(MOCK_BOSSES.weekly),
    monthlyBossesCount: getCompletedCount(MOCK_BOSSES.monthly),

    handleAccountChange,
    handleCharacterChange,
    handleAddAccount,
    handleDeleteAccount,
    handleAddCharacter,
    handleDeleteCharacter,
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
