import { HttpException } from '@nestjs/common';

interface IErrorBody {
  code: string;
  message: string;
  shortMessage: string;
  [index: string]: unknown;
}

export class IError extends HttpException {
  constructor({ statusCode, body }: { statusCode: number; body: IErrorBody }) {
    super(body, statusCode);
  }
}
