import { compare } from 'bcryptjs'
import { Driver } from '@prisma/client'

import { IDriversRepository } from '../repositories/IDriversRepository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

interface IAuthenticateUseCaseRequest {
  email: string
  password: string
}

interface IAuthenticateUseCaseResponse {
  driver: Driver
}

export class AuthenticateUseCase {
  constructor(private driversRepository: IDriversRepository) {}

  async execute({
    email,
    password,
  }: IAuthenticateUseCaseRequest): Promise<IAuthenticateUseCaseResponse> {
    const driver = await this.driversRepository.findDriverByEmail(email)

    if (!driver) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, driver.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      driver,
    }
  }
}
