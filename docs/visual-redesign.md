# Expense & Debt Tracker — Visual Redesign Requirements (Draft 1)

> Goal: Make the app visually appealing, easy to scan at a glance, and delightful to use daily while supporting serious budgeting and debt payoff work.

---

## 1) Product Goals & Success Metrics

* **Primary goals**: faster capture of expenses, clear budget health, motivating debt payoff visuals.
* **Secondary goals**: reduce cognitive load, improve accessibility, make reporting useful (shareable), promote habit formation.
* **Success metrics**: +20% weekly active use, +30% faster expense entry time, +25% growth in budgets created, +15% month-over-month increase in debt payments scheduled.

---

## 2) Personas (for tone & layout decisions)

* **Solo Saver** (20–35): wants a clean, modern look, fast input, mobile-first.
* **Busy Parent** (30–50): values clarity, large tap targets, quick insights.
* **Side‑Hustler**: multiple income streams, needs tagging and export.
* **Student**: wants gamified payoff progress and encouraging copy.

---

## 3) Information Architecture (IA)

* **Dashboard** (home): balances, upcoming bills, budget usage, quick-add expense.
* **Expenses**: list + filters + bulk edit + receipt attachments.
* **Debts**: list, payoff strategy (Snowball/Avalanche), each debt detail page.
* **Budgets**: monthly/weekly envelopes; category caps; rollover rules.
* **Reports**: trends, category breakdowns, cashflow, net worth.
* **Accounts**: wallets, bank/credit, cash; currency & reconciliation.
* **Settings**: profile, notifications, import/export, themes, security.

---

## 4) Visual Design System

### 4.1 Color (accessible, modern)

* **Primary**: `#2563EB` (Blue 600)
* **Secondary**: `#7C3AED` (Violet 600)
* **Success**: `#16A34A`
* **Warning**: `#F59E0B`
* **Danger**:  `#DC2626`
* **Neutrals**: `#0B1220` (ink), `#111827`, `#374151`, `#6B7280`, `#D1D5DB`, `#E5E7EB`, `#F3F4F6`, `#FFFFFF`
* **Data viz palette**: 6–8 categorical hues derived from primary/secondary with 70–85% saturation; ensure WCAG AA contrast on light/dark backgrounds.
* **Theming**: provide **Light**, **Dark**, and **Midnight** (high-contrast) themes.

### 4.2 Typography

* **Family**: Inter (UI), fallback: system UI stack.
* **Scale**: 12, 14, 16 (base), 18, 20, 24, 30, 36, 48, 60.
* **Weights**: 400/500/600 for hierarchy; avoid 700 except headlines.
* **Line-height**: 1.4–1.6 for body; headings tight at 1.2.

### 4.3 Spacing & Layout

* **Spacing scale**: 4, 8, 12, 16, 24, 32, 40, 64.
* **Radius**: 12–16px for cards (**rounded-2xl** feel); 8px for inputs.
* **Elevation**: 0/1/2/3 with soft shadows (blur 20–30, low opacity); avoid harsh borders.
* **Grid**: 12‑col desktop (max width 1200–1280px), 4‑col tablet, 2‑col mobile.

### 4.4 Iconography & Illustration

* **Icons**: Lucide/Feather style (stroke, 1.5–2px). Consistent corner radii.
* **Illustrations**: simple geometric shapes for empty states; muted brand colors.

### 4.5 Motion

* **Durations**: 150–250ms micro; 300–400ms modal.
* **Easing**: standard UI curves (easeOut for enter, easeIn for exit).
* **Microinteractions**: ripple on taps, slight scale (1.02) on card hover, confetti on debt paid.

### 4.6 Accessibility

* **Contrast**: AA for text, AAA for body on solid backgrounds.
* **Keyboard**: visible focus ring (outline 2px, primary color on dark, black on light).
* **Screen readers**: semantic landmarks, aria-live for toasts, descriptive alt text for charts (include data table fallback).

---

## 5) Component Inventory (UI kit)

