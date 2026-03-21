import { useEffect, useState } from 'react'

export default function Toast({ message, onDone }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (message) {
      setShow(true)
      const t = setTimeout(() => { setShow(false); setTimeout(onDone, 400) }, 2800)
      return () => clearTimeout(t)
    }
  }, [message])

  return (
    <div className={`toast ${show ? 'show' : ''}`}>
      {message}
    </div>
  )
}
