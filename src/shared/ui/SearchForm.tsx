"use client";

import { useId } from "react";
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

// --- 메인 컴포넌트 ---
interface SearchFormProps {
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

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full max-w-4xl items-center gap-2">
        {/* 월드 선택 컴포넌트  */}
        <WorldSelect
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
                className={clsx(
                  "border-input dark:bg-input/30 flex h-12 w-full rounded-md border py-1 pr-10 pl-3 transition-colors placeholder:text-sm md:text-sm",
                  "placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50",
                  isError
                    ? "border-destructive! focus-visible:ring-destructive/50 focus-visible:ring-[3px]"
                    : "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                )}
                onFocus={() => setOpen(true)}
                onClick={() => setOpen(true)}
              />
              <button
                type="submit"
                disabled={isPending}
                className="text-muted-foreground hover:text-foreground absolute top-0 right-0 flex h-full w-10 items-center justify-center"
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
                />
              </Combobox.Positioner>
            </Combobox.Portal>
          </Combobox.Root>
        </form>
      </div>

      {/* 에러 메시지 컴포넌트 */}
      {isError && <ErrorMessage id={errorId} message={errorMessage} />}
    </div>
  );
}

// --- 월드 선택기 ---
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
}) => (
  <Select value={value} onValueChange={onValueChange}>
    <SelectTrigger disabled={disabled} className="h-12! w-[130px] shrink-0">
      <SelectValue placeholder="월드" />
    </SelectTrigger>
    <SelectContent>
      {options.map((w) => (
        <SelectItem key={w} value={w}>
          {w}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

// --- 에러 메시지 ---
const ErrorMessage = ({ id, message }: { id: string; message: string }) => (
  <div
    id={id}
    className="text-destructive animate-in slide-in-from-top-1 fade-in-0 flex items-center justify-end gap-1.5 px-1 text-xs font-medium"
    role="alert"
  >
    <AlertCircle className="size-3.5" />
    <span>{message}</span>
  </div>
);
