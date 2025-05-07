// utils/validate.js
exports.isValidEmail = (email) => {
    const reg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
    return reg.test(email)
}
