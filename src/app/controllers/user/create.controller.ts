import { CreateUserDto } from '@app/dtos/user/create.dto';
import { INJECTION_USECASE_CREATE_USER } from '@domain/constants/injections/user.constant';
import { ICreateUserUseCase } from '@domain/usecases/user/create.usecase';
import { Body, Controller, Inject, Post } from '@nestjs/common';

import { UserPresenter } from '@app/presenters/user.presenter';
import { IsPublic } from '@infra/decorators/isPublic.decorator';

@Controller('user')
export class CreateUserController {
  constructor(
    @Inject(INJECTION_USECASE_CREATE_USER)
    private readonly createUserOperator: ICreateUserUseCase,
  ) {}

  @IsPublic()
  @Post()
  async create(@Body() params: CreateUserDto) {
    const user = await this.createUserOperator.execute(params);

    return new UserPresenter().present(user);
  }
}
