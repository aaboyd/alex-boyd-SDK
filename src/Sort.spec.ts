import { buildSortParams, SortRequest } from './Sort';

describe('Sort', () => {
  it.each<[SortRequest, string]>([
    [{ name: 'DESCENDING' }, 'sort=name:desc'],
    [{ chapterName: 'ASCENDING' }, 'sort=chapterName:asc'],
  ])(
    'Creates correct params when building pagination request from "%s" to "%s"',
    async (sortRequest, expectedParams) => {
      expect(buildSortParams(sortRequest)).toEqual(expectedParams);
    }
  );
});
