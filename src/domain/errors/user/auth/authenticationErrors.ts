import { IError } from '@src/shared/IError';

export class AuthenticationErrors extends IError {
  static invalidCredentials(): IError {
    return new AuthenticationErrors({
      statusCode: 401,
      body: {
        code: 'AE-001',
        message: 'Password wrong',
        shortMessage: 'wrongCredentials',
      },
    });
  }

  static tokenCreationError(): IError {
    return new AuthenticationErrors({
      statusCode: 500,
      body: {
        code: 'AE-002',
        message: 'Token creation error',
        shortMessage: 'tokenCreationError',
      },
    });
  }

  static invalidTokenError(): IError {
    return new AuthenticationErrors({
      statusCode: 401,
      body: {
        code: 'AE-003',
        message: 'Invalid token',
        shortMessage: 'invalidTokenError',
      },
    });
  }

  static tokenExpiredError(): IError {
    return new AuthenticationErrors({
      statusCode: 401,
      body: {
        code: 'AE-004',
        message: 'Token expired',
        shortMessage: 'tokenExpiredError',
      },
    });
  }

  static invalidCodeError(): IError {
    return new AuthenticationErrors({
      statusCode: 401,
      body: {
        code: 'AE-005',
        message: 'Invalid Code',
        shortMessage: 'invalidCode',
      },
    });
  }

  static tokenRenewalTimeExceeded(): IError {
    return new AuthenticationErrors({
      statusCode: 401,
      body: {
        code: 'AE-006',
        message: 'Time to renewal token exceeded',
        shortMessage: 'tokenRenewalTimeExceeded',
      },
    });
  }
}
