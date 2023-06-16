// at least 8 characters with at least one uppercase letter,
// one lowercase letter, one number, and one special character.
export const REGEX_USER_PASSWORD =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.:;<>\-_])[A-Za-z\d@$!%*#?&.:;<>\-_]{8,}$/;
