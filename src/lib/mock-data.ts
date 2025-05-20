import type { Account, Character, Task, Boss } from "@/types/scheduler";

export const MOCK_ACCOUNTS: Account[] = [
  { id: "acc1", name: "메이플M 계정 1" },
  { id: "acc2", name: "메이플M 계정 2" },
];

export const MOCK_CHARACTERS: Character[] = [
  {
    id: "char1",
    accountId: "acc1",
    name: "별빛마법사",
    level: 250,
    job: "비숍",
    avatarUrl: "/jobs/bishop.png",
  },
  {
    id: "char2",
    accountId: "acc1",
    name: "검은기사",
    level: 230,
    job: "다크나이트",
    avatarUrl: "/jobs/darkknight.png",
  },
  {
    id: "char3",
    accountId: "acc1",
    name: "불꽃전사",
    level: 210,
    job: "히어로",
    avatarUrl: "/jobs/hero.png",
  },
  {
    id: "char4",
    accountId: "acc1",
    name: "천둥궁수",
    level: 225,
    job: "보우마스터",
    avatarUrl: "/jobs/bowmaster.png",
  },
  {
    id: "char5",
    accountId: "acc1",
    name: "얼음법사",
    level: 240,
    job: "아크메이지",
    avatarUrl: "/jobs/suncall.png",
  },
  {
    id: "char6",
    accountId: "acc1",
    name: "용의심장",
    level: 235,
    job: "에반",
    avatarUrl: "/jobs/evan.png",
  },
  {
    id: "char7",
    accountId: "acc1",
    name: "그림자암살자덤벼",
    level: 245,
    job: "나이트로드",
    avatarUrl: "/jobs/nightroad.png",
  },
  {
    id: "char8",
    accountId: "acc1",
    name: "빛의검사",
    level: 220,
    job: "팔라딘",
    avatarUrl: "/jobs/paladin.png",
  },
  {
    id: "char9",
    accountId: "acc1",
    name: "폭풍창술사",
    level: 233,
    job: "스피어맨",
    avatarUrl: "/jobs/darkknight.png",
  },
  {
    id: "char10",
    accountId: "acc1",
    name: "달빛사냥꾼",
    level: 228,
    job: "윈드브레이커",
    avatarUrl: "/jobs/windbreaker.png",
  },
  {
    id: "char11",
    accountId: "acc2",
    name: "시간여행자",
    level: 275,
    job: "아이엘",
    avatarUrl: "/jobs/iel.png",
  },
  {
    id: "char12",
    accountId: "acc2",
    name: "시간여행자",
    level: 275,
    job: "아이엘",
    avatarUrl: "/jobs/iel.png",
  },
  {
    id: "char13",
    accountId: "acc2",
    name: "시간여행자",
    level: 275,
    job: "아이엘",
    avatarUrl: "/jobs/iel.png",
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
