import { Notice } from '@/types/notice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface NoticeCardProps {
  notices: Notice[];
  title: string;
  loading: boolean;
  error: string | undefined;
}

export const NoticeCard = ({
  notices,
  title,
  loading,
  error,
}: NoticeCardProps) => {
  if (error) return <div className='p-6'>에러: {error}</div>;

  return (
    <Card className='h-[400px] xl:h-[300px] gap-3 shadow-none'>
      <CardHeader>
        <CardTitle className='text-xl font-bold tracking-widest'>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className='pb-8 h-full'>
        {loading ? (
          <ul className='flex flex-col justify-between gap-5 h-full'>
            {Array.from({ length: 5 }).map((_, index) => (
              <li
                className='flex flex-col lg:flex-row lg:justify-between animate-pulse'
                key={index}
              >
                <div className='h-5 bg-muted rounded w-full max-w-[800px]'></div>
                <div className='h-5 bg-muted rounded w-20 mt-2 lg:mt-0 self-end lg:self-auto'></div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className='flex flex-col gap-5'>
            {notices.map((notice) => (
              <li
                className='flex flex-col xl:flex-row xl:justify-between'
                key={notice.notice_id}
              >
                <a
                  href={notice.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-medium truncate hover:font-normal outline-ring/50 max-w-[800px]'
                >
                  {notice.title}
                </a>
                <p className='text-muted-foreground text-sm text-right font-semibold'>
                  {notice.date.split('T')[0]}
                </p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
