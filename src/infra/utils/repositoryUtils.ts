import {
  IRelation,
  IUseCaseOptions,
} from '@domain/interfaces/common/useCaseOptions.interface';
import { IWhere } from '@domain/interfaces/common/where.interface';
import { sequelize } from '@infra/database/database.providers';
import { Op, FindOptions, fn, Order } from 'sequelize';

import { OrmAdapterUtils } from './ormAdapter.utils';
import { IFindBy } from '@domain/interfaces/common/findBy.interface';

type IInputFindAllOptions<E, R> = IUseCaseOptions<keyof E, string | number, R>;
// interface IInputFindAllOptions<E>
//   extends IUseCaseOptions<keyof E, string | number, any> {}
interface IFindByOptionsWithNestedWheres<E, R>
  extends IUseCaseOptions<keyof E, string | number, R> {
  where: IWhere<keyof E, string | number | boolean>[];
}

// export const includeNestedRelations = <R>(relations?: IRelation<R>[]) =>
//   relations &&
//   relations.map((relation) => ({
//     association: relation.table,
//     include: relation.relations
//       ? includeNestedRelations(relation.relations)
//       : [],
//   }));

// export const createFindByOptionsWithNestedWheres = <E, R>(
//   input: IFindByOptionsWithNestedWheres<E, R>,
// ): FindOptions => {
//   const options: FindOptions = {
//     where: { [Op.or]: [...input.where.map((where) => unnestWheres(where))] },
//     include: includeNestedRelations(input.relations),
//   };

//   options.where['deleted_at'] = {
//     [Op.is]: null,
//   };

//   return options;
// };

// export const includeNestedRelationsWithWhere = <R>(
//   relations?: IRelation<R>[],
// ) =>
//   relations &&
//   relations.map((relation) => {
//     const options: { [k: string]: unknown } = {
//       association: relation.table,
//     };

//     if (relation.where?.length) {
//       options.where = relation.where.map(({ column, value }) => ({
//         [column]: value,
//       }));
//     }

//     if (relation.relations) {
//       options.include = includeNestedRelations(relation.relations);
//     }

//     return options;
//   });

// export const createFindAllOptions = <E, R>(
//   input: IInputFindAllOptions<E, R>,
// ): FindOptions => {
//   const options: FindOptions = {
//     limit: input.pagination && input.pagination.take,
//     offset:
//       input.pagination &&
//       Math.abs(input.pagination.take * input.pagination.page),
//     where: {},
//     include: includeNestedRelationsWithWhere(input.relations),
//   };

//   if (input.orders) {
//     const getOptions = [];
//     input.orders.forEach(({ order, column }) => {
//       switch (order) {
//         case 'ASC': {
//           getOptions.push([sequelize.literal(column), 'ASC']);
//           break;
//         }
//         case 'DESC': {
//           getOptions.push([sequelize.literal(column), 'DESC']);
//           break;
//         }
//         case 'RAND': {
//           getOptions.push(fn('RAND'));
//           break;
//         }
//         default: {
//           break;
//         }
//       }
//     });

//     options['order'] = getOptions;
//   }

//   //   input.where?.forEach(({ column, value }) => {
//   //     options.where[column] = value;
//   //   });

//   //   if (!input.filters.getSoftDeleteds) {
//   //     options.where['deleted_at'] = {
//   //       [Op.is]: null,
//   //     };
//   //   }

//   //   if (!input.filters.getDeactivated) {
//   //     options.where['is_active'] = {
//   //       [Op.is]: true,
//   //     };
//   //   }

//   //   input.filters.contains?.forEach(({ column, value }) => {
//   //     options.where[column as string] = {
//   //       [Op.substring]: value,
//   //     };
//   //   });

//   return options;
// };

// export const unnestWheres = (
//   where?: IWhere<string | number | symbol, unknown>,
// ) => {
//   if (!where) {
//     return {};
//   }

