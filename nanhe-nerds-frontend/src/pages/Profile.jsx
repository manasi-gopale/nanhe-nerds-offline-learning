import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const BADGES = [
  { icon: '🌱', name: 'First Lesson', earned: true },
  { icon: '🔥', name: '3 Day Streak', earned: true },
  { icon: '⭐', name: 'Quiz Master', earned: false },
  { icon: '🏆', name: 'Top Scorer', earned: false },
  { icon: '📚', name: 'Bookworm', earned: false },
  { icon: '🚀', name: 'Speed Learner', earned: false },
]

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) { navigate('/login'); return null }

  return (
    <div style={{ minHeight: '100vh', background: '#07090d' }}>
      <div style={{ padding: '14px 24px', background: '#0d1117', borderBottom: '3px solid #1e2d3d', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button style={{ background: 'none', border: 'none', color: '#888', fontFamily: "'VT323',monospace", fontSize: '20px', cursor: 'pointer' }} onClick={() => navigate('/home')}>← Back</button>
        <span style={{ fontSize: '11px', color: '#FFD700' }}>PLAYER PROFILE</span>
      </div>

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '32px 24px' }}>

        {/* PROFILE CARD */}
        <div style={{ background: '#111820', border: '3px solid #FFD700', padding: '32px', textAlign: 'center', boxShadow: '6px 6px 0 #000', marginBottom: '24px' }}>
          <div style={{ width: '80px', height: '80px', background: '#0d1117', border: '3px solid #FFD700', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', margin: '0 auto 16px', boxShadow: '4px 4px 0 #000' }}>🎮</div>
          <h2 style={{ fontSize: '14px', color: '#FFD700', marginBottom: '8px' }}>{user.name}</h2>
          <p style={{ fontFamily: "'VT323',monospace", fontSize: '18px', color: '#888', marginBottom: '4px' }}>{user.email}</p>
          <p style={{ fontFamily: "'VT323',monospace", fontSize: '18px', color: '#22c55e' }}>Level {user.level || 1} · {user.role === 'teacher' ? 'Teacher' : 'Student'}</p>
        </div>

        {/* STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          {[
            { icon: '⭐', label: 'Total XP', value: user.xp || 0 },
            { icon: '🔥', label: 'Streak', value: `${user.streak || 0} days` },
            { icon: '🏅', label: 'Rank', value: 'Bronze' },
            { icon: '✅', label: 'Lessons Done', value: 4 },
          ].map((s, i) => (
            <div key={i} style={{ background: '#111820', border: '3px solid #1e2d3d', padding: '20px', textAlign: 'center', boxShadow: '4px 4px 0 #000' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{s.icon}</div>
              <div style={{ fontFamily: "'Press Start 2P',monospace", fontSize: '14px', color: '#FFD700' }}>{s.value}</div>
              <div style={{ fontFamily: "'VT323',monospace", fontSize: '16px', color: '#666', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* BADGES */}
        <h3 style={{ fontSize: '10px', color: '#FFD700', marginBottom: '16px' }}>🏆 BADGES</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(100px,1fr))', gap: '12px', marginBottom: '32px' }}>
          {BADGES.map((b, i) => (
            <div key={i} style={{ background: '#111820', border: `3px solid ${b.earned ? '#FFD700' : '#1e2d3d'}`, padding: '16px', textAlign: 'center', boxShadow: '3px 3px 0 #000', opacity: b.earned ? 1 : 0.4 }}>
              <div style={{ fontSize: '28px', marginBottom: '6px' }}>{b.icon}</div>
              <div style={{ fontFamily: "'VT323',monospace", fontSize: '14px', color: b.earned ? '#FFD700' : '#555' }}>{b.name}</div>
            </div>
          ))}
        </div>

        <button className="btn-pixel" style={{ width: '100%', textAlign: 'center', background: '#1e2d3d', color: '#aaa', boxShadow: '4px 4px 0 #000' }}
          onClick={() => { logout(); navigate('/landing') }}>LOGOUT</button>

      </div>
    </div>
  )
}
