import { Driver, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

import { IDriversRepository } from '../IDriversRepository'

export class PrismaDriversRepository implements IDriversRepository {
  async findDriverByEmail(email: string): Promise<Driver | null> {
    const driver = await prisma.driver.findUnique({
      where: {
        email,
      },
    })

    return driver
  }

  async findDriverByDriverLicense(
    driver_license: string,
  ): Promise<Driver | null> {
    const driver = await prisma.driver.findUnique({
      where: {
        driver_license,
      },
    })

    return driver
  }

  async findDriverByLicensePlate(
    license_plate: string,
  ): Promise<Driver | null> {
    const driver = await prisma.driver.findUnique({
      where: {
        license_plate,
      },
    })

    return driver
  }

  async create(data: Prisma.DriverCreateInput): Promise<Driver> {
    const driver = await prisma.driver.create({ data })

    return driver
  }
}
