
const Category = require("../models/CategoryModel")



const createCategory = (newCate) => {
    return new Promise(async (resolve, reject) => {

        const { name, image, description } = newCate
        try {
            const checkProduct = await Category.findOne({
                name: name
            })
            if (checkProduct !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The name of product is already'
                })
            }

            const newCate = await Category.create({
                name, image, description

            })
            if (newCate) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newCate
                })
            }

        }
        catch (e) {
            reject(e)
        }
    })
}



const updateCategory = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCate = await Category.findOne({
                _id: id
            })

            if (checkCate === null) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }
            const updatedCategory = await Category.findByIdAndUpdate(id, data, { new: true })

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedCategory

            })

        }
        catch (e) {
            reject(e)
        }
    })
}



const deleteCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCate = await Category.findOne({
                _id: id
            })
            if (checkCate === null) {
                resolve({
                    status: 'OK',
                    message: 'The caetegory is not defined'
                })
            }
            await Category.findByIdAndDelete(id)
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