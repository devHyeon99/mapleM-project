"use client";

import { useId } from "react";
import { useSearchForm } from "./useSearchForm";
import {
  SearchFormField,
  type SearchFormFieldSlotClassNames,
} from "./SearchFormField";
import { SearchFormError } from "./SearchFormError";
import { useRecentSearch } from "@/shared/lib/hooks/useRecentSearch";

export interface SearchFormSlotClassNames
  extends SearchFormFieldSlotClassNames {
  error?: string;
}

interface SearchFormProps {
  historyKey: string;
  lastWorldKey: string;
  placeholder: string;
  includeAllWorld?: boolean;
  isPending?: boolean;
  onSubmit: (world: string, name: string) => void;
  onValidate?: (world: string, name: string) => boolean;
  errorMessage?: string;
}

export function SearchForm({
  historyKey,
  lastWorldKey,
  placeholder,
  includeAllWorld = false,
  isPending = false,
  onSubmit,
  onValidate,
  errorMessage = "입력값을 확인해주세요.",
}: SearchFormProps) {
  const { history, addHistory, removeHistory, clearHistory } =
    useRecentSearch(historyKey);

  const {
    world,
    setWorld,
    inputValue,
    handleInputChange,
    isError,
    worldOptions,
    handleSearch,
  } = useSearchForm({
    lastWorldKey,
    includeAllWorld,
    onSubmit: (targetWorld, targetName) => {
      addHistory(targetName, targetWorld);
      onSubmit(targetWorld, targetName);
    },
    onValidate,
  });

  const inputId = useId();
  const errorId = useId();

  return (
    <div className="flex w-full flex-col gap-2">
      <SearchFormField
        world={world}
        options={worldOptions}
        inputValue={inputValue}
        placeholder={placeholder}
        isPending={isPending}
        isError={isError}
        history={history}
        onWorldChange={setWorld}
        onInputValueChange={handleInputChange}
        onSubmitSearch={handleSearch}
        onHistoryRemove={removeHistory}
        onHistoryClear={clearHistory}
        inputId={inputId}
        errorId={errorId}
      />

      {isError && (
        <SearchFormError
          id={errorId}
          message={errorMessage}
          className="text-destructive"
        />
      )}
    </div>
  );
}
