<template>
  <div
    class="min-h-screen min-w-full bg-gray-100 text-center font-sans text-sm antialiased"
  >
    <router-view />
  </div>
  <ToastNotifications />
</template>

<script setup lang="ts">
import ToastNotifications from './components/ToastNotifications.vue'
</script>
