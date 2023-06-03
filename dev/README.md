# Expirmental features and issues

## Forms (critical issue)

### Using composables

- ✅ Test against client-side and server-side validations.
- ❌ Test against dialogs as in roles.
- ✅ Test against using `useForm` composable (our custom composable using `vform`).
- ✅ Test against flexbility of using `meta` and other outside of form scope (works perfectly fine).

### Using HOC components API

- ✅ Test against client-side and server-side validations.
- ✅ Test against dialogs as in roles.
- ✅ Test against using `useForm` composable (our custom composable using `vform`).
- ❌ Using HOC components API is limited due to losing access
  to `meta` property which is accessible only inside the form component.
