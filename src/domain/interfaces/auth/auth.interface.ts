import { UserEntity } from '@domain/entities/user.entity';

export interface IAuthLoginResponse {
  token: string;
  user: UserEntity;
}

export interface IJwtAuthPayload {
  id: string;
  refreshCount: number;
  email: string;
  name: string;
  exp?: number;
}

export interface IJwtPrivateFilePayload {
  id: string;
  iat?: number;
  exp?: number;
}
