export type BookFormat =
  | 'text/html'
  | 'application/epub+zip'
  | 'application/x-mobipocket-ebook'
  | 'application/rdf+xml'
  | 'image/jpeg'
  | 'text/plain; charset=us-ascii'
  | 'application/octet-stream'
  | 'text/html; charset=utf-8'
  | 'text/plain; charset=utf-8'
  | 'text/plain; charset=iso-8859-1'
  | 'text/html; charset=iso-8859-1'

export interface Book {
  id: string
  title: string
  authors: { name: string; birthYear: number; deathYear?: number }[]
  formats: Record<BookFormat, string>
  categories: string[]
  languages: string[]
  copyright: boolean
  downloads: number
  cover?: string
}

export interface Books {
  count: number
  hasNext: boolean
  hasPrevious: boolean
  books: Book[]
}

export interface ApiResult {
  id: number
  title: string
  authors: { name: string; birth_year: number; death_year?: number }[]
  subjects: string[]
  bookshelves: string[]
  languages: string[]
  copyright: boolean
  media_type: string
  formats: Record<BookFormat, string>
  download_count: number
}

export interface ApiResponse {
  count: number
  next: string
  previous: null
  results: ApiResult[]
}
