const ReviewProduct = require('../models/ReviewProduct');
const Product = require('../models/ProductModel');

// Tạo đánh giá mới cho sản phẩm
const createReview = async (userId, { rating, comment, productId }) => {
    // Kiểm tra rating hợp lệ (từ 1 đến 5)
    if (rating < 1 || rating > 5) {
        throw new Error('Rating phải từ 1 đến 5.');
    }

    // Kiểm tra sản phẩm có tồn tại không
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error('Sản phẩm không tồn tại.');
    }

    // Tạo mới đánh giá
    const newReview = new ReviewProduct({
        rating,
        comment,
        productId,
        userId,
    });

    await newReview.save();

    return newReview;
};

// Lấy tất cả đánh giá của sản phẩm
const getReviewsByProduct = async (productId) => {
    // Kiểm tra sản phẩm có tồn tại không
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error('Sản phẩm không tồn tại.');
    }

    // Lấy danh sách đánh giá cho sản phẩm
    const reviews = await ReviewProduct.find({ productId }).populate('userId', 'name email');

    return reviews;
};

module.exports = {
    createReview,
    getReviewsByProduct,
};
