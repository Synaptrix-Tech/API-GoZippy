import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetAddressesByUserUseCase } from '@/modules/address/factories/make-get-addresses-by-user'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getAddressesByUserUseCase = makeGetAddressesByUserUseCase()

    const { addresses } = await getAddressesByUserUseCase.execute({
      userId: request.user.sub,
    })

    return reply.status(200).send(addresses)
  } catch (err) {
    return reply.status(400).send({ message: err })
  }
}
