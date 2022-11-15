export type SortDirection = 'ASCENDING' | 'DESCENDING';
export type SortRequest = {
  [field: string]: SortDirection;
};

export const buildSortParams = (req: SortRequest) => {
  // TODO: what to do when invalid
  const [field, dir] = Object.entries(req)[0]!;
  return `sort=${field}:${dir === 'ASCENDING' ? 'asc' : 'desc'}`;
};
