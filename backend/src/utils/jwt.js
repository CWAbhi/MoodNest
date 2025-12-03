import jwt from 'jsonwebtoken'

export const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )
}

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

export const setTokenCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  })
}

export const clearTokenCookie = (res) => {
  res.clearCookie('token')
}