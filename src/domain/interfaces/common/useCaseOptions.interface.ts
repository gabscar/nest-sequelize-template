import { IUserRelations, UserEntity } from '@domain/entities/user.entity';
import { IPaginationInput } from './pagination.interface';
import { IWhere, IWhereFilter } from './where.interface';

export interface IUseCaseOptions<Entity, FilterColumns, Relations> {
  filters?: IFilter<FilterColumns>;
  orders?: IOrder<keyof Entity>[];
  pagination?: IPaginationInput;
  relations?: IRelation<Relations>[];
  transaction?: unknown;
}

interface IFilter<Column = unknown> {
  where: IWhereFilter<Column>;
}

interface IOrder<KeyOfEntity = string, Order = 'DESC' | 'ASC' | 'RAND'> {
  column?: KeyOfEntity;
  order: Order;
}

export type IRelation<Relation> = {
  [Key in keyof Relation]: {
    table: Key;
    values: Relation[Key] extends Array<unknown>
      ? (keyof Relation[Key][number])[]
      : (keyof Relation[Key])[];
    where?: IWhere<keyof Relation[Key], unknown>[];
    relations?: IRelation<Relation[Key]>[];
  };
}[keyof Relation];

// const object: IRelation<IUserRelations> = {
//   table: 'address',
//   values: [],
//   relations: [
//     {
//       table: 'teste',
//       values: [],
//     },
//   ],
// };
