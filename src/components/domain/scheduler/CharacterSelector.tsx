"use client";

import type { Character } from "@/types/scheduler";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { ActionDialog } from "@/components/common/ActionDialog";
import { ConfirmAlertDialog } from "@/components/common/ConfirmAlertDialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Trash2 } from "lucide-react";

interface CharacterSelectorProps {
  characters: Character[];
  selectedCharacterId: string | null;
  onCharacterChange: (characterId: string) => void;
  onAddCharacter: (characterName: string) => void;
  onDeleteCharacter: (characterId: string) => void;
}

export const CharacterSelector = ({
  characters,
  selectedCharacterId,
  onCharacterChange,
  onAddCharacter,
  onDeleteCharacter,
}: CharacterSelectorProps) => {
  const selectedCharacter = characters.find(
    (c) => c.id === selectedCharacterId,
  );
  const handleAddClick = () => onAddCharacter("새 캐릭터");
  const handleDeleteClick = () => {
    if (selectedCharacterId) onDeleteCharacter(selectedCharacterId);
  };

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">캐릭터 선택</h2>
        <div className="flex items-center gap-2">
          <ActionDialog
            trigger={
              <Button variant="outline" size="sm">
                <UserPlus className="mr-2 h-4 w-4" />
                추가
              </Button>
            }
            title="새 캐릭터 추가"
            description="관리할 캐릭터의 이름을 정확히 입력해주세요."
            onAction={handleAddClick}
            actionText="추가"
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="character-name" className="text-right">
                  캐릭터 이름
                </Label>
                <Input
                  id="character-name"
                  name="character-name"
                  placeholder="예: 내전사캐릭"
                  className="col-span-3"
                />
              </div>
            </div>
          </ActionDialog>
          <ConfirmAlertDialog
            trigger={
              <Button
                variant="outline"
                size="sm"
                disabled={!selectedCharacterId}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                삭제
              </Button>
            }
            title="정말 삭제하시겠습니까?"
            description={`'${selectedCharacter?.name || ""}' 캐릭터의 모든 데이터가 삭제됩니다. 이 작업은 되돌릴 수 없습니다.`}
            onConfirm={handleDeleteClick}
            confirmText="삭제"
          />
        </div>
      </div>
      <Card className="items-center py-0">
        <ToggleGroup
          type="single"
          className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          value={selectedCharacterId || ""}
          onValueChange={onCharacterChange}
        >
          {characters.map((char) => (
            <ToggleGroupItem
              key={char.id}
              value={char.id}
              className="flex h-auto min-w-39 items-center justify-start gap-2 rounded-md border p-2"
            >
              <Image
                src={char.avatarUrl}
                alt={char.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="w-full text-left">
                <span className="font-semibold">{char.name}</span>
                <span className="text-muted-foreground block text-xs">
                  {char.job}
                </span>
                <span className="text-muted-foreground block text-xs">
                  Lv.{char.level}
                </span>
              </div>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </Card>
    </section>
  );
};
