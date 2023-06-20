import {
  INJECTION_SERVICE_FINDBY_USER,
  INJECTION_REPOSITORY_USER,
  INJECTION_USECASE_AUTH,
  INJECTION_SERVICE_AUTH,
} from '@domain/constants/injections/user.constant';
import { Module } from '@nestjs/common';
import { UserRepositoryDatabase } from '@infra/repositories/user.repository';
import { DatabaseModule } from '@infra/database/database.module';

import { FindUserService } from '@infra/services/user/findBy.service';
import { AuthLoginUseCase } from '@usecases/auth/login.usecase';
import { AuthService } from '@infra/services/auth/auth.service';
import { AuthLoginController } from './login.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { BullConfigModule } from '@app/services/queue/bullConfig.module';
import { JwtStrategy } from '@infra/strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
require('dotenv').config();

const servicesArr = [
  { useClass: FindUserService, provide: INJECTION_SERVICE_FINDBY_USER },
  { useClass: AuthService, provide: INJECTION_SERVICE_AUTH },
];

const useCasesArr = [
  { useClass: AuthLoginUseCase, provide: INJECTION_USECASE_AUTH },
];

@Module({
  exports: [{ useClass: AuthService, provide: INJECTION_SERVICE_AUTH }],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: `${process.env.JWT_EXPIRATION_TIME_HOURS}h` },
    }),
    DatabaseModule,
    PassportModule,
    BullConfigModule,
  ],
  controllers: [AuthLoginController],
  providers: [
    ...useCasesArr,
    ...servicesArr,
    JwtStrategy,
    { useClass: UserRepositoryDatabase, provide: INJECTION_REPOSITORY_USER },
  ],
})
export class AuthModule {}
