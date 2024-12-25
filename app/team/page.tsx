import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getTeamMembers } from '../../actions/team';

export default async function TeamPage() {
  const team = await getTeamMembers();

  return (
    <div className='min-h-screen bg-background'>
      <section className='relative bg-muted py-20'>
        <div className='mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8'>
          <h1 className='mb-6 text-4xl font-bold'>Conosciamo il nostro team</h1>
          <p className='mx-auto max-w-2xl text-lg text-muted-foreground'>
            Il nostro team di barbieri porta anni di esperienza e passione a ogni taglio
          </p>
        </div>
      </section>

      <section className='px-4 py-16 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-7xl'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {team.map((member) => (
              <Card key={member.id} className='vintage-border'>
                <CardHeader className='relative h-64'>
                  <Image
                    src={member.image_url}
                    alt={member.name}
                    fill
                    className='rounded-t-lg object-cover'
                  />
                </CardHeader>
                <CardContent className='pt-6'>
                  <h3 className='mb-2 text-xl font-semibold'>{member.name}</h3>
                  <p className='mb-4 text-primary'>{member.title}</p>
                  <p className='text-muted-foreground'>{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
