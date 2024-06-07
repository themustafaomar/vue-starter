<template>
  <v-badge
    @click="trigger"
    color="primary"
    offset-y="10"
    offset-x="10"
    bordered
    icon="mdi-camera"
    style="cursor: pointer"
  >
    <v-avatar size="90" :image="url ? url : user.avatar_url" />
  </v-badge>

  <input @change="init" ref="uploader" type="file" accept="image/*" class="d-none" />

  <v-dialog v-model="isDialogActive" width="500">
    <v-card rounded="lg" elevation="0">
      <v-card-title class="my-1">Crop your profile picture</v-card-title>

      <v-divider class="my-0" />

      <v-card-text class="my-6">
        <div class="cropper-container">
          <img ref="image" :src="url" class="w-100 mx-auto d-block" />
        </div>
      </v-card-text>

      <v-divider class="my-0" />

      <v-card-actions class="my-2 px-4">
        <v-btn @click="discard" color="red" variant="flat">Discard</v-btn>
        <v-btn @click="save" color="primary" variant="flat">Save Changes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { isValidFile } from '@/utils'
import { useAppStore } from '@/stores/app'
import Cropper from 'cropperjs'
import 'cropperjs/src/css/cropper.scss'

defineProps({
  user: Object,
})

const url = ref(null)
const isDialogActive = ref(false)
const uploader = ref(null)
const image = ref(null)
const cropper = ref(null)
const file = ref(null)
const emit = defineEmits(['update:model-value', 'save'])
const { notify } = useAppStore()

// Methods

const trigger = () => uploader.value.click()
const init = (event) => {
  const _file = event.target.files[0]
  if (!isValidFile(_file, (message) => notify({ message, color: 'red' }))) {
    return
  }
  uploader.value.value = ''
  isDialogActive.value = true
  file.value = _file
  render(_file)
  setTimeout(() => setupCropper(), 150)
  // emit('update:model-value', _file)
}
const render = (file) => {
  const reader = new FileReader()
  reader.onloadend = () => (url.value = reader.result)
  reader.readAsDataURL(file)
}
const setupCropper = () => {
  cropper.value = new Cropper(image.value, {
    aspectRatio: 10 / 9,
    viewMode: 3,
  })
}
const save = () => {
  emit('save', {
    avatar: file.value,
    url: cropper.value.getCroppedCanvas().toDataURL(),
    coords: cropper.value.getData(),
  })
  isDialogActive.value = false
  url.value = null
  image.value = null
  cropper.value.destroy()
}
const discard = () => {
  url.value = null
  image.value = null
  file.value = null
  emit('update:model-value', null)
}
</script>

<style lang="scss">
.cropper-container {
  min-height: 375px;
  height: 375px;
  min-width: 375px;
  width: 375px;
  margin: auto;

  .cropper-view-box,
  .cropper-face {
    border-radius: 50%;
  }
}
</style>
