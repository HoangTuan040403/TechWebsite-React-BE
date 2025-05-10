const CategoryChild = require("../models/CategoryChildModel");

const createCategoryChild = async (newCate) => {
    const { name, parentId } = newCate;

    try {
        // Kiểm tra nếu danh mục với tên này đã tồn tại
        const checkCategory = await CategoryChild.findOne({ name });
        if (checkCategory) {
            return {
                status: 'ERR',
                message: 'The name of category already exists'
            };
        }

        // Tạo danh mục con mới
        const createdCategory = await CategoryChild.create({ name, parentId });

        return {
            status: 'OK',
            message: 'SUCCESS',
            data: createdCategory
        };
    } catch (e) {
        // Ném lỗi nếu có
        throw e;
    }
};

const getAllCategoryChild = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalCate = await CategoryChild.countDocuments()

            if (filter) {
                const label = filter[0];
                const allObjectFilter = await CategoryChild.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(page * limit)
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allObjectFilter,
                    total: totalCate,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalCate / limit)
                })
            }
            if (sort) {
                const objecSort = {}
                objecSort[sort[1]] = sort[0]
                console.log('objecSort', objecSort)
                const allCateSort = await CategoryChild.find().limit(limit).skip(page * limit).sort(objecSort)
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allCateSort,
                    total: totalCate,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalCate / limit)
                })
            }
            const allCate = await CategoryChild.find().limit(limit).skip(page * limit)
            resolve({
                status: 'OK',
                message: 'Success',
                data: allCate,
                total: totalCate,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalCate / limit)
            })

        }
        catch (e) {
            reject(e)
        }
    })
}

const updateCategoryChild = async (id, updatedData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existingCategoryChild = await CategoryChild.findById(id);
            if (!existingCategoryChild) {
                return resolve({
                    status: 'ERR',
                    message: 'CategoryChild not found'
                });
            }
            const updatedCategoryChild = await CategoryChild.findByIdAndUpdate(id, updatedData, { new: true });
            resolve({
                status: 'OK',
                message: 'CategoryChild updated successfully',
                data: updatedCategoryChild
            });
        } catch (error) {
            reject(error);
        }
    })
}
const deleteCategoryChild = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existingCategory = await CategoryChild.findById(id);
            if (!existingCategory) {
                return resolve({
                    status: 'ERR',
                    message: 'CategoryChild not found'
                });
            }

            await CategoryChild.findByIdAndDelete(id);
            resolve({
                status: 'OK',
                message: 'CategoryChild deleted successfully'
            });
        } catch (error) {
            reject(error);
        }
    });
};


module.exports = {
    createCategoryChild,
    getAllCategoryChild,
    updateCategoryChild,
    deleteCategoryChild
};
