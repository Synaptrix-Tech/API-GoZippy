export class LicensePlateAlreadyRegisteredError extends Error {
  constructor() {
    super('License plate already registered.')
  }
}
