import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { Database } from '@/lib/types';

export async function PUT(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const { id, data } = await request.json();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error('Unauthorized');

    const { error } = await supabase.from('contacts').update(data).eq('id', id);

    if (error) throw new Error(error.message);

    revalidatePath('/contacts');
    revalidatePath('/admin/contacts');

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const { id } = await request.json();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error('Unauthorized');

    const { error } = await supabase.from('contacts').delete().eq('id', id);

    if (error) throw new Error(error.message);

    revalidatePath('/contacts');
    revalidatePath('/admin/contacts');

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
