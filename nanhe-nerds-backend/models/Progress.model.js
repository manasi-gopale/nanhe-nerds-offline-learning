import mongoose from 'mongoose'

const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  lessonsCompleted: { type: Number, default: 0 },
  quizzesDone: { type: Number, default: 0 },
  xpEarned: { type: Number, default: 0 },
  lastActivity: { type: Date, default: Date.now },
}, { timestamps: true })

export default mongoose.model('Progress', progressSchema)
