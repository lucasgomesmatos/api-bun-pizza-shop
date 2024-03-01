import cookie from '@elysiajs/cookie'
import jwt from '@elysiajs/jwt'
import { Elysia, t } from 'elysia'
import { env } from '../env/env'

export const auth = new Elysia()
  .use(
    jwt({
      secret: env.SECRET_KEY,
      schema: t.Object({
        sub: t.String(),
        restaurantId: t.Optional(t.String()),
      }),
      algorithms: ['HS256'],
    }),
  )
  .use(cookie())
