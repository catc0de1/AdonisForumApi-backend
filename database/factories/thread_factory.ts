import factory from '@adonisjs/lucid/factories'
import Thread from '#models/thread'

export const ThreadFactory = factory
  .define(Thread, async ({ faker }) => {
    return {
      userId: Math.floor(Math.random() * 3) + 1, // Random user ID for seeding
      categoryId: Math.floor(Math.random() * 4) + 1, // Random category ID for seeding
      title: faker.lorem.words(4), // Generate a random title with 4 words
      content: faker.lorem.paragraphs(2), // Generate a random content with 2 paragraphs
    }
  })
  .build()
