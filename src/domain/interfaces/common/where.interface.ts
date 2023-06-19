import { AtLeastTwoElementsArray } from './utils.interface';

export interface IWhereFilter<Column> {
  AND?: IWhereParams<Column>[];
  OR?: AtLeastTwoElementsArray<IWhereParams<Column>>;
  NOT?: IWhereParams<Column>[];
  CONTAINS?: IWhereParams<Column>[];
}

interface IWhereParams<Column> {
  column: Column;
  value: string | number | boolean | Date | null;
}
export type IWhere<C, V> = {
  column: C;
  value: V;
  where?: IWhere<C, V>;
};
