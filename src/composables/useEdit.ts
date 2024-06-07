import { ref, ComputedRef, computed, watch } from 'vue'

interface Actions {
  title: string
  saveButton: string
}

interface Options {
  title: string
}

export function useEdit(form, options: Options) {
  const isActive = ref(false)
  const isEdit = ref(false)
  const editPayload = ref(null)
  const action: ComputedRef<Actions> = computed(() => {
    const title = options.title
    return {
      title: isEdit.value ? `Edit ${title}` : `Create ${title}`,
      saveButton: isEdit.value ? 'Save Changes' : `Create ${title}`,
    }
  })

  const resetEdit = () => {
    isEdit.value = false
    form.reset()
    delete form._method
  }

  const onCreate = () => {
    isActive.value = true
  }

  const onEdit = (data) => {
    isActive.value = true
    isEdit.value = true
    if (data !== undefined) {
      editPayload.value = data
    }
  }

  const close = () => {
    isActive.value = false
    resetEdit()
  }

  const isEditing = () => isEdit.value

  const injectFormKey = (obj: Record<string, any>) => {
    for (const [key, value] of Object.entries(obj)) {
      form[key] = value
    }
  }

  watch(isEdit, (value) => {
    if (value) {
      form.fill(editPayload.value)
      form.update({
        _method: 'PUT',
      })
    }
  })

  return {
    isActive,
    isEditing,
    editPayload,
    action,
    close,
    onCreate,
    onEdit,
    resetEdit,
    injectFormKey,
  }
}
