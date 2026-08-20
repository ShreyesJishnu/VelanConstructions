'use client'

import { useState } from 'react'
import { productOptions, primaryPhone } from '../lib/site'
import './enquiry-form.css'

// Posts to the same /api/enquiry route the clone uses: the submission is written
// to data/enquiries.json and logged to the dev server.
// Every field has a real, visible <label>. Validation errors are announced.
export default function EnquiryForm({ from = '/contact', compact = false }) {
  const [errors, setErrors] = useState({})

  function validate(event) {
    const data = new FormData(event.currentTarget)
    const next = {}
    if (!String(data.get('name') || '').trim()) next.name = 'Enter your name.'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(data.get('email') || ''))) {
      next.email = 'Enter an email address we can reply to.'
    }
    if (!/^\d{10}$/.test(String(data.get('phone') || '').replace(/\D/g, ''))) {
      next.phone = 'Enter a 10-digit mobile number.'
    }
    if (!String(data.get('products') || '')) next.products = 'Choose what you need.'

    setErrors(next)
    if (Object.keys(next).length) {
      event.preventDefault()
      const first = event.currentTarget.querySelector(`[name="${Object.keys(next)[0]}"]`)
      first?.focus()
    }
  }

  const field = (name) => ({
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })

  return (
    <form
      className={`ef${compact ? ' ef--compact' : ''}`}
      method="post"
      action="/api/enquiry"
      onSubmit={validate}
      noValidate
    >
      <input type="hidden" name="_from" value={from} />

      <p className="ef-row">
        <label htmlFor="ef-name">
          Name <abbr title="required" aria-hidden="true">*</abbr>
        </label>
        <input id="ef-name" name="name" type="text" autoComplete="name" required {...field('name')} />
        {errors.name && <span className="ef-error" id="name-error">{errors.name}</span>}
      </p>

      <p className="ef-row">
        <label htmlFor="ef-phone">
          Mobile <abbr title="required" aria-hidden="true">*</abbr>
        </label>
        <input
          id="ef-phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          maxLength={10}
          required
          {...field('phone')}
        />
        {errors.phone && <span className="ef-error" id="phone-error">{errors.phone}</span>}
      </p>

      <p className="ef-row">
        <label htmlFor="ef-email">
          Email <abbr title="required" aria-hidden="true">*</abbr>
        </label>
        <input id="ef-email" name="email" type="email" autoComplete="email" required {...field('email')} />
        {errors.email && <span className="ef-error" id="email-error">{errors.email}</span>}
      </p>

      <p className="ef-row">
        <label htmlFor="ef-products">
          What do you need <abbr title="required" aria-hidden="true">*</abbr>
        </label>
        <select id="ef-products" name="products" defaultValue="" required {...field('products')}>
          <option value="" disabled>Select a product</option>
          {productOptions.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        {errors.products && <span className="ef-error" id="products-error">{errors.products}</span>}
      </p>

      <p className="ef-row ef-row--wide">
        <label htmlFor="ef-message">Quantity, capacity, delivery date</label>
        <textarea id="ef-message" name="message" rows={compact ? 2 : 4} />
      </p>

      {!compact && (
        <p className="ef-row ef-row--wide">
          <label htmlFor="ef-address">Delivery address</label>
          <textarea id="ef-address" name="address" rows={2} autoComplete="street-address" />
        </p>
      )}

      <p className="ef-submit">
        <button type="submit" className="action action--call">Send enquiry</button>
        <span className="label">
          Or call <a href={`tel:${primaryPhone.tel}`}>{primaryPhone.display}</a>
        </span>
      </p>
    </form>
  )
}
