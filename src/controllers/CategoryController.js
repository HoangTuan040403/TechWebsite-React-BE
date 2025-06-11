const { Error } = require('mongoose')
const CategoryService = require('../service/CategoryService')

// const createCategory = async (req, res) => {
//     try {
//         const { name } = req.body;
//         const image = req.file ? req.file.path : null;  // Đảm bảo rằng bạn chỉ lấy đường dẫn của tệp hình ảnh nếu có

//         if (!name) {
//             return res.status(400).json({
//                 status: 'ERR',
//                 message: 'Name is required'
//             });
//         }

//         // Gọi service để tạo danh mục
//         const response = await CategoryService.createCategory({ name, image });
//         return res.status(200).json(response);
//     } catch (e) {
//         return res.status(500).json({
//             message: e.message || 'An error occurred while creating the category.'
//         });
//     }
// }
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const image = req.file ? req.file.path : null;

        // Kiểm tra dữ liệu đầu vào
        if (!name || !image) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Các trường "name" và "image" là bắt buộc.'
            });
        }

        // Gọi service để tạo danh mục
        const categoryData = { name, image };
        const newCategory = await CategoryService.createCategory(categoryData);

        return res.status(201).json({
            status: 'OK',
            message: 'Tạo danh mục thành công.',
            data: newCategory,
        });
    } catch (error) {
        console.error('Lỗi khi tạo danh mục:', error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi tạo danh mục.',
            error: error.message,
        });
    }
};




const updateCategory = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id danh mục từ URL
        const { name } = req.body;
        const image = req.file ? req.file.path : null;

        if (!id) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Category ID is required'
            });
        }

        const updatedData = {};
        if (name) updatedData.name = name;
        if (image) updatedData.image = image;

        const response = await CategoryService.updateCategory(id, updatedData);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message || 'An error occurred while updating the category.'
        });
    }
};


const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Category ID is required'
            });
        }

        const response = await CategoryService.deleteCategory(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: error.message || 'An error occurred while deleting the category.'
        });
    }
};



const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids is required'
            })
        }
        const response = await CategoryService.deleteManyCategory(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


// const getDetailsProduct = async (req, res) => {
//     try {
//         const productId = req.params.id


//         if (!productId) {
//             return res.status(200).json({
//                 status: 'ERR',
//                 message: 'The productId is required'
//             })
//         }

//         const response = await ProductService.getDetailsProduct(productId)
//         return res.status(200).json(response)
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }
const getAllCategory = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await CategoryService.getAllCategory(Number(limit) || 8, Number(page) || 0, sort, filter)
        return res.status(200).json(response)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

// const getAllType = async (req, res) => {
//     try {

//         const response = await ProductService.getAllType()
//         return res.status(200).json(response)

//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategory,
    deleteMany
}