import { defineConfig } from '@adonisjs/auth'
import { sessionGuard, sessionUserProvider } from '@adonisjs/auth/session'

const authConfig = defineConfig({
  default: 'api',
  guards: {
    api: sessionGuard({
      useRememberMeTokens: false,
      provider: sessionUserProvider({
        model: () => import('#models/user'),
      }),
    })
  },
})

export default authConfig
