"use client";

import { ReactNode } from "react";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Construction } from "lucide-react";

interface SpecCardDialogProps {
  characterName: string;
  trigger?: ReactNode;
}

export const SpecCardDialog = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  characterName,
  trigger,
}: SpecCardDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button
            className="absolute right-20 bottom-0 w-fit rounded-sm"
            variant="secondary"
          >
            스펙 카드
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md [&>button.absolute]:hidden">
        <DialogHeader>
          <DialogTitle>서비스 준비 중</DialogTitle>
          <DialogDescription className="sr-only">
            스펙 카드 저장 기능은 현재 개발 중입니다.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center gap-4 py-6 text-center">
          <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-full">
            <Construction className="text-muted-foreground h-6 w-6" />
          </div>
          <div className="space-y-1">
            <p className="text-lg font-semibold">
              스펙 카드 기능 준비 중입니다
            </p>
            <p className="text-muted-foreground text-sm">
              캐릭터의 장비와 스탯을 이미지로 저장하는 기능을 <br />
              열심히 만들고 있습니다. 조금만 기다려주세요!
            </p>
          </div>
        </div>

        <DialogFooter className="sm:justify-center">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              확인
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
