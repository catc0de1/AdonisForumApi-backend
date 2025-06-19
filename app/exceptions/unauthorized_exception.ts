import { Exception } from '@adonisjs/core/exceptions'

export default class UnauthorizedException extends Exception {
  public code = 'E_UNAUTHORIZED_EXCEPTION'

  constructor(message: string, status: number) {
    super(message, { status })
  }

  public async handle(error: this, {}) {
    return error.message
  }
}
