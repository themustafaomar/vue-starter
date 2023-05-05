export default {
  isLoading: false,
  mode: 'light',
  auth: {
    provider: 'sanctum',
    homeURL: '/dashboard',
  },
  locale: {
    default: 'en',
  },
  snackbar: {
    show: false,
    message: '',
    color: 'primary',
    location: 'bottom center',
  },
  error: {
    show: false,
    message: '',
    type: '',
  },
}
