import { FormSkeleton } from '@/components/ui/skeletons';

export default function Loading() {
  return (
    <main className='flex min-h-screen items-center justify-center'>
      <FormSkeleton />
    </main>
  );
}
