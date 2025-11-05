import BackButton from '@/components/back-button';

export default function NotFound() {
  return (
    <main className='flex min-h-screen w-screen flex-col items-center justify-center gap-4 text-center'>
      <h1 className='text-4xl font-bold'>404 - Az oldal nem található</h1>
      <p className='text-pretty'>
        Sajnáljuk, de az általad keresett oldal nem létezik.
      </p>
      <BackButton />
    </main>
  );
}
