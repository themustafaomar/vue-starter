<template>
  <v-list-item
    :value="link.name"
    :to="link.to"
    color="primary"
    active-class="list-item-active"
    exact
    class="mb-1"
  >
    <template #prepend>
      <!-- prettier-ignore -->
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" width="21" stroke="currentColor" v-html="link.hipath"></svg>
    </template>
    <div class="ms-3">{{ link.name }}</div>
    <template v-if="link.badge" #append>
      <v-badge :content="link.badge" color="red" />
    </template>
  </v-list-item>
</template>

<script setup>
defineProps({ link: Object })
</script>
