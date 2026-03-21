import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Toast from '../components/Toast'

export default function Landing() {
  const navigate = useNavigate()
  const [toast, setToast] = useState('')
  const starsRef = useRef(null)
  const cloudsRef = useRef(null)

  const showToast = (msg) => setToast(msg)

  useEffect(() => {
    // Stars
    if (starsRef.current) {
      for (let i = 0; i < 80; i++) {
        const s = document.createElement('div')
        const sz = Math.random() * 3 + 1
        s.style.cssText = `
          position:absolute;width:${sz}px;height:${sz}px;
          background:#fff;border-radius:50%;
          left:${Math.random() * 100}%;top:${Math.random() * 100}%;
          animation:twinkle ${Math.random() * 2 + 1.5}s ease-in-out infinite;
          animation-delay:${Math.random() * 3}s;
        `
        starsRef.current.appendChild(s)
      }
    }

    // Scroll reveal
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          e.target.querySelectorAll('.xp-bar-fill[data-w]').forEach(b => b.style.width = b.dataset.w + '%')
          e.target.querySelectorAll('.stat-num[data-count]').forEach(n => {
            if (!n.dataset.done) { n.dataset.done = 1; animCount(n) }
          })
        }
      })
    }, { threshold: 0.1 })
    els.forEach(el => observer.observe(el))

    // XP bars
    document.querySelectorAll('.xp-bar-fill[data-w]').forEach(b => {
      const o = new IntersectionObserver(es => {
        es.forEach(e => { if (e.isIntersecting) { b.style.width = b.dataset.w + '%'; o.disconnect() } })
      }, { threshold: 0.5 })
      const row = b.closest('.xp-row')
      if (row) o.observe(row)
    })

    // Stat counters
    document.querySelectorAll('.stat-num[data-count]').forEach(el => {
      const o = new IntersectionObserver(es => {
        es.forEach(e => {
          if (e.isIntersecting && !el.dataset.done) { el.dataset.done = 1; animCount(el); o.disconnect() }
        })
      }, { threshold: 0.5 })
      const box = el.closest('.stat-box')
      if (box) o.observe(box)
    })

    // Cursor
    const cursor = document.getElementById('cursor')
    const dot = document.getElementById('cursorDot')
    let mx = 0, my = 0, dx = 0, dy = 0
    const onMove = e => { mx = e.clientX; my = e.clientY; if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px' } }
    const animDot = () => { dx += (mx - dx) * 0.15; dy += (my - dy) * 0.15; if (dot) { dot.style.left = dx + 'px'; dot.style.top = dy + 'px' } requestAnimationFrame(animDot) }
    document.addEventListener('mousemove', onMove)
    animDot()

    return () => {
      observer.disconnect()
      document.removeEventListener('mousemove', onMove)
    }
  }, [])

  function animCount(el) {
    const target = parseInt(el.dataset.count)
    const suffix = el.dataset.suffix || (target > 999 ? '+' : '')
    let cur = 0
    const step = Math.ceil(target / 60)
    const iv = setInterval(() => {
      cur = Math.min(cur + step, target)
      el.textContent = (target > 999 ? (cur / 1000).toFixed(1) + 'k' : cur) + suffix
      if (cur >= target) clearInterval(iv)
    }, 25)
  }

  return (
    <>
      <div id="cursor" />
      <div id="cursorDot" />
      <Toast message={toast} onDone={() => setToast('')} />
      <Navbar onToast={showToast} />

      {/* HERO */}
      <section style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', paddingTop: '80px'
      }}>
        {/* BG */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg,#0d3d5c 0%,#1a6e8a 20%,#2a9db5 38%,#1f7a6a 52%,#1a5c36 62%,#0f3a1f 78%,#071a0d 100%)'
        }} />
        <div ref={starsRef} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '45%', zIndex: 1 }} />

        {/* Mountains */}
        <div style={{
          position: 'absolute', bottom: '28%', left: 0, right: 0, height: '240px', zIndex: 3,
          background: 'linear-gradient(180deg,transparent 0%,#0d3d1f 100%)',
          clipPath: 'polygon(0 100%,0 60%,5% 35%,10% 60%,15% 25%,22% 55%,28% 15%,35% 50%,42% 20%,50% 55%,55% 10%,62% 45%,70% 18%,78% 50%,84% 22%,90% 48%,95% 30%,100% 55%,100% 100%)'
        }} />
        <div style={{
          position: 'absolute', bottom: '22%', left: 0, right: 0, height: '200px', zIndex: 4,
          background: 'linear-gradient(180deg,#1a5c2e 0%,#0f3a1a 100%)',
          clipPath: 'polygon(0 100%,0 70%,4% 45%,8% 68%,13% 35%,19% 62%,25% 28%,32% 58%,38% 32%,46% 65%,52% 28%,58% 55%,65% 32%,72% 60%,79% 35%,85% 58%,92% 38%,97% 58%,100% 42%,100% 100%)'
        }} />
        <div style={{
          position: 'absolute', bottom: '12%', left: 0, right: 0, height: '180px', zIndex: 5,
          background: '#0a2210',
          clipPath: 'polygon(0 100%,0 55%,2% 70%,4% 40%,6% 60%,8% 28%,10% 52%,12% 35%,14% 58%,16% 22%,18% 50%,20% 33%,22% 55%,24% 25%,26% 48%,28% 32%,30% 55%,32% 28%,34% 50%,36% 35%,38% 58%,40% 22%,42% 48%,44% 30%,46% 55%,48% 25%,50% 50%,52% 32%,54% 55%,56% 20%,58% 48%,60% 32%,62% 52%,64% 28%,66% 52%,68% 35%,70% 56%,72% 25%,74% 50%,76% 30%,78% 55%,80% 28%,82% 50%,84% 32%,86% 56%,88% 22%,90% 48%,92% 30%,94% 52%,96% 35%,98% 55%,100% 38%,100% 100%)'
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '14%', zIndex: 6,
          background: 'linear-gradient(180deg,#1a4a20 0%,#0d2e12 40%,#07180a 100%)',
          borderTop: '4px solid #2d7a35'
        }} />

        {/* Sprites */}
        <div style={{ position: 'absolute', right: '12%', bottom: '16%', zIndex: 9, fontSize: '80px', animation: 'bob 1.6s ease-in-out infinite', filter: 'drop-shadow(4px 6px 0 #000)' }}>🤖</div>
        <div style={{ position: 'absolute', left: '14%', top: '36%', zIndex: 9, fontSize: '52px', animation: 'bob 2.2s ease-in-out infinite 0.4s', filter: 'drop-shadow(3px 4px 0 #000)' }}>📚</div>
        <div style={{ position: 'absolute', left: '28%', top: '28%', zIndex: 9, fontSize: '28px', animation: 'spin 3s linear infinite' }}>✨</div>
        <div style={{ position: 'absolute', right: '26%', top: '32%', zIndex: 9, fontSize: '20px', animation: 'spin 2s linear infinite reverse' }}>⭐</div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 8, textAlign: 'center', padding: '20px 16px' }}>
          <p style={{ fontSize: '11px', color: '#fff', letterSpacing: '4px', marginBottom: '22px', textShadow: '2px 2px 0 #000', animation: 'blink 1.2s step-end infinite' }}>▶ PLAYER 1: READY</p>
          <h1 style={{ lineHeight: 1.25, marginBottom: '28px' }}>
            <span style={{ fontSize: 'clamp(26px,5vw,54px)', color: '#fff', display: 'block', textShadow: '4px 4px 0 #000', marginBottom: '8px', animation: 'slideL .6s ease-out .3s both' }}>START YOUR</span>
            <span style={{ fontSize: 'clamp(32px,6vw,68px)', color: '#FFD700', display: 'block', textShadow: '4px 4px 0 #7a5c00', lineHeight: 1.15, animation: 'slideR .6s ease-out .5s both' }}>LEARNING<br />ADVENTURE</span>
          </h1>
          <p style={{ fontFamily: "'VT323', monospace", fontSize: '21px', color: '#ddd', lineHeight: 1.8, maxWidth: '580px', margin: '0 auto 36px', textShadow: '2px 2px 0 #000', animation: 'fadeUp .6s ease-out .7s both' }}>
            Making digital education accessible, engaging, and fun for every rural student. No internet required.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', animation: 'fadeUp .6s ease-out .9s both' }}>
            <button className="btn-pixel" onClick={() => { showToast('⚔️ Quest started!'); navigate('/register') }}>▶ START QUEST</button>
            <button className="btn-green" onClick={() => navigate('/login')}>🗺 LOGIN</button>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)', zIndex: 9, fontSize: '8px', color: '#888', letterSpacing: '2px', animation: 'bounce 1.5s ease-in-out infinite' }}>▼ SCROLL DOWN ▼</div>
      </section>

      {/* FEATURES */}
      <section className="section" style={{ background: '#0a0e14', borderTop: '4px solid #1e2d3d', borderBottom: '4px solid #1e2d3d' }}>
        <h2 className="section-title reveal">⚔ POWER-UPS</h2>
        <p className="section-sub reveal">Everything you need to level up your learning</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '24px', maxWidth: '1100px', margin: '0 auto' }}>
          {[
            { icon: '📚', title: 'OFFLINE LESSONS', desc: 'Learn without internet. All content available offline — perfect for rural areas.' },
            { icon: '🏆', title: 'ACHIEVEMENTS', desc: 'Earn XP, badges and level up as you complete quests. Every lesson is a victory.' },
            { icon: '🌍', title: 'LOCAL LANGUAGES', desc: 'Content in Hindi, Marathi and more regional languages so every child feels at home.' },
            
            { icon: '🎮', title: 'GAME-BASED', desc: 'Every lesson is a quest. Children learn by playing — no more boring textbooks.' },
            { icon: '📡', title: 'LORA SYNC', desc: 'Content synced over 15km LoRa network. New lessons pushed without internet.' },
          ].map((f, i) => (
            <div key={i} className="game-card reveal" style={{ transitionDelay: `${i * 0.05}s` }}>
              <span style={{ fontSize: '40px', marginBottom: '16px', display: 'block' }}>{f.icon}</span>
              <h3 style={{ fontSize: '9px', color: '#FFD700', marginBottom: '12px', letterSpacing: '1px' }}>{f.title}</h3>
              <p style={{ fontFamily: "'VT323', monospace", fontSize: '17px', color: '#aaa', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* XP STATS */}
      <section style={{ background: '#07090d', borderBottom: '4px solid #1e2d3d', padding: '70px 40px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="section-title reveal">📊 STUDENT STATS</h2>
          <p className="section-sub reveal">Average skill gains after 30 days</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { label: 'MATHEMATICS', w: 82, cls: '' },
              { label: 'READING', w: 91, cls: 'green' },
              { label: 'SCIENCE', w: 74, cls: '' },
              { label: 'ENGAGEMENT', w: 96, cls: 'red' },
            ].map((bar, i) => (
              <div key={i} className="xp-row reveal" style={{ display: 'flex', alignItems: 'center', gap: '16px', transitionDelay: `${i * 0.1}s` }}>
                <span style={{ fontSize: '7px', color: '#ccc', width: '120px', textAlign: 'right', flexShrink: 0 }}>{bar.label}</span>
                <div className="xp-bar-outer">
                  <div className={`xp-bar-fill ${bar.cls}`} data-w={bar.w} />
                </div>
                <span style={{ fontSize: '7px', color: '#FFD700', width: '36px', flexShrink: 0 }}>{bar.w}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section className="section" style={{ background: '#0a0e14', borderBottom: '4px solid #1e2d3d' }}>
        <h2 className="section-title reveal">🧑‍🤝‍🧑 THE GUILD</h2>
        <p className="section-sub reveal">Join thousands of young learners across rural India</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '28px', flexWrap: 'wrap', marginBottom: '50px' }}>
          {[
            { count: 12000, label: 'STUDENTS' },
            { count: 500, label: 'VILLAGES' },
            { count: 95, label: 'COMPLETION', suffix: '%' },
            { count: 18, label: 'LANGUAGES' },
          ].map((s, i) => (
            <div key={i} className="stat-box reveal" style={{
              background: '#111820', border: '3px solid #1e2d3d', padding: '24px 32px',
              textAlign: 'center', boxShadow: '5px 5px 0 #000', minWidth: '140px',
              transition: 'transform .15s, border-color .15s', transitionDelay: `${i * 0.05}s`,
              cursor: 'default'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = '#FFD700' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = '#1e2d3d' }}>
              <span className="stat-num" data-count={s.count} data-suffix={s.suffix || ''} style={{ display: 'block', fontSize: 'clamp(16px,2.5vw,22px)', color: '#FFD700', marginBottom: '8px' }}>0</span>
              <span style={{ display: 'block', fontSize: '7px', color: '#666', letterSpacing: '2px' }}>{s.label}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>
          {[
            { text: '"Mujhe ab school jaana bahut achha lagta hai! Har din ek naya adventure hai!"', by: '— Priya, Class 5, Nagpur' },
            { text: '"My daughter learned multiplication tables in one week. Unbelievable progress!"', by: '— Parent, Pune district' },
            { text: '"Best learning tool for our village school. Children are excited every single day."', by: '— Teacher, Solapur' },
          ].map((t, i) => (
            <div key={i} className="reveal" style={{
              background: '#111820', border: '3px solid #1e2d3d', padding: '24px',
              boxShadow: '5px 5px 0 #000', transition: 'transform .15s, border-color .15s',
              transitionDelay: `${i * 0.05}s`
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-3px,-3px)'; e.currentTarget.style.borderColor = '#22c55e' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = '#1e2d3d' }}>
              <div style={{ color: '#FFD700', fontSize: '14px', marginBottom: '8px' }}>★★★★★</div>
              <p style={{ fontFamily: "'VT323', monospace", fontSize: '20px', color: '#ddd', lineHeight: 1.6, marginBottom: '12px' }}>{t.text}</p>
              <span style={{ fontSize: '7px', color: '#FFD700' }}>{t.by}</span>
            </div>
          ))}
        </div>
      </section>

      {/* LEARNING MAP */}
      <section style={{ background: '#0a0e14', borderBottom: '4px solid #1e2d3d', padding: '90px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="section-title reveal">🗺 LEARNING MAP</h2>
          <p className="section-sub reveal">Your journey from beginner to champion</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', marginTop: '40px' }} className="reveal">
            {[
              { icon: '🌱', label: 'SPROUT', level: 'Level 1', done: true },
              { icon: '📖', label: 'READER', level: 'Level 5', done: true },
              { icon: '🔢', label: 'COUNTER', level: 'Level 10', active: true },
              { icon: '🔬', label: 'EXPLORER', level: 'Level 20' },
              { icon: '⭐', label: 'CHAMPION', level: 'Level 30' },
            ].map((node, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '64px', height: '64px',
                    border: `4px solid ${node.done ? '#FFD700' : node.active ? '#22c55e' : '#1e2d3d'}`,
                    background: '#111820',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '24px',
                    boxShadow: node.done ? '4px 4px 0 #c8a800' : node.active ? '4px 4px 0 #16a34a' : '4px 4px 0 #000',
                    animation: node.active ? 'pulse 1.2s ease-in-out infinite' : 'none'
                  }}>{node.icon}</div>
                  <span style={{ fontSize: '6px', color: node.done ? '#FFD700' : node.active ? '#22c55e' : '#888', textAlign: 'center', maxWidth: '80px' }}>{node.label}<br />{node.level}</span>
                </div>
                {i < 4 && <div style={{ width: '40px', height: '4px', background: node.done ? '#FFD700' : '#1e2d3d', marginBottom: '30px' }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section" style={{ background: '#07090d', borderBottom: '4px solid #1e2d3d' }}>
        <h2 className="section-title reveal">💰 SELECT PLAN</h2>
        <p className="section-sub reveal">Affordable for every family in India</p>
        <div style={{ display: 'flex', gap: '28px', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '1000px', margin: '0 auto' }}>
          {[
            { tag: 'FREE', tagStyle: { color: '#888', borderColor: '#333', background: '#111' }, name: 'STARTER', price: '₹0', per: '/mo', features: ['10 lessons / month', 'Basic tutor', 'Offline access'], missing: ['Achievements'], btn: 'START FREE', btnCls: 'btn-pixel' },
            { tag: '⭐ POPULAR', tagStyle: { color: '#000', borderColor: '#c8a800', background: '#FFD700' }, name: 'HERO', price: '₹99', per: '/mo', features: ['Unlimited lessons', 'Full tutor', 'Offline access', 'All achievements'], missing: [], btn: 'GO HERO ▶', btnCls: 'btn-pixel', featured: true },
            { tag: '🏫 SCHOOL', tagStyle: { color: '#fff', borderColor: '#16a34a', background: '#22c55e' }, name: 'GUILD', price: '₹499', per: '/mo', features: ['Up to 50 students', 'Teacher dashboard', 'Offline access', 'All achievements', 'Analytics'], missing: [], btn: 'CONTACT US', btnCls: 'btn-green' },
          ].map((p, i) => (
            <div key={i} className="reveal" style={{
              background: '#111820',
              border: `3px solid ${p.featured ? '#FFD700' : '#1e2d3d'}`,
              padding: '32px 26px',
              boxShadow: p.featured ? '6px 6px 0 #c8a800' : '6px 6px 0 #000',
              minWidth: '240px', textAlign: 'center',
              flex: 1, maxWidth: '300px',
              transition: 'transform .15s', transitionDelay: `${i * 0.05}s`
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
              onMouseLeave={e => e.currentTarget.style.transform = ''}>
              <div style={{ display: 'inline-block', fontSize: '7px', padding: '6px 14px', border: '2px solid', marginBottom: '16px', letterSpacing: '2px', ...p.tagStyle }}>{p.tag}</div>
              <h3 style={{ fontSize: '16px', marginBottom: '14px' }}>{p.name}</h3>
              <div style={{ fontSize: '30px', color: '#FFD700', marginBottom: '20px' }}>{p.price}<span style={{ fontSize: '9px', color: '#666' }}>{p.per}</span></div>
              <ul style={{ listStyle: 'none', marginBottom: '28px', textAlign: 'left' }}>
                {p.features.map((f, j) => <li key={j} style={{ fontFamily: "'VT323', monospace", fontSize: '18px', color: '#ccc', padding: '7px 0', borderBottom: '1px dashed #1a2332' }}>✅ {f}</li>)}
                {p.missing.map((f, j) => <li key={j} style={{ fontFamily: "'VT323', monospace", fontSize: '18px', color: '#555', padding: '7px 0', borderBottom: '1px dashed #1a2332' }}>❌ {f}</li>)}
              </ul>
              <button className={p.btnCls} onClick={() => { showToast('Loading...'); navigate('/register') }}>{p.btn}</button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#03050a', borderTop: '4px solid #1e2d3d', padding: '48px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span className="logo-box" style={{ fontSize: '13px' }}>N</span>
            <span style={{ fontSize: '12px' }}>Nanhe Nerds</span>
          </div>
          <p style={{ fontFamily: "'VT323', monospace", fontSize: '18px', color: '#555', marginBottom: '20px' }}>Making rural education a grand adventure.</p>
          <div style={{ display: 'flex', gap: '28px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
            {['About', 'Contact', 'Privacy', 'Terms'].map(l => (
              <a key={l} href="#" style={{ fontSize: '7px', color: '#555', textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color = '#FFD700'}
                onMouseLeave={e => e.target.style.color = '#555'}>{l}</a>
            ))}
          </div>
          <p style={{ fontSize: '6px', color: '#333', letterSpacing: '1px' }}>© 2026 Nanhe Nerds. All rights reserved. Built with ❤️ for rural India.</p>
        </div>
      </footer>
    </>
  )
}
