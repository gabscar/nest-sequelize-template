import { IMailSendEmail } from '../interfaces/mail.interface';

export interface IMailService {
  sendEmail: <T>(params: IMailSendEmail<T>) => Promise<void>;
}
