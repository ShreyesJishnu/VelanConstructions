'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Mounts its children only once the block is near the viewport, and unmounts
 * when it is far away again. Three live WebGL contexts on one page collapsed
 * the frame rate to single digits; a canvas that nobody is looking at should
 * not own a render loop.
 */
export default function LazyCanvas({ children, className, minHeight = 320 }) {
  const ref = useRef(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setNear(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { rootMargin: '200px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={className} style={{ minHeight }}>
      {near ? children : null}
    </div>
  )
}
