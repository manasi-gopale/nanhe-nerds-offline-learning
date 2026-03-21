import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher'], default: 'student' },
  language: { type: String, enum: ['hi', 'en', 'mr', 'pa'], default: 'hi' },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  streak: { type: Number, default: 0 },
  badges: { type: Number, default: 0 },
  lastLogin: { type: Date, default: Date.now },
}, { timestamps: true })

export default mongoose.model('User', userSchema)
