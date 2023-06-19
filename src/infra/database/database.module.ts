import { Module } from '@nestjs/common';

import { databaseProviders } from './database.providers';
import { UserModel } from './models/user.model';

@Module({
  providers: [...databaseProviders, UserModel],
  exports: [...databaseProviders, UserModel],
})
export class DatabaseModule {}
