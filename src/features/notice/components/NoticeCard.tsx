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
      <CardContent className='pb-8'>
        {loading ? (
          <div className='flex-1 text-center text-muted h-full'>로딩 중...</div>
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
                  className='font-medium truncate hover:font-normal outline-ring/50'
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
