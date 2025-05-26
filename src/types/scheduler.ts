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

export interface Task {
  id: string;
  label: string;
  period: "daily" | "weekly" | "monthly";
}

export interface Boss {
  id: string;
  label: string;
  period: "daily" | "weekly" | "monthly";
}
