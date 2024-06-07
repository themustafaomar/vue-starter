<template>
  <li
    class="d-flex mb-5"
    :class="{ 'justify-start': !current, 'flex-end flex-row-reverse': current }"
  >
    <v-badge color="transparent" offset-y="8" offset-x="9" location="bottom end">
      <template #badge>
        <v-icon size="23" color="grey-darken-2">mdi-microphone</v-icon>
      </template>
      <v-avatar size="40" :image="data.user.avatar_url" />
    </v-badge>

    <!-- The message body -->
    <div :class="{ 'text-end': current, 'opacity-75': data.hasFailed }">
      <div
        class="bg-grey-lighten-3 d-inline-block rounded-pill"
        :class="{ 'ms-4': !current, 'bg-primary me-4': current }"
      >
        <!-- <app-dashboard-chat-messages-audio-player :source="data.source" /> -->
        <div class="d-flex align-center rounded-pill py-2 px-3">
          <v-progress-circular
            v-if="isLoading"
            indeterminate
            size="24"
            color="white"
            bg-color="transparent"
            width="2"
            class="me-2"
          />
          <v-btn
            v-else
            @click="switchStatus"
            density="compact"
            icon
            elevation="0"
            variant="text"
            class="me-2"
            size="24"
            :color="current ? 'white' : 'grey-darken-2'"
          >
            <v-icon :icon="icon" size="20" />
          </v-btn>

          <div ref="element" style="width: 180px"></div>

          <small class="ms-1 me-2" style="width: 20px">{{ duration }}</small>
        </div>
      </div>

      <!-- In case of failure to send a message -->
      <small v-if="data.hasFailed" class="d-block text-red me-4">Failed to send message</small>

      <!-- The message footer -->
      <small
        v-else
        class="d-block text-grey-darken-1 mt-1"
        :class="{ 'ms-4': !current, 'text-end me-4': current }"
      >
        {{ data.created_at }}

        <v-icon v-if="data.isRecentlySended" color="grey-lighten-1">mdi-check</v-icon>

        <v-icon
          v-if="current && !data.isRecentlySended"
          :color="data.is_seen ? '#15d500' : 'grey-lighten-1'"
        >
          mdi-check-all
        </v-icon>
      </small>
    </div>
  </li>
</template>

<script setup>
import WaveSurfer from 'wavesurfer.js'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useUser } from '@/composables/useUser'

const props = defineProps({ data: Object })
const wavesurfer = ref()
const element = ref()
const duration = ref(0)
const status = ref('stop')
const isLoading = ref(true)
const user = useUser()
const current = computed(() => {
  return user.id == props.data.from_id
})
const icon = computed(() => {
  if (status.value === 'stop') {
    return 'mdi-play'
  } else if (status.value === 'play') {
    return 'mdi-pause'
  }
})

onMounted(() => {
  if (!props.data.source) {
    return
  }

  const url = props.data.source.startsWith('blob:')
    ? props.data.source
    : new URL(props.data.source).pathname

  const waveform = (wavesurfer.value = WaveSurfer.create({
    container: element.value,
    barWidth: 2.5,
    height: 24,
    barRadius: 8,
    barHeight: 1.25,
    waveColor: current.value ? '#b3dfff' : '#888',
    progressColor: current.value ? 'rgb(255, 255, 255)' : '#000',
    cursorWidth: 1.5,
    cursorColor: 'transparent' /* current.value ? '#b3dfff' : '#bbb' */,
    url,
  }))

  waveform.on('ready', () => {
    _setDuration(waveform.getDuration())
  })

  waveform.on('finish', () => {
    _markAsStop()
    waveform.seekTo(0)
    setTimeout(() => {
      _setDuration(waveform.getDuration())
    }, 50)
  })

  waveform.on('loading', () => {
    isLoading.value = false
  })

  waveform.on('audioprocess', (time) => {
    _setDuration(time)
  })
})

onUnmounted(() => {
  wavesurfer.value.destroy()
})

// Functions

const switchStatus = () => {
  if (status.value === 'play') {
    _markAsStop()
    _switch()
  } else if (status.value === 'stop') {
    _markAsPlay()
    _switch()
  }
}

const _setDuration = (time) => {
  time = Math.round(time)
  duration.value = _convertSecondsToMinutesAndSeconds(time)
}

const _convertSecondsToMinutesAndSeconds = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  const formattedMinutes = minutes < 10 ? String(minutes) : minutes
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
  return `${formattedMinutes}:${formattedSeconds}`
}

const _markAsStop = () => {
  status.value = 'stop'
}

const _markAsPlay = () => {
  status.value = 'play'
}

const _switch = () => {
  wavesurfer.value.playPause()
}
</script>
