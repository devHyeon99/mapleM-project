import type {
  Account,
  Character,
  Task,
  Boss,
  ChecklistItemData,
} from "@/types/scheduler";

// =========================================
// === 계정(Account) 목 데이터
// =========================================
export const MOCK_ACCOUNTS: Account[] = [
  { id: "acc1", name: "메이플 계정 1" },
  { id: "acc2", name: "메이플 계정 2" },
];

// =========================================
// === 캐릭터(Character) 목 데이터
// =========================================
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

// =========================================
// === 과제(Task) 목 데이터
// =========================================
export const MOCK_TASKS: Record<
  "daily" | "weekly" | "monthly",
  ChecklistItemData[]
> = {
  daily: [
    {
      id: "task-d-1",
      label: "아케인리버 일일 퀘스트",
      period: "daily",
      type: "task",
      character_id: "char1",
    },
    {
      id: "task-d-2",
      label: "몬스터 파크",
      period: "daily",
      type: "task",
      character_id: "char1",
    },
    {
      id: "task-d-3",
      label: "우르스",
      period: "daily",
      type: "task",
      character_id: "char1",
    },
    {
      id: "task-d-4",
      label: "메이플 유니온 코인 수급",
      period: "daily",
      type: "task",
      character_id: "char1",
    },
  ],
  weekly: [
    {
      id: "task-w-1",
      label: "소멸의 여로 주간 퀘스트",
      period: "weekly",
      type: "task",
      character_id: "char1",
    },
    {
      id: "task-w-2",
      label: "츄츄 아일랜드 주간 퀘스트",
      period: "weekly",
      type: "task",
      character_id: "char1",
    },
    {
      id: "task-w-3",
      label: "헤이븐 주간 퀘스트",
      period: "weekly",
      type: "task",
      character_id: "char1",
    },
  ],
  monthly: [
    {
      id: "task-m-1",
      label: "MVP 등급 보상 수령",
      period: "monthly",
      type: "task",
      character_id: "char1",
    },
  ],
};

// =========================================
// === 보스(Boss) 목 데이터
// =========================================
export const MOCK_BOSSES: Record<
  "daily" | "weekly" | "monthly",
  ChecklistItemData[]
> = {
  daily: [
    {
      id: "boss-d-1",
      label: "자쿰 (Easy)",
      period: "daily",
      type: "boss",
      character_id: "char1",
    },
    {
      id: "boss-d-2",
      label: "혼테일 (Normal)",
      period: "daily",
      type: "boss",
      character_id: "char1",
    },
    {
      id: "boss-d-3",
      label: "카웅 (Normal)",
      period: "daily",
      type: "boss",
      character_id: "char1",
    },
    {
      id: "boss-d-4",
      label: "핑크빈 (Normal)",
      period: "daily",
      type: "boss",
      character_id: "char1",
    },
  ],
  weekly: [
    {
      id: "boss-w-1",
      label: "시그너스 (Easy)",
      period: "weekly",
      type: "boss",
      character_id: "char1",
    },
    {
      id: "boss-w-2",
      label: "하드 매그너스",
      period: "weekly",
      type: "boss",
      character_id: "char1",
    },
    {
      id: "boss-w-3",
      label: "카오스 벨룸",
      period: "weekly",
      type: "boss",
      character_id: "char1",
    },
    {
      id: "boss-w-4",
      label: "카오스 파풀라투스",
      period: "weekly",
      type: "boss",
      character_id: "char1",
    },
    {
      id: "boss-w-5",
      label: "스우 (Normal)",
      period: "weekly",
      type: "boss",
      character_id: "char1",
    },
    {
      id: "boss-w-6",
      label: "데미안 (Normal)",
      period: "weekly",
      type: "boss",
      character_id: "char1",
    },
  ],
  monthly: [
    {
      id: "boss-m-1",
      label: "검은 마법사 (Hard)",
      period: "monthly",
      type: "boss",
      character_id: "char1",
    },
  ],
};

// =========================================
// === MSW 핸들러용 통합 데이터
// =========================================
export const MOCK_SCHEDULE_ITEMS: ChecklistItemData[] = [
  ...MOCK_TASKS.daily,
  ...MOCK_TASKS.weekly,
  ...MOCK_TASKS.monthly,
  ...MOCK_BOSSES.daily,
  ...MOCK_BOSSES.weekly,
  ...MOCK_BOSSES.monthly,

  // char2 - task
  ...MOCK_TASKS.daily.map((item) => ({
    ...item,
    id: `char2-${item.id}`,
    character_id: "char2",
  })),
  ...MOCK_TASKS.weekly.map((item) => ({
    ...item,
    id: `char2-${item.id}`,
    character_id: "char2",
  })),

  // char3 - task + boss
  ...MOCK_TASKS.daily.map((item) => ({
    ...item,
    id: `char3-${item.id}`,
    character_id: "char3",
  })),
  ...MOCK_BOSSES.weekly.map((item) => ({
    ...item,
    id: `char3-${item.id}`,
    character_id: "char3",
  })),
];

// =========================================
// === 체크된 항목
// =========================================
export const MOCK_CHECKED_ITEMS: { character_id: string; item_id: string }[] = [
  { character_id: "char1", item_id: "task-d-1" },
  { character_id: "char1", item_id: "boss-w-2" },
  { character_id: "char2", item_id: "char2-task-d-2" },
];
