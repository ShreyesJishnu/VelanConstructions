'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { makeTankGeometry, makeCoverGeometry, PALETTE } from './geometry'

// ---------------------------------------------------------------------------
// The yard at 5pm. Rows of cast units on compacted earth, a gantry crane
// crossing behind them, the sun low enough to throw shadows the length of a
// lorry. Everything here is procedural — no downloaded models, no HDRI.
// ---------------------------------------------------------------------------

const ROWS = 6
const PER_ROW = 9
const LOW_ROWS = 3
const LOW_PER_ROW = 6

export default function Yard({ quality = 'high', still = false }) {
  const stackRef = useRef()
  const dustRef = useRef()

  const tankGeo = useMemo(() => makeTankGeometry({ w: 2.4, d: 2.0, h: 1.8, wall: 0.14 }), [])
  const coverGeo = useMemo(() => makeCoverGeometry({ w: 2.4, d: 2.0 }), [])

  const concrete = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: PALETTE.concrete,
      roughness: 0.92,
      metalness: 0,
      flatShading: false,
    }),
    [],
  )

  // Every unit in the yard is the same casting, so it is one instanced draw.
  const { positions, count } = useMemo(() => {
    const p = []
    const rows = quality === 'low' ? LOW_ROWS : ROWS
    const per = quality === 'low' ? LOW_PER_ROW : PER_ROW
    for (let r = 0; r < rows; r++) {
      for (let i = 0; i < per; i++) {
        // stacked two high on the back rows, the way a yard actually stores them
        const stackHeight = r > 0 && (i + r) % 4 !== 0 ? 2 : 1
        for (let s = 0; s < stackHeight; s++) {
          p.push({
            x: -12 + i * 2.9 + (r % 2) * 0.9,
            y: s * 1.93,
            z: -7 - r * 3.6,
            ry: (((r * 7 + i * 13) % 7) - 3) * 0.014,   // deterministic, not random
          })
        }
      }
    }
    return { positions: p, count: p.length }
  }, [quality])

  const dust = useMemo(() => {
    const n = quality === 'low' ? 60 : 260
    const arr = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      // deterministic scatter so the scene is identical on every load
      arr[i * 3] = ((i * 37) % 60) - 30
      arr[i * 3 + 1] = 0.4 + ((i * 17) % 40) / 12
      arr[i * 3 + 2] = ((i * 53) % 44) - 26
    }
    return arr
  }, [quality])

  useFrame((state) => {
    if (still || !dustRef.current) return
    // dust drifts across the light, it does not sparkle
    dustRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.06) * 1.6
    dustRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.04) * 0.3
  })

  return (
    <group>
      {/* --- the light -------------------------------------------------- */}
      <hemisphereLight args={[PALETTE.skyHigh, PALETTE.earth, 0.8]} />
      <directionalLight
        position={[-26, 6.2, 10]}
        intensity={4.2}
        color={PALETTE.sunLight}
        castShadow
        shadow-mapSize={quality === 'high' ? [1024, 1024] : [512, 512]}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-camera-far={60}
        shadow-bias={-0.0006}
      />
      {/* bounce off the earth, warm and weak */}
      <directionalLight position={[12, -2, -8]} intensity={0.28} color={PALETTE.earth} />


      {/* --- the ground ------------------------------------------------- */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color={PALETTE.earth} roughness={1} metalness={0} />
      </mesh>

      {/* --- the stock -------------------------------------------------- */}
      <instancedMesh
        ref={stackRef}
        args={[tankGeo, concrete, count]}
        castShadow
        receiveShadow
        onUpdate={(self) => {
          const m = new THREE.Matrix4()
          const q = new THREE.Quaternion()
          const s = new THREE.Vector3(1, 1, 1)
          positions.forEach((p, i) => {
            q.setFromEuler(new THREE.Euler(0, p.ry, 0))
            m.compose(new THREE.Vector3(p.x, p.y, p.z), q, s)
            self.setMatrixAt(i, m)
          })
          self.instanceMatrix.needsUpdate = true
        }}
      />

      {/* --- the hero unit, alone, closest to camera --------------------- */}
      <group position={[1.6, 0, 2.2]} rotation={[0, 0.62, 0]}>
        <mesh geometry={tankGeo} material={concrete} castShadow receiveShadow />
        <mesh
          geometry={coverGeo}
          material={concrete}
          position={[0, 1.82, 0]}
          rotation={[0, 0.04, 0]}
          castShadow
        />
      </group>

      {/* --- the gantry crane, crossing behind --------------------------- */}
      <Gantry quality={quality} />

      {/* --- a lorry loaded at the gate ---------------------------------- */}
      <Lorry quality={quality} />

      {/* --- dust in the light ------------------------------------------- */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dust, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.055}
          color={PALETTE.dust}
          transparent
          opacity={0.55}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  )
}

function Gantry({ quality }) {
  const steel = useMemo(
    () => new THREE.MeshStandardMaterial({ color: PALETTE.steel, roughness: 0.55, metalness: 0.6 }),
    [],
  )
  const legs = [-16, 16]
  return (
    <group position={[-2, 0, -30]}>
      {legs.map((x) => (
        <mesh key={x} position={[x, 5.5, 0]} material={steel} castShadow>
          <boxGeometry args={[0.6, 11, 0.6]} />
        </mesh>
      ))}
      <mesh position={[0, 11.2, 0]} material={steel} castShadow>
        <boxGeometry args={[33, 0.8, 0.9]} />
      </mesh>
      {/* the trolley and its hook, parked mid-span */}
      <mesh position={[-4, 10.4, 0]} material={steel}>
        <boxGeometry args={[2.2, 0.9, 1.4]} />
      </mesh>
      <mesh position={[-4, 6.6, 0]} material={steel}>
        <cylinderGeometry args={[0.05, 0.05, 7.4, 6]} />
      </mesh>
    </group>
  )
}

function Lorry({ quality }) {
  const body = useMemo(() => new THREE.MeshStandardMaterial({ color: PALETTE.maroon, roughness: 0.6 }), [])
  const bed = useMemo(() => new THREE.MeshStandardMaterial({ color: PALETTE.concreteDark, roughness: 0.8 }), [])
  const tyre = useMemo(() => new THREE.MeshStandardMaterial({ color: PALETTE.shadow, roughness: 0.95 }), [])
  return (
    <group position={[13.5, 0, -13]} rotation={[0, -0.5, 0]} scale={0.92}>
      <mesh position={[-2.4, 1.5, 0]} material={body} castShadow>
        <boxGeometry args={[2.2, 2.1, 2.4]} />
      </mesh>
      <mesh position={[1.1, 0.95, 0]} material={bed} castShadow>
        <boxGeometry args={[5.4, 0.5, 2.5]} />
      </mesh>
      {[-2.6, -1.0, 1.6, 3.0].map((x) => (
        <group key={x}>
          {[-1.15, 1.15].map((z) => (
            <mesh key={z} position={[x, 0.55, z]} rotation={[Math.PI / 2, 0, 0]} material={tyre} castShadow>
              <cylinderGeometry args={[0.55, 0.55, 0.34, 12]} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}
