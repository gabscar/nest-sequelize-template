export abstract class IAddressRelations {}

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
