import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function addressRoutes(app: FastifyInstance) {
  app.post('/', { onRequest: verifyJWT }, create)
}
