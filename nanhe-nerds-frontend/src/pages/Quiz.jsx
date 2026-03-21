import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const SAMPLE_QUESTIONS = [
  { id: 1, question: 'What is 1/2 + 1/4?', options: ['3/4', '2/6', '1/2', '1/8'], correct: 0, xp: 50 },
  { id: 2, question: 'What is 25 × 4?', options: ['90', '100', '110', '80'], correct: 1, xp: 50 },
  { id: 3, question: 'What is the square root of 81?', options: ['7', '8', '9', '10'], correct: 2, xp: 75 },
  { id: 4, question: 'What is 15% of 200?', options: ['25', '30', '35', '40'], correct: 1, xp: 75 },
  { id: 5, question: 'Simplify: 3/6', options: ['1/3', '1/2', '2/3', '3/4'], correct: 1, xp: 100 },
]

export default function Quiz() {
  const { id } = useParams()
  const { user, token } = useAuth()
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [totalXP, setTotalXP] = useState(0)
  const [done, setDone] = useState(false)
  const [lives, setLives] = useState(3)
  const [timeLeft, setTimeLeft] = useState(30)
  const timerRef = useRef(null)

  const questions = SAMPLE_QUESTIONS
  const q = questions[current]

  useEffect(() => {
    if (!answered && !done) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timerRef.current)
            handleAnswer(-1)
            return 0
          }
          return t - 1
        })
      }, 1000)
    }
    return () => clearInterval(timerRef.current)
  }, [current, answered])

  const handleAnswer = (idx) => {
    if (answered) return
    clearInterval(timerRef.current)
    setSelected(idx)
    setAnswered(true)
    if (idx === q.correct) {
      setScore(s => s + 1)
      setTotalXP(x => x + q.xp)
    } else {
      setLives(l => l - 1)
    }
  }

  const handleNext = () => {
    if (lives <= 0 || current >= questions.length - 1) {
      setDone(true)
      return
    }
    setCurrent(c => c + 1)
    setSelected(null)
    setAnswered(false)
    setTimeLeft(30)
  }

  const getOptionStyle = (idx) => {
    const base = {
      background: '#0d1117', border: '3px solid #1e2d3d',
      padding: '14px 18px', cursor: answered ? 'default' : 'pointer',
      fontFamily: "'VT323',monospace", fontSize: '20px',
      textAlign: 'left', width: '100%', color: '#ddd',
      transition: 'all 0.15s', marginBottom: '10px',
      display: 'block', boxShadow: '3px 3px 0 #000'
    }
    if (!answered) return { ...base, cursor: 'pointer' }
    if (idx === q.correct) return { ...base, background: '#0e3320', borderColor: '#22c55e', color: '#22c55e' }
    if (idx === selected && idx !== q.correct) return { ...base, background: '#2a0a0a', borderColor: '#ef4444', color: '#ef4444' }
    return { ...base, opacity: 0.4 }
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <div style={{ minHeight: '100vh', background: '#07090d', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ background: '#111820', border: '3px solid #FFD700', padding: '48px', textAlign: 'center', boxShadow: '8px 8px 0 #000', maxWidth: '480px', width: '100%' }}>
          <div style={{ fontSize: '80px', marginBottom: '16px', animation: 'spin 2s linear infinite' }}>{pct >= 80 ? '🏆' : pct >= 50 ? '⭐' : '📚'}</div>
          <h1 style={{ fontSize: '16px', color: '#FFD700', marginBottom: '12px', textShadow: '2px 2px 0 #000' }}>
            {pct >= 80 ? 'QUEST COMPLETE!' : pct >= 50 ? 'GOOD TRY!' : 'KEEP LEARNING!'}
          </h1>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', margin: '24px 0' }}>
            {[
              { label: 'SCORE', value: `${score}/${questions.length}` },
              { label: 'XP EARNED', value: `+${totalXP}` },
              { label: 'ACCURACY', value: `${pct}%` },
              { label: 'LIVES LEFT', value: '❤️'.repeat(lives) || '💀' },
            ].map((s, i) => (
              <div key={i} style={{ background: '#0d1117', border: '2px solid #1e2d3d', padding: '16px' }}>
                <div style={{ fontSize: '7px', color: '#888', marginBottom: '8px' }}>{s.label}</div>
                <div style={{ fontFamily: "'VT323',monospace", fontSize: '24px', color: '#FFD700' }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-pixel" onClick={() => { setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setTotalXP(0); setDone(false); setLives(3); setTimeLeft(30) }}>TRY AGAIN</button>
            <button className="btn-green" onClick={() => navigate('/home')}>← HOME</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#07090d', padding: '24px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        {/* TOP BAR */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ fontFamily: "'VT323',monospace", fontSize: '20px', color: '#ef4444' }}>
            {'❤️'.repeat(lives)}{'🖤'.repeat(Math.max(0, 3 - lives))}
          </div>
          <div style={{ fontSize: '8px', color: '#FFD700' }}>Q {current + 1}/{questions.length}</div>
          <div style={{ fontFamily: "'VT323',monospace", fontSize: '20px', color: timeLeft <= 10 ? '#ef4444' : '#22c55e' }}>⏱ 0:{String(timeLeft).padStart(2, '0')}</div>
        </div>

        {/* PROGRESS */}
        <div style={{ height: '8px', background: '#111', border: '2px solid #1e2d3d', overflow: 'hidden', marginBottom: '28px' }}>
          <div style={{ height: '100%', width: `${((current) / questions.length) * 100}%`, background: '#FFD700', transition: 'width 0.4s ease' }} />
        </div>

        {/* QUESTION */}
        <div style={{ background: '#111820', border: '3px solid #1e2d3d', padding: '24px', boxShadow: '5px 5px 0 #000', marginBottom: '20px' }}>
          <div style={{ fontSize: '8px', color: '#FFD700', marginBottom: '8px', letterSpacing: '2px' }}>MATHEMATICS — LEVEL {current + 1}</div>
          <p style={{ fontFamily: "'VT323',monospace", fontSize: '24px', color: '#fff', lineHeight: 1.5 }}>{q.question}</p>
          <div style={{ fontFamily: "'VT323',monospace", fontSize: '14px', color: '#22c55e', marginTop: '8px' }}>+{q.xp} XP for correct answer</div>
        </div>

        {/* OPTIONS */}
        <div>
          {q.options.map((opt, idx) => (
            <button key={idx} style={getOptionStyle(idx)} onClick={() => handleAnswer(idx)}>
              <span style={{ color: '#FFD700', marginRight: '12px' }}>{['A)', 'B)', 'C)', 'D)'][idx]}</span>
              {opt}
              {answered && idx === q.correct && <span style={{ float: 'right' }}>✓</span>}
              {answered && idx === selected && idx !== q.correct && <span style={{ float: 'right' }}>✗</span>}
            </button>
          ))}
        </div>

        {/* FEEDBACK + NEXT */}
        {answered && (
          <div style={{ marginTop: '16px' }}>
            <div style={{
              background: selected === q.correct ? '#0e3320' : '#2a0a0a',
              border: `3px solid ${selected === q.correct ? '#22c55e' : '#ef4444'}`,
              padding: '14px 18px', marginBottom: '16px',
              fontFamily: "'VT323',monospace", fontSize: '20px',
              color: selected === q.correct ? '#22c55e' : '#ef4444'
            }}>
              {selected === q.correct ? `✅ Correct! +${q.xp} XP earned!` : `❌ Wrong! The answer was: ${q.options[q.correct]}`}
            </div>
            <button className="btn-pixel" style={{ width: '100%', textAlign: 'center' }} onClick={handleNext}>
              {current >= questions.length - 1 || lives <= 1 ? 'SEE RESULTS →' : 'NEXT QUESTION →'}
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
