const express = require("express");
const router = express.Router();
const CategoryChildController = require('../controllers/CategoryChildController');
const { authMiddleware } = require("../middleware/authMiddleware");
const upload = require('../middleware/multer');
/**
 * @swagger
 * tags:
 *   name: Categories-Child
 *   description: API quản lý danh mục con sản phẩm
 */

/**
 * @swagger
 * /api/categories-child/create:
 *   post:
 *     summary: Tạo danh mục mới
 *     tags: [Categories-Child]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên danh mục
 *               parentId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Danh mục đã được tạo thành công
 */
router.post('/create', authMiddleware, upload.none(), CategoryChildController.createCategoryChild);

/**
 * @swagger
 * /api/categories-child/update/{id}:
 *   put:
 *     summary: Cập nhật danh mục con
 *     tags: [Categories-Child]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Danh mục đã được cập nhật
 */
router.put('/update/:id', authMiddleware, upload.none(), CategoryChildController.updateCategoryChild);


/**
 * @swagger
 * /api/categories-child/delete/{id}:
 *   delete:
 *     summary: Xoá danh mục
 *     tags: [Categories-Child]
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
router.delete('/delete/:id', authMiddleware, CategoryChildController.deleteCategoryChild);
/**
 * @swagger
 * /api/categories-child/get-all:
 *   get:
 *     summary: Lấy danh sách tất cả danh mục con
 *     tags: [Categories-Child]
 *     responses:
 *       200:
 *         description: Danh sách danh mục con
 */
router.get('/get-all', CategoryChildController.getAllCategoryChild);


module.exports = router;
