# Car Rental Website

![Tech Stack](https://img.shields.io/badge/Next.js-14.2.3-000000?logo=next.js) ![Drizzle](https://img.shields.io/badge/Drizzle-0.30.8-FFDB1E?logo=postgresql) ![Hono](https://img.shields.io/badge/Hono-4.3.8-FF6B6B) ![Paystack](https://img.shields.io/badge/Paystack-Integration-00A572)

Welcome to the **Car Rental Website** – a modern platform for seamless car rentals, bookings, and delivery services. Built with Next.js, Hono, and PostgreSQL, this application offers robust features for users and admins, integrated with secure payments via Paystack.

![Homepage Preview](./public/homepage.png)

## ✨ Features

### **User Features**
- 🚗 Browse and search available cars by type, price, or location.
- 📅 Book or hire cars for specific dates and durations.
- 🚚 Request car delivery to your location.
- 💳 Secure payments via Paystack integration.
- 📊 Track bookings, payments, and delivery statuses.

### **Admin Features**
- 🔧 Full CRUD operations for managing cars, bookings, and users.
- 📈 Monitor system performance and user activity.
- 💰 View and manage payment records.
- 📦 Update car availability and delivery statuses.

## 🛠️ Tech Stack

**Frontend:**
- ![Next.js](https://img.shields.io/badge/-Next.js-000000?logo=next.js)
- ![React](https://img.shields.io/badge/-React-61DAFB?logo=react)
- ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript)
- ![Shadcn/ui](https://img.shields.io/badge/-Shadcn/ui-334155)

**Backend:**
- ![Hono](https://img.shields.io/badge/-Hono-FF6B6B)
- ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js)

**Database:**
- ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql)
- ![Drizzle](https://img.shields.io/badge/-Drizzle_ORM-FFDB1E)
- ![Neon](https://img.shields.io/badge/-Neon-00E59B)

**Payment:**
- ![Paystack](https://img.shields.io/badge/-Paystack-00A572)

## 🚀 Getting Started

### Prerequisites
- Node.js ≥18.x
- PostgreSQL database ([Neon](https://neon.tech) recommended)
- Paystack API keys

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/devalentineomonya/Car-Rential-Website-Next-TS-Hono-React-Shadcn.git
   cd Car-Rential-Website-Next-TS-Hono-React-Shadcn
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Set up environment variables**
   Create `.env` in the root directory:
   ```env
   DATABASE_URL="postgres://user:password@neon-hostname/project"
   PAYSTACK_SECRET_KEY="your_paystack_secret_key"
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="your_paystack_public_key"
   ```

4. **Database setup**
   ```bash
   # Run drizzle-kit migrations
   npm run db:generate
   npm run db:migrate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Visit `http://localhost:3000`

## 📂 Project Structure

```bash
.
├── app/                # Next.js app router
├── components/         # React components
├── drizzle/            # Drizzle ORM schema and migrations
├── lib/                # Database connection and utilities
├── public/             # Static assets
├── server/             # Hono API routes
├── types/              # TypeScript types
└── .env.example        # Environment template
```

## 🔌 Payment Integration

The payment system uses **Paystack** with proper type safety and transaction verification:

```typescript
// Example Drizzle schema for payments
import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';

export const payments = pgTable('payments', {
  id: varchar('id').primaryKey(),
  amount: varchar('amount').notNull(),
  status: varchar('status').default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
});
```

## 🌐 Deployment

1. **Frontend**: Deploy to [Vercel](https://vercel.com)
2. **Backend**: Host Hono API on [Cloudflare Workers](https://workers.cloudflare.com)
3. **Database**: Use [Neon](https://neon.tech) for serverless PostgreSQL

---

Built with ❤️ by [Valentine Omonya](https://github.com/devalentineomonya)  
[![GitHub Issues](https://img.shields.io/github/issues/devalentineomonya/Car-Rential-Website-Next-TS-Hono-React-Shadcn)](https://github.com/devalentineomonya/Car-Rential-Website-Next-TS-Hono-React-Shadcn/issues)

