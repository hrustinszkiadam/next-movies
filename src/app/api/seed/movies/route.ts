import { placeholderMovies } from '@/lib/placeholder-data';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { tryCatch } from '@/lib/utils';
import { MoviesTable } from '@/database/schema';
import { env } from '@/env';

export async function GET(request: NextRequest) {
  const movies = placeholderMovies(new Date());
  const url = request.nextUrl;
  const seedPassword =
    url.searchParams.get('password') || url.searchParams.get('p');

  if (seedPassword !== env.SEED_PASSWORD) {
    return NextResponse.json(
      { message: 'Nem engedélyezett: Helytelen jelszó' },
      { status: 401 },
    );
  }

  const [, deleteError] = await tryCatch(db.delete(MoviesTable).returning());
  if (deleteError) {
    return NextResponse.json(
      { message: 'Adatbázis hiba a régi filmek törlése során' },
      { status: 500 },
    );
  }

  const [rows, createError] = await tryCatch(
    db.insert(MoviesTable).values(movies).returning(),
  );

  if (createError || rows.length === 0) {
    return NextResponse.json(
      {
        message: 'Adatbázis hiba a filmek hozzáadása során',
        error: createError,
      },
      { status: 500 },
    );
  }

  revalidatePath('/');
  revalidateTag('movies', 'max');
  redirect('/');
}
