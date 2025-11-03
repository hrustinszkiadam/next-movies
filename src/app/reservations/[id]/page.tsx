import { getReservationById } from '@/lib/actions';
import { cn } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { Activity } from 'react';

export default async function Reservation({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{
    success?: string;
  }>;
}) {
  const { id } = await params;
  const success = (await searchParams)?.success === 'true' || false;

  const reservation = await getReservationById(id);
  if (!reservation) {
    return notFound();
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-6'>
      <Activity mode={success ? 'visible' : 'hidden'}>
        <h1 className='mb-6 text-5xl font-bold text-green-600'>
          Sikeres Foglalás
        </h1>
      </Activity>
      <h2
        className={cn('font-semibold', {
          'text-3xl': success,
          'text-4xl': !success,
        })}
      >
        {success ? 'Részletek' : 'Foglalás Részletei'}
      </h2>
      <div className='flex flex-col gap-4 text-justify font-mono text-lg text-pretty'>
        <ReservationData title='Foglalás Dátuma: '>
          {reservation.createdAt.toLocaleDateString()}{' '}
          {reservation.createdAt.toLocaleTimeString()}
        </ReservationData>
        <ReservationData title='Film címe: '>
          {reservation.movie.title}
        </ReservationData>
        <ReservationData title='Foglalt helyek: '>
          {reservation.seats} db
        </ReservationData>
        <ReservationData title='Foglalási név: '>
          {reservation.name}
        </ReservationData>
        <ReservationData title='Foglalási email: '>
          {reservation.email}
        </ReservationData>
      </div>
    </main>
  );
}

function ReservationData({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <span>
      <span className='font-semibold'>{title}</span>
      <span>{children}</span>
    </span>
  );
}
