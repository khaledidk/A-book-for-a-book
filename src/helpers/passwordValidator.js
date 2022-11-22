export function passwordValidator(password, equal) {
  if (!password) return "* סיסמה חובה"
  if (password.length < 5) return '* סיסמה לפחות 5 אותיות או מספרים'
  if (equal === false) return '* שתי סיסמאות אינו שוות'

  return ''
}