import { useMemo } from 'react';
import { useAccountStore } from '@/store/useAccountStore';
import { useCharacterStore } from '@/store/useCharacterStore';
import { CharacterData } from '@/types/character';

export function useCurrentAccountData(characterId?: string) {
  const { accounts, currentAccountId } = useAccountStore();
  const { charactersByAccountId } = useCharacterStore();

  const currentAccount = useMemo(
    () => accounts.find((acc) => acc.id === currentAccountId) || null,
    [accounts, currentAccountId]
  );

  const allCharacters: CharacterData[] = useMemo(() => {
    if (!currentAccount) return [];
    return charactersByAccountId[currentAccount.id] || [];
  }, [charactersByAccountId, currentAccount]);

  const character: CharacterData | null = useMemo(() => {
    if (!characterId) return null;
    return allCharacters.find((char) => char.id === characterId) || null;
  }, [characterId, allCharacters]);

  return {
    currentAccount,
    character,
    allCharacters,
  };
}
