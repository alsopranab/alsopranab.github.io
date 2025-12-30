// Obfuscated data to prevent easy inspection
// Phone: 9366036448
// Password: Be1ieveInYourself

const obfuscatedPhone = [57, 51, 54, 54, 48, 51, 54, 52, 52, 56];

/**
 * Validates the password and decrypts the phone number.
 * Uses a sum-based check and character mapping to avoid plain-text strings in the final bundle.
 */
export function decryptPhone(password: string): string | null {
  if (!password) return null;
  
    // Character code sum for "Be1ieveInYourself"
    const expectedSum = 1681; 

  const currentSum = Array.from(password).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Secondary check using character-by-character comparison (obfuscated)
  const target = [66, 101, 49, 105, 101, 118, 101, 73, 110, 89, 111, 117, 114, 115, 101, 108, 102];
  const isValid = password.length === target.length && 
                  password.split('').every((char, i) => char.charCodeAt(0) === target[i]);

  if (currentSum === expectedSum && isValid) {
    return obfuscatedPhone.map(code => String.fromCharCode(code)).join("");
  }
  return null;
}

export function validatePassword(password: string): boolean {
  if (!password) return false;
  const target = [66, 101, 49, 105, 101, 118, 101, 73, 110, 89, 111, 117, 114, 115, 101, 108, 102];
  return password.length === target.length && 
         password.split('').every((char, i) => char.charCodeAt(0) === target[i]);
}
