import type { PaginationResponse } from './Paginate';

export type Book = {
  _id: string;
  name: string;
};

export type GetBooksResponse = PaginationResponse & {
  docs: Book[];
};

export type GetBookResponse = PaginationResponse & {
  doc: Book;
};
