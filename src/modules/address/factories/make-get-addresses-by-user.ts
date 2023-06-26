import { PrismaAddressRepository } from '../repositories/prisma/prisma-address-repository'
import { GetAddressesByUser } from '../use-cases/get-addresses-by-user'

export function makeGetAddressesByUserUseCase() {
  const addressRepository = new PrismaAddressRepository()
  const getAddressesByUserUseCase = new GetAddressesByUser(addressRepository)

  return getAddressesByUserUseCase
}
