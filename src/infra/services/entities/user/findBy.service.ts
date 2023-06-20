import { UsersErrors } from '@domain/errors/user/userError';
import { IUserRepositoryDatabase } from '@domain/repositories/user.repository';
import { Inject } from '@nestjs/common';
import { right, left } from '@src/shared/either';
import { IAbstractService } from '../../../../domain/services/baseAbstract.service';
import { INJECTION_REPOSITORY_USER } from '@domain/constants/injections/user.constant';
import {
  IFindByUserEntityService,
  IInputFindByUserService,
  IOutputFindByUserService,
} from '@domain/services/entities/user/findby.service';

export class FindUserEntityService implements IFindByUserEntityService {
  constructor(
    @Inject(INJECTION_REPOSITORY_USER)
    private readonly userRepository: IUserRepositoryDatabase,
  ) {}

  async execute(
    params: IInputFindByUserService,
  ): Promise<IOutputFindByUserService> {
    try {
      const user = await this.userRepository.findBy(params);
      return right(user);
    } catch (err) {
      console.log(err);
      return left(UsersErrors.userNotFound());
    }
  }
}
