import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.findBy('email', email)
    if (!user) {
      return response.unauthorized({ message: 'Invalid credentials, email' })
    }

    const isValid = await hash.verify(user.password, password)
    if (!isValid) {
      return response.unauthorized({ message: 'Invalid credentials, password' })
    }

    const token = await User.accessTokens.create(user, 'api')
    return { token }
    // try {
    //   const user = await auth.use('api').attempt(email, password)
    //   const token = await user.accessTokens.create('api')
    //   return { token }
    // } catch {
    //   return response.unauthorized({ message: 'Invalid credentials' })
    // }
  }
}
