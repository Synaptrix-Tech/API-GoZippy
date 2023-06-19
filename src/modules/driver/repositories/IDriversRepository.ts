import { Prisma, Driver } from '@prisma/client'

export interface IDriversRepository {
  findDriverByEmail(email: string): Promise<Driver | null>
  findDriverByDriverLicense(driver_license: string): Promise<Driver | null>
  findDriverByLicensePlate(license_plate: string): Promise<Driver | null>
  create(data: Prisma.DriverCreateInput): Promise<Driver>
}
