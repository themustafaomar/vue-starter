<template>
  <v-dialog v-model="isActive" width="600">
    <v-card elevation="0" rounded="lg">
      <v-card-title class="px-6 py-3 border-b">
        <h4 class="font-weight-medium">Chat Settings</h4>
      </v-card-title>

      <audio ref="speakerSimulator" src="/message.mp3"></audio>

      <v-card-text class="mt-4">
        <v-select
          @update:model-value="switchMicrophone"
          v-model="microphoneSelected"
          label="Microphone"
          :items="microphones"
          item-title="label"
          item-value="deviceId"
          class="mb-1"
        >
          <template #append>
            <v-btn variant="flat" icon>
              <v-icon color="grey-darken-3">mdi-microphone-outline</v-icon>
            </v-btn>
          </template>
        </v-select>

        <v-select
          @update:model-value="switchSpeaker"
          label="Speakers"
          v-model="speakerSelected"
          :items="speakers"
          item-title="label"
          item-value="deviceId"
        >
          <template #append>
            <v-btn @click="testSpeaker" variant="flat" icon>
              <v-icon color="grey-darken-3">mdi-volume-high</v-icon>
            </v-btn>
          </template>
        </v-select>
      </v-card-text>

      <v-card-actions class="px-4 py-2 border-t">
        <v-btn @click="isActive = false" color="red">Discard</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useDevicesList, useUserMedia } from '@vueuse/core'

const { audioInputs: microphones, audioOutputs: speakers } = useDevicesList()

const isActive = ref(false)
const microphoneSelected = ref(null)
const microphoneCurrent = computed(() => microphones.value[0]?.deviceId)
const speakerSimulator = ref()
const speakerSelected = ref(null)
const speakerCurrent = computed(() => microphones.value[0]?.deviceId)
const userMedia = useUserMedia({})

watchEffect(() => {
  microphoneSelected.value = microphoneCurrent.value
  speakerSelected.value = speakerCurrent.value
})

const switchMicrophone = (event) => {
  console.log(event)
}

const switchSpeaker = (event) => {
  console.log(event)
}

const testSpeaker = () => {
  // console.log(speakerCurrent.value)
  // userMedia.constraints.value.audio.
  console.log(userMedia.constraints)
  speakerSimulator.value.play()
}

const open = () => {
  isActive.value = true
}

defineExpose({ open })
</script>
