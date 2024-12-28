'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
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
import Loading from '@/components/loading';
import { getGalleryItems } from '@/actions/gallery';
import { createGalleryItem, updateGalleryItem, deleteGalleryItem } from '@/actions/admin';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/types';

type GalleryItem = Database['public']['Tables']['gallery']['Row'];

export default function AdminGallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const loadGallery = async () => {
    try {
      const data = await getGalleryItems();
      setGallery(data);
    } catch (error) {
      console.error('Errore caricamento galleria di immagini:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const itemData = {
      title: formData.get('title') as string,
      image_url: formData.get('imageUrl') as string,
      description: formData.get('description') as string,
    };

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Unauthorized');

      if (editingItem) {
        await updateGalleryItem(editingItem.id, itemData);
      } else {
        await createGalleryItem(itemData);
      }
      loadGallery();
      setIsDialogOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Errore salvataggio:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Unauthorized');

      await deleteGalleryItem(id);
      loadGallery();
    } catch (error) {
      console.error('Errore eliminazione:', error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='container mx-auto p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Modifica Galleria di immagini</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingItem(null)}>
              <Plus className='mr-2 h-4 w-4' /> Aggiungi immagine
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Aggiorna immagine' : 'Nuova immagine'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <Input
                name='title'
                placeholder='Titolo'
                defaultValue={editingItem?.title || ''}
                required
              />
              <Input
                name='imageUrl'
                placeholder='Url Immagine'
                defaultValue={editingItem?.image_url || ''}
                required
              />
              <Textarea
                name='description'
                placeholder='Descrizione opzionale*'
                defaultValue={editingItem?.description || ''}
              />
              <Button type='submit' className='w-full'>
                {editingItem ? 'Aggiorna' : 'Aggiungi'} immagine
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {gallery.map((item) => (
          <Card key={item.id}>
            <CardHeader className='flex flex-row items-center justify-between'>
              <h3 className='font-semibold'>{item.title}</h3>
              <div className='flex space-x-2'>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => {
                    setEditingItem(item);
                    setIsDialogOpen(true);
                  }}
                >
                  <Pencil className='h-4 w-4' />
                </Button>
                <Button variant='ghost' size='icon' onClick={() => handleDelete(item.id)}>
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            </CardHeader>
            <CardContent className='space-y-2'>
              <Image
                src={item.image_url}
                alt={item.title}
                width={400}
                height={300}
                className='h-48 w-full rounded-md object-cover'
              />
              {item.description && <p className='text-sm'>{item.description}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
