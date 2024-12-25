import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/types';

export async function getTeamMembers(): Promise<
  Database['public']['Tables']['team_members']['Row'][]
> {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('name')
    .returns<Database['public']['Tables']['team_members']['Row'][]>();

  if (error) {
    console.error('Error fetching team members:', error);
    throw new Error('Failed to fetch team members');
  }

  return data || [];
}
