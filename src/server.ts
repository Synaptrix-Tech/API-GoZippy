import fastify from 'fastify'

import { env } from './env'

const app = fastify()

const { PORT } = env

app.get('/', async (request, reply) => {
  return { hello: 'world' }
})

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log('🚀 HTTP Server Running!')
  })
