const UserService = require('../service/UserService')
const JwtService = require('../service/JwtService')
const { isValidEmail } = require('../utils/validate') // Helper kiểm tra email

const createUser = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body

        if (!email || !password || !confirmPassword) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Email, password, and confirmPassword are required.'
            })
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Email format is invalid.'
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Password and confirmPassword do not match.'
            })
        }

        const response = await UserService.createUser(req.body)
        return res.status(201).json(response)
    } catch (e) {
        console.error(e)
        return res.status(500).json({
            status: 'ERR',
            message: e.message || 'Internal server error'
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Email and password are required.'
            })
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Email format is invalid.'
            })
        }

        const response = await UserService.loginUser(req.body)
        const { refresh_token, ...rest } = response

        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        })

        return res.status(200).json(rest)
    } catch (e) {
        console.error(e)
        return res.status(401).json({
            status: 'ERR',
            message: e.message || 'Authentication failed'
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body

        if (!userId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'User ID is required.'
            })
        }

        const response = await UserService.updateUser(userId, data)
        return res.status(200).json(response)
    } catch (e) {
        console.error(e)
        return res.status(500).json({
            status: 'ERR',
            message: e.message || 'Internal server error'
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id

        if (!userId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'User ID is required.'
            })
        }

        const response = await UserService.deleteUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        console.error(e)
        return res.status(500).json({
            status: 'ERR',
            message: e.message || 'Internal server error'
        })
    }
}

const deleteMany = async (req, res) => {
    try {
        const ids = req.body

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                status: 'ERR',
                message: 'An array of IDs is required.'
            })
        }

        const response = await UserService.deleteManyUser(ids)
        return res.status(200).json(response)
    } catch (e) {
        console.error(e)
        return res.status(500).json({
            status: 'ERR',
            message: e.message || 'Internal server error'
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser()
        return res.status(200).json(response)
    } catch (e) {
        console.error(e)
        return res.status(500).json({
            status: 'ERR',
            message: e.message || 'Internal server error'
        })
    }
}

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id

        if (!userId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'User ID is required.'
            })
        }

        const response = await UserService.getDetailsUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        console.error(e)
        return res.status(500).json({
            status: 'ERR',
            message: e.message || 'Internal server error'
        })
    }
}

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refresh_token

        if (!token) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Refresh token is required.'
            })
        }

        const response = await JwtService.refreshTokenJwtService(token)
        return res.status(200).json(response)
    } catch (e) {
        console.error(e)
        return res.status(401).json({
            status: 'ERR',
            message: e.message || 'Invalid refresh token'
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status: 'OK',
            message: 'Logout successful'
        })
    } catch (e) {
        console.error(e)
        return res.status(500).json({
            status: 'ERR',
            message: e.message || 'Internal server error'
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
    logoutUser,
    deleteMany
}
