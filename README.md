# Kritech Solution Frontend

React/Vite frontend for `https://kritechsolution.com`.

## Local Development

```bash
npm install
npm run dev -- --port 5173
```

Open `http://127.0.0.1:5173/`.

The admin UI is available at `/admin-login`. It needs the backend API running.

## Environment

For production, set this in Vercel:

```bash
VITE_API_URL=https://your-railway-backend-url.com
```

Do not put MongoDB, Cloudinary secret, or admin password data in the frontend.

## Build

```bash
npm run build
```

The build generates:

- `public/sitemap.xml`
- `public/robots.txt`
- `dist/`

## Included

- Public website pages.
- Blog pages imported from WordPress.
- Local SEO pages for Nepal, Butwal, Bhairahawa and Tilottama.
- International SEO pages for remote UAE and USA clients.
- Admin login UI and CMS UI.
- Vercel rewrites for clean direct URLs.
