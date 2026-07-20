"use client";

import { Search } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { SearchFormHistory } from "./SearchFormHistory";
import { SearchFormWorldSelect } from "./SearchFormWorldSelect";
import { useHistoryPanelController } from "./useHistoryPanelController";
import type { SearchHistoryItem } from "@/shared/lib/hooks/useRecentSearch";
import { cn } from "@/shared/lib/utils";

const FIELD_SIZES = {
  lg: {
    world: "h-14! w-[130px] pl-7",
    input: "h-14 pr-12 pl-4",
    submit: "right-3 size-8",
    icon: "size-5",
    history: "left-[-130px] w-[calc(100%+130px)] md:left-0 md:w-full",
  },
  sm: {
    world:
      "h-10! w-[116px] pl-4 border-muted-foreground/30 dark:border-transparent",
    input:
      "h-10 pr-10 pl-3 border-muted-foreground/30 border-l-transparent dark:border-transparent",
    submit: "right-2 size-7",
    icon: "size-4",
    history: "left-[-116px] w-[calc(100%+116px)]",
  },
} as const;

export type SearchFormSize = keyof typeof FIELD_SIZES;

interface SearchFormFieldProps {
  world: string;
  options: readonly string[];
  inputValue: string;
  placeholder: string;
  isError: boolean;
  history: SearchHistoryItem[];
  onWorldChange: (world: string) => void;
  onInputValueChange: (value: string) => void;
  onSubmitSearch: (world: string, name: string) => void;
  onHistoryRemove: (id: string) => void;
  onHistoryClear: () => void;
  inputId: string;
  errorId: string;
  size: SearchFormSize;
}

export function SearchFormField({
  world,
  options,
  inputValue,
  placeholder,
  isError,
  history,
  onWorldChange,
  onInputValueChange,
  onSubmitSearch,
  onHistoryRemove,
  onHistoryClear,
  inputId,
  errorId,
  size,
}: SearchFormFieldProps) {
  const sizing = FIELD_SIZES[size];
  const {
    isHistoryOpen,
    containerRef,
    inputRef,
    historyPanelRef,
    openHistory,
    closeHistory,
    closeHistoryAndFocusInput,
    handleInputFocus,
    handleFormKeyDownCapture,
  } = useHistoryPanelController();
  const historyLabelId = `${inputId}-history-label`;

  return (
    <div className="flex w-full items-center rounded-2xl shadow-sm">
      <SearchFormWorldSelect
        value={world}
        onValueChange={onWorldChange}
        options={options}
        className={sizing.world}
      />

      <form
        ref={containerRef}
        onKeyDownCapture={handleFormKeyDownCapture}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitSearch(world, inputValue);
          closeHistory();
        }}
        className="relative flex-1"
      >
        <div className="relative w-full">
          <Input
            ref={inputRef}
            id={inputId}
            value={inputValue}
            placeholder={placeholder}
            aria-label={placeholder}
            autoComplete="off"
            aria-invalid={isError}
            aria-describedby={isError ? errorId : undefined}
            onFocus={handleInputFocus}
            onChange={(e) => {
              onInputValueChange(e.target.value);
              openHistory();
            }}
            className={cn(
              "bg-card dark:bg-input/50 relative rounded-l-none placeholder:text-sm focus-visible:ring-2",
              sizing.input,
            )}
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className={cn(
              "text-muted-foreground hover:text-foreground focus-visible:ring-ring/60 absolute inset-y-0 my-auto focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent",
              sizing.submit,
            )}
          >
            <Search className={sizing.icon} />
            <span className="sr-only">검색</span>
          </Button>
        </div>

        {isHistoryOpen && (
          <SearchFormHistory
            history={history}
            onSelect={(item) => {
              onSubmitSearch(item.world, item.name);
              closeHistory();
            }}
            onClear={onHistoryClear}
            onRemove={onHistoryRemove}
            onClose={closeHistoryAndFocusInput}
            containerRef={historyPanelRef}
            labelId={historyLabelId}
            className={cn(
              "absolute top-[calc(100%+4px)] z-[1000]",
              sizing.history,
            )}
          />
        )}
      </form>
    </div>
  );
}
