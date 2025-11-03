import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schema_helpers';
import { relations } from 'drizzle-orm';
import { ReservationsTable } from '../schema';

export const MoviesTable = pgTable('movies', {
  id,
  title: varchar('title', { length: 150 }).notNull(),
  playedUntil: timestamp('played_until', { withTimezone: true }).notNull(),
  createdAt,
  updatedAt,
});

export const MoviesRelations = relations(MoviesTable, ({ many }) => ({
  reservations: many(ReservationsTable),
}));
