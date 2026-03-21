import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student', language: 'hi' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    setError('')
    if (!form.name || !form.email || !form.password) { setError('Please fill all fields'); return }
    setLoading(true)
    try {
      const res = await axios.post('/api/auth/register', form)
      login(res.data.user, res.data.token)
      navigate('/home')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#07090d', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: '#111820', border: '3px solid #1e2d3d', padding: '40px', boxShadow: '8px 8px 0 #000', width: '100%', maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span className="logo-box" style={{ fontSize: '16px' }}>N</span>
          <h1 style={{ fontSize: '12px', color: '#FFD700', marginTop: '16px', textShadow: '2px 2px 0 #000' }}>CREATE ACCOUNT</h1>
          <p style={{ fontFamily: "'VT323', monospace", fontSize: '18px', color: '#888', marginTop: '8px' }}>Join thousands of learners across India</p>
        </div>

        {error && (
          <div style={{ background: '#2a0a0a', border: '2px solid #ef4444', padding: '12px', marginBottom: '20px', fontFamily: "'VT323', monospace", fontSize: '16px', color: '#ef4444' }}>
            ❌ {error}
          </div>
        )}

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '8px', color: '#888', display: 'block', marginBottom: '8px' }}>FULL NAME</label>
          <input className="pixel-input" type="text" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '8px', color: '#888', display: 'block', marginBottom: '8px' }}>EMAIL</label>
          <input className="pixel-input" type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '8px', color: '#888', display: 'block', marginBottom: '8px' }}>PASSWORD</label>
          <input className="pixel-input" type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '8px', color: '#888', display: 'block', marginBottom: '8px' }}>I AM A</label>
          <select className="pixel-input" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>

        <div style={{ marginBottom: '28px' }}>
          <label style={{ fontSize: '8px', color: '#888', display: 'block', marginBottom: '8px' }}>LANGUAGE</label>
          <select className="pixel-input" value={form.language} onChange={e => setForm({ ...form, language: e.target.value })}>
            <option value="hi">Hindi</option>
            <option value="en">English</option>
            <option value="mr">Marathi</option>
          </select>
        </div>

        <button className="btn-pixel" style={{ width: '100%', textAlign: 'center' }} onClick={handleSubmit} disabled={loading}>
          {loading ? 'CREATING...' : '▶ START ADVENTURE'}
        </button>

        <div style={{ textAlign: 'center', marginTop: '20px', fontFamily: "'VT323', monospace", fontSize: '18px', color: '#666' }}>
          Already a player?{' '}
          <span style={{ color: '#FFD700', cursor: 'pointer' }} onClick={() => navigate('/login')}>LOGIN</span>
        </div>
      </div>
    </div>
  )
}
