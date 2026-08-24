# Kharch Log — public site

Static site for **https://kharchlog.in** (GitHub Pages + custom domain).

| Page | URL |
|------|-----|
| Home | https://kharchlog.in/ |
| Privacy | https://kharchlog.in/privacy.html |
| Terms | https://kharchlog.in/terms.html |

Contact: kharchlog@gmail.com

## DNS (at your domain registrar for kharchlog.in)

**A records** (apex / `@`):

| Type | Host | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

**Optional `www`:**

| Type | Host | Value |
|------|------|-------|
| CNAME | www | ahmedhussainpvtt.github.io |

Then in GitHub: **Settings → Pages → Custom domain** → enter `kharchlog.in` → enforce HTTPS when available.

Deploys automatically on push to `main` via `.github/workflows/pages.yml`.
