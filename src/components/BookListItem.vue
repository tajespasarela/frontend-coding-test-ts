<template>
  <article
    data-testid="book-list-item"
    class="mx-auto flex max-w-md cursor-pointer flex-col overflow-hidden rounded-xl from-gray-200 from-60% via-white via-60% to-white shadow-md transition duration-300 ease-in-out -bg-gradient-to-10 sm:hover:scale-105 sm:hover:shadow-xl"
    v-on="listeners"
    v-on:click="onBookClick"
  >
    <div class="p-4 text-left">
      <h2 class="line-clamp-3 text-lg font-semibold text-gray-800">
        <RouterLink ref="linkRef" v-bind:to="detailsPageUrl">{{
          book.title
        }}</RouterLink>
      </h2>
      <p class="text-sm text-gray-500">{{ book.authors[0]?.name }}</p>
    </div>
    <BookImage v-bind:book="book" />
    <div class="mt-auto p-4">
      <div class="flex items-center justify-between">
        <p class="text-base text-gray-700">
          lang: {{ book.languages.join(', ') }}
        </p>
        <p
          v-if="book.copyright"
          class="text-base text-gray-700"
          title="with copyright"
        >
          ©
        </p>
      </div>
      <div class="mt-2">
        <ul class="flex flex-wrap gap-1 text-sm text-gray-500">
          <li
            v-for="category in book.categories"
            v-bind:key="category"
            class="rounded-full bg-white px-1 leading-4"
          >
            {{ category }}
          </li>
        </ul>
      </div>
    </div>
    <div class="flex items-center justify-between gap-4 bg-white p-4">
      <span class="text-gray-500"
        ><span class="font-bold">{{ book.downloads }}</span> Downloads</span
      >
      <Button
        link
        class="flex items-center gap-1"
        active
        v-bind:href="downloadLink"
        v-on:click.stop="showToast('Download started')"
        ><span class="text-lg">&#x2193;</span>Download</Button
      >
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { type Book } from '../types/Models'
import { useSelectionDetection } from '../composables/useSelectionDetection'
import Button from './Button.vue'
import BookImage from './BookImage.vue'
import useToast from '../composables/useToast'

const props = defineProps<{ book: Book }>()

const { listeners, isSelecting } = useSelectionDetection()
const router = useRouter()

const detailsPageUrl = computed(() => `/book/${props.book.id}`)

const downloadLink = computed(
  () =>
    props.book.formats['application/epub+zip'] ??
    props.book.formats['text/plain; charset=utf-8'],
)

const { showToast } = useToast()

function onBookClick() {
  if (!isSelecting.value) {
    router.push(detailsPageUrl.value)
  }
}
</script>
