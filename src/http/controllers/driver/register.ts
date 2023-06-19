import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeRegisterUseCase } from '@/modules/driver/factories/make-register-use-case'
import { DriverEmailAlreadyExistsError } from '@/modules/driver/errors/driver-email-already-exists-error'
import { DriverLicenseAlreadyRegisteredError } from '@/modules/driver/errors/driver-license-already-exists-error'
import { LicensePlateAlreadyRegisteredError } from '@/modules/driver/errors/license-plate-already-registered-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().min(11),
    password: z.string().min(6),
    driver_license: z.string(),
    license_plate: z.string(),
    vehicle_model: z.string(),
  })

  const {
    name,
    email,
    phone,
    password,
    driver_license,
    license_plate,
    vehicle_model,
  } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name,
      email,
      phone,
      password,
      driver_license,
      license_plate,
      vehicle_model,
    })
  } catch (err) {
    if (err instanceof DriverEmailAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof DriverLicenseAlreadyRegisteredError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof LicensePlateAlreadyRegisteredError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
