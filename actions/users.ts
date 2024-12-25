import { supabase } from '@/lib/supabase';

export async function createAdminUser(email: string, password: string) {
  const { data: authUser, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw authError;
  if (!authUser.user) throw new Error('Creazione utente admin non riuscita');

  const { error: dbError } = await supabase.from('users').insert({
    id: authUser.user.id,
    email,
    password,
    is_admin: true,
  });

  if (dbError) throw dbError;
  return authUser.user;
}

export async function isUserAdmin(id: string): Promise<boolean> {
  const { data, error } = await supabase.from('users').select('is_admin').eq('id', id).single();

  if (error) throw error;
  return !!data?.is_admin;
}
