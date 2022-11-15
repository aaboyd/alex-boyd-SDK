import { PaginationResponse } from './Paginate';

export type Quote = {
  _id: string;
  dialog: string;
  movie: string;
  character: string;
  id: string;
};

export type GetMovieQuoteResponse = PaginationResponse & {
  docs: Quote[];
};

export type GetCharacterQuoteResponse = PaginationResponse & {
  docs: Quote[];
};

export type GetQuoteResponse = PaginationResponse & {
  docs: Quote[];
};

export type GetQuotesResponse = PaginationResponse & {
  docs: Quote[];
};
