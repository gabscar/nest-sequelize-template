import {
  INJECTION_SERVICE_AUTH,
  INJECTION_SERVICE_FINDBY_USER,
} from '@domain/constants/injections/user.constant';
import { UserEntity } from '@domain/entities/user.entity';
import { AuthenticationErrors } from '@domain/errors/user/auth/authenticationErrors';
import { UsersErrors } from '@domain/errors/user/userError';
import { IAuthLoginResponse } from '@domain/interfaces/auth/auth.interface';
import { IFindByUserInput } from '@domain/interfaces/user/findBy.interface';
import { IAuthService } from '@domain/services/auth/auth.service';
import { IAbstractService } from '@domain/services/baseAbstract.service';
import { IOutputFindByUserDto } from '@domain/usecases/user/findBy.usecase';
import { Inject } from '@nestjs/common';

import {
  AuthLoginParams,
  IAuthLoginUseCase,
} from 'src/domain/usecases/auth/login.usecase';

export class AuthLoginUseCase implements IAuthLoginUseCase {
  constructor(
    @Inject(INJECTION_SERVICE_FINDBY_USER)
    private readonly findUserService: IAbstractService<
      IFindByUserInput,
      IOutputFindByUserDto
    >,
    @Inject(INJECTION_SERVICE_AUTH)
    private readonly authService: IAuthService,
  ) {}

  async execute({
    params,
  }: AuthLoginParams): Promise<IAuthLoginResponse | void> {
    const user = await this.findUserService.execute({
      filters: {
        where: {
          AND: [{ column: 'email', value: params.email }],
        },
      },
    });

    if (user.isLeft()) {
      throw UsersErrors.userNotFound();
    }

    const passwordMatch = await this.authService.compare(
      params.password,
      user.value.password,
    );

    if (!passwordMatch) {
      throw AuthenticationErrors.invalidCredentials();
    }

    return this.generateToken(user.value);
  }

  private async generateToken(user: UserEntity): Promise<IAuthLoginResponse> {
    const token = this.authService.sign({
      id: user.id,
      name: user.name,
      email: user.email,
      refreshCount: 0,
    });

    return { token, user };
  }
}
