'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getServices } from '@/actions/services';
import { getTeamMembers } from '@/actions/team';
import { getGalleryItems } from '@/actions/gallery';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    services: 0,
    team: 0,
    gallery: 0,
  });

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const [services, team, gallery] = await Promise.all([
          getServices(),
          getTeamMembers(),
          getGalleryItems(),
        ]);

        setCounts({
          services: services.length,
          team: team.length,
          gallery: gallery.length,
        });
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };

    loadCounts();
  }, []);

  return (
    <div className='container mx-auto p-6'>
      <h1 className='mb-6 text-2xl font-bold'>Dashboard</h1>
      <div className='grid gap-6 md:grid-cols-3'>
        <Card>
          <CardHeader>
            <CardTitle>Servizi</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>{counts.services}</p>
            <p className='text-sm text-muted-foreground'>Totale servizi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Membri del Team</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>{counts.team}</p>
            <p className='text-sm text-muted-foreground'>Membri del team</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Immagini Galleria</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>{counts.gallery}</p>
            <p className='text-sm text-muted-foreground'>Immagini glleria</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
