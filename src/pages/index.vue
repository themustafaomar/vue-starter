<template>
  <v-sheet width="300" class="mx-auto border rounded-lg pa-5 mt-16">
    Hi! want to
    <router-link to="/login" class="text-decoration-none text-primary">login?</router-link>
  </v-sheet>

  <!-- Experimental -->

  <v-sheet class="border mx-auto rounded-lg pa-6 mt-16" width="75%">
    <p class="text-grey-darken-3 mb-7">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam totam aliquid libero omnis
      earum iusto! Fugit maiores doloremque veritatis eius ab voluptas? Maxime modi ratione commodi
      recusandae distinctio earum quaerat!
    </p>

    <v-form @submit.prevent="submit">
      <v-row>
        <v-col cols="6">
          <app-text-field v-model="form.first_name" :form="form" name="first_name" />
        </v-col>
        <v-col cols="6">
          <app-text-field v-model="form.last_name" :form="form" name="last_name" />
        </v-col>
      </v-row>

      <v-btn
        type="submit"
        :disabled="!isValid"
        :loading="form.busy"
        color="blue-grey-darken-4"
        elevation="0"
      >
        Save
      </v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup>
import { useForm } from '@/composables/useForm'
import { validation } from '@/validations/common'
import { useValidator } from '@/composables/useValidator'

const { handleSubmit, isValid } = useValidator(validation)
const form = useForm({
  first_name: '',
  last_name: '',
})

const submit = handleSubmit(() => {
  form.post('/hi').then(() => {
    // ..
  })
})
</script>

<style>
#welcome__page {
  background-color: rgba(var(--v-theme-background), 0.25);
}
</style>
