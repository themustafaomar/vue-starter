<template>
  <v-dialog width="700">
    <v-card rounded="lg">
      <v-card-title>
        <h3 class="font-weight-regular text-h6">{{ title }}</h3>
      </v-card-title>

      <v-skeleton-loader
        v-if="isLoading"
        class="mx-3"
        elevation="0"
        type="table-heading, list-item-two-line, image, table-tfoot"
      ></v-skeleton-loader>

      <v-card-text v-else>
        <app-text-field
          v-model="form.name"
          :form="form"
          name="name"
          placeholder="Enter the name"
          required
          class="mb-2"
        ></app-text-field>

        <app-text-field
          v-model="form.email"
          :form="form"
          name="email"
          placeholder="Enter the email"
          required
          class="mb-2"
        ></app-text-field>

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
          :items="roles.map(({ name, id }) => ({ title: name, value: id }))"
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
      </v-card-text>

      <v-card-actions class="pa-4">
        <v-btn @click="$emit('update:model-value', false)" variant="flat" color="red">
          Discard
        </v-btn>
        <v-btn
          :disabled="form.busy || !isValid"
          :loading="form.busy"
          variant="flat"
          color="primary"
          class="ms-4"
          @click="compose"
        >
          {{ action }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { useAppStore } from '@/stores/app'
import { useForm } from '@/composables/useForm'
import { useComposeTitle } from '@/composables/useComposeTitle'
import { useValidator } from '@/composables/useValidator'
import { composeUserValidation } from '@/validations/users'
import axios from '@/plugins/axios'

const props = defineProps({ data: Object })
const emit = defineEmits(['created'])
const isLoading = ref(false)
const idToUpdate = ref(null)
const roles = ref([])
const isEdit = computed(() => props.data.value)
const { notify } = useAppStore()
const { title, action } = useComposeTitle(isEdit, 'User')
const { handleSubmit, isValid } = useValidator(composeUserValidation)
const form = useForm({
  name: '',
  email: '',
  password: '',
  role: '',
  status: 1,
})

// Lifeycle hooks

onMounted(async () => {
  roles.value = (await axios.get('/roles')).data.data
})

watch(props.data, () => {
  const data = props.data.value
  if (data) {
    form.fill({ ...data, role: data.role.id, status: data.status.value })
    form._method = 'PUT'
    idToUpdate.value = data.id
  } else {
    form.reset()
  }
})

// Functions

const compose = handleSubmit(() => {
  isEdit.value ? _update() : _save()
})

const _save = () => {
  form.post('/users').then(() => {
    form.reset()
    emit('created')
    notify('The user info has been successfully updated!')
  })
}

const _update = () => {
  form.post(`/users/${idToUpdate.value}`).then(() => {
    form.reset()
    emit('created')
    notify('A new user has been successfully created!')
  })
}
</script>
