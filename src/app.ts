import fastify from 'fastify'
import { ZodError } from 'zod'
import fastifySwagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import path from 'node:path'

import { env } from './env'
import { usersRoutes } from './http/controllers/user/routes'
import { driversRoutes } from './http/controllers/driver/routes'

export const app = fastify()

const pathOpenApi = path.join(__dirname, 'docs', 'openapi.json')

app.register(fastifySwagger, {
  mode: 'static',
  specification: {
    path: pathOpenApi,
    baseDir: path.join(__dirname, 'docs'),
  },
})

app.register(swaggerUI, {
  baseDir: path.join(__dirname, 'docs'),
  routePrefix: '/docs',
  staticCSP: true,
})

app.register(usersRoutes, {
  prefix: '/users',
})

app.register(driversRoutes, {
  prefix: '/drivers',
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like 'DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
