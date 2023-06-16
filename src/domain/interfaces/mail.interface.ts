export interface IMailAttachment {
  filename: string;
  content: string;
  encoding: string;
  contentType: string;
}
export interface IMailSendEmail<T = any> {
  to: string;
  subject: string;
  templateName: string;
  data: T;
  attachments?: IMailAttachment[];
}

export type IMailSendForgotPasswordEmail = IMailSendEmail<{
  userName: string;
  link: string;
}>;

export type IMailSendChangePasswordEmail = IMailSendEmail<{
  userName: string;
  date: string;
}>;

export type IMailSendChangeEmail = IMailSendEmail<{
  userName: string;
  link: string;
}>;

export type IMailSendNotificationEmail = IMailSendEmail<{ content?: string }>;
