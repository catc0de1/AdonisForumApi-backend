import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user' // model to seed

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method

    await User.createMany([
      {
        fullName: 'John Doe',
        email: 'kloning573@gmail.com',
        password: 'passnyakominfo',
      },
    ])
  }
}
