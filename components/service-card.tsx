import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Database } from '@/lib/types';

type Service = Database['public']['Tables']['services']['Row'];

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className='flex h-full flex-col'>
      <CardHeader>
        <h3 className='text-xl font-semibold'>{service.name}</h3>
      </CardHeader>
      <CardContent className='flex-grow'>
        <p className='text-muted-foreground'>{service.description}</p>
      </CardContent>
      <CardFooter className='flex items-center justify-between'>
        <div className='text-sm text-muted-foreground'>Durata: {service.duration} min</div>
        <div className='text-lg font-semibold'>€{service.price.toFixed(2)}</div>
      </CardFooter>
    </Card>
  );
}
