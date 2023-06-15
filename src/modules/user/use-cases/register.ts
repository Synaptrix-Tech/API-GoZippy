import { User } from '@prisma/client'
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
    const user = await this.usersRepository.create({
      name,
      email,
      password,
    })

    return { user }
  }
}
