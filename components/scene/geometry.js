import * as THREE from 'three'

// ---------------------------------------------------------------------------
// The product, built as geometry rather than modelled by hand.
// A Velan Concast unit is cast in ONE mould: walls and base are continuous, and
// the only opening is the top. That is the whole sales claim, so the geometry
// has to be honest about it — this is a single extruded shape with a hole,
// never a box assembled from six planes.
// ---------------------------------------------------------------------------

/**
 * A precast tank: outer box, inner void, open top, chamfered top rim.
 * Returns ONE BufferGeometry, centred on its base at y = 0.
 */
export function makeTankGeometry({ w = 2.4, d = 2.0, h = 1.8, wall = 0.12 } = {}) {
  const outer = new THREE.Shape()
  outer.moveTo(-w / 2, -d / 2)
  outer.lineTo(w / 2, -d / 2)
  outer.lineTo(w / 2, d / 2)
  outer.lineTo(-w / 2, d / 2)
  outer.closePath()

  const inner = new THREE.Path()
  const iw = w / 2 - wall
  const id = d / 2 - wall
  inner.moveTo(-iw, -id)
  inner.lineTo(iw, -id)
  inner.lineTo(iw, id)
  inner.lineTo(-iw, id)
  inner.closePath()

  // the walls: one continuous ring, extruded
  const walls = new THREE.ExtrudeGeometry(
    (() => { outer.holes.push(inner); return outer })(),
    { depth: h, bevelEnabled: true, bevelSize: 0.012, bevelThickness: 0.012, bevelSegments: 1 },
  )
  walls.rotateX(-Math.PI / 2)
  walls.translate(0, h, 0)

  // the base slab, cast in the same pour
  const base = new THREE.BoxGeometry(w, wall, d)
  base.translate(0, wall / 2, 0)

  const merged = mergeGeometries([walls, base])
  merged.computeVertexNormals()
  merged.userData.size = { w, d, h }
  return merged
}

/** Minimal merge so we do not pull in the whole BufferGeometryUtils addon. */
function mergeGeometries(geoms) {
  const position = []
  const normal = []
  const uv = []
  for (const g of geoms) {
    const p = g.attributes.position
    const n = g.attributes.normal
    const u = g.attributes.uv
    const index = g.index
    const push = (i) => {
      position.push(p.getX(i), p.getY(i), p.getZ(i))
      normal.push(n ? n.getX(i) : 0, n ? n.getY(i) : 1, n ? n.getZ(i) : 0)
      uv.push(u ? u.getX(i) : 0, u ? u.getY(i) : 0)
    }
    if (index) for (let i = 0; i < index.count; i++) push(index.getX(i))
    else for (let i = 0; i < p.count; i++) push(i)
    g.dispose()
  }
  const out = new THREE.BufferGeometry()
  out.setAttribute('position', new THREE.Float32BufferAttribute(position, 3))
  out.setAttribute('normal', new THREE.Float32BufferAttribute(normal, 3))
  out.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2))
  return out
}

/** A cover slab with a manhole opening — how a sump actually ships. */
export function makeCoverGeometry({ w = 2.4, d = 2.0, t = 0.1, hole = 0.6 } = {}) {
  const slab = new THREE.Shape()
  slab.moveTo(-w / 2, -d / 2)
  slab.lineTo(w / 2, -d / 2)
  slab.lineTo(w / 2, d / 2)
  slab.lineTo(-w / 2, d / 2)
  slab.closePath()
  const opening = new THREE.Path()
  opening.absarc(0, 0, hole / 2, 0, Math.PI * 2, true)
  slab.holes.push(opening)
  const g = new THREE.ExtrudeGeometry(slab, { depth: t, bevelEnabled: false })
  g.rotateX(-Math.PI / 2)
  g.translate(0, t, 0)
  g.computeVertexNormals()
  return g
}

/**
 * Dimensions for a published capacity, in metres.
 * Capacities are the six real spec sheets; the proportions below are a
 * plausible cuboid for each volume, NOT published dimensions — the site must
 * never state them as spec. Volume is what is shown, and volume is real.
 */
export function tankForCapacity(litres) {
  const m3 = litres / 1000
  // keep a squat, transportable proportion: depth ≈ 0.62 × width
  const w = Math.cbrt(m3 / (0.83 * 0.62)) * 1.0
  return { w, d: w * 0.83, h: w * 0.62, wall: Math.max(0.1, w * 0.05), m3 }
}

/**
 * The scene palette. These are the SAME values as the tokens in
 * app/globals.css — the yard and the DOM are one world, so the sun in the
 * render and the sun in the CSS must be the same colour.
 */
export const PALETTE = {
  concrete: '#c9c3b6',
  concreteMid: '#a8a294',
  concreteDark: '#8a8175',
  earth: '#a08a6a',
  sun: '#f2a03d',
  sunLight: '#ffd0a0',
  skyHigh: '#7ea6c4',
  skyLow: '#f4c98a',
  haze: '#eec89a',
  dust: '#e8d9be',
  steel: '#6f6a63',
  maroon: '#4c1314',
  shadow: '#2b2622',
}

export const CONCRETE_COLORS = {
  light: PALETTE.concrete,
  mid: PALETTE.concreteMid,
  dark: PALETTE.concreteDark,
}
