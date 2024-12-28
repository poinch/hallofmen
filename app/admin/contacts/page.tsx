'use client';

import { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Loading from '@/components/loading';
import { getContacts } from '@/actions/contacts';
import { updateContact, deleteContact } from '@/actions/admin';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/types';

type Contact = Database['public']['Tables']['contacts']['Row'];

export default function AdminContacts() {
  const [contact, setContact] = useState<Contact | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const loadContacts = async () => {
    try {
      const data = await getContacts();
      setContact(data);
    } catch (error) {
      console.error('Error loading contacts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const contactData = {
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
    };

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Unauthorized');

      if (editingContact) {
        await updateContact(editingContact.id, contactData);
        loadContacts();
        setIsDialogOpen(false);
        setEditingContact(null);
      }
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Unauthorized');

      await deleteContact(id);
      loadContacts();
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='container mx-auto p-6'>
      <h1 className='mb-6 text-2xl font-bold'>Modifica informazioni</h1>
      {contact && (
        <Card>
          <CardHeader className='flex flex-row items-center justify-between'>
            <h3 className='font-semibold'>Contatti</h3>
            <div className='flex space-x-2'>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => {
                  setEditingContact(contact);
                  setIsDialogOpen(true);
                }}
              >
                <Pencil className='h-4 w-4' />
              </Button>
              <Button variant='ghost' size='icon' onClick={() => handleDelete(contact.id)}>
                <Trash2 className='h-4 w-4' />
              </Button>
            </div>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>Email</p>
              <p>{contact.email}</p>
            </div>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>Telefono</p>
              <p>{contact.phone}</p>
            </div>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>Indirizzo</p>
              <p>{contact.address}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Aggiorna informazioni</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <Input
              name='email'
              placeholder='Email'
              defaultValue={editingContact?.email || ''}
              required
            />
            <Input
              name='phone'
              placeholder='Telefono'
              defaultValue={editingContact?.phone || ''}
              required
            />
            <Input
              name='address'
              placeholder='Indirizzo'
              defaultValue={editingContact?.address || ''}
              required
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
