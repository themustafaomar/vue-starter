<template>
  <v-dialog v-model="isActive" @update:model-value="close" width="700">
    <v-card rounded="lg">
      <v-card-title class="px-6 py-3 border-b">
        <h4 class="font-weight-medium">{{ action.title }}</h4>
      </v-card-title>

      <v-skeleton-loader
        v-if="isLoading"
        class="mx-3"
        elevation="0"
        type="table-heading, list-item-two-line, image, table-tfoot"
      />

      <Form
        v-else
        ref="veeForm"
        @submit="saveOrUpdate"
        v-slot="{ meta }"
        :validation-schema="composeUserValidation"
      >
        <v-card-text class="mt-4 px-5">
          <app-text-field
            v-model="form.name"
            :form="form"
            name="name"
            placeholder="Enter the name"
            required
            class="mb-2"
          />

          <app-text-field
            v-model="form.email"
            :form="form"
            name="email"
            placeholder="Enter the email"
            required
            class="mb-2"
          />

          <app-text-field
            v-model="form.password"
            :form="form"
            type="password"
            name="password"
            placeholder="Enter the password"
            required
            class="mb-2"
          />

          <app-select
            v-model="form.role"
            :form="form"
            name="Role"
            :items="
              roles.map(({ name, id }) => ({
                title: name,
                value: id,
                props: { disabled: name === 'super-admin' },
              }))
            "
            class="mb-2"
            required
          />

          <app-select
            v-model="form.status"
            :form="form"
            name="Status"
            :items="[
              { title: 'Active', value: 1 },
              { title: 'Inactive', value: 2 },
            ]"
            required
          />
          <pre>{{ editPayload }}</pre>

          <app-uploader
            v-model="form.avatar"
            required
            label="Upload a profile picture"
            accept="image/*"
            extensions="jpg,svg,jpeg,png,bmp,gif,webp"
            :preview-url="editPayload?.avatar_url"
            :is-updating="isEditing()"
          />
        </v-card-text>

        <v-card-actions class="border-t px-4 py-3 mt-3">
          <v-btn @click="close" variant="plain" color="red">Discard</v-btn>

          <v-btn
            type="submit"
            :disabled="!meta.valid || form.busy"
            :loading="form.busy"
            variant="plain"
            color="primary"
            class="ms-4"
          >
            {{ action.saveButton }}
          </v-btn>
        </v-card-actions>
      </Form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { Form } from 'vee-validate'
import { useAppStore } from '@/stores/app'
import { useForm, useEdit } from '@/composables'
import { composeUserValidation } from '@/validations/users'
import axios from '@/plugins/axios'

const emit = defineEmits(['created', 'update:modelValue'])

const isLoading = ref(false)
const roles = ref([])
const { notify } = useAppStore()
const form = useForm({
  name: '',
  email: '',
  password: '',
  role: '',
  status: 1,
  team: '',
  avatar: null,
})
const { isActive, isEditing, onCreate, onEdit, editPayload, close, action } = useEdit(form, {
  title: 'User',
})

const fetchRoles = async () => {
  roles.value = (await axios.get('/roles')).data.data
  form.role = roles.value.find((role) => role.name === 'admin').id
}

fetchRoles()

const saveOrUpdate = async () => {
  if (isEditing()) {
    await form.post(`/users/${editPayload.value.id}`)
  } else {
    await form.post('/users')
  }
  _reset()
}

const _reset = () => {
  emit('created')
  notify(
    isEditing()
      ? 'The user info has been successfully updated!'
      : 'A new user has been successfully created!'
  )
  close()
}

defineExpose({
  create: onCreate,
  edit: (data) =>
    onEdit({
      ...data,
      role: data.role.id,
      status: data.status.value,
    }),
})
</script>
