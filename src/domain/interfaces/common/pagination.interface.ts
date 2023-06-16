export interface IPaginationOutput<T> {
  data: T[];
  meta: {
    taken: number;
    page: number;
    max: number;
  };
}

export interface IPaginationInput {
  take?: number;
  page?: number;
}
