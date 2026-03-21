import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const SUBJECTS = [
  { id: 'math', icon: '🔢', name: 'Mathematics', color: '#FFD700', lessons: 24 },
  { id: 'science', icon: '🔬', name: 'Science', color: '#22c55e', lessons: 18 },
  { id: 'hindi', icon: '📖', name: 'Hindi', color: '#3b82f6', lessons: 20 },
  { id: 'english', icon: '🌍', name: 'English', color: '#a855f7', lessons: 16 },
  { id: 'history', icon: '🏛️', name: 'History', color: '#f97316', lessons: 14 },
  { id: 'geography', icon: '🗺️', name: 'Geography', color: '#06b6d4', lessons: 12 },
]

export default function Home() {
  const { user, logout, token } = useAuth()
  const navigate = useNavigate()
  const [progress, setProgress] = useState({})
  const [xp, setXp] = useState(user?.xp || 0)
  const [level, setLevel] = useState(user?.level || 1)
  const [streak, setStreak] = useState(user?.streak || 0)
  const [badges, setBadges] = useState(user?.badges || 0)
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 17) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')

    fetchProgress()
  }, [])

  const fetchProgress = async () => {
    try {
      const res = await axios.get('/api/progress', { headers: { Authorization: `Bearer ${token}` } })
      setProgress(res.data.progress || {})
      setXp(res.data.xp || 0)
      setLevel(res.data.level || 1)
      setStreak(res.data.streak || 0)
      setBadges(res.data.badges || 0)
    } catch (err) {
      console.log('Progress fetch failed, using local data')
    }
  }

  const xpForNextLevel = level * 500
  const xpPercent = Math.min((xp / xpForNextLevel) * 100, 100)

  return (
    <div style={{ minHeight: '100vh', background: '#07090d' }}>

      {/* NAVBAR */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 32px', background: 'rgba(7,9,13,0.95)',
        borderBottom: '3px solid #FFD700', position: 'sticky', top: 0, zIndex: 100,
        backdropFilter: 'blur(8px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="logo-box" style={{ fontSize: '14px' }}>N</span>
          <span style={{ fontSize: '11px', color: '#fff' }}>Nanhe Nerds</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontFamily: "'VT323',monospace", fontSize: '18px', color: '#FFD700' }}>⭐ {xp} XP</span>
          <span style={{ fontFamily: "'VT323',monospace", fontSize: '18px', color: '#22c55e' }}>🔥 {streak} days</span>
          {user?.role === 'teacher' && (
            <button className="btn-green" style={{ fontSize: '8px', padding: '8px 14px' }} onClick={() => navigate('/teacher')}>TEACHER PANEL</button>
          )}
          <button style={{
            background: 'none', border: '2px solid #1e2d3d', color: '#aaa',
            fontFamily: "'Press Start 2P',monospace", fontSize: '7px', padding: '8px 12px', cursor: 'pointer'
          }} onClick={() => { logout(); navigate('/landing') }}>LOGOUT</button>
        </div>
      </nav>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>

        {/* GREETING BOX */}
        <div style={{
          background: '#111820', border: '3px solid #1e2d3d',
          padding: '24px 28px', marginBottom: '28px',
          display: 'flex', alignItems: 'center', gap: '20px',
          boxShadow: '5px 5px 0 #000'
        }}>
          <div style={{ fontSize: '56px', animation: 'bob 2s ease-in-out infinite' }}>🤖</div>
          <div style={{
            background: '#0d1117', border: '3px solid #1e2d3d',
            padding: '14px 20px', flex: 1, position: 'relative'
          }}>
            <div style={{
              position: 'absolute', left: '-12px', top: '50%', transform: 'translateY(-50%)',
              width: 0, height: 0,
              borderTop: '8px solid transparent', borderBottom: '8px solid transparent',
              borderRight: '12px solid #1e2d3d'
            }} />
            <p style={{ fontFamily: "'VT323',monospace", fontSize: '20px', color: '#ddd' }}>
              {greeting}, <span style={{ color: '#FFD700' }}>{user?.name}</span>! Wish you peace and joy today ^^
            </p>
            <p style={{ fontFamily: "'VT323',monospace", fontSize: '16px', color: '#666', marginTop: '4px' }}>
              Level {level} · {xp} / {xpForNextLevel} XP to next level
            </p>
          </div>
        </div>

        {/* STATS ROW */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '16px', marginBottom: '32px' }}>
          {[
            { icon: '⭐', label: 'Total XP', value: xp },
            { icon: '🏅', label: 'Rank', value: level < 5 ? 'Bronze' : level < 10 ? 'Silver' : 'Gold' },
            { icon: '🏆', label: 'Badges', value: badges },
            { icon: '🔥', label: 'Day Streak', value: streak },
          ].map((s, i) => (
            <div key={i} style={{
              background: '#111820', border: '3px solid #1e2d3d',
              padding: '20px', textAlign: 'center', boxShadow: '4px 4px 0 #000'
            }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{s.icon}</div>
              <div style={{ fontFamily: "'Press Start 2P',monospace", fontSize: '16px', color: '#FFD700' }}>{s.value}</div>
              <div style={{ fontFamily: "'VT323',monospace", fontSize: '16px', color: '#666', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* XP BAR */}
        <div style={{ background: '#111820', border: '3px solid #1e2d3d', padding: '20px 24px', marginBottom: '32px', boxShadow: '4px 4px 0 #000' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '8px', color: '#888' }}>LEVEL {level}</span>
            <span style={{ fontSize: '8px', color: '#888' }}>LEVEL {level + 1}</span>
          </div>
          <div style={{ height: '16px', background: '#0d1117', border: '2px solid #1e2d3d', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${xpPercent}%`, background: '#FFD700', boxShadow: '0 0 10px #FFD700', transition: 'width 1s ease' }} />
          </div>
          <div style={{ textAlign: 'center', marginTop: '6px', fontFamily: "'VT323',monospace", fontSize: '16px', color: '#888' }}>
            {xp} / {xpForNextLevel} XP
          </div>
        </div>

        {/* CONTINUE LEARNING */}
        <h2 style={{ fontSize: '12px', color: '#FFD700', marginBottom: '20px', textShadow: '2px 2px 0 #000' }}>Jump back in</h2>
        <div style={{
          background: 'linear-gradient(135deg,#0d3d5c,#1a6e8a,#1f7a6a,#1a5c36)',
          border: '3px solid #1e2d3d', padding: '24px', marginBottom: '32px',
          boxShadow: '5px 5px 0 #000', position: 'relative', overflow: 'hidden',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', minHeight: '160px'
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.3, fontSize: '120px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '20px', pointerEvents: 'none' }}>🌴</div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '8px', color: '#aaa', letterSpacing: '2px', marginBottom: '8px' }}>COURSE</div>
            <h3 style={{ fontSize: 'clamp(18px,4vw,28px)', color: '#fff', marginBottom: '8px', textShadow: '2px 2px 0 #000' }}>Mathematics</h3>
            <p style={{ fontFamily: "'VT323',monospace", fontSize: '18px', color: '#ccc', marginBottom: '16px' }}>Next: Fractions & Decimals</p>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button className="btn-pixel" style={{ fontSize: '9px', padding: '12px 20px' }} onClick={() => navigate('/lesson/math-1')}>Continue Learning</button>
              <button style={{ background: 'none', border: 'none', color: '#ccc', fontFamily: "'VT323',monospace", fontSize: '18px', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/lesson/math-1')}>View course</button>
            </div>
          </div>
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'right' }}>
            <div style={{ fontFamily: "'VT323',monospace", fontSize: '16px', color: '#aaa', marginBottom: '4px' }}>4%</div>
            <div style={{ width: '120px', height: '8px', background: 'rgba(0,0,0,0.5)', border: '2px solid #333', overflow: 'hidden' }}>
              <div style={{ width: '4%', height: '100%', background: '#FFD700' }} />
            </div>
          </div>
        </div>

        {/* SUBJECTS GRID */}
        <h2 style={{ fontSize: '12px', color: '#FFD700', marginBottom: '20px', textShadow: '2px 2px 0 #000' }}>📚 All Subjects</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '16px', marginBottom: '32px' }}>
          {SUBJECTS.map((s) => {
            const done = progress[s.id] || 0
            const pct = Math.round((done / s.lessons) * 100)
            return (
              <div key={s.id} style={{
                background: '#111820', border: `3px solid #1e2d3d`,
                padding: '20px', boxShadow: '4px 4px 0 #000',
                cursor: 'pointer', transition: 'all 0.15s'
              }}
                onClick={() => navigate(`/lesson/${s.id}-1`)}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-3px,-3px)'; e.currentTarget.style.borderColor = s.color; e.currentTarget.style.boxShadow = `7px 7px 0 #000` }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = '#1e2d3d'; e.currentTarget.style.boxShadow = '4px 4px 0 #000' }}>
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'VT323',monospace", fontSize: '22px', color: '#fff', marginBottom: '8px' }}>{s.name}</h3>
                <p style={{ fontFamily: "'VT323',monospace", fontSize: '15px', color: '#666', marginBottom: '12px' }}>{s.lessons} lessons</p>
                <div style={{ height: '6px', background: '#0d1117', border: '1px solid #1e2d3d', overflow: 'hidden', marginBottom: '6px' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: s.color, transition: 'width 1s ease' }} />
                </div>
                <div style={{ fontFamily: "'VT323',monospace", fontSize: '14px', color: s.color }}>{pct}% complete</div>
              </div>
            )
          })}
        </div>

        {/* DAILY CHALLENGE */}
        <div style={{ background: '#111820', border: '3px solid #1e2d3d', padding: '24px', boxShadow: '5px 5px 0 #000' }}>
          <div style={{ fontSize: '8px', color: '#888', letterSpacing: '2px', marginBottom: '8px' }}>
            DAILY CHALLENGE · {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: '2-digit' })}
          </div>
          <h3 style={{ fontFamily: "'VT323',monospace", fontSize: '24px', color: '#fff', marginBottom: '12px' }}>
            Math Speed Round 🚀
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ display: 'flex' }}>
              {['👤', '👤', '👤'].map((a, i) => (
                <div key={i} style={{ width: '28px', height: '28px', background: '#0d1117', border: '2px solid #1e2d3d', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', marginLeft: i > 0 ? '-8px' : 0 }}>{a}</div>
              ))}
            </div>
            <span style={{ fontFamily: "'VT323',monospace", fontSize: '16px', color: '#888' }}>+21 completed today</span>
          </div>
          <button className="btn-pixel" style={{ width: '100%', textAlign: 'center', fontSize: '11px' }} onClick={() => navigate('/quiz/daily')}>
            Start 25XP
          </button>
        </div>

      </div>
    </div>
  )
}
