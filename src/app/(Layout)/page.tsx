import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div className='container flex flex-1 flex-col items-center justify-center gap-4'>
      <h1 className='text-4xl font-bold'>MMGG</h1>
      <p className='text-lg text-muted-foreground'>
        메이플스토리 M의 모든 정보를 한눈에
      </p>
      <div className='flex gap-4'>
        <Button>캐릭터 검색</Button>
        <Button variant='outline'>파티 찾기</Button>
      </div>
    </div>
  );
};

export default Home;
