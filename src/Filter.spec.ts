import { buildFilterParams, FilterRequest } from './Filter';

describe('Filter', () => {
  it.each<[FilterRequest, string]>([
    [{ name: { type: 'MATCH', value: 'Gandalf' } }, 'name=Gandalf'],
    [{ name: { type: 'NEGATE_MATCH', value: 'Gandalf' } }, 'name!=Gandalf'],
    [{ race: { type: 'INCLUDE', value: ['Hobbit', 'Human'] } }, 'race=Hobbit,Human'],
    [{ race: { type: 'EXCLUDE', value: ['Hobbit', 'Human'] } }, 'race!=Hobbit,Human'],
    [{ name: { type: 'EXISTS' } }, 'name'],
    [{ name: { type: 'NOT_EXISTS' } }, '!name'],
    [{ character: { type: 'REGEX', value: '/foot/i' } }, 'character=/foot/i'],
    [{ character: { type: 'NEGATE_REGEX', value: '/foot/i' } }, 'character!=/foot/i'],
    [{ budgetInMillions: { type: 'LESS_THAN', value: '100' } }, 'budgetInMillions<100'],
    [{ academyAwardWins: { type: 'GREATER_THAN', value: '0' } }, 'academyAwardWins>0'],
    [
      { runtimeInMinutes: { type: 'GREATER_THAN_OR_EQUAL_TO', value: '160' } },
      'runtimeInMinutes>=160',
    ],
  ])(
    'Creates correct params when building filter request from "%s" to "%s"',
    async (filterRequest, expectedParams) => {
      expect(buildFilterParams(filterRequest)).toEqual(expectedParams);
    }
  );
});
