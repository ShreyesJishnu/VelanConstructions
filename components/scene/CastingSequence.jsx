'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { makeTankGeometry, makeCoverGeometry, PALETTE } from './geometry'
import { hasWebGL, prefersReducedMotion } from './capability'
import GroundAndSky from './Horizon'
import LazyCanvas from './LazyCanvas'
import './casting-sequence.css'

// ---------------------------------------------------------------------------
// The single-mould claim, demonstrated. One unit, six stages, driven by a scrub.
// The pour is a real clipping plane travelling up the geometry — the concrete
// fills the mould, it does not fade in.
// ---------------------------------------------------------------------------

const STAGES = [
  { key: 'mould',   name: 'Mould',   note: 'One steel mould is closed and oiled. Nothing here is assembled from panels.' },
  { key: 'pour',    name: 'Pour',    note: 'Reinforcement is set and the whole unit is poured in a single continuous pour.' },
  { key: 'cure',    name: 'Cure',    note: 'It cures in the mould. Walls and base come out as one piece of concrete.' },
  { key: 'strike',  name: 'Strike',  note: 'The mould is struck. There is no joint anywhere for water to find.' },
  { key: 'lift',    name: 'Lift',    note: 'Cast-in hooks take the whole unit off the bed in one lift.' },
  { key: 'deliver', name: 'Deliver', note: 'It arrives finished. Site work is a delivery and a set, not a construction.' },
]

const W = 2.4, D = 2.0, H = 1.8

export default function CastingSequence() {
  const [stage, setStage] = useState(0)
  const [still, setStill] = useState(false)
  const uid = useId().replace(/:/g, '')
  const current = STAGES[stage]

  const [webgl, setWebgl] = useState(true)
  useEffect(() => {
    setStill(prefersReducedMotion())
    setWebgl(hasWebGL())
  }, [])

  return (
    <figure className="cast">
      {webgl ? (
      <LazyCanvas className="cast-stage" minHeight={280}>
        <Canvas
          frameloop="demand"
          dpr={[1, 1.4]}
          camera={{ fov: 38, position: [4.6, 2.9, 5.2] }}
          gl={{ antialias: true, localClippingEnabled: true }}
          onCreated={({ gl }) => {
            gl.localClippingEnabled = true
            gl.toneMapping = THREE.ACESFilmicToneMapping
          }}
        >
          <GroundAndSky />
          <hemisphereLight args={[PALETTE.skyHigh, PALETTE.earth, 0.8]} />
          <directionalLight position={[-9, 5, 4]} intensity={3.4} color={PALETTE.sunLight} />
          <Unit stage={stage} still={still} />
          <Ground />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={0.6}
            maxPolarAngle={1.42}
            makeDefault
          />
        </Canvas>
        <p className="cast-hint label">Drag to look around</p>
      </LazyCanvas>
      ) : null}

      <figcaption className="cast-controls">
        <label className="label" htmlFor={`scrub-${uid}`}>
          Stage {stage + 1} of {STAGES.length} — drag, or use arrow keys
        </label>
        <input
          id={`scrub-${uid}`}
          className="cast-range"
          type="range"
          min={0}
          max={STAGES.length - 1}
          step={1}
          value={stage}
          onChange={(e) => setStage(Number(e.target.value))}
          aria-valuetext={current.name}
        />
        <ol className="cast-steps">
          {STAGES.map((s, i) => (
            <li key={s.key}>
              <button
                type="button"
                className={`cast-step${i === stage ? ' is-current' : ''}`}
                aria-current={i === stage ? 'step' : undefined}
                onClick={() => setStage(i)}
              >
                <span className="cast-step-no">{String(i + 1).padStart(2, '0')}</span>
                <span className="cast-step-name">{s.name}</span>
              </button>
            </li>
          ))}
        </ol>
        <p className="cast-note" aria-live="polite">{current.note}</p>
      </figcaption>
    </figure>
  )
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial color={PALETTE.earth} roughness={1} />
    </mesh>
  )
}

