<template>
  <!-- <button @click="toggle">Toggle Picker</button> -->
  <Picker
    :data="emojiIndex"
    :showPreview="false"
    set="facebook"
    emoji="point_up"
    @select="convertEmoji"
  />
</template>

<script>
import { ref } from 'vue'
import { Picker, EmojiIndex } from 'emoji-mart-vue-fast/src'
import data from 'emoji-mart-vue-fast/data/facebook.json'
import 'emoji-mart-vue-fast/css/emoji-mart.css'

export default {
  name: 'EmojiPicker',
  components: {
    Picker,
  },
  emits: ['updateEmoji'],
  setup(props, context) {
    const emojiPickerSelected = ref(false)
    let emojiIndex = new EmojiIndex(data)

    const toggle = () => {
      emojiPickerSelected.value = !emojiPickerSelected.value
    }

    const handle = (e) => {
      console.log(e)
    }

    const convertEmoji = (emoji) => {
      // console.log(emoji, emoji.getPosition())
      context.emit('emoji:selected', emoji.native)
    }

    return {
      emojiPickerSelected,
      emojiIndex,
      toggle,
      convertEmoji,
      handle,
    }
  },
}
</script>
