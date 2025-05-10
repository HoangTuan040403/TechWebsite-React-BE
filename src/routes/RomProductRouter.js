const express = require("express");
const router = express.Router();
const RomProductController = require('../controllers/RomProductController');
const { authMiddleware } = require("../middleware/authMiddleware");
const upload = require('../middleware/multer');
/**
 * @swagger
 * tags:
 *   name: Rom-Product
 *   description: API quản lý danh mục rom sản phẩm
 */

/**
 * @swagger
 * /api/rom-product/create:
 *   post:
 *     summary: Tạo danh mục mới
 *     tags: [Rom-Product]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Danh mục đã được tạo thành công
 */
router.post('/create', authMiddleware, upload.none(), RomProductController.createRomProduct);

/**
 * @swagger
 * /api/rom-product/update/{id}:
 *   put:
 *     summary: Cập nhật danh mục rom
 *     tags: [Rom-Product]
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
router.put('/update/:id', authMiddleware, upload.none(), RomProductController.updateRomProduct);


/**
 * @swagger
 * /api/rom-product/delete/{id}:
 *   delete:
 *     summary: Xoá danh mục rom
 *     tags: [Rom-Product]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Đã xoá rom
 */
router.delete('/delete/:id', authMiddleware, RomProductController.deleteRomProduct);
/**
 * @swagger
 * /api/rom-product/get-all:
 *   get:
 *     summary: Lấy danh sách tất cả rom sản phẩm
 *     tags: [Rom-Product]
 *     responses:
 *       200:
 *         description: Danh sách rom sản phẩm
 */
router.get('/get-all', RomProductController.getAllRomProduct);



module.exports = router;
