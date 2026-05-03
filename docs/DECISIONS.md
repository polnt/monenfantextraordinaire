# 📋 Décisions techniques du projet — Site Vitrine + Boutique

> Fichier de contexte généré depuis Claude.ai
> À placer à la racine du projet et à inclure dans les conversations Claude Code (VS Code)

---

## 🎯 Objectif du projet

- Site **vitrine + boutique e-commerce**
- Cible géographique : **Europe** + **Afrique francophone**
- Volume produits : **20 à 100 produits**
- Objectif : **MVP rapide**, travail solo
- Deux types de produits : **formations** (lien Moodle par email) et **ebooks** (PDF, lien de téléchargement par email)
- Aucun produit physique — pas de gestion de stock ni d'expédition

---

## 🧱 Stack technique

| Brique | Outil | Notes |
|---|---|---|
| Framework | **Next.js 14** (App Router) | SSG/ISR + API Routes intégrées (pas de SSR global) |
| Langage | **TypeScript** | |
| Base de données | **PostgreSQL + Prisma** | ORM typé, migrations incluses |
| Paiement Europe | **Stripe** | CB, Apple Pay, Google Pay, SEPA |
| Paiement Afrique francophone | **Flutterwave** | Mobile Money, cartes bancaires |
| Emails transactionnels | **Resend + React Email** | Confirmation commande + lien Moodle |
| Auth back-office | **NextAuth.js** | Accès admin uniquement, pas d'espace client |
| Gestion produits | **Admin custom** intégré | Données en PostgreSQL, pas de CMS externe |
| Déploiement | **Infomaniak** | Offre Node.js ou Docker, HTTPS natif |

---

## 🖥️ Stratégie de rendu par page

| Page | Mode | Pourquoi |
|---|---|---|
| Accueil / vitrine | **SSG** | Contenu statique, performances maximales |
| Catalogue produits | **ISR** | SEO + mises à jour sans rebuild complet |
| Fiche produit | **ISR** | SEO + contenu qui change peu |
| Panier / Checkout | **CSR** | Données locales, pas d'indexation nécessaire |
| Confirmation commande | **CSR** | Dynamique, pas d'indexation |
| Back-office admin | **CSR** | Pas besoin de SEO |
| API Routes (webhooks, checkout) | **Server** | Traitement sécurisé côté serveur |

---

## 💳 Architecture paiement

- Détection du pays client au moment du checkout (via champ adresse ou IP)
- **Pays européens** → passerelle **Stripe**
- **Pays d'Afrique francophone** → passerelle **Flutterwave**

### Pays Flutterwave couverts (Afrique francophone)
Côte d'Ivoire, Sénégal, Cameroun, Mali, Togo, Burkina Faso, Bénin, Guinée

### Sécurité paiements
- PCI-DSS géré par Stripe et Flutterwave (l'app ne touche jamais les données carte)
- Validation des signatures webhook obligatoire avant confirmation de commande
- Idempotence des webhooks (éviter double validation)
- Clés API exclusivement en variables d'environnement
- HTTPS obligatoire sur tous les endpoints

---

## 📧 Flux post-achat (Moodle)

```
Webhook paiement confirmé (Stripe ou Flutterwave)

        ↓
Validation signature webhook
        ↓
Création commande en base de données
        ↓
Si produit = formation → génération lien Moodle unique
        ↓
Envoi email automatique via Resend
(confirmation commande + lien d'accès Moodle si applicable)
```

---

## 🗂️ Structure du projet

```
my-shop/
├── app/
│   ├── (shop)/                     # Pages publiques
│   │   ├── page.tsx                # Accueil / vitrine
│   │   ├── produits/
│   │   │   ├── page.tsx            # Catalogue
│   │   │   └── [slug]/page.tsx     # Fiche produit
│   │   └── checkout/
│   │       ├── page.tsx            # Panier + formulaire
│   │       └── confirmation/page.tsx
│   ├── api/
│   │   ├── stripe/webhook/route.ts
│   │   ├── flutterwave/webhook/route.ts
│   │   ├── checkout/route.ts
│   │   └── orders/route.ts
│   └── admin/                      # Back-office protégé
│       ├── page.tsx
│       ├── produits/page.tsx
│       └── commandes/page.tsx
├── components/
│   ├── shop/
│   ├── checkout/
│   └── admin/
├── lib/
│   ├── stripe.ts
│   ├── flutterwave.ts              # Client Flutterwave
│   ├── db.ts                       # Prisma client
│   ├── email.ts                    # Resend + logique Moodle
│   └── geo.ts                      # Détection pays → passerelle
├── prisma/
│   └── schema.prisma
├── types/
├── .env.local                      # Ne jamais committer
└── DECISIONS.md                    # Ce fichier
```

---

## 🔐 Variables d'environnement (.env.local)

```env
# Base de données
DATABASE_URL=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Flutterwave
FLW_SECRET_KEY=
FLW_SECRET_HASH=

# Resend (emails)
RESEND_API_KEY=

# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Moodle
MOODLE_BASE_URL=
MOODLE_TOKEN=
```

---

## ⚠️ Points d'attention Infomaniak

- Utiliser l'offre **Node.js** ou **Docker** (pas d'hébergement statique)
- Les webhooks Stripe et Flutterwave nécessitent une URL publique HTTPS → natif sur Infomaniak
- Version Node.js : **24** (requis par l'offre Infomaniak, confirmé en avril 2026)

---

## 📄 Pages outils — données statiques (MVP)

Les pages `/outils/[slug]` (`legumes-photos`, `legumes-illustrations`, `animaux`) utilisent des données **statiques hardcodées** dans le fichier page.tsx, générées à build-time via `generateStaticParams`.

**Pourquoi :** gain de temps pour le MVP — pas besoin de BDD ni d'admin pour les 3 premiers outils.

**À faire plus tard :** remplacer les constantes `PRODUCTS` par des requêtes Prisma, et utiliser ISR (`revalidate`) pour que les mises à jour produit n'imposent pas de rebuild complet.

---

## 🚧 Décisions en attente

- [ ] Choix final entre **admin custom** et **Sanity.io** pour la gestion produits
- [ ] Nombre exact de produits au lancement
- [ ] Intégration Moodle : enrollment automatique via API Moodle ou lien token ?
- [ ] Nom de domaine et configuration DNS sur Infomaniak

---

*Dernière mise à jour : session Claude.ai initiale*
