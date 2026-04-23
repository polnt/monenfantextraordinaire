# CLAUDE.md — Project context for Claude Code

> This file is read automatically by Claude Code (VS Code).
> It contains all conventions, decisions, and rules for the project.

---

## Project

Showcase site + e-commerce shop targeting **Europe** and **French-speaking Africa**.
- 20 to 100 products
- Solo MVP, priorities: speed + quality + security
- Some products are courses → a Moodle link is sent by email after purchase
- No customer account for now (guest checkout only)

---

## Tech stack

- **Next.js 14** (App Router, TypeScript)
- **PostgreSQL + Prisma** (ORM)
- **Stripe** → European payments
- **Flutterwave** → French-speaking Africa payments
- **Resend + React Email** → transactional emails
- **NextAuth.js** → back-office admin authentication only
- **Tailwind CSS** → styles
- **Infomaniak** → hosting (Node.js)

---

## Rendering strategy

| Page | Mode |
|---|---|
| Home / showcase | SSG |
| Product catalogue | ISR |
| Product page `[slug]` | ISR |
| Cart / Checkout | CSR |
| Order confirmation | CSR |
| API Routes (webhooks, checkout) | Server |

---

## Folder structure

```
monenfantextraordinaire/
├── app/
│   ├── (shop)/
│   │   ├── page.tsx                    # Home SSG
│   │   ├── comprendre/
│   │   │   └── page.tsx                # Comprendre page with tabs (ISR)
│   │   ├── aider/
│   │   │   └── page.tsx                # Aider page with tabs (ISR)
│   │   ├── outils/
│   │   │   ├── page.tsx                # Shop / tools catalogue (ISR)
│   │   │   └── [slug]/page.tsx         # Product page (ISR)
│   │   ├── ressources/
│   │   │   └── page.tsx                # Free content page (ISR)
│   │   ├── formations/
│   │   │   ├── page.tsx                # Formations catalogue (ISR)
│   │   │   └── [slug]/page.tsx         # Formation detail page (ISR)
│   │   ├── checkout/
│   │   │   ├── page.tsx                # Cart + checkout (CSR)
│   │   │   └── confirmation/page.tsx   # Order confirmation (CSR)
│   │   └── (secondary)/
│   │       ├── le-site/page.tsx
│   │       ├── qui-suis-je/page.tsx
│   │       ├── contact/page.tsx
│   │       └── faq/page.tsx
│   └── api/
│       ├── stripe/webhook/route.ts
│       ├── flutterwave/webhook/route.ts
│       ├── checkout/route.ts
│       └── orders/route.ts
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── SecondaryDropdown.tsx
│   ├── shop/
│   └── checkout/
├── lib/
│   ├── stripe.ts
│   ├── flutterwave.ts
│   ├── db.ts                           # Prisma client (singleton)
│   ├── email.ts                        # Resend + Moodle link logic
│   └── geo.ts                          # Country detection → correct gateway
├── prisma/
│   └── schema.prisma
├── docs/
│   └── DECISIONS.md
└── types/
```

---

## Navigation structure

```
Navbar (left to right)
├── Home            → simple button → home page
│
├── Comprendre      → simple button → page with 3 tabs:
│                        • Trouble du développement
│                        • L'autisme de A à Z
│                        • Trouble de l'attention
│
├── Aider           → simple button → page with 4 tabs:
│                        • Les parents
│                        • Les professionnels
│                        • Les méthodes
│                        • Les outils de communication
│
├── Outils          → simple button → shop page (tools, activity books, worksheets)
│
├── Ressources      → simple button → free readable content page
│
├── Formations      → simple button → formations page (top-level, distinct from Outils)
│
└── ⋮               → vertical three-dot icon → dropdown:
                         • Le site
                         • Qui suis-je ?
                         • Contact
                         • FAQ
```

### Navigation notes

