'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { makeTankGeometry, tankForCapacity, PALETTE } from './geometry'
import { specSheets } from '../../lib/site'
import { hasWebGL, prefersReducedMotion } from './capability'
import GroundAndSky from './Horizon'
import LazyCanvas from './LazyCanvas'
import './configurator.css'

// ---------------------------------------------------------------------------
// Six published capacities, each with a real downloadable spec sheet. Choosing
// one resizes the unit against a 1.7 m figure so the volume becomes a size you
// can stand next to.
//
// HONESTY: the capacities and the spec sheets are real and published. The
// proportions of the box are a plausible transportable shape derived from the
// volume — they are NOT published dimensions, and nothing on screen states a
// width, depth or height as spec.
// ---------------------------------------------------------------------------

export default function Configurator() {
  const [index, setIndex] = useState(2)
  const [still, setStill] = useState(false)
  const uid = useId().replace(/:/g, '')
  const sheet = specSheets[index]

  const [webgl, setWebgl] = useState(true)
  useEffect(() => {
    setStill(prefersReducedMotion())
    setWebgl(hasWebGL())
  }, [])

  return (
    <div className="cfg">
      {webgl ? (
      <LazyCanvas className="cfg-stage" minHeight={340}>
        <Canvas frameloop="demand" dpr={[1, 1.4]} camera={{ fov: 40, position: [6.2, 3.4, 7.2] }}>
          <GroundAndSky />
          <hemisphereLight args={[PALETTE.skyHigh, PALETTE.earth, 0.8]} />
          <directionalLight position={[-9, 5.5, 5]} intensity={3.4} color={PALETTE.sunLight} />
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[60, 60]} />
            <meshStandardMaterial color={PALETTE.earth} roughness={1} />
          </mesh>
          <SizedTank litres={sheet.litres} still={still} />
          <PersonForScale />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={0.5}
            maxPolarAngle={1.44}
            makeDefault
          />
        </Canvas>
        <p className="cfg-hint label">Drag to look around · figure is 1.7 m</p>
      </LazyCanvas>
      ) : null}

      <div className="cfg-panel">
        <p className="label">Published capacity</p>
        <p className="figure cfg-figure">{sheet.label}</p>

        <label className="visually-hidden" htmlFor={`cap-${uid}`}>Choose a capacity</label>
        <input
          id={`cap-${uid}`}
          className="cfg-range"
          type="range"
          min={0}
          max={specSheets.length - 1}
          step={1}
          value={index}
          onChange={(e) => setIndex(Number(e.target.value))}
          aria-valuetext={sheet.label}
        />

        <ul className="cfg-caps">
          {specSheets.map((s, i) => (
            <li key={s.file}>
              <button
                type="button"
                className={`cfg-cap${i === index ? ' is-current' : ''}`}
                aria-pressed={i === index}
                onClick={() => setIndex(i)}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>

        <p className="cfg-note" aria-live="polite">
          {sheet.label} precast water tank, cast in one mould.
        </p>
        <p className="cfg-caveat label">
          Capacity is the published figure. The shape shown is indicative — the
          specification sheet carries the dimensions.
        </p>

        <a className="action action--call cfg-dl" href={`/uploads/catalog/${encodeURIComponent(sheet.file)}`} download>
          Download spec sheet ({sheet.size})
        </a>
      </div>
    </div>
  )
}

function SizedTank({ litres, still }) {
  const invalidate = useThree((s) => s.invalidate)
  const mesh = useRef()
  const target = useMemo(() => tankForCapacity(litres), [litres])

  const geo = useMemo(() => makeTankGeometry({ w: 1, d: 0.83, h: 0.62, wall: 0.05 }), [])
  const mat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: PALETTE.concrete, roughness: 0.93, metalness: 0 }),
    [],
  )
  const scale = useRef(new THREE.Vector3(1, 1, 1))

  useEffect(() => { invalidate() }, [litres, invalidate])

  useFrame((_, delta) => {
    if (!mesh.current) return
    const want = new THREE.Vector3(target.w, target.w, target.w)
    const k = still ? 1 : 1 - Math.pow(0.006, delta)
    scale.current.lerp(want, k)
    mesh.current.scale.copy(scale.current)
    if (scale.current.distanceTo(want) > 0.002) invalidate()
  })

  return <mesh ref={mesh} geometry={geo} material={mat} />
}

/** A 1.7 m figure, blocked out. It is the only honest way to read a volume. */
function PersonForScale() {
  const mat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: PALETTE.maroon, roughness: 0.9 }),
    [],
  )
  return (
    <group position={[2.6, 0, 1.9]}>
      <mesh position={[0, 0.46, 0]} material={mat}>
        <boxGeometry args={[0.34, 0.92, 0.22]} />
      </mesh>
      <mesh position={[0, 1.06, 0]} material={mat}>
        <boxGeometry args={[0.44, 0.34, 0.24]} />
      </mesh>
      <mesh position={[0, 1.38, 0]} material={mat}>
        <sphereGeometry args={[0.12, 12, 10]} />
      </mesh>
    </group>
  )
}
