"use client";

import { EquipmentSetInfo, aggregateOptions } from "@/entities/item";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";

interface TotalEffectDialogProps {
  setEffect: EquipmentSetInfo[];
}

export const TotalEffectDialog = ({ setEffect }: TotalEffectDialogProps) => {
  const allOptions = setEffect.flatMap((set) =>
    set.set_option.split(/,(?!\d{3})/).map((o) => o.trim()),
  );

  const aggregatedOptions = aggregateOptions(allOptions);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 text-sm">
          전체 합산 보기
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[80vh] overflow-y-auto rounded-lg px-4 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>세트 효과 총합</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            현재 장착 중인 장비 세트 효과 총합산입니다.
          </DialogDescription>
        </DialogHeader>

        <Separator className="my-2" />

        <div className="py-2">
          {/* 모바일 1열, 데스크탑 2열 유지 */}
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
            {aggregatedOptions.map((opt, i) => (
              <li
                key={i}
                className="text-muted-foreground flex items-start text-sm"
              >
                <span className="text-primary mr-2">•</span>
                <span className="break-keep whitespace-pre">{opt}</span>
              </li>
            ))}
          </ul>
        </div>
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
  );
};
