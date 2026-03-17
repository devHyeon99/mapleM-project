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
}

export function SearchFormWorldSelect({
  value,
  onValueChange,
  options,
}: SearchFormWorldSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        aria-label="월드 선택"
        className="bg-card dark:bg-input/50 relative z-0 h-14! w-[130px] rounded-r-none pl-7 shadow-sm focus-visible:z-10 focus-visible:ring-2"
      >
        <SelectValue placeholder="월드" />
      </SelectTrigger>
      <SelectContent position="popper" sideOffset={1}>
        {options.map((world) => (
          <SelectItem key={world} value={world}>
            {world}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
