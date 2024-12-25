'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
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
import { getTeamMembers } from '@/actions/team';
import { createTeamMember, updateTeamMember, deleteTeamMember } from '@/actions/admin';
import type { Database } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import Loading from '@/components/loading';

type TeamMember = Database['public']['Tables']['team_members']['Row'];

export default function AdminTeam() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const loadTeam = async () => {
    try {
      const data = await getTeamMembers();
      setTeam(data);
    } catch (error) {
      console.error('Errore caricamento team:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTeam();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const memberData = {
      name: formData.get('name') as string,
      title: formData.get('role') as string,
      image_url: formData.get('imageUrl') as string,
      bio: formData.get('bio') as string,
    };

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('No authenticated session found');

      if (editingMember) {
        await updateTeamMember(editingMember.id, memberData, session.access_token);
      } else {
        await createTeamMember(memberData, session.access_token);
      }
      loadTeam();
      setIsDialogOpen(false);
      setEditingMember(null);
    } catch (error) {
      console.error('Errore salvataggio:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('No authenticated session found');

      await deleteTeamMember(id, session.access_token);
      loadTeam();
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
        <h1 className='text-2xl font-bold'>Modifica Team</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingMember(null)}>
              <Plus className='mr-2 h-4 w-4' /> Aggiungi membro del team
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingMember ? 'Modifica membro del team' : 'Nuovo membro del team'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <Input
                name='name'
                placeholder='Nome'
                defaultValue={editingMember?.name || ''}
                required
              />
              <Input
                name='role'
                placeholder='Ruolo'
                defaultValue={editingMember?.title || ''}
                required
              />
              <Input
                name='imageUrl'
                placeholder='Immagine URL'
                defaultValue={editingMember?.image_url || ''}
                required
              />
              <Textarea
                name='bio'
                placeholder='Biografia'
                defaultValue={editingMember?.bio || ''}
                required
              />
              <Button type='submit' className='w-full'>
                {editingMember ? 'Aggiorna' : 'Crea'} membro del team
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {team.map((member) => (
          <Card key={member.id}>
            <CardHeader className='flex flex-row items-center justify-between'>
              <div>
                <h3 className='font-semibold'>{member.name}</h3>
                <p className='text-sm text-gray-300'>{member.title}</p>
              </div>
              <div className='flex space-x-2'>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => {
                    setEditingMember(member);
                    setIsDialogOpen(true);
                  }}
                >
                  <Pencil className='h-4 w-4' />
                </Button>
                <Button variant='ghost' size='icon' onClick={() => handleDelete(member.id)}>
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            </CardHeader>
            <CardContent className='space-y-2'>
              <Image
                src={member.image_url}
                alt={member.name}
                width={400}
                height={300}
                className='h-48 w-full rounded-md object-cover'
              />
              <p className='text-sm'>{member.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
