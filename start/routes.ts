/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/auth_controller'
import ThreadController from '#controllers/threads_controller'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.post('/login', [AuthController, 'login'])
    router.post('/register', [AuthController, 'register'])
  })
  .prefix('/auth')

// router.post('/login', async (ctx) => {
//   const authController = new AuthController()
//   return authController.login(ctx)
// })

// router.post('/register', [AuthController, 'register'])

router.get('/threads', [ThreadController, 'index'])
router.post('/threads', [ThreadController, 'store']).use(middleware.auth())
router.put('/threads/:id', [ThreadController, 'update']).use(middleware.auth()) // bisa menggunakan patch untuk update sebagian
router.get('/threads/:id', [ThreadController, 'show'])
