type Errors = Record<string, string>
export class ValidationError extends Error {
  errors: Errors

  constructor(message: string, errors: Errors) {
    super(message)
    this.name = 'Validation error'
    this.errors = errors
  }
}
