"use client";

import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getScheduleItems,
  getCheckedItems,
  updateCheckedItems,
  deleteScheduleItem,
  addScheduleItem,
  editScheduleItem,
} from "@/api/scheduler";
import type { ChecklistItemData } from "@/types/scheduler";
import { toast } from "sonner";

export const useScheduler = (characterId: string | null) => {
  const queryClient = useQueryClient();
  const scheduleQueryKey = ["schedule", characterId];
  const checkedItemsQueryKey = ["checkedItems", characterId];

  // =========================================
  // === 데이터 조회 (useQuery)
  // =========================================
  const {
    data: items = {
      tasks: { daily: [], weekly: [], monthly: [] },
      bosses: { daily: [], weekly: [], monthly: [] },
    },
    isLoading: isLoadingItems,
    isFetching: isFetchingItems,
  } = useQuery({
    queryKey: scheduleQueryKey,
    queryFn: () => getScheduleItems(characterId!),
    enabled: !!characterId,
    staleTime: 1000 * 60 * 5,
    placeholderData: {
      tasks: { daily: [], weekly: [], monthly: [] },
      bosses: { daily: [], weekly: [], monthly: [] },
    },
  });

  const { data: checkedItems = {}, isLoading: isLoadingCheckedItems } =
    useQuery({
      queryKey: checkedItemsQueryKey,
      queryFn: () => getCheckedItems(characterId!),
      enabled: !!characterId,
      staleTime: 1000 * 60 * 5,
      placeholderData: {},
    });

  // =========================================
  // === 데이터 변경 (useMutation)
  // =========================================

  const { mutate: updateChecks } = useMutation({
    mutationFn: updateCheckedItems,
    onMutate: async ({ itemsToUpdate }) => {
      await queryClient.cancelQueries({ queryKey: checkedItemsQueryKey });
      const previousCheckedItems =
        queryClient.getQueryData<Record<string, boolean>>(checkedItemsQueryKey);

      const newCheckedItems = { ...previousCheckedItems };
      itemsToUpdate.forEach(({ itemId, isChecked }) => {
        if (isChecked) newCheckedItems[itemId] = true;
        else delete newCheckedItems[itemId];
      });
      queryClient.setQueryData(checkedItemsQueryKey, newCheckedItems);

      return { previousCheckedItems };
    },
    onError: (err, variables, context) => {
      toast.error("체크 상태 변경에 실패했습니다.");
      if (context?.previousCheckedItems) {
        queryClient.setQueryData(
          checkedItemsQueryKey,
          context.previousCheckedItems,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: checkedItemsQueryKey });
    },
  });

  const { mutate: deleteItem } = useMutation({
    mutationFn: deleteScheduleItem,
    onMutate: async (itemId: string) => {
      await queryClient.cancelQueries({ queryKey: scheduleQueryKey });
      const previousItems =
        queryClient.getQueryData<typeof items>(scheduleQueryKey);

      const newItems = JSON.parse(JSON.stringify(previousItems));
      for (const type of ["tasks", "bosses"]) {
        for (const period of ["daily", "weekly", "monthly"]) {
          newItems[type][period] = newItems[type][period].filter(
            (item: ChecklistItemData) => item.id !== itemId,
          );
        }
      }
      queryClient.setQueryData(scheduleQueryKey, newItems);

      toast.success("항목이 삭제되었습니다.");
      return { previousItems };
    },
    onError: (err, variables, context) => {
      toast.error("삭제에 실패했습니다. 데이터를 복구합니다.");
      if (context?.previousItems) {
        queryClient.setQueryData(scheduleQueryKey, context.previousItems);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: scheduleQueryKey });
    },
  });

  const { mutate: addItem } = useMutation({
    mutationFn: addScheduleItem,
    onMutate: async (newItemData) => {
      await queryClient.cancelQueries({ queryKey: scheduleQueryKey });
      const previousItems =
        queryClient.getQueryData<typeof items>(scheduleQueryKey);

      const optimisticItem: ChecklistItemData = {
        id: `optimistic-${Date.now()}`,
        ...newItemData,
      };

      const newItems = JSON.parse(JSON.stringify(previousItems));
      newItems[newItemData.type === "task" ? "tasks" : "bosses"][
        newItemData.period
      ].push(optimisticItem);
      queryClient.setQueryData(scheduleQueryKey, newItems);

      toast.success("항목이 추가되었습니다.");
      return { previousItems };
    },
    onError: (err, variables, context) => {
      toast.error("추가에 실패했습니다. 데이터를 복구합니다.");
      if (context?.previousItems) {
        queryClient.setQueryData(scheduleQueryKey, context.previousItems);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: scheduleQueryKey });
    },
  });

  const { mutate: editItem } = useMutation({
    mutationFn: ({ id, newLabel }: { id: string; newLabel: string }) =>
      editScheduleItem(id, newLabel),
    onMutate: async ({ id, newLabel }) => {
      await queryClient.cancelQueries({ queryKey: scheduleQueryKey });
      const previousItems =
        queryClient.getQueryData<typeof items>(scheduleQueryKey);

      const newItems = JSON.parse(JSON.stringify(previousItems));
      for (const type of ["tasks", "bosses"]) {
        for (const period of ["daily", "weekly", "monthly"]) {
          newItems[type][period] = newItems[type][period].map(
            (item: ChecklistItemData) =>
              item.id === id ? { ...item, label: newLabel } : item,
          );
        }
      }
      queryClient.setQueryData(scheduleQueryKey, newItems);

      toast.success("항목이 수정되었습니다.");
      return { previousItems };
    },
    onError: (err, variables, context) => {
      toast.error("수정에 실패했습니다. 데이터를 복구합니다.");
      if (context?.previousItems) {
        queryClient.setQueryData(scheduleQueryKey, context.previousItems);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: scheduleQueryKey });
    },
  });

  // =========================================
  // === 핸들러 함수 및 계산된 값
  // =========================================
  const handleCheckChange = (itemId: string, isChecked: boolean) => {
    updateChecks({
      characterId: characterId!,
      itemsToUpdate: [{ itemId, isChecked }],
    });
  };
  const handleBulkUpdate = (items: ChecklistItemData[], isChecked: boolean) => {
    const itemsToUpdate = items.map((item) => ({ itemId: item.id, isChecked }));
    updateChecks({ characterId: characterId!, itemsToUpdate });
  };

  const handleDeleteTask = (taskId: string) => deleteItem(taskId);
  const handleDeleteBoss = (bossId: string) => deleteItem(bossId);

  const handleAddTask = (
    period: "daily" | "weekly" | "monthly",
    label: string,
  ) => {
    addItem({ character_id: characterId!, label, period, type: "task" });
  };
  const handleAddBoss = (
    period: "daily" | "weekly" | "monthly",
    label: string,
  ) => {
    addItem({ character_id: characterId!, label, period, type: "boss" });
  };
  const handleEditTask = (id: string, newLabel: string) =>
    editItem({ id, newLabel });
  const handleEditBoss = (id: string, newLabel: string) =>
    editItem({ id, newLabel });

  const { tasks, bosses } = items;
  const counts = useMemo(() => {
    const getCompletedCount = (items: ChecklistItemData[]) =>
      items.filter((item) => checkedItems[item.id]).length;
    return {
      dailyTasksCount: getCompletedCount(tasks.daily),
      weeklyTasksCount: getCompletedCount(tasks.weekly),
      monthlyTasksCount: getCompletedCount(tasks.monthly),
      dailyBossesCount: getCompletedCount(bosses.daily),
      weeklyBossesCount: getCompletedCount(bosses.weekly),
      monthlyBossesCount: getCompletedCount(bosses.monthly),
    };
  }, [tasks, bosses, checkedItems]);

  return {
    tasks,
    bosses,
    checkedItems,
    ...counts,
    isLoading: isLoadingItems || isFetchingItems || isLoadingCheckedItems,
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
