import { getAuthenticatedClient } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function PUT(request: NextRequest) {
  try {
    const { id, data, accessToken } = await request.json();
    const supabase = await getAuthenticatedClient(accessToken);

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
    const { id, accessToken } = await request.json();
    const supabase = await getAuthenticatedClient(accessToken);

    const { error } = await supabase.from('contacts').delete().eq('id', id);

    if (error) throw new Error(error.message);

    revalidatePath('/contacts');
    revalidatePath('/admin/contacts');

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
