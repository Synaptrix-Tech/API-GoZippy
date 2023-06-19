export class DriverLicenseAlreadyRegisteredError extends Error {
  constructor() {
    super('Driver license already registered.')
  }
}
