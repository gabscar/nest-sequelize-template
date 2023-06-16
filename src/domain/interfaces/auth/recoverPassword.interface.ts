export interface IAuthRecoverPasswordParams {
  validationCodeId: string;
  code: string;
  newPassword: string;
  confirmationPassword: string;
}
