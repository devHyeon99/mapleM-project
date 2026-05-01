/** 게임 UI 톤에 맞춘 아이템 상세 다이얼로그 스킨 (장비·캐시 공용) */
export const ITEM_DIALOG_SKIN = {
  contentClassName:
    "text-primary-foreground dark:text-primary flex max-h-[calc(100dvh-12rem)] w-72 flex-col gap-1 overflow-hidden overscroll-contain border-[#3E3E3E] bg-[#232323] sm:max-h-[85vh]",
  bodyClassName:
    "overscroll-contain [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
  footerClassName: "shrink-0 rounded-b-md border-[#3E3E3E]",
  closeButtonClassName:
    "h-8 border-none bg-[#323232] text-white shadow-none transition-none hover:bg-[#323232]/90! dark:hover:bg-white/10!",
} as const;
