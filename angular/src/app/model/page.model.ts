export interface Page<T> {
  content: T[];
  pageable: any;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: any;
  first: boolean;
  last: boolean;
  empty: boolean;
  numberOfElements: number;
}
