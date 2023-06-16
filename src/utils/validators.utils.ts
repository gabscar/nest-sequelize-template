import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isEqual', async: false })
export class PasswordConfirmationValidator
  implements ValidatorConstraintInterface
{
  validate(
    confirmationPassword: string,
    validationArguments: ValidationArguments,
  ) {
    const password = validationArguments.object['password'];
    return password === confirmationPassword;
  }
}

export const PASSWORD_CONFIRMATION_VALIDATION_OPTIONS = {
  message: "Passwords don't match",
};
