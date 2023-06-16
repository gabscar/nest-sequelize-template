import { IPaginationOutput } from './pagination.interface';

export interface IPresenter<T> {
  present(entity: T): T;
  list?(entityList: IPaginationOutput<T>): IPaginationOutput<T>;
}
