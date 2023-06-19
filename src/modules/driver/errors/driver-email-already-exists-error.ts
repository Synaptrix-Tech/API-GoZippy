export class DriverEmailAlreadyExistsError extends Error {
  constructor() {
    super('Driver email already exists.')
  }
}
