import { FastifyInstance } from 'fastify'

import { register } from './register'

export async function driversRoutes(app: FastifyInstance) {
  app.post('/drivers', register)
}
