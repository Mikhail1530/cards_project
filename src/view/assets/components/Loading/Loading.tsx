import { useState, useEffect } from 'react'
import './Loading.scss'

export const Loading = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay (you can replace this with your actual loading process)
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 0) // Change 2000 to the actual loading time in milliseconds

    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className={`loading-container ${loading ? 'visible' : 'hidden'}`}>
      <div className="loader"></div>
      <p>Loading...</p>
    </div>
  )
}
