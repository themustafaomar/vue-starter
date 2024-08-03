import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import vuetify from 'vite-plugin-vuetify'

export default ({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd()),
  }

  return defineConfig({
    server: {
      proxy: {
        '/storage': process.env.VITE_SERVER_URL,
      },
    },
    plugins: [
      vue(),
      Components({
        dirs: ['./src/components/app'],
      }),
      vuetify({
        autoImport: true,
        styles: {
          configFile: './src/assets/sass/vuetify/settings.scss',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    optimizeDeps: {
      exclude: ['vuetify'],
      entries: ['./src/**/*.vue'],
    },
  })
}
