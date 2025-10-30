"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Search } from "lucide-react";
import { clsx } from "clsx";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { SearchHistory } from "./SearchHistory";
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
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const containerRef = useRef<HTMLFormElement>(null);
  const historyListId = `${inputId}-history-list`;
  const historyLabelId = `${inputId}-history-label`;

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setIsHistoryOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <div className={clsx("flex w-full items-center gap-0", ui.controls)}>
      <WorldSelect
        value={world}
        onValueChange={onWorldChange}
        options={options}
        disabled={isPending}
      />

      <form
        ref={containerRef}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitSearch(world, inputValue);
          setIsHistoryOpen(false);
        }}
        className={clsx("relative flex-1", ui.form)}
      >
        <div className="relative w-full">
          <Input
            id={inputId}
            value={inputValue}
            placeholder={placeholder}
            autoComplete="off"
            disabled={isPending}
            aria-invalid={isError}
            aria-describedby={isError ? errorId : undefined}
            aria-controls={historyListId}
            onFocus={() => setIsHistoryOpen(true)}
            onChange={(e) => {
              onInputValueChange(e.target.value, { reason: "input-change" });
              setIsHistoryOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setIsHistoryOpen(false);
              }
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
          <SearchHistory
            history={history}
            onSelect={(item) => {
              onSubmitSearch(item.world, item.name);
              setIsHistoryOpen(false);
            }}
            onClear={onHistoryClear}
            onRemove={onHistoryRemove}
            onClose={() => setIsHistoryOpen(false)}
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

const WorldSelect = ({
  value,
  onValueChange,
  options,
  disabled,
}: {
  value: string;
  onValueChange: (val: string) => void;
  options: readonly string[];
  disabled: boolean;
}) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        disabled={disabled}
        className="relative z-0 h-14! w-[130px] shrink-0 rounded-l-3xl rounded-r-none border-r-0! pl-7 focus-visible:z-10 dark:border-0 dark:[&_svg]:text-white! dark:[&_svg]:opacity-100"
      >
        <SelectValue placeholder="월드" />
      </SelectTrigger>
      <SelectContent
        position="popper"
        sideOffset={4}
        className="-top-1.5 dark:border-none"
      >
        {options.map((w) => (
          <SelectItem key={w} value={w}>
            {w}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
