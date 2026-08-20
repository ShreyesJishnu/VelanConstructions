import fs from 'node:fs/promises'
import path from 'node:path'

// The cloned pages are served verbatim — original markup, original <head>,
// original inline jQuery, original .php URLs. No React in the way.
const dir = path.join(process.cwd(), 'content')

export async function GET(request, { params }) {
  const name = (await params).slug.join('/')
  if (!/^[\w.-]+\.php$/.test(name)) return new Response('Not found', { status: 404 })

  try {
    const html = await fs.readFile(path.join(dir, name + '.html'), 'utf8')
    return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
  } catch {
    return new Response('Not found', { status: 404 })
  }
}
