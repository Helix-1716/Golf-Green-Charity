# 🏌️‍♂️ Golf for Good: The Digital Clubhouse

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth_%26_DB-emerald?logo=supabase)](https://supabase.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-blue?logo=stripe)](https://stripe.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Cinematic-purple?logo=framer)](https://www.framer.com/motion/)

> **Golf for Good** is a premium editorial-first membership platform where professional performance tracking meets global charitable impact. Play the game you love, support a cause that matters.

---

## ✨ The Elevated Fairway Experience

Designed under the **"Digital Clubhouse"** philosophy, this platform rejects rigid templates in favor of **Intentional Asymmetry**, **Glassmorphism**, and **Tonal Depth**.

### 🏆 Core Pillars
- **Performance Mastery**: Advanced Stableford score tracking with rolling average analytics.
- **Purpose-Driven Play**: Real-time integration with global charities (Green Golf Earth, Foundation Verified).
- **Exclusive Rewards**: Automated **Monthly Prize Draws** for the latest PGA-standard gear.
- **Sovereign Security**: Enterprise-grade authentication and data handling via **Supabase**.
- **Financial Transparency**: Fully integrated **Stripe** billing portal for seamless membership management.

---

## 🏗️ Technical Architecture

| Layer | Technology |
|---|---|
| **Frontend** | React 19 + Next.js 15 (App Router) |
| **Logic** | TypeScript (Strict Mode) |
| **Backend** | Supabase (PostgreSQL, Auth, Realtime) |
| **Payments** | Stripe (Checkout, Webhooks, Portal) |
| **Motion** | Framer Motion (Cubic-bezier transitions) |
| **Styling** | Tailwind CSS + CSS Variables |

---

## 🚀 Local Development Strategy

### 1. Environment Configuration
Create a `.env.local` file with the following variables:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_pub_key
STRIPE_PRICE_ID=your_subscription_price_id
```

### 2. Installation & Launch
```bash
# Install dependencies
npm install

# Start development engine
npm run dev
```

### 3. Database Schema
Execute the following SQL in your Supabase Editor to initialize the performance engine:

```sql
CREATE TABLE public.scores (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  course text NOT NULL,
  score integer NOT NULL,
  date date DEFAULT CURRENT_DATE,
  created_at timestamp with time zone DEFAULT now()
);
```

---

## ⛳ Vision for the Club
We believe that golf should be about more than just a round. It's about community, excellence, and progress. **Golf for Good** creates a 10,000-member network of golfers committed to removing the carbon footprint of the game and providing clean water solutions globally through every stroke.

Built with ❤️ by **Helix** | © 2026 Golf for Good Ltd. All rights reserved.
