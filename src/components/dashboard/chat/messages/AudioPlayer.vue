<template>
  <audio :src="source" controls></audio>
</template>

<script setup>
defineProps({
  source: String,
})
</script>
