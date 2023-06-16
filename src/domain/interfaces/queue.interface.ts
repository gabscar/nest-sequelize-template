import { IMailSendEmail } from './mail.interface';

export interface IQueueConsumer<T = any> {
  transcode: (data: T) => Promise<void>;
}

export interface IQueueProducer {
  publish: <R extends IMailSendEmail>(data: R) => Promise<void>;
}
