# CLAUDE.md — Contexte projet pour Claude Code

> Ce fichier est lu automatiquement par Claude Code (VS Code).
> Il contient toutes les conventions, décisions et règles du projet.

---

## 🎯 Projet

Site vitrine + boutique e-commerce ciblant l'**Europe** et l'**Afrique francophone**.
- 20 à 100 produits
- MVP solo, priorité : rapidité + qualité + sécurité
- Certains produits = formations → envoi d'un lien Moodle par email après achat
- Pas d'espace client pour l'instant (achat en tant qu'invité)

---

## 🧱 Stack technique

- **Next.js 14** (App Router, TypeScript)
- **PostgreSQL + Prisma** (ORM)
- **Stripe** → paiements Europe
- **CinetPay** → paiements Afrique francophone
- **Resend + React Email** → emails transactionnels
- **NextAuth.js** → authentification back-office admin uniquement
- **Tailwind CSS** → styles
- **Infomaniak** → hébergement (Node.js)

---

## 🖥️ Stratégie de rendu

| Page | Mode |
|---|---|
| Accueil / vitrine | SSG |
| Catalogue produits | ISR |
| Fiche produit `[slug]` | ISR |
| Panier / Checkout | CSR |
| Confirmation commande | CSR |
| Back-office admin | CSR |
| API Routes (webhooks, checkout) | Server |

---

## 🗂️ Structure des dossiers

```
my-shop/
├── app/
│   ├── (shop)/
│   │   ├── page.tsx                # Accueil SSG
│   │   ├── produits/
│   │   │   ├── page.tsx            # Catalogue ISR
│   │   │   └── [slug]/page.tsx     # Fiche produit ISR
│   │   └── checkout/
│   │       ├── page.tsx            # Panier + checkout CSR
│   │       └── confirmation/page.tsx
│   ├── api/
│   │   ├── stripe/webhook/route.ts
│   │   ├── cinetpay/webhook/route.ts
│   │   ├── checkout/route.ts
│   │   └── orders/route.ts
│   └── admin/
│       ├── page.tsx
│       ├── produits/page.tsx
│       └── commandes/page.tsx
├── components/
│   ├── shop/
│   ├── checkout/
│   └── admin/
├── lib/
│   ├── stripe.ts
│   ├── cinetpay.ts
│   ├── db.ts                       # Prisma client (singleton)
│   ├── email.ts                    # Resend + logique lien Moodle
│   └── geo.ts                      # Détection pays → bonne passerelle
├── prisma/
│   └── schema.prisma
├── docs/
│   └── DECISIONS.md
└── types/
```

---

## 💳 Logique paiement

```typescript
// Toujours utiliser cette logique pour choisir la passerelle
const gateway = isAfricaFrancophone(userCountry) ? 'cinetpay' : 'stripe';
```

### Pays CinetPay (Afrique francophone)
`CI, SN, CM, ML, TG, BF, BJ, GN`
(Côte d'Ivoire, Sénégal, Cameroun, Mali, Togo, Burkina Faso, Bénin, Guinée)

### Tout le reste → Stripe

---

## 🔐 Règles de sécurité — OBLIGATOIRES

- **Ne jamais** committer `.env.local`
- **Toujours** valider la signature des webhooks Stripe et CinetPay avant toute action
- **Toujours** vérifier l'idempotence des webhooks (une commande ne doit jamais être créée deux fois)
- **Jamais** de données sensibles dans les logs
- **Toujours** utiliser les variables d'environnement pour les clés API
- Les routes `/admin/*` doivent être protégées par NextAuth

---

## 📧 Flux email post-achat

```
webhook confirmé → valider signature → créer commande en DB
→ si produit formation → générer lien Moodle → envoyer email Resend
→ sinon → envoyer email confirmation simple
```

---

## ✅ Validation obligatoire avant toute modification

**Aucune modification de code ne doit être proposée ou validée sans avoir exécuté dans l'ordre :**

```bash
# 1. Vérification TypeScript
npx tsc --noEmit

# 2. Linter
npm run lint

# 3. Correction automatique si possible
npm run lint -- --fix
```

### Règles strictes
- **Si `tsc` retourne des erreurs** → corriger avant de continuer, ne jamais ignorer
- **Si `lint` retourne des erreurs** → corriger avant de continuer
- **Jamais de `// @ts-ignore` ou `// eslint-disable`** sans justification explicite commentée
- **Jamais de `any`** → toujours typer explicitement
- Ces vérifications s'appliquent à **chaque fichier modifié**, pas uniquement au fichier principal

---

## 🧑‍💻 Conventions de code

- **TypeScript strict** : pas de `any`, typer toutes les fonctions
- **Prisma** : toujours utiliser le client singleton dans `lib/db.ts`
- **Composants** : un fichier par composant, nommage PascalCase
- **API Routes** : toujours gérer les erreurs avec try/catch et retourner des codes HTTP appropriés
- **Variables d'environnement** : préfixe `NEXT_PUBLIC_` uniquement pour ce qui doit être exposé côté client

---

## 📦 Dépendances ESLint à installer

```bash
npm install --save-dev \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  eslint-config-next
```

---

## ⚙️ Commandes utiles

```bash
npm run dev            # Démarrer en développement
npm run build          # Build production
npm run validate       # tsc + lint en une seule commande (obligatoire avant commit)
npx tsc --noEmit       # Vérification TypeScript seule
npm run lint           # Linter ESLint seul
npm run lint -- --fix  # Correction automatique ESLint
npx prisma studio      # Interface visuelle base de données
npx prisma migrate dev --name <nom>  # Créer une migration
npx prisma generate    # Regénérer le client Prisma
```

> Ajouter ce script dans `package.json` :
> ```json
> "validate": "tsc --noEmit && eslint . --ext .ts,.tsx"
> ```

---

## 🔑 Variables d'environnement requises

```env
DATABASE_URL=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

CINETPAY_API_KEY=
CINETPAY_SITE_ID=
CINETPAY_WEBHOOK_SECRET=

RESEND_API_KEY=

NEXTAUTH_SECRET=
NEXTAUTH_URL=

MOODLE_BASE_URL=
MOODLE_TOKEN=
```

---

## 📚 Documentation complémentaire

- Décisions techniques et raisonnements : `docs/DECISIONS.md`

---

## 🚧 Décisions en attente

- [ ] Admin custom vs Sanity.io pour la gestion produits
- [ ] Intégration Moodle : enrollment automatique via API ou lien token ?
- [ ] Nom de domaine et configuration DNS Infomaniak
