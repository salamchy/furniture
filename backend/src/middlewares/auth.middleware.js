import jwt from 'jsonwebtoken'

export const authenticate = (req, res, next) => {
  try {
    const token =
      req.cookies?.authToken || req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res
        .status(401)
        .json({ error: 'Access Denied. No token provided.' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // attach user payload
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

// Role-based authorization
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: 'Access denied. Unauthorized role.' })
    }
    next()
  }
}
