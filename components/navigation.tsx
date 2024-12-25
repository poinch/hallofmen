'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Scissors } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeSwitch } from '@/components/theme-switch';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        'border-b bg-background/80 backdrop-blur-md',
        scrolled && 'shadow-md'
      )}
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-4 lg:px-8'>
        <div className='flex h-16 justify-between'>
          <div className='flex'>
            <Link href='/' className='flex items-center'>
              <Scissors className='h-8 w-8 text-primary' />
              <span className='ml-5 text-3xl font-bold'>Hall of Men</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex md:items-center md:space-x-4'>
            {[
              { href: '/services', label: 'Servizi' },
              { href: '/team', label: 'Il nostro Team' },
              { href: '/gallery', label: 'Gallery' },
              { href: '/contacts', label: 'Contatti' },
            ].map((item) => (
              <Button key={item.href} variant='ghost' asChild className='group relative'>
                <Link href={item.href}>
                  {item.label}
                  <span className='absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transform bg-primary transition-transform group-hover:scale-x-100' />
                </Link>
              </Button>
            ))}
            <ThemeSwitch />
          </div>

          {/* Mobile Navigation Button */}
          <div className='flex items-center md:hidden'>
            <Button variant='ghost' onClick={() => setIsOpen(!isOpen)} className='p-2'>
              <span className='sr-only'>Open menu</span>
              <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                {isOpen ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                ) : (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                )}
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className='border-b bg-background/80 md:hidden'>
          <div className='flex flex-col items-center justify-center p-2'>
            {[
              { href: '/services', label: 'Servizi' },
              { href: '/team', label: 'Il nostro Team' },
              { href: '/gallery', label: 'Gallery' },
              { href: '/contacts', label: 'Contatti' },
            ].map((item) => (
              <Button
                key={item.href}
                variant='ghost'
                size='lg'
                className='w-full'
                asChild
                onClick={() => setIsOpen(false)}
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
            <div className='mt-4'>
              <ThemeSwitch />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
