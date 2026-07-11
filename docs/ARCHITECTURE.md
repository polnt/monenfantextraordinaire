# Architecture

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
│       ├── paydunya/webhook/route.ts
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
│   ├── paydunya.ts
│   ├── db.ts                           # Prisma client (singleton)
│   ├── email.ts                        # Resend + Moodle link logic
│   └── geo.ts                          # Country detection → correct gateway
├── prisma/
│   └── schema.prisma
├── docs/
└── types/
```
