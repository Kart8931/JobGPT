const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")

async function authUser(req, res, next) {
    try {
        // Optional chaining (?.) prevents crashes if cookie-parser middleware is missing
        const token = req.cookies?.token 

        if (!token) {
            return res.status(401).json({
                message: "Token not provided."
            })
        }

        // Database call is now safely inside the try/catch
        const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token })

        if (isTokenBlacklisted) {
            return res.status(401).json({
                message: "Token is invalid or logged out."
            })
        }

        // If verify fails (e.g., token expired), it will throw an error straight to the catch block
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        next()

    } catch (err) {
        // This single catch block now handles JWT errors AND Database errors
        console.error("Auth Middleware Error:", err.message)
        return res.status(401).json({
            message: "Invalid or expired token."
        })
    }
}

module.exports = { authUser }