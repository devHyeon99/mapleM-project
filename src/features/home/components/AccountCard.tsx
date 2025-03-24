import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { AccountCardMenu } from '@/features/home/components';
import { useAccountStore } from '@/store/useAccountStore';
import { LogIn } from 'lucide-react';
import { Link } from 'react-router';

interface AccountCardType {
  id: string;
  name: string;
  link?: boolean;
  menu?: boolean;
}

export const AccountCard = ({
  id,
  name,
  link = true,
  menu = true,
}: AccountCardType) => {
  const { setCurrentAccountId } = useAccountStore();

  return (
    <li className='flex items-center gap-3'>
      <Card className='relative flex-1 pb-6 shadow-none'>
        <CardHeader className='flex flex-row justify-between pr-2'>
          <CardTitle className='text-lg items-center self-center'>
            {name}
          </CardTitle>
          <div className='flex gap-2'>
            {link && (
              <Link
                to={`/account`}
                className='flex justify-center items-center w-9 h-9 [&_svg]:!size-5'
                aria-label={`${name} 계정 상세페이지`}
                onClick={() => setCurrentAccountId(id)}
              >
                <LogIn aria-hidden />
              </Link>
            )}
            {menu && <AccountCardMenu acid={id} />}
          </div>
        </CardHeader>
      </Card>
    </li>
  );
};
