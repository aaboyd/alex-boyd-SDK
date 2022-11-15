import axios from 'axios';
import type { GetBooksResponse } from './Book';
import type { GetBookChaptersResponse, GetChapterResponse, GetChaptersResponse } from './Chapter';
import { GetCharacterResponse, GetCharactersResponse } from './Character';
import { buildFilterParams, FilterRequest } from './Filter';
import type { GetMovieResponse, GetMoviesResponse } from './Movie';
import { buildPaginateParams, PaginationRequest } from './Paginate';
import { GetMovieQuoteResponse, GetCharacterQuoteResponse, GetQuotesResponse } from './Quote';
import { buildSortParams, SortRequest } from './Sort';
import { addAxiosDebugLogger } from './util/debug';

export type ClientOptions = {
  accessToken?: string;
  baseApiUrl?: string;
  debug?: boolean;
};

export type ApiRequestOptions = {
  paginate?: PaginationRequest;
  sort?: SortRequest;
  filter?: FilterRequest;
};

export default class Client {
  private accessToken?: string;
  private baseApiUrl = 'https://the-one-api.dev/v2';

  constructor(options?: ClientOptions) {
    if (options?.debug) {
      addAxiosDebugLogger(axios);
    }

    this.accessToken = options?.accessToken || process.env['THE_ONE_ACCESS_TOKEN'];
  }

  private async makeRequest<T>(url: string, options?: ApiRequestOptions): Promise<T> {
    const queryParams = [
      options?.paginate ? buildPaginateParams(options.paginate) : '',
      options?.sort ? buildSortParams(options.sort) : '',
      options?.filter ? buildFilterParams(options.filter) : '',
    ]
      // remove empty strings
      .filter((entry) => entry.trim() != '');

    const queryParamsString =
      queryParams && queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
    const fullUrl = url + queryParamsString;

    const response = await axios.get<T>(fullUrl, {
      baseURL: this.baseApiUrl,
      ...(this.accessToken
        ? {
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          }
        : {}),
    });

    return response.data;
  }

  private validateAccessToken() {
    if (!(this.accessToken && this.accessToken.length >= 1)) {
      throw new Error('`accessToken` is required to  perform this operation');
    }
  }

  // /book
  public getBooks(options?: ApiRequestOptions): Promise<GetBooksResponse> {
    return this.makeRequest<GetBooksResponse>(`/book`, options);
  }

  // /book/{id}
  public getBook(id: string): Promise<GetBooksResponse> {
    return this.makeRequest<GetBooksResponse>(`/book/${id}`);
  }

  // /book/{id}/chapter
  // TODO: do the options work here?
  public getBookChapters(
    bookId: string,
    options?: ApiRequestOptions
  ): Promise<GetBookChaptersResponse> {
    return this.makeRequest<GetBookChaptersResponse>(`/book/${bookId}/chapter`, options);
  }

  // /movie
  public getMovies(options?: ApiRequestOptions): Promise<GetMoviesResponse> {
    this.validateAccessToken();
    return this.makeRequest<GetMoviesResponse>(`/movie`, options);
  }

  // /movie/{id}
  public getMovie(id: string): Promise<GetMovieResponse> {
    this.validateAccessToken();
    return this.makeRequest<GetMovieResponse>(`/movie/${id}`);
  }

  // /movie/{id}/quote
  public getMovieQuotes(
    movieId: string,
    options?: ApiRequestOptions
  ): Promise<GetMovieQuoteResponse> {
    this.validateAccessToken();
    return this.makeRequest<GetMovieQuoteResponse>(`/movie/${movieId}/quote`, options);
  }

  // /character
  public getCharacters(options?: ApiRequestOptions): Promise<GetCharactersResponse> {
    this.validateAccessToken();
    return this.makeRequest<GetCharactersResponse>('/character', options);
  }

  // /character/${id}
  public getCharacter(id: string): Promise<GetCharacterResponse> {
    this.validateAccessToken();
    return this.makeRequest<GetCharacterResponse>(`/character/${id}`);
  }

  // /character/${id}/quote
  public getCharacterQuotes(
    characterId: string,
    options?: ApiRequestOptions
  ): Promise<GetCharacterQuoteResponse> {
    this.validateAccessToken();
    return this.makeRequest<GetCharacterQuoteResponse>(`/character/${characterId}/quote`, options);
  }

  // /quote
  public getQuotes(options?: ApiRequestOptions): Promise<GetQuotesResponse> {
    this.validateAccessToken();
    return this.makeRequest<GetQuotesResponse>(`/quote`, options);
  }

  // /quote/${id}
  public getQuote(id: string): Promise<GetQuotesResponse> {
    this.validateAccessToken();
    return this.makeRequest<GetQuotesResponse>(`/quote/${id}`);
  }

  // /chapter
  public getChapters(options?: ApiRequestOptions): Promise<GetChaptersResponse> {
    this.validateAccessToken();
    return this.makeRequest<GetChaptersResponse>(`/chapter`, options);
  }

  // /chapter/${id}
  public getChapter(id: string): Promise<GetChapterResponse> {
    this.validateAccessToken();
    return this.makeRequest<GetChapterResponse>(`/chapter/${id}`);
  }
}