- **Comprendre**: replaces "Comprendre l'autisme" — shorter label, broader perceived scope (covers all neurodevelopmental disorders, not just autism). Tabs are within the page, not separate navbar links.
- **Aider**: replaces "Comment l'aider" — shorter, more direct. Same tab pattern.
- **Outils**: replaces "Boutique" — emphasises pedagogical nature of products over transactional framing.
- **Formations**: new top-level item — previously buried inside the shop. Elevated to signal it as a core offer, distinct from downloadable tools.
- **⋮ (about)**: vertical three-dot icon triggers a dropdown grouping secondary pages to keep the main navbar clean.

---

## Payment logic

```typescript
// Always use this logic to select the payment gateway
const gateway = isAfricaFrancophone(userCountry) ? 'flutterwave' : 'stripe';
```

### Flutterwave countries (French-speaking Africa)
`CI, SN, CM, ML, TG, BF, BJ, GN`
(Ivory Coast, Senegal, Cameroon, Mali, Togo, Burkina Faso, Benin, Guinea)

### Everything else → Stripe

---

## Security rules — MANDATORY

- **Never** commit `.env.local`
- **Always** validate Stripe and Flutterwave webhook signatures before any action
- **Always** enforce webhook idempotency (an order must never be created twice)
- **Never** log sensitive data
- **Always** use environment variables for API keys

---

## Post-purchase email flow

```
webhook received → validate signature → create order in DB
→ if product is a course → generate Moodle link → send email via Resend
→ else → send simple order confirmation email
```

---

## Mandatory validation before any change

**No code change may be proposed or merged without running these in order:**

```bash
# 1. TypeScript check
npx tsc --noEmit

# 2. Linter
npm run lint

# 3. Auto-fix if possible
npm run lint -- --fix
```

### Strict rules
- **If `tsc` reports errors** → fix before continuing, never ignore
- **If `lint` reports errors** → fix before continuing
- **No `// @ts-ignore` or `// eslint-disable`** without an explicit inline justification
- **No `any`** → always type explicitly
- These checks apply to **every modified file**, not just the main one

---

## Code conventions

- **Language**: all code must be written in English — variable names, function names, comments, commit messages, everything
- **TypeScript strict**: no `any`, type all functions explicitly
- **Prisma**: always use the singleton client in `lib/db.ts`
- **Components**: one file per component, PascalCase naming
- **API Routes**: always handle errors with try/catch and return appropriate HTTP status codes
- **Environment variables**: `NEXT_PUBLIC_` prefix only for values that must be exposed client-side

---

## ESLint dependencies to install

```bash
npm install --save-dev \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  @next/eslint-plugin-next \
  eslint-plugin-react \
  eslint-plugin-react-hooks
```

> ESLint v9 flat config format — config file: `eslint.config.mjs`

---

## Useful commands

```bash
npm run dev            # Start dev server
npm run build          # Production build
npm run validate       # tsc + lint in one command (required before commit)
npx tsc --noEmit       # TypeScript check only
npm run lint           # ESLint only
npm run lint -- --fix  # ESLint auto-fix
npx prisma studio      # Visual database UI
npx prisma migrate dev --name <name>  # Create a migration
npx prisma generate    # Regenerate Prisma client
```

> Add this script to `package.json`:
> ```json
> "validate": "tsc --noEmit && eslint . --ext .ts,.tsx"
> ```

---

## Required environment variables

```env
DATABASE_URL=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

FLW_SECRET_KEY=
FLW_SECRET_HASH=

RESEND_API_KEY=

NEXTAUTH_SECRET=
NEXTAUTH_URL=

MOODLE_BASE_URL=
MOODLE_TOKEN=
```

---

## Additional documentation

- Technical decisions and rationale: `docs/DECISIONS.md`

---

## Pending decisions

- [ ] Custom admin vs Sanity.io for product management
- [ ] Moodle integration: automatic enrollment via API or token link?
- [ ] Domain name and Infomaniak DNS configuration
