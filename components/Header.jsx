'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { nav, company, primaryPhone } from '../lib/site'
import './header.css'

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="hdr">
      <div className="hdr-inner sheet">
        <Link href="/" className="hdr-mark" onClick={() => setOpen(false)}>
          <img
            src="/velan-mist/images-mist/images/webimages/logo.webp"
            alt="Velan Concast"
            width="180"
            height="42"
          />
        </Link>

        <nav className="hdr-nav" aria-label="Drawing set">
          <ul>
            {nav.map((item) => {
              const active = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`hdr-link${active ? ' is-active' : ''}`}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span className="hdr-link-sheet" aria-hidden="true">{item.sheet}</span>
                    <span className="hdr-link-title">{item.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="hdr-call">
          <a className="hdr-tel" href={`tel:${primaryPhone.tel}`}>
            <span className="label">Call</span>
            <span className="hdr-tel-no">{primaryPhone.display}</span>
          </a>
          <a
            className="action action--call hdr-wa"
            href={company.whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          className="hdr-toggle"
          aria-expanded={open}
          aria-controls="hdr-drawer"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="label label--ink">{open ? 'Close' : 'Sheets'}</span>
        </button>
      </div>

      <div id="hdr-drawer" className="hdr-drawer" data-open={open || undefined} hidden={!open}>
        <ul className="sheet">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hdr-drawer-link"
                aria-current={pathname === item.href ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="sheet-no">{item.sheet}</span>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
          <li>
            <a className="hdr-drawer-link" href={`tel:${primaryPhone.tel}`}>
              <span className="sheet-no">TEL</span>
              <span>{primaryPhone.display}</span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
