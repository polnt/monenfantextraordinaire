# Instructions — Envoi de produits PDF par email (eshop Next.js)

## Contexte

Eshop Next.js vendant des produits numériques (PDF). Certains produits sont
payants, d'autres gratuits. Objectif : envoyer automatiquement le PDF acheté
(ou téléchargé gratuitement) par email au client, via un lien de
téléchargement sécurisé et temporaire — pas en pièce jointe brute.

**Paiements :**
- Stripe pour les clients en Europe
- Paydunya pour les clients en Afrique

**Email :** Resend (déjà configuré dans le projet — récupérer la clé API
existante, ne pas en recréer une).

---

## Vue d'ensemble du flow

```
Commande créée (checkout)
   │
   ├─ Produit gratuit ──────────────────► déclenche l'envoi immédiatement
   │
   └─ Produit payant
         ├─ Client UE  → Stripe Checkout → webhook Stripe   ┐
         └─ Client Afrique → Paydunya invoice → webhook IPN ┘──► déclenche l'envoi
                                                                       │
                                                                       ▼
                                                        Génère un token de téléchargement
                                                        Enregistre en DB (order/token)
                                                        Envoie l'email via Resend avec
                                                        un lien /download/[token]
                                                                       │
                                                                       ▼
                                                   Le client clique → route vérifie le
                                                   token (non expiré, non déjà trop utilisé)
                                                   → stream/redirige vers le fichier réel
```

**Principe clé : ne jamais mettre les PDF dans `/public`.** Même les
produits gratuits doivent passer par un lien à token, sinon n'importe qui
peut deviner l'URL et siphonner tout le catalogue sans laisser de trace.

---

## 1. Stockage des fichiers PDF

