import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import { getProgress, updateProgress } from '../controllers/progress.controller.js'
const router = express.Router()
router.get('/', protect, getProgress)
router.post('/update', protect, updateProgress)
export default router
