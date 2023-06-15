import { Prisma, User } from '@prisma/client'
import { IUsersRepository } from '../IUsersRepository'
import { prisma } from '@/lib/prisma'

export class PrismaUsersRepository implements IUsersRepository {
  findUserByEmail(email: string): Promise<User | null> {
    const user = prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data })

    return user
  }
}
