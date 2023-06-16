import { UsersErrors } from '@domain/errors/user/userError';
import { IFindByUserInput } from '@domain/interfaces/user/findBy.interface';
import { IUserRepositoryDatabase } from '@domain/repositories/user.repository';
import { IOutputCreateUserDto } from '@domain/usecases/user/create.usecase';
import { IOutputFindByUserDto } from '@domain/usecases/user/findBy.usecase';
import { Inject } from '@nestjs/common';
import { right, left } from '@src/shared/either';
import { IAbstractService } from '../../../domain/services/baseAbstract.service';
import { INJECTION_REPOSITORY_USER } from '@domain/constants/injections/user.constant';

export class FindUserService
  implements IAbstractService<IFindByUserInput, IOutputFindByUserDto>
{
  constructor(
    @Inject(INJECTION_REPOSITORY_USER)
    private readonly userRepository: IUserRepositoryDatabase,
  ) {}

  async execute(params: IFindByUserInput): Promise<IOutputFindByUserDto> {
    try {
      const user = await this.userRepository.findBy(params);
      return right(user);
    } catch (err) {
      console.log(err);
      return left(UsersErrors.entityCreationError());
    }
  }
}
