import { IUserRelations, UserEntity } from '@domain/entities/user.entity';
import { IFindBy } from '../common/findBy.interface';

type UserEntityFindByParams = Pick<UserEntity, 'id' | 'name' | 'email'>;

export type IFindByUserInput = IFindBy<
  keyof UserEntityFindByParams,
  string,
  IUserRelations
>;
