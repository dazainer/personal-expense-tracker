# Deploy Expense Tracker (easiest path)

Use **Vercel** for the frontend and **Railway** for the backend + database. Both have free tiers and need no credit card for a simple demo.

---

## 1. Deploy backend + database (Railway)

1. Go to [railway.app](https://railway.app) and sign in with GitHub.
2. **New Project** → **Deploy from GitHub repo** → select `personal-expense-tracker`.
3. Railway will clone the repo. You need to deploy only the backend:
   - Click the new service → **Settings** → set **Root Directory** to `v2/backend`.
   - Set **Build Command** to `npm install && npm run build`.
   - Set **Start Command** to `npm start` (already in package.json).
4. Add PostgreSQL: in the project, click **+ New** → **Database** → **PostgreSQL**. Railway creates a DB and a `DATABASE_URL` variable.
5. Connect the DB to your backend service:
   - Click your **backend service** (not the DB) → **Variables**.
   - You should see **Reference** or **Add variable**. Add `DATABASE_URL` and paste the value from the PostgreSQL service (Railway often links it automatically; if not, copy from the Postgres service **Variables** tab).
   - Set **PORT**: Railway provides `PORT`; your app already uses `process.env.PORT` or 3001. In `v2/backend/src/index.ts` the server should listen on `process.env.PORT || 3001`. If not, add `PORT` in Variables (Railway may inject it).
6. Deploy: Railway will build and deploy. Open the backend service → **Settings** → **Networking** → **Generate Domain**. Copy the URL (e.g. `https://your-app.up.railway.app`). This is your **backend URL**; the API is at `https://your-app.up.railway.app/api`.

---

## 2. Deploy frontend (Vercel)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. **Add New** → **Project** → import `personal-expense-tracker`.
3. **Either**:
   - **Option A (recommended):** Leave **Root Directory** blank (use repo root). A root `vercel.json` in the repo will build `v2/frontend` and serve it. No need to change Build/Output in the UI.
   - **Option B:** Set **Root Directory** to `v2/frontend` (click **Edit** next to the root). Then **Framework Preset** should be **Vite**; Build Command `npm run build` and Output Directory `dist` are auto-set.
4. Add **Environment variable**: `VITE_API_URL` = `https://YOUR-RAILWAY-URL.up.railway.app/api` (backend URL from step 1 + `/api`).
5. Click **Deploy**. When it’s done, Vercel gives you a URL like `https://your-project.vercel.app`.

### If you get 404 on the Vercel URL

- **Root Directory blank:** Make sure the repo has a `vercel.json` at the **repo root** (not inside v2). It should contain `outputDirectory: "v2/frontend/dist"` and the build/install commands for the frontend. Commit, push, and redeploy.
- **Root Directory = `v2/frontend`:** In Vercel → your project → **Settings** → **General** → **Build & Development Settings**: set **Framework Preset** to **Vite**, **Output Directory** to `dist`. Don’t override Build Command unless needed. Redeploy.
- Check the latest **Deployment** → **Building** logs: the build must finish successfully and produce a `dist` folder (or `v2/frontend/dist` if using repo root). If the build fails, fix the error shown there.

---

## 3. Share the app

Send the **Vercel URL** (frontend). The app in the browser will call the Railway backend using `VITE_API_URL`. No extra setup for the person you’re showing.

---

## Quick checklist

- [ ] Railway: repo connected, root = `v2/backend`, build = `npm install && npm run build`, start = `npm start`
- [ ] Railway: PostgreSQL added, `DATABASE_URL` set on backend service
- [ ] Railway: public domain generated, backend URL copied
- [ ] Vercel: repo connected, root = `v2/frontend`, `VITE_API_URL` = `https://...railway.app/api`

**Note:** Railway gives about $5 free credit per month—enough for a demo. Vercel’s frontend tier is free.
