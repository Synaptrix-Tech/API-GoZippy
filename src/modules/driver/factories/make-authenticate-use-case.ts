import { PrismaDriversRepository } from '../repositories/prisma/prisma-drivers-repository'
import { AuthenticateUseCase } from '../use-cases/authenticate'

export function makeAuthenticateUseCase() {
  const driversRepository = new PrismaDriversRepository()
  const authenticateUseCase = new AuthenticateUseCase(driversRepository)

  return authenticateUseCase
}
