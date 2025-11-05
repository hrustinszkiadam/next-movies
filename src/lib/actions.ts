'use server';

import {
  NewReservationState,
  NewReservationSchema,
  ReservationWithMovie,
} from '@/lib/definitions';
import { getTomorrowDate, tryCatch } from './utils';
import { db } from '@/database';
import { ReservationsTable } from '@/database/schema';
import { cache } from 'react';
import { cacheLife, cacheTag } from 'next/cache';
import { eq, gt } from 'drizzle-orm';
import { flattenError } from 'zod';
import { redirect } from 'next/navigation';

export async function createReservation(
  prevState: NewReservationState,
  data: FormData,
): Promise<NewReservationState> {
  const newState: NewReservationState = {
    values: {
      name: (data.get('name') as string) || '',
      email: (data.get('email') as string) || '',
      date: (data.get('date') as string) || getTomorrowDate(),
    },
    message: null,
    errors: {},
  };
  const validatedReservation = NewReservationSchema.safeParse({
    name: data.get('name'),
    email: data.get('email'),
    date: data.get('date'),
    seats: Number(data.get('seats')),
    movieId: data.get('movieId'),
  });
  if (!validatedReservation.success) {
    return {
      ...newState,
      errors: flattenError(validatedReservation.error)
        .fieldErrors as NewReservationState['errors'],
    };
  }

  const newReservation = validatedReservation.data;

  const movie = await db.query.MoviesTable.findFirst({
    where: (t) => eq(t.id, newReservation.movieId),
  });
  if (!movie) {
    return {
      ...newState,
      errors: {
        movieId: ['A kiválasztott film nem létezik.'],
      },
    };
  }
  if (new Date(newReservation.date) > movie.playedUntil) {
    return {
      ...newState,
      errors: {
        date: ['A kiválasztott dátum meghaladja a film vetítési időszakát.'],
      },
    };
  }

  const [rows, error] = await tryCatch(
    db.insert(ReservationsTable).values(newReservation).returning(),
  );
  if (error || !rows.length) {
    return {
      ...newState,
      message:
        'Sajnáljuk, hiba történt a foglalás létrehozásakor. Kérjük, próbáld újra később.',
    };
  }

  redirect('/reservations/' + rows[0].id + '?success=true');
}

export const getReservationById = cache(
  async (id: string): Promise<ReservationWithMovie | null> => {
    'use cache';
    cacheTag('reservations');

    const [reservation, error] = await tryCatch(
      db.query.ReservationsTable.findFirst({
        where: (reservationsTable) => eq(reservationsTable.id, id),
        with: { movie: true },
      }),
    );
    if (error || !reservation) {
      return null;
    }
    return reservation;
  },
);

export const getMovies = cache(async () => {
  'use cache';
  cacheTag('movies');
  cacheLife({
    stale: 1000 * 30,
    revalidate: 1000 * 60 * 5,
  });

  const movies = await db.query.MoviesTable.findMany({
    where: (moviesTable) => gt(moviesTable.playedUntil, new Date()),
    orderBy: (moviesTable) => {
      return [moviesTable.playedUntil, moviesTable.title];
    },
  });
  return movies;
});
