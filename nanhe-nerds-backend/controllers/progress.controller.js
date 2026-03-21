import Progress from '../models/Progress.model.js'
import User from '../models/User.model.js'

export const getProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    const progress = await Progress.find({ user: req.user._id })
    const progressMap = {}
    progress.forEach(p => { progressMap[p.subject] = p.lessonsCompleted })
    res.json({ progress: progressMap, xp: user.xp, level: user.level, streak: user.streak, badges: user.badges })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const updateProgress = async (req, res) => {
  try {
    const { subject, xpEarned } = req.body
    let progress = await Progress.findOne({ user: req.user._id, subject })
    if (!progress) {
      progress = await Progress.create({ user: req.user._id, subject, lessonsCompleted: 1, xpEarned })
    } else {
      progress.lessonsCompleted += 1
      progress.xpEarned += xpEarned
      progress.lastActivity = Date.now()
      await progress.save()
    }
    const user = await User.findById(req.user._id)
    user.xp += xpEarned
    user.level = Math.floor(user.xp / 500) + 1
    await user.save()
    res.json({ progress, xp: user.xp, level: user.level })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
