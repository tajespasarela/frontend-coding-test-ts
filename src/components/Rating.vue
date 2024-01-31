<template>
  <div class="wrapper">
    <div class="rating" role="img" v-bind:aria-label="`rating ${rating} of 5`">
      <span class="rating--empty" data-testid="rating-stars-empty">☆☆☆☆☆</span>
      <div data-testid="rating-stars" class="rating--filled">★★★★★</div>
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
  return `${(props.rating / 10) * 100}%`
})
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.rating {
  position: relative;
  display: flex;
  width: max-content;
  height: max-content;

  &--empty {
    color: var(--border-color);
  }
  &--filled {
    color: #f5e902;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    white-space: nowrap;
    width: v-bind('computedWidth');
  }
}
</style>
