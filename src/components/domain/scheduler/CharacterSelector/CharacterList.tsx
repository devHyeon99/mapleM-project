"use client";

import type { Character } from "@/types/scheduler";
import Image from "next/image";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";

interface CharacterListProps {
  characters: Character[];
  selectedCharacterId: string | null;
  onValueChange: (id: string) => void;
}

export const CharacterList = ({
  characters,
  selectedCharacterId,
  onValueChange,
}: CharacterListProps) => {
  if (characters.length === 0) {
    return (
      <div className="flex h-full min-h-17 items-center justify-center">
        <p className="text-muted-foreground text-sm">
          우측 상단의 추가 버튼으로 관리할 캐릭터를 추가해보세요!
        </p>
      </div>
    );
  }

  return (
    <ToggleGroup
      type="single"
      className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      value={selectedCharacterId || ""}
      onValueChange={onValueChange}
    >
      {characters.map((char) => (
        <ToggleGroupItem
          key={char.id}
          value={char.id}
          className="flex h-auto min-w-39 items-center justify-start gap-2 rounded-md border p-2"
          aria-label={`캐릭터 선택 ${char.name}`}
        >
          <Image
            src={`/jobs/${char.job}.png`}
            alt={char.name}
            width={40}
            height={40}
            className="rounded-full"
            priority
          />
          <div className="w-full overflow-hidden text-left">
            <p className="truncate font-semibold">{char.name}</p>
            <p className="text-muted-foreground block truncate text-xs">
              {char.job}
            </p>
            <p className="text-muted-foreground block text-xs">
              Lv.{char.level}
            </p>
          </div>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};
