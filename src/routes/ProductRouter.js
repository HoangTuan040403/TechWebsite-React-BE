// const express = require("express");
// const router = express.Router()
// const ProductController = require('../controllers/ProductController');
// const { authMiddleware } = require("../middleware/authMiddleware");


// router.post('/create', ProductController.createProduct)
// router.put('/update/:id', authMiddleware, ProductController.updateProduct)
// router.get('/get-details/:id', ProductController.getDetailsProduct)
// router.delete('/delete/:id', authMiddleware, ProductController.deleteProduct)
// router.get('/get-all', ProductController.getAllProduct)
// router.delete('/delete-many', authMiddleware, ProductController.deleteMany)
// router.get('/get-all-type', ProductController.getAllType)




// module.exports = router



const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authMiddleware } = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API quản lý sản phẩm
 */

/**
 * @swagger
 * /api/products/create:
 *   post:
 *     summary: Tạo sản phẩm mới
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               countInStock:
 *                  type: number
 *               image:
 *                  type: string
 *                  format: binary
 *     responses:
 *       200:
 *         description: Sản phẩm đã được tạo
 */
router.post('/create', authMiddleware, upload.single('image'), ProductController.createProduct);

/**
 * @swagger
 * /api/products/update/{id}:
 *   put:
 *     summary: Cập nhật sản phẩm
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID sản phẩm
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               categoryId:
 *                 type: string
 *                 description: Bắt buộc
 *               countInStock:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Cập nhật sản phẩm thành công
 */
router.put('/update/:id', authMiddleware, upload.single('image'), ProductController.updateProduct);

/**
 * @swagger
 * /api/products/get-details/{id}:
 *   get:
 *     summary: Lấy chi tiết sản phẩm
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chi tiết sản phẩm
 */
router.get('/get-details/:id', ProductController.getDetailsProduct);

/**
 * @swagger
 * /api/products/delete/{id}:
 *   delete:
 *     summary: Xoá sản phẩm theo ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Đã xoá sản phẩm
 */
router.delete('/delete/:id', authMiddleware, ProductController.deleteProduct);

/**
 * @swagger
 * /api/products/get-all:
 *   get:
 *     summary: Lấy danh sách tất cả sản phẩm
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm
 */
router.get('/get-all', ProductController.getAllProduct);

/**
 * @swagger
 * /api/products/delete-many:
 *   delete:
 *     summary: Xoá nhiều sản phẩm
 *     tags: [Products]
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
 *         description: Đã xoá nhiều sản phẩm
 */
router.delete('/delete-many', authMiddleware, ProductController.deleteMany);

/**
 * @swagger
 * /api/products/get-all-type:
 *   get:
 *     summary: Lấy tất cả loại sản phẩm
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Danh sách loại sản phẩm
 */
router.get('/get-all-type', ProductController.getAllType);

module.exports = router;

