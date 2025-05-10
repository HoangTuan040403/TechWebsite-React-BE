const ReviewProductService = require('../service/ReviewProductService');

// Tạo đánh giá sản phẩm
const createReviewProduct = async (req, res) => {
    try {
        const { rating, comment, productId } = req.body;
        const userId = req.user.id; // Lấy userId từ token đã xác thực

        const newReview = await ReviewProductService.createReview(userId, { rating, comment, productId });

        res.status(201).json({
            message: 'Đánh giá thành công.',
            data: newReview,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Lấy tất cả đánh giá của sản phẩm
const getReviewsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const reviews = await ReviewProductService.getReviewsByProduct(productId);

        res.status(200).json({
            message: 'Danh sách đánh giá',
            data: reviews,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createReviewProduct, getReviewsByProduct };
