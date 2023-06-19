import { PrismaDriversRepository } from '../repositories/prisma/prisma-drivers-repository'
import { RegisterUseCase } from '../use-cases/register'

export function makeRegisterUseCase() {
  const driversRepository = new PrismaDriversRepository()
  const registerUseCase = new RegisterUseCase(driversRepository)

  return registerUseCase
}
