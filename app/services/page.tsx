import { getServices } from '@/actions/services';
import { ServiceCard } from '@/components/service-card';

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className='min-h-screen bg-background'>
      {/* Hero Section */}
      <section className='relative bg-muted py-20'>
        <div className='mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8'>
          <h1 className='mb-6 text-4xl font-bold'>I nostri servizi</h1>
          <p className='mx-auto max-w-2xl text-lg text-muted-foreground'>
            Prova i nostri servizi di taglio di capelli di qualità, adattati alle tue preferenze e
            bisogni.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className='px-4 py-16 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-7xl'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className='bg-muted/50 px-4 py-16 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-7xl text-center'>
          <h2 className='mb-4 text-2xl font-semibold'>Accoglienza senza prenotazione</h2>
          <p className='mx-auto max-w-2xl text-muted-foreground'>
            Sebbene le prenotazioni siano raccomandate, accogliamo senza prenotazione in base alla
            disponibilità. Prova l&apos;esperienza Hall of Men oggi.
          </p>
        </div>
      </section>
    </div>
  );
}
