import { Prisma, Address } from '@prisma/client'
import { IAddressesRepository } from '../IAddressesRepository'
import { randomUUID } from 'node:crypto'

export class InMemoryAddressesRepository implements IAddressesRepository {
  public addresses: Address[] = []

  async findAddressesByUserId(userId: string): Promise<Address[] | null> {
    const addresses = this.addresses.filter(
      (address) => address.userId === userId,
    )

    if (!addresses) {
      return null
    }

    return addresses
  }

  async create(data: Prisma.AddressUncheckedCreateInput): Promise<Address> {
    const address = {
      id: randomUUID(),
      userId: data.userId,
      street: data.street,
      city: data.city,
      state: data.state,
      country: data.country,
      zipCode: data.zipCode,
      number: data.number,
      complement: data.complement ? data.complement : null,
      selected: data.selected,
    }

    this.addresses.push(address)

    return address
  }
}
