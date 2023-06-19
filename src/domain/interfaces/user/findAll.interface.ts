import { UserEntity } from '@domain/entities/user.entity';
import { IPaginationInput } from '../common/pagination.interface';
import { IUseCaseOptions } from '../common/useCaseOptions.interface';

export type IFindAllUserInput = IUseCaseOptions<UserEntity, 'name', any>;
