import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import lessonRoutes from './routes/lesson.routes.js'
import quizRoutes from './routes/quiz.routes.js'
import progressRoutes from './routes/progress.routes.js'
import teacherRoutes from './routes/teacher.routes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected!'))
  .catch(err => console.log('❌ DB Error:', err.message))

app.get('/', (req, res) => res.json({ message: 'Nanhe Nerds API Running! 🚀' }))

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/lessons', lessonRoutes)
app.use('/api/quiz', quizRoutes)
app.use('/api/progress', progressRoutes)
app.use('/api/teacher', teacherRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
