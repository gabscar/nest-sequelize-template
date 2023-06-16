import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { SendEmailConsumerBull } from 'src/infra/queues/consumers/sendEmail.consumer';
import { SendEmailProducerBull } from 'src/infra/queues/producers/sendEmail.producer';
import { MailService } from 'src/infra/services/mail.service';
import { MailConfigModule } from './mailConfig.module';
import { Queues } from '@domain/constants/enum/queues.enum';

const CONSUMERS = [SendEmailConsumerBull];
const PRODUCERS = [SendEmailProducerBull];
const QUEUES = [...CONSUMERS, ...PRODUCERS];

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: () => ({
        redis: {
          host: process.env.RD_HOST,
          password: process.env.RD_PASSWORD,
          port: parseInt(process.env.RD_PORT),
        },
      }),
    }),
    BullModule.registerQueue({ name: Queues.SendEmail }),
    MailConfigModule,
  ],
  providers: [...QUEUES, MailService],
  exports: [...QUEUES],
})
export class BullConfigModule {}
