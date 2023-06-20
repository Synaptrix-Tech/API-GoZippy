import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryDriversRepository } from '../repositories/in-memory/in-memory-drivers-repository'
import { AuthenticateUseCase } from './authenticate'

let driversRepository: InMemoryDriversRepository
let sut: AuthenticateUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    driversRepository = new InMemoryDriversRepository()
    sut = new AuthenticateUseCase(driversRepository)
  })

  it('should be able to authenticate', async () => {
    const password_hash = await hash('123456', 8)

    await driversRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123456789',
      password_hash,
      driver_license: '123456',
      license_plate: '123456',
      vehicle_model: 'Model Example',
    })

    const { driver } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(driver.id).toEqual(expect.any(String))
  })
})
