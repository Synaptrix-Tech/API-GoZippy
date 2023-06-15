import { Prisma, User } from '@prisma/client'
import { IUsersRepository } from '../IUsersRepository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements IUsersRepository {
  public users: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      created_at: new Date(),
    }

    this.users.push(user)

    return user
  }
}