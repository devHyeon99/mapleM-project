"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

interface SearchFormWorldSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: readonly string[];
  disabled: boolean;
}

export function SearchFormWorldSelect({
  value,
  onValueChange,
  options,
  disabled,
}: SearchFormWorldSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        disabled={disabled}
        className="border-border bg-card hover:bg-accent/5 dark:bg-card dark:hover:bg-input/50 relative z-0 h-14! w-[130px] shrink-0 rounded-l-3xl rounded-r-none border-r-0! pl-7 focus-visible:z-10 dark:border-0"
      >
        <SelectValue placeholder="월드" />
      </SelectTrigger>
      <SelectContent
        position="popper"
        sideOffset={4}
        className="-top-1.5 dark:border-none"
      >
        {options.map((world) => (
          <SelectItem
            className="focus:bg-accent/50 dark:focus:bg-input/40"
            key={world}
            value={world}
          >
            {world}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
