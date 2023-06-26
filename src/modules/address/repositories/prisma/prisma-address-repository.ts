import { Address, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { IAddressesRepository } from '../IAddressesRepository'

export class PrismaAddressRepository implements IAddressesRepository {
  async findAddressesByUserId(userId: string): Promise<Address[] | null> {
    const addresses = await prisma.address.findMany({
      where: {
        userId,
      },
    })

    return addresses
  }

  async create(data: Prisma.AddressUncheckedCreateInput): Promise<Address> {
    const address = await prisma.address.create({ data })

    return address
  }
}
