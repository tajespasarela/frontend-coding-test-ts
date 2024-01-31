<template>
  <img
    v-show="loaded"
    v-bind:src="book.cover"
    v-bind:alt="`cover of the book ${book.title}`"
    class="h-56 w-full object-contain"
    v-on:load="loaded = true"
  />
  <div v-show="!loaded" class="flex h-56 w-full items-center justify-center">
    <div
      class="vi flex aspect-[3/4] h-full items-center justify-center rounded bg-gradient-to-tr from-slate-950 via-slate-800 to-slate-950 p-4 text-xl text-white shadow-sm"
    >
      {{ book.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Book } from '../types/Models'

defineProps<{ book: Book }>()

const loaded = ref(false)
</script>
