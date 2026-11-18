# Delicioso

Delicioso is a full-stack pizza (food) ordering web app built with Next.js 14. Users can browse a product catalog, filter and search it, customize pizzas (size, dough type, extra ingredients), manage a cart, sign in, and pay for orders online.

## Features

- **Catalog** – categories, sorting, price-range and ingredient filters (synced with the URL query), live product search
- **Product modal** – intercepting/parallel routes open a product in a modal (`/product/[id]` also works as a standalone page)
- **Pizza customization** – size, dough type and extra ingredients with live price calculation
- **Cart** – drawer cart persisted per user/token, quantity controls, totals recalculated on the server
- **Stories** – Instagram-style promo stories on the home page
- **Authentication** – NextAuth with credentials (email + e-mail verification code), GitHub and Google
- **Checkout** – validated form (react-hook-form + zod), address autocomplete (DaData), phone mask
- **Payments** – PayPal order creation and payment capture
- **Transactional e-mails** – verification, payment link, order success/cancellation via Resend
- **Profile & dashboard** – profile editing and a dashboard page
- Responsive UI with skeleton loaders and toast notifications

## Tech Stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 14 (App Router), React 18, TypeScript |
| Styling / UI | Tailwind CSS, shadcn/ui (Radix UI), Vaul, lucide-react, Swiper |
| State & forms | Zustand, react-hook-form, zod, react-use |
| Backend | Next.js route handlers and server actions |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth.js, bcrypt |
| Payments / e-mail | PayPal, Resend |
| Tooling | ESLint, GitHub Actions CI |

## Project Structure

```
app/
  (root)/            Home page, product page, profile, @modal (intercepted product modal)
  (checkout)/        Checkout page
  (complete-order)/  Order completion page
  (dashboard)/       Dashboard
  api/               auth, cart, ingredients, products/search, stories, users, capture-payment
  actions.ts         Server actions (orders, user updates, registration)
prisma/              schema.prisma, seed.ts, constants.ts, prisma-client.ts
shared/
  components/        ui/ (shadcn primitives) and shared/ (feature components, forms, e-mail templates)
  constants/         Auth options, form schemas, pizza constants
  hooks/             Cart, filters, ingredients, pizza options, etc.
  lib/               Price calculation, cart helpers, PayPal, e-mail helpers
  services/          Axios API client and DTOs
  store/             Zustand stores
@types/              Type augmentations
```

Data model (Prisma): `User`, `Category`, `Product`, `ProductItem`, `Ingredient`, `Cart`, `CartItem`, `Order`, `VerificationCode`, `Story`, `StoryItem`.

## Getting Started

### Prerequisites

- Node.js 20+ (CI uses 21)
- A PostgreSQL database

### Installation

```bash
git clone <repository-url>
cd Delicioso
npm install        # also runs `prisma generate`
```

### Environment variables

Create a `.env` file in the project root:

```env
# Database
POSTGRES_URL=postgresql://user:password@localhost:5432/delicioso

# App
BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=/api

# NextAuth
NEXTAUTH_SECRET=your-secret
GITHUB_ID=
GITHUB_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# PayPal
PAYPAL_BASE_URL=https://api-m.sandbox.paypal.com
PAYPAL_CLIENT_ID=
PAYPAL_SECRET=

# E-mail
RESEND_API_KEY=
```

Check the code (e.g. `shared/services/constants.ts`, `shared/lib`) for the exact format expected for each value. You may also need a DaData token for the address input (`shared/components/shared/AddressInput.tsx`).

### Database

```bash
npm run prisma:push   # create tables from the schema
npm run prisma:seed   # fill with sample categories, products, ingredients, stories
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Run the production build |
| `npm run lint` | Lint with ESLint |
| `npm run prisma:push` | Sync the Prisma schema to the database |
| `npm run prisma:studio` | Open Prisma Studio |
| `npm run prisma:seed` | Seed the database |

## CI

A GitHub Actions workflow (`.github/workflows/github-actions.yml`) installs dependencies and builds the project on pushes to `main`/`develop` and on pull requests to `main`.
