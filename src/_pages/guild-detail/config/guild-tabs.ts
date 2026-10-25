export const GUILD_TABS = [
  { value: "members", label: "길드원" },
  { value: "skills", label: "길드 스킬" },
  { value: "buildings", label: "길드 시설물" },
  { value: "ability", label: "길드 어빌리티" },
] as const;

export type GuildTabKey = (typeof GUILD_TABS)[number]["value"];

// 탭 콘텐츠 높이가 달라도 탭을 옮길 때 화면이 밀리지 않게 잡아두는 최소 높이
// 스켈레톤은 같은 값을 고정 높이로 써서 로딩 전후 레이아웃을 유지한다
// Tailwind가 클래스명을 정적으로 스캔하므로 문자열을 조립하지 않고 통째로 둠
export const TAB_MIN_HEIGHT_CLASS = "min-h-[calc(100svh-24rem)]";
export const TAB_HEIGHT_CLASS = "h-[calc(100svh-24rem)]";
