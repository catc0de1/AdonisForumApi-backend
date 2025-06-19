// import { schema } from '@adonisjs/validator'

// export const sortThreadValidator = schema.create({
//   sort_by: schema.enum.optional([
//     'id',
//     'user_id',
//     'category_id',
//     'title',
//     'created_at',
//     'updated_at',
//   ]),
//   order: schema.enum.optional(['asc', 'desc'] as const),
// })

import vine from '@vinejs/vine'

export const sortThreadValidator = vine.compile(
  vine.object({
    sort_by: vine
      .enum(['id', 'user_id', 'category_id', 'title', 'created_at', 'updated_at'])
      .optional(),
    order: vine.enum(['asc', 'desc'] as const).optional(),
  })
)
