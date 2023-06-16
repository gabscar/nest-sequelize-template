import { IUpdateUserInput } from '@domain/interfaces/user/update.interface';
import { UserEntity } from '../../entities/user.entity';
import { IBaseUseCase } from '../base.usecase';

export type IUpdateUserUseCase = IBaseUseCase<
  [string, IUpdateUserInput],
  UserEntity
>;
