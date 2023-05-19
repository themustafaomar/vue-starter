<template>
  <v-sheet width="300" class="mx-auto mt-10"></v-sheet>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => router.push('/login'))
</script>
