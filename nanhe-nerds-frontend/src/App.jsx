import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import SplashScreen from './pages/SplashScreen'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Lesson from './pages/Lesson'
import Profile from './pages/Profile'
import TeacherDashboard from './pages/TeacherDashboard'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/lesson/:id" element={<Lesson />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
