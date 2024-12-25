import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/types';

export async function getHours(): Promise<Database['public']['Tables']['hours']['Row'][]> {
  const { data, error } = await supabase
    .from('hours')
    .select('*')
    .order('created_at', { ascending: false })
    .returns<Database['public']['Tables']['hours']['Row'][]>();

  if (error) {
    console.error('Error fetching hours:', error);
    throw new Error('Failed to fetch hours');
  }

  return data || [];
}

export async function getContacts(): Promise<Database['public']['Tables']['contacts']['Row']> {
  const { data, error } = await supabase.from('contacts').select('*').single();

  if (error) {
    console.error('Error fetching contacts:', error);
    throw new Error('Failed to fetch contacts');
  }

  return data;
}

export async function getSocialLinks(): Promise<
  Database['public']['Tables']['social_links']['Row']
> {
  const { data, error } = await supabase.from('social_links').select('*').single();

  if (error) {
    console.error('Error fetching social links:', error);
    throw new Error('Failed to fetch social links');
  }

  return data;
}
