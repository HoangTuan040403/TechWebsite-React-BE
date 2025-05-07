const express = require("express");
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const { authMiddleware } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API quản lý danh mục sản phẩm
 */

/**
 * @swagger
 * /api/categories/create:
 *   post:
 *     summary: Tạo danh mục mới
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Danh mục đã được tạo
 */
router.post('/create', authMiddleware, CategoryController.createCategory);

/**
 * @swagger
 * /api/categories/update/{id}:
 *   put:
 *     summary: Cập nhật danh mục
 *     tags: [Categories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Danh mục đã được cập nhật
 */
router.put('/update/:id', authMiddleware, CategoryController.updateCategory);

/**
 * @swagger
 * /api/categories/delete/{id}:
 *   delete:
 *     summary: Xoá danh mục
 *     tags: [Categories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Đã xoá danh mục
 */
router.delete('/delete/:id', authMiddleware, CategoryController.deleteCategory);

/**
 * @swagger
 * /api/categories/get-all:
 *   get:
 *     summary: Lấy danh sách tất cả danh mục
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Danh sách danh mục
 */
router.get('/get-all', CategoryController.getAllCategory);

// /**
//  * @swagger
//  * /api/categories/get-details/{id}:
//  *   get:
//  *     summary: Lấy thông tin chi tiết danh mục theo ID
//  *     tags: [Categories]
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Thông tin chi tiết danh mục
//  */
// router.get('/get-details/:id', CategoryController.getCategoryById);

module.exports = router;
