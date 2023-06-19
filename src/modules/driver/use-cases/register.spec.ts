import { expect, describe, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'

import { RegisterUseCase } from './register'
import { InMemoryDriversRepository } from '../repositories/in-memory/in-memory-drivers-repository'

let driversRepository: InMemoryDriversRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    driversRepository = new InMemoryDriversRepository()
    sut = new RegisterUseCase(driversRepository)
  })

  it('should be able to register', async () => {
    const { driver } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123456789',
      password: '123456',
      driver_license: '123456',
      license_plate: '123456',
      vehicle_model: 'Model Example',
    })

    expect(driver.id).toEqual(expect.any(String))
  })

  it('should hash driver password upon registration', async () => {
    const { driver } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123456789',
      password: '123456',
      driver_license: '123456',
      license_plate: '123456',
      vehicle_model: 'Model Example',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      driver.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      phone: '123456789',
      password: '123456',
      driver_license: '123456',
      license_plate: '123456',
      vehicle_model: 'Model Example',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        phone: '123456789',
        password: '123456',
        driver_license: '123456',
        license_plate: '123456',
        vehicle_model: 'Model Example',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to register with same driver license twice', async () => {
    const driver_license = '123456'

    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123456789',
      password: '123456',
      driver_license,
      license_plate: '123456',
      vehicle_model: 'Model Example',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123456789',
        password: '123456',
        driver_license,
        license_plate: '123456',
        vehicle_model: 'Model Example',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to register with same license plate twice', async () => {
    const license_plate = '123456'

    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123456789',
      password: '123456',
      driver_license: '123456',
      license_plate,
      vehicle_model: 'Model Example',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123456789',
        password: '123456',
        driver_license: '123456',
        license_plate,
        vehicle_model: 'Model Example',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
