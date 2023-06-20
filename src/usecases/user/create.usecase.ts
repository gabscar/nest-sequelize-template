import {
  INJECTION_SERVICE_AUTH,
  INJECTION_SERVICE_CREATE_USER,
} from '@domain/constants/injections/user.constant';
import { ICreateUserInput } from '@domain/interfaces/user/create.interface';
import { Inject } from '@nestjs/common';
import { UserEntity } from '@domain/entities/user.entity';
import { IAuthService } from '@domain/services/auth/auth.service';
import { AuthenticationErrors } from '@domain/errors/auth/authError';
import { IOutputCreateUserService } from '@domain/services/entities/user/create.service';
import { IBaseUseCase } from '@domain/usecases/base.usecase';

export class CreateUserUseCase {
  constructor(
    @Inject(INJECTION_SERVICE_CREATE_USER)
    private readonly userService: IBaseUseCase<
      [ICreateUserInput],
      IOutputCreateUserService
    >,
    @Inject(INJECTION_SERVICE_AUTH)
    private readonly authService: IAuthService,
  ) {}

  async execute(params: ICreateUserInput): Promise<UserEntity> {
    const hashedPassword = await this.hashPassword(params.password);
    const user = await this.userService.execute({
      ...params,
      password: hashedPassword,
    });

    if (user.isLeft()) {
      throw user.value;
    }

    return user.value;
  }

  private async hashPassword(password: string): Promise<string> {
    const hashedPassword = await this.authService.hash(password);
    if (!hashedPassword) {
      throw AuthenticationErrors.tokenCreationError();
    }
    return hashedPassword;
  }
}
