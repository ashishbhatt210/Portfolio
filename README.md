# Ashish Bhatt · Portfolio

An AI-augmented engineering portfolio. Built with **React + Vite** for the frontend and **Vercel serverless functions** for the backend, which proxies the **Anthropic Claude API**.

The site has two live AI tools and is architected so adding new ones is trivial:

- **Job-Fit Analyzer** — paste a JD, get a tailored fit analysis grounded in my resume
- **Ask Ashish** — chat with an AI that knows my background

---

## Tech Stack

- **Frontend:** React 18 + Vite, vanilla CSS with design tokens
- **Backend:** Vercel serverless functions (Node 18+)
- **AI:** Anthropic Claude API via the official `@anthropic-ai/sdk`
- **Deployment:** Vercel (one-click)
- **Fonts:** Instrument Serif (display) + Inter (body) + JetBrains Mono

---

## Quick Start

### 1. Install
```bash
git clone <your-repo-url> ashish-portfolio
cd ashish-portfolio
npm install
```

### 2. Set up environment
```bash
cp .env.example .env.local
```
Then edit `.env.local` and add your Anthropic API key (get one at [console.anthropic.com](https://console.anthropic.com)):
```env
ANTHROPIC_API_KEY=sk-ant-...
```

### 3. Run locally

You need **two terminals** to run dev mode (frontend + serverless functions):

```bash
# Terminal 1 — frontend
npm run dev
# Visit http://localhost:5173

# Terminal 2 — serverless API
npx vercel dev
# Functions available at http://localhost:3000/api/*
```

Then **uncomment the proxy block in `vite.config.js`** so the frontend forwards `/api/*` calls to `vercel dev`:

```js
proxy: {
  "/api": {
    target: "http://localhost:3000",
    changeOrigin: true,
  },
},
```

> 💡 **Simpler alternative:** just run `npx vercel dev` alone — it serves both the frontend (port 3000) and the API together. Skip `npm run dev` entirely.

---

## Deploy

### Vercel (recommended — one click)

1. Push to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Add environment variable: `ANTHROPIC_API_KEY=sk-ant-...`
4. Deploy.

That's it. Vercel auto-detects Vite + the `api/` folder.

### Other hosts (Netlify, Cloudflare Pages, etc.)
The `api/` folder uses Vercel's function format. To deploy elsewhere, port the two files (`api/job-fit.js`, `api/chat.js`) to your platform's serverless format. They each just import from `api/_lib/claude.js`, which uses the standard `@anthropic-ai/sdk` — no Vercel-specific code.

---

## Project Structure

```
ashish-portfolio/
├── api/                          # Serverless backend
│   ├── _lib/
│   │   ├── claude.js             # ★ Shared Claude API helper (use this for new features)
│   │   └── resume-context.js     # Resume context injected into prompts
│   ├── chat.js                   # POST /api/chat — Ask Ashish endpoint
│   └── job-fit.js                # POST /api/job-fit — Job fit analyzer
│
├── public/
│   └── favicon.svg
│
├── src/
│   ├── components/               # Site sections (Nav, Hero, Experience, etc.)
│   │   ├── AILab.jsx             # ★ Renders all AI features from registry
│   │   ├── Achievements.jsx
│   │   ├── Experience.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Markdown.jsx
│   │   ├── Marquee.jsx
│   │   ├── Nav.jsx
│   │   ├── Projects.jsx
│   │   ├── SectionHeader.jsx
│   │   ├── Skills.jsx
│   │   └── StatusTicker.jsx
│   │
│   ├── features/                 # ★ Self-contained AI features
│   │   ├── job-fit/
│   │   │   ├── JobFitAnalyzer.jsx
│   │   │   └── config.js
│   │   ├── ask-ashish/
│   │   │   ├── AskAshish.jsx
│   │   │   └── config.js
│   │   └── registry.js           # ★ Register new features here
│   │
│   ├── data/
│   │   └── resume.js             # ★ Single source of truth for content
│   │
│   ├── lib/
│   │   └── api.js                # Frontend API client (calls /api/*)
│   │
│   ├── hooks/
│   │   └── useScrollReveal.js    # Scroll-triggered animations
│   │
│   ├── styles/
│   │   └── globals.css           # Design tokens, fonts, keyframes
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vercel.json
└── vite.config.js
```

---

## How to Add a New AI Feature

Designed to take **~5 minutes**. Example: a "Recommendation Letter Generator."

### Step 1 — Create the backend endpoint

`api/recommendation.js`:
```js
import { complete, setCors, handleError } from "./_lib/claude.js";
import { RESUME_CONTEXT } from "./_lib/resume-context.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { companyContext } = req.body || {};
    const system = `Write a recommendation letter for Ashish based on his resume below…\n\n${RESUME_CONTEXT}`;
    const letter = await complete({
      system,
      messages: [{ role: "user", content: companyContext }],
      maxTokens: 1000,
    });
    return res.status(200).json({ letter });
  } catch (e) {
    return handleError(res, e);
  }
}
```

### Step 2 — Add a frontend API client function

In `src/lib/api.js`:
```js
export async function generateRecommendation(companyContext) {
  const { letter } = await postJSON("/recommendation", { companyContext });
  return letter;
}
```

### Step 3 — Build the feature component

Create `src/features/recommendation/RecommendationGenerator.jsx` and `config.js`. Pattern-match from `src/features/job-fit/`.

### Step 4 — Register it

In `src/features/registry.js`:
```js
import RecommendationGenerator from "./recommendation/RecommendationGenerator.jsx";
import { RECOMMENDATION_CONFIG } from "./recommendation/config.js";

export const FEATURES = [
  // existing features…
  { ...RECOMMENDATION_CONFIG, Component: RecommendationGenerator },
];
```

Done — it now renders in the AI Lab section.

---

## How to Update Resume Content

All content lives in **`src/data/resume.js`** — profile, experience, projects, skills, achievements. Edit one file, deploy. The AI features pull from `api/_lib/resume-context.js` — keep it in sync (or refactor to import from the data file at build time).

---

## Design System

Design tokens in `src/styles/globals.css`:

| Token | Value | Use |
|-------|-------|-----|
| `--bg` | `#0a0a0c` | Page background |
| `--ink` | `#f0ede4` | Primary text |
| `--accent` | `#d4ff3a` | Primary accent (acid green) |
| `--warm` | `#ff7a45` | Secondary accent (orange) |
| `--font-display` | Instrument Serif | Hero typography |
| `--font-body` | Inter | Body text |
| `--font-mono` | JetBrains Mono | Labels, code, technical UI |

---

## Roadmap

Future AI features to ship:
- **Semantic project search** — embeddings-based search across all work
- **Code-style preview** — show actual snippets from each project
- **Interview prep tool** — generate likely interview questions for a given role
- **Multi-language portfolio** — auto-translate via LLM

---

## License

MIT. Free to fork and adapt for your own portfolio.

---

**Built with care by [Ashish Bhatt](mailto:bhattashish210@gmail.com) · Ghaziabad, IN**
