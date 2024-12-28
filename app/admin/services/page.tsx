'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getServices } from '@/actions/services';
import { createService, updateService, deleteService } from '@/actions/admin';
import type { Database } from '@/lib/types';
import Loading from '@/components/loading';

type Service = Database['public']['Tables']['services']['Row'];

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const loadServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error('Errore caricamento servizi:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const serviceData = {
      name: formData.get('title') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      duration: 60,
    };

    try {
      if (editingService) {
        await updateService(editingService.id, serviceData);
      } else {
        await createService(serviceData);
      }
      loadServices();
      setIsDialogOpen(false);
      setEditingService(null);
    } catch (error) {
      console.error('Errore salvataggio:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Sei sicuro di voler cancellare questo servizio?')) {
      try {
        await deleteService(id);
        loadServices();
      } catch (error) {
        console.error('Errore cancellazione:', error);
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='container mx-auto p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Modifica servizi</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingService(null)}>
              <Plus className='mr-2 h-4 w-4' /> Aggiungi servizio
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingService ? 'Modifica servizio' : 'Nuovo servizio'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <Input
                name='title'
                placeholder='Titolo'
                defaultValue={editingService?.name || ''}
                required
              />
              <Textarea
                name='description'
                placeholder='Descrizione'
                defaultValue={editingService?.description || ''}
                required
              />
              <Input
                name='price'
                placeholder='Prezzo'
                defaultValue={editingService?.price || ''}
                required
              />
              <Button type='submit' className='w-full'>
                {editingService ? 'Aggiorna' : 'Crea'} Servizio
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {services.map((service) => (
          <Card key={service.id}>
            <CardHeader className='flex flex-row items-center justify-between'>
              <h3 className='font-semibold'>{service.name}</h3>
              <div className='flex space-x-2'>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => {
                    setEditingService(service);
                    setIsDialogOpen(true);
                  }}
                >
                  <Pencil className='h-4 w-4' />
                </Button>
                <Button variant='ghost' size='icon' onClick={() => handleDelete(service.id)}>
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className='text-'>{service.description}</p>
              <p className='mt-2 font-semibold'>{service.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
