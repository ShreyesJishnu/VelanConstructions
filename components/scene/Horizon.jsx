'use client'

import { useMemo } from 'react'
import * as THREE from 'three'
import { PALETTE } from './geometry'

/**
 * The horizon the inline scenes share with the main yard: same sky, same haze.
 * Without it these canvases were a flat studio sweep — the exact artifact the
 * direction refuses. A pour happens on site, under the same sun.
 */
export default function GroundAndSky({ density = 0.02 }) {
  const geo = useMemo(() => new THREE.SphereGeometry(90, 20, 14), [])
  return (
    <>
      <mesh geometry={geo}>
        <meshBasicMaterial color={PALETTE.skyLow} side={THREE.BackSide} fog={false} toneMapped={false} />
      </mesh>
      <fogExp2 attach="fog" args={[PALETTE.haze, density]} />
    </>
  )
}
