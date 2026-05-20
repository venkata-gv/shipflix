# ShipFlix — Streaming production-grade AI

A Netflix-style portfolio for **Venkata Surendra Reddy G** — Senior AI/ML Engineer targeting Forward Deployed Engineer & AI Engineer roles.

Six shipped GenAI projects (three live, three GitHub-public) spanning agents, RAG, MCP, multi-agent, and compliance — bingeable through four persona lenses (Recruiter, Hiring Manager, Engineer, Founder), each of which reorders the same content to match what that audience cares about.

**Tagline:** Streaming production-grade AI.

---

## What's in here

- **Boot intro** — TUDUM-style ShipFlix logo reveal (skippable, < 2s)
- **Profile picker** — "Who's Shipping Today?" with 4 persona avatars
- **Browse view** — auto-rotating 3-project hero + horizontal-scrolling rows + hover-to-expand cards
- **Project detail modal** — intercepted route (Next.js parallel routes); card animates into a full detail page in-place
- **Persona-aware rendering** — same 6 projects, 4 different row orderings + hero choices
- **Why Me panel** — three differentiating pillars (Business-Fluent · Full-Stack Shipper · Token-Aware)
- **Model Routing Decisions row** — visualised cost-per-1M-tokens chart proving "token economics is a product decision"
- **Standalone /watch/[slug]** pages for shareable deep links
- **/about** page with bio, three pillars expanded, and career-track timeline
- **Keyboard navigation** — arrow keys traverse cards, Enter opens, Esc closes modals
- **Reduced-motion respect** + custom focus rings
- **Dynamic OG image** + favicon generated at the edge via `next/og`

## Stack

- **Next.js 16** (App Router, Turbopack, parallel + intercepted routes)
- **React 19**
- **TypeScript**
- **Tailwind v4** (CSS-first theme via `@theme inline`)
- **Framer Motion** for layout-id shared transitions
- **Zustand** + persist middleware for persona state
- **Lucide React** icons (with inline SVG fallbacks for brand marks)

## Local development

Prereqs: Node 18.18+, pnpm 9+.

```bash
pnpm install
pnpm dev
# → http://localhost:3000
```

> Note: `next dev` is invoked through pnpm. If pnpm's pre-run deps check trips on
> `ERR_PNPM_IGNORED_BUILDS`, run `node_modules/.bin/next dev` directly or approve
> the sharp/unrs-resolver build scripts with `pnpm approve-builds`.

## Build & deploy

```bash
pnpm build
pnpm start          # production preview
```

Deployment target: **Vercel**. `vercel.json` is included with sensible defaults.
No environment variables are required for the portfolio itself — all project data
lives in `src/lib/projects.ts`.

## Project structure

```
src/
├── app/
│   ├── layout.tsx                  # fonts + grain overlay + metadata
│   ├── page.tsx                    # boot intro + profile picker (BootGate)
│   ├── browse/
│   │   ├── layout.tsx              # parallel routes (children + modal slot)
│   │   ├── page.tsx                # hero + rows
│   │   └── @modal/
│   │       ├── default.tsx
│   │       └── (..)watch/[slug]/page.tsx   # intercepted modal
│   ├── watch/[slug]/page.tsx       # standalone deep-link page
│   ├── about/page.tsx
│   ├── icon.tsx                    # generated favicon
│   └── opengraph-image.tsx         # generated OG image
├── components/                      # presentational + interactive components
└── lib/
    ├── projects.ts                  # all 6 project records (heart of the site)
    ├── personas.ts                  # 4 persona metadata
    ├── rows.ts                      # persona → row ordering map
    ├── pillars.ts                   # 3 USP pillars
    ├── experience.ts                # career track
    ├── store.ts                     # Zustand persona/boot state
    └── utils.ts                     # cn helper
```

## Adding a new project

1. Append a `Project` record to `src/lib/projects.ts` (see schema at top of file).
2. Optionally add to a persona's `heroSlugs` in `src/lib/rows.ts`.

That's it — rows auto-pick up the new project based on its `categories`.

## Credits

Built by **Venkata Surendra Reddy G** — gvsr32@gmail.com — github.com/surendra-gvsr.

ShipFlix is a portfolio, not a streaming service. Inspired by Netflix; no affiliation.
