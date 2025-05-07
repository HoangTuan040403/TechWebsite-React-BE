const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService")
const { isValidEmail } = require('../utils/validate') // Helper kiểm tra email

// Tạo người dùng mới
const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser

        try {
            // Kiểm tra xem email có hợp lệ không
            if (!isValidEmail(email)) {
                return resolve({
                    status: 'ERR',
                    message: 'Invalid email format'
                })
            }

            // Kiểm tra xem email đã tồn tại chưa
            const checkUser = await User.findOne({ email })
            if (checkUser) {
                return resolve({
                    status: 'ERR',
                    message: 'The email is already taken'
                })
            }

            // Kiểm tra mật khẩu và confirmPassword có khớp không
            if (password !== confirmPassword) {
                return resolve({
                    status: 'ERR',
                    message: 'Password and confirmPassword do not match'
                })
            }

            const hash = bcrypt.hashSync(password, 10)
            const createdUser = await User.create({ name, email, password: hash, phone })
            resolve({
                status: 'OK',
                message: 'User created successfully',
                data: createdUser
            })
        } catch (e) {
            reject(e)
        }
    })
}

// Đăng nhập người dùng
const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin

        try {
            // Kiểm tra người dùng có tồn tại không
            const checkUser = await User.findOne({ email })
            if (!checkUser) {
                return resolve({
                    status: 'ERR',
                    message: 'User not found'
                })
            }

            // Kiểm tra mật khẩu
            const isPasswordValid = bcrypt.compareSync(password, checkUser.password)
            if (!isPasswordValid) {
                return resolve({
                    status: 'ERR',
                    message: 'Incorrect password'
                })
            }

            // Tạo Access token và Refresh token
            const access_token = await genneralAccessToken({ id: checkUser.id, isAdmin: checkUser.isAdmin })
            const refresh_token = await genneralRefreshToken({ id: checkUser.id, isAdmin: checkUser.isAdmin })

            resolve({
                status: 'OK',
                message: 'Login successful',
                access_token,
                refresh_token
            })
        } catch (e) {
            reject(e)
        }
    })
}

// Cập nhật thông tin người dùng
const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findById(id)
            if (!checkUser) {
                return resolve({
                    status: 'ERR',
                    message: 'User not found'
                })
            }

            // Cập nhật người dùng
            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'User updated successfully',
                data: updatedUser
            })
        } catch (e) {
            reject(e)
        }
    })
}

// Xóa người dùng
const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findById(id)
            if (!checkUser) {
                return resolve({
                    status: 'ERR',
                    message: 'User not found'
                })
            }

            await User.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'User deleted successfully'
            })
        } catch (e) {
            reject(e)
        }
    })
}

// Xóa nhiều người dùng
const deleteManyUser = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await User.deleteMany({ _id: { $in: ids } })
            resolve({
                status: 'OK',
                message: 'Users deleted successfully'
            })
        } catch (e) {
            reject(e)
        }
    })
}

// Lấy tất cả người dùng
const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            resolve({
                status: 'OK',
                message: 'Success',
                data: allUser
            })
        } catch (e) {
            reject(e)
        }
    })
}

// Lấy thông tin chi tiết người dùng
const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findById(id)
            if (!user) {
                return resolve({
                    status: 'ERR',
                    message: 'User not found'
                })
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data: user
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    deleteManyUser
}
