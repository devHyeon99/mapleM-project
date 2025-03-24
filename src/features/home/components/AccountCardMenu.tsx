import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AccountAlertDialog } from './AccountAlertDialog';
import { AccountDialog } from './AccountDialog';
import { Ellipsis } from 'lucide-react';
import { useAccountStore } from '@/store/useAccountStore';

interface AccountCardMenuProps {
  acid: string;
}

const AccountCardMenu = ({ acid }: AccountCardMenuProps) => {
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const updateAccount = useAccountStore((state) => state.updateAccount);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className='[&_svg]:!size-5'
            size='icon'
            variant='ghost'
            aria-label='계정 편집'
            tooltip='계정 편집'
          >
            <Ellipsis aria-hidden />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onSelect={() => setDialogOpen(true)}>
            계정 수정
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setAlertOpen(true)}>
            계정 삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AccountDialog
        open={isDialogOpen}
        setOpen={setDialogOpen}
        mode='edit'
        onSubmit={(name) => {
          updateAccount(acid, { name });
          return { success: true, message: '계정 이름이 수정되었습니다.' };
        }}
      />

      <AccountAlertDialog
        accountId={acid}
        open={isAlertOpen}
        onOpenChange={setAlertOpen}
      />
    </>
  );
};

export default AccountCardMenu;
