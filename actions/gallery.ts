import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/types';

export async function getGalleryItems(): Promise<Database['public']['Tables']['gallery']['Row'][]> {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false })
    .returns<Database['public']['Tables']['gallery']['Row'][]>();

  if (error) {
    console.error('Error fetching gallery items:', error);
    throw new Error('Failed to fetch gallery items');
  }

  return data || [];
}
