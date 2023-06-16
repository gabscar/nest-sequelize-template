import { UserEntity } from '@domain/entities/user.entity';
import { IPaginationOutput } from '@domain/interfaces/common/pagination.interface';
import { IPresenter } from '@domain/interfaces/common/presenter.interface';

export class UserPresenter implements IPresenter<UserEntity> {
  present(user: UserEntity): UserEntity {
    return {
      ...user,
      password: null,
    };
  }

  list(userList: IPaginationOutput<UserEntity>): IPaginationOutput<UserEntity> {
    const { data, meta } = userList;

    return {
      data: data.map((user) => this.present(user)),
      meta,
    };
  }
}
