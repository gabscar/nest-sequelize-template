import {
  INJECTION_SERVICE_CREATE_USER,
  INJECTION_REPOSITORY_USER,
  INJECTION_USECASE_CREATE_USER,
  INJECTION_USECASE_FINDBY_USER,
} from '@domain/constants/injections/user.constant';
import { Module } from '@nestjs/common';
import { CreateUserController } from './create.controller';
import { UserRepositoryDatabase } from '@infra/repositories/user.repository';
import { DatabaseModule } from '@infra/database/database.module';
import { CreateUserUseCase } from '@usecases/user/create.usecase';
import { CreateUserEntityService } from '@infra/services/entities/user/create.service';
import { AuthModule } from '../auth/auth.module';
import { FindUserEntityService } from '@infra/services/entities/user/findBy.service';
import { FindUserController } from './find.controller';
import { FindUserUseCase } from '@usecases/user/find.useCase';
import { INJECTION_SERVICE_FINDBY_USER } from '@domain/constants/injections/user.constant';

const servicesArr = [
  { useClass: CreateUserEntityService, provide: INJECTION_SERVICE_CREATE_USER },
  { useClass: FindUserEntityService, provide: INJECTION_SERVICE_FINDBY_USER },
];

const useCasesArr = [
  { useClass: CreateUserUseCase, provide: INJECTION_USECASE_CREATE_USER },
  { useClass: FindUserUseCase, provide: INJECTION_USECASE_FINDBY_USER },
];

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [CreateUserController, FindUserController],
  providers: [
    ...useCasesArr,
    ...servicesArr,
    { useClass: UserRepositoryDatabase, provide: INJECTION_REPOSITORY_USER },
  ],
})
export class UserModule {}
