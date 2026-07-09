# Dev setup

## ESLint dependencies

```bash
npm install --save-dev \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  @next/eslint-plugin-next \
  eslint-plugin-react \
  eslint-plugin-react-hooks
```

ESLint v9 flat config format — config file: `eslint.config.mjs`

Add to `package.json`:
```json
"validate": "tsc --noEmit && eslint . --ext .ts,.tsx"
```

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

---

## Required environment variables

```env
DATABASE_URL=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

PAYDUNYA_MASTER_KEY=
PAYDUNYA_PRIVATE_KEY=
PAYDUNYA_TOKEN=

RESEND_API_KEY=
RESEND_FROM_EMAIL=

NEXTAUTH_SECRET=
NEXTAUTH_URL=

NEXT_PUBLIC_MOODLE_BASE_URL=
MOODLE_TOKEN=

NEXT_PUBLIC_R2_PUBLIC_URL=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_ENDPOINT=
R2_ENDPOINT_PUBLIC=
R2_BUCKET_NAME=
```
