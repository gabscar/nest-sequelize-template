export abstract class IUserRelations {
  address: AddressEntity;
  teste: ITeste;
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

export abstract class IAddressRelations {
  teste: ITeste;
}

export class AddressEntity extends IAddressRelations {
  id: string;
  city: string;
  complement: string;
  neighborhood: string;
  number: string;
  state: string;
  street: string;
  zip: string;

  userId: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(userProps: AddressEntity) {
    super();
    Object.assign(this, userProps);
  }
}

export interface ITeste {
  id: string;
  city: string;
  complement: string;
  neighborhood: string;
  number: string;
  state: string;
  street: string;
  zip: string;
}
export class Teste {
  id: string;
  city: string;
  complement: string;
  neighborhood: string;
  number: string;
  state: string;
  street: string;
  zip: string;

  userId: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(userProps: AddressEntity) {
    Object.assign(this, userProps);
  }
}
