# VelanConstructions

Local clone of [velanconcast.com](https://velanconcast.com) — every page, asset and
form, running on your machine.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000 — the original URLs work as-is
(`/index.php`, `/precast-sump-in-coimbatore.php`, `/projectmain.php?view_id=40`, …).

## How it works

Next.js is only a static file server plus two small APIs. The 23 pages are served
**verbatim** from `content/` — original markup, `<head>`, and jQuery — so the clone
matches the live site pixel for pixel. Assets live in `public/`.

| Path | What it does |
| --- | --- |
| `app/[[...slug]]/route.js` | serves `content/<page>.php.html` for any `.php` URL |
| `app/api/enquiry/route.js` | receives every form, validates, appends to `data/enquiries.json`, logs to the terminal, redirects back with `?msg=success` |
| `app/captcha_code_file.php/route.js` | draws the captcha (SVG) and stores the code in an httpOnly cookie |
| `scripts/import-site.py` | re-downloads the live site and regenerates `content/` + `public/` |

Enquiries land in `data/enquiries.json` (gitignored) and in the `npm run dev` output.
No mail server is involved.

## Re-importing from the live site

```bash
python3 scripts/import-site.py --crawl
```

The importer changes exactly three things: analytics scripts are stripped, form
`action`s point at `/api/enquiry`, and a success/error notifier is appended before
`</body>`.

## Known parity notes

These are bugs in the live site, reproduced faithfully rather than fixed:

- `main.js:1613` throws `Cannot read properties of null` on pages without `#catalogPopup`.
- 20 theme assets (`img/stripe-*.png`, `Quotation Marks 1.webp`, …) 404 on the live site too.
