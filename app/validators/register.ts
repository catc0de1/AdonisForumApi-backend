// import vine from '@vinejs/vine'
import { schema, rules } from '@adonisjs/validator'

export const registerValidator = schema.create({
  fullName: schema.string({ trim: true }),
  email: schema.string({ trim: true }, [
    rules.email(),
    // rules.unique({ table: 'users', column: 'email' }),
  ]),
  password: schema.string({}, [
    rules.confirmed(), // otomatis cek password_confirmation
    rules.minLength(6),
  ]),
})
