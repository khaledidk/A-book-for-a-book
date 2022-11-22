export function nameValidator(name) {
    if (!name) return "* שם משתמש חובה"
    if (name.length < 3) return '* שם משתמש לפחות 3 אותיות או מספרים'
    return ''
}