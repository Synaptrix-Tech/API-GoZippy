import { Address, Prisma } from '@prisma/client'

export interface IAddressesRepository {
  create(data: Prisma.AddressUncheckedCreateInput): Promise<Address>
}
