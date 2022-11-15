export type FilterType =
  | 'MATCH'
  | 'NEGATE_MATCH'
  | 'INCLUDE'
  | 'EXCLUDE'
  | 'EXISTS'
  | 'NOT_EXISTS'
  | 'REGEX'
  | 'NEGATE_REGEX'
  | 'LESS_THAN'
  | 'LESS_THAN_OR_EQUAL_TO'
  | 'GREATER_THAN'
  | 'GREATER_THAN_OR_EQUAL_TO'
  | 'EQUAL_TO';
export type FilterRequest = {
  [field: string]:
    | {
        type:
          | 'MATCH'
          | 'NEGATE_MATCH'
          | 'REGEX'
          | 'NEGATE_REGEX'
          | 'LESS_THAN'
          | 'GREATER_THAN'
          | 'EQUAL_TO'
          | 'LESS_THAN_OR_EQUAL_TO'
          | 'GREATER_THAN_OR_EQUAL_TO';
        value: string;
      }
    | {
        type: 'INCLUDE' | 'EXCLUDE';
        value: string[];
      }
    | {
        type: 'EXISTS' | 'NOT_EXISTS';
        value?: string;
      };
};

export const buildFilterParams = (req: FilterRequest) => {
  return Object.entries(req).reduce((prev, [field, filterParams]) => {
    let newFilterParam = '';

    if (['INCLUDE', 'EXCLUDE'].includes(filterParams.type)) {
      const fieldAugmentor = 'INCLUDE' === filterParams.type ? '' : '!';
      newFilterParam = field + fieldAugmentor + '=' + (filterParams.value as string[]).join(',');
    } else if (['EXISTS', 'NOT_EXISTS'].includes(filterParams.type)) {
      const fieldAugmentor = 'EXISTS' === filterParams.type ? '' : '!';
      newFilterParam = fieldAugmentor + field;
    } else if (['MATCH', 'REGEX'].includes(filterParams.type) && filterParams.value) {
      newFilterParam = field + '=' + filterParams.value;
    } else if (['NEGATE_MATCH', 'NEGATE_REGEX'].includes(filterParams.type) && filterParams.value) {
      newFilterParam = field + '!=' + filterParams.value;
    } else if (filterParams.type === 'LESS_THAN') {
      newFilterParam = field + '<' + filterParams.value;
    } else if (filterParams.type === 'GREATER_THAN') {
      newFilterParam = field + '>' + filterParams.value;
    } else if (filterParams.type === 'EQUAL_TO') {
      newFilterParam = field + '>' + filterParams.value;
    } else if (filterParams.type === 'GREATER_THAN_OR_EQUAL_TO') {
      newFilterParam = field + '>=' + filterParams.value;
    }

    return (prev.length > 0 ? '&' : '') + newFilterParam;
  }, '');
};
