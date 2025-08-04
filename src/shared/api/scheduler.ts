import { supabase } from "@/shared/api/supabase/client";
import type { ChecklistItemData } from "@/entities/scheduler";

interface DBScheduleItem {
  id: string;
  label: string;
  period: "daily" | "weekly" | "monthly";
  type: "task" | "boss";
  character_id: string;
}

export const getScheduleItems = async (characterId: string) => {
  const { data, error } = await supabase
    .from("schedule_items")
    .select("*")
    .eq("character_id", characterId);
  if (error) throw new Error(error.message);

  const items: {
    tasks: Record<"daily" | "weekly" | "monthly", DBScheduleItem[]>;
    bosses: Record<"daily" | "weekly" | "monthly", DBScheduleItem[]>;
  } = {
    tasks: { daily: [], weekly: [], monthly: [] },
    bosses: { daily: [], weekly: [], monthly: [] },
  };

  (data as DBScheduleItem[]).forEach((item) => {
    if (item.type === "task") {
      items.tasks[item.period].push(item);
    } else if (item.type === "boss") {
      items.bosses[item.period].push(item);
    }
  });

  return items;
};

// ScheduleItem 삭제
export const deleteScheduleItem = async (itemId: string) => {
  const { error } = await supabase
    .from("schedule_items")
    .delete()
    .eq("id", itemId);

  if (error) throw new Error(error.message);
  return { success: true };
};

// ScheduleItem 추가
export const addScheduleItem = async (
  newItem: Omit<ChecklistItemData, "id"> & {
    type: "task" | "boss";
    character_id: string;
  },
) => {
  const { data, error } = await supabase
    .from("schedule_items")
    .insert([newItem])
    .select();

  if (error) throw new Error(error.message);
  return data[0];
};

// ScheduleItem 수정
export const editScheduleItem = async (itemId: string, newLabel: string) => {
  const trimmed = newLabel.trim();
  if (!trimmed) throw new Error("스케줄 이름은 비어 있을 수 없습니다.");

  const { data, error } = await supabase
    .from("schedule_items")
    .update([{ label: trimmed }])
    .eq("id", itemId)
    .select();

  if (error) throw new Error(error.message);
  return data?.[0];
};

// 체크된 항목 조회
export const getCheckedItems = async (characterId: string) => {
  const { data, error } = await supabase
    .from("user_checked_items")
    .select("item_id")
    .eq("character_id", characterId);

  if (error) throw new Error(error.message);

  // { "item-id-123": true } 형태의 객체로 변환
  return data.reduce(
    (acc: { [key: string]: boolean }, item: { item_id: string }) => {
      acc[item.item_id] = true;
      return acc;
    },
    {},
  );
};

// 체크 상태 업데이트 (단일/벌크)
export const updateCheckedItems = async ({
  characterId,
  itemsToUpdate,
}: {
  characterId: string;
  itemsToUpdate: { itemId: string; isChecked: boolean }[];
}) => {
  const recordsToUpsert = itemsToUpdate
    .filter((item) => item.isChecked)
    .map((item) => ({ character_id: characterId, item_id: item.itemId }));

  const itemIdsToDelete = itemsToUpdate
    .filter((item) => !item.isChecked)
    .map((item) => item.itemId);

  // 체크된 항목은 추가 또는 업데이트 (upsert)
  if (recordsToUpsert.length > 0) {
    const { error } = await supabase
      .from("user_checked_items")
      .upsert(recordsToUpsert);
    if (error) throw new Error(error.message);
  }

  // 체크 해제된 항목은 삭제
  if (itemIdsToDelete.length > 0) {
    const { error } = await supabase
      .from("user_checked_items")
      .delete()
      .eq("character_id", characterId)
      .in("item_id", itemIdsToDelete);
    if (error) throw new Error(error.message);
  }

  return { success: true };
};
