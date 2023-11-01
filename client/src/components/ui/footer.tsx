import Logo from '../logo';

const Footer = () => {
  return (
    <footer className="flex flex-col gap-3 justify-between items-center py-4 pt-10 text-center sm:pt-16 sm:flex-row mt-auto">
      <Logo />
      <p className="text-sm text-primary-400 dark:text-primary-200">
        &copy; 2023 Urban Mart - All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
