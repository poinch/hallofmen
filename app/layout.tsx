import './globals.css';
import type { Metadata } from 'next';
import { Crimson_Pro } from 'next/font/google';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';

const crimsonPro = Crimson_Pro({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hall of Men Barberia - Barberia',
  description:
    'Prova il nostro servizio di taglio di capelli di qualità a Hall of Men Barberia. I nostri barbieri forniscono tagli classici e moderni in un ambiente vintage.',
  formatDetection: {
    telephone: false,
    date: false,
    email: false,
    address: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='it' suppressHydrationWarning>
      <body suppressHydrationWarning className={crimsonPro.className}>
        <ThemeProvider attribute='class' defaultTheme='dark'>
          <Navigation />
          <main className='pt-16'>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
