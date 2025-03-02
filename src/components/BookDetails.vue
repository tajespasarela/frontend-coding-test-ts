<template>
  <article
    data-testid="book-details"
    class="mx-auto flex w-full flex-col overflow-hidden rounded-xl bg-gray-200 shadow-md"
  >
    <div
      class="flex flex-wrap justify-center gap-4 bg-white p-4 sm:justify-between"
    >
      <div class="text-left">
        <h2 class="text-lg font-semibold text-gray-800">
          {{ book.title }}
        </h2>
        <p class="text-sm text-gray-500">{{ book.authors[0]?.name }}</p>
      </div>
      <Rating class="ml-auto" v-bind:rating="fakeRating" />
    </div>
    <div class="pt-4">
      <BookImage v-bind:book="book" />
    </div>
    <div class="mt-auto p-4">
      <div
        class="flex flex-wrap items-center justify-center gap-2 sm:justify-start"
      >
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
        <div class="ml-auto mt-2">
          <ul
            class="flex flex-wrap justify-center gap-1 text-sm text-gray-500 sm:justify-start"
          >
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
    </div>
    <div class="flex flex-col items-center gap-4 bg-white p-4">
      <h3 class="text-xl font-bold text-gray-600">Download</h3>
      <ul class="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
        <li v-for="{ link, format } in downloadLinks" v-bind:key="format">
          <Button
            class="flex items-center justify-center gap-1 whitespace-nowrap"
            active
            link
            target="_blank"
            v-bind:href="link"
            v-on:click="showToast('Download started')"
            ><span class="text-lg">&#x2193;</span>{{ format }}</Button
          >
        </li>
      </ul>
      <span class="text-gray-500"
        ><span class="font-bold">{{ book.downloads }}</span> Downloads</span
      >
    </div>
  </article>

  <Comments v-bind:book="book" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Book, BookFormat } from '../types/Models'
import BookImage from './BookImage.vue'
import Comments from './Comments.vue'
import Rating from './Rating.vue'
import Button from './Button.vue'
import useToast from '../composables/useToast'

const props = defineProps<{ book: Book }>()

const fakeRating = Math.floor(Math.random() * 5) + 1

const excludeFormats: BookFormat[] = ['image/jpeg']

const downloadLinks = computed(() =>
  Object.entries(props.book.formats)
    .filter(([format]) => excludeFormats.indexOf(format as BookFormat) === -1)
    .map(([format, link]) => ({
      format: format
        .replace(/(text\/|application\/|;|charset=|xml|zip)/g, '')
        .replace('x-mobipocket-ebook', 'mobi')
        .replace('plain', 'text')
        .replace('octet-stream', 'html zip')
        .replace('+', ' '),
      link,
    })),
)

const { showToast } = useToast()
</script>
