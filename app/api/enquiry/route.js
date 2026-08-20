import fs from 'node:fs/promises'
import path from 'node:path'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const STORE = path.join(process.cwd(), 'data', 'enquiries.json')
const REQUIRED = ['name', 'email', 'phone']

// Enquiries are appended to data/enquiries.json — no mail server needed locally.
// ponytail: read-modify-write, fine for one local dev server; use a DB if this
// ever runs somewhere with concurrent writers.
async function append(entry) {
  let all = []
  try {
    all = JSON.parse(await fs.readFile(STORE, 'utf8'))
  } catch {}
  all.push(entry)
  await fs.mkdir(path.dirname(STORE), { recursive: true })
  await fs.writeFile(STORE, JSON.stringify(all, null, 2))
}

export async function POST(request) {
  const form = await request.formData()
  const fields = Object.fromEntries(form)
  const back = typeof fields._from === 'string' && fields._from.startsWith('/') ? fields._from : '/'
  delete fields._from
  delete fields.submit

  const missing = REQUIRED.filter((k) => !String(fields[k] || '').trim())
  if (missing.length) return fail(back, `Missing: ${missing.join(', ')}`)

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(fields.email))) return fail(back, 'Invalid email')
  if (!/^\d{10}$/.test(String(fields.phone).replace(/\D/g, ''))) return fail(back, 'Invalid mobile number')

  // the contact/enquiry pages carry the captcha; the short product forms do not
  if ('letters_code' in fields) {
    const expected = (await cookies()).get('captcha')?.value
    if (!expected || String(fields.letters_code).trim().toUpperCase() !== expected) {
      return fail(back, 'Wrong captcha code')
    }
  }
  delete fields.letters_code

  const entry = { ...fields, page: back, at: new Date().toISOString() }
  await append(entry)
  console.log('\n[enquiry]', JSON.stringify(entry, null, 2))

  return NextResponse.redirect(new URL(back + '?msg=success', request.url), 303)
}

function fail(back, error) {
  console.warn('[enquiry] rejected:', error)
  return NextResponse.redirect(
    new URL(`${back}?msg=error&error=${encodeURIComponent(error)}`, 'http://localhost:3000'),
    303,
  )
}
