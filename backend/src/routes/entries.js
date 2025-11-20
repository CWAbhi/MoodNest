import express from 'express'
import { 
  getEntries, 
  getEntry, 
  createEntry, 
  updateEntry, 
  deleteEntry, 
  entryValidation 
} from '../controllers/entries.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// All routes require authentication
router.use(authenticate)

router.get('/', getEntries)
router.get('/:id', getEntry)
router.post('/', entryValidation, createEntry)
router.put('/:id', entryValidation, updateEntry)
router.delete('/:id', deleteEntry)

export default router