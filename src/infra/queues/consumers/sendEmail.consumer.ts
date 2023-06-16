import { Queues } from '@domain/constants/enum/queues.enum';
import { Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { Job } from 'bull';
import { IMailSendEmail } from 'src/domain/interfaces/mail.interface';
import { IQueueConsumer } from 'src/domain/interfaces/queue.interface';
import { IMailService } from 'src/domain/services/mail.service';
import { MailService } from 'src/infra/services/mail.service';

@Processor(Queues.SendEmail)
export class SendEmailConsumerBull implements IQueueConsumer {
  constructor(
    @Inject(MailService)
    protected readonly mailService: IMailService,
  ) {}

  @Process()
  async transcode<T>(job: Job<IMailSendEmail<T>>): Promise<void> {
    const sendEmailProps = job.data;

    await this.mailService.sendEmail(sendEmailProps);
  }
}
