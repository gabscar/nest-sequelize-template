import {
  IRelation,
  IUseCaseOptions,
} from '@domain/interfaces/common/useCaseOptions.interface';
import { sequelize } from '@infra/database/database.providers';
import { Op, fn, Order } from 'sequelize';

import { OrmAdapterUtils } from './ormAdapter.utils';

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
      this.options.orderBy = [['updatedAt', 'DESC']];
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
