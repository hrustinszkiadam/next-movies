import { MoviesTable, ReservationsTable } from '@/database/schema';
import z from 'zod';

export const NewReservationSchema = z.object({
  name: z
    .string()
    .min(2, 'A névnek legalább 2 karakter hosszúnak kell lennie.')
    .max(100, 'A név nem lehet hosszabb 100 karakternél.'),
  email: z
    .email('Érvényes email címet kell megadni.')
    .max(100, 'Az email cím nem lehet hosszabb 100 karakternél.'),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Érvényes dátumot kell megadni.',
    })
    .refine((val) => new Date(val) >= new Date(), {
      message: 'A dátumnak a jövőben kell lennie.',
    })
    .transform((val) => new Date(val)),
  seats: z
    .number()
    .min(1, 'Legalább 1 jegyet kell foglalni.')
    .max(10, 'Legfeljebb 10 jegyet lehet foglalni egyszerre.'),
  movieId: z.uuid('Érvényes film azonosítót kell megadni.'),
});

export type NewReservation = z.infer<typeof NewReservationSchema>;
export type NewReservationState = {
  values: Partial<Record<keyof NewReservation, string | number>>;
  errors?: Partial<Record<keyof NewReservation, string[]>>;
  message?: string | null;
};

export type Reservation = typeof ReservationsTable.$inferSelect;
export type Movie = typeof MoviesTable.$inferSelect;
export type NewMovie = typeof MoviesTable.$inferInsert;

export type ReservationWithMovie = Reservation & {
  movie: Movie;
};
