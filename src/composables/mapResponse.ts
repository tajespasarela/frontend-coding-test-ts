import { Book, Books, ApiResult, ApiResponse } from '../types/Models'

function mapResponse({ results, previous, next, count }: ApiResponse): Books {
  return {
    hasPrevious: !!previous,
    hasNext: !!next,
    count,
    books: results.map(
      (result: ApiResult) =>
        ({
          id: result.id.toString(),
          title: result.title,
          authors: result.authors.map((author) => ({
            name: author.name,
            birthYear: author.birth_year,
            deathYear: author.death_year,
          })),
          formats: result.formats,
          categories: result.bookshelves,
          languages: result.languages,
          cover: result.formats['image/jpeg'],
          imageAlt: result.title,
          downloads: result.download_count,
          copyright: result.copyright,
        }) as Book,
    ),
  }
}

export default mapResponse
