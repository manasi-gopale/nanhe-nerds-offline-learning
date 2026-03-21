import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const LESSON_DATA = {
  'math-1': {
    title: 'Fractions & Decimals',
    subject: 'Mathematics',
    icon: '🔢',
    xp: 100,
    content: [
      { type: 'text', text: 'A fraction represents a part of a whole. It has two parts: the numerator (top number) and denominator (bottom number).' },
      { type: 'example', title: 'Example', text: '1/2 means 1 part out of 2 equal parts. If you cut a roti into 2 equal pieces and eat one, you ate 1/2!' },
      { type: 'text', text: 'To add fractions with the same denominator, just add the numerators and keep the denominator.' },
      { type: 'example', title: 'Try this!', text: '1/4 + 2/4 = 3/4\n(Add numerators: 1+2=3, keep denominator: 4)' },
      { type: 'text', text: 'A decimal is another way to write a fraction. 1/2 = 0.5, 1/4 = 0.25, 3/4 = 0.75' },
    ],
    quiz: 'math-1'
  }
}

export default function Lesson() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const lesson = LESSON_DATA[id] || LESSON_DATA['math-1']
  const totalSteps = lesson.content.length

  return (
    <div style={{ minHeight: '100vh', background: '#07090d' }}>

      {/* TOP BAR */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 24px', background: '#0d1117', borderBottom: '3px solid #1e2d3d',
        position: 'sticky', top: 0, zIndex: 100
      }}>
        <button style={{ background: 'none', border: 'none', color: '#888', fontFamily: "'VT323',monospace", fontSize: '20px', cursor: 'pointer' }} onClick={() => navigate('/home')}>← Back</button>
        <div style={{ fontSize: '8px', color: '#FFD700' }}>{lesson.subject} · {step + 1}/{totalSteps}</div>
        <div style={{ fontFamily: "'VT323',monospace", fontSize: '18px', color: '#22c55e' }}>+{lesson.xp} XP</div>
      </div>

      {/* PROGRESS */}
      <div style={{ height: '6px', background: '#111', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${((step + 1) / totalSteps) * 100}%`, background: '#FFD700', transition: 'width 0.4s ease' }} />
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '40px 24px' }}>

        {/* TITLE */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>{lesson.icon}</div>
          <h1 style={{ fontSize: 'clamp(16px,3vw,22px)', color: '#FFD700', textShadow: '2px 2px 0 #000' }}>{lesson.title}</h1>
        </div>

        {/* CONTENT CARD */}
        <div style={{ background: '#111820', border: '3px solid #1e2d3d', padding: '32px', boxShadow: '5px 5px 0 #000', marginBottom: '24px', minHeight: '200px' }}>
          {lesson.content[step].type === 'example' && (
            <div style={{ fontSize: '8px', color: '#FFD700', letterSpacing: '2px', marginBottom: '12px' }}>{lesson.content[step].title}</div>
          )}
          <p style={{
            fontFamily: "'VT323',monospace",
            fontSize: '22px', color: '#ddd', lineHeight: 1.8,
            whiteSpace: 'pre-line'
          }}>
            {lesson.content[step].text}
          </p>
          {lesson.content[step].type === 'example' && (
            <div style={{ marginTop: '16px', background: '#0d1117', border: '2px solid #1e2d3d', padding: '12px', fontFamily: "'VT323',monospace", fontSize: '18px', color: '#22c55e' }}>
              💡 Tip: Practice with real objects around you!
            </div>
          )}
        </div>

        {/* NAVIGATION */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="btn-green" style={{ fontSize: '9px', padding: '12px 20px', opacity: step === 0 ? 0.3 : 1 }}
            onClick={() => step > 0 && setStep(s => s - 1)} disabled={step === 0}>← PREV</button>

          <div style={{ display: 'flex', gap: '8px' }}>
            {lesson.content.map((_, i) => (
              <div key={i} style={{ width: '10px', height: '10px', background: i <= step ? '#FFD700' : '#1e2d3d', border: '2px solid #333', cursor: 'pointer' }} onClick={() => setStep(i)} />
            ))}
          </div>

          {step < totalSteps - 1 ? (
            <button className="btn-pixel" style={{ fontSize: '9px', padding: '12px 20px' }} onClick={() => setStep(s => s + 1)}>NEXT →</button>
          ) : (
            <button className="btn-pixel" style={{ fontSize: '9px', padding: '12px 20px' }} onClick={() => navigate(`/quiz/${lesson.quiz}`)}>
              START QUIZ →
            </button>
          )}
        </div>

      </div>
    </div>
  )
}
