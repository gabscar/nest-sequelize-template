import { IsEmail, IsStrongPassword, Matches, MaxLength } from 'class-validator';
import { REGEX_USER_PASSWORD } from 'src/domain/constants/regex.constant';
import { IAuthLoginParams } from 'src/domain/interfaces/auth/login.interface';

export class AuthLoginDto implements IAuthLoginParams {
  @IsEmail({}, { message: 'Email address is invalid' })
  email: string;

  @MaxLength(255, {
    message: 'Password length exceeds the maximum of 255 characters',
  })
  @Matches(REGEX_USER_PASSWORD, {
    message:
      'Password must contain at least 1 letter, 1 number, 1 special character, and be 8 characters long',
  })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character and be at least 8 characters long',
    },
  )
  password: string;
}
