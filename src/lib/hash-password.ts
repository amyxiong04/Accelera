import crypto from 'crypto';

// Function to hash passwords
export const hashPassword = (password: string): string => {
  // Create a SHA-256 hash with a salt
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
  return `${salt}:${hash}`;
};
