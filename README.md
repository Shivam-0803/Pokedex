# 🧩 Pokédex App

A simple Pokédex web app to search and filter Pokémon by name or type.  
Built using modern full-stack tools with a clean UI and a PostgreSQL backend.

---

## 🚀 Live Demo

👉 https://pokedex-zeta-mauve-40.vercel.app/

---
 ## Local Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database:
   ```bash
   npm run db:push
   npm run db:seed
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)


## ✨ Features

- 🔍 Search a single Pokémon by name  
- 🧾 Search multiple Pokémon (comma-separated)  
- 🧪 Filter Pokémon by type (fire, water, electric, etc.)  
- 🖼️ Pokémon sprites fetched from PokéAPI assets  
- ⚡ Fast queries using Prisma ORM  
- ☁️ Deployed on Vercel with Neon PostgreSQL  

---

## 🛠️ Tech Stack

**Frontend**
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

**Backend**
- tRPC
- Prisma ORM
- PostgreSQL (Neon)

**Deployment**
- Vercel (production)
- Neon (serverless Postgres)

---

## 📦 Database Schema

```prisma
model Pokemon {
  id     Int    @id @default(autoincrement())
  name   String @unique
  types  String
  sprite String
}
