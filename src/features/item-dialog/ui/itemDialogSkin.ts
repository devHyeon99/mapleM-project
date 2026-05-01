/**
 * 게임 UI 톤에 맞춘 아이템 상세 다이얼로그 스킨 (장비·캐시 공용)
 *
 * 카드가 항상 어두운 톤이라 라이트/다크 모드에 따라 값이 바뀌는 토큰
 * (divider, secondary 등)을 쓰지 않고 game-* 팔레트로 고정한다.
 */
export const ITEM_DIALOG_SKIN = {
  contentClassName: [
    "text-game-text border-game-line bg-game-surface flex w-72 flex-col gap-1 border ring-0",
    "max-h-[calc(100dvh-12rem)] overflow-hidden overscroll-contain sm:max-h-[85vh]",
    // 우상단 닫기(X) 버튼은 기본 스타일이 테마를 타므로 같은 팔레트로 맞춤
    // (ghost 변형의 hover:text-foreground가 라이트 모드에서 글자를 검게 만들어 호버 색도 고정)
    "[&>button]:bg-game-surface-strong [&>button]:text-game-text [&>button:hover]:bg-white/15 [&>button:hover]:text-game-text",
  ].join(" "),
  bodyClassName:
    "overscroll-contain [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
  footerClassName: "bg-game-surface-strong border-game-line shrink-0",
  closeButtonClassName:
    "text-game-text hover:text-game-text h-8 border-none bg-transparent shadow-none transition-none hover:bg-white/10! active:bg-white/15!",
} as const;
