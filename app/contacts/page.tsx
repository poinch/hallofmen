import { Card } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { getContacts, getHours } from '@/actions/contacts';

export default async function ContactPage() {
  const hours = await getHours();
  const contacts = await getContacts();

  return (
    <div className='min-h-screen bg-background'>
      <section className='relative bg-muted py-20'>
        <div className='mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8'>
          <h1 className='mb-6 text-4xl font-bold'>Contattaci</h1>
          <p className='mx-auto max-w-2xl text-lg text-muted-foreground'>
            Visita la nostra bottega o contattaci
          </p>
        </div>
      </section>

      <section className='px-4 py-16 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-7xl'>
          <div className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
            <div>
              <h2 className='mb-6 text-2xl font-semibold'>Informazioni</h2>
              <div className='space-y-6'>
                <Card className='vintage-border'>
                  <div className='flex items-start space-x-4'>
                    <MapPin className='h-6 w-6 flex-shrink-0 text-primary' />
                    <div>
                      <h3 className='mb-2 font-semibold'>Indirizzo</h3>
                      <p className='text-muted-foreground'>{contacts.address}</p>
                    </div>
                  </div>
                </Card>

                <Card className='vintage-border'>
                  <div className='flex items-start space-x-4'>
                    <Phone className='h-6 w-6 flex-shrink-0 text-primary' />
                    <div>
                      <h3 className='mb-2 font-semibold'>Telefono</h3>
                      <p className='text-muted-foreground'>{contacts.phone}</p>
                    </div>
                  </div>
                </Card>

                <Card className='vintage-border'>
                  <div className='flex items-start space-x-4'>
                    <Mail className='h-6 w-6 flex-shrink-0 text-primary' />
                    <div>
                      <h3 className='mb-2 font-semibold'>Email</h3>
                      <p className='text-muted-foreground'>{contacts.email}</p>
                    </div>
                  </div>
                </Card>

                <Card className='vintage-border'>
                  <div className='flex items-start space-x-4'>
                    <Clock className='h-6 w-6 flex-shrink-0 text-primary' />
                    <div>
                      <h3 className='mb-2 font-semibold'>Orari</h3>
                      <div className='text-muted-foreground'>
                        {hours.map((hour) => (
                          <p key={hour.id}>{hour.info}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div>
              <h2 className='mb-6 text-2xl font-semibold'>Dove siamo</h2>
              <div className='vintage-border h-[500px]'>
                <iframe
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.068710865966!2d12.647235276608468!3d45.50869543046837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477bff5e39820b49%3A0x2112f4f97619dbd2!2sHall%20of%20Men%20Barberia!5e0!3m2!1sen!2sit!4v1732912271869!5m2!1sen!2sit'
                  width='100%'
                  height='100%'
                  style={{ border: 0 }}
                  allowFullScreen
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
