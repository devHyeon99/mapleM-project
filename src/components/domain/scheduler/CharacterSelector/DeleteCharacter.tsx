"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmAlertDialog } from "@/components/common/ConfirmAlertDialog";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Character } from "@/types/scheduler";

interface DeleteCharacterProps {
  selectedCharacter: Character | undefined;
  onDeleteCharacter: (
    id: string,
    options: { onSuccess: () => void; onError: (error: Error) => void },
  ) => void;
  isDeleting: boolean;
}

export const DeleteCharacter = ({
  selectedCharacter,
  onDeleteCharacter,
  isDeleting,
}: DeleteCharacterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    if (!selectedCharacter) return;

    onDeleteCharacter(selectedCharacter.id, {
      onSuccess: () => {
        toast.success(`'${selectedCharacter.name}' 캐릭터가 삭제되었습니다.`);
        setIsOpen(false);
      },
      onError: (error) => {
        toast.error(`캐릭터 삭제에 실패했습니다: ${error.message}`);
      },
    });
  };

  return (
    <ConfirmAlertDialog
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={
        <Button
          variant="outline"
          size="sm"
          disabled={!selectedCharacter || isDeleting}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          삭제
        </Button>
      }
      title="정말 삭제하시겠습니까?"
      description={`'${selectedCharacter?.name || ""}' 캐릭터의 모든 데이터가 삭제됩니다. 이 작업은 되돌릴 수 없습니다.`}
      onConfirm={handleConfirm}
      confirmText="삭제"
      isConfirmPending={isDeleting}
    />
  );
};
