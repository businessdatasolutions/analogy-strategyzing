# PRD: Strategy Analogy Builder - AI Strategy Masterclass Application

**Author:** Witold ten Hove
**Date:** 2025-01-19
**Status:** In Development
**Version:** 1.1
**Based on:** Carroll, G.R. & Sørensen, J.B. (2024). "Strategy Theory Using Analogy: Rationale, Tools and Examples." Strategy Science, Vol. 9, No. 4.

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Problem Statement](#problem-statement)
3. [Goals & Success Metrics](#goals--success-metrics)
4. [User Stories](#user-stories)
5. [Functional Requirements](#functional-requirements)
6. [Non-Functional Requirements](#non-functional-requirements)
7. [Technical Considerations](#technical-considerations)
8. [Implementation Roadmap](#implementation-roadmap)
9. [Out of Scope](#out-of-scope)
10. [Open Questions & Risks](#open-questions--risks)

---

## Executive Summary

This application supports participants in AI Strategy masterclasses by guiding them through a structured analogical reasoning process for strategy development. Based on the methodology from Carroll & Sørensen's research, the tool helps users:

1. **Explore strategic dilemmas** through 26 curated company pairs representing contrasting strategies
2. **Select a strategic position** by choosing which company's strategy resonates with their situation
3. **Decompose the analogy** into positive and negative premises (horizontal relations)
4. **Identify causal mechanisms** (vertical relations) that explain why the source strategy worked
5. **Map premises to their target company** to develop a firm-specific theory
6. **Evaluate analogy strength** to assess the plausibility of strategic conclusions

The application transforms the academically rigorous but complex analogy methodology into an accessible, interactive tool that masterclass participants can use to jumpstart their strategic thinking.

### Core Innovation: Strategic Pairs

Rather than asking participants to search for source companies from scratch, the application presents **curated strategic pairs** - two companies that made opposite strategic choices on a key dimension. This approach:

- **Frames strategy as choice**: Each pair represents a genuine dilemma (e.g., "Open Platform vs. Closed Ecosystem")
- **Provides rich context**: Each pair includes the strategic contrast, distinguishing element, and dilemma question
- **Covers multiple levels**: From basic (Niche vs. Broad) to advanced (AI as Product vs. AI as Optimizer)
- **Forces explicit positioning**: Participants must choose which strategy they align with, making their strategic assumptions visible

---

## Problem Statement

### Current Situation

Strategy development through analogical reasoning is widely used by executives but often done poorly:

- **Global analogies without decomposition**: Executives say "we're the Uber of X" without breaking down what specific attributes make the analogy valid
- **Missing negative analogies**: Only positive similarities are considered, ignoring critical differences that undermine conclusions
- **Unclear causal mechanisms**: The *why* behind source company success is not articulated, making transfer to target unreliable
- **No structured evaluation**: No systematic way to assess whether an analogy is strong enough to guide strategic decisions

**Evidence from the paper:**
- "Many analogies made in business discourse do not get decomposed into underlying features but stay global, which makes them harder to analyze and evaluate"
- "The central problem with relying on analogy for causal inference is that, in the assessment of many logicians, analogy is an unreliable form of inductive argument"
- "The combination of wide usage of analogical reasoning along with its logical weaknesses may help explain the lack of confidence many executives express in the strategies"

### User Impact

- **Who is affected:** AI Strategy masterclass participants (executives, entrepreneurs, strategists)
- **How they're affected:**
  - Struggle to move from intuitive analogy to structured strategic argument
  - Miss critical differences that could derail their strategy
  - Cannot articulate the causal theory underlying their strategic reasoning
  - Leave masterclass without a concrete, defensible strategy framework
- **Severity:** High - The gap between knowing analogies are useful and using them rigorously is the core learning challenge

### Why Solve This Now?

1. **AI is transforming strategy**: Participants need frameworks for AI-native business models
2. **Masterclass time is limited**: Interactive tool enables deeper learning than lecture alone
3. **Theory-based view gaining traction**: Executives are increasingly asked to articulate firm-specific theories
4. **AI assistants can guide reasoning**: LLM technology can provide real-time feedback on analogy quality

---

## Goals & Success Metrics

### Goal 1: Enable Structured Analogy Decomposition

**Description:** Participants can break down a global analogy into specific positive and negative premises

**Metric:** Average number of premises identified per analogy (positive + negative)

**Baseline:** 2-3 premises (typical unstructured approach)

**Target:** 8-12 premises per analogy (matching Table 5 depth from paper)

**Measurement Method:** Count premises logged in completed analogy worksheets

---

### Goal 2: Surface Causal Mechanisms (Vertical Relations)

**Description:** Participants articulate why the source strategy succeeded, not just what it did

**Metric:** Percentage of analogies with explicit causal theory stated

**Baseline:** ~20% (most stay at feature-matching level)

**Target:** 90% of completed analogies include causal mechanism statement

**Measurement Method:** Review submitted analogies for presence of "Why did [source] succeed?" section

---

### Goal 3: Identify Relevant Negative Analogies

**Description:** Participants systematically consider how target differs from source

**Metric:** Ratio of negative to positive premises identified

**Baseline:** 0.1 (mostly positive focus)

**Target:** 0.3-0.5 (healthy skepticism)

**Measurement Method:** Count negative vs positive premises in completed worksheets

---

### Goal 4: High Participant Engagement

**Description:** Participants actively use the tool during and after the masterclass

**Metric:** Completion rate of at least one full analogy per participant

**Baseline:** N/A (new tool)

**Target:** 85% completion rate during masterclass session

**Measurement Method:** Track completed vs started analogies per participant

---

### Goal 5: Perceived Value

**Description:** Participants find the tool valuable for strategy development

**Metric:** Post-session NPS score for the tool

**Baseline:** N/A

**Target:** NPS > 40

**Measurement Method:** Post-masterclass survey

---

## User Stories

### Story 1: Strategic Dilemma Exploration

**As a** masterclass participant,
**I want to** explore strategic dilemmas through contrasting company pairs,
**So that I can** understand the trade-offs and choose a strategic direction that fits my situation.

**Acceptance Criteria:**
- [ ] System displays 26 curated strategic pairs organized by complexity level (1-4)
- [ ] Each pair shows: Company A vs Company B, strategic contrast, dilemma question
- [ ] User can filter by niveau (complexity) or browse all pairs
- [ ] Clicking a pair reveals detailed strategies and distinguishing elements
- [ ] User can search/filter pairs by keyword (e.g., "platform", "AI", "data")
- [ ] Visual indication of which strategic dimensions each pair illustrates

**Example Flow:**
```
STRATEGIC PAIRS BROWSER
-----------------------
Filter by niveau: [All] [1-Basic] [2-Business Model] [3-Value Chain] [4-Organization]

Selected: Niveau 3 - Value Chain & Innovation

┌─────────────────────────────────────────────────────────────────────┐
│ Amazon vs OpenAI                                                     │
│ Strategic Contrast: AI als Efficiëntie-versneller vs. AI als Kernproduct │
│                                                                     │
│ Dilemma Question: "Gebruik je AI om je bestaande business beter     │
│ en sneller te maken, of *is* de intelligentie van de AI zelf het    │
│ product dat je verkoopt?"                                           │
│                                                                     │
│ [View Details] [Select This Pair]                                   │
└─────────────────────────────────────────────────────────────────────┘
```

---

### Story 2: Strategic Position Selection

**As a** masterclass participant,
**I want to** choose which company's strategy in a pair most closely matches my intended approach,
**So that I can** use it as the source for my analogical reasoning.

**Acceptance Criteria:**
- [ ] After selecting a pair, user sees both strategies side-by-side
- [ ] Each strategy shows: tag, full description, distinguishing element
- [ ] User explicitly selects: "My strategy is more like [Company A / Company B]"
- [ ] System confirms selection and explains what this choice implies
- [ ] User can also indicate "I'm between these" for hybrid exploration
- [ ] Selection becomes the "source" for the analogy building process

**Example Flow:**
```
CHOOSE YOUR STRATEGIC POSITION
==============================
Pair: Amazon vs OpenAI
Dimension: De rol van AI in het verdienmodel

┌─────────────────────────────┐  ┌─────────────────────────────┐
│ AMAZON                      │  │ OPENAI                      │
│ Tag: AI Optimalisatie       │  │ Tag: AI als Product         │
│                             │  │                             │
│ "AI optimaliseert           │  │ "Het product ís de          │
│ e-commerce en logistiek.    │  │ intelligentie. Intelligence-│
│ Klant koopt fysiek product."│  │ as-a-service."              │
│                             │  │                             │
│ [This is my approach]       │  │ [This is my approach]       │
└─────────────────────────────┘  └─────────────────────────────┘

                    [ I'm somewhere in between ]

You selected: OpenAI approach
→ You believe AI itself is your product, not just an optimizer.
→ Your analogy will explore how to build value when intelligence IS the offering.
```

---

### Story 3: Positive Premise Identification (Horizontal Relations)

**As a** masterclass participant,
**I want to** identify specific ways my target company is similar to the source,
**So that I can** build the foundation of my analogical argument.

**Acceptance Criteria:**
- [ ] System prompts with categories: Market, Product, Business Model, Technology, Customer, etc.
- [ ] User enters premise in structured format: Source attribute → Target attribute
- [ ] System helps articulate premises clearly (suggests refinements)
- [ ] User can add unlimited positive premises
- [ ] Each premise can be marked as "structural" (deep) vs "superficial"
- [ ] System warns if only superficial similarities identified

**Example:**
```
Category: Market
Source (Tripadvisor): "Offers hard-to-find information about experiential goods (hotels)"
Target (LegalAI): "Offers hard-to-find information about experiential goods (law firms)"
Similarity type: Structural ✓

Category: Revenue Model
Source (Tripadvisor): "Generates revenue from ads and referrals"
Target (LegalAI): "Generates revenue from subscriptions and per-document fees"
Similarity type: Superficial (different revenue model)
```

---

### Story 4: Negative Premise Identification

**As a** masterclass participant,
**I want to** identify specific ways my target company differs from the source,
**So that I can** honestly assess the limitations of my analogy.

**Acceptance Criteria:**
- [ ] System actively prompts for differences (not optional)
- [ ] Uses same categories as positive premises for consistency
- [ ] Asks "red team" questions: "What would break this analogy?"
- [ ] Requires minimum 2 negative premises before proceeding
- [ ] Highlights negative premises that may be "deal breakers"
- [ ] Prompts relevance assessment: "How relevant is this difference to your conclusion?"

**Example:**
```
Category: User Behavior
Source (Tripadvisor): "Tourists willingly describe bad experiences publicly"
Target (LegalAI): "Lawyers reluctant to criticize firms publicly (professional norms)"
Relevance to conclusion: HIGH - threatens user-generated content model

System warning: "This negative premise directly undermines Premise A (user-generated content).
                Consider whether your target needs a different content generation strategy."
```

---

### Story 5: Causal Mechanism Articulation (Vertical Relations)

**As a** masterclass participant,
**I want to** articulate WHY the source company's strategy succeeded,
**So that I can** assess whether the same causal forces apply to my target.

**Acceptance Criteria:**
- [ ] System asks: "Why do you believe [Source] achieved [Conclusion]?"
- [ ] Provides framework: "What conditions had to be true for this to work?"
- [ ] Suggests relevant theories: network effects, economies of scale, switching costs, etc.
- [ ] User constructs causal chain: Premises → Intermediate outcomes → Conclusion
- [ ] System checks if causal theory is plausible for target context
- [ ] Highlights gaps: "Your target shares the inputs but not condition X needed for this to work"

**Example:**
```
Causal Theory for Tripadvisor's Success:

1. Travelers experience hotels briefly (Premise H) → Willing to trust strangers
2. Travel is frequent and social (context) → Large reviewer pool
3. Free access (Premise B) → High user volume
4. User-generated content (Premise C) → Low content cost
5. Multiple reviews per hotel (condition) → Statistical credibility
6. Ad/referral model (Premise F) → Revenue without paywalls

→ CONCLUSION: Market success through credible, low-cost review aggregation

Assessment for LegalAI:
- Premise 1: Lawyers have ONGOING relationships → May not trust strangers ❌
- Premise 2: Job changes are infrequent → Small reviewer pool ⚠️
- Premise 5: Few reviews per firm likely → Statistical credibility at risk ⚠️

Recommendation: Your causal theory needs adaptation. Consider alternative content sources.
```

---

### Story 6: Analogy Strength Evaluation

**As a** masterclass participant,
**I want to** see an assessment of my analogy's overall strength,
**So that I can** understand how much confidence to place in my strategic conclusions.

**Acceptance Criteria:**
- [ ] Visual summary of positive vs negative premises
- [ ] Causal relevance scoring for each premise
- [ ] Overall analogy strength indicator (Strong/Moderate/Weak)
- [ ] Specific recommendations for strengthening the analogy
- [ ] Identification of "firm-specific premises" needed to complete the argument
- [ ] Export option for further refinement

**Example Output:**
```
ANALOGY STRENGTH ASSESSMENT
===========================
Source: Tripadvisor → Target: LegalAI

Positive Premises: 6 (4 structural, 2 superficial)
Negative Premises: 3 (2 highly relevant)

Causal Mechanism Alignment: 60%
- 3/5 conditions from source present in target
- 2 critical conditions missing or different

OVERALL: MODERATE ANALOGY
This analogy provides useful starting insights but requires significant
adaptation. The core causal mechanism (user-generated reviews for
experiential goods) partially transfers, but key conditions differ.

RECOMMENDED FIRM-SPECIFIC PREMISES:
1. Address the reviewer reluctance problem (consider anonymity guarantees)
2. Compensate for low review volume (AI-augmented analysis of public data)
3. Develop alternative credibility mechanism (expert curation + AI)

These additions could transform your target's strategy theory from
"Tripadvisor for legal" to a novel hybrid model.
```

---

### Story 7: Curated Analogy Examples

**As a** masterclass participant,
**I want to** see worked examples of strong analogies,
**So that I can** understand the methodology before applying it myself.

**Acceptance Criteria:**
- [ ] 3-5 pre-built complete analogies available as reference
- [ ] Examples from the paper: Tripadvisor/Glassdoor, Intel/Facebook, Cemex/ridesharing
- [ ] Each example shows full decomposition with positive and negative premises
- [ ] Causal mechanisms explicitly stated
- [ ] Commentary on why the analogy is strong or weak
- [ ] Users can "fork" an example to modify for their context

---

### Story 8: Collaborative Analogy Building (Masterclass Mode)

**As a** masterclass instructor,
**I want to** guide participants through building an analogy together,
**So that I can** teach the methodology interactively.

**Acceptance Criteria:**
- [ ] Instructor can create a shared session
- [ ] Participants join via code/link
- [ ] Instructor controls which step is active
- [ ] Participants can suggest premises (instructor approves/edits)
- [ ] Real-time display of collective analogy being built
- [ ] Instructor can pause for discussion at each stage
- [ ] Export shared analogy for all participants

---

## Functional Requirements

### Must Have (P0) - Core Masterclass Functionality

#### REQ-000: Home Page with Methodology Introduction

**Description:** Landing page that explains WHY, HOW, and WHAT of analogical reasoning for strategy.

**Acceptance Criteria:**
- [x] WHY section: Explains problem with unstructured analogies ("we're the Uber of X")
- [x] HOW section: 6-step process for structured analogical reasoning
- [x] WHAT section: Introduction to 26 strategic pairs across 4 niveaus
- [x] APA citation to Carroll & Sørensen (2024) with DOI link
- [x] Clear CTA to start the exploration flow
- [x] Reset button to clear all stored data

---

#### REQ-001: Strategic Pairs Browser

**Description:** Interface for exploring and selecting from 26 curated strategic company pairs.

**Acceptance Criteria:**
- [x] Display strategic pairs from `strategic-pairs.json`
- [x] Random selection of 4 pairs (1 per niveau) for each session
- [x] Each pair card shows: companies, strategic contrast, dilemma question, niveau badge with label
- [x] User can shuffle to get a different random pair from the same niveau
- [x] When shuffling, old selection is removed so profile only shows current set
- [ ] Filter by niveau (complexity level 1-4) - *future enhancement*
- [ ] Search by company name, strategy tag, or keyword - *future enhancement*
- [ ] Expanded view shows: full strategies, distinguishing element, dimension number - *future enhancement*

**Data Structure (from strategic-pairs.json):**
```typescript
interface StrategicPair {
  companyA: string;
  companyB: string;
  strategic_contrast: string;
  niveau: number;                    // 1-4 complexity level
  dimensie_nummer: number;           // Strategic dimension
  distinguishing_element: string;
  dilemma_question: string;
  strategies: {
    companyA: string;
    companyB: string;
  };
  strategy_tags: {
    companyA: string;
    companyB: string;
  };
}
```

**Niveau Categories:**
- **Niveau 1 - Scope & Focus**: Niche vs Broad, Geographic focus, Entry barriers
- **Niveau 2 - Business Model**: Revenue model, Asset ownership, Platform vs Product
- **Niveau 3 - Value Chain & AI**: Vertical integration, Open vs Closed, AI role
- **Niveau 4 - Organization & Culture**: Hierarchy, Transparency, Funding model

---

#### REQ-002: Strategic Position Selector

**Description:** Interface for choosing which strategy in a pair the user's company aligns with.

**Acceptance Criteria:**
- [x] Side-by-side display of both strategies in selected pair
- [x] Clear visual distinction between Company A (green) and Company B (purple) approaches
- [x] User selects one strategy as their "source" for analogy building
- [x] Option to select "hybrid/between" for exploration
- [ ] Confirmation screen explaining implications of choice - *future enhancement*
- [ ] Selected strategy becomes context for subsequent premise building

---

#### REQ-003: Analogy Workspace

**Description:** Central interface where users build their strategy analogy step-by-step.

**Acceptance Criteria:**
- [ ] Persistent workspace that saves progress automatically
- [ ] Clear progression: Strategic Pair → Position Selection → Positive Premises → Negative Premises → Causal Theory → Evaluation
- [ ] Each step accessible but guided sequence recommended
- [ ] Visual indication of completion status for each section
- [ ] Mobile-responsive for in-class use on various devices
- [ ] Context from selected strategic pair pre-populates relevant fields

---

#### REQ-004: Premise Entry System

**Description:** Structured input for positive and negative analogical premises.

**Acceptance Criteria:**
- [ ] Category selection (Market, Product, Revenue, Technology, Customer, Operations)
- [ ] Side-by-side entry: Source attribute | Target attribute
- [ ] Pre-populated source attributes based on selected strategic pair's strategy description
- [ ] Similarity type toggle: Structural / Superficial
- [ ] For negative premises: Relevance to conclusion (Low/Medium/High)
- [ ] AI suggestions for additional premises based on entered data
- [ ] Reordering and grouping of premises
- [ ] Automatic highlighting of premises that relate to the pair's distinguishing_element

---

#### REQ-005: Causal Theory Builder

**Description:** Guided construction of the vertical relations (causal mechanism).

**Acceptance Criteria:**
- [ ] Prompt: "Why did [Source Company] achieve success with this strategy?"
- [ ] Visual chain builder: Input conditions → Intermediate outcomes → Final outcome
- [ ] Library of common strategic mechanisms (network effects, scale economies, etc.)
- [ ] Context from strategic pair's dilemma_question seeds the analysis
- [ ] Mapping tool: Which of your premises are required for this mechanism?
- [ ] Gap analysis: Which mechanism conditions are missing in your target?

---

#### REQ-006: Analogy Evaluation Dashboard

**Description:** Summary assessment of analogy strength with recommendations.

**Acceptance Criteria:**
- [ ] Count of positive vs negative premises
- [ ] Structural vs superficial breakdown
- [ ] Causal alignment percentage
- [ ] Overall strength indicator
- [ ] Top 3 recommendations for strengthening
- [ ] Firm-specific premise suggestions
- [ ] Export to PDF/Markdown
- [ ] Visual comparison showing where target aligns/diverges from source strategy

---

### Should Have (P1) - Enhanced Learning

#### REQ-007: AI-Powered Premise Suggestions

**Description:** LLM suggests additional premises based on context.

**Acceptance Criteria:**
- [ ] After entering 3+ premises, AI suggests additional considerations
- [ ] Suggestions informed by selected strategic pair's characteristics
- [ ] Suggestions include both positive and negative possibilities
- [ ] Each suggestion includes rationale
- [ ] User can accept, modify, or dismiss suggestions

---

#### REQ-008: Interactive Examples

**Description:** Pre-built analogies that users can explore and learn from.

**Acceptance Criteria:**
- [ ] Tripadvisor/Glassdoor example (from the paper)
- [ ] At least 4 additional diverse examples
- [ ] Step-by-step reveal option for teaching
- [ ] Commentary explaining analytical decisions
- [ ] "Fork" button to create derivative for user's context

---

#### REQ-009: Session Management (Instructor Tools)

**Description:** Tools for masterclass instructors to manage group sessions.

**Acceptance Criteria:**
- [ ] Create shareable session with unique code
- [ ] Real-time participant list
- [ ] Instructor can broadcast their screen/analogy
- [ ] Collect participant submissions
- [ ] Aggregate view of class analogies

---

### Nice to Have (P2) - Future Enhancements

#### REQ-010: Analogy Library

**Description:** Repository of user-submitted analogies (anonymized) for learning.

---

#### REQ-011: Strategy Debate Mode

**Description:** Two users can argue opposing sides of an analogy's strength.

---

#### REQ-012: Integration with Strategy Frameworks

**Description:** Connect analogy outputs to Porter's Five Forces, Business Model Canvas, etc.

---

## Non-Functional Requirements

### NFR-001: Performance

- Page load time < 2 seconds
- AI suggestions generate within 5 seconds
- Workspace autosave every 30 seconds
- Support 50 concurrent users per session

### NFR-002: Usability

- Accessible to non-technical users
- Zero-training basic usage (intuitive UI)
- In-app guidance and tooltips at each step
- Works on tablet and laptop screens

### NFR-003: Reliability

- 99.5% uptime during scheduled masterclass sessions
- Graceful degradation if AI features unavailable
- Local storage backup for work-in-progress

### NFR-004: Security

- No login required for basic use
- Optional account for saving work across sessions
- No sensitive business data stored long-term
- GDPR-compliant data handling

---

## Technical Considerations

### Recommended Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│  (React/Next.js - responsive SPA)                           │
│  - Strategic Pairs Browser                                  │
│  - Position Selector                                        │
│  - Analogy Workspace Component                              │
│  - Premise Entry Forms                                      │
│  - Causal Chain Builder (visual)                            │
│  - Evaluation Dashboard                                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        Backend                               │
│  (Node.js/Python API)                                       │
│  - Session Management                                       │
│  - Strategic Pairs API (serves strategic-pairs.json)        │
│  - AI Integration (Claude API)                              │
│  - Export Generation                                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        Data Layer                            │
│  - strategic-pairs.json (26 curated pairs - static)         │
│  - PostgreSQL (user sessions, saved analogies)              │
│  - Redis (session state, real-time sync)                    │
│  - S3 (exported PDFs)                                       │
└─────────────────────────────────────────────────────────────┘
```

### Strategic Pairs Data

The application uses `strategic-pairs.json` as the foundation for source selection:

| Niveau | Focus | Example Pairs |
|--------|-------|---------------|
| 1 | Scope & Focus | Urban Arrow/Gazelle, Figma/Adobe, Uber/Lyft, Shopify/ASML |
| 2 | Business Model | Android/iOS, Airbnb/Hilton, Google/Microsoft, Ryanair/Emirates |
| 3 | Value Chain & AI | Tesla/Toyota, Netflix/Spotify, Amazon/OpenAI, LEGO/Nintendo |
| 4 | Organization | Facebook/TikTok, ING/Spotify, Apple/Buffer, Mailchimp/Uber |

### AI Integration Points

1. **Strategic Pair Recommendation**: Given target description, suggest relevant pairs from the 26
2. **Premise Suggestion**: Given selected pair and existing premises, suggest additional considerations
3. **Causal Theory Critique**: Assess logical coherence of stated causal mechanism
4. **Evaluation Summary**: Generate natural language assessment of analogy strength

### Key Dependencies

- `strategic-pairs.json` - Core data file with 26 strategic pairs
- Claude API for AI features
- WebSocket for real-time collaboration
- PDF generation library for exports

---

## Implementation Roadmap

### Phase 1: Core Workflow (MVP)
**Duration:** 4 weeks

- Strategic Pairs Browser (load and display all 26 pairs)
- Filter by niveau and search by keyword
- Strategic Position Selector (choose Company A or B)
- Basic analogy workspace with premise entry
- Simple evaluation summary
- PDF/Markdown export

**Deliverable:** Functional tool for solo analogy building using strategic pairs

### Phase 2: AI Enhancement
**Duration:** 3 weeks

- AI-powered pair recommendation based on target description
- Premise suggestion engine informed by selected pair's characteristics
- Causal theory builder with gap analysis
- Enhanced evaluation with recommendations

**Deliverable:** Intelligent assistant for better analogies

### Phase 3: Collaboration Features
**Duration:** 3 weeks

- Instructor session management
- Real-time collaborative building
- Participant submission collection
- Interactive examples library

**Deliverable:** Full masterclass-ready tool

### Phase 4: Polish & Scale
**Duration:** 2 weeks

- Performance optimization
- Mobile experience refinement
- Analytics dashboard for instructors
- Onboarding flow

**Deliverable:** Production-ready application

---

## Out of Scope

1. **Full strategy development platform** - This tool focuses specifically on analogy-based reasoning, not comprehensive strategy planning
2. **Financial modeling** - No integration with financial projections or valuation
3. **Competitive intelligence** - Source company data is curated, not live market data
4. **Translation of strategic pairs** - Initial data is in Dutch (matching masterclass language); English translation deferred
5. **Offline mode** - Requires internet connection for AI features
6. **Mobile app** - Web-only, though mobile-responsive
7. **Adding new strategic pairs** - Initial release uses the fixed 26 pairs; admin interface for adding pairs is deferred

---

## Open Questions & Risks

### Open Questions

1. **Q: Should analogies be shareable/public?**
   - Consideration: Users may create analogies with sensitive strategic information
   - Recommendation: Default private, optional anonymized sharing

2. **Q: How deep should AI suggestions go?**
   - Consideration: Too aggressive AI might reduce learning; too passive reduces value
   - Recommendation: Suggestions only after user has made genuine effort (3+ premises)

3. **Q: Should we score analogies numerically?**
   - Consideration: Risk of false precision; may discourage exploration
   - Recommendation: Qualitative bands (Strong/Moderate/Weak) rather than percentages

4. **Q: How to handle participants who want to explore both sides of a strategic pair?**
   - Consideration: Some participants may want to understand both strategies before committing
   - Recommendation: Allow "exploration mode" where both strategies can be analyzed before formal selection

5. **Q: Should the UI be in Dutch or English?**
   - Consideration: Strategic pairs data is in Dutch; masterclass may have international participants
   - Recommendation: UI in English with Dutch strategic pair content; consider AI-assisted translation for display

### Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| AI suggestions feel generic | Medium | Medium | Fine-tune prompts with strategic pair context |
| Tool too complex for time-limited session | High | Medium | "Quick mode" with minimal steps; strong defaults |
| Participants game the evaluation | Low | Low | De-emphasize scores; focus on learning value |
| Real-time collaboration fails at scale | Medium | Low | Graceful degradation to async mode |
| 26 strategic pairs insufficient coverage | Medium | Medium | Allow "custom pair" entry as escape hatch |
| Dutch content confuses international users | Medium | Low | Clear labeling; future translation option |

---

## Appendix: The Analogy Methodology Summary

From Carroll & Sørensen (2024):

### Key Concepts

1. **Horizontal Relations**: Feature-to-feature mappings between source and target
   - Positive: Similar features
   - Negative: Different features

2. **Vertical Relations**: Causal relationships within source and target
   - Why do the premises lead to the conclusion?
   - What theory explains the source's success?

3. **Structural vs Superficial**: Structural analogies (based on relational patterns) are stronger than superficial ones (based on surface features)

4. **Evaluation Criteria**:
   - Number and relevance of positive premises
   - Number and relevance of negative premises
   - Strength of causal mechanism transfer
   - Background knowledge support

### Step-by-Step Process

1. **Start with target company** - The firm you want to develop strategy for
2. **Select source with desired conclusion** - A company that achieved what you want
3. **Specify source's vertical relations** - Why did the source succeed?
4. **Map premises from source to target** - What parallels exist?
5. **Identify negative premises** - Where does the analogy break down?
6. **Assess causal transfer** - Does the same mechanism work for your target?
7. **Add firm-specific premises** - What unique factors complete your argument?

---

## Appendix: Strategic Pairs Overview

The 26 curated strategic pairs from `strategic-pairs.json`:

### Niveau 1 - Scope & Focus
| Pair | Strategic Contrast | Dilemma |
|------|-------------------|---------|
| Figma vs Adobe | Niche Specialist vs Brede Generalist | Focus on one function or broad suite? |
| Urban Arrow vs Gazelle | Niche Specialist vs Brede Generalist | Premium niche or broad market? |
| Uber vs Lyft | Globale Alles-App vs Gefocuste Marktspeler | Diversify globally or focus regionally? |
| Shopify vs ASML | Lage vs Hoge Toetredingsdrempels | Easy access or build barriers? |

### Niveau 2 - Business Model
| Pair | Strategic Contrast | Dilemma |
|------|-------------------|---------|
| Android vs Apple iOS | Platform vs Geïntegreerd Product | Open ecosystem or controlled experience? |
| Airbnb vs Hilton | Datagedreven Netwerk vs Asset-model | Network value or physical assets? |
| Airbnb vs Booking.com | Community-gedreven vs Transactie-gedreven | Brand community or conversion machine? |
| Google vs Microsoft | Indirect vs Direct Inkomstenmodel | Data monetization or direct sales? |
| Amazon vs Alibaba | Logistiek-gedreven vs Platform-gedreven | Own logistics or facilitate transactions? |
| Netflix vs Disney | Datagedreven Content vs IP-gedreven Franchise | Data-driven creation or IP exploitation? |
| Spotify vs Apple Music | Pure-Play vs Ecosysteem-component | Standalone business or ecosystem feature? |
| Salesforce vs Monday.com | Diep Platform vs Flexibel Framework | Enterprise depth or team flexibility? |
| Ryanair vs Emirates | Kostenleiderschap vs Differentiatie | Lowest cost or premium experience? |

### Niveau 3 - Value Chain & AI
| Pair | Strategic Contrast | Dilemma |
|------|-------------------|---------|
| Tesla vs Toyota | Disruptieve Innovator vs Operationele Excellentie | Disrupt with software or perfect production? |
| Netflix vs Spotify | Verticale Integratie vs Horizontale Specialisatie | Control whole chain or excel at one link? |
| Apple Health vs Adyen/Stripe | Gesloten Data vs Open API-Platform | Walled garden or open building blocks? |
| YouTube vs Bitcoin | Gecentraliseerd vs Gedecentraliseerd | Central control or distributed ownership? |
| Amazon vs OpenAI | AI als Efficiëntie vs AI als Kernproduct | AI optimizes business or AI IS the product? |
| LEGO vs Nintendo | Open Innovatie vs Gesloten Innovatie | Community co-creation or internal perfection? |
| Fairphone vs TOMS | Systeemverandering vs Directe Hulpverlening | Change the system or treat symptoms? |
| Apple vs Samsung | Ecosysteem-integratie vs Productdiversificatie | Ecosystem control or production excellence? |

### Niveau 4 - Organization & Culture
| Pair | Strategic Contrast | Dilemma |
|------|-------------------|---------|
| Facebook vs TikTok | Social Graph vs Content Graph | Who you know or what you like? |
| Instagram vs Snapchat | Publieke Etalage vs Private Communicatie | Permanent showcase or ephemeral messaging? |
| ING vs Spotify | Hiërarchisch vs Agile | Command & control or autonomous teams? |
| Apple vs Buffer | Geheimhouding vs Radicale Transparantie | Secrecy or radical openness? |
| Mailchimp vs Uber | Bootstrapped vs VC-gefinancierd | Organic growth or external capital? |

---

## References

Carroll, G.R. & Sørensen, J.B. (2024). Strategy Theory Using Analogy: Rationale, Tools and Examples. *Strategy Science*, 9(4), 483-498.

Sørensen, J.B. & Carroll, G.R. (2021). *Making Great Strategy: Arguing for Organizational Advantage*. Columbia University Press.

Gavetti, G. & Rivkin, J.W. (2005). How Strategists Really Think: Tapping the Power of Analogy. *Harvard Business Review*, 83(4), 54-63.
