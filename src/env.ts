import { createEnv } from '@t3-oss/env-nextjs';
import z from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().nonempty(),
    SEED_PASSWORD: z.string().nonempty(),
    DEV_HOST: z.string().nonempty(),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    SEED_PASSWORD: process.env.SEED_PASSWORD,
    DEV_HOST: process.env.DEV_HOST,
  },
});
