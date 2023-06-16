import { Queues } from '@domain/constants/enum/queues.enum';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { IMailSendEmail } from 'src/domain/interfaces/mail.interface';
import { IQueueProducer } from 'src/domain/interfaces/queue.interface';

@Injectable()
export class SendEmailProducerBull implements IQueueProducer {
  constructor(@InjectQueue(Queues.SendEmail) private sendEmailQueue: Queue) {}

  async publish<T extends IMailSendEmail>(data: T): Promise<void> {
    const siteUrl = process.env.SITE_URL;
    data.data.siteUrl = siteUrl;
    await this.sendEmailQueue.add(data);
  }
}
