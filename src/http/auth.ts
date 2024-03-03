import cookie from '@elysiajs/cookie'
import jwt from '@elysiajs/jwt'
import { Elysia, t, type Static } from 'elysia'
import { env } from '../env/env'

const jwtPayload = t.Object({
  sub: t.String(),
  restaurantId: t.Optional(t.String()),
})

export const auth = new Elysia()
  .use(
    jwt({
      secret: env.SECRET_KEY,
      schema: jwtPayload,
      algorithms: ['HS256'],
    }),
  )
  .use(cookie())
  .derive(({ jwt: { sign }, setCookie, removeCookie }) => {
    return {
      signUser: async (payload: Static<typeof jwtPayload>) => {
        const token = await sign(payload)

        setCookie('auth', token, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/',
        })
      },

      signOutUser: () => {
        removeCookie('auth')
      },
    }
  })
