export function authorValidator(name) {
    if (!name) return "* שם סופר חובה"
    if (name.length < 3) return '* שם סופר חייב להיות לפחות 3 אותיות'
    return ''
}