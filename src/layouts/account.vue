<template>
  <nav>
    <ul>
      <li>
        <router-link :to="{ name: 'home' }">Home</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'settings' }">Settings</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'notifications' }">Notifications</router-link>
      </li>
      <li>
        <!-- <a href="#" @click.prevent="$store.dispatch('auth/logout')">Logout</a> -->
      </li>
    </ul>
  </nav>
  <router-view />
</template>
