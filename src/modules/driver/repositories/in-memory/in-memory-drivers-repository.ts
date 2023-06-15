import { Prisma, Driver } from '@prisma/client'
import { IDriversRepository } from '../IDriversRepository'
import { randomUUID } from 'crypto'

export class InMemoryDriversRepository implements IDriversRepository {
  public drivers: Driver[] = []

  async create(data: Prisma.DriverCreateInput): Promise<Driver> {
    const driver = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      password_hash: data.password_hash,
      driver_license: data.driver_license,
      license_plate: data.license_plate,
      vehicle_model: data.vehicle_model,
      photo: null,
      created_at: new Date(),
    }

    this.drivers.push(driver)

    return driver
  }
}