* **Navigation**: top app bar (desktop), collapsible sidebar; bottom bar on mobile.
* **Global**: search, notifications, profile menu, theme switcher.
* **Cards**: Balance, Monthly Spend, Budget Health, Debt Progress.
* **Inputs**: amount input (numeric w/ currency), date picker, category select w/ icons, tags, memo, receipt upload.
* **Tables**: expenses (virtualized), sortable columns, sticky header, row selection, inline edit.
* **Filters**: chip group (Category/Tag/Account/Date range), quick presets.
* **Charts**: donut (budget usage), stacked bars (spend by category), line/area (cashflow), horizontal progress bars (debt payoff), timeline (upcoming bills), calendar heatmap (spend frequency).
* **Dialogs**: quick‑add expense, confirm delete, schedule payment, import CSV mapping.
* **Overlays**: drawers for edit on mobile, toasts for confirmations.
* **Navigation aids**: breadcrumbs on Reports/Debts detail, tabs within Debts.
* **Helpers**: skeleton loaders, empty states, error banners, offline badge.

---

## 6) Key Screens & Wireframes

### 6.1 Dashboard (Desktop)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ App Bar: [☰] Expense & Debt Tracker         Search  🔔  Theme  Profile      │
├──────────────────────────────────────────────────────────────────────────────┤
│ Sidebar:  Dashboard ▸ Expenses ▸ Debts ▸ Budgets ▸ Reports ▸ Accounts ▸ …    │
├──────────────────────────────────────────────────────────────────────────────┤
│ [Balance Card] [Monthly Spend] [Budget Health] [Upcoming Bills] [Quick Add]  │
│                                                                              │
│ Spend by Category (stacked bars)                 Cashflow (area w/ trendline) │
│                                                                              │
│ Recent Expenses (table w/ 5 rows)                                           ⓘ │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Dashboard (Mobile)

```
┌ App Bar:  ☰   Expense & Debt Tracker                +                      ┐
│ KPI cards (swipe): Balance | Monthly Spend | Budget Health | Debts Progress │
│ Chart: Spend by Category (horizontal scroll)                                 │
│ List: Recent Expenses                                                         │
└ Bottom Nav:  Home • Expenses • Debts • Budgets • Reports                     ┘
```

### 6.3 Quick‑Add Expense (Modal/Drawer)

```
[Amount][Currency]  [Date]
[Category ⌄][Tags]
[Account ⌄]
[Memo]
[+ Upload Receipt]
( Save )  ( More options ⌄ )
```

### 6.4 Debt Detail

```
[< Back]  Card: "Credit Card — $3,450 / 18% APR"
Progress bar  ━━━━━━━━┄┄  42% paid   Est. Payoff: Feb 2027
Tabs: Overview | Schedule | History | Insights
Overview: payment schedule list + chart (projected vs actual)
CTA: "Switch to Avalanche?"  [Simulate]
```

### 6.5 Reports

```
Filters: Date Range • Category • Account • Tags
Cards: Total In / Out • Savings Rate • Avg. Daily Spend
Charts: Category donut • Monthly stacked bars • Cashflow line • Heatmap
Export: CSV • PNG • PDF
```

---

## 7) Interactions & UX Details

* **Quick add** available from any screen (keyboard: "+"), 1‑tap on mobile.
* **Smart defaults**: last used account/category preselected.
* **Inline validation**: currency format, required fields, duplicate detection (same amount/time/merchant).
* **Undo** on destructive actions (toast with 5s timer).
* **Onboarding tour**: 3 steps on first launch, ends with creating first budget.
* **Gamification**: confetti + share card when paying off a debt; streaks for consecutive days of logging.

---

## 8) Data Model (for forms & charts)

* **Expense**: id, date, amount, currency, merchant, categoryId, accountId, tags[], memo, attachment[], createdAt, updatedAt.
* **Debt**: id, name, principal, apr, minPayment, dueDay, extraPayment, strategy(enum: snowball|avalanche|custom), schedule[], paidHistory[].
* **Budget**: id, period(enum: monthly|weekly), categoryId, limit, rollover(bool), spent, remaining.
* **Account**: id, type(enum: cash|bank|credit|wallet), name, balance, institution.
* **Category**: id, name, color, icon.

