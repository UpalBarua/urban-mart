import Navbar from '@/components/navbar';
import Footer from '@/components/ui/footer';
import { cn } from '@/lib/utils';
import localFont from 'next/font/local';

const openSans = localFont({ src: '../../public/fonts/open-sans.ttf' });

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div
      className={cn(
        'container max-w-6xl mx-auto px-2.5 md:px-4 lg:px-5 flex flex-col min-h-screen',
        openSans.className
      )}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default RootLayout;
