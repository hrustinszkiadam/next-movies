import {
  uuid,
  pgTable,
  smallint,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schema_helpers';
import { MoviesTable } from '../schema';
import { relations } from 'drizzle-orm';

export const ReservationsTable = pgTable('reservations', {
  id,
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).notNull(),
  date: timestamp('date', { withTimezone: true }).notNull(),
  seats: smallint('seats').notNull(),
  movieId: uuid('movie_id')
    .notNull()
    .references(() => MoviesTable.id),
  createdAt,
  updatedAt,
});

export const ReservationsRelations = relations(
  ReservationsTable,
  ({ one }) => ({
    movie: one(MoviesTable, {
      fields: [ReservationsTable.movieId],
      references: [MoviesTable.id],
    }),
  }),
);