---

## 9) Data Visualization Guidelines

* **Donut** for budget usage with center stat (used/limit, %).
* **Stacked bars** for monthly spend by category; show trendline (+/‑ vs last period).
* **Line/area** for cashflow; 7‑day moving average option.
* **Progress** bars on debts; annotate milestones (25/50/75/100%).
* **Tooltips** with formatted currency and percentage; concise legends.
* **Annotations** for unusual spikes (imported notes).

---

## 10) Responsive Rules

* **Breakpoints**: 0–639 (mobile), 640–1023 (tablet), 1024+ (desktop).
* **Nav**: sidebar → hamburger + bottom tabs on mobile.
* **Tables**: pivot to cards on mobile; essential columns only (Category, Amount, Date, Notes).
* **Charts**: switch to single‑column stack; pinch‑zoom disabled; tooltips larger.
* **FAB**: floating + button for quick add on mobile.

---

## 11) Theming & Tokens (example)

```json
{
  "color": {
    "bg": "#FFFFFF",
    "fg": "#0B1220",
    "primary": "#2563EB",
    "secondary": "#7C3AED",
    "success": "#16A34A",
    "warning": "#F59E0B",
    "danger": "#DC2626",
    "muted": "#F3F4F6"
  },
  "radius": { "sm": 8, "md": 12, "lg": 16 },
  "shadow": { "1": "0 2px 6px rgba(0,0,0,0.06)", "2": "0 8px 20px rgba(0,0,0,0.08)" },
  "space": [4,8,12,16,24,32,40,64],
  "typography": { "font": "Inter", "base": 16 }
}
```

---

## 12) Content & Microcopy

* **Tone**: reassuring, practical, motivating.
* **Examples**:

  * Empty state (Expenses): *“No expenses yet. Start by logging your first purchase—takes 5 seconds.”*
  * Success (Expense saved): *“Saved! Keep the streak going.”*
  * Debt milestone: *“Boom! 50% paid off—$3,450 down.”*

---

## 13) Performance & Quality

* Virtualized long lists, lazy‑load charts, image optimization for receipts, offline cache (last 30 days), optimistic updates for quick add.
* 60fps target; animations disabled on `prefers-reduced-motion`.

---

## 14) Privacy & Security

* Local encryption at rest (if applicable), biometric unlock (mobile), redact amounts in app switcher previews, auto‑lock after 2 minutes idle (configurable).

---

## 15) Import/Export

* CSV import with mapping & duplicate handling.
* Export CSV/PDF for reports; share PNG for milestone cards.

---

## 16) Roadmap (Design)

* **V1 (MVP polish)**: dashboard, quick add, expenses table/cards, debts list/detail, 3 charts, light/dark themes, empty/error states.
* **V1.1**: budgets + envelope visuals, calendar heatmap, import.
* **V2**: multi‑currency, shared budgets, bank sync placeholders, goal planning.

---

## 17) QA / Review Checklist

* [ ] All text sizes ≥ 14px on mobile body.
* [ ] Tap targets ≥ 44×44.
* [ ] Focus order logical; escape closes modals; trap focus inside.
* [ ] Color contrast passes (AA/AAA as specified).
* [ ] Charts have accessible summaries/data tables.
* [ ] Skeletons for slow data; helpful empty and error states.

---

## 18) Optional Style Directions

* **Minimal Clean (Default)**: white cards, soft shadows, subtle blue accents.
* **Playful Pastel**: softer hues, rounded icons, micro‑confetti moments.
* **Dark Pro**: deep neutrals, vibrant accents, glassy cards (careful with contrast).

---

## 19) Hand‑off Notes

* Provide tokens as JSON + CSS variables.
* Export component library (Figma or code) with states: default/hover/focus/disabled/error/loading.
* Document chart specs (axes, units, formats) alongside screenshots.

---

## 20) Next Steps

1. Confirm style direction/theme.
2. Prioritize V1 scope.
3. Build a small React + Tailwind starter (Dashboard + Quick Add + Debts Detail).
4. User test with 5 participants; iterate.

