import fastify from 'fastify'
import { usersRoutes } from './http/controllers/user/routes'

export const app = fastify()

app.register(usersRoutes)
