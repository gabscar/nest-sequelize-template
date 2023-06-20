import { IError } from '@src/shared/IError';

export class UsersErrors extends IError {
  static entityCreationError(): IError {
    return new UsersErrors({
      statusCode: 400,
      body: {
        code: 'UE-001',
        message:
          'Error during creation of the user entity, please try again later',
        shortMessage: 'entityCreationFailed',
        // moreInformations: moreInformations,
      },
    });
  }
  static userNotFound(): IError {
    return new UsersErrors({
      statusCode: 404,
      body: {
        code: 'UE-002',
        message: 'User not found',
        shortMessage: 'userNotFound',
      },
    });
  }
}
