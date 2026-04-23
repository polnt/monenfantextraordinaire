# Roadmap — Mon Enfant Extraordinaire

> Légende : ✅ Terminé · 🔄 En cours / partiel · ⬜ À faire

---

## 1. Infrastructure & Base

- ✅ Initialisation Next.js 14 (App Router, TypeScript strict)
- ✅ Configuration ESLint + Prettier + pré-commit Husky
- ✅ Schéma Prisma : `Product`, `Order`, `OrderItem`, `AdminUser`
- ✅ Client Prisma singleton (`lib/db.ts`)
- ✅ Alias TypeScript (`@/`)
- ✅ Structure de dossiers et route groups (`(shop)`, `(secondary)`)
- ✅ Migrations PostgreSQL initiales (types monétaires `NUMERIC(10,2)`)

---

## 2. Paiements & Webhooks

- ✅ Intégration Stripe (Europe)
- ✅ Intégration Flutterwave (Afrique francophone : CI, SN, CM, ML, TG, BF, BJ, GN)
- ✅ Sélection automatique de gateway selon le pays (`lib/geo.ts`)
- ✅ API checkout (`/api/checkout`) : validation, réservation de stock atomique, idempotence
- ✅ Webhook Stripe (`/api/stripe/webhook`) : validation signature, transition PENDING→PAID
- ✅ Webhook Flutterwave (`/api/flutterwave/webhook`) : validation signature + vérification transaction
- ✅ Restauration du stock en cas d'échec de paiement
- ✅ Conversion devise EUR ↔ XOF/XAF à la frontière de paiement

---

## 3. Emails transactionnels

- ✅ Intégration Resend (`lib/email.ts`)
- ✅ Email de confirmation de commande (liste des articles + total)
- ✅ Email d'accès Moodle post-achat (lien tokenisé)
- ✅ Échappement HTML dans les templates (`lib/escapeHtml.ts`)
- ✅ Gestion gracieuse si configuration Moodle absente
- ⬜ Templates React Email avec mise en page visuelle soignée

---

## 4. Catalogue Produits & Formations

- ⬜ Page catalogue Outils (`/outils`) : grille de produits depuis la DB
- ⬜ Page détail Outil (`/outils/[slug]`) : description, prix, stock, CTA achat
- ⬜ Page catalogue Formations (`/formations`) : grille de formations depuis la DB
- ⬜ Page détail Formation (`/formations/[slug]`) : description, contenu, CTA achat
- ⬜ Composant `ProductCard` réutilisable
- ⬜ Gestion de l'affichage "rupture de stock"
- ⬜ Galerie d'images produit

---

## 5. Panier & Checkout

- ⬜ État du panier côté client (Context API ou Zustand)
- ⬜ Composant panier (ajout/suppression/quantité)
- ⬜ Page checkout (`/checkout`) : récapitulatif + formulaire client (email, pays, adresse)
- ⬜ Sélection visuelle du moyen de paiement (Stripe / Flutterwave) selon le pays détecté
- ⬜ Validation côté client avant appel API
- ⬜ Page confirmation de commande (`/checkout/confirmation`) : résumé post-paiement

---

## 6. Pages de contenu éditorial

- 🔄 Page d'accueil (`/`) : placeholder — à construire (hero, valeur, CTA)
- ⬜ Page Comprendre (`/comprendre`) : 3 onglets (Trouble du développement, L'autisme de A à Z, Trouble de l'attention)
- ⬜ Page Aider (`/aider`) : 4 onglets (Les parents, Les professionnels, Les méthodes, Les outils de communication)
- ⬜ Page Ressources (`/ressources`) : contenus gratuits (articles, téléchargements)
- ⬜ Page Qui suis-je ? (`/qui-suis-je`)
- ⬜ Page Le site (`/le-site`)
- ⬜ Page FAQ (`/faq`)
- ⬜ Page Contact (`/contact`) avec formulaire fonctionnel

---

## 7. Navigation & Layout

- 🔄 `Navbar.tsx` : composant créé, liens en dur — à finaliser (style, responsive)
- 🔄 `SecondaryDropdown.tsx` : créé, à styliser
- ⬜ Menu hamburger mobile
- ⬜ Footer (liens légaux, réseaux sociaux, contact)
- ⬜ Mentions légales / CGV / Politique de confidentialité

---

## 8. Back-office Admin

- ✅ Modèle `AdminUser` en base
- ✅ NextAuth.js installé
- ⬜ Page de login admin (`/admin/login`)
- ⬜ Configuration NextAuth (credentials provider)
- ⬜ Dashboard produits : CRUD (créer, éditer, archiver, gérer le stock)
- ⬜ Upload d'images produits
- ⬜ Dashboard commandes : liste, statuts, détail
- ⬜ Association produit formation ↔ cours Moodle

---

## 9. SEO & Performance

- ⬜ Métadonnées `<title>` et `<description>` sur chaque page
- ⬜ Open Graph / Twitter Card pour le partage social
- ⬜ `sitemap.xml` généré dynamiquement
- ⬜ `robots.txt`
- ⬜ Optimisation images (`next/image`)
- ⬜ Core Web Vitals : audit Lighthouse

---

## 10. Tests & Qualité

- ⬜ Tests unitaires sur les helpers (`geo.ts`, `email.ts`, `escapeHtml.ts`)
- ⬜ Tests d'intégration : flux checkout → webhook → email
- ⬜ Tests e2e du tunnel d'achat (Playwright ou Cypress)
- ⬜ Fixtures Stripe/Flutterwave pour CI

---

## 11. Déploiement & DevOps

- 🔄 Configuration déploiement Infomaniak (Node.js)
  - ✅ Node.js 24 ciblé (`engines`, `@types/node`, `.nvmrc`)
- ⬜ Variables d'environnement de production
- ⬜ Pipeline CI/CD (GitHub Actions : lint + tsc + tests)
- ⬜ Environnement de staging
- ⬜ Monitoring des erreurs (Sentry ou équivalent)
- ⬜ Sauvegarde PostgreSQL automatisée
