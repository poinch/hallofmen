import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/types';

export async function getServices(): Promise<Database['public']['Tables']['services']['Row'][]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('price', { ascending: true })
    .returns<Database['public']['Tables']['services']['Row'][]>();

  if (error) {
    console.error('Error fetching services:', error);
    throw new Error('Failed to fetch services');
  }

  return data || [];
}
