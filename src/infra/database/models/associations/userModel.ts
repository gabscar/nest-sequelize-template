import { AddressModel } from '../address.model';
import { UserModel } from '../user.model';

UserModel.hasOne(AddressModel, {
  foreignKey: 'userId',
  sourceKey: 'id',
  as: 'address',
});
