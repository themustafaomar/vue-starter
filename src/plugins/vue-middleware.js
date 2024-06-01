import vueMiddleware, { LaravelPermissionsDriver } from 'vue-middleware'
import middleware from '@/middleware'

export const useVueMiddleware = (app) => {
  app.use(vueMiddleware, {
    middleware,
    permissions: {
      driver: LaravelPermissionsDriver,
    },
  })
}
