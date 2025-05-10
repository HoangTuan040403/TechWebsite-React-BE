const CategoryChildService = require('../service/CategoryChildService');

const createCategoryChild = async (req, res) => {
    try {
        const { name, parentId } = req.body;

        if (!name) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Name is required'
            });
        }

        // Gọi service để tạo danh mục con
        const response = await CategoryChildService.createCategoryChild({ name, parentId });
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message || 'Lỗi server khi tạo danh mục con.'
        });
    }
};

const getAllCategoryChild = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await CategoryChildService.getAllCategoryChild(Number(limit) || 8, Number(page) || 0, sort, filter)
        return res.status(200).json(response)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateCategoryChild = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id danh mục từ URL
        const { name } = req.body;

        if (!id) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Category ID is required'
            });
        }

        const updatedData = {};
        if (name) updatedData.name = name;


        const response = await CategoryChildService.updateCategoryChild(id, updatedData);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message || 'An error occurred while updating the category.'
        });
    }
};



const deleteCategoryChild = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 'ERR',
                message: 'CategoryChild ID is required'
            });
        }

        const response = await CategoryChildService.deleteCategoryChild(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: error.message || 'An error occurred while deleting the categorychild.'
        });
    }
};


module.exports = {
    createCategoryChild,
    getAllCategoryChild,
    updateCategoryChild,
    deleteCategoryChild
};
