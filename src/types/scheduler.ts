export interface Account {
  id: string;
  name: string;
}

export interface Character {
  id: string;
  account_id: string;
  ocid: string;
  name: string;
  level: number;
  job: string;
}

export interface ChecklistItemData {
  id: string;
  label: string;
  period: "daily" | "weekly" | "monthly";
  type: "task" | "boss";
  character_id: string;
}

export type Task = ChecklistItemData;
export type Boss = ChecklistItemData;
