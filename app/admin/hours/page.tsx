'use client';

import { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import Loading from '@/components/loading';
import { getHours } from '@/actions/contacts';
import { updateHours, deleteHours } from '@/actions/admin';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/types';

type Hours = Database['public']['Tables']['hours']['Row'];

export default function AdminHours() {
  const [hours, setHours] = useState<Hours[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingHours, setEditingHours] = useState<Hours | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const loadHours = async () => {
    try {
      const data = await getHours();
      setHours(data);
    } catch (error) {
      console.error('Errore caricamento orari:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadHours();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingHours) return;

    const formData = new FormData(e.currentTarget);
    const hoursData = {
      info: formData.get('info') as string,
    };

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('No authenticated session found');

      await updateHours(editingHours.id, hoursData, session.access_token);
      loadHours();
      setIsDialogOpen(false);
      setEditingHours(null);
    } catch (error) {
      console.error('Errore salvataggio orari:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('No authenticated session found');

      await deleteHours(id, session.access_token);
      loadHours();
    } catch (error) {
      console.error('Errore eliminazione:', error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='container mx-auto p-6'>
      <h1 className='mb-6 text-2xl font-bold'>Modifica Orari</h1>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {hours.map((hour) => (
          <Card key={hour.id}>
            <CardHeader className='flex flex-row items-center justify-between'>
              <h3 className='font-semibold'>Orari di apertura</h3>
              <div className='flex space-x-2'>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => {
                    setEditingHours(hour);
                    setIsDialogOpen(true);
                  }}
                >
                  <Pencil className='h-4 w-4' />
                </Button>
                <Button variant='ghost' size='icon' onClick={() => handleDelete(hour.id)}>
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className='whitespace-pre-wrap'>{hour.info}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifica orari di apertura</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <Textarea
              name='info'
              placeholder='Inserisci orari di apertura'
              defaultValue={editingHours?.info || ''}
              required
              rows={10}
            />
            <Button type='submit' className='w-full'>
              Aggiorna
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
