'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/services', label: 'Servizi' },
  { href: '/admin/team', label: 'Team' },
  { href: '/admin/gallery', label: 'Immagini Galleria' },
  { href: '/admin/contacts', label: 'Contatti' },
  { href: '/admin/hours', label: 'Orari' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (pathname === '/admin/login') {
    return <main>{children}</main>;
  }

  return (
    <div className='min-h-screen bg-background'>
      <nav className='border-b bg-card'>
        <div className='container mx-auto flex items-center justify-between p-4'>
          <div className='flex space-x-4'>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={pathname === item.href ? 'default' : 'ghost'}
                  className='text-foreground hover:text-foreground'
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
          <Button variant='ghost' onClick={handleLogout}>
            <LogOut className='mr-2 h-4 w-4' />
            Logout
          </Button>
        </div>
      </nav>
      <main className='min-h-[calc(100vh-4rem)]'>{children}</main>
    </div>
  );
}
