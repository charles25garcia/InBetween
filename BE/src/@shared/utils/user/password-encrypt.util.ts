import * as bcrypt from 'bcryptjs';

export async function PasswordEncryptUtil(password: string) {
  const saltOrRounds = 10;
  const encryptedPassword = await bcrypt.hash(password, saltOrRounds);

  return encryptedPassword;
}
