import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { Database } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const { data } = await request.json();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error('Unauthorized');

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
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const { id, data } = await request.json();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error('Unauthorized');

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
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const { id } = await request.json();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error('Unauthorized');

    const { error } = await supabase.from('gallery').delete().eq('id', id);

    if (error) throw new Error(error.message);

    revalidatePath('/gallery');
    revalidatePath('/admin/gallery');

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
