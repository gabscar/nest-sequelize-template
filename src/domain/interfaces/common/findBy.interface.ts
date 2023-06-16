import { IWhere, IWhereFilter } from './where.interface';

export interface IFindBy<C, V> {
  where: IWhere<C, V>;
  filter?: IWhereFilter<C>;
}
