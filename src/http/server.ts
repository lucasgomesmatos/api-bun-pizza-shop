import { Elysia } from 'elysia'
import { env } from '../env/env'
import { registerRestaurant } from './routes/register-restaurant'
import { sendAuthLink } from './routes/send-auth-link'

const app = new Elysia().use(registerRestaurant).use(sendAuthLink)

app.listen(env.PORT, () => {
  console.log('Server is running on port 3333')
})
