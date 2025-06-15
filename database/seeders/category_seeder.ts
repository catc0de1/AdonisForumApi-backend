import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Category from '#models/category' // model to seed

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method

    await Category.createMany([
      { title: 'Adonis.js' },
      { title: 'Node.js' },
      { title: 'Express.js' },
      { title: 'Nest.js' },
    ])
  }
}
