import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim(),
    email: vine.string().trim().email(),
    password: vine.string().minLength(6).confirmed(),
  })
)
