import { useRef, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { AccountAlertDialog } from './AccountAlertDialog';
import { Ellipsis } from 'lucide-react';
import { AccountDialog } from './AccountDialog';

interface AccountCardMenuProps {
  acid: string;
}

const AccountCardMenu = ({ acid }: AccountCardMenuProps) => {
  const [open, setOpen] = useState(false);
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog>
      <Dialog open={open} onOpenChange={setOpen}>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              ref={dropdownTriggerRef}
              className='[&_svg]:!size-5'
              size='icon'
              variant='ghost'
              aria-label='계정 편집'
            >
              <Ellipsis aria-hidden />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DialogTrigger asChild>
              <DropdownMenuItem>계정 수정</DropdownMenuItem>
            </DialogTrigger>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem>계정 삭제</DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <AccountDialog
          accountId={acid}
          onCloseAutoFocus={() => dropdownTriggerRef.current?.focus()}
          onClose={(open) => setOpen(open)}
        />
        <AccountAlertDialog
          accountId={acid}
          onCloseAutoFocus={() => dropdownTriggerRef.current?.focus()}
        />
      </Dialog>
    </AlertDialog>
  );
};

export default AccountCardMenu;
