const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const fetchuser = (req, res, next) => {
    const authToken = req.header('auth-token')

    if(!authToken) return res.status(400).json({ msg: "Invalid Token" })
    try {
        const data = jwt.verify(authToken, JWT_SECRET)
        req.user = data.user
        next()
    } catch (e) {
        return res.status(400).json({msg: "Please Authenticate Using Valid Token"})
    }
}

module.exports = fetchuser