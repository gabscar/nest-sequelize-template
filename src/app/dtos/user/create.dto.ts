import { DEFAULT_MAX_LENGTH } from '@domain/constants/common.constant';
import { REGEX_USER_PASSWORD } from '@domain/constants/regex.constant';
import { ICreateUserInput } from '@domain/interfaces/user/create.interface';
import {
  PASSWORD_CONFIRMATION_VALIDATION_OPTIONS,
  PasswordConfirmationValidator,
} from '@src/utils/validators.utils';

import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  Validate,
} from 'class-validator';

export class CreateUserDto implements ICreateUserInput {
  @IsNotEmpty()
  @IsString()
  @MaxLength(DEFAULT_MAX_LENGTH)
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(DEFAULT_MAX_LENGTH)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(DEFAULT_MAX_LENGTH)
  @Matches(REGEX_USER_PASSWORD)
  password: string;

  @IsNotEmpty()
  @Validate(
    PasswordConfirmationValidator,
    PASSWORD_CONFIRMATION_VALIDATION_OPTIONS,
  )
  confirmationPassword: string;
}
