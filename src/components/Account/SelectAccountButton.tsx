// SelectionModeButton.tsx
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { useAccountStore } from '@/store/accountStore';

export const SelectAccountButton = () => {
  const toggleSelectionMode = useAccountStore(
    (state) => state.toggleSelectionMode
  );
  const selectionMode = useAccountStore((state) => state.selectionMode);
  const accounts = useAccountStore((state) => state.accounts);

  return (
    <Button
      className={`${accounts.length >= 1 ? 'inline-flex' : 'hidden'}`}
      size='icon'
      onClick={toggleSelectionMode}
    >
      {selectionMode ? <X /> : <Check />}
    </Button>
  );
};
