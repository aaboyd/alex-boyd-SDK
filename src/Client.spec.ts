import { assert } from 'console';
import Client from './Client';
import mockAxios from 'jest-mock-axios';

describe('Client', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('gets all books', async () => {
    const client = new Client({ debug: true });
    const getBookResponsePromise = client.getBooks();

    mockAxios.mockResponseFor(
      { url: '/book' },
      {
        status: 200,
        data: {
          docs: [
            {
              _id: '5cf5805fb53e011a64671582',
              name: 'The Fellowship Of The Ring',
            },
            { _id: '5cf58077b53e011a64671583', name: 'The Two Towers' },
            { _id: '5cf58080b53e011a64671584', name: 'The Return Of The King' },
          ],
          total: 3,
          limit: 1000,
          offset: 0,
          page: 1,
          pages: 1,
        },
      }
    );

    const getBookResponse = await getBookResponsePromise;
    assert(getBookResponse.docs.length === 3);
  });

  it('gets single book', async () => {
    const client = new Client({ debug: true });
    const respPromise = client.getBook('5cf58077b53e011a64671583');

    mockAxios.mockResponseFor(
      { url: '/book/5cf58077b53e011a64671583' },
      {
        status: 200,
        data: {
          docs: [{ _id: '5cf58077b53e011a64671583', name: 'The Two Towers' }],
          total: 3,
          limit: 1000,
          offset: 0,
          page: 1,
          pages: 1,
        },
      }
    );

    const resp = await respPromise;
    assert(resp.docs.length === 1);
    assert(resp.docs[0]!._id === '5cf58077b53e011a64671583');
    assert(resp.docs[0]!.name === 'The Two Towers');
  });
});
