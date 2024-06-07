import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import axios from './axios'

const env = import.meta.env

window.Pusher = Pusher
window.Echo = new Echo({
  broadcaster: 'reverb',
  key: env.VITE_REVERB_KEY,
  cluster: env.VITE_REVERB_CLUSTER,
  wsHost: env.VITE_REVERB_HOST,
  wsPort: env.VITE_REVERB_PORT,
  forceTLS: false,
  enctyped: true,
  logToConsole: true,
  // Sanctum authorization
  // https://laravel.com/docs/10.x/sanctum#authorizing-private-broadcast-channels
  authorizer: (channel) => ({
    authorize: (socketId, callback) => {
      axios
        .post(`${env.VITE_SERVER_URL}/broadcasting/auth`, {
          socket_id: socketId,
          channel_name: channel.name,
        })
        .then((response) => {
          callback(false, response.data)
        })
        .catch((error) => {
          callback(true, error)
        })
    },
  }),
})
