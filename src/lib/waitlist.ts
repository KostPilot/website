const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isValidWaitlistEmail(email: string) {
  const normalizedEmail = normalizeEmail(email);

  return normalizedEmail.length <= 254 && EMAIL_REGEX.test(normalizedEmail);
}
