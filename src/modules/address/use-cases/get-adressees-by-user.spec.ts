import { expect, describe, it, beforeEach } from 'vitest'

import { GetAddressesByUser } from './get-addresses-by-user'

import { InMemoryAddressesRepository } from '../repositories/in-memory/in-memory-addresses-repository'

let addressesRepository: InMemoryAddressesRepository
let sut: GetAddressesByUser

describe('Address Use Case', () => {
  beforeEach(() => {
    addressesRepository = new InMemoryAddressesRepository()
    sut = new GetAddressesByUser(addressesRepository)
  })

  it('should be able to create a new address', async () => {
    await addressesRepository.create({
      userId: 'user-id',
      street: 'street',
      city: 'city',
      state: 'state',
      country: 'country',
      zipCode: 'zip-code',
      number: 'number',
      selected: true,
    })

    await addressesRepository.create({
      userId: 'user-id',
      street: 'street',
      city: 'city',
      state: 'state',
      country: 'country',
      zipCode: 'zip-code',
      number: 'number',
      selected: false,
    })

    const { addresses } = await sut.execute({
      userId: 'user-id',
    })

    expect(addresses).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
        }),
      ]),
    )
  })
})
