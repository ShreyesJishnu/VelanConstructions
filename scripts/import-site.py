#!/usr/bin/env python3
"""Mirror velanconcast.com into this Next.js clone.

  python3 scripts/import-site.py [--crawl]

--crawl re-downloads the live site into .site-cache/ (skipped if the cache
already exists). Then every .php page is split into head metadata, body HTML
(scripts stripped out) and a script list, written to content/, and every
static asset is copied into public/.
"""
import collections, json, os, re, shutil, sys, urllib.parse as up, urllib.request as ur

ROOT = "https://velanconcast.com/"
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
CACHE = os.path.join(REPO, ".site-cache")
PUBLIC = os.path.join(REPO, "public")
CONTENT = os.path.join(REPO, "content")
HDRS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}
LINK_RE = re.compile(r'(?:href|src|data-src)\s*=\s*["\']([^"\']+)["\']|url\(["\']?([^"\')]+)["\']?\)|@import\s+["\']([^"\']+)["\']', re.I)
EXT_RE = re.compile(r'\.(php|css|js|png|jpe?g|webp|gif|svg|pdf|ico|woff2?|ttf|eot|mp4)($|\?)', re.I)
SCRIPT_RE = re.compile(r'<script\b([^>]*)>(.*?)</script\s*>', re.I | re.S)
SKIP_SCRIPT = re.compile(r'googletagmanager|gtag|cdn-cgi|google-analytics', re.I)


def crawl():
    seen, queue = set(), collections.deque([ROOT])
    while queue:
        url, _ = up.urldefrag(queue.popleft())
        if url in seen:
            continue
        seen.add(url)
        pr = up.urlparse(url)
        try:
            req = ur.Request(up.urlunparse(pr._replace(path=up.quote(pr.path))), headers=HDRS)
            with ur.urlopen(req, timeout=30) as r:
                body, ctype = r.read(), r.headers.get("Content-Type", "")
        except Exception as e:
            print("  skip", url, e)
            continue
        path = pr.path if pr.path not in ("", "/") else "/index.php"
        dest = os.path.join(CACHE, path.lstrip("/"))
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        open(dest, "wb").write(body)
        if "html" in ctype or "css" in ctype:
            for m in LINK_RE.finditer(body.decode("utf-8", "ignore")):
                link = m.group(1) or m.group(2) or m.group(3)
                if not link or not EXT_RE.search(link):
                    continue
                if link.startswith(("mailto:", "tel:", "javascript:", "data:", "#")):
                    continue
                nxt = up.urljoin(url, link)
                if up.urlparse(nxt).netloc.replace("www.", "") == "velanconcast.com":
                    queue.append(nxt)
    print(f"crawled {len(seen)} urls")


NOTIFIER = """
<script>
(function () {
  var params = new URLSearchParams(location.search)
  var msg = params.get('msg')
  if (msg !== 'success' && msg !== 'error') return
  var ok = msg === 'success'
  var title = ok ? 'Thank You!' : 'Could not send'
  var text = ok
    ? 'Your enquiry has been submitted successfully. We will contact you shortly.'
    : params.get('error') || 'Please check the form and try again.'
  function show() {
    if (window.Swal) Swal.fire({ icon: ok ? 'success' : 'error', title: title, text: text, confirmButtonColor: '#f57900' })
    else alert(title + '\\n\\n' + text)
  }
  if (window.Swal) return show()
  var s = document.createElement('script')
  s.src = '/velan-mist/file-mist/js/sweetalert2.js'
  s.onload = show
  s.onerror = show
  document.body.appendChild(s)
})()
</script>
"""


def convert(name, raw):
    """Keep the original document intact; only local-ify what has to change."""
    # analytics must not fire from a local clone
    raw = re.sub(r"<script[^>]*googletagmanager[^>]*>\s*</script\s*>", "", raw, flags=re.I)
    raw = re.sub(r"<script>[^<]*gtag\([^<]*</script\s*>", "", raw, flags=re.I)
    raw = re.sub(r'<script[^>]*cdn-cgi[^>]*>\s*</script\s*>', "", raw, flags=re.I)

    # every form posts to the local enquiry API and comes back to this page
    def fix_form(m):
        tag = re.sub(r'action\s*=\s*["\'][^"\']*["\']', 'action="/api/enquiry"', m.group(0))
        if "action=" not in tag:
            tag = tag[:-1] + ' action="/api/enquiry">'
        return tag + '\n<input type="hidden" name="_from" value="/%s">' % name
    raw = re.sub(r'<form\b[^>]*method\s*=\s*["\']post["\'][^>]*>', fix_form, raw, flags=re.I)

    return raw.replace("</body>", NOTIFIER + "</body>")


def build():
    shutil.rmtree(CONTENT, ignore_errors=True)
    os.makedirs(CONTENT, exist_ok=True)
    pages = []
    for root, _, files in os.walk(CACHE):
        for f in files:
            src = os.path.join(root, f)
            rel = os.path.relpath(src, CACHE)
            if f.endswith(".php"):
                if f == "captcha_code_file.php":
                    continue  # reimplemented as an API route
                raw = open(src, encoding="utf-8", errors="ignore").read()
                open(os.path.join(CONTENT, f + ".html"), "w", encoding="utf-8").write(convert(f, raw))
                pages.append(f)
            else:
                dest = os.path.join(PUBLIC, rel)
                os.makedirs(os.path.dirname(dest), exist_ok=True)
                shutil.copy2(src, dest)
    json.dump(sorted(pages), open(os.path.join(CONTENT, "pages.json"), "w"), indent=1)
    print(f"wrote {len(pages)} pages to content/")


if __name__ == "__main__":
    if "--crawl" in sys.argv or not os.path.isdir(CACHE):
        crawl()
    build()
