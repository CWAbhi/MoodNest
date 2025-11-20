import express from 'express'
import { getMoods, logMood, getMoodSummary, moodValidation } from '../controllers/mood.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// All routes require authentication
router.use(authenticate)

router.get('/', getMoods)
router.post('/', moodValidation, logMood)
router.get('/summary', getMoodSummary)

export default router