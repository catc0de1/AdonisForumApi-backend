import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { ThreadFactory } from '#database/factories/thread_factory'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method

    await ThreadFactory.createMany(30) // Create 10 threads using the factory
  }
}
