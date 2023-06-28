<template>
  <p class="mb-2">
    <span v-if="required" class="text-red font-weight-bold position-relative" style="top: 2px">
      *
    </span>
    {{ label }}
  </p>

  <div class="uploader d-flex align-center justify-space-between rounded-lg pa-2">
    <v-avatar>
      <v-icon size="30">mdi-cloud-upload-outline</v-icon>
    </v-avatar>

    <div class="uploader-preview position-relative">
      <img v-if="url" :src="url" class="border rounded" />
      <div
        @click="flush"
        v-if="url && !isUpdating"
        class="uploader-cancel position-absolute d-flex align-center justify-center bg-red rounded-pill"
      >
        <v-icon size="11" color="white">mdi-close</v-icon>
      </div>
    </div>

    <p class="mb-0">
      <template v-if="description">{{ description }}</template>
      <slot v-else-if="$slots.content" name="content"></slot>
      <template v-else>
        Upload a picture to illustrate your challenge.
        <br />
        SVG, PNG JPG (rec. 500x500px)
      </template>
    </p>

    <input
      @abort="handle"
      @change="_init"
      v-bind="$attrs"
      type="file"
      ref="inputUploader"
      class="d-none"
      :multiple="multiple"
    />

    <v-btn @click="_browse" color="primary" elevation="0" rounded="pill">Browse</v-btn>
  </div>

  <div v-if="multiple && urls.length" class="d-flex border rounded-lg pa-3 mt-3">
    <div v-for="(url, index) in urls" :key="index" class="uploader-preview position-relative me-3">
      <img v-if="url" :src="url" class="border rounded" />
      <div
        @click="flush(index)"
        v-if="url && !isUpdating"
        class="uploader-cancel position-absolute d-flex align-center justify-center bg-red rounded-pill"
      >
        <v-icon size="11" color="white">mdi-close</v-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRef, onBeforeMount } from 'vue'
import { useAppStore } from '@/stores/app'

const props = defineProps({
  label: String,
  description: String,
  isUpdating: Boolean,
  required: {
    type: Boolean,
    default: false,
  },
  previewUrl: {
    type: String,
    default: null,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  extensions: {
    type: String,
    default: '',
  },
  max: {
    type: [Number, String],
    default: 3,
  },
})
const multiple = toRef(props.multiple)
const url = ref(null)
const urls = ref([])
const files = ref(null)
const inputUploader = ref(null)
const { notify } = useAppStore()
const emit = defineEmits(['cancelled', 'update:model-value'])

// Lifecycle hooks

onBeforeMount(() => {
  if (!props.isUpdating) {
    return
  }

  url.value = props.previewUrl
})

// Functions

const _browse = () => {
  inputUploader.value.click()
}

const _init = (event) => {
  const fileList = Array.from(event.target.files)
  if (fileList.length > props.max) {
    return _error(`Maximum number of allowable file uploads (${props.max}) has been exceeded.`)
  }

  if (multiple.value) {
    if (_invalid(fileList)) {
      return _error('Invalid extension supplied')
    }
    urls.value = []
    files.value = fileList
    fileList.forEach((file) => {
      _render(file)
    })
    emit('update:model-value', fileList)
    _resetInputUploader()
    return
  }

  const file = fileList[0]
  if (_invalid([file])) {
    return _error('Invalid extension supplied')
  }
  _render(file)
  emit('update:model-value', file)
  _resetInputUploader()
  return
}

const _render = (file) => {
  if (!file.type.match('image/*')) {
    urls.value.push('/file-placeholder.png')
    return
  }
  const reader = new FileReader()
  reader.onloadend = () => {
    multiple.value ? urls.value.push(reader.result) : (url.value = reader.result)
  }
  reader.readAsDataURL(file)
}

const _error = (message) => {
  notify({ message, color: 'red' })
}

const _invalid = (files) => {
  const extensions = props.extensions.split(',').join('|')
  const regex = new RegExp('\\.(' + extensions + ')$', 'i')
  return !files.every((file) => regex.test(file.name))
}

const flush = (index) => {
  if (multiple.value) {
    if (typeof index !== 'undefined') {
      urls.value.splice(index, 1)
      files.value.splice(index, 1)
      emit('update:model-value', files)
    } else {
      // We may call `flush` from the parent component using a ref without specifying
      // an index, meaning we're goning to remove all files.
      urls.value = []
      emit('update:model-value', [])
    }
  } else {
    url.value = null
    emit('update:model-value', null)
  }

  emit('cancelled')
}

const _resetInputUploader = () => {
  // We need to set this with '' because if we cancelled
  // and then tried to upload the same file as the previous one
  // it will not work because it carries the same value.
  inputUploader.value.value = ''
}
</script>

<style lang="scss">
.uploader {
  border: 2px dashed rgba(var(--v-border-color), 0.15);
}

.uploader-preview {
  width: 35px;
  height: 35px;
  img {
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
  }
}

.uploader-cancel {
  top: -5px;
  right: -5px;
  width: 19px;
  height: 19px;
  cursor: pointer;
}
</style>
