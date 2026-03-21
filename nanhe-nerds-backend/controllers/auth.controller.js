import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.model.js'

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })

export const register = async (req, res) => {
  try {
    const { name, email, password, role, language } = req.body
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' })
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: 'Email already registered' })
    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashed, role, language })
    res.status(201).json({
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, role: user.role, xp: user.xp, level: user.level, streak: user.streak, badges: user.badges }
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid email or password' })
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ message: 'Invalid email or password' })
    user.lastLogin = Date.now()
    await user.save()
    res.json({
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, role: user.role, xp: user.xp, level: user.level, streak: user.streak, badges: user.badges }
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getMe = async (req, res) => {
  res.json(req.user)
}
