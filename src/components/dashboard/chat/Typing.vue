<template>
  <li class="d-flex justify-start">
    <audio ref="typingSound" loop>
      <source src="/typing.mp3" type="audio/mpeg" />
      Your browser does not support the audio tag.
    </audio>
    <v-avatar>
      <v-img cover :src="partner.avatar"></v-img>
    </v-avatar>
    <div>
      <div class="bg-grey-lighten-3 rounded-lg ms-4 py-2 px-3">
        <div class="typing">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  partner: Object,
})

const typingSound = ref(null)

onMounted(() => {
  typingSound.value.play()
})
</script>

<style lang="scss">
.typing {
  align-items: center;
  display: flex;
  height: 17px;
  .dot {
    animation: mercuryTypingAnimation 1.8s infinite ease-in-out;
    background-color: rgba(#000, 0.7);
    border-radius: 50%;
    height: 7px;
    margin-right: 4px;
    vertical-align: middle;
    width: 7px;
    display: inline-block;
  }
  .dot:nth-child(1) {
    animation-delay: 200ms;
  }
  .dot:nth-child(2) {
    animation-delay: 300ms;
  }
  .dot:nth-child(3) {
    animation-delay: 400ms;
  }
  .dot:last-child {
    margin-right: 0;
  }
}

@keyframes mercuryTypingAnimation {
  0% {
    transform: translateY(0px);
    background-color: rgba(#000, 0.7);
  }
  28% {
    transform: translateY(-7px);
    background-color: rgba(#000, 0.4);
  }
  44% {
    transform: translateY(0px);
    background-color: rgba(#000, 0.2);
  }
}
</style>
