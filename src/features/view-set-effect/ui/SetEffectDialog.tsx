"use client";

import { ReactNode } from "react";
import { EquipmentSetInfo } from "@/entities/item";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from "@/shared/ui/dialog";
import { TotalEffectDialog } from "./TotalEffectDialog";
import { SetEffectItem } from "./SetEffectItem";

interface SetEffectDialogProps {
  setEffect: EquipmentSetInfo[] | null;
  activePresetNo: number;
  trigger?: ReactNode;
}

export const SetEffectDialog = ({
  setEffect,
  activePresetNo,
  trigger,
}: SetEffectDialogProps) => {
  const hasSetEffect = setEffect && setEffect.length > 0;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button
            className="absolute right-0 bottom-0 w-fit rounded-sm"
            variant="outline"
          >
            세트효과
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-h-[80vh] overflow-y-auto rounded-lg px-4 sm:w-full sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{activePresetNo}번 프리셋 세트 효과</DialogTitle>
          <DialogDescription>
            현재 세트효과는 캐릭터가 착용중인 장비만 확인 가능합니다.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          {!setEffect ? (
            <div className="text-muted-foreground flex h-32 items-center justify-center rounded-md border border-dashed text-sm">
              세트 효과 정보를 불러올 수 없습니다.
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">
                  적용 목록{" "}
                  <span className="text-muted-foreground ml-1 text-sm font-semibold">
                    ({setEffect.length}개)
                  </span>
                </h3>
                {hasSetEffect && <TotalEffectDialog setEffect={setEffect} />}
              </div>

              <Separator />

              {!hasSetEffect ? (
                <div className="bg-muted/30 text-muted-foreground flex h-32 items-center justify-center rounded-md border text-sm">
                  적용 중인 세트 효과가 없습니다.
                </div>
              ) : (
                <ul className="grid gap-2 sm:grid-cols-2">
                  {setEffect.map((set, idx) => (
                    <SetEffectItem key={`${set.set_name}-${idx}`} info={set} />
                  ))}
                </ul>
              )}
            </>
          )}
        </div>

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
