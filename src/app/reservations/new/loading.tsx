import { CardSkeleton } from '@/components/ui/skeletons';

export default function Loading() {
  return (
    <main className='flex min-h-screen items-center justify-center'>
      <CardSkeleton />
    </main>
  );
}
