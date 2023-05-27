# Pages

Pages where you create a route and point that route to this page, it's also called `views`.

## Convention

Pages must be small letters e.g `blog.vue`, `login.vue` and we add a `-` if the page consists of two words e.g `forgot-password.vue`.

### Import Statments Order

In order for the team developers to know what is going on quickly in a page we have to standardize our imports as follows.

```js
// 1. Vue imports must come first, this includes `vue`, `vue-router` and `pinia` and anything releated to the Vue community.
// 2. Our Pinia stores
// 3. Composables
// 4. Validations
// 5. Components must come at the end

// Example
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'
import { useForm } from '@/composables/useForm'
import { useValidator } from '@/composables/useValidator'
import { loginValidation } from '@/validations/auth'
import AppComponentExample from '@/components/app/ComponentsExample.vue'
```
