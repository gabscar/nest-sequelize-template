import {
  IPaginationOutput,
  IPaginationInput,
} from '@domain/interfaces/common/pagination.interface';

export class PaginationUtils {
  static parse(dto: IPaginationInput) {
    return {
      skip: Number(dto?.page * dto?.take) || 1,
      take: Number(dto?.take) || undefined,
    };
  }

  static output<T>(data: T[], page: number, max: number): IPaginationOutput<T> {
    return { data, meta: this.getMeta(page, data.length, max) };
  }

  private static getMeta(page: number, taken: number, max: number) {
    return { page, taken, max };
  }
}
