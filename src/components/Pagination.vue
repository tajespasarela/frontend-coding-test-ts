<template>
  <div
    v-if="totalItems"
    class="flex flex-wrap items-center justify-center gap-4"
  >
    <Button
      aria-label="first page"
      v-bind:disabled="modelValue === 1"
      v-on:click="firstPage"
      >&lt;&lt;</Button
    ><Button
      aria-label="previous page"
      v-bind:disabled="modelValue === 1"
      v-on:click="previousPage"
      >&lt;</Button
    >
    <span v-if="pages[0] > 1" class="-translate-y-2 text-2xl">...</span>
    <Button
      v-for="page in pages"
      v-bind:key="page"
      v-bind:active="modelValue === page"
      v-bind:aria-label="`go to page ${page}`"
      v-on:click="onPageClick(page)"
      >{{ page }}</Button
    >
    <span
      v-if="pages.slice(-1)?.[0] < totalPages"
      class="-translate-y-2 text-2xl"
      >...</span
    >
    <Button
      aria-label="next page"
      v-bind:disabled="modelValue === totalPages"
      v-on:click="nextPage"
      >&gt;</Button
    >
    <Button
      aria-label="last page"
      v-bind:disabled="modelValue === totalPages"
      v-on:click="lastPage"
      >&gt;&gt;</Button
    >
    <span class="w-full text-center"
      >Page {{ modelValue }} of {{ totalPages }}</span
    >
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Button from './Button.vue'
import { ITEMS_PER_PAGE } from '../consts'

const props = withDefaults(
  defineProps<{ modelValue: number; totalItems?: number }>(),
  {
    totalItems: 0,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', page: number): void
}>()

const totalPages = computed(() => Math.ceil(props.totalItems / ITEMS_PER_PAGE))

const pages = computed(() => {
  let firstPage = props.modelValue - 2
  if (firstPage < 1) {
    firstPage = 1
  }

  let lastPage = firstPage + 4
  if (lastPage > totalPages.value) {
    lastPage = totalPages.value
    firstPage = lastPage - 4
    if (firstPage < 1) {
      firstPage = 1
    }
  }

  return Array.from(
    { length: lastPage - firstPage + 1 },
    (_, i) => i + firstPage,
  )
})

function onPageClick(page: number) {
  emit('update:modelValue', page)
}

function nextPage() {
  if (props.modelValue < totalPages.value) {
    emit('update:modelValue', props.modelValue + 1)
  }
}

function previousPage() {
  if (props.modelValue > 1) {
    emit('update:modelValue', props.modelValue - 1)
  }
}

function firstPage() {
  if (props.modelValue < totalPages.value) {
    emit('update:modelValue', 1)
  }
}

function lastPage() {
  if (props.modelValue < totalPages.value) {
    emit('update:modelValue', totalPages.value)
  }
}
</script>
