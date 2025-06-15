import vine from '@vinejs/vine'

export const threadValidator = vine.compile(
  vine.object({
    title: vine.string().maxLength(255).minLength(3),
    content: vine.string().minLength(10),
    categoryId: vine.number(),
  })
)
