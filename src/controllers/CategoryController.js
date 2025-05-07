const { Error } = require('mongoose')
const CategoryService = require('../service/CategoryService')


const createCategory = async (req, res) => {
    try {
        const { name, image, description } = req.body

        if (!name) {
            return res.status(ERR).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await CategoryService.createCategory(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const updateCategory = async (req, res) => {
    try {
        const caetId = req.params.id
        const data = req.body
        if (!caetId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The categoryid is required'
            })
        }

        const response = await CategoryService.updateCategory(caetId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const deleteCategory = async (req, res) => {
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