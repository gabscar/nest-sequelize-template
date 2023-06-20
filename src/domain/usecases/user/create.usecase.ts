import { UserEntity } from '@domain/entities/user.entity';
import { ICreateUserInput } from '@domain/interfaces/user/create.interface';
import { IBaseUseCase } from '../base.usecase';

export type ICreateUserUseCase = IBaseUseCase<[ICreateUserInput], UserEntity>;
