import { AddressModel } from '../address.model';
import { UserModel } from '../user.model';

UserModel.hasOne(AddressModel, {
  foreignKey: 'user_id',
  sourceKey: 'id',
  as: 'address',
});
