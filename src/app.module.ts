import { Module } from '@nestjs/common';
import { ControllerModule } from '@app/controllers/controller.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@infra/guards/jwt.guard';
import { MailConfigModule } from '@app/services/queue/mailConfig.module';
import { BullConfigModule } from '@app/services/queue/bullConfig.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ControllerModule,
    MailConfigModule,
    BullConfigModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
