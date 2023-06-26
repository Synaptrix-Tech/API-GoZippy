import { PrismaAddressRepository } from '../repositories/prisma/prisma-address-repository'
import { CreateUseCase } from '../use-cases/create'

export function makeCreateAddressUseCase() {
  const addressRepository = new PrismaAddressRepository()
  const createAddressUseCase = new CreateUseCase(addressRepository)

  return createAddressUseCase
}
