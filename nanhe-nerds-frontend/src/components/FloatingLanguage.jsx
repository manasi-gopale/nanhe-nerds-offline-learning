import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function FloatingLanguage() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)

  const languages = [
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'hi', label: 'हिंदी', short: 'हि' },
    { code: 'mr', label: 'मराठी', short: 'म' },
  ]

  const changeLanguage = (code) => {
    i18n.changeLanguage(code)
    localStorage.setItem('nn_lang', code)
    setOpen(false)
  }

  const current = languages.find(l => l.code === i18n.language) || languages[0]

  return (
    <div style={{ position: 'fixed', bottom: '32px', left: '32px', zIndex: 9999 }}>
      {open && (
        <div style={{ position: 'absolute', bottom: '56px', left: '0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {languages.map(lang => (
            <button key={lang.code} onClick={() => changeLanguage(lang.code)} style={{
              background: i18n.language === lang.code ? '#FFD700' : '#111820',
              color: i18n.language === lang.code ? '#000' : '#fff',
              border: `3px solid ${i18n.language === lang.code ? '#FFD700' : '#1e2d3d'}`,
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '8px', padding: '10px 14px', cursor: 'pointer',
              boxShadow: '3px 3px 0 #000', whiteSpace: 'nowrap', width: '120px',
            }}>
              {lang.short} — {lang.label}
            </button>
          ))}
        </div>
      )}
      <button onClick={() => setOpen(o => !o)} style={{
        background: open ? '#FFD700' : '#111820',
        color: open ? '#000' : '#FFD700',
        border: '3px solid #FFD700',
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '9px', padding: '10px 14px', cursor: 'pointer',
        boxShadow: '4px 4px 0 #000', minWidth: '80px',
      }}>
        🌐 {current.short}
      </button>
    </div>
  )
}