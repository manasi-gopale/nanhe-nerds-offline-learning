import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar({ onToast }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/landing')
  }

  return (
    <nav className="navbar" style={{ borderBottomColor: scrolled ? '#FFD700' : '#1e2d3d' }}>
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }} onClick={() => navigate('/landing')}>
        <img src="/logo.png" alt="Nanhe Nerds" style={{ width: '40px', height: '40px', objectFit: 'cover', border: '2px solid #FFD700' }} />
        <span style={{ fontSize: '13px', color: '#fff', letterSpacing: '1px' }}>Nanhe Nerds</span>
      </a>

      <ul style={{
        display: menuOpen ? 'flex' : 'flex',
        listStyle: 'none', gap: '32px',
        '@media (max-width: 768px)': { display: menuOpen ? 'flex' : 'none' }
      }}>
        {['FEATURES', 'LANGUAGES', 'COMMUNITY', 'PRICING'].map(link => (
          <li key={link}>
            <a href={`#${link.toLowerCase()}`} style={{ color: '#aaa', textDecoration: 'none', fontSize: '8px', letterSpacing: '1px', transition: 'color .2s' }}
              onMouseEnter={e => e.target.style.color = '#FFD700'}
              onMouseLeave={e => e.target.style.color = '#aaa'}>{link}</a>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {user ? (
          <>
            <button className="btn-green" style={{ fontSize: '8px', padding: '10px 16px' }} onClick={() => navigate('/home')}>DASHBOARD</button>
            <button className="btn-pixel" style={{ fontSize: '8px', padding: '10px 16px', background: '#333', color: '#fff' }} onClick={handleLogout}>LOGOUT</button>
          </>
        ) : (
          <button className="btn-pixel" onClick={() => navigate('/register')}>PLAY NOW</button>
        )}
      </div>
    </nav>
  )
}
