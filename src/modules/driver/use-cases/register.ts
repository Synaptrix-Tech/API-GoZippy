import { Driver } from '@prisma/client'

import { IDriversRepository } from '../repositories/IDriversRepository'
import { hash } from 'bcryptjs'
import { DriverEmailAlreadyExistsError } from '../errors/driver-email-already-exists-error'
import { LicensePlateAlreadyRegisteredError } from '../errors/license-plate-already-registered-error'
import { DriverLicenseAlreadyRegisteredError } from '../errors/driver-license-already-exists-error'

interface IRegisterUseCaseRequest {
  name: string
  email: string
  phone: string
  password: string
  driver_license: string
  license_plate: string
  vehicle_model: string
}

interface IRegisterUseCaseResponse {
  driver: Driver
}

export class RegisterUseCase {
  constructor(private driversRepository: IDriversRepository) {}

  async execute({
    name,
    email,
    phone,
    password,
    driver_license,
    license_plate,
    vehicle_model,
  }: IRegisterUseCaseRequest): Promise<IRegisterUseCaseResponse> {
    const password_hash = await hash(password, 8)

    const driverWithSameEmail = await this.driversRepository.findDriverByEmail(
      email,
    )

    if (driverWithSameEmail) {
      throw new DriverEmailAlreadyExistsError()
    }

    const driverWithSameDriverLicense =
      await this.driversRepository.findDriverByDriverLicense(driver_license)

    if (driverWithSameDriverLicense) {
      throw new DriverLicenseAlreadyRegisteredError()
    }

    const driverWithSameLicensePlate =
      await this.driversRepository.findDriverByLicensePlate(license_plate)

    if (driverWithSameLicensePlate) {
      throw new LicensePlateAlreadyRegisteredError()
    }

    const driver = await this.driversRepository.create({
      name,
      email,
      phone,
      password_hash,
      driver_license,
      license_plate,
      vehicle_model,
    })

    return { driver }
  }
}
