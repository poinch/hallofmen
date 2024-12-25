import { getAuthenticatedClient } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const { data, accessToken } = await request.json();
    const supabase = await getAuthenticatedClient(accessToken);

    const { data: item, error } = await supabase.from('gallery').insert([data]).select().single();

    if (error) throw new Error(error.message);

    revalidatePath('/gallery');
    revalidatePath('/admin/gallery');

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, data, accessToken } = await request.json();
    const supabase = await getAuthenticatedClient(accessToken);

    const { data: item, error } = await supabase
      .from('gallery')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    revalidatePath('/gallery');
    revalidatePath('/admin/gallery');

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id, accessToken } = await request.json();
    const supabase = await getAuthenticatedClient(accessToken);

    const { error } = await supabase.from('gallery').delete().eq('id', id);

    if (error) throw new Error(error.message);

    revalidatePath('/gallery');
    revalidatePath('/admin/gallery');

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
