const RomProductService = require('../service/RomProductService');

const createRomProduct = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Name is required'
            });
        }

        // Gọi service để tạo danh mục rom
        const response = await RomProductService.createRomProduct({ name });
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message || 'Lỗi server khi tạo rom.'
        });
    }
};

const getAllRomProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await RomProductService.getAllRomProduct(Number(limit) || 8, Number(page) || 0, sort, filter)
        return res.status(200).json(response)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateRomProduct = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id danh mục từ URL
        const { name } = req.body;

        if (!id) {
            return res.status(400).json({
                status: 'ERR',
                message: 'RomProduct ID is required'
            });
        }

        const updatedData = {};
        if (name) updatedData.name = name;


        const response = await RomProductService.updateRomProduct(id, updatedData);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message || 'An error occurred while updating the romproduct.'
        });
    }
};



const deleteRomProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 'ERR',
                message: 'RomProduct ID is required'
            });
        }

        const response = await RomProductService.deleteRomProduct(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: error.message || 'An error occurred while deleting the romproduct.'
        });
    }
};


module.exports = {
    createRomProduct,
    getAllRomProduct,
    updateRomProduct,
    deleteRomProduct
};
