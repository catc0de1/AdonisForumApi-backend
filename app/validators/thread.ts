import vine from '@vinejs/vine'

export const threadValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3).maxLength(255).trim(),
    content: vine.string().minLength(10).trim(),
    categoryId: vine.number(),
  })
)
