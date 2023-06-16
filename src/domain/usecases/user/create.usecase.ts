import { IError } from '@src/shared/IError';
import { UserEntity } from '@domain/entities/user.entity';
import { ICreateUserInput } from '@domain/interfaces/user/create.interface';
import { IBaseUseCase } from '../base.usecase';
import { Either } from '@src/shared/either';

export type IOutputCreateUserDto = Either<IError, UserEntity>;

export type ICreateUserUseCase = IBaseUseCase<ICreateUserInput, UserEntity>;
