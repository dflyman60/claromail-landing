# Claro landing

Marketing site for [Claro](https://claromail.app) — clear a Microsoft mailbox by sender (Chrome extension).

Static site: `index.html` + `styles.css`. Same pattern as Haylo landing.

**Pricing / offer copy for page builds:** see [`PRICING.md`](./PRICING.md).

The Chrome extension lives in a separate repo (`claro` / outlook-management).

## Local development

```bash
python3 -m http.server 5173
# or: npx serve .
```

Open [http://localhost:5173](http://localhost:5173).

No build step. Edit HTML/CSS and refresh.

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import in [Vercel](https://vercel.com) (framework: **Other** / static).
3. Root directory: repo root. Build: none. Output: `.`
4. Point `claromail.app` (and `www` if used) at the Vercel project.

Optional redirect later: `claro.grovik.co` → `claromail.app`.
