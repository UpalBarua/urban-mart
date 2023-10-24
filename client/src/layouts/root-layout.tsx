import localFont from 'next/font/local';

const openSans = localFont({ src: '../../public/fonts/open-sans.ttf' });

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div className={`${openSans.className}`}>
      <nav>Navbar</nav>
      {children}
      <footer>footer</footer>
    </div>
  );
};

export default RootLayout;
