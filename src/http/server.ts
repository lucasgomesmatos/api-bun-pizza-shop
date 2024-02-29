import cookie from '@elysiajs/cookie'
import { cors } from '@elysiajs/cors'
import jwt from '@elysiajs/jwt'
import swagger from '@elysiajs/swagger'
import { Elysia, t } from 'elysia'
import { env } from '../env/env'
import { registerRestaurant } from './routes/register-restaurant'
import { sendAuthLink } from './routes/send-auth-link'

const app = new Elysia()
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
  .use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    }),
  )
  .use(swagger())
  .use(registerRestaurant)
  .use(sendAuthLink)

app.listen(env.PORT, () => {
  console.log('Server is running on port 3333')
})
