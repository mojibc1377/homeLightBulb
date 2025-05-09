'use client'

import { useState } from 'react'

export default function Home() {
  const [isOn, setIsOn] = useState(false)
  const [loading, setLoading] = useState(false)

  const toggleLight = async () => {
    const newState = isOn ? 'off' : 'on'
    setLoading(true)

    try {
      // Replace this URL with your LocalTunnel URL
      const res = await fetch('https://tiny-regions-chew.loca.lt/api/lights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: newState }),
        mode: 'cors',
        cache: 'no-store',
      })

      if (!res.ok) throw new Error('Network error')

      const data = await res.json()
      if (data.success) {
        setIsOn(newState === 'on')
      } else {
        alert('Server error: ' + data.error)
      }
    } catch (err) {
      alert(err)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Smart Light Control</h1>
      <button
        onClick={toggleLight}
        disabled={loading}
        style={{
          padding: '1rem 2rem',
          fontSize: '1.2rem',
          backgroundColor: isOn ? '#22c55e' : '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Sending...' : isOn ? 'Turn Off' : 'Turn On'}
      </button>
    </main>
  )
}
