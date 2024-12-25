import Link from 'next/link';
import { Scissors, Instagram, Facebook } from 'lucide-react';
import { getContacts, getHours, getSocialLinks } from '@/actions/contacts';

export async function Footer() {
  const hours = await getHours();
  const contacts = await getContacts();
  const linkSocials = await getSocialLinks();

  return (
    <footer className='border-t bg-background'>
      <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
          <div className='space-y-4'>
            <div className='flex items-center'>
              <Scissors className='h-6 w-6 text-primary' />
              <span className='ml-2 text-lg font-bold'>Hall of Men</span>
            </div>
            <p className='text-sm text-muted-foreground'>
              Scopri il nostro servizio di taglio di capelli di qualità a Hall of Men Barberia.
            </p>
          </div>

          <div>
            <h3 className='mb-4 text-sm font-semibold'>Link rapidi</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='/services' className='text-sm text-muted-foreground hover:text-primary'>
                  Servizi
                </Link>
              </li>
              <li>
                <Link href='/team' className='text-sm text-muted-foreground hover:text-primary'>
                  Il nostro team
                </Link>
              </li>
              <li>
                <Link href='/gallery' className='text-sm text-muted-foreground hover:text-primary'>
                  Galleria
                </Link>
              </li>
              <li>
                <Link href='/contacts' className='text-sm text-muted-foreground hover:text-primary'>
                  Contatti
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='mb-4 text-sm font-semibold'>Orari</h3>
            <ul className='space-y-2 text-sm text-muted-foreground'>
              {hours.map((hour) => (
                <li key={hour.id}>{hour.info}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='mb-4 text-sm font-semibold'>Contatti</h3>
            <ul className='space-y-2 text-sm text-muted-foreground'>
              <li>{contacts.address.split(',')[0]}</li>
              <li>{contacts.address.split(',')[1]}</li>
              <li>Phone: {contacts.phone}</li>
              <li>Email: {contacts.email}</li>
            </ul>
          </div>
        </div>

        <div className='mt-8 border-t pt-8'>
          <div className='flex justify-center space-x-4'>
            <Link href={linkSocials.instagram} target='_blank' rel='noopener noreferrer'>
              <Instagram className='h-8 w-8 text-muted-foreground hover:text-primary' />
            </Link>
            <Link href={linkSocials.facebook} target='_blank' rel='noopener noreferrer'>
              <Facebook className='h-8 w-8 text-muted-foreground hover:text-primary' />
            </Link>
          </div>
          <p className='mt-4 text-center text-sm text-muted-foreground'>
            © {new Date().getFullYear()} Hall of Men Barberia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
