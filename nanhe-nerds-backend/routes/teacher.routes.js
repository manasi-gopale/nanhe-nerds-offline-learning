import express from 'express'
import { protect, teacherOnly } from '../middleware/auth.middleware.js'
import User from '../models/User.model.js'
import Progress from '../models/Progress.model.js'
const router = express.Router()
router.get('/students', protect, teacherOnly, async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password')
    res.json(students)
  } catch (err) { res.status(500).json({ message: err.message }) }
})
router.get('/stats', protect, teacherOnly, async (req, res) => {
  try {
    const total = await User.countDocuments({ role: 'student' })
    res.json({ totalStudents: total })
  } catch (err) { res.status(500).json({ message: err.message }) }
})
export default router
