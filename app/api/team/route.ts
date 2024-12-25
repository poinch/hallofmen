import { getAuthenticatedClient } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const { data, accessToken } = await request.json();
    const supabase = await getAuthenticatedClient(accessToken);

    const { data: member, error } = await supabase
      .from('team_members')
      .insert([data])
      .select()
      .single();

    if (error) throw new Error(error.message);

    revalidatePath('/team');
    revalidatePath('/admin/team');

    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, data, accessToken } = await request.json();
    const supabase = await getAuthenticatedClient(accessToken);

    const { data: member, error } = await supabase
      .from('team_members')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    revalidatePath('/team');
    revalidatePath('/admin/team');

    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id, accessToken } = await request.json();
    const supabase = await getAuthenticatedClient(accessToken);

    const { error } = await supabase.from('team_members').delete().eq('id', id);

    if (error) throw new Error(error.message);

    revalidatePath('/team');
    revalidatePath('/admin/team');

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
