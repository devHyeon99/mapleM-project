"use client";

import { Search } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { SearchFormHistory } from "./SearchFormHistory";
import { SearchFormWorldSelect } from "./SearchFormWorldSelect";
import { useHistoryPanelController } from "./useHistoryPanelController";
import type { SearchHistoryItem } from "@/shared/lib/hooks/useRecentSearch";

interface SearchFormFieldProps {
  label: string;
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
}

export function SearchFormField({
  label,
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
}: SearchFormFieldProps) {
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
    <div role="search" aria-label={label} className="flex w-full items-center">
      <SearchFormWorldSelect
        value={world}
        onValueChange={onWorldChange}
        options={options}
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
            className="bg-card dark:bg-input/50 relative h-14 rounded-l-none pr-12 pl-4 shadow-sm placeholder:text-sm focus-visible:ring-2"
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/60 absolute top-1/2 right-3 size-8 -translate-y-1/2 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent"
          >
            <Search className="size-5" />
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
            className="absolute top-[calc(100%+4px)] left-[-130px] z-[1000] w-[calc(100%+130px)] md:left-0 md:w-full"
          />
        )}
      </form>
    </div>
  );
}
