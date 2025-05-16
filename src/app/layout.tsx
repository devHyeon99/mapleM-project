import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { cn } from '@/lib/utils';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const pretendard = localFont({
  src: '../../public/fonts/PretendardStdVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default:
      'MMGG | 메이플스토리M 유저검색, 유저모집, 스케줄러, 가이드 정보 웹 서비스',
    template: '%s | MMGG',
  },
  description:
    '메이플스토리 M 유저를 위한 넥슨 API를 활용한 웹 서비스 페이지 입니다. 유저검색, 유저모집, 스케줄러 관리, 가이드 정보를 제공합니다.',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => {
  return (
    <html lang='ko' className={pretendard.className} suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background antialiased')}>
        <div className='relative flex min-h-screen flex-col'>
          <Header />
          <main className='flex-1'>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
