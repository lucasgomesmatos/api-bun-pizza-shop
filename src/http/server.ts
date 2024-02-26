import { Elysia } from 'elysia';
import { env } from '../env/env';

const app = new Elysia().get('/', () => {
  return 'Hello, World!';
});

app.listen(env.PORT, () => {
  console.log('Server is running on port 3333');
});
