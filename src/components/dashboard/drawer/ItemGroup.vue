<template>
  <v-list-group :value="link.name" fluid class="mb-1">
    <template #activator="{ props }">
      <v-list-item v-bind="props">
        <template #prepend>
          <!-- prettier-ignore -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" width="21" stroke="currentColor" v-html="link.hipath"></svg>
          <div class="ms-2">{{ link.name }}</div>
        </template>
        <template #append>
          <!-- prettier-ignore -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" class="text-grey-darken-2" stroke="currentColor" width="18">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
          </svg>
        </template>
      </v-list-item>
    </template>

    <v-list-item v-for="child in link.children" link class="ms-6">
      <template #prepend>
        <!-- prettier-ignore -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" width="21" stroke="currentColor" v-html="child.hipath"></svg>
        <div class="ms-2">{{ child.name }}</div>
      </template>
    </v-list-item>
  </v-list-group>
</template>

<script setup>
defineProps({ link: Object })
</script>
