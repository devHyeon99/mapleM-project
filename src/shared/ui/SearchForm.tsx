"use client";

import { useId, useState } from "react";
import { Combobox } from "@base-ui/react/combobox";
import { Loader2, Search, AlertCircle } from "lucide-react";
import { clsx } from "clsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { type SearchHistoryItem } from "@/shared/model/hooks/useRecentSearch";
import { SearchHistory } from "./SearchHistory";
import { useSearchForm } from "@/shared/model/hooks/useSearchForm";

interface SearchFormProps {
  variant?: "default" | "glass"; // 스타일 분기를 위한 프롭 추가
  history: SearchHistoryItem[];
  onHistoryRemove: (id: string) => void;
  onHistoryClear: () => void;
  lastWorldKey: string;
  placeholder: string;
  includeAllWorld?: boolean;
  isPending?: boolean;
  onSubmit: (world: string, name: string) => void;
  onValidate?: (world: string, name: string) => boolean;
  errorMessage?: string;
}

export function SearchForm({
  variant = "default", // 기본값은 default
  history,
  onHistoryRemove,
  onHistoryClear,
  lastWorldKey,
  placeholder,
  includeAllWorld = false,
  isPending = false,
  onSubmit,
  onValidate,
  errorMessage = "입력값을 확인해주세요.",
}: SearchFormProps) {
  const {
    world,
    setWorld,
    inputValue,
    handleInputChange,
    open,
    setOpen,
    isError,
    worldOptions,
    handleSearch,
  } = useSearchForm({
    lastWorldKey,
    includeAllWorld,
    onSubmit,
    onValidate,
  });

  const inputId = useId();
  const errorId = useId();
  const [isMouseFocus, setIsMouseFocus] = useState(false);

  const isGlass = variant === "glass";

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full max-w-4xl items-center gap-2">
        {/* 월드 선택기 */}
        <WorldSelect
          variant={variant}
          value={world}
          onValueChange={setWorld}
          options={worldOptions}
          disabled={isPending}
        />

        {/* 검색 폼 영역 */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(world, inputValue);
          }}
          className="relative flex-1"
        >
          <Combobox.Root
            inputValue={inputValue}
            onInputValueChange={handleInputChange}
            onValueChange={(val) => {
              const item = val as SearchHistoryItem | null;
              if (item) handleSearch(item.world, item.name);
            }}
            open={open}
            onOpenChange={setOpen}
          >
            <div className="relative w-full">
              <Combobox.Input
                id={inputId}
                placeholder={placeholder}
                autoComplete="off"
                disabled={isPending}
                aria-invalid={isError}
                aria-describedby={isError ? errorId : undefined}
                onMouseDown={() => setIsMouseFocus(true)}
                onKeyDown={() => setIsMouseFocus(false)}
                onBlur={() => setIsMouseFocus(false)}
                className={clsx(
                  "flex h-12 w-full rounded-md py-1 pr-10 pl-3 transition-colors outline-none placeholder:text-sm md:text-sm",

                  // 디자인 분기
                  isGlass
                    ? "border border-white/30 bg-white/10! text-white backdrop-blur-md placeholder:text-white/70 hover:border-white/50 dark:bg-black/30!"
                    : "border-input text-foreground placeholder:text-muted-foreground dark:bg-input/30 border",

                  // 포커스/링 정책 (탭 이동 시에만)
                  isGlass
                    ? "focus-visible:ring-[3px] focus-visible:ring-white/50"
                    : "focus-visible:ring-ring/50 focus-visible:ring-[3px]",

                  // 마우스 클릭 시 포커스 링 제거
                  isMouseFocus && "focus-visible:ring-0!",

                  // 에러 상태
                  isError &&
                    "border-destructive! focus-visible:ring-destructive/50!",

                  "disabled:cursor-not-allowed disabled:opacity-50",
                )}
                onFocus={() => setOpen(true)}
                onClick={() => setOpen(true)}
              />
              <button
                type="submit"
                disabled={isPending}
                className={clsx(
                  "absolute top-0 right-0 flex h-full w-10 items-center justify-center transition-colors",
                  isGlass
                    ? "text-white/80 hover:text-white"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {isPending ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <Search className="size-5" />
                )}
                <span className="sr-only">검색</span>
              </button>
            </div>

            <Combobox.Portal>
              <Combobox.Positioner className="z-50 outline-none" sideOffset={4}>
                <SearchHistory
                  history={history}
                  onClear={onHistoryClear}
                  onRemove={onHistoryRemove}
                  variant={variant}
                />
              </Combobox.Positioner>
            </Combobox.Portal>
          </Combobox.Root>
        </form>
      </div>

      {/* 에러 메시지 (글래스 모드일 땐 텍스트 흰색 처리 고려) */}
      {isError && (
        <ErrorMessage
          id={errorId}
          message={errorMessage}
          className={isGlass ? "text-white drop-shadow-sm" : "text-destructive"}
        />
      )}
    </div>
  );
}

// --- 하위 컴포넌트: 월드 선택기 ---
const WorldSelect = ({
  variant,
  value,
  onValueChange,
  options,
  disabled,
}: {
  variant: "default" | "glass";
  value: string;
  onValueChange: (val: string) => void;
  options: readonly string[];
  disabled: boolean;
}) => {
  const isGlass = variant === "glass";

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        disabled={disabled}
        className={clsx(
          "h-12! w-[130px] shrink-0 transition-all",
          isGlass && [
            "border-white/30 bg-white/10! text-white backdrop-blur-md dark:bg-black/30!",
            "hover:border-white/50 hover:bg-white/20",
            "focus:ring-white/50! focus:ring-offset-0",
            "[&_svg]:text-white! [&_svg]:opacity-100",
          ],
        )}
      >
        <SelectValue placeholder="월드" />
      </SelectTrigger>
      <SelectContent
        onCloseAutoFocus={(event) => {
          // 만약 사용자가 이미 다른 곳 에 포커스를 주었다면
          // Radix가 포커스를 다시 트리거로 뺏어오는 동작만 막습니다.
          if (
            document.activeElement &&
            document.activeElement !== document.body
          ) {
            event.preventDefault();
          }

          // 이렇게 하면:
          // - 마우스로 Input 클릭 시: Input에 포커스 유지 (경고 발생 안 함)
          // - 키보드 Enter 시: activeElement가 body나 trigger이므로,
          //   preventDefault가 실행되지 않아 정상적으로 Trigger로 포커스 복구 -> Tab 이동 가능
        }}
        className={clsx(
          isGlass && [
            "text-primary border-white/30 bg-white/35! backdrop-blur-3xl dark:bg-black/30!",
            "focus:ring-white/50! focus:ring-offset-0",
            "[&_svg]:text-black! [&_svg]:opacity-100 dark:[&_svg]:text-white!",
          ],
        )}
      >
        {options.map((w) => (
          <SelectItem
            key={w}
            value={w}
            className="hover:bg-black/7! dark:hover:bg-white/10!"
          >
            {w}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

// --- 하위 컴포넌트: 에러 메시지 ---
const ErrorMessage = ({
  id,
  message,
  className,
}: {
  id: string;
  message: string;
  className?: string;
}) => (
  <div
    id={id}
    className={clsx(
      "animate-in slide-in-from-top-1 fade-in-0 flex items-center justify-end gap-1.5 px-1 text-xs font-bold md:text-sm",
      className,
    )}
    role="alert"
  >
    <AlertCircle className="size-4" />
    <span>{message}</span>
  </div>
);
