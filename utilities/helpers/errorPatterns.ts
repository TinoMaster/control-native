/**
 * Utility functions for detecting specific error patterns in API responses
 */

/**
 * Checks if an error message indicates that an email already exists
 * @param errorMessage The error message to check
 * @returns Boolean indicating if the error is related to an existing email
 */
export function isEmailExistsError(errorMessage: string): boolean {
  if (!errorMessage) return false;

  // Convert to lowercase for case-insensitive matching
  const lowerCaseMessage = errorMessage.toLowerCase();
  
  // Check for English keywords: email, already, exist in any order
  const hasEmailKeyword = /\bemail\b/i.test(lowerCaseMessage);
  const hasAlreadyKeyword = /\balready\b/i.test(lowerCaseMessage);
  const hasExistKeyword = /\bexist(s|ing)?\b/i.test(lowerCaseMessage);
  
  // Check for Spanish keywords: correo, ya, existe in any order
  const hasCorreoKeyword = /\bcorreo\b/i.test(lowerCaseMessage);
  const hasYaKeyword = /\bya\b/i.test(lowerCaseMessage);
  const hasExisteKeyword = /\bexiste\b/i.test(lowerCaseMessage);
  
  // Return true if the message contains the required combinations of keywords
  return (hasEmailKeyword && hasAlreadyKeyword && hasExistKeyword) || 
         (hasCorreoKeyword && hasYaKeyword && hasExisteKeyword) || 
         (hasEmailKeyword && hasExistKeyword) || 
         (hasCorreoKeyword && hasExisteKeyword);
}

/**
 * Gets a user-friendly message when an email already exists error is detected
 * @param originalMessage The original error message
 * @returns A user-friendly error message
 */
export function getEmailExistsErrorMessage(): string {
  return "El correo electrónico ya está registrado. Por favor, utiliza otro correo o intenta recuperar tu contraseña.";
}
