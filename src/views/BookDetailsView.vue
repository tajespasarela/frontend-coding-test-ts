<template>
  <div class="book-details-view flex w-full flex-col gap-4">
    <RouterLink class="text-2xl text-gray-700" to="/books"
      >← Back to list</RouterLink
    >
    <BookDetails v-if="book" v-bind:book="book" />
    <h1 v-else-if="!isLoading" class="mt-12 text-center">Book not found</h1>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BookDetails from '../components/BookDetails.vue'
import useBookDetails from '../composables/useBookDetails'

const props = defineProps<{ id: string }>()

const { book, isLoading } = useBookDetails(props.id)
</script>
