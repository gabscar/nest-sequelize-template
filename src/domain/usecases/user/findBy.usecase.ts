import { IError } from '@src/shared/IError';
import { UserEntity } from '../../entities/user.entity';
import { IBaseUseCase } from '../base.usecase';
import { Either } from '@src/shared/either';
import { IFindByUserInput } from '@domain/interfaces/user/findBy.interface';

export type IOutputFindByUserDto = Either<IError, UserEntity>;

export type IFindByUserUseCase = IBaseUseCase<
  IFindByUserInput,
  IOutputFindByUserDto
>;
