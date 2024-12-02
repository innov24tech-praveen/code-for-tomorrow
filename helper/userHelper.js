import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
  try {
    if (!password) {
      throw new Error('Password is required');
    }
		
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error(`Error hashing password: ${error.message}`);
  }
};