import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import User from '../models/User.model.js'
const router = express.Router()
router.get('/profile', protect, async (req, res) => {
  res.json(req.user)
})
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, { name: req.body.name, language: req.body.language }, { new: true }).select('-password')
    res.json(user)
  } catch (err) { res.status(500).json({ message: err.message }) }
})
export default router
