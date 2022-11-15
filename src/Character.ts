import { PaginationResponse } from './Paginate';

export type Character = {
  _id: string;
  height: string;
  race: string;
  gender: string;
  birth: string;
  spouse: string;
  death: string;
  realm: string;
  hair: string;
  name: string;
  wikiUrl: string;
};

export type GetCharactersResponse = PaginationResponse & {
  docs: Character[];
};

export type GetCharacterResponse = PaginationResponse & {
  docs: Character[];
};
