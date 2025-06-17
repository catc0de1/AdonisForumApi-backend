import type { HttpContext } from '@adonisjs/core/http'
import Thread from '#models/thread'
import { threadValidator } from '#validators/thread'

export default class ThreadsController {
  async index({ response }: HttpContext) {
    try {
      const threads = await Thread.query().preload('user').preload('category')
      return response.status(200).json({
        data: threads,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      })
    }
  }

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

  async show({ params, response }: HttpContext) {
    try {
      const trhead = await Thread.query()
        .where('id', params.id)
        .preload('user')
        .preload('category')
        .firstOrFail()
      return response.status(200).json({
        data: trhead,
      })
    } catch (error) {
      return response.status(404).json({
        message: 'Thread not found',
      })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const thread = await Thread.findOrFail(params.id)
      const validateData = await request.validateUsing(threadValidator)

      await thread.merge(validateData).save()

      await thread?.load('category')
      await thread?.load('user')

      return response.status(200).json({
        data: thread,
      })
    } catch (error) {
      return response.status(404).json({
        message: error.message,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const thread = await Thread.findOrFail(params.id)
      await thread.delete()
      return response.status(200).json({
        message: 'Thread deleted successfully',
      })
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      })
    }
  }
}
