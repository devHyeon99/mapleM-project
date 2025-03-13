import { AddAccountDialog } from './AddAccountDialog';
import { SelectAccountButton } from './SelectAccountButton';
import { DeleteAccountDialog } from './DeleteAccountDialog';

export const AccountButtons = () => {
  return (
    <div className={'flex py-5 gap-2 justify-end items-center [&_svg]:!size-5'}>
      <span className='flex-1'>계정관리</span>
      <SelectAccountButton />
      <AddAccountDialog />
      <DeleteAccountDialog />
    </div>
  );
};
