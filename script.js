const LC_USER = "Dhruv0026";
  const CF_USER = "dhruv0026";

  // --- Codeforces: official public API ---
  async function loadCodeforces() {
    const el = document.getElementById('cf-stats');
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const res = await fetch(`https://codeforces.com/api/user.info?handles=${CF_USER}`, { signal: controller.signal });
      clearTimeout(timeout);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.status !== "OK") throw new Error(data.comment || "api returned error");
      const u = data.result[0];
      el.innerHTML = `
        <div class="stat-row"><span class="stat-key">Rating</span><span class="stat-val amber">${u.rating ?? '—'}</span></div>
        <div class="stat-row"><span class="stat-key">Max Rating</span><span class="stat-val">${u.maxRating ?? '—'}</span></div>
        <div class="stat-row"><span class="stat-key">Rank</span><span class="stat-val">${u.rank ?? '—'}</span></div>
      `;
      const achCf = document.getElementById('ach-cf-num');
      if (achCf && u.maxRating != null) achCf.textContent = u.maxRating;
    } catch (e) {
      console.error("Codeforces fetch failed:", e);
      el.innerHTML = `<div class="stat-error">Live fetch failed (${e.message}) — showing max rating 1010 (per resume).</div>`;
    }
  }

  // --- LeetCode: unofficial public APIs (no official one exists). Try each with a timeout. ---
  async function fetchWithTimeout(url, ms) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), ms);
    try {
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);
      return res;
    } catch (e) {
      clearTimeout(timeout);
      throw e;
    }
  }

  async function loadLeetCode() {
    const el = document.getElementById('lc-stats');
    // leetcode-stats-api.herokuapp.com is defunct (Heroku killed free apps) — not used.
    const endpoints = [
      { url: `https://alfa-leetcode-api.onrender.com/${LC_USER}/solved`, ms: 15000 }, // free tier cold-starts slowly
      { url: `https://leetcode-stats-api.vercel.app/${LC_USER}`, ms: 10000 }
    ];
    let lastErr = null;
    for (const { url, ms } of endpoints) {
      try {
        const res = await fetchWithTimeout(url, ms);
        if (!res.ok) { lastErr = new Error(`HTTP ${res.status} on ${url}`); continue; }
        const data = await res.json();
        const total = data.solvedProblem ?? data.totalSolved ?? null;
        const easy = data.easySolved ?? null;
        const medium = data.mediumSolved ?? null;
        const hard = data.hardSolved ?? null;
        if (total === null) { lastErr = new Error(`unexpected response shape from ${url}`); continue; }
        el.innerHTML = `
          <div class="stat-row"><span class="stat-key">Total Solved</span><span class="stat-val amber">${total}</span></div>
          ${easy !== null ? `<div class="stat-row"><span class="stat-key">Easy / Medium / Hard</span><span class="stat-val">${easy} / ${medium ?? '—'} / ${hard ?? '—'}</span></div>` : ''}
        `;
        const achLc = document.getElementById('ach-leetcode-num');
        if (achLc) achLc.textContent = `${total}+`;
        return;
      } catch (e) {
        lastErr = e;
      }
    }
    console.error("LeetCode fetch failed:", lastErr);
    el.innerHTML = `<div class="stat-error">Live fetch failed (${lastErr ? lastErr.message : 'unknown error'}) — showing 100+ problems solved (per resume).</div>`;
  }

  loadCodeforces();
  loadLeetCode();