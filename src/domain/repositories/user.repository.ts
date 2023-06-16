import { IPaginationOutput } from '@domain/interfaces/common/pagination.interface';
import { IFindAllUserInput } from '@domain/interfaces/user/findAll.interface';
import { IFindByUserInput } from '@domain/interfaces/user/findBy.interface';
import { IUpdateUserInput } from '@domain/interfaces/user/update.interface';
import { UserEntity } from '../entities/user.entity';
import { ICreateUserInput } from '../interfaces/user/create.interface';

export interface IUserRepositoryDatabase {
  create(params: ICreateUserInput): Promise<UserEntity>;
  delete(id: string): Promise<void>;
  findAll(params: IFindAllUserInput): Promise<IPaginationOutput<UserEntity>>;
  findBy(params: IFindByUserInput): Promise<UserEntity>;
  update(id: string, params: IUpdateUserInput): Promise<UserEntity>;
}
