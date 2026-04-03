import type { ReactNode } from "react";

import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

type Props = {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  disabled?: boolean;
  onValueChange: (value: string) => void;
  children: ReactNode;
};

// 라벨 + Select 조합. 시뮬레이터 설정 카드들이 공통으로 사용한다.
export function SelectField({
  id,
  label,
  value,
  placeholder,
  disabled = false,
  onValueChange,
  children,
}: Props) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-muted-foreground">
        {label}
      </Label>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </div>
  );
}
