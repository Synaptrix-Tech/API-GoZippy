import { Address } from '@prisma/client'

import { IAddressesRepository } from '../repositories/IAddressesRepository'

interface ICreateUseCaseRequest {
  userId: string
  street: string
  city: string
  state: string
  country: string
  zipCode: string
  number: string
  complement?: string | null | undefined
}

interface ICreateUseCaseResponse {
  address: Address
}

export class CreateUseCase {
  constructor(private addressesRepository: IAddressesRepository) {}

  async execute({
    userId,
    street,
    city,
    state,
    country,
    zipCode,
    number,
    complement,
  }: ICreateUseCaseRequest): Promise<ICreateUseCaseResponse> {
    const address = await this.addressesRepository.create({
      userId,
      street,
      city,
      state,
      country,
      zipCode,
      number,
      complement,
      selected: false,
    })

    return { address }
  }
}
