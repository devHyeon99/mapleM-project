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
        className="relative z-0 h-14! w-[130px] shrink-0 rounded-l-3xl rounded-r-none border-r-0! pl-7 focus-visible:z-10 dark:border-0 dark:[&_svg]:text-white! dark:[&_svg]:opacity-100"
      >
        <SelectValue placeholder="월드" />
      </SelectTrigger>
      <SelectContent
        position="popper"
        sideOffset={4}
        className="-top-1.5 dark:border-none"
      >
        {options.map((world) => (
          <SelectItem key={world} value={world}>
            {world}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
