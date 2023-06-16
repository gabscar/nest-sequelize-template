import { UserEntity } from '@domain/entities/user.entity';
import { IPaginationOutput } from '@domain/interfaces/common/pagination.interface';
import { ICreateUserInput } from '@domain/interfaces/user/create.interface';
import { IFindAllUserInput } from '@domain/interfaces/user/findAll.interface';
import { IFindByUserInput } from '@domain/interfaces/user/findBy.interface';
import { IUserRepositoryDatabase } from '@domain/repositories/user.repository';
import { PrismaService } from '@infra/database/prisma.service';
import { PaginationUtils } from '@src/shared/utils/pagination.utils';
import { Prisma } from '@prisma/client';
import { PrismaUtils } from '@infra/utils/prismaUtils';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepositoryDatabase implements IUserRepositoryDatabase {
  constructor(private readonly databaseService: PrismaService) {}

  async create(params: ICreateUserInput): Promise<UserEntity> {
    const user = await this.databaseService.user.create({ data: params });

    return new UserEntity(user);
  }
  async delete(id: string): Promise<void> {
    await this.databaseService.user.delete({
      where: { id },
    });
  }

  async findAll(
    params: IFindAllUserInput,
  ): Promise<IPaginationOutput<UserEntity>> {
    const { skip, take } = PaginationUtils.parse(params);

    const countArgs: Prisma.UserCountArgs = {};
    const findManyArgs = PrismaUtils.convertCountArgsToFindManyArgs<
      Prisma.UserCountArgs,
      Prisma.UserFindManyArgs
    >(countArgs, {
      skip,
      take,
    });
    const [users, max] = await this.databaseService.$transaction([
      this.databaseService.user.findMany(findManyArgs),
      this.databaseService.user.count(countArgs),
    ]);
    return {
      data: users.map((user: any) => new UserEntity(user)),
      meta: {
        taken: users.length,
        page: params.page || 1,
        max,
      },
    };
  }

  async findBy(params: IFindByUserInput): Promise<UserEntity> {
    const user = await this.databaseService.user.findFirst({
      where: { [params.where.column]: params.where.value },
    });
    return new UserEntity(user);
  }

  async update(
    id: string,
    params: Partial<ICreateUserInput>,
  ): Promise<UserEntity> {
    const user = await this.databaseService.user.update({
      where: { id },
      data: params,
    });
    return new UserEntity(user);
  }
}
