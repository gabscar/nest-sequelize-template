import { UserEntity } from '@domain/entities/user.entity';
import { Model } from 'sequelize';
import { DataType } from 'sequelize-typescript';
import { sequelize } from '@infra/database/database.providers';
import { AddressModel } from './address.model';

export class UserModel extends Model<UserEntity> {}

UserModel.init(
  {
    email: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    },
    id: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataType.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataType.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: DataType.DATE,
      allowNull: true,
    },
  },
  { tableName: 'users', timestamps: false, underscored: true, sequelize },
);
UserModel.hasOne(AddressModel, {
  foreignKey: 'user_id',
  sourceKey: 'id',
  as: 'address',
});
