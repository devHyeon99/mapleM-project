import type { Account, Character, Task, Boss } from "@/types/scheduler";

export const MOCK_ACCOUNTS: Account[] = [
  { id: "acc1", name: "메이플M 계정 1" },
  { id: "acc2", name: "메이플M 계정 2" },
];

export const MOCK_CHARACTERS: Character[] = [
  {
    id: "char1",
    account_id: "acc1",
    ocid: "mock_ocid_char1",
    name: "별빛마법사",
    level: 250,
    job: "bishop",
  },
  {
    id: "char2",
    account_id: "acc1",
    ocid: "mock_ocid_char2",
    name: "검은기사",
    level: 230,
    job: "darkknight",
  },
  {
    id: "char3",
    account_id: "acc1",
    ocid: "mock_ocid_char3",
    name: "불꽃전사",
    level: 210,
    job: "hero",
  },
  {
    id: "char4",
    account_id: "acc1",
    ocid: "mock_ocid_char4",
    name: "천둥궁수",
    level: 225,
    job: "bowmaster",
  },
  {
    id: "char5",
    account_id: "acc1",
    ocid: "mock_ocid_char5",
    name: "얼음법사",
    level: 240,
    job: "suncall",
  },
  {
    id: "char6",
    account_id: "acc1",
    ocid: "mock_ocid_char6",
    name: "용의심장",
    level: 235,
    job: "evan",
  },
  {
    id: "char7",
    account_id: "acc1",
    ocid: "mock_ocid_char7",
    name: "그림자암살자덤벼",
    level: 245,
    job: "nightroad",
  },
  {
    id: "char8",
    account_id: "acc1",
    ocid: "mock_ocid_char8",
    name: "빛의검사",
    level: 220,
    job: "paladin",
  },
  {
    id: "char9",
    account_id: "acc1",
    ocid: "mock_ocid_char9",
    name: "폭풍창술사",
    level: 233,
    job: "darkknight",
  },
  {
    id: "char10",
    account_id: "acc1",
    ocid: "mock_ocid_char10",
    name: "달빛사냥꾼",
    level: 228,
    job: "windbreaker",
  },
  {
    id: "char11",
    account_id: "acc2",
    ocid: "mock_ocid_char11",
    name: "시간여행자",
    level: 275,
    job: "iel",
  },
  {
    id: "char12",
    account_id: "acc2",
    ocid: "mock_ocid_char12",
    name: "시간여행자",
    level: 275,
    job: "xenon",
  },
  {
    id: "char13",
    account_id: "acc2",
    ocid: "mock_ocid_char13",
    name: "시간여행자",
    level: 275,
    job: "mihile",
  },
];

export const MOCK_TASKS: { daily: Task[]; weekly: Task[]; monthly: Task[] } = {
  daily: [
    { id: "d-task-1", label: "몬스터파크" },
    { id: "d-task-2", label: "일일 퀘스트" },
    { id: "d-task-3", label: "자동전투 충전" },
  ],
  weekly: [{ id: "w-task-1", label: "주간 미션" }],
  monthly: [{ id: "m-task-1", label: "커닝 타워" }],
};

export const MOCK_BOSSES: { daily: Boss[]; weekly: Boss[]; monthly: Boss[] } = {
  daily: [{ id: "d-boss-1", label: "자쿰" }],
  weekly: [
    { id: "w-boss-1", label: "하드 자쿰" },
    { id: "w-boss-2", label: "노말 혼테일" },
  ],
  monthly: [{ id: "m-boss-1", label: "검은마법사" }],
};
