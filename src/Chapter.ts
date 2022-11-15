import { PaginationResponse } from './Paginate';

export type Chapter = {
  _id: string;
  chapterName: string;
  book: string;
};

export type GetBookChaptersResponse = PaginationResponse & {
  docs: Chapter[];
};

export type GetChaptersResponse = PaginationResponse & {
  docs: Chapter[];
};

export type GetChapterResponse = PaginationResponse & {
  docs: Chapter[];
};
