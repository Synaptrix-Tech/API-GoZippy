import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryAddressesRepository } from '../repositories/in-memory/in-memory-addresses-repository'
import { CreateUseCase } from './create'

let addressesRepository: InMemoryAddressesRepository
let sut: CreateUseCase

describe('Address Use Case', () => {
  beforeEach(() => {
    addressesRepository = new InMemoryAddressesRepository()
    sut = new CreateUseCase(addressesRepository)
  })

  it('should be able to create a new address', async () => {
    const { address } = await sut.execute({
      userId: 'user-id',
      street: 'street',
      city: 'city',
      state: 'state',
      country: 'country',
      zipCode: 'zip-code',
      number: 'number',
    })

    expect(address.id).toEqual(expect.any(String))
  })
})
