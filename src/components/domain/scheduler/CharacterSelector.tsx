"use client";

import { useMemo, useCallback } from "react";
import type { Character } from "@/types/scheduler";
import { Card } from "@/components/ui/card";
import { LoadingCard } from "@/components/common/LoadingCard";
import {
  AddCharacter,
  DeleteCharacter,
  CharacterList,
} from "./CharacterSelector/";

interface CharacterSelectorProps {
  characters: Character[];
  selectedCharacterId: string | null;
  onCharacterChange: (characterId: string | null) => void;
  onAddCharacter: (newCharacter: { name: string; world_name: string }) => void;
  onDeleteCharacter: (id: string) => void;
  isAddingCharacter: boolean;
  isDeletingCharacter: boolean;
  isCharactersLoading: boolean;
}

export const CharacterSelector = ({
  characters,
  selectedCharacterId,
  onCharacterChange,
  onAddCharacter,
  onDeleteCharacter,
  isAddingCharacter,
  isDeletingCharacter,
  isCharactersLoading,
}: CharacterSelectorProps) => {
  const selectedCharacter = useMemo(
    () => characters.find((c) => c.id === selectedCharacterId),
    [characters, selectedCharacterId],
  );

  const handleCharacterChange = useCallback(
    (id: string) => {
      onCharacterChange(id || null);
    },
    [onCharacterChange],
  );

  if (isCharactersLoading) {
    return (
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">캐릭터 선택</h2>
        </div>
        <LoadingCard message="캐릭터 정보 가져오는 중..." />
      </section>
    );
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">캐릭터 선택</h2>
        <div className="flex items-center gap-2">
          <AddCharacter
            onAddCharacter={onAddCharacter}
            isAdding={isAddingCharacter}
            disabled={characters.length >= 10}
          />
          <DeleteCharacter
            selectedCharacter={selectedCharacter}
            onDeleteCharacter={onDeleteCharacter}
            isDeleting={isDeletingCharacter}
          />
        </div>
      </div>
      <Card className="min-h-17 p-2">
        <CharacterList
          characters={characters}
          selectedCharacterId={selectedCharacterId}
          onValueChange={handleCharacterChange}
        />
      </Card>
    </section>
  );
};
