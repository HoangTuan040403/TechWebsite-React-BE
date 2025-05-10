const ColorProduct = require("../models/ColorProductModel");

const createColorProduct = async (newColor) => {
    const { name, image, productId } = newColor;

    try {
        // Kiểm tra nếu danh mục với tên này đã tồn tại
        const checkColor = await ColorProduct.findOne({ name });
        if (checkColor) {
            return {
                status: 'ERR',
                message: 'The name of category already exists'
            };
        }

        // Tạo danh mục con mới
        const createdColor = await ColorProduct.create({ name, image, productId });

        return {
            status: 'OK',
            message: 'SUCCESS',
            data: createdColor
        };
    } catch (e) {
        // Ném lỗi nếu có
        throw e;
    }
};

const getAllColorProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalColor = await ColorProduct.countDocuments()

            if (filter) {
                const label = filter[0];
                const allObjectFilter = await ColorProduct.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(page * limit)
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allObjectFilter,
                    total: totalColor,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalColor / limit)
                })
            }
            if (sort) {
                const objecSort = {}
                objecSort[sort[1]] = sort[0]
                console.log('objecSort', objecSort)
                const allColorSort = await ColorProduct.find().limit(limit).skip(page * limit).sort(objecSort)
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allColorSort,
                    total: totalColor,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalColor / limit)
                })
            }
            const allColor = await ColorProduct.find().limit(limit).skip(page * limit)
            resolve({
                status: 'OK',
                message: 'Success',
                data: allColor,
                total: totalColor,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalColor / limit)
            })

        }
        catch (e) {
            reject(e)
        }
    })
}

const updateColorProduct = async (id, updatedData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existingColorProduct = await ColorProduct.findById(id);
            if (!existingColorProduct) {
                return resolve({
                    status: 'ERR',
                    message: 'ColorProduct not found'
                });
            }
            const updatedColorProduct = await ColorProduct.findByIdAndUpdate(id, updatedData, { new: true });
            resolve({
                status: 'OK',
                message: 'ColorProduct updated successfully',
                data: updatedColorProduct
            });
        } catch (error) {
            reject(error);
        }
    })
}
const deleteColorProduct = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existingColorProduct = await ColorProduct.findById(id);
            if (!existingColorProduct) {
                return resolve({
                    status: 'ERR',
                    message: 'ColorProduct not found'
                });
            }

            await ColorProduct.findByIdAndDelete(id);
            resolve({
                status: 'OK',
                message: 'ColorProduct deleted successfully'
            });
        } catch (error) {
            reject(error);
        }
    });
};


module.exports = {
    createColorProduct,
    getAllColorProduct,
    updateColorProduct,
    deleteColorProduct
};