Utiliser **Cloudflare R2** (compatible API S3, pas de frais de sortie/egress,
moins cher que S3 pour ce cas d'usage).

- Créer un bucket privé (pas d'accès public direct).
- Les PDF sont uploadés dans ce bucket (manuellement via dashboard pour
  commencer, ou via un script d'upload si beaucoup de produits).
- Convention de nommage : `products/{productId}.pdf` (ou
  `products/{productId}/{slug}.pdf` si plusieurs fichiers par produit).
- Ne jamais exposer l'URL R2 brute côté client — toujours passer par une
  route API qui génère une URL signée à la demande.

Variables d'environnement à ajouter (`.env.local` et plateforme de
déploiement) :

```
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_ENDPOINT=https://<account_id>.r2.cloudflarestorage.com
```

Installer le SDK S3 (compatible R2) :

```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

---

## 2. Modèle de données

Ajouter (Prisma, Drizzle, ou l'ORM déjà utilisé dans le projet — vérifier
l'existant avant de choisir) une table `DownloadToken` :

| Champ        | Type      | Description                                      |
|--------------|-----------|---------------------------------------------------|
| id           | string    | UUID, clé primaire                                |
| token        | string    | token unique, généré aléatoirement (32 bytes hex) |
| productId    | string    | référence au produit                              |
| orderId      | string?   | référence à la commande (null si gratuit sans compte) |
| email        | string    | email du destinataire                             |
| expiresAt    | datetime  | ex: maintenant + 7 jours                          |
| maxDownloads | int       | ex: 5                                              |
| downloadCount| int       | défaut 0                                          |
| createdAt    | datetime  |                                                    |

Si une table `Order` / `Product` existe déjà dans le projet, relier
`DownloadToken` à ces tables plutôt que dupliquer les infos.

---

## 3. Génération du token et envoi de l'email

Créer une fonction réutilisable, ex. `lib/sendProductEmail.ts` :

**Logique :**
1. Générer un token aléatoire sécurisé (`crypto.randomBytes(32).toString('hex')`).
2. Insérer une ligne `DownloadToken` en DB avec expiration (ex. 7 jours) et
   `maxDownloads` (ex. 5).
3. Construire l'URL : `https://tonsite.com/download/${token}`.
4. Envoyer l'email via Resend avec ce lien (pas le fichier en pièce jointe).
5. Logger l'envoi (pour debug et support client).

Cette fonction doit être appelée depuis **trois endroits** :
- Le webhook Stripe (paiement confirmé).
- Le webhook Paydunya (paiement confirmé).
- La route de "téléchargement gratuit" (pas de paiement requis).

**Template email (via Resend) :**
- Objet clair : "Votre fichier [Nom du produit] est prêt"
- Corps : lien de téléchargement, mention de l'expiration (ex. "ce lien
  est valable 7 jours"), lien de contact/support en cas de problème.
- Pas de pièce jointe — uniquement le lien.

---

## 4. Route de téléchargement sécurisée

Créer `app/download/[token]/route.ts` (Route Handler Next.js) :

**Logique :**
1. Récupérer le token depuis l'URL.
2. Chercher en DB : token existe ? non expiré ? `downloadCount < maxDownloads` ?
   - Si KO → page d'erreur claire ("lien expiré, contactez le support").
3. Si OK :
   - Incrémenter `downloadCount`.
   - Générer une URL signée R2 (validité courte, ex. 5 minutes) via
     `getSignedUrl` du SDK S3.
   - Rediriger (`redirect`) vers cette URL signée, ou streamer directement
     le fichier en réponse (le streaming est plus simple à monitorer mais
     consomme la bande passante du serveur Next.js — la redirection vers
     une URL signée R2 est préférable côté coûts et perf).

---

## 5. Webhook Stripe (clients Europe)

Si Stripe n'est pas encore intégré dans le projet, mettre en place un
Checkout Session standard. Si déjà en place, juste ajouter le webhook
ci-dessous.

Créer `app/api/webhooks/stripe/route.ts` :

**Points clés :**
- Vérifier la signature du webhook avec `stripe.webhooks.constructEvent`
  (variable d'env `STRIPE_WEBHOOK_SECRET`).
- Écouter l'événement `checkout.session.completed`.
- Récupérer `productId` et `email` depuis les `metadata` de la session
  Stripe (les définir lors de la création de la Checkout Session).
- Appeler `sendProductEmail({ productId, email, orderId })`.
- Toujours répondre `200` rapidement à Stripe pour éviter les retries
  inutiles ; faire le traitement lourd de façon asynchrone si besoin.

**Important :** configurer le webhook en mode test dans le dashboard
Stripe et tester avec `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
(Stripe CLI) avant la mise en prod.

---

## 6. Webhook Paydunya (clients Afrique)

Paydunya utilise un système d'**IPN (Instant Payment Notification)** : un
POST `application/x-www-form-urlencoded` envoyé sur une URL de callback
configurée dans le dashboard Paydunya.

Créer `app/api/webhooks/paydunya/route.ts` :

**Points clés :**
- Le body reçu est sous la clé `data` (pas du JSON direct — bien parser le
  format `application/x-www-form-urlencoded`).
- Champs utiles dans `data` :
  - `data.status` → `"completed"`, `"pending"`, ou `"cancelled"`
  - `data.invoice.total_amount`
  - `data.hash` → hash du `MasterKey` du compte Paydunya, **à vérifier
    impérativement** pour confirmer que la requête vient bien de Paydunya
    et pas d'un tiers malveillant.
  - `data.custom_data` → c'est ici qu'on peut faire transiter `productId`
    et `email` définis au moment de la création de l'invoice (à ajouter
    via `invoice.addCustomData(...)` côté création de facture).
- **Vérifier le statut ET le hash avant de déclencher l'envoi de l'email.**
- Ne traiter que si `data.status === "completed"`.
- Idéalement, double-vérifier le paiement via l'endpoint de confirmation
  Paydunya (`/checkout-invoice/confirm/{token}`) plutôt que de se fier
  uniquement à l'IPN, pour éviter tout risque de spoofing.

**Package npm officiel :** `paydunya` (Node.js wrapper). Variables d'env :

```
PAYDUNYA_MASTER_KEY=
PAYDUNYA_PRIVATE_KEY=
PAYDUNYA_PUBLIC_KEY=
PAYDUNYA_TOKEN=
PAYDUNYA_MODE=live # ou "test" en sandbox
```

---

## 7. Route "produit gratuit" (sans paiement)

Créer `app/api/products/[id]/claim-free/route.ts` (POST) :

**Logique :**
1. Vérifier que le produit est bien marqué comme gratuit en DB (ne jamais
   se fier à une donnée envoyée par le client pour décider si c'est gratuit).
2. Récupérer l'email envoyé par le formulaire client.
3. Valider le format de l'email.
4. (Optionnel mais recommandé) Rate-limiting par IP/email pour éviter le
   spam de demandes (ex. max 5 demandes par heure par IP).
5. Appeler `sendProductEmail({ productId, email, orderId: null })`.
6. Retourner un succès générique côté UI ("si l'email est valide, vous
   recevrez le lien sous peu") sans révéler d'infos sensibles.

---

## 8. Détection région UE vs Afrique

Pour orienter le client vers Stripe ou Paydunya, plusieurs options :

- **Simple** : laisser le client choisir son mode de paiement sur la page
  de checkout (2 boutons : "Payer par carte (Stripe)" / "Payer Mobile
  Money / autre (Paydunya)").
- **Auto** : détecter via la géolocalisation IP (header
  `x-vercel-ip-country` si déployé sur Vercel, ou un service comme
  ipapi) et proposer le moyen de paiement adapté par défaut, tout en
  laissant la possibilité de changer manuellement.

Recommandation : commencer par l'option simple (choix manuel), plus fiable
et plus simple à maintenir, et automatiser plus tard si besoin.

---

## 9. Sécurité — points à ne pas négliger

- **Ne jamais** stocker les PDF dans `/public` ou tout dossier servi
  statiquement.
- **Toujours** vérifier la signature/hash des webhooks (Stripe et
  Paydunya) avant de traiter quoi que ce soit.
- **Toujours** vérifier côté serveur que le produit est gratuit avant
  d'envoyer un lien sans paiement (ne pas faire confiance à une donnée
  envoyée par le formulaire client).
- **Limiter** la durée de vie des tokens de téléchargement et le nombre de
  téléchargements autorisés.
- **Logger** les envois d'email et les téléchargements pour pouvoir
  supporter les clients qui n'ont rien reçu (vérifier delivrabilité,
  bounce, etc. — Resend fournit ces infos dans son dashboard).
- **Idempotence** : un webhook peut être envoyé plusieurs fois pour le même
  événement (retries). Vérifier qu'on n'envoie pas l'email en double pour
  une même commande (ex. checker si un `DownloadToken` existe déjà pour cet
  `orderId` avant d'en créer un nouveau).

---

## 10. Plan d'implémentation suggéré (ordre des tâches)

1. Setup R2 (bucket + variables d'env + upload d'un PDF de test).
2. Modèle de données `DownloadToken` + migration.
3. Fonction `sendProductEmail` (sans webhook pour l'instant, testable en
   isolation avec un script).
4. Route `/download/[token]` (téléchargement sécurisé).
5. Route "produit gratuit" — flow le plus simple, permet de valider le
   pipeline complet (email → lien → téléchargement) sans dépendance
   paiement.
6. Webhook Stripe + test avec Stripe CLI.
7. Webhook Paydunya + test en mode sandbox.
8. Rate-limiting sur la route gratuite.
9. Tests de bout en bout : commande payante UE, commande payante Afrique,
   demande gratuite.

---

## Notes pour Claude Code

- Vérifier l'ORM et la structure DB déjà en place dans le projet avant de
  créer de nouvelles tables — adapter aux conventions existantes
  (Prisma/Drizzle/autre).
- Vérifier si Stripe est déjà intégré dans le projet ; si oui, ne faire que
  l'ajout du webhook et de l'appel à `sendProductEmail`.
- Vérifier la configuration Resend existante (clé API, domaine vérifié)
  avant d'en reconfigurer une.
- Utiliser TypeScript partout, cohérent avec le reste du projet.
- Ajouter des logs clairs (console.error minimum) sur tous les chemins
  d'échec (token invalide, webhook signature invalide, email non envoyé).
