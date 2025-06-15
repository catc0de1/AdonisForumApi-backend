import type { HttpContext } from '@adonisjs/core/http'
import Thread from '#models/thread'
import { threadValidator } from '#validators/thread'

export default class ThreadsController {
  async store({ request, auth, response }: HttpContext) {
    // validasi input
    const payload = await request.validateUsing(threadValidator)

    // ambil user dari token auth
    const user = auth.user
    if (!user) {
      return response.unauthorized('User not authenticated')
    }

    // simpan thread baru
    const thread = await Thread.create({
      title: payload.title,
      content: payload.content,
      categoryId: payload.categoryId,
      userId: user.id,
    })

    return response.created({
      message: 'Thread created successfully',
      thread,
    })
  }
}
