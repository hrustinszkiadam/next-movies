import CreateReservation from '@/components/create-reservation';
import { CardSkeleton } from '@/components/ui/skeletons';
import { getMovies } from '@/lib/actions';
import { Suspense } from 'react';

export default async function Home() {
  const movies = await getMovies();
  return (
    <main className='flex min-h-screen items-center justify-center'>
      <Suspense fallback={<CardSkeleton />}>
        <CreateReservation movies={movies} />
      </Suspense>
    </main>
  );
}
