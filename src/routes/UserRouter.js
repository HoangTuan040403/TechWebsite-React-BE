// const express = require("express");
// const router = express.Router()
// const userController = require('../controllers/UserController');
// const { authMiddleware, authUserMiddleware } = require("../middleware/authMiddleware");

// router.post('/sign-up', userController.createUser)
// router.post('/sign-in', userController.loginUser)
// router.post('/log-out', userController.logoutUser)
// router.put('/update-user/:id', authUserMiddleware, userController.updateUser)
// router.delete('/delete-user/:id', authMiddleware, userController.deleteUser)
// router.get('/getAll', authMiddleware, userController.getAllUser)
// router.get('/get-details/:id', authUserMiddleware, userController.getDetailsUser)
// router.post('/refresh-token', userController.refreshToken)
// router.post('/delete-many', authMiddleware, userController.deleteMany)





// module.exports = router





const express = require("express");
const router = express.Router()
const userController = require('../controllers/UserController');
const { authMiddleware, authUserMiddleware } = require("../middleware/authMiddleware");

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
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 */
router.post('/sign-up', userController.createUser)

/**
 * @swagger
 * /api/users/sign-in:
 *   post:
 *     summary: Đăng nhập người dùng
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
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
router.post('/sign-in', userController.loginUser)

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

