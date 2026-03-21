import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
const router = express.Router()
const LESSONS = [
  { id: 'math-1', subject: 'math', title: 'Fractions & Decimals', xp: 100, language: 'en' },
  { id: 'math-2', subject: 'math', title: 'Multiplication Tables', xp: 100, language: 'en' },
  { id: 'science-1', subject: 'science', title: 'Plants & Photosynthesis', xp: 100, language: 'en' },
  { id: 'hindi-1', subject: 'hindi', title: 'वर्णमाला', xp: 100, language: 'hi' },
]
router.get('/', protect, (req, res) => res.json(LESSONS))
router.get('/:id', protect, (req, res) => {
  const lesson = LESSONS.find(l => l.id === req.params.id)
  if (!lesson) return res.status(404).json({ message: 'Lesson not found' })
  res.json(lesson)
})
export default router
