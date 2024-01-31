<template>
  <div class="flex items-center gap-2">
    <div
      class="relative flex"
      role="img"
      v-bind:aria-label="`rating ${rating} of 5`"
    >
      <span class="text-xl text-gray-400" data-testid="rating-stars-empty"
        >☆☆☆☆☆</span
      >
      <div
      data-testid="rating-stars-filled"
        class="absolute inset-0 overflow-hidden whitespace-nowrap text-xl text-yellow-400"
        v-bind:style="{ width: computedWidth }"
      >
        ★★★★★
      </div>
    </div>
    <span>{{ rating ?? '-' }}/5</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  rating: number
}>()

const computedWidth = computed(() => {
  return `${(props.rating / 5) * 100}%`
})
</script>
