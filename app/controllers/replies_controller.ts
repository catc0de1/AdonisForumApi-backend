import type { HttpContext } from '@adonisjs/core/http'
import { ReplyValidator } from '#validators/reply'
import Thread from '#models/thread'

export default class RepliesController {
  public async store({ request, params, auth, response }: HttpContext) {
    try {
      const { content } = await request.validateUsing(ReplyValidator)
      const thread = await Thread.findOrFail(params.thread_id)

      const reply = await thread.related('replies').create({
        userId: auth.user?.id,
        content,
      })

      await reply.load('user')
      await reply.load('thread')

      return response.status(201).json({
        data: reply,
      })
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      })
    }
  }
}
