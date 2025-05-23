const { Error } = require('mongoose')
const ProductService = require('../service/ProductService')

const createProduct = async (req, res) => {
    try {
        const { name, categoryId, price, countInStock, description } = req.body;
        const image = req.file ? req.file.path : null;

        if (!name || !categoryId || !price || !countInStock || !description || !image) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Các trường name, categoryId, price, countInStock, description, image là bắt buộc.'
            });
        }

        const productData = { name, categoryId, price, countInStock, description, image };
        const newProduct = await ProductService.createProduct(productData);

        return res.status(201).json({
            status: 'OK',
            message: 'Tạo sản phẩm thành công',
            data: newProduct,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Lỗi khi tạo sản phẩm',
            error: error.message,
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, price, description, categoryId, countInStock } = req.body;
        const image = req.file ? req.file.path : undefined;

        const updateData = {
            name,
            price,
            description,
            categoryId,
            countInStock,
        };

        if (image) updateData.image = image;

        const response = await ProductService.updateProduct(productId, updateData);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const response = await ProductService.deleteProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids is required'
            })
        }
        const response = await ProductService.deleteManyProduct(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id


        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }

        const response = await ProductService.getDetailsProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await ProductService.getAllProduct(Number(limit) || 8, Number(page) || 0, sort, filter)
        return res.status(200).json(response)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getNewArrivals = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const response = await ProductService.getNewArrivals(limit);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ', error });
    }
};

const getAllType = async (req, res) => {
    try {

        const response = await ProductService.getAllType()
        return res.status(200).json(response)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    deleteMany,
    getAllType,
    getNewArrivals

}