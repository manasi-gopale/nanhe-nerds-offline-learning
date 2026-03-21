import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const MESSAGES = ['LOADING QUEST...', 'SPAWNING WORLD...', 'PREPARING LESSONS...', 'PLAYER 1 READY!']

export default function SplashScreen() {
  const navigate = useNavigate()
  const barRef = useRef(null)
  const statusRef = useRef(null)

  useEffect(() => {
    let pct = 0
    const interval = setInterval(() => {
      pct += Math.random() * 18 + 6
      if (pct >= 100) {
        pct = 100
        clearInterval(interval)
        setTimeout(() => navigate('/landing'), 500)
      }
      if (barRef.current) barRef.current.style.width = pct + '%'
      if (statusRef.current) {
        statusRef.current.textContent = MESSAGES[Math.min(Math.floor(pct / 26), 3)]
      }
    }, 200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0,
      backgroundColor: '#F5EFD0',
      backgroundImage: 'linear-gradient(rgba(200,185,130,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(200,185,130,.4) 1px, transparent 1px)',
      backgroundSize: '52px 52px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '16px',
      zIndex: 9000,
    }}>
      <div style={{
        width: '220px', height: '180px',
        background: '#fff',
        border: '3px solid #ddd',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        boxShadow: '4px 4px 0 #ccc'
      }}>
        <img src="/logo.png" alt="Nanhe Nerds" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      <h1 style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: 'clamp(18px, 4vw, 32px)',
        color: '#E8A020',
        letterSpacing: '6px',
        textShadow: '2px 2px 0 #A06010, 4px 4px 0 #5a3500',
        textAlign: 'center',
      }}>NANHE NERDS</h1>

      <p ref={statusRef} style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '10px', color: '#888', letterSpacing: '2px'
      }}>LOADING QUEST...</p>

      <div style={{ width: '260px', height: '12px', background: '#ddd', border: '2px solid #bbb', borderRadius: '2px', overflow: 'hidden' }}>
        <div ref={barRef} style={{ height: '100%', width: '0%', background: '#E8A020', borderRadius: '2px', transition: 'width 0.2s ease' }} />
      </div>
    </div>
  )
}
