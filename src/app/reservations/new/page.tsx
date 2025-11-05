import CreateReservation from '@/components/create-reservation';
import { getMovies } from '@/lib/actions';

export default async function NewReservation() {
  const movies = await getMovies();
  return (
    <main className='flex min-h-screen items-center justify-center'>
      <CreateReservation movies={movies} />
    </main>
  );
}
