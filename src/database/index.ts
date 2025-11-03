import { env } from '@/env';
import { drizzle as drizzlePostgres } from 'drizzle-orm/node-postgres';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

const isNeon = env.DATABASE_URL.includes('neon');

export const db = isNeon
  ? drizzleNeon({
      client: neon(env.DATABASE_URL),
      schema,
      casing: 'snake_case',
    })
  : drizzlePostgres(env.DATABASE_URL, {
      schema,
      casing: 'snake_case',
    });
