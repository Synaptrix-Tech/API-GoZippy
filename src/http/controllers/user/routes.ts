import { FastifyInstance } from 'fastify'

import { register } from './register'
import { authenticate } from './authenticate'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', register)
  app.post('/sessions', authenticate)
}
