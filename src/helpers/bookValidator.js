export function bookValidator(name) {
    if (!name) return "* שם ספר חובה"
    if (name.length < 3) return '* שם ספר חייב להחות לפחות 3 אותיות'
    return ''
}