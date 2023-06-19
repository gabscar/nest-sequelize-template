import { IPaginationOutput } from '@domain/interfaces/common/pagination.interface';
import { IFindAllUserInput } from '@domain/interfaces/user/findAll.interface';
import { IFindByUserInput } from '@domain/interfaces/user/findBy.interface';
import { IUpdateUserInput } from '@domain/interfaces/user/update.interface';
import { UserEntity } from '../entities/user.entity';
import { ICreateUserInput } from '../interfaces/user/create.interface';
import { IWhere } from '@domain/interfaces/common/where.interface';

export type updateWhereUser = IWhere<keyof UserEntity, string | number>;

export interface IUserRepositoryDatabase {
  create(params: ICreateUserInput): Promise<UserEntity>;
  delete(id: string): Promise<void>;
  findAll(params: IFindAllUserInput): Promise<IPaginationOutput<UserEntity>>;
  findBy(params: IFindByUserInput): Promise<UserEntity>;
  update(where: updateWhereUser, params: IUpdateUserInput): Promise<UserEntity>;
}
