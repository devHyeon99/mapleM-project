import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/theme/theme-provider';
import { Switch } from '@/components/ui/switch';
import { useEffect, useState } from 'react';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [checked, setChecked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (theme === 'dark') {
      setChecked(true);
    } else if (theme === 'light') {
      setChecked(false);
    } else if (theme === 'system') {
      const isDark = document.documentElement.classList.contains('dark');
      setChecked(isDark);
    }
  }, [theme, mounted]);

  const toggleTheme = (value: boolean) => {
    setChecked(value);
    setTheme(value ? 'dark' : 'light');
  };

  if (!mounted) return null;

  return (
    <Switch
      checked={checked}
      onCheckedChange={toggleTheme}
      className='w-10 h-5.5'
      icon={
        checked ? <Moon className='h-3 w-3' /> : <Sun className='h-3 w-3' />
      }
    />
  );
}
