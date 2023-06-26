import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreateAddressUseCase } from '@/modules/address/factories/make-create-adress-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    zipCode: z.string(),
    number: z.string(),
    complement: z.string().optional(),
  })

  const { street, city, state, country, zipCode, number, complement } =
    createBodySchema.parse(request.body)

  try {
    const createAddressUseCase = makeCreateAddressUseCase()

    const { address } = await createAddressUseCase.execute({
      userId: request.user.sub,
      street,
      city,
      state,
      country,
      zipCode,
      number,
      complement,
    })

    return reply.status(201).send(address)
  } catch (err) {
    return reply.status(400).send({ message: err })
  }
}
