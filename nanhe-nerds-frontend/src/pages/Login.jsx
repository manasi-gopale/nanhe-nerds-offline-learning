import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await axios.post('/api/auth/login', form)
      login(res.data.user, res.data.token)
      navigate('/home')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#07090d', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: '#111820', border: '3px solid #1e2d3d', padding: '40px', boxShadow: '8px 8px 0 #000', width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span className="logo-box" style={{ fontSize: '16px' }}>N</span>
          <h1 style={{ fontSize: '14px', color: '#FFD700', marginTop: '16px', textShadow: '2px 2px 0 #000' }}>PLAYER LOGIN</h1>
          <p style={{ fontFamily: "'VT323', monospace", fontSize: '18px', color: '#888', marginTop: '8px' }}>Enter your credentials to continue</p>
        </div>

        {error && (
          <div style={{ background: '#2a0a0a', border: '2px solid #ef4444', padding: '12px', marginBottom: '20px', fontFamily: "'VT323', monospace", fontSize: '16px', color: '#ef4444' }}>
            ❌ {error}
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '8px', color: '#888', display: 'block', marginBottom: '8px' }}>EMAIL</label>
          <input
            className="pixel-input"
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          />
        </div>

        <div style={{ marginBottom: '28px' }}>
          <label style={{ fontSize: '8px', color: '#888', display: 'block', marginBottom: '8px' }}>PASSWORD</label>
          <input
            className="pixel-input"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          />
        </div>

        <button className="btn-pixel" style={{ width: '100%', textAlign: 'center' }} onClick={handleSubmit} disabled={loading}>
          {loading ? 'LOADING...' : '▶ LOGIN'}
        </button>

        <div style={{ textAlign: 'center', marginTop: '20px', fontFamily: "'VT323', monospace", fontSize: '18px', color: '#666' }}>
          New player?{' '}
          <span style={{ color: '#FFD700', cursor: 'pointer' }} onClick={() => navigate('/register')}>CREATE ACCOUNT</span>
        </div>

        <div style={{ textAlign: 'center', marginTop: '8px', fontFamily: "'VT323', monospace", fontSize: '16px', color: '#555', cursor: 'pointer' }} onClick={() => navigate('/landing')}>
          ← Back to home
        </div>
      </div>
    </div>
  )
}
