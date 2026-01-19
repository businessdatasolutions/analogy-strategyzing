# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Analogy Strategizing is a React-based SPA that guides users through structured analogical reasoning for strategy development. Users explore 26 curated strategic company pairs (e.g., Figma/Adobe, Airbnb/Hilton) and decompose analogies into positive/negative premises and causal mechanisms. The UI is in Dutch.

Based on: Carroll, G. R., & Sørensen, J. B. (2024). Strategy theory using analogy: Rationale, tools and examples. *Strategy Science, 9*(4), 483–498. https://doi.org/10.1287/stsc.2024.0174

## Development Commands

```bash
npm run dev      # Start Vite dev server at localhost:5173/analogy-strategyzing/
npm run build    # TypeScript compile (tsc -b) + Vite build to dist/
npm run lint     # ESLint checks
npm run preview  # Preview production build locally
```

## Architecture

**Routing (React Router, hash-based):**
- `/` → Home (landing page with WHY/HOW/WHAT explanation)
- `/verkenning` → 4-pair guided questionnaire (1 pair per niveau)
- `/profiel` → User's strategic profile results
- `/verdieping/:id` → Deep-dive analogy worksheet per pair

**Data Flow:**
- Strategic pairs loaded from `public/data/strategic-pairs.json` (26 pairs)
- Random selection of 4 pairs (1 per niveau) via `src/lib/curated-subset.ts`
- Users can shuffle to get a different pair within the same niveau
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

**Niveau Labels:**
- Niveau 1: Scope & Focus
- Niveau 2: Business Model
- Niveau 3: Value Chain & AI
- Niveau 4: Organization & Culture

## Source Structure

```
src/
├── pages/
│   ├── Home.tsx          # Landing page with WHY/HOW/WHAT + academic reference
│   ├── Verkenning.tsx    # Questionnaire flow with progress + shuffle feature
│   ├── Profiel.tsx       # Results dashboard grouped by niveau
│   └── Verdieping.tsx    # Analogy builder worksheet
├── components/
│   ├── PairCard.tsx      # Strategic pair display with niveau badge
│   └── PositionSelector.tsx  # A/B position selection
└── lib/
    ├── strategic-pairs.ts    # Interfaces, data loading, niveauLabels
    ├── storage.ts            # localStorage layer (save/load/remove selections)
    └── curated-subset.ts     # Random pair selection + getRandomPairByNiveau
```

## Technical Notes

- **No backend**: Client-only, all state in browser localStorage
- **Position type**: `'A' | 'B' | 'between'`
- **TypeScript path alias**: `@/*` → `src/*`
- **Base URL**: `/analogy-strategyzing/` (GitHub Pages deployment)
- **Styling**: Tailwind CSS with green/purple accent colors for A/B distinction
- **Shuffle feature**: Users can request a different pair from the same niveau; old selection is removed

## Deployment

Automated via GitHub Actions on push to `main`. Deploys to GitHub Pages at `https://businessdatasolutions.github.io/analogy-strategyzing/`.
