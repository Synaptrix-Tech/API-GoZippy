import { Prisma, Address } from '@prisma/client'
import { IAddressesRepository } from '../IAddressesRepository'
import { randomUUID } from 'node:crypto'

export class InMemoryAddressesRepository implements IAddressesRepository {
  public addresses: Address[] = []

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
      selected: false,
    }

    this.addresses.push(address)

    return address
  }
}
