'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Button
      variant='ghost'
      size='icon'
      className='relative'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Sun
        className={`absolute h-5 w-5 transition-all duration-300 ${
          theme === 'dark' ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
        }`}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all duration-300 ${
          theme === 'dark' ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'
        }`}
      />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
