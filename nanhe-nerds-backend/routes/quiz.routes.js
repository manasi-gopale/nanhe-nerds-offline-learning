import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
const router = express.Router()
const QUIZZES = {
  'math-1': [
    { id: 1, question: 'What is 1/2 + 1/4?', options: ['3/4', '2/6', '1/2', '1/8'], correct: 0, xp: 50 },
    { id: 2, question: 'What is 25 × 4?', options: ['90', '100', '110', '80'], correct: 1, xp: 50 },
    { id: 3, question: 'What is 15% of 200?', options: ['25', '30', '35', '40'], correct: 1, xp: 75 },
  ],
  'daily': [
    { id: 1, question: 'What is 12 × 12?', options: ['132', '144', '124', '148'], correct: 1, xp: 25 },
    { id: 2, question: 'What is 100 ÷ 4?', options: ['20', '25', '30', '40'], correct: 1, xp: 25 },
  ]
}
router.get('/:id', protect, (req, res) => {
  const quiz = QUIZZES[req.params.id] || QUIZZES['daily']
  res.json(quiz)
})
router.post('/:id/submit', protect, async (req, res) => {
  const { score, xpEarned } = req.body
  res.json({ success: true, score, xpEarned, message: 'Progress saved!' })
})
export default router
