import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const STUDENTS = [
  { name: 'Priya Sharma', level: 7, xp: 650, streak: 5, completion: 72 },
  { name: 'Rahul Kumar', level: 4, xp: 320, streak: 2, completion: 45 },
  { name: 'Anita Devi', level: 9, xp: 890, streak: 12, completion: 88 },
  { name: 'Suresh Yadav', level: 3, xp: 210, streak: 1, completion: 30 },
  { name: 'Kavya Patel', level: 6, xp: 540, streak: 7, completion: 65 },
]

export default function TeacherDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('overview')

  if (!user) { navigate('/login'); return null }

  return (
    <div style={{ minHeight: '100vh', background: '#07090d' }}>

      {/* TOP NAV */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 32px', background: '#0d1117', borderBottom: '3px solid #22c55e', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="logo-box" style={{ fontSize: '14px' }}>N</span>
          <span style={{ fontSize: '10px', color: '#22c55e' }}>TEACHER PANEL</span>
        </div>
        <button style={{ background: 'none', border: '2px solid #1e2d3d', color: '#aaa', fontFamily: "'VT323',monospace", fontSize: '18px', padding: '6px 14px', cursor: 'pointer' }} onClick={() => navigate('/home')}>← Dashboard</button>
      </nav>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>

        {/* HEADER */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '14px', color: '#22c55e', textShadow: '2px 2px 0 #000', marginBottom: '8px' }}>Welcome, {user.name}</h1>
          <p style={{ fontFamily: "'VT323',monospace", fontSize: '18px', color: '#888' }}>Monitor your students' progress and learning journey</p>
        </div>

        {/* TABS */}
        <div style={{ display: 'flex', gap: '0', marginBottom: '28px', borderBottom: '3px solid #1e2d3d' }}>
          {['overview', 'students', 'upload'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              background: tab === t ? '#111820' : 'none',
              border: 'none', borderBottom: tab === t ? '3px solid #22c55e' : '3px solid transparent',
              color: tab === t ? '#22c55e' : '#888',
              fontFamily: "'Press Start 2P',monospace", fontSize: '8px',
              padding: '12px 20px', cursor: 'pointer', marginBottom: '-3px',
              textTransform: 'uppercase', letterSpacing: '1px'
            }}>{t}</button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {tab === 'overview' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '16px', marginBottom: '32px' }}>
              {[
                { icon: '👥', label: 'Total Students', value: STUDENTS.length },
                { icon: '📈', label: 'Avg Completion', value: '60%' },
                { icon: '🔥', label: 'Active Today', value: 3 },
                { icon: '⭐', label: 'Total XP Given', value: '2610' },
              ].map((s, i) => (
                <div key={i} style={{ background: '#111820', border: '3px solid #1e2d3d', padding: '20px', textAlign: 'center', boxShadow: '4px 4px 0 #000' }}>
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>{s.icon}</div>
                  <div style={{ fontFamily: "'Press Start 2P',monospace", fontSize: '16px', color: '#22c55e' }}>{s.value}</div>
                  <div style={{ fontFamily: "'VT323',monospace", fontSize: '16px', color: '#666', marginTop: '4px' }}>{s.label}</div>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '10px', color: '#FFD700', marginBottom: '16px' }}>📊 CLASS PROGRESS</h3>
            {STUDENTS.map((s, i) => (
              <div key={i} style={{ background: '#111820', border: '3px solid #1e2d3d', padding: '16px 20px', marginBottom: '10px', boxShadow: '3px 3px 0 #000', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '40px', height: '40px', background: '#0d1117', border: '2px solid #1e2d3d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>🎮</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontFamily: "'VT323',monospace", fontSize: '20px', color: '#fff' }}>{s.name}</span>
                    <span style={{ fontFamily: "'VT323',monospace", fontSize: '16px', color: '#888' }}>Lv.{s.level} · ⭐{s.xp} XP · 🔥{s.streak}d</span>
                  </div>
                  <div style={{ height: '6px', background: '#0d1117', border: '1px solid #1e2d3d', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${s.completion}%`, background: s.completion >= 70 ? '#22c55e' : s.completion >= 40 ? '#FFD700' : '#ef4444', transition: 'width 1s ease' }} />
                  </div>
                  <div style={{ fontFamily: "'VT323',monospace", fontSize: '14px', color: '#666', marginTop: '3px' }}>{s.completion}% complete</div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* STUDENTS TAB */}
        {tab === 'students' && (
          <div>
            <h3 style={{ fontSize: '10px', color: '#FFD700', marginBottom: '16px' }}>👥 ALL STUDENTS</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '16px' }}>
              {STUDENTS.map((s, i) => (
                <div key={i} style={{ background: '#111820', border: '3px solid #1e2d3d', padding: '20px', boxShadow: '4px 4px 0 #000' }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px', textAlign: 'center' }}>🧒</div>
                  <h4 style={{ fontFamily: "'VT323',monospace", fontSize: '22px', color: '#fff', textAlign: 'center', marginBottom: '8px' }}>{s.name}</h4>
                  <div style={{ fontFamily: "'VT323',monospace", fontSize: '16px', color: '#888', textAlign: 'center', marginBottom: '12px' }}>Level {s.level} Student</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontFamily: "'VT323',monospace", fontSize: '16px', color: '#FFD700' }}>⭐ {s.xp} XP</span>
                    <span style={{ fontFamily: "'VT323',monospace", fontSize: '16px', color: '#22c55e' }}>🔥 {s.streak} days</span>
                  </div>
                  <div style={{ height: '8px', background: '#0d1117', border: '2px solid #1e2d3d', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${s.completion}%`, background: '#22c55e' }} />
                  </div>
                  <div style={{ fontFamily: "'VT323',monospace", fontSize: '14px', color: '#666', marginTop: '4px', textAlign: 'right' }}>{s.completion}%</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* UPLOAD TAB */}
        {tab === 'upload' && (
          <div style={{ maxWidth: '500px' }}>
            <h3 style={{ fontSize: '10px', color: '#FFD700', marginBottom: '16px' }}>📤 UPLOAD CONTENT</h3>
            <div style={{ background: '#111820', border: '3px dashed #1e2d3d', padding: '48px', textAlign: 'center', marginBottom: '20px', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#FFD700'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#1e2d3d'}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
              <p style={{ fontFamily: "'VT323',monospace", fontSize: '20px', color: '#888' }}>Drag & drop lesson files here</p>
              <p style={{ fontFamily: "'VT323',monospace", fontSize: '16px', color: '#555', marginTop: '8px' }}>PDF, MP4, or JSON format</p>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '8px', color: '#888', display: 'block', marginBottom: '8px' }}>LESSON TITLE</label>
              <input className="pixel-input" type="text" placeholder="e.g. Multiplication Tables" />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '8px', color: '#888', display: 'block', marginBottom: '8px' }}>SUBJECT</label>
              <select className="pixel-input">
                <option>Mathematics</option>
                <option>Science</option>
                <option>Hindi</option>
                <option>English</option>
              </select>
            </div>
            <button className="btn-pixel" style={{ width: '100%', textAlign: 'center' }}>📤 UPLOAD LESSON</button>
          </div>
        )}

      </div>
    </div>
  )
}
