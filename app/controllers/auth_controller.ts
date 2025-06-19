import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator } from '#validators/register'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.findBy('email', email)
    if (!user) {
      return response.unauthorized({ message: 'Invalid credentials' })
    }

    const isValid = await hash.verify(user.password, password)
    if (!isValid) {
      return response.unauthorized({ message: 'Invalid credentials' })
    }

    const token = await User.accessTokens.create(user, ['*'], {
      expiresIn: '7 days',
    })
    return { token }
  }

  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const exists = await User.findBy('email', payload.email)
    if (exists) {
      return response.conflict({ message: 'Email already exists' })
    }

    const user = await User.create({
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password,
    })

    const token = await User.accessTokens.create(user, ['*'], {
      expiresIn: '7 days',
    })

    return response.created({
      message: 'User registered successfully',
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
      token,
    })
  }
}