//   return {
//     [where.column]: where.value,
//     ...unnestWheres(where.where),
//   };
// };

export class SequelizeUseCaseOptionsAdapter<E, F, R> {
  options: {
    where?: Record<string, unknown>;
    offset?: number;
    limit?: number;
    include?: Record<string, unknown>[];
    orderBy?: Order;
  } = {};

  constructor(private readonly useCaseOptions: IUseCaseOptions<E, F, R>) {
    this.exec(this.useCaseOptions);
  }

  private exec(useCaseOptions: IUseCaseOptions<E, F, R>) {
    OrmAdapterUtils.validate(useCaseOptions);

    this.handleFilters(useCaseOptions.filters);
    this.handleRelations(useCaseOptions.relations);
    this.handleOrders(useCaseOptions.orders);
    this.handlePagination(useCaseOptions.pagination);
  }

  private handleFilters(filters: IUseCaseOptions<E, F, R>['filters']) {
    if (!filters?.where) return;

    const whereOption = this.handleWhereOperations(filters.where);
    console.log(whereOption);
    this.options.where = whereOption;
  }

  private handleWhereOperations({
    AND,
    OR,
    NOT,
    CONTAINS,
  }: IUseCaseOptions<E, F, R>['filters']['where']) {
    const whereOptions: Record<string, unknown> = {};

    if (AND?.length > 0) {
      AND.forEach(({ column, value }) => {
        whereOptions[column as string] = value;
      });
    }

    if (OR?.length > 0) {
      OR.forEach(({ column, value }) => {
        whereOptions[column as string] = {
          [Op.or]: value,
        };
      });
    }

    if (NOT?.length > 0) {
      NOT.forEach(({ column, value }) => {
        whereOptions[column as string] = {
          [Op.not]: value,
        };
      });
    }

    if (CONTAINS?.length > 0) {
      CONTAINS.forEach(({ column, value }) => {
        whereOptions[column as string] = {
          [Op.substring]: value,
        };
      });
    }

    return whereOptions;
  }

  private handleRelations<R>(relations: IRelation<R>[]) {
    if (relations?.length > 0 === false) return;

    this.options.include = this.includeNestedRelationsWithWhere(relations);
  }

  private handleOrders(orders: IUseCaseOptions<E, F, R>['orders']) {
    if (orders?.length > 0 === false) {
      this.options.orderBy = [['updated_at', 'DESC']];
      return;
    }

    const getOptions = [];
    orders.forEach(({ order, column }) => {
      switch (order) {
        case 'ASC': {
          getOptions.push([sequelize.literal(column as string), 'ASC']);
          break;
        }
        case 'DESC': {
          getOptions.push([sequelize.literal(column as string), 'DESC']);
          break;
        }
        case 'RAND': {
          getOptions.push(fn('RAND'));
          break;
        }
        default: {
          break;
        }
      }
    });

    this.options.orderBy = getOptions;
  }
  private handlePagination(pagination: IUseCaseOptions<E, F, R>['pagination']) {
    if (pagination?.page && pagination?.take) {
      this.options.offset = Math.abs(pagination.page * pagination.take);
    }
    if (pagination?.take) {
      this.options.limit = pagination.take;
    }
  }
  private includeNestedRelationsWithWhere = <R>(relations?: IRelation<R>[]) =>
    relations &&
    relations.map((relation) => {
      const options: { [k: string]: unknown } = {
        association: relation.table,
      };

      if (relation.where?.length) {
        options.where = relation.where.map(({ column, value }) => ({
          [column]: value,
        }));
      }

      if (relation.relations) {
        options.include = this.includeNestedRelations(relation.relations);
      }

      return options;
    });
  private includeNestedRelations = <R>(relations?: IRelation<R>[]) =>
    relations &&
    relations.map((relation) => ({
      association: relation.table,
      include: relation.relations
        ? this.includeNestedRelations(relation.relations)
        : [],
    }));
}
