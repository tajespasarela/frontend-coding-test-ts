<template>
  <div class="flex flex-col gap-4">
    <h3 class="text-2xl text-gray-700">Comments</h3>

    <form ref="formRef" class="flex max-w-lg flex-col gap-2">
      <h4 class="self-end text-gray-700">add a new comment</h4>
      <label class="grid grid-cols-[5rem_1fr] gap-1 text-left"
        >name<input
          v-model="newComment.name"
          type="text"
          required
          class="rounded-md border border-gray-300 p-2"
      /></label>
      <label class="grid grid-cols-[5rem_1fr] gap-1 text-left"
        >email<input
          v-model="newComment.email"
          type="email"
          required
          class="rounded-md border border-gray-300 p-2"
      /></label>
      <label class="grid grid-cols-[5rem_1fr] gap-1 text-left"
        >comment<textarea
          v-model="newComment.text"
          required
          class="h-24 resize-y rounded-md border border-gray-300 p-2"
        />
      </label>
      <Button class="ml-auto" v-on:click.prevent="addComment">submit</Button>
    </form>

    <div class="flex flex-col gap-4">
      <div
        v-for="comment in comments"
        v-bind:key="comment.id"
        data-testid="comment"
        class="flex flex-col items-start rounded-md border border-gray-300 bg-white p-4"
      >
        <p class="text-lg font-bold">{{ comment.name }}</p>
        <p class="italic text-gray-700">{{ comment.email }}</p>
        <p class="mt-2">{{ comment.text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Book } from '../types/Models'
import useComments from '../composables/useComments'
import Button from './Button.vue'

const props = defineProps<{ book: Book }>()

const formRef = ref<HTMLFormElement | null>(null)

const comments = useComments(props.book)

const newComment = reactive({
  name: '',
  email: '',
  text: '',
})

function addComment() {
  if (!formRef.value?.reportValidity()) {
    return
  }

  comments.value = [
    {
      id: Date.now().toString(),
      ...newComment,
    },
    ...comments.value,
  ]

  newComment.name = ''
  newComment.email = ''
  newComment.text = ''
}
</script>
