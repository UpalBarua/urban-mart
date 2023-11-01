import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { BiMoon, BiSun } from 'react-icons/bi';

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {theme === 'dark' ? (
        <BiMoon className="text-xl" />
      ) : (
        <BiSun className="text-xl" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
