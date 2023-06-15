import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

import { IUsersRepository } from '../repositories/IUsersRepository'

interface IRegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface IRegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: IRegisterUseCaseRequest): Promise<IRegisterUseCaseResponse> {
    const passwordHash = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    })

    return { user }
  }
}
