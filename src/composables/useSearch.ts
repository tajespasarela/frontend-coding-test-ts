import { ref } from 'vue'

const query = ref('')

export default function useSearch() {
  return {
    query,
  }
}
