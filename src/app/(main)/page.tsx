import MoviesTable from '@/components/movies-table';
import MoviesTableSkeleton from '@/components/ui/skeletons';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className='flex min-h-screen w-screen flex-col items-center justify-center gap-12 overflow-hidden px-4 xl:flex-row xl:gap-20 xl:px-0'>
      <section className='flex flex-col items-center gap-4 text-center tracking-wide lg:text-lg xl:items-end'>
        <h1 className='m-0 text-3xl font-bold md:text-4xl lg:text-5xl'>
          Mozi Jegyfoglaló
        </h1>
        <p className='text-pretty'>Foglaljon jegyet most kedvenc filmjeire</p>
        <Link
          className='bg-foreground text-background hover:bg-foreground/90 w-full cursor-default rounded-md px-10 py-2 xl:w-auto xl:py-3'
          href='/reservations/new'
        >
          Foglalás
        </Link>
      </section>
      <section className='flex w-full max-w-full flex-col items-center md:w-fit md:max-w-fit'>
        <h2 className='mb-4 text-center text-2xl font-bold'>
          Jelenlegi Filmek
        </h2>
        <div className='h-96 max-w-full overflow-auto xl:self-start'>
          <Suspense fallback={<MoviesTableSkeleton />}>
            <MoviesTable />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
