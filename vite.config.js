import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vuetify from 'vite-plugin-vuetify'
import vue from '@vitejs/plugin-vue'

export default ({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd()),
  }

  return defineConfig({
    server: {
      proxy: {
        '/api/@': {
          target: process.env.VITE_SERVER_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace('/api/@', ''),
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('proxy error', err)
            })
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Sending Request to the Target:', req.method, req.url)
            })
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url)
            })
          },
        },
        '/api': process.env.VITE_SERVER_URL,
      },
    },
    plugins: [
      vue(),
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
