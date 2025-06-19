import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method

    await User.createMany([
      {
        fullName: 'admin',
        email: 'admin@email.com',
        password: 'admin123',
      },
      {
        fullName: 'Zulyan',
        email: 'iyanzuli35@gmail.com',
        password: 'bukanpassnyakominfo',
      },
      {
        fullName: 'John Doe',
        email: 'kloning573@gmail.com',
        password: 'passnyakominfo',
      },
    ])
  }
}
