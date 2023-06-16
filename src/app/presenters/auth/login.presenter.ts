import { IAuthLoginResponse } from '@domain/interfaces/auth/auth.interface';
import { UserEntity } from 'src/domain/entities/user.entity';

export class AuthLoginPresenter {
  token: string;
  user: Omit<UserEntity, 'password'>;

  constructor({ user, token }: IAuthLoginResponse) {
    const userWithoutPassword = { ...user, password: undefined };
    this.user = userWithoutPassword;
    this.token = token;
  }
}
