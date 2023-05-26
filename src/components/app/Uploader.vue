<template>
  <p class="mb-1">{{ label }}</p>
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
      <template v-if="!description">
        Upload a picture to illustrate your challenge.
        <br />
        SVG, PNG JPG (rec. 500x500px)
      </template>
      <template v-else>{{ description }}</template>
    </p>

    <input @change="_setFile" ref="inputUploader" type="file" accept="image/*" class="d-none" />
    <v-btn @click="_browse" color="primary" elevation="0" rounded="pill">Browse</v-btn>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, onBeforeMount } from 'vue'
import { isValidFile } from '@/utils'

const url = ref(null)
const inputUploader = ref(null)
const { commit } = useStore()
const emit = defineEmits(['cancelled'])
const props = defineProps({
  label: String,
  description: String,
  isUpdating: Boolean,
  required: { type: Boolean, default: false },
  previewUrl: { type: String, default: null },
})

onBeforeMount(() => {
  if (!props.isUpdating) {
    return
  }

  url.value = props.previewUrl
})

// Functions

function _browse() {
  inputUploader.value.click()
}

function _setFile(event) {
  const file = event.target.files[0]

  if (
    !isValidFile(file, (message) =>
      commit('notify', {
        message,
        color: 'red',
      })
    )
  ) {
    return
  }

  _createBase64URL(file)

  emit('cancelled', file)
}

function _createBase64URL(file) {
  const reader = new FileReader()

  reader.onloadend = () => (url.value = reader.result)
  reader.readAsDataURL(file)
}

function flush() {
  url.value = null

  // We need to set this with `null` because if we cancelled
  // and then tried to upload the same image as the previous one
  // it will not work because it carries the same value.
  inputUploader.value = null

  emit('cancelled')
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
