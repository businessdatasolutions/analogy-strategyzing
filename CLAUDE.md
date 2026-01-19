# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Analogy Strategizing is a React-based SPA that guides users through structured analogical reasoning for strategy development. Users explore 26 curated strategic company pairs (e.g., Figma/Adobe, Airbnb/Hilton) and decompose analogies into positive/negative premises and causal mechanisms. The UI is in Dutch.

## Development Commands

```bash
npm run dev      # Start Vite dev server at localhost:5173/analogy-strategyzing/
npm run build    # TypeScript compile (tsc -b) + Vite build to dist/
npm run lint     # ESLint checks
npm run preview  # Preview production build locally
```

## Architecture

**Routing (React Router, hash-based):**
- `/` → Home (landing page)
- `/verkenning` → 10-pair guided questionnaire
- `/profiel` → User's strategic profile results
- `/verdieping/:id` → Deep-dive analogy worksheet per pair

**Data Flow:**
- Strategic pairs loaded from `public/data/strategic-pairs.json` (26 pairs)
- 10-pair curated subset defined in `src/lib/curated-subset.ts` for main flow
- User selections and worksheets persisted to localStorage via `src/lib/storage.ts`

**Key Data Structure (StrategicPair):**
```typescript
{
  companyA: string
  companyB: string
  strategic_contrast: string      // e.g., "Platform vs. Geïntegreerd Product"
  niveau: number                  // 1-4 complexity level
  dimensie_nummer: number
  distinguishing_element: string
  dilemma_question: string        // Dutch question for users
  strategies: { companyA: string, companyB: string }
  generic_strategies: { companyA: string, companyB: string }
  strategy_tags: { companyA: string, companyB: string }
}
```

## Source Structure

```
src/
├── pages/
│   ├── Verkenning.tsx    # Questionnaire flow with progress
│   ├── Profiel.tsx       # Results dashboard
│   └── Verdieping.tsx    # Analogy builder worksheet
├── components/
│   ├── PairCard.tsx      # Strategic pair display
│   └── PositionSelector.tsx  # A/B position selection
└── lib/
    ├── strategic-pairs.ts    # Interfaces, data loading
    ├── storage.ts            # localStorage layer
    └── curated-subset.ts     # 10-pair subset IDs
```

## Technical Notes

- **No backend**: Client-only, all state in browser localStorage
- **Position type**: `'A' | 'B' | 'between'`
- **TypeScript path alias**: `@/*` → `src/*`
- **Base URL**: `/analogy-strategyzing/` (GitHub Pages deployment)
- **Styling**: Tailwind CSS with green/purple accent colors for A/B distinction

## Deployment

Automated via GitHub Actions on push to `main`. Deploys to GitHub Pages at `https://businessdatasolutions.github.io/analogy-strategyzing/`.
