import { Book } from "./schema";

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  }
}

export interface UserWithoutPassword {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface BooksResponse extends PaginatedResponse<Book> {}
