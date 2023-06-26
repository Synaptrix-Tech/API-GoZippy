import { Address } from '@prisma/client'

import { IAddressesRepository } from '../repositories/IAddressesRepository'

interface IGetAddressesByUserRequest {
  userId: string
}

interface IGetAddressesByUserResponse {
  addresses: Address[] | null
}

export class GetAddressesByUser {
  constructor(private addressesRepository: IAddressesRepository) {}

  async execute({
    userId,
  }: IGetAddressesByUserRequest): Promise<IGetAddressesByUserResponse> {
    const addresses = await this.addressesRepository.findAddressesByUserId(
      userId,
    )
    return {
      addresses,
    }
  }
}
