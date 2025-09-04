"use client";

import { EquipmentSetInfo, formatSetName } from "@/entities/item";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import { Badge } from "@/shared/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from "@/shared/ui/dialog";
import { Search } from "lucide-react";

interface SetEffectItemProps {
  info: EquipmentSetInfo;
}

export const SetEffectItem = ({ info }: SetEffectItemProps) => {
  const options = info.set_option.split(/,(?!\d{3})/).map((o) => o.trim());

  return (
    <li className="bg-card hover:bg-muted/50 flex flex-col items-center justify-between rounded-lg border p-3 shadow-sm transition-colors">
      {/* 좌측: 세트 이름 및 개수 */}
      <div className="flex w-full flex-col gap-1">
        <span className="text-sm font-semibold">{info.set_name}</span>
        <Badge
          variant="secondary"
          className="text-primary border-border w-fit rounded-sm py-0 text-xs font-bold"
        >
          {info.set_count}세트 효과
        </Badge>
      </div>

      {/* 우측: 상세 보기 버튼 (Dialog Trigger) */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="text-muted-foreground h-8 w-8 cursor-pointer self-end"
            aria-label={`${info.set_name} 옵션 보기`}
          >
            <Search className="size-5" />
          </Button>
        </DialogTrigger>

        {/* 다이얼로그 내용 */}
        <DialogContent className="max-h-[80vh] overflow-y-auto rounded-lg px-4 sm:w-full sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {formatSetName(info.set_name, info.set_count)}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              해당 세트 효과의 상세 옵션 목록입니다.
            </DialogDescription>
          </DialogHeader>

          <Separator className="my-2" />

          <ul className="grid grid-cols-2 gap-y-1 py-2 sm:grid-cols-2">
            {options.map((opt, i) => (
              <li
                key={i}
                className="text-muted-foreground flex items-start text-sm"
              >
                <span className="text-primary mr-1">•</span>
                {/* 긴 텍스트 줄바꿈 방지 및 가독성 확보 */}
                <span className="break-keep whitespace-pre">{opt}</span>
              </li>
            ))}
          </ul>

          {/* 하단 닫기 버튼 (모바일 접근성 향상) */}
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary" size="sm">
                닫기
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </li>
  );
};
