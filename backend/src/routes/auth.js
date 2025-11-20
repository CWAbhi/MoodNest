import express from 'express'
import { signup, login, logout, getMe, signupValidation, loginValidation } from '../controllers/auth.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

router.post('/signup', signupValidation, signup)
router.post('/login', loginValidation, login)
router.post('/logout', logout)
router.get('/me', authenticate, getMe)

export default router