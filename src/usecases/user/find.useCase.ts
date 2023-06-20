import { INJECTION_SERVICE_FINDBY_USER } from '@domain/constants/injections/user.constant';
import { UsersErrors } from '@domain/errors/user/userError';

import { Inject } from '@nestjs/common';
import { UserEntity } from '@domain/entities/user.entity';
import { IAbstractService } from '@domain/services/baseAbstract.service';
import { IFindByUserInput } from '@domain/interfaces/user/findBy.interface';
import { IOutputFindByUserDto } from '@domain/usecases/user/findBy.usecase';

export class FindUserUseCase {
  constructor(
    @Inject(INJECTION_SERVICE_FINDBY_USER)
    private readonly userService: IAbstractService<
      IFindByUserInput,
      IOutputFindByUserDto
    >,
  ) {}

  async execute(params: string): Promise<UserEntity> {
    console.log(params, 'entrou');
    const user = await this.userService.execute({
      filters: {
        where: {
          AND: [{ column: 'id', value: params }],
        },
      },
      relations: [{ table: 'address', values: [] }],
    });

    if (user.isLeft()) {
      throw UsersErrors.entityCreationError();
    }

    return user.value;
  }
}
