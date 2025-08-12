"use client";

import { CharacterSetInfo } from "@/entities/character";
import { aggregateOptions, formatSetName } from "@/entities/character";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/shared/ui/dialog";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Search, X } from "lucide-react";

interface SetEffectDialogProps {
  setEffect: CharacterSetInfo[] | null;
}

export const SetEffectDialog = ({ setEffect }: SetEffectDialogProps) => {
  const hasSetEffect = setEffect && setEffect.length > 0;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          착용 장비 세트효과 보기
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] w-full max-w-md overflow-y-auto">
        <DialogHeader>
          <DialogTitle>장착중인 세트 효과</DialogTitle>
          <DialogDescription className="sr-only">
            현재 캐릭터가 장착 중인 장비의 세트 효과 목록입니다.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          {!setEffect ? (
            <p className="text-muted-foreground text-sm">
              세트 효과 정보를 불러올 수 없습니다.
            </p>
          ) : (
            <>
              {/* 상단: 전체 효과 요약 보기 */}
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">
                  세트 효과 목록 ({setEffect.length}개)
                </h3>
                {hasSetEffect && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 cursor-pointer text-xs"
                      >
                        전체 합산 보기
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      side="bottom"
                      align="end"
                      className="w-72 p-4"
                    >
                      <div className="relative">
                        <PopoverPrimitive.Close className="absolute top-0 right-0 opacity-70 hover:opacity-100">
                          <X className="h-4 w-4" />
                        </PopoverPrimitive.Close>
                        <p className="mb-2 font-semibold">효과 총합</p>
                        <Separator className="mb-2" />
                        <ul className="flex flex-col gap-1 text-sm">
                          {aggregateOptions(
                            setEffect.flatMap((set) =>
                              set.set_option
                                .split(/,(?!\d{3})/)
                                .map((o) => o.trim()),
                            ),
                          ).map((opt, i) => (
                            <li key={i} className="text-muted-foreground">
                              {opt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
              <Separator />

              {/* 하단: 개별 세트 리스트 */}
              {!hasSetEffect ? (
                <p className="text-muted-foreground py-4 text-center text-sm">
                  적용 중인 세트 효과가 없습니다.
                </p>
              ) : (
                <ul className="space-y-3">
                  {setEffect.map((set, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between rounded-md border p-3"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {set.set_name}
                        </span>
                        <span className="text-xs text-[#FF7E54]">
                          {set.set_count}세트 효과 적용 중
                        </span>
                      </div>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 cursor-pointer"
                            aria-label={`${set.set_name} 옵션 보기`}
                          >
                            <Search className="size-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          side="left"
                          align="center"
                          className="w-64 p-4"
                        >
                          <div className="relative">
                            <PopoverPrimitive.Close className="absolute top-0 right-0 opacity-70 hover:opacity-100">
                              <X className="h-4 w-4" />
                            </PopoverPrimitive.Close>
                            <p className="mb-2 text-sm font-semibold">
                              {formatSetName(set.set_name, set.set_count)}
                            </p>
                            <Separator className="mb-2" />
                            <ul className="flex flex-col gap-1">
                              {set.set_option
                                .split(/,(?!\d{3})/)
                                .map((opt) => opt.trim())
                                .map((opt, i) => (
                                  <li
                                    key={i}
                                    className="text-muted-foreground text-sm"
                                  >
                                    {opt}
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
