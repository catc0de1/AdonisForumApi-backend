import vine from '@vinejs/vine'

export const ReplyValidator = vine.compile(
  vine.object({
    content: vine.string().minLength(1),
  })
)
