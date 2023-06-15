import { Prisma, Driver } from '@prisma/client'

export interface IDriversRepository {
  create(data: Prisma.DriverCreateInput): Promise<Driver>
}
