import { ReactNode } from 'react';
import { Sidebar } from '@/components/Layout/Sidebar';
import { Footer } from '@/components/Layout/Footer';

interface LayoutProps {
  children: ReactNode;
  header: ReactNode;
}

export const Layout = ({ children, header }: LayoutProps) => {
  return (
    <div className='min-h-dvh flex'>
      <Sidebar position='left' />
      <main className='flex flex-col p-6 min-w-dvw xl:min-w-[1024px]'>
        {header}
        <section className='flex-1 w-full h-full'>{children}</section>
        <Footer />
      </main>
      <Sidebar position='right' />
    </div>
  );
};
