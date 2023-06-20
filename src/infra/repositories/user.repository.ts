import { UserEntity } from '@domain/entities/user.entity';
import { IPaginationOutput } from '@domain/interfaces/common/pagination.interface';
import { ICreateUserInput } from '@domain/interfaces/user/create.interface';
import { IFindAllUserInput } from '@domain/interfaces/user/findAll.interface';
import {
  IUserRepositoryDatabase,
  updateWhereUser,
} from '@domain/repositories/user.repository';

import { Injectable } from '@nestjs/common';
import { UserModel } from '@infra/database/models/user.model';
import { SequelizeUseCaseOptionsAdapter } from '@infra/utils/repositoryUtils';
import { IInputFindByUserService } from '@domain/services/entities/user/findby.service';

@Injectable()
export class UserRepositoryDatabase implements IUserRepositoryDatabase {
  async create(params: ICreateUserInput): Promise<UserEntity> {
    const user = await UserModel.create(params);

    return new UserEntity(user.get({ plain: true }));
  }
  async delete(id: string): Promise<void> {
    await UserModel.destroy({
      where: { id },
    });
  }

  async findAll(
    params: IFindAllUserInput,
  ): Promise<IPaginationOutput<UserEntity>> {
    const { options } = new SequelizeUseCaseOptionsAdapter(params);
    const users = await UserModel.findAndCountAll(options);
    return {
      data: users.rows.map((model) => model.get({ plain: true })),
      meta: {
        taken: params.pagination.take || users.count,
        page: params.pagination.page || 1,
        max: users.count,
      },
    };
  }

  async findBy(params: IInputFindByUserService): Promise<UserEntity> {
    const { options } = new SequelizeUseCaseOptionsAdapter(params);
    const user = await UserModel.findOne(options);
    return new UserEntity(user.get({ plain: true }));
  }

  async update(
    updateWhere: updateWhereUser,
    params: Partial<ICreateUserInput>,
  ): Promise<UserEntity> {
    const user = UserModel.update(params, {
      where: {
        [updateWhere.column]: updateWhere.value,
      },
    });
    if (user[0] === 0) {
      throw new Error('None entity in the database was updated');
    }
    return new UserEntity(params as UserEntity);
  }
}
