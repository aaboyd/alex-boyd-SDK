import type { PaginationResponse } from './Paginate';

export type Movie = {
  _id: string;
  name: string;
  runtimeInMinutes: number;
  budgetInMillions: number;
  boxOfficeRevenueInMillions: number;
  academyAwardNominations: number;
  academyAwardWins: number;
  rottenTomatoesScore: number;
};

export type GetMoviesResponse = PaginationResponse & {
  docs: Movie[];
};

export type GetMovieResponse = PaginationResponse & {
  docs: Movie;
};
