# Roadmap — Mon Enfant Extraordinaire

> Légende : ✅ Terminé · 🔄 En cours / partiel · ⬜ À faire

---

## 1. Infrastructure & Base

- ✅ Initialisation Next.js 14 (App Router, TypeScript strict)
- ✅ Configuration ESLint + Prettier + pré-commit Husky
- ✅ Schéma Prisma : `Product`, `Order`, `OrderItem`, `AdminUser`
- ✅ Tables `Training` (moodleCourseId) et `Ebook` (fileUrl) ; enum `AccessType` (PAID/FREE_DIRECT)
- ✅ Client Prisma singleton (`lib/db.ts`) + adapter-pg (Prisma 7)
- ✅ Script de seed (`prisma/seed.ts`) avec fixtures training/ebook
- ✅ Alias TypeScript (`@/`)
- ✅ Structure de dossiers et route groups (`(shop)`, `(secondary)`)
- ✅ Migrations PostgreSQL initiales (types monétaires `NUMERIC(10,2)`)

---

## 2. Paiements & Webhooks

- ✅ Intégration Stripe (Europe)
- ✅ Intégration Flutterwave (Afrique francophone : CI, SN, CM, ML, TG, BF, BJ, GN)
- ✅ Sélection automatique de gateway selon le pays (`lib/geo.ts`)
- ✅ API checkout (`/api/checkout`) : validation, création commande, idempotence
- ✅ Webhook Stripe (`/api/stripe/webhook`) : validation signature, transition PENDING→PAID
- ✅ Webhook Flutterwave (`/api/flutterwave/webhook`) : validation signature + vérification transaction
- ✅ Conversion devise EUR ↔ XOF/XAF à la frontière de paiement

---

## 3. Emails transactionnels

- ✅ Intégration Resend (`lib/email.ts`)
- ✅ Email de confirmation de commande (liste des articles + total)
- ✅ Email d'accès Moodle post-achat (URL de cours propre, après enrôlement réel)
- ✅ Échappement HTML dans les templates (`lib/escapeHtml.ts`)
- ⬜ Templates React Email avec mise en page visuelle soignée

---

## 4. Intégration Moodle

- ✅ Client REST Moodle (`lib/moodle/client.ts`) — token via `MOODLE_TOKEN`
- ✅ `getOrCreateUser` : recherche par email (`core_user_get_users`) + création si absent (`core_user_create_users`, `createpassword=1`)
- ✅ `enrolUserToCourse` : inscription manuelle au cours (`enrol_manual_enrol_users`, rôle étudiant)
- ✅ Webhooks Stripe + Flutterwave : enrôlement automatique post-achat, formations uniquement
- ⬜ Back-office : association produit ↔ `moodleCourseId`

---

## 5. Catalogue Produits & Formations

- ✅ Page catalogue Outils (`/outils`) : grille de produits depuis la DB
- ⬜ Page détail Outil (`/outils/[slug]`) : placeholder — à connecter à la DB
- ✅ Page catalogue Formations (`/formations`) : grille de formations depuis la DB
- ✅ Page détail Formation (`/formations/[slug]`) : description, contenu, CTA achat
- ⬜ Composant `ProductCard` réutilisable
- ⬜ Galerie d'images produit

---

## 6. Panier & Checkout

- ✅ État du panier côté client (Context API + localStorage)
- ✅ Composant panier (ajout/suppression/quantité) — mini-cart navbar (dropdown desktop, panel mobile)
- ✅ Page checkout (`/checkout`) : récapitulatif + formulaire client (prénom, nom, email, pays, téléphone si Flutterwave)
- ✅ Sélection visuelle du moyen de paiement (Stripe / Flutterwave) selon le pays détecté
- ✅ Validation côté client avant appel API
- ✅ Page confirmation de commande (`/checkout/confirmation`) : résumé post-paiement
- ✅ API `GET /api/products/[slug]` pour résoudre slug → ID produit DB
- ✅ Boutons d'achat branchés sur les pages formations et outils

---

## 7. Pages de contenu éditorial

- ✅ Page d'accueil (`/`) : hero, valeurs, StatBlocks, CTA
- ✅ Page Comprendre (`/comprendre`) : 3 onglets via `TabSection`
- ✅ Page Aider (`/aider`) : 4 onglets via `TabSection`
- ✅ Page Ressources (`/ressources`) : contenus gratuits
- ✅ Page Qui suis-je ? (`/qui-suis-je`)
- ✅ Page Le site (`/le-site`)
- ✅ Page FAQ (`/faq`)
- 🔄 Page Contact (`/contact`) : formulaire UI complet — API d'envoi à connecter

---

## 8. Navigation & Layout

- ✅ `Navbar.tsx` : nav inline, style complet, menu hamburger mobile
- ✅ `Footer.tsx` : liens légaux, réseaux sociaux, contact
- ⬜ Mentions légales / CGV / Politique de confidentialité

---

## 9. Back-office Admin

- ✅ Modèle `AdminUser` en base
- ✅ NextAuth.js installé
- ⬜ Page de login admin (`/admin/login`)
- ⬜ Configuration NextAuth (credentials provider)
- ⬜ Dashboard produits : CRUD (créer, éditer, archiver)
- ⬜ Upload d'images produits
- ⬜ Dashboard commandes : liste, statuts, détail
- ⬜ Association produit formation ↔ cours Moodle

---

## 10. SEO & Performance

- ⬜ Métadonnées `<title>` et `<description>` sur chaque page
- ⬜ Open Graph / Twitter Card pour le partage social
- ⬜ `sitemap.xml` généré dynamiquement
- ⬜ `robots.txt`
- ⬜ Optimisation images (`next/image`)
- ⬜ Core Web Vitals : audit Lighthouse

---

## 11. Tests & Qualité

- ⬜ Tests unitaires sur les helpers (`geo.ts`, `email.ts`, `escapeHtml.ts`)
- ⬜ Tests d'intégration : flux checkout → webhook → email
- ⬜ Tests e2e du tunnel d'achat (Playwright ou Cypress)
- ⬜ Fixtures Stripe/Flutterwave pour CI

---

## 12. Déploiement & DevOps

- 🔄 Configuration déploiement Infomaniak (Node.js)
  - ✅ Node.js 24 ciblé (`engines`, `@types/node`, `.nvmrc`)
- ⬜ Variables d'environnement de production
- ⬜ Pipeline CI/CD (GitHub Actions : lint + tsc + tests)
- ⬜ Environnement de staging
- ⬜ Monitoring des erreurs (Sentry ou équivalent)
- ⬜ Sauvegarde PostgreSQL automatisée
