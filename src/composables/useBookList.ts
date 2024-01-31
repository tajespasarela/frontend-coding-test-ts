import { useQuery } from '@tanstack/vue-query'
import { Ref } from 'vue'
import axios from 'axios'
import { Books } from '../types/Models'
import mapResponse from './mapResponse'

const useBookList = ({
  query,
  page,
}: {
  query: Ref<string>
  page: Ref<number>
}) => {
  const { data, isLoading } = useQuery<Books>({
    queryKey: ['books', query, page],
    queryFn: () =>
      axios
        .get('http://gutendex.com/books', {
          params: { search: query.value, page: page.value },
        })
        .then((res) => res.data ?? {})
        .then(mapResponse),
    staleTime: 1000 * 60 * 5,
  })

  return { data, isLoading }
}

export default useBookList
