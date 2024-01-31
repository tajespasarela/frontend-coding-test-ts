<template>
  <div
    class="rounded outline-2 outline-offset-2 outline-sky-500 focus-within:outline"
  >
    <div
      class="clip-path-animated flex h-8 w-64 items-center gap-4 bg-white text-slate-700"
      v-bind:class="{ 'clip-path-animated-visible': isSearchVisible }"
    >
      <button
        class="flex aspect-square h-full flex-none cursor-pointer items-center justify-center"
        aria-label="show search"
        data-testid="search-button"
        tabindex="-1"
        v-on:click="toggleSearch"
      >
        <span class="rotate-45 text-3xl">⚲</span>
      </button>
      <input
        ref="inputRef"
        type="search"
        class="]h-8 w-full px-2 outline-none"
        placeholder="Search"
        aria-label="Search for a book"
        v-bind:value="query"
        data-testid="search-input"
        v-on:input="onDebouncedInput"
        v-on:blur="onBlur"
        v-on:focus="onFocus"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import useSearch from '../composables/useSearch'
import useToast from '../composables/useToast'

const { query } = useSearch()

const isSearchVisible = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)
const { showToast } = useToast()
let cancelPreviousToast: (() => void) | null = null

async function toggleSearch() {
  isSearchVisible.value = !isSearchVisible.value
  if (isSearchVisible.value) {
    await nextTick()
    inputRef.value?.focus()
  }
}

function onFocus() {
  isSearchVisible.value = true
}

function onBlur() {
  if (!query.value) {
    isSearchVisible.value = false
  }
}

function setQuery(e: Event) {
  query.value = (e.target as HTMLInputElement).value
  cancelPreviousToast?.()
  cancelPreviousToast = showToast(`Searching for "${query.value}"`)
}

const onDebouncedInput = useDebounceFn(setQuery, 300)
</script>

<style lang="scss">
.clip-path-animated {
  transition: clip-path 0.2s ease-in-out;
  clip-path: rect(0 2rem 100% 0 round 5px);

  &-visible {
    clip-path: rect(0 16rem 100% 0 round 5px);
  }
}
</style>
