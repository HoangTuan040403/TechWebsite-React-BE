const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const crypto = require('crypto');
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService")
const { isValidEmail } = require('../utils/validate') // Helper kiểm tra email
const { sendVerificationEmail } = require('../utils/sendEmail');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


// Tạo người dùng mới
// const createUser = (newUser) => {
//     return new Promise(async (resolve, reject) => {
//         const { name, email, password, confirmPassword, phone } = newUser

//         try {
//             // Kiểm tra xem email có hợp lệ không
//             if (!isValidEmail(email)) {
//                 return resolve({
//                     status: 'ERR',
//                     message: 'Invalid email format'
//                 })
//             }

//             // Kiểm tra xem email đã tồn tại chưa
//             const checkUser = await User.findOne({ email })
//             if (checkUser) {
//                 return resolve({
//                     status: 'ERR',
//                     message: 'The email is already taken'
//                 })
//             }

//             // Kiểm tra mật khẩu và confirmPassword có khớp không
//             if (password !== confirmPassword) {
//                 return resolve({
//                     status: 'ERR',
//                     message: 'Password and confirmPassword do not match'
//                 })
//             }

//             const hash = bcrypt.hashSync(password, 10)
//             const createdUser = await User.create({ name, email, password: hash, phone })
//             resolve({
//                 status: 'OK',
//                 message: 'User created successfully',
//                 data: createdUser
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }
const createUser = async (newUser) => {
    console.log('sendVerificationEmail:', sendVerificationEmail);
    const { name, email, password, confirmPassword, phone } = newUser;

    if (!email || !password || !confirmPassword || !name || !phone) {
        return {
            status: 'ERR',
            message: 'All fields are required'
        };
    }

    if (!isValidEmail(email)) {
        return {
            status: 'ERR',
            message: 'Invalid email format'
        };
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return {
            status: 'ERR',
            message: 'The email is already taken'
        };
    }

    if (password !== confirmPassword) {
        return {
            status: 'ERR',
            message: 'Password and confirmPassword do not match'
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        isVerified: false
    });

    const emailToken = jwt.sign(
        { userId: createdUser._id },  // payload chứa userId
        process.env.EMAIL_TOKEN_SECRET,
        { expiresIn: '1d' }
    );

    await sendVerificationEmail(email, emailToken);

    return {
        status: 'OK',
        message: 'User created successfully. Please verify your email.',
        data: createdUser
    };
};

const verifyEmail = async (token) => {
    try {
        // Giải mã token
        const decoded = jwt.verify(token, process.env.EMAIL_TOKEN_SECRET);

        // Tìm user bằng userId trong token
        const user = await User.findById(decoded.userId);

        if (!user) {
            return {
                status: 'ERR',
                message: 'User not found'
            };
        }

        if (user.isVerified) {
            return {
                status: 'OK',
                message: 'Email already verified'
            };
        }

        // Cập nhật trạng thái xác minh email
        user.isVerified = true;
        await user.save();

        return {
            status: 'OK',
            message: 'Email verified successfully'
        };
    } catch (err) {
        return {
            status: 'ERR',
            message: 'Invalid or expired token'
        };
    }
};

const forgotPassword = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
        return { status: 'ERR', message: 'Email không tồn tại' };
    }

    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 giờ
    await user.save();

    // cấu hình email gửi
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        to: email,
        subject: 'Đặt lại mật khẩu',
        html: `<p>Click vào link để đặt lại mật khẩu:</p>
               <a href="http://localhost:3001/reset-password/${token}">Reset Password</a>`
    };

    await transporter.sendMail(mailOptions);

    return { status: 'OK', message: 'Email đặt lại mật khẩu đã được gửi' };
};

const resetPassword = async (token, newPassword) => {
    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        return { status: 'ERR', message: 'Token không hợp lệ hoặc đã hết hạn' };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return { status: 'OK', message: 'Đặt lại mật khẩu thành công' };
};

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
    deleteManyUser,
    verifyEmail,
    forgotPassword,
    resetPassword
}
