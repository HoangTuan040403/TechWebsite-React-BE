const RomProduct = require("../models/RomProductModel");

const createRomProduct = async (newRom) => {
    const { name } = newRom;

    try {
        // Kiểm tra nếu danh mục với tên này đã tồn tại
        const checkRom = await RomProduct.findOne({ name });
        if (checkRom) {
            return {
                status: 'ERR',
                message: 'The name of category already exists'
            };
        }

        // Tạo danh mục con mới
        const createdRom = await RomProduct.create({ name });

        return {
            status: 'OK',
            message: 'SUCCESS',
            data: createdRom
        };
    } catch (e) {
        // Ném lỗi nếu có
        throw e;
    }
};

const getAllRomProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalRom = await RomProduct.countDocuments()

            if (filter) {
                const label = filter[0];
                const allObjectFilter = await RomProduct.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(page * limit)
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allObjectFilter,
                    total: totalRom,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalRom / limit)
                })
            }
            if (sort) {
                const objecSort = {}
                objecSort[sort[1]] = sort[0]
                console.log('objecSort', objecSort)
                const allRomSort = await RomProduct.find().limit(limit).skip(page * limit).sort(objecSort)
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allRomSort,
                    total: totalRom,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalRom / limit)
                })
            }
            const allCate = await RomProduct.find().limit(limit).skip(page * limit)
            resolve({
                status: 'OK',
                message: 'Success',
                data: allCate,
                total: totalRom,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalRom / limit)
            })

        }
        catch (e) {
            reject(e)
        }
    })
}

const updateRomProduct = async (id, updatedData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existingRomPro = await RomProduct.findById(id);
            if (!existingRomPro) {
                return resolve({
                    status: 'ERR',
                    message: 'RomProduct not found'
                });
            }
            const updatedRomPro = await RomProduct.findByIdAndUpdate(id, updatedData, { new: true });
            resolve({
                status: 'OK',
                message: 'RomProduct updated successfully',
                data: updatedRomPro
            });
        } catch (error) {
            reject(error);
        }
    })
}
const deleteRomProduct = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existingRomPro = await RomProduct.findById(id);
            if (!existingRomPro) {
                return resolve({
                    status: 'ERR',
                    message: 'RomProduct not found'
                });
            }

            await RomProduct.findByIdAndDelete(id);
            resolve({
                status: 'OK',
                message: 'RomProduct deleted successfully'
            });
        } catch (error) {
            reject(error);
        }
    });
};


module.exports = {
    createRomProduct,
    getAllRomProduct,
    updateRomProduct,
    deleteRomProduct
};
