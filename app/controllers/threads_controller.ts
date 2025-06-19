import type { HttpContext } from '@adonisjs/core/http'
import Thread from '#models/thread'
import { threadValidator } from '#validators/thread'
import { sortThreadValidator } from '#validators/sort_thread'
import UnauthorizedException from '#exceptions/unauthorized_exception'

export default class ThreadsController {
  async index({ request, response }: HttpContext) {
    try {
      const page = request.input('page', 1)
      const userId = request.input('user_id')
      const categoryId = request.input('category_id')

      const sortValidated = await request.validateUsing(sortThreadValidator)
      const sortBy = sortValidated.sort_by || 'id'
      const order = sortValidated.order || 'desc'

      const threads = await Thread.query()
        .if(userId, (query) => query.where('user_id', userId))
        .if(categoryId, (query) => query.where('category_id', categoryId))
        .orderBy(sortBy, order)
        .preload('user')
        .preload('category')
        .paginate(page, 10)
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
        .preload('replies', (replyQuery) => replyQuery.preload('user'))
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

  async update({ params, auth, request, response }: HttpContext) {
    try {
      const user = await auth.user
      const thread = await Thread.findOrFail(params.id)

      if (user?.id !== thread.userId) {
        throw new UnauthorizedException('Unauthorized', 403)
      }

      const validateData = await request.validateUsing(threadValidator)

      if (user?.id !== thread.userId) {
        return response.status(401).json({
          message: 'You are not authorized to update this thread',
        })
      }

      await thread.merge(validateData).save()

      await thread?.load('category')
      await thread?.load('user')

      return response.status(200).json({
        data: thread,
      })
    } catch (error) {
      if (error.name === 'UnauthorizedException') {
        return response.status(error.status).json({
          message: error.message,
        })
      } else if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).json({
          message: 'Thread not found',
        })
      }
    }
  }

  async destroy({ params, auth, response }: HttpContext) {
    try {
      const user = await auth.user
      const thread = await Thread.findOrFail(params.id)

      if (user?.id !== thread.userId) {
        throw new UnauthorizedException('Unauthorized', 403)
      }

      await thread.delete()
      return response.status(200).json({
        message: 'Thread deleted successfully',
      })
    } catch (error) {
      if (error.name === 'UnauthorizedException') {
        return response.status(error.status).json({
          message: error.message,
        })
      } else if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).json({
          message: 'Thread not found',
        })
      }
    }
  }
}
