<template>
  <v-dialog v-model="isActive" @update:model-value="close" width="700">
    <v-card rounded="lg">
      <v-card-title>
        <h3 class="font-weight-regular text-h6">{{ action.title }}</h3>
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
                  />
                  <v-checkbox v-else :label="label" hide-details disabled />
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-btn @click="close" variant="flat" color="red">Discard</v-btn>
          <v-btn
            :disabled="form.busy || !meta.valid"
            :loading="form.busy"
            variant="flat"
            color="primary"
            class="ms-4"
            @click="saveOrUpdate"
          >
            {{ action.saveButton }}
          </v-btn>
        </v-card-actions>
      </Form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Form } from 'vee-validate'
import { useAppStore } from '@/stores/app'
import { useForm, useEdit } from '@/composables'
import { createRoleValidation } from '@/validations/roles'
import { groupBy } from '@/utils'
import axios from '@/plugins/axios'

const emit = defineEmits(['created', 'update:modelValue'])

const isLoading = ref(false)
const permissions = ref([])
const normalizePermissions = computed(() => groupBy(permissions.value, 'group_name'))
const { notify } = useAppStore()
const form = useForm({
  name: '',
  permissions: [],
})
const { isActive, isEditing, onCreate, onEdit, editPayload, close, action } = useEdit(form, {
  title: 'Role',
})

const fetchPermissions = async () => {
  const { data } = await axios.get('/permissions')
  permissions.value = data.data
}

fetchPermissions()

const saveOrUpdate = async () => {
  if (isEditing()) {
    await form.post(`/roles/${editPayload.value.id}`)
  } else {
    await form.post('/roles')
  }
  _reset()
}

const _reset = () => {
  emit('created')
  const message = isEditing()
    ? 'The role has been successfully updated!'
    : 'A new role has been successfully created!'
  notify(message)
  close()
}

defineExpose({
  create: onCreate,
  edit: (data) =>
    onEdit({
      ...data,
      permissions: data.permissions.map(({ id }) => id),
    }),
})
</script>
