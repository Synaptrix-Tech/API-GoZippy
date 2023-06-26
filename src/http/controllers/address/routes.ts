import { FastifyInstance } from 'fastify'

import { create } from './create'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { get } from './get'

export async function addressRoutes(app: FastifyInstance) {
  app.get('/', { onRequest: verifyJWT }, get)

  app.post('/', { onRequest: verifyJWT }, create)
}
