import { Prisma, Driver } from '@prisma/client'
import { IDriversRepository } from '../IDriversRepository'
import { randomUUID } from 'crypto'

export class InMemoryDriversRepository implements IDriversRepository {
  public drivers: Driver[] = []

  async findDriverByEmail(email: string): Promise<Driver | null> {
    const driver = this.drivers.find((driver) => driver.email === email)

    if (!driver) {
      return null
    }

    return driver
  }

  async findDriverByDriverLicense(
    driver_license: string,
  ): Promise<Driver | null> {
    const driver = this.drivers.find(
      (driver) => driver.driver_license === driver_license,
    )

    if (!driver) {
      return null
    }

    return driver
  }

  async findDriverByLicensePlate(
    license_plate: string,
  ): Promise<Driver | null> {
    const driver = this.drivers.find(
      (driver) => driver.license_plate === license_plate,
    )

    if (!driver) {
      return null
    }

    return driver
  }

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