function Unit({ stage, still }) {
  const invalidate = useThree((s) => s.invalidate)
  const tankGeo = useMemo(() => makeTankGeometry({ w: W, d: D, h: H, wall: 0.14 }), [])
  const coverGeo = useMemo(() => makeCoverGeometry({ w: W, d: D }), [])

  // the pour: concrete is clipped away above this plane, and the plane rises
  const clip = useMemo(() => new THREE.Plane(new THREE.Vector3(0, -1, 0), 0), [])
  const concrete = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: PALETTE.concrete,
      roughness: 0.94,
      metalness: 0,
      clippingPlanes: [clip],
      clipShadows: true,
    }),
    [clip],
  )
  const steel = useMemo(
    () => new THREE.MeshStandardMaterial({ color: PALETTE.steel, roughness: 0.45, metalness: 0.75, transparent: true }),
    [],
  )

  // four panel materials, made once — cloning inside render leaked a material
  // per panel per stage change and reset the strike animation every time
  // hinge sits on the bed; the panel hangs above it, so striking the mould
  // drops each panel outward from its foot instead of pivoting through the cast
  const panels = useMemo(() => ([
    { hinge: [0, 0, D / 2 + 0.09],  offset: [0, H / 2, 0], size: [W + 0.3, H, 0.06], axis: 'x', dir: 1 },
    { hinge: [0, 0, -D / 2 - 0.09], offset: [0, H / 2, 0], size: [W + 0.3, H, 0.06], axis: 'x', dir: -1 },
    { hinge: [W / 2 + 0.09, 0, 0],  offset: [0, H / 2, 0], size: [0.06, H, D + 0.3], axis: 'z', dir: -1 },
    { hinge: [-W / 2 - 0.09, 0, 0], offset: [0, H / 2, 0], size: [0.06, H, D + 0.3], axis: 'z', dir: 1 },
  ]), [])
  const panelMats = useMemo(() => panels.map(() => steel.clone()), [panels, steel])
  useEffect(() => () => panelMats.forEach((m) => m.dispose()), [panelMats])

  const unit = useRef()
  const mould = useRef()
  const sling = useRef()
  const cover = useRef()
  const fill = useRef(0)      // 0..1 how full the pour is
  const lift = useRef(0)      // 0..1 how far off the bed

  const wantFill = stage === 0 ? 0 : 1
  const wantLift = stage === 4 ? 1 : 0
  const mouldOpen = stage >= 3

  useEffect(() => { invalidate() }, [stage, invalidate])

  useFrame((_, delta) => {
    const k = still ? 1 : 1 - Math.pow(0.004, delta)
    fill.current += (wantFill - fill.current) * k
    lift.current += (wantLift - lift.current) * k

    // clip plane travels from the base to just over the rim
    clip.constant = fill.current * (H + 0.12)

    if (unit.current) unit.current.position.y = lift.current * 1.35
    if (sling.current) sling.current.visible = stage === 4
    if (cover.current) {
      cover.current.visible = stage === 5
    }
    const settling =
      Math.abs(wantFill - fill.current) > 0.001 || Math.abs(wantLift - lift.current) > 0.001
    if (settling) invalidate()

    if (mould.current) {
      mould.current.children.forEach((hinge, i) => {
        const p = panels[i]
        const target = mouldOpen ? p.dir * 1.35 : 0
        const axis = p.axis
        hinge.rotation[axis] += (target - hinge.rotation[axis]) * k
        const mat = panelMats[i]
        mat.opacity += ((mouldOpen ? 0 : 0.95) - mat.opacity) * k
      })
    }
  })

  return (
    <group position={[0, 0, 0]}>
      <group ref={unit}>
        <mesh geometry={tankGeo} material={concrete} />
        <mesh ref={cover} geometry={coverGeo} material={concrete} position={[0, H + 0.02, 0]} visible={false} />
        <Rebar visible={stage === 1} />
      </group>

      {/* the steel mould: four panels hinged at the bed */}
      <group ref={mould}>
        {panels.map((p, i) => (
          <group key={i} position={p.hinge}>
            <mesh position={p.offset} material={panelMats[i]} castShadow>
              <boxGeometry args={p.size} />
            </mesh>
          </group>
        ))}
      </group>
      {/* the sling, only while it is in the air */}
      <group ref={sling} visible={false}>
        <mesh position={[0, 4.4, 0]} material={steel}>
          <boxGeometry args={[0.12, 0.5, 0.12]} />
        </mesh>
        <Line from={[0, 4.2, 0]} to={[-0.7, 3.2, 0]} />
        <Line from={[0, 4.2, 0]} to={[0.7, 3.2, 0]} />
      </group>
    </group>
  )
}

function Line({ from, to }) {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute([...from, ...to], 3))
    return g
  }, [from, to])
  return (
    <line geometry={geo}>
      <lineBasicMaterial color="#3b3630" />
    </line>
  )
}

function Rebar({ visible }) {
  const mat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: PALETTE.maroon, roughness: 0.8, metalness: 0.35 }),
    [],
  )
  const bars = useMemo(() => {
    const out = []
    for (let i = 0; i < 6; i++) out.push({ x: -W / 2 + 0.24 + i * 0.38, y: H / 2, z: 0 })
    return out
  }, [])
  return (
    <group visible={visible}>
      {bars.map((b, i) => (
        <mesh key={i} position={[b.x, b.y, b.z]} material={mat}>
          <cylinderGeometry args={[0.012, 0.012, H - 0.1, 5]} />
        </mesh>
      ))}
    </group>
  )
}
