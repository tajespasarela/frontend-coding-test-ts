<template>
  <component
    v-bind:is="link ? 'a' : 'button'"
    v-bind:disabled="disabled"
    class="button text-md self-center rounded-md border border-sky-500 px-4 py-2 font-bold transition-transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-50"
    v-bind:class="{
      'bg-sky-white text-sky-500  hover:border-sky-600 hover:text-sky-600':
        !active,
      'bg-sky-500 text-white  hover:border-sky-600 hover:bg-sky-600': active,
    }"
  >
    <slot />
  </component>
</template>
<script setup lang="ts">
defineProps<{ active?: boolean; disabled?: boolean; link?: boolean }>()
</script>
