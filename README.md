# Alex Boyd SDK
Typescript SDK that allows access to [The One API](https://the-one-api.dev/), a Lord of the Rings API. 

## Installation
```
npm i alex-boyd-sdk
```

```
yarn add alex-boyd-sdk
```

## Usage
```typescript
const main = async () => {
  const client = new Client({ debug: true });

  // Books
  const getBooksResponse = await client.getBooks();

  // Book
  const getBookResponse = await client.getBook(getBooksResponse.docs[0]!._id);

  // Movies
  const getMoviesResponse = await client.getMovies();

  // Movie
  const getMovieResponse = await client.getMovie(getMoviesResponse.docs[0]!._id);

  // Movie Quotes
  const getMovieQuotesResponse = await client.getMovieQuotes('5cd95395de30eff6ebccde5c');

  // Characters
  const getCharactersResponse = await client.getCharacters();

  // Character
  const getCharacterResponse = await client.getCharacter(getCharactersResponse.docs[6]!._id);

  // Character Quote
  // Legolas : 5cd99d4bde30eff6ebccfd81
  const getCharacterQuoteResponse = await client.getCharacterQuotes('5cd99d4bde30eff6ebccfd81');

  const getQuotesResponse = await client.getQuotes({
    paginate: { page: 2, limit: 10 },
  });

  const getQuoteResponse = await client.getQuote('5cd96e05de30eff6ebcce7f5');

  // Chapter
  const getChaptersResponse = await client.getChapters();

  // Chapter
  // Homeward Bound : 6091b6d6d58360f988133bc6
  const getChapterResponse = await client.getChapter('6091b6d6d58360f988133bc6');

  // Sorting
  const sortedBooksResponse = await client.getBooks({
    sort: { name: 'DESCENDING' },
  });

  // Filtering
  const filteredBookChapterResponse = await client.getMovies({
    filter: { name: { type: 'REGEX', value: '/Of The/i' } },
  });

  // Paginate
  // The Return of the King : 5cd95395de30eff6ebccde5d
  const paginateMovies = await client.getMovieQuotes('5cd95395de30eff6ebccde5d', {
    paginate: { limit: 3, offset: 25 },
  });
};

main();
```

## Development
### Run Sample
```
yarn sample:dev
```

### Test
```
yarn test
```

## :construction: TODO
- [ ] Finish up Client tests
- [ ] Use an instance of axios, and allow it to be passed in constructor
- [ ] Verify (and tweak as needed) function in a browser
- [ ] Rewrite `buildFilterParams` to not be so dense
- [ ] Test filter params work as expected
- [ ] Rate limiting / auto-throttling
- [ ] Add doc comments to methods, generate documentation!

