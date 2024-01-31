<template>
  <Teleport to="body">
    <TransitionGroup
      tag="ul"
      name="toast-list"
      class="fixed bottom-4 flex w-full flex-col gap-2 px-4"
      v-on:after-enter="onAfterEnter"
    >
      <li
        v-for="toast in toasts"
        v-bind:key="toast.id"
        class="relative mx-auto flex w-96 max-w-full items-center gap-2 overflow-hidden rounded-full bg-gray-700 p-4 text-white"
      >
        <span
          class="flex aspect-square h-10 w-10 items-center justify-center rounded-full border-2 font-serif text-lg"
          >i</span
        >
        <span class="flex w-full flex-col">
          {{ toast.message }}
        </span>
        <span
          class="toast-bar absolute bottom-0 left-8 right-8 h-1 origin-left border-t-2 border-white transition-transform ease-linear"
          v-bind:style="{ 'transition-duration': toast.timeout - 500 + 'ms' }"
        ></span>
      </li>
    </TransitionGroup>
  </Teleport>
</template>

<script setup lang="ts">
import { Teleport } from 'vue'
import useToast from '../composables/useToast'

const { toasts } = useToast()

function onAfterEnter(el: Element) {
  el.querySelector('.toast-bar')?.classList.add('scale-x-0')
}
</script>

<style scoped lang="scss">
.toast-list {
  &-move,
  &-enter-active,
  &-leave-active {
    transition: all 0.5s ease;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
}
</style>
