import Link from 'next/link';

type BackButtonProps = Readonly<{
  to?: string;
}>;
export default function BackButton({ to = '/' }: BackButtonProps) {
  return (
    <Link
      href={to}
      className='bg-foreground text-background hover:bg-foreground/90 mt-8 cursor-default rounded-md px-6 py-2 text-center'
    >
      Vissza a Főoldalra
    </Link>
  );
}
