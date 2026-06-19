# CLAUDE.md — Project context for Claude Code

> Active rules and constraints only. Reference docs are in `docs/`.

---

## Project

Showcase site + e-commerce shop targeting **Europe** and **French-speaking Africa**.
- 20 to 100 products, solo MVP — priorities: speed + quality + security
- Some products are courses → a Moodle link is sent by email after purchase
- No customer account (guest checkout only)

---

## Tech stack

- **Next.js 14** (App Router, TypeScript)
- **PostgreSQL + Prisma** (singleton client in `lib/db.ts`)
- **Stripe** → European payments / **PayDunia** → French-speaking Africa payments
- **Resend + React Email** → transactional emails
- **NextAuth.js** → back-office admin auth only
- **Tailwind CSS** / **Infomaniak** hosting (Node.js)

---

## Payment gateway selection

```typescript
const gateway = isPayduniaCountry(userCountry) ? 'paydunia' : 'stripe';
```

PayDunia countries: `CI, SN, CM, ML, TG, BF, BJ, GN` — everything else → Stripe.

---

## Post-purchase email flow

```
webhook received → validate signature → create order in DB
→ if product is a course → generate Moodle link → send email via Resend
→ else → send simple order confirmation email
```

---

## Security rules — MANDATORY

- **Never** commit `.env.local`
- **Always** validate Stripe and PayDunia webhook signatures before any action
- **Always** enforce webhook idempotency (an order must never be created twice)
- **Never** log sensitive data
- **Always** use environment variables for API keys

---

## Mandatory validation before any change

```bash
npx tsc --noEmit        # must pass
npm run lint            # must pass (npm run lint -- --fix to auto-fix)
```

- Fix all `tsc` and `lint` errors before continuing — never ignore
- No `// @ts-ignore` or `// eslint-disable` without explicit inline justification
- No `any` — always type explicitly
- Applies to **every modified file**

---

## Code conventions

- **Language**: all code in English (names, comments, commits)
- **TypeScript strict**: no `any`, type all functions explicitly
- **Prisma**: always use the singleton client in `lib/db.ts`
- **Components**: one file per component, PascalCase naming
- **API Routes**: always handle errors with try/catch + appropriate HTTP status codes
- **Environment variables**: `NEXT_PUBLIC_` prefix only for client-side values

---

## Reference docs

| Topic | File |
|---|---|
| Architecture, rendering strategy, folder structure | `docs/ARCHITECTURE.md` |
| Navigation structure and design notes | `docs/NAVIGATION.md` |
| Dev setup, commands, env vars, ESLint | `docs/SETUP.md` |
| Technical decisions and rationale | `docs/DECISIONS.md` |
