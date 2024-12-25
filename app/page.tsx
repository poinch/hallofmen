import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Scissors, Clock, MapPin, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col'>
      {/* Hero Section */}
      <section className='relative flex h-[600px] items-center justify-center text-white'>
        <div
          className='absolute inset-0 z-0 bg-cover bg-center'
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')",
          }}
        >
          <div className='absolute inset-0 bg-black/60' />
        </div>

        <div className='relative z-10 px-4 text-center sm:px-6 lg:px-8'>
          <h1 className='mb-6 text-5xl font-bold md:text-6xl'>Hall of Men Barberia</h1>
          <p className='mx-auto mb-8 max-w-2xl text-lg sm:text-xl'>
            Prova il nostro servizio di taglio di capelli di qualità in un ambiente vintage
          </p>
          <Button size='lg' asChild>
            <Link href='/services'>Scopri i nostri servizi</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className='bg-background px-4 py-16 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-7xl'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
            <Card className='p-6'>
              <Scissors className='mb-4 h-10 w-10 text-primary' />
              <h3 className='mb-2 text-lg font-semibold'>Barbieri Esperti</h3>
              <p className='text-muted-foreground'>
                Il nostro team di esperti porta anni di esperienza e passione a ogni taglio
              </p>
            </Card>

            <Card className='p-6'>
              <Clock className='mb-4 h-10 w-10 text-primary' />
              <h3 className='mb-2 text-lg font-semibold'>Orari Flessibili</h3>
              <p className='text-muted-foreground'>
                Aperto 5 giorni a settimana con orari convenienti mattutini e serali
              </p>
            </Card>

            <Card className='p-6'>
              <MapPin className='mb-4 h-10 w-10 text-primary' />
              <h3 className='mb-2 text-lg font-semibold'>Location Conveniente</h3>
              <p className='text-muted-foreground'>Facilmente accessibile nel cuore della città</p>
            </Card>

            <Card className='p-6'>
              <Users className='mb-4 h-10 w-10 text-primary' />
              <h3 className='mb-2 text-lg font-semibold'>Community Focus</h3>
              <p className='text-muted-foreground'>Costruiamo relazioni un taglio alla volta</p>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className='bg-muted/50 px-4 py-16 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-7xl'>
          <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
            <div>
              <h2 className='mb-6 text-3xl font-bold'>La Nostra Storia</h2>
              <p className='mb-6 text-muted-foreground'>
                Fondata nel 2010, Hall of Men Barberia ha fornito servizi di taglio di capelli di
                qualità in un ambiente classico e vintage. Il nostro impegno per la qualità e la
                tradizione ci ha reso un punto di riferimento per la comunità.
              </p>
              <Button asChild>
                <Link href='/team'>Scopri il nostro team</Link>
              </Button>
            </div>
            <div className='relative h-[400px]'>
              <Image
                src='https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80'
                alt='Vintage barbershop interior'
                fill
                className='rounded-lg object-cover'
                priority={false}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
