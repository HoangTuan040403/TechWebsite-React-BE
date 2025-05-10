const express = require('express');
const router = express.Router();
const ReviewProductController = require('../controllers/ReviewProductController');
const { authUserMiddleware } = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');

/**
 * @swagger
 * tags:
 *   name: Review-Product
 *   description: API quản lý đánh giá sản phẩm
 */

/**
 * @swagger
 * /api/reviews/create:
 *   post:
 *     summary: Tạo đánh giá mới cho sản phẩm
 *     tags: [Review-Product]
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 description: Rating từ 1 đến 5
 *               comment:
 *                 type: string
 *                 description: Đánh giá của người dùng
 *               productId:
 *                 type: string
 *                 description: ID của sản phẩm
 *     responses:
 *       201:
 *         description: Đánh giá đã được tạo thành công
 *       400:
 *         description: Thiếu thông tin hoặc rating không hợp lệ
 *       404:
 *         description: Sản phẩm không tồn tại
 *       500:
 *         description: Lỗi server
 */
router.post('/create', authUserMiddleware, upload.none(), ReviewProductController.createReviewProduct);

/**
 * @swagger
 * /api/reviews/{productId}:
 *   get:
 *     summary: Lấy tất cả đánh giá của sản phẩm
 *     tags: [Review-Product]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID của sản phẩm
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách đánh giá của sản phẩm
 *       404:
 *         description: Sản phẩm không tồn tại
 *       500:
 *         description: Lỗi server
 */
router.get('/:productId', ReviewProductController.getReviewsByProduct);

module.exports = router;
