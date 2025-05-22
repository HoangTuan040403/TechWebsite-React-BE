
const express = require("express");
const router = express.Router()
const userController = require('../controllers/UserController');
const { authMiddleware, authUserMiddleware } = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API cho người dùng
 */

/**
 * @swagger
 * /api/users/sign-up:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - confirmPassword
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 */

router.post('/sign-up', upload.none(), userController.createUser)
/**
 * @swagger
 * /api/users/verify-email:
 *   get:
 *     summary: Xác minh địa chỉ email người dùng
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Mã token xác minh email
 *     responses:
 *       200:
 *         description: Xác minh email thành công
 *       400:
 *         description: Token không hợp lệ hoặc đã hết hạn
 */
router.get('/verify-email', userController.verifyEmail);

/**
 * @swagger
 * /api/users/forgot-password:
 *   post:
 *     summary: Gửi email để đặt lại mật khẩu
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Email đặt lại mật khẩu đã được gửi
 *       400:
 *         description: Email không tồn tại
 */
router.post('/forgot-password', upload.none(), userController.forgotPassword);

/**
 * @swagger
 * /api/users/reset-password/{token}:
 *   post:
 *     summary: Đặt lại mật khẩu với token
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token xác minh từ email
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 example: NewSecurePassword123
 *     responses:
 *       200:
 *         description: Mật khẩu đã được thay đổi thành công
 *       400:
 *         description: Token không hợp lệ hoặc đã hết hạn
 */
router.post('/reset-password/:token', upload.none(), userController.resetPassword);


/**
 * @swagger
 * /api/users/sign-in:
 *   post:
 *     summary: Đăng nhập người dùng
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 */
router.post('/sign-in', upload.none(), userController.loginUser)

/**
 * @swagger
 * /api/users/log-out:
 *   post:
 *     summary: Đăng xuất người dùng
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Đăng xuất thành công
 */
router.post('/log-out', userController.logoutUser)

/**
 * @swagger
 * /api/users/update-user/{id}:
 *   put:
 *     summary: Cập nhật thông tin người dùng
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put('/update-user/:id', authUserMiddleware, userController.updateUser)

/**
 * @swagger
 * /api/users/delete-user/{id}:
 *   delete:
 *     summary: Xóa người dùng theo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
router.delete('/delete-user/:id', authMiddleware, userController.deleteUser)

/**
 * @swagger
 * /api/users/getAll:
 *   get:
 *     summary: Lấy danh sách người dùng
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/getAll', authMiddleware, userController.getAllUser)

/**
 * @swagger
 * /api/users/get-details/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết người dùng
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/get-details/:id', authUserMiddleware, userController.getDetailsUser)

/**
 * @swagger
 * /api/users/refresh-token:
 *   post:
 *     summary: Làm mới token
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Thành công
 */
router.post('/refresh-token', userController.refreshToken)

/**
 * @swagger
 * /api/users/delete-many:
 *   post:
 *     summary: Xóa nhiều người dùng cùng lúc
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
router.post('/delete-many', authMiddleware, userController.deleteMany)

module.exports = router

