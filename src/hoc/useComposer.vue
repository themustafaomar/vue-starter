<template>
  <slot
    :props="{
      'modelValue': isActive,
      'onUpdate:modelValue': toggle,
      'compose': {
        isActive,
        isCreating,
        isUpdating,
        data,
        title: getTitle,
        action: getAction,
        close: deactivate,
        onUpdate,
      },
    }"
  ></slot>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({ title: String })
const isActive = ref(false)
const isCreating = ref(false)
const isUpdating = ref(false)
const data = ref(null)
const createTitle = `Create ${props.title}`
const getTitle = computed(() => (isUpdating.value ? `Edit ${props.title}` : createTitle))
const getAction = computed(() => (isUpdating.value ? `Save changes` : createTitle))

// Watchers

watch(isActive, (value) => {
  if (value === false) {
    // We're using the `setTimeout` handler to
    // prevent flashing when clearing update data from inputs.
    setTimeout(() => {
      _markAsUpdating(false), _markAsCreating(false)
    }, 150)
    _setData()
  }
})

// API

const activate = () => {
  isActive.value = true
}

const deactivate = () => {
  isActive.value = false
}

const toggle = (value) => {
  value ? (isActive.value = value) : (isActive.value = !isActive.value)
}

const add = () => {
  activate()
  _markAsCreating()
}

const update = (payload) => {
  activate()
  _setData(payload)
  _markAsUpdating()
}

const onUpdate = (fn) => {
  watch(isUpdating, (value) => fn(value))
}

// Private functions

const _markAsUpdating = (state = true) => {
  isUpdating.value = state
}

const _markAsCreating = (state = true) => {
  isCreating.value = state
}

const _setData = (payload = null) => {
  data.value = payload
}

// Exposes

defineExpose({
  isActive,
  title: getTitle,
  action: getAction,
  activate,
  deactivate,
  toggle,
  add,
  update,
})
</script>
