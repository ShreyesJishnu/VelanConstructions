// Stand-in for the original PHP captcha image: draws a code as SVG and stores
// it in an httpOnly cookie for /api/enquiry to check.
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export async function GET() {
  const code = Array.from({ length: 6 }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join('')
  const chars = code
    .split('')
    .map((c, i) => {
      const angle = (Math.random() * 24 - 12).toFixed(1)
      const y = 30 + Math.random() * 6
      return `<text x="${12 + i * 20}" y="${y.toFixed(1)}" transform="rotate(${angle} ${12 + i * 20} ${y.toFixed(1)})">${c}</text>`
    })
    .join('')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="135" height="45" viewBox="0 0 135 45">
<rect width="135" height="45" fill="#f2f2f2"/>
<g font-family="monospace" font-size="22" font-weight="bold" fill="#333">${chars}</g>
<path d="M0 ${10 + Math.random() * 25} Q 67 ${Math.random() * 45} 135 ${10 + Math.random() * 25}" stroke="#f57900" fill="none" stroke-width="2"/>
</svg>`

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-store',
      'Set-Cookie': `captcha=${code}; Path=/; HttpOnly; SameSite=Lax`,
    },
  })
}
