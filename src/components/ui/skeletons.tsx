export const CardSkeleton = () => (
  <div className='bg-accent-foreground h-[75vh] w-[90vw] animate-pulse rounded-lg md:w-[40vw]'></div>
);

export default function MoviesTableSkeleton() {
  return (
    <div className='bg-foreground h-full w-full animate-pulse rounded-lg md:w-lg lg:w-xl'></div>
  );
}
