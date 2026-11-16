import { PageQueryDto } from './page-query.dto.js';

export { PageQueryDto };

export interface Page<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}

export function paginate<T>(
  items: readonly T[],
  page = 1,
  pageSize = 10,
): Page<T> {
  const start = (page - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    page,
    pageSize,
    total: items.length,
  };
}
