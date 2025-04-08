import { useState } from 'react';

interface UseConditionalDialogProps<T> {
  getSelectedItems: () => T[];
  onEmptySelection?: () => void;
}

export function useConditionalDialog<T>({
  getSelectedItems,
  onEmptySelection,
}: UseConditionalDialogProps<T>) {
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    const selected = getSelectedItems();
    if (selected.length === 0) {
      onEmptySelection?.();
      return;
    }
    setOpen(true);
  };

  return {
    open,
    setOpen,
    openDialog,
  };
}
