import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

interface AccountCardType {
  id: string; // 계정 식별자
  name: string;
  subtitle: string;
  content?: string;
  link?: boolean;
  selectable?: boolean;
  selected?: boolean;
  onSelectChange?: (checked: boolean) => void;
}

export const AccountCard = ({
  id,
  name,
  subtitle,
  content = '',
  link = true,
  selectable = false,
  selected = false,
  onSelectChange,
}: AccountCardType) => {
  return (
    <div className='flex items-center gap-3'>
      {selectable && (
        <Checkbox
          checked={selected}
          onCheckedChange={(checked) =>
            onSelectChange?.(typeof checked === 'boolean' ? checked : false)
          }
          className='w-6 h-6 rounded-full'
        />
      )}
      <Card className='relative flex-1'>
        <CardHeader className={`${content === '' && 'pb-6'}`}>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        {content !== '' && (
          <CardContent className='pb-5'>
            <p>{content}</p>
          </CardContent>
        )}
        {link && (
          <Link
            to={`/account/${id}`}
            className='absolute right-3 top-3'
            aria-label={`${name} 계정 상세페이지`}
          >
            <ChevronRight className='w-6 h-6' />
          </Link>
        )}
      </Card>
    </div>
  );
};
