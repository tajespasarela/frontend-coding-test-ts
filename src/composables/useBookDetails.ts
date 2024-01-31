import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'
import { Book } from '../types/Models'
import mapResponse from './mapResponse'

const useBookDetails = (id: string) => {
  const { data: book, isLoading } = useQuery<Book | null>({
    queryKey: ['book', id],
    queryFn: () =>
      axios
        .get('http://gutendex.com/books', { params: { ids: id } })
        .then((res) => res.data ?? {})
        .then(mapResponse)
        .then((res) => res.books[0]),
  })

  return { book, isLoading }
}

export default useBookDetails
