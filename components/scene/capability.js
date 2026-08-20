/** Shared capability checks. Every canvas in the build gates on these — a
 *  device without WebGL must never be shown a dead box with a "drag" caption,
 *  and a visitor who asked for no motion must not get a running render loop. */
export function hasWebGL() {
  if (typeof window === 'undefined') return false
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch {
    return false
  }
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function pickQuality() {
  if (typeof window === 'undefined') return 'low'
  const cores = navigator.hardwareConcurrency || 4
  const mem = navigator.deviceMemory || 4
  const narrow = window.innerWidth < 900
  if (narrow || cores <= 4 || mem <= 4) return 'low'
  if (cores <= 8) return 'medium'
  return 'high'
}
