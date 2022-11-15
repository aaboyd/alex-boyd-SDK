import { buildPaginateParams, PaginationRequest } from './Paginate';

describe('Paginate', () => {
  it.each<[PaginationRequest, string]>([
    [{ page: 10, limit: 10, offset: 10 }, 'page=10&limit=10&offset=10'],
    [{ page: 10, limit: 10 }, 'page=10&limit=10'],
    [{ limit: 10 }, 'limit=10'],
  ])(
    'Creates correct params when building pagination request from "%s" to "%s"',
    async (paginationRequest, expectedParams) => {
      expect(buildPaginateParams(paginationRequest)).toEqual(expectedParams);
    }
  );
});
