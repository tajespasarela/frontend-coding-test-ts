import { useLocalStorage } from "@vueuse/core";
import { Book } from "../types/Models";
import { Comment } from "../types/Comment";

export function useComments(book: Book) {
  return useLocalStorage<Comment[]>(`comments_${book.slug}`, []);
}
