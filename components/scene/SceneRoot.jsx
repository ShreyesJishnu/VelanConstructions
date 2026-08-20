'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import Yard from './Yard'
import { hasWebGL, prefersReducedMotion, pickQuality } from './capability'
import { PALETTE } from './geometry'

// ---------------------------------------------------------------------------
// The spine. One yard, one canvas, fixed behind every page. Navigation does not
// swap a scene — it moves the camera to a different part of the same yard.
// The DOM above it is the product; this is the place the product lives in.
// ---------------------------------------------------------------------------

// position, target — chosen so the DOM plate on each page never sits over the
// busiest part of the frame.
const STATIONS = {
  // Eye height, standing IN the aisle between the rows — not off the plot
  // looking at it. The hero unit sits at x 1.6, right of frame centre.
  '/':          { pos: [-1.4, 1.62, 4.2],  look: [2.2, 1.35, -9] },
  '/products':  { pos: [4.4, 1.55, 6.4],   look: [1.6, 1.05, 2.2] },
  '/projects':  { pos: [-5.5, 2.4, -4],    look: [-2, 6.5, -30] },
  '/about':     { pos: [2, 9.5, 16],       look: [0, 0.5, -14] },
  '/brochure':  { pos: [3.8, 1.5, 5.6],    look: [1.6, 1.0, 2.2] },
  '/contact':   { pos: [11.5, 1.7, 2.5],   look: [7, 1.4, -12] },
}

const DEFAULT_STATION = STATIONS['/']

export default function SceneRoot() {
  const [state, setState] = useState({ ready: false, webgl: true, quality: 'high', still: false })

  useEffect(() => {
    setState({ ready: true, webgl: hasWebGL(), quality: pickQuality(), still: prefersReducedMotion() })
  }, [])

  if (!state.ready) return <ScenePoster />
  if (!state.webgl) return <ScenePoster />

  return (
    <div className="scene-layer" aria-hidden="true">
      <Canvas
        dpr={state.quality === 'low' ? [1, 1] : [1, 1.5]}
        shadows={state.quality === 'high' ? 'soft' : state.quality === 'medium'}
        gl={{ antialias: state.quality !== 'low', powerPreference: 'high-performance' }}
        camera={{ fov: 42, near: 0.1, far: 220, position: DEFAULT_STATION.pos }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.32
        }}
      >
        <SkyDome />
        <fogExp2 attach="fog" args={[PALETTE.haze, 0.014]} />
        <Yard quality={state.quality} still={state.still} />
        <CameraSpine still={state.still} />
      </Canvas>
    </div>
  )
}

/* The sky: one inverted dome carrying the 5pm ramp in vertex colour. No shader,
   no HDRI download, and it sits correctly behind the yard at every camera angle. */
function SkyDome() {
  const geo = useMemo(() => {
    const g = new THREE.SphereGeometry(160, 24, 16)
    const pos = g.attributes.position
    const colors = new Float32Array(pos.count * 3)
    const zenith = new THREE.Color(PALETTE.skyHigh)
    const horizon = new THREE.Color(PALETTE.skyLow)
    const below = new THREE.Color(PALETTE.earth)
    const c = new THREE.Color()
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i) / 160
      if (y >= 0) c.copy(horizon).lerp(zenith, Math.pow(y, 0.55))
      else c.copy(horizon).lerp(below, Math.min(1, -y * 3))
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return g
  }, [])
  return (
    <mesh geometry={geo}>
      <meshBasicMaterial vertexColors side={THREE.BackSide} fog={false} toneMapped={false} />
    </mesh>
  )
}

function CameraSpine({ still }) {
  const { camera } = useThree()
  const pathname = usePathname()
  const scroll = useRef(0)

  const station = useMemo(() => STATIONS[pathname] || DEFAULT_STATION, [pathname])

  const target = useRef(new THREE.Vector3(...station.pos))
  const look = useRef(new THREE.Vector3(...station.look))
  const current = useRef(new THREE.Vector3(...station.pos))
  const currentLook = useRef(new THREE.Vector3(...station.look))

  useEffect(() => {
    target.current.set(...station.pos)
    look.current.set(...station.look)
    if (still) {
      // reduced motion: arrive immediately rather than fly across the yard
      current.current.copy(target.current)
      currentLook.current.copy(look.current)
    }
  }, [station, still])

  useEffect(() => {
    let max = 1
    const measure = () => {
      max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    }
    // cached: reading scrollHeight inside the scroll handler forces layout on
    // every scroll frame, which is the classic way to make a 3D page stutter
    const onScroll = () => { scroll.current = window.scrollY / max }
    measure()
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
    }
  }, [])

  useFrame((_, delta) => {
    const k = still ? 1 : 1 - Math.pow(0.0015, delta)

    // scrolling walks the camera further into the yard — the page and the place
    // move together instead of the scene sitting still behind a scrolling page.
    const drift = still ? 0 : scroll.current
    const wanted = target.current.clone()
    wanted.z -= drift * 7
    wanted.y += drift * 1.6

    current.current.lerp(wanted, k)
    currentLook.current.lerp(look.current, k)
    camera.position.copy(current.current)
    camera.lookAt(currentLook.current)
  })

  return null
}

/* No WebGL, or the scene has not booted yet: a real photograph of the real
   yard. The site is fully usable from here — nothing lives only in the canvas. */
function ScenePoster() {
  return (
    <img
      className="scene-poster"
      src="/velan-mist/images-mist/images/webimages/precast-concrete-company.webp"
      alt=""
      aria-hidden="true"
      width="1920"
      height="800"
    />
  )
}
