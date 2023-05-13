<template>
  <v-form @submit.prevent="submit" class="pa-10">
    <the-text-field :form="form" name="name" label="Name"></the-text-field>

    <v-btn class="me-4" type="submit">submit</v-btn>
  </v-form>
</template>

<script>
import { Form } from 'vform'
import { useForm } from 'vee-validate'
import { validationSchema } from '@/validations/auth/register'
import TheTextField from './TextField.vue'
import storage from '@/plugins/storage'

export default {
  components: { TheTextField },
  data: () => ({
    form: new Form({
      name: '',
    }),
  }),
  methods: {
    submit() {
      // const { handleSubmit } = useForm({ validationSchema })
      // handleSubmit((values) => {
      //   form.post('/hi').then(() => {})
      // })
    },
  },
}

// import { Form } from 'vform'
// import { reactive } from 'vue'
// import { useForm } from 'vee-validate'
// import { validationSchema } from '@/validations/auth/register'
// import TheTextField from './TextField.vue'

// const { handleSubmit } = useForm({ validationSchema })
// const form = reactive(
//   new Form({
//     name: '',
//   })
// )

// const submit = handleSubmit((values) => {
//   form.post('/hi').then(() => {})
// })
</script>
