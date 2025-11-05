import { getMovies } from '@/lib/actions';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { formatDate } from '@/lib/utils';

export default async function MoviesTable() {
  const movies = await getMovies();

  return (
    <Table className='h-full w-full rounded-lg md:w-lg md:text-lg lg:w-xl'>
      <TableCaption>A jelenleg elérhető filmek.</TableCaption>
      <TableHeader>
        <TableRow className='text-lg'>
          <TableHead className='font-bold'>Film Címe</TableHead>
          <TableHead className='text-right font-bold'>Utolsó Vetítés</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {movies.map((movie) => (
          <MovieRow
            key={movie.id}
            title={movie.title}
            playedUntil={movie.playedUntil}
          />
        ))}
      </TableBody>
    </Table>
  );
}

function MovieRow({
  title,
  playedUntil,
}: {
  title: string;
  playedUntil: Date;
}) {
  return (
    <TableRow>
      <TableCell className='font-medium'>{title}</TableCell>
      <TableCell className='text-right'>{formatDate(playedUntil)}</TableCell>
    </TableRow>
  );
}
