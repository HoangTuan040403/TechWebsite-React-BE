
const Category = require("../models/CategoryModel")



const createCategory = (newCate) => {
    return new Promise(async (resolve, reject) => {
        const { name, image } = newCate;

        try {
            const checkCategory = await Category.findOne({ name });
            if (checkCategory) {
                resolve({
                    status: 'ERR',
                    message: 'Category with this name already exists'
                });
                return;
            }

            const createdCategory = await Category.create({ name, image });
            if (createdCategory) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdCategory
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};



const updateCategory = async (id, updatedData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existingCategory = await Category.findById(id);
            if (!existingCategory) {
                return resolve({
                    status: 'ERR',
                    message: 'Category not found'
                });
            }

            const updatedCategory = await Category.findByIdAndUpdate(id, updatedData, { new: true });
            resolve({
                status: 'OK',
                message: 'Category updated successfully',
                data: updatedCategory
            });
        } catch (error) {
            reject(error);
        }
    });
};



const deleteCategory = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existingCategory = await Category.findById(id);
            if (!existingCategory) {
                return resolve({
                    status: 'ERR',
                    message: 'Category not found'
                });
            }

            await Category.findByIdAndDelete(id);
            resolve({
                status: 'OK',
                message: 'Category deleted successfully'
            });
        } catch (error) {
            reject(error);
        }
    });
};


const deleteManyCategory = (ids) => {
    console.log('id', ids)
    return new Promise(async (resolve, reject) => {
        try {
            await Category.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete category success',


            })

        }
        catch (e) {
            reject(e)
        }
    })
}

const getAllCategory = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalCate = await Category.countDocuments()

            if (filter) {
                const label = filter[0];
                const allObjectFilter = await Category.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(page * limit)
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
                const allCateSort = await Category.find().limit(limit).skip(page * limit).sort(objecSort)
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allCateSort,
                    total: totalCate,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalCate / limit)
                })
            }
            const allCate = await Category.find().limit(limit).skip(page * limit)
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


// const getDetailsProduct = (id) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const product = await Product.findOne({
//                 _id: id
//             })
//             if (product === null) {
//                 resolve({
//                     status: 'OK',
//                     message: 'The user is not defined'
//                 })
//             }

//             resolve({
//                 status: 'OK',
//                 message: 'Success',
//                 data: product


//             })

//         }
//         catch (e) {
//             reject(e)
//         }
//     })
// }



// const getAllType = () => {
//     return new Promise(async (resolve, reject) => {
//         try {


//             const allType = await Product.distinct('type')
//             resolve({
//                 status: 'OK',
//                 message: 'Success',
//                 data: allType,

//             })

//         }
//         catch (e) {
//             reject(e)
//         }
//     })
// }





module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategory,
    deleteManyCategory
}