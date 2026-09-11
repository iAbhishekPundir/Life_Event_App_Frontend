# Life Event Workflow — UI (v2)

A complete rebuild of the Life Event Application front end in plain
JavaScript React + Tailwind CSS, matching the approved Replit prototype
(screenshots + `Life_Event_Detection-main.zip`) both visually and
functionally. This replaces the earlier 7-step / navy-theme version.

## Running it

Not `npm install`-ed or run yet — built without network access. Locally:

```bash
npm install
npm run dev
```

Open the printed URL (usually `http://localhost:5173`).

## What this is a port of

The source is a single 2,500-line TypeScript file
(`WealthWorkspace.tsx`) using shadcn/ui, Radix, and internal `useState`
for navigation. This rebuild:

- Splits it into ~60 focused files following the same folder convention as
  before (`components/`, `pages/`, `data/`, `utils/`, plus a new
  `context/` folder — see below)
- Converts TypeScript → plain JS, shadcn/Radix → plain Tailwind + lucide-react
- Replaces internal `useState`-driven "screens" with real React Router
  routes, so every view has a real, shareable URL
- Keeps the same visual design: forest green (`#006a4c`) theme, DM Serif
  Display headings, all pulled directly from the source's `wealth.css`

## Pages / routes

| Route | Page |
|---|---|
| `/` | Home dashboard (stats, charts, active cases) |
| `/about` | About — 5-step flow, roles, scenarios |
| `/configure-data` | Configure Data — Open Banking source management |
| `/client/:clientId` | Client overview (hero, key drivers, recommendations) |
| `/client/:clientId/step/:stepId` | One of the 5 workflow steps |

## Why 5 steps, not 7

This matches the approved prototype exactly. Risk & Compliance and
Governance & Audit are no longer separate front-end steps — the source's
own About page says why: *"Risk and compliance checks are handled as
part of workflow orchestration tasks."* Compliance data still exists per
client (`event.compliance` in `data/clients.js`) for when that resurfaces,
it's just not rendered anywhere currently — same as the source.

## New: React Context for cross-page state

The source handled all interactivity with one flat `useState` per concern
at the top of its single component. Since this rebuild uses real routes,
three pieces of state that need to survive navigation are now contexts:

- **`CaseStatusContext`** — Open → In Progress → Converted/Lost, shared
  by the dashboard, case cards, and the Workflow Orchestration step's
  close-case buttons.
- **`WorkflowSessionContext`** — per-client interactive session data
  (event confirmation, selected products, sentiment analysis result).
  Keyed by client ID, so it persists as an advisor moves between steps
  for one client but stays independent across clients — matching the
  source's actual behaviour (its state reset on `handleClientChange`).
- **`ExternalConnectionsContext`** — the Open Banking connections list,
  shared across Configure Data's three tabs and the add-bank wizard.

## Bugs found and fixed while porting

1. **AUM undercount.** The source calculates Total AUM by stripping all
   non-digit characters (including the decimal point) before parsing, so
   `"£2.78M"` becomes `278,000` instead of `2,780,000` — a 10x
   undercount on every client whose portfolio is in millions. That's why
   the source dashboard shows "£2.2M" total AUM when the real sum of all
   six clients' portfolios is £8.8M. Fixed in `utils/formatters.js`
   (`parsePortfolioValue`), with the bug documented in a code comment.
2. **Hardcoded event name.** The "Historical product take-up" section
   title was hardcoded to say "...Marriage predictions" regardless of
   which client/event was actually showing (so New Child, Home Purchase,
   and Retirement clients all incorrectly saw "Marriage predictions").
   Fixed in `HistoricalTakeUpGrid.jsx` — the title now uses the actual
   event name.

## Project structure

```
src/
  data/
    clients.js          All 6 clients, ported faithfully (full event
                          detail for the 4 signal clients)
    dashboardData.js      Home dashboard mock stats/charts
    workflowSteps.js       The 5 step definitions
    configureData.js        Open Banking providers/scopes/connections
  context/
    CaseStatusContext.jsx, WorkflowSessionContext.jsx,
    ExternalConnectionsContext.jsx
  utils/
    formatters.js          Status style maps, AUM parsing/formatting
    sentiment.js             Keyword-based sentiment heuristic
    orchestration.js          Generates tasks from selected products
  components/
    common/                 SectionCard, Pill, IconAvatar, ProgressBar,
                              DotList, InfoTooltip
    layout/                 Sidebar (nav + client selector + profile
                              panels), AppLayout
    home/                   Dashboard: StatCard, SignalVolumeChart
                              (recharts), HorizontalBarList, CasePipeline,
                              LostOpportunitiesTable, ActiveCaseCard
    workflow/               Shared between overview + step pages:
                              LifeEventHero, KeyDriversList,
                              RecommendationCard (the expandable
                              match-score + AI-justification card, reused
                              in two places), RecommendationsList,
                              ConversionIntelligence, ClientHeader,
                              WorkflowPointerList/Item, PortfolioStableCard
    steps/                  One file per step's unique content, plus
                              shared StepBreadcrumb/StepHeading
    about/                  AboutStepBox
    configure/               BankBadge, ConnectionStatusPill,
                              PrimaryDataSourceCard, AddBankWizard (the
                              4-step flow), ExternalConnectionsList,
                              ConsentTab, FeedsTab
  pages/
    HomePage, AboutPage, ConfigureDataPage, ClientOverviewPage,
    StepDetailPage
  App.jsx                   Routes + the 3 context providers
```

`RecommendationCard` is worth calling out: it's used identically on both
the client overview page and the Personalised Recommendations step
(exactly like the source, which duplicated this JSX in two places) — here
it's one component, so any future styling change updates both places at
once.

## Verification performed without a live environment

No network access in the build sandbox, so this couldn't be
`npm install`-ed or run. To compensate:

- Real syntax validation isn't possible for JSX without a JS toolchain,
  so a bracket-balance check ran across all 61 files (clean)
- A script resolved every relative import path to a real file on disk
  (clean)
- A script cross-checked every named/default import against the actual
  exports of its target file (clean after fixing a bug in the checker
  itself — it was comparing resolved absolute paths against a
  relative-path-keyed dictionary, which I caught and fixed before
  trusting the result)
- A script cross-checked every JSX component usage's props against that
  component's destructured parameter names (clean; the handful of flags
  were confirmed as false positives — React's `key` prop and a
  `propName: localAlias` destructuring pattern the regex didn't parse)

Treat the first `npm run dev` as the real first test regardless — static
checks catch structural mistakes, not runtime logic. If anything breaks,
paste the error and it'll be a fast fix.

## What's intentionally not built

- No backend connection yet — all data is still local mock data. See the
  separate `life-event-backend` project (Phase 1) for the API this can
  eventually be wired to; the shapes don't match 1:1 yet since this UI
  version diverged significantly from the original screenshots the
  backend was built against. Reconciling that is a good next step.
- No auth/login, no multi-persona views (Advisor is the only role built,
  per the source) — flagged as a known gap from the earlier BRD
  discussion, not yet addressed here.
- The Client Sentiment step's analyzer is a simple keyword heuristic
  (ported as-is from the source) — a placeholder for a real NLP/LLM-based
  agent, kept as a pure function in `utils/sentiment.js` specifically so
  that swap is a one-file change later.
