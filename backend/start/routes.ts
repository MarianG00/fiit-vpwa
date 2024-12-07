import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
// Define a simple route to test

// Group routes for user authentication
router.group(() => {
  // Registration logic
  router.post('register', async (ctx) => {
    const {default: AuthController} = await import('#controllers/AuthController')
    return new AuthController().register(ctx)
  }).as('register')
  router.post('login',  async (ctx) => {
    const {default: AuthController} = await import('#controllers/AuthController')
    return new AuthController().login(ctx)
  }).as('login')
  router.post('logout',  async (ctx) => {
    const {default: AuthController} = await import('#controllers/AuthController')
    return new AuthController().logout(ctx)
  }).as('logout')
}).prefix('api/v1/users/')
