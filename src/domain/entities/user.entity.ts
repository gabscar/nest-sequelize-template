import { AddressEntity } from './address.entity';

export abstract class IUserRelations {
  address: AddressEntity;
}
export class UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(userProps: UserEntity) {
    Object.assign(this, userProps);
  }
}
export interface IUserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
