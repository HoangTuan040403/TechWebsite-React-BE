const ColorProductService = require('../service/ColorProductService');

const createColorProduct = async (req, res) => {
    try {
        const { name, productId } = req.body;
        const image = req.file ? req.file.path : null;
        if (!name) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Name is required'
            });
        }

        // Gọi service để tạo danh mục con
        const response = await ColorProductService.createColorProduct({ name, image, productId });
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message || 'Lỗi server khi tạo danh mục con.'
        });
    }
};

const getAllColorProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await ColorProductService.getAllColorProduct(Number(limit) || 8, Number(page) || 0, sort, filter)
        return res.status(200).json(response)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateColorProduct = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id danh mục từ URL
        const { name } = req.body;
        const image = req.file ? req.file.path : null;

        if (!id) {
            return res.status(400).json({
                status: 'ERR',
                message: 'ColorProduct ID is required'
            });
        }

        const updatedData = {};
        if (name) updatedData.name = name;
        if (image) updatedData.image = image;


        const response = await ColorProductService.updateColorProduct(id, updatedData);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message || 'An error occurred while updating the colorproduct.'
        });
    }
};



const deleteColorProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 'ERR',
                message: 'ColorProduct ID is required'
            });
        }

        const response = await ColorProductService.deleteColorProduct(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: error.message || 'An error occurred while deleting the corlorproduct.'
        });
    }
};


module.exports = {
    createColorProduct,
    getAllColorProduct,
    updateColorProduct,
    deleteColorProduct
};
