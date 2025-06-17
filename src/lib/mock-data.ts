import type { Account, Character, ChecklistItemData } from "@/types/scheduler";

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
    ocid: "38399c64139340bbce03ca210c92a21373e6af100a96c484cebf1f0bc32edfe9efe8d04e6d233bd35cf2fabdeb93fb0d",
    name: "자유",
    level: 266,
    job: "나이트워커",
  },

  {
    id: "char2",
    account_id: "acc1",
    ocid: "0e54ea9c6df905765986dbc1fe038ae47f79cce6fb7461b6eec11fc637561cdfefe8d04e6d233bd35cf2fabdeb93fb0d",
    name: "핑이",
    level: 230,
    job: "비숍",
  },

  {
    id: "char3",
    account_id: "acc1",
    ocid: "39c85d1df68930e7d5f02dc84b676af9ecb07b216b929b154fb48a90b93ec794efe8d04e6d233bd35cf2fabdeb93fb0d",
    name: "벨룸",
    level: 271,
    job: "메르세데스",
  },

  {
    id: "char4",
    account_id: "acc1",
    ocid: "8138e7a25b8fa9ccae7798715254189082efa344fecaa82352dcb235a46af220efe8d04e6d233bd35cf2fabdeb93fb0d",
    name: "엔버",
    level: 273,
    job: "엔젤릭버스터",
  },

  {
    id: "char5",
    account_id: "acc1",
    ocid: "14d2efbbfc6067cfb35e41f14f8fc0d4e1d42800eb5d76f5ec8698fe99cf6a69efe8d04e6d233bd35cf2fabdeb93fb0d",
    name: "영웅",
    level: 272,
    job: "은월",
  },

  {
    id: "char6",
    account_id: "acc1",
    ocid: "3c151d48c683e88f11cf4b0854f2d47ca173574ec7a99fbb7799e748120e969fefe8d04e6d233bd35cf2fabdeb93fb0d",
    name: "훈련",
    level: 269,
    job: "호영",
  },

  {
    id: "char7",
    account_id: "acc1",
    ocid: "7a26c041016ad7d466a31519a0c707cfe9505a44e7b73b2a2a19fd3b30eb1fb4efe8d04e6d233bd35cf2fabdeb93fb0d",
    name: "은망",
    level: 271,
    job: "나이트로드",
  },

  {
    id: "char8",
    account_id: "acc1",
    ocid: "23e8a38fc8074c7d2b15ede2c6bcdc78fec49a79af0a6d1726f902b2ce949041efe8d04e6d233bd35cf2fabdeb93fb0d",
    name: "시리",
    level: 263,
    job: "아델",
  },

  {
    id: "char9",
    account_id: "acc1",
    ocid: "cb4ba0454ad0a4f9c5992b6533e014f2fd7895ccc31a977b4c0c30965eff38b2efe8d04e6d233bd35cf2fabdeb93fb0d",
    name: "레벨",
    level: 274,
    job: "스트라이커",
  },

  {
    id: "char10",
    account_id: "acc1",
    ocid: "3976d82253f9c49d4bd3fd34ad41fca848d23ffc682a8073b8d0c5662d2dfb52efe8d04e6d233bd35cf2fabdeb93fb0d",
    name: "달빛사냥꾼",
    level: 228,
    job: "윈드브레이커",
  },

  {
    id: "char11",
    account_id: "acc2",
    ocid: "38399c64139340bbce03ca210c92a213b6e41df767abc41080e558d2daa259cbefe8d04e6d233bd35cf2fabdeb93fb0d",
    name: "시간여행자",
    level: 275,
    job: "아이엘",
  },

  {
    id: "char12",
    account_id: "acc2",
    ocid: "mock_ocid_char12",
    name: "시간여행자",
    level: 275,
    job: "제논",
  },

  {
    id: "char13",
    account_id: "acc2",
    ocid: "mock_ocid_char13",
    name: "시간여행자",
    level: 275,
    job: "미하일",
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
