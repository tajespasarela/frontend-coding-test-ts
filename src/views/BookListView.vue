<template>
  <div class="flex flex-col gap-6 pb-8">
    <div
      v-if="!isLoading && query && data?.count"
      class="flex items-baseline gap-1"
    >
      Showing <span class="text-lg font-bold">{{ data?.count }}</span> results
      for query
      <span class="text-lg font-bold">{{ query }}</span>
    </div>
    <TransitionGroup
      name="list"
      tag="main"
      class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <BookListItem
        v-for="book in data?.books"
        v-bind:key="book.id"
        class="w-full"
        v-bind:book="book"
      />
    </TransitionGroup>
    <Pagination v-model="page" v-bind:total-items="data?.count" />
  </div>

  <div
    v-if="!isLoading && query && !data?.count"
    class="flex flex-col items-center gap-4"
  >
    <h2 class="text-2xl font-bold">No results found</h2>
    <p class="text-lg">Try another query</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import useBookList from '../composables/useBookList'
import BookListItem from '../components/BookListItem.vue'
import useSearch from '../composables/useSearch'
import Pagination from '../components/Pagination.vue'

const { query } = useSearch()
const page = ref(1)

watch([query, page], () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

watch(query, () => {
  page.value = 1
})

const { data, isLoading } = useBookList({ query, page })
</script>

<style scoped lang="scss">
.list {
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
