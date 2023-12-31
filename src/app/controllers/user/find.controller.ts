import { INJECTION_USECASE_FINDBY_USER } from '@domain/constants/injections/user.constant';
import { Controller, Get, Inject, Param } from '@nestjs/common';

import { UserPresenter } from '@app/presenters/user.presenter';
import { IsPublic } from '@infra/decorators/isPublic.decorator';
import { IFindByUserUseCase } from '@domain/usecases/user/findBy.usecase';

@Controller('user')
export class FindUserController {
  constructor(
    @Inject(INJECTION_USECASE_FINDBY_USER)
    private readonly findUserOperator: IFindByUserUseCase,
  ) {}

  @IsPublic()
  @Get('find/:id')
  async create(@Param('id') userId: string) {
    const user = await this.findUserOperator.execute(userId);

    return new UserPresenter().present(user);
  }
}
