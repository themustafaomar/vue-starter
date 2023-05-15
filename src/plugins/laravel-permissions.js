import LaravelPermissionToVueJS from 'laravel-permission-to-vuejs'

export const useLaravelPermissions = (app) => {
  app.use(LaravelPermissionToVueJS)
}
