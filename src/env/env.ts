import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.string().default('development'),
  DATABASE_URL: z.string().url().min(1),
  API_BASE_URL: z.string().url().min(1),
  AUTH_REDIRECT_URL: z.string().url().min(1),
  SECRET_KEY: z.string().min(1),
})

export const env = envSchema.parse(process.env)
