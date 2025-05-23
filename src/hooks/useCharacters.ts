"use client";

import { useState, useMemo, useEffect } from "react";
import { MOCK_CHARACTERS } from "@/lib/mock-data";

export const useCharacters = (selectedAccountId: string | null) => {
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    setSelectedCharacterId(null);
  }, [selectedAccountId]);

  const handleCharacterChange = (characterId: string | null) => {
    setSelectedCharacterId(characterId);
  };

  const handleAddCharacter = (characterName: string) =>
    alert(`'${characterName}' 캐릭터 추가 기능 구현 예정`);

  const handleDeleteCharacter = (characterId: string) => {
    const characterToDelete = MOCK_CHARACTERS.find((c) => c.id === characterId);
    alert(
      `'${characterToDelete?.name}' 캐릭터 삭제 기능 구현 예정 (ID: ${characterId})`,
    );
    setSelectedCharacterId(null);
  };

  const charactersForSelectedAccount = useMemo(
    () =>
      MOCK_CHARACTERS.filter((char) => char.accountId === selectedAccountId),
    [selectedAccountId],
  );

  const selectedCharacter = useMemo(
    () => MOCK_CHARACTERS.find((char) => char.id === selectedCharacterId),
    [selectedCharacterId],
  );

  return {
    charactersForSelectedAccount,
    selectedCharacter,
    selectedCharacterId,
    handleCharacterChange,
    handleAddCharacter,
    handleDeleteCharacter,
  };
};
