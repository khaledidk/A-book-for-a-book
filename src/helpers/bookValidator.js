export function bookValidator(name) {
    if (!name) return "* שם ספר חובה"
    if (name.length < 3) return '* שם ספר לפחות 3 אותיות'
    return ''
}