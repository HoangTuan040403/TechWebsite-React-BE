const express = require("express");
const router = express.Router();
const ColorProduct = require('../controllers/ColorProductController');
const { authMiddleware } = require("../middleware/authMiddleware");
const upload = require('../middleware/multer');
/**
 * @swagger
 * tags:
 *   name: Color-Product
 *   description: API quản lý danh mục con sản phẩm
 */

/**
 * @swagger
 * /api/color-product/create:
 *   post:
 *     summary: Tạo màu sản phẩm
 *     tags: [Color-Product]
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
 *               image:
 *                  type: string
 *                  format: binary
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Màu sản phẩm đã được tạo thành công
 */
router.post('/create', authMiddleware, upload.single('image'), ColorProduct.createColorProduct);

/**
 * @swagger
 * /api/color-product/update/{id}:
 *   put:
 *     summary: Cập nhật màu sản phẩm
 *     tags: [Color-Product]
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
 *               image:
 *                  type: string
 *                  format: binary
 *     responses:
 *       200:
 *         description: Màu sản phẩm đã được cập nhật
 */
router.put('/update/:id', authMiddleware, upload.none(), ColorProduct.updateColorProduct);


/**
 * @swagger
 * /api/color-product/delete/{id}:
 *   delete:
 *     summary: Xoá màu sản phẩm
 *     tags: [Color-Product]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Đã xoá màu sản phẩm
 */
router.delete('/delete/:id', authMiddleware, ColorProduct.deleteColorProduct);
/**
 * @swagger
 * /api/color-product/get-all:
 *   get:
 *     summary: Lấy danh sách tất cả màu sản phẩm
 *     tags: [Color-Product]
 *     responses:
 *       200:
 *         description: Danh sách màu sản phẩm
 */
router.get('/get-all', ColorProduct.getAllColorProduct);


module.exports = router;
