import { Book } from "./schema";

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface CurrentUser {
  users: {
    id: number;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
}
export interface UserToken {
  token: string;
}

export interface BooksResponse extends PaginatedResponse<Book> {}
