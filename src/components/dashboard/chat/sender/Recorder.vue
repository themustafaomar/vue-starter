<template>
  <v-sheet class="d-flex align-center ms-auto bg-white rounded-pill shadow-sm pa-2">
    <v-btn @click="abort" icon size="38" elevation="0" class="me-2">
      <v-icon icon="mdi-delete" size="28" color="grey-darken-2"></v-icon>
    </v-btn>

    <div ref="timerWrapper" style="width: 50px">00:00</div>

    <v-spacer :style="{ width: '200px', height: '1px' }" />

    <v-btn icon size="38" elevation="0" class="ms-3">
      <v-icon icon="mdi-pause-circle-outline" size="28" color="red"></v-icon>
    </v-btn>

    <v-btn @click="send" icon size="38" elevation="0" class="ms-3">
      <v-icon icon="mdi-send" size="28" color="primary"></v-icon>
    </v-btn>
  </v-sheet>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useDevicesList, useUserMedia } from '@vueuse/core'

defineProps({
  isRecording: Boolean,
})

const emit = defineEmits(['abort', 'recorded'])

const recorder = ref()
const timer = ref()
const timerWrapper = ref()
const audioChunks = ref([])
const isRecording = ref(false)
const { audioInputs: microphones } = useDevicesList({
  constraints: { audio: true },
})
const currentMicrophone = computed(() => microphones.value[0]?.deviceId)
const { stream, start, stop } = useUserMedia({
  constraints: {
    audio: { deviceId: currentMicrophone },
  },
})

// Lifecycle Hooks

onMounted(() => {
  _record()
  _setUpTimer()
})

onUnmounted(() => {
  clearInterval(timer.value)
})

// Functions

const send = () => {
  // Notice, data will be emitted from `ondataavailable` event
  recorder.value.stop()

  // Stop the microphone device
  stop()
}

const abort = () => {
  emit('abort')
  stop()
}

const _record = async () => {
  await start()

  isRecording.value = true
  recorder.value = new MediaRecorder(stream.value)
  recorder.value.start()
  recorder.value.ondataavailable = ({ data }) => {
    audioChunks.value.push(data)
    if (recorder.value.state == 'inactive') {
      emit('recorded', _getRecord())
    }
  }
}

const _getRecord = () => {
  const blob = new Blob(audioChunks.value, { type: 'audio/wav' })
  return {
    blob,
    source: URL.createObjectURL(blob),
  }
}

const _setUpTimer = () => {
  let seconds = 0
  timer.value = setInterval(() => {
    const secs = _pad(++seconds % 60)
    const minutes = _pad(parseInt(seconds / 60, 10) % 60)

    timerWrapper.value.textContent = minutes + ':' + secs
  }, 1000)
}

const _pad = (val) => {
  return val > 9 ? val : '0' + val
}
</script>
