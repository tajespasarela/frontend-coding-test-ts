import { ref } from 'vue'

export interface Toast {
  message: string
  timeout: number
  id: number
}

const toasts = ref<Toast[]>([])

function showToast(message: string, timeout = 3000) {
  const id = Date.now()
  toasts.value.push({ message, timeout, id })

  const clearToast = () => {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  if (timeout !== 0) {
    setTimeout(() => clearToast(), timeout)
  }

  return clearToast
}

export default function useToast() {
  return { toasts, showToast }
}
