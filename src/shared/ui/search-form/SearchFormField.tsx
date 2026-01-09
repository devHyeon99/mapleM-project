"use client";

import { Loader2, Search } from "lucide-react";
import { clsx } from "clsx";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { SearchFormHistory } from "./SearchFormHistory";
import { SearchFormWorldSelect } from "./SearchFormWorldSelect";
import { useHistoryPanelController } from "./useHistoryPanelController";
import type { SearchHistoryItem } from "@/shared/lib/hooks/useRecentSearch";

export interface SearchFormFieldSlotClassNames {
  controls?: string;
  form?: string;
  input?: string;
  submitButton?: string;
  history?: string;
}

interface SearchFormFieldProps {
  world: string;
  options: readonly string[];
  inputValue: string;
  placeholder: string;
  isPending: boolean;
  isError: boolean;
  history: SearchHistoryItem[];
  onWorldChange: (world: string) => void;
  onInputValueChange: (value: string, details?: { reason: string }) => void;
  onSubmitSearch: (world: string, name: string) => void;
  onHistoryRemove: (id: string) => void;
  onHistoryClear: () => void;
  inputId: string;
  errorId: string;
  slots?: SearchFormFieldSlotClassNames;
}

export function SearchFormField({
  world,
  options,
  inputValue,
  placeholder,
  isPending,
  isError,
  history,
  onWorldChange,
  onInputValueChange,
  onSubmitSearch,
  onHistoryRemove,
  onHistoryClear,
  inputId,
  errorId,
  slots,
}: SearchFormFieldProps) {
  const ui = slots ?? {};
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
  const historyListId = `${inputId}-history-list`;
  const historyLabelId = `${inputId}-history-label`;

  return (
    <div className={clsx("flex w-full items-center gap-0", ui.controls)}>
      <SearchFormWorldSelect
        value={world}
        onValueChange={onWorldChange}
        options={options}
        disabled={isPending}
      />

      <form
        ref={containerRef}
        onKeyDownCapture={handleFormKeyDownCapture}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitSearch(world, inputValue);
          closeHistory();
        }}
        className={clsx("relative flex-1", ui.form)}
      >
        <div className="relative w-full">
          <Input
            ref={inputRef}
            id={inputId}
            value={inputValue}
            placeholder={placeholder}
            autoComplete="off"
            disabled={isPending}
            aria-invalid={isError}
            aria-describedby={isError ? errorId : undefined}
            aria-controls={historyListId}
            onFocus={handleInputFocus}
            onChange={(e) => {
              onInputValueChange(e.target.value, { reason: "input-change" });
              openHistory();
            }}
            className={clsx(
              "focus-visible:border-border h-14 rounded-l-none rounded-r-3xl pr-12 pl-4 placeholder:text-sm! focus-visible:ring-0 dark:border-none",
              ui.input,
            )}
          />
          <Button
            type="submit"
            disabled={isPending}
            variant="ghost"
            size="icon"
            className={clsx(
              "text-muted-foreground hover:text-foreground absolute top-1/2 right-3 size-8 -translate-y-1/2",
              "focus-visible:ring-ring/60 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent",
              ui.submitButton,
            )}
          >
            {isPending ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <Search className="size-5" />
            )}
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
            listId={historyListId}
            labelId={historyLabelId}
            className={clsx(
              "absolute top-[calc(100%+2px)] left-[-128px] z-[1000] w-[calc(100%+128px)] md:left-0 md:w-full",
              ui.history,
            )}
          />
        )}
      </form>
    </div>
  );
}
