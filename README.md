# Dhruv Agrawal — Portfolio

Single-file portfolio site (`index.html`) — terminal-themed, dark UI, live LeetCode
and Codeforces stats. No build step needed; it's plain HTML/CSS/JS.

## Push to GitHub & go live

**1. Create the repo**
- Go to github.com → New repository
- Name it **exactly**: `DhruvAg0026-art.github.io`
  (this makes it your personal site, live at `https://dhruvag0026-art.github.io/`)
- Keep it Public, don't initialize with a README (this folder already has one)

**2. Push these files**
```bash
cd dhruv-github-pages
git init
git add .
git commit -m "portfolio site"
git branch -M main
git remote add origin https://github.com/DhruvAg0026-art/DhruvAg0026-art.github.io.git
git push -u origin main
```

**3. Enable Pages**
- Repo → Settings → Pages
- Source: **Deploy from a branch**
- Branch: `main`, folder: `/ (root)` → Save

Give it 1–2 minutes, then visit `https://dhruvag0026-art.github.io/`.

> If you'd rather use a project repo (not the special username.github.io one),
> name the repo anything you like (e.g. `portfolio`) — same steps, but the live
> URL becomes `https://dhruvag0026-art.github.io/<repo-name>/`.

## Notes
- `.nojekyll` is included so GitHub Pages serves the file exactly as-is.
- Live stats (LeetCode/Codeforces) fetch client-side on page load — they need
  the site to be served over `https://` (which GitHub Pages does automatically)
  to work reliably; opening the file locally via `file://` can block the fetch.
