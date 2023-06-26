import { Address, Prisma } from '@prisma/client'

export interface IAddressesRepository {
  findAddressesByUserId(userId: string): Promise<Address[] | null>
  create(data: Prisma.AddressUncheckedCreateInput): Promise<Address>
}
