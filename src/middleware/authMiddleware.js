// const jwt = require('jsonwebtoken')
// const dotenv = require('dotenv')
// dotenv.config()

// const authMiddleware = (req, res, next) => {
//     console.log('checkToken', req.headers.token)
//     const token = req.headers.token.split(' ')[1]

//     jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
//         if(err){
//             return res.status(404).json({
//                 message: 'The authemtication',
//                 status: 'ERROR'
//             })
//         }
//         if(user?.isAdmin){
//             next()
//         }else{
//             return res.status(404).json({
//                 message: 'The authemtication',
//                 status: 'ERROR'
//             })
//         }
//     });
// }

// const authUserMiddleware = (req, res, next) => {
//     const token = req.headers.token.split(' ')[1]
//     const userId = req.params.id

//     jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
//         if(err){
//             return res.status(404).json({
//                 message: 'The authemtication',
//                 status: 'ERROR'
//             })
//         }
//         if(user?.isAdmin || user.id === userId){
//             next()
//         }else{
//             return res.status(404).json({
//                 message: 'The authemtication',
//                 status: 'ERROR'
//             })
//         }
//     });
// }

// module.exports = {
//     authMiddleware,
//     authUserMiddleware

// }

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
    try {
        const header = req.headers.authorization; // ✅ đổi từ headers.token sang headers.authorization
        if (!header || !header.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Token không hợp lệ hoặc không tồn tại',
                status: 'ERROR'
            });
        }

        const token = header.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if (err) {
                return res.status(403).json({
                    message: 'Token không hợp lệ hoặc đã hết hạn',
                    status: 'ERROR'
                });
            }
            if (user?.isAdmin) {
                next();
            } else {
                return res.status(403).json({
                    message: 'Bạn không có quyền truy cập',
                    status: 'ERROR'
                });
            }
        });
    } catch (e) {
        return res.status(500).json({
            message: 'Lỗi máy chủ',
            status: 'ERROR'
        });
    }
};




// const authUserMiddleware = (req, res, next) => {
//     const tokenHeader = req.headers.token;

//     if (!tokenHeader || !tokenHeader.startsWith('Bearer')) {
//         return res.status(401).json({
//             message: 'Token không hợp lệ hoặc không tồn tại',
//             status: 'ERROR'
//         });
//     }

//     const token = tokenHeader.split(' ')[1];
//     const userId = req.params.id;

//     jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
//         if (err) {
//             return res.status(401).json({
//                 message: 'Token không hợp lệ',
//                 status: 'ERROR'
//             });
//         }

//         if (user?.isAdmin || user.id === userId) {
//             req.user = user;
//             next();
//         } else {
//             return res.status(403).json({
//                 message: 'Không có quyền truy cập',
//                 status: 'ERROR'
//             });
//         }
//     });
// };
// Middleware xác thực người dùng
const authUserMiddleware = (req, res, next) => {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Token không hợp lệ hoặc không tồn tại',
            status: 'ERROR'
        });
    }

    const token = tokenHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(401).json({
                message: 'Token không hợp lệ',
                status: 'ERROR'
            });
        }

        req.user = user; // 👈 Phải có dòng này để tạo req.user._id
        next();
    });
};
module.exports = {
    authMiddleware,
    authUserMiddleware

}
