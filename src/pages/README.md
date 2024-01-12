# Pages

Pages where you create a route and point that route to this page, it's also called `views`.

## Convention

Pages must be small letters e.g `blog.vue`, `login.vue` and we add a `-` if the page consists of two words e.g `forgot-password.vue`.

### Import Statments Order

In order for the team developers to know what is going on quickly in a page we have to standardize our imports as follows.

```js
// 0. Third party libraries
// 1. Vue imports, this includes `vue`, `vue-router` and `pinia` and anything releated to the Vue community.
// 2. Our Pinia stores if any
// 3. Plugins if any
// 4. Composables if any
// 5. Validations if any
// 6. Components must come at the end (global components first then local components)

// Example
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'
import { useForm } from '@/composables/useForm'
import { useLoader } from '@/composables/useLoader'
import { loginValidation } from '@/validations/auth'
import AppComponentExample from '@/components/app/ComponentsExample.vue'
```
