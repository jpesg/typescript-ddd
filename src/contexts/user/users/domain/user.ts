export class User {
  readonly uuid: string
  readonly email: string
  readonly password: string

  constructor(params: { uuid: string; email: string; password: string }) {
    this.uuid = params.uuid
    this.email = params.email
    this.password = params.password
  }
}
