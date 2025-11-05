import BackButton from '@/components/back-button';
import { getReservationById } from '@/lib/actions';
import { cn, formatDate } from '@/lib/utils';
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
    <main className='flex min-h-screen w-screen flex-col items-center justify-center gap-6 p-4 md:px-0'>
      <Activity mode={success ? 'visible' : 'hidden'}>
        <h1 className='mb-6 text-3xl font-bold text-green-600 md:text-5xl'>
          Sikeres Foglalás
        </h1>
      </Activity>
      <h2
        className={cn('font-semibold', {
          'text-xl md:text-3xl': success,
          'text-2xl md:text-4xl': !success,
        })}
      >
        {success ? 'Részletek' : 'Foglalás Részletei'}
      </h2>
      <div className='flex flex-col gap-4 text-justify font-mono text-pretty md:text-lg'>
        <ReservationData title='Foglalás Dátuma'>
          {formatDate(reservation.createdAt)}
        </ReservationData>
        <ReservationData title='Film címe'>
          {reservation.movie.title}
        </ReservationData>
        <ReservationData title='Foglalt helyek'>
          {reservation.seats} db
        </ReservationData>
        <ReservationData title='Foglalási név'>
          {reservation.name}
        </ReservationData>
        <ReservationData title='Foglalási email'>
          {reservation.email}
        </ReservationData>
      </div>
      <BackButton />
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
    <span className='flex flex-col gap-2 md:flex-row'>
      <span className='font-semibold text-nowrap'>
        {title}
        <span className='hidden md:inline-block'>:</span>
      </span>
      <span>{children}</span>
    </span>
  );
}
