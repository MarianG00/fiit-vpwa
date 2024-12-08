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

  router.post('update/:userid', async (ctx) => {
    const {default: UserController} = await import('#controllers/UserController')
    return new UserController().update(ctx)
  })

}).prefix('api/v1/users/')

router.group(() => {
  router.post('create', async (ctx) => {
    const {default: ChatController} = await import('#controllers/ChatController')
    return new ChatController().create(ctx)
  })
  router.put('update/:id', async (ctx) => {
    const {default: ChatController} = await import('#controllers/ChatController')
    return new ChatController().update(ctx)
  })
  router.delete('delete/:id', async (ctx) => {
    const {default: ChatController} = await import('#controllers/ChatController')
    return new ChatController().delete(ctx)
  })
  router.get('/list/:id', async (ctx) => {
    const {default: ChatController} = await import('#controllers/ChatController')
    return new ChatController().list(ctx)
  })
  router.get('/:id', async (ctx) => {
    const {default: ChatController} = await import('#controllers/ChatController')
    return new ChatController().find(ctx)
  })
}).prefix('api/v1/chats/')

router.group(() => {
  router.post('create', async (ctx) => {
    const {default: ChatMembershipController} = await import('#controllers/ChatMembershipController')
    return new ChatMembershipController().create(ctx)
  })
  router.put('update/:memb_id', async (ctx) => {
    const {default: ChatMembershipController} = await import('#controllers/ChatMembershipController')
    return new ChatMembershipController().update(ctx)
  })
  router.delete('delete/:memb_id', async (ctx) => {
    const {default: ChatMembershipController} = await import('#controllers/ChatMembershipController')
    return new ChatMembershipController().delete(ctx)
  })
  router.get('/list/:user_id', async (ctx) => {
    const {default: ChatMembershipController} = await import('#controllers/ChatMembershipController')
    return new ChatMembershipController().list(ctx)
  })
  router.get('/:memb_id', async (ctx) => {
    const {default: ChatMembershipController} = await import('#controllers/ChatMembershipController')
    return new ChatMembershipController().find(ctx)
  })
}).prefix('api/v1/chat_memberships/')

router.group(() => {
  router.post('create', async (ctx) => {
    const {default: InvitationController} = await import('#controllers/InvitationController')
    return new InvitationController().create(ctx)
  })
  router.put('update/:id', async (ctx) => {
    const {default: InvitationController} = await import('#controllers/InvitationController')
    return new InvitationController().update(ctx)
  })
  router.delete('delete/:id', async (ctx) => {
    const {default: InvitationController} = await import('#controllers/InvitationController')
    return new InvitationController().delete(ctx)
  })
  router.get('/list/:user_id', async (ctx) => {
    const {default: InvitationController} = await import('#controllers/InvitationController')
    return new InvitationController().list(ctx)
  })
  router.get('/:id', async (ctx) => {
    const {default: InvitationController} = await import('#controllers/InvitationController')
    return new InvitationController().find(ctx)
  })
}).prefix('api/v1/invitations/')

router.group(() => {
  router.post('create', async (ctx) => {
    const {default: MessageController} = await import('#controllers/MessageController')
    return new MessageController().create(ctx)
  })
  router.put('update/:id', async (ctx) => {
    const {default: MessageController} = await import('#controllers/MessageController')
    return new MessageController().update(ctx)
  })
  router.delete('delete/:id', async (ctx) => {
    const {default: MessageController} = await import('#controllers/MessageController')
    return new MessageController().delete(ctx)
  })
  router.get('/list/:chat_id/:user_id', async (ctx) => {
    const {default: MessageController} = await import('#controllers/MessageController')
    return new MessageController().list(ctx)
  })
  router.get('list/:chat_id', async (ctx) => {
    const {default: MessageController} = await import('#controllers/MessageController')
    return new MessageController().chatlist(ctx)
  })
  router.get('/:id', async (ctx) => {
    const {default: MessageController} = await import('#controllers/MessageController')
    return new MessageController().find(ctx)
  })
}).prefix('api/v1/messages/')
