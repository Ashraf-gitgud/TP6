const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
      return res.status(403).json({ message: "Token is required to authenticate" })
    }
    try {
/*       const decoded = jwt.verify(token, 'secret')
      req.query.id = decoded.id */
      next()
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" })
    }
  }

module.exports = verifyToken
