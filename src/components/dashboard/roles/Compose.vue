<template>
  <v-dialog width="700">
    <v-card rounded="lg">
      <v-card-title>
        <h3 class="font-weight-regular text-h6">{{ compose.title }}</h3>
      </v-card-title>

      <v-skeleton-loader
        v-if="isLoading"
        class="mx-3"
        elevation="0"
        type="table-heading, list-item-two-line, image, table-tfoot"
      ></v-skeleton-loader>

      <Form
        v-else
        ref="veeForm"
        @submit="saveOrUpdate"
        v-slot="{ meta }"
        :validation-schema="createRoleValidation"
      >
        <v-card-text>
          <!-- Attention: working on fixing the initial error border -->
          <app-text-field
            v-model="form.name"
            :form="form"
            name="name"
            label="Role Name"
            placeholder="Enter the role name"
            required
          ></app-text-field>

          <h3 class="mt-3 border-b pb-3">Role Permissions</h3>

          <v-table class="mb-2">
            <tbody>
              <tr v-for="(item, key) in normalizePermissions" :key="item.name">
                <td>{{ key }}</td>
                <td v-for="(label, index) in ['View', 'Create', 'Update', 'Delete']">
                  <v-checkbox
                    v-if="item[index]"
                    v-model="form.permissions"
                    :label="label"
                    :value="item[index].id"
                    hide-details
                    color="primary"
                  ></v-checkbox>
                  <v-checkbox v-else :label="label" hide-details disabled></v-checkbox>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-btn @click="isOpen = false" variant="flat" color="red">Discard</v-btn>
          <v-btn
            :disabled="form.busy || !meta.valid"
            :loading="form.busy"
            variant="flat"
            color="primary"
            class="ms-4"
            @click="saveOrUpdate"
          >
            {{ compose.action }}
          </v-btn>
        </v-card-actions>
      </Form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Form } from 'vee-validate'
import { useAppStore } from '@/stores/app'
import { useForm } from '@/composables/useForm'
import { createRoleValidation } from '@/validations/roles'
import axios from '@/plugins/axios'

const emit = defineEmits(['created'])
const props = defineProps({
  compose: Object,
})

const isLoading = ref(false)
const updateId = ref(null)
const permissions = ref([])
const normalizePermissions = computed(() => groupBy(permissions.value, 'group_name'))
const { notify } = useAppStore()
const form = useForm({
  name: '',
  permissions: [],
})

// Lifecycle hooks

onMounted(async () => {
  permissions.value = (await axios.get('/permissions')).data.data
})

props.compose.onUpdate(() => {
  const data = props.compose.data
  if (data) {
    form.fill({
      name: data.name,
      permissions: permissions.value.map(({ id }) => id),
    })
    form._method = 'PUT'
    updateId.value = data.id
  } else {
    form.reset()
  }
})

// Functions

const groupBy = (xs, key) => {
  return xs.reduce((rv, x) => {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

const saveOrUpdate = () => {
  props.compose.isUpdating ? _update() : _save()
}

const _update = () => {
  form.post(`/roles/${updateId.value}`).then(() => _reset())
}

const _save = () => {
  form.post('/roles').then(() => _reset())
}

// const prepareForUpdate = (id) => {
//   isLoading.value = true
//   axios.get(`/roles/${id}`).then(({ data: { data } }) => {
//     updateId.value = id
//     isLoading.value = false
//     form.fill({
//       name: data.name,
//       permissions: data.permissions.map(({ id }) => id),
//     })
//     form._method = 'PUT'
//   })
// }
const _reset = () => {
  props.compose.close()
  emit('created')
  notify(
    props.compose.isUpdating
      ? 'The role has been successfully updated!'
      : 'A new role has been successfully created!'
  )
}

// const open = (id) => {
//   if (id) {
//     isEdit.value = true
//     prepareForUpdate(id)
//   } else {
//     isEdit.value = false
//     form.reset()
//   }
//   isOpen.value = true
// }

// defineExpose({ open })
</script>
