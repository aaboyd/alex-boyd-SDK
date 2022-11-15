export type PaginationResponse = {
  total: number;
  limit: number;
  offset: number;
  page: number;
  pages: number;
};

export type PaginationRequest = {
  page?: number;
  limit?: number;
  offset?: number;
};

export const buildPaginateParams = (req: PaginationRequest) => {
  return Object.entries(req)
    .map(([field, number]) => {
      return `${field}=${number}`;
    })
    .join('&');
};
