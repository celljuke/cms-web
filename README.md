# Next.js Full-Stack Template

A modern, production-ready Next.js template with authentication, database, and API layer pre-configured. Perfect for building full-stack applications quickly.

## ⚡ Quick Start

### Using create-next-app (Fastest Way)

```bash
npx create-next-app@latest my-app -e https://github.com/celljuke/next-bender
cd my-app
./scripts/init-project.sh
npm run dev
```

> **Note**: The full GitHub URL is required for custom templates. The short format `-e celljuke/next-bender` only works for official Next.js examples.

### Using GitHub Template

1. Click the **"Use this template"** button at the top of this repository
2. Create your new repository
3. Clone it locally
4. Run `./scripts/init-project.sh`
5. Start coding with `npm run dev`

### Manual Clone

```bash
git clone https://github.com/celljuke/next-bender my-project
cd my-project
./scripts/init-project.sh
npm run dev
```

---

## 🚀 Tech Stack

### Core Framework

- **[Next.js 15.5](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Latest React with Server Components
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

### Styling

- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable components (New York style)
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Dark mode support
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[Motion](https://motion.dev/)** - Animations
- **[CVA](https://cva.style/)** - Class variance authority for component variants

### Database & ORM

- **[Prisma](https://www.prisma.io/)** - Next-generation ORM
- **[PostgreSQL 16](https://www.postgresql.org/)** - Relational database
- **Docker Compose** - Containerized database setup

### API Layer

- **[tRPC](https://trpc.io/)** - End-to-end typesafe APIs
- **[TanStack Query](https://tanstack.com/query)** - Powerful data synchronization
- **[Zod](https://zod.dev/)** - Schema validation

### Authentication

- **[Better Auth](https://www.better-auth.com/)** - Modern authentication library
- Email & Password authentication pre-configured
- Session management with database persistence

### State Management

- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management

### Additional Libraries

- **[date-fns](https://date-fns.org/)** - Date utility library
- **[Virtua](https://github.com/inokawa/virtua)** - Virtual scrolling
- **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)** - Password hashing

## 📋 Prerequisites

- **Node.js** 20+ and npm
- **Docker** and Docker Compose (for local database)
- **Git**

## 🛠️ Getting Started

### 1. Clone or Use This Template

```bash
# If using as a Git template
git clone <your-repo-url> my-new-project
cd my-new-project

# Or create from GitHub template
# Click "Use this template" button on GitHub
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local and update the values:
# - Generate a new BETTER_AUTH_SECRET: openssl rand -base64 32
# - Update DATABASE_URL if using a different database setup
```

### 4. Set Up the Database

The project includes a convenient setup script:

```bash
npm run db:setup
```

This will:

- Start PostgreSQL in Docker
- Wait for the database to be ready
- Generate Prisma client
- Push the schema to the database

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## 📦 Available Scripts

### Development

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server

### Database Management

- `npm run db:setup` - Complete database setup (first time)
- `npm run db:start` - Start PostgreSQL container
- `npm run db:stop` - Stop PostgreSQL container
- `npm run db:restart` - Restart PostgreSQL container
- `npm run db:logs` - View database logs
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Create and run migrations
- `npm run db:studio` - Open Prisma Studio (database GUI)
- `npm run db:reset` - Reset database (WARNING: deletes all data)
- `npm run db:seed` - Seed database with initial data

## 🏗️ Project Structure

```
.
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── auth/            # Better Auth endpoints
│   │   └── trpc/            # tRPC endpoints
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/               # React components
│   ├── ui/                  # shadcn/ui components
│   └── theme-provider.tsx   # Theme context
├── lib/                      # Utility libraries
│   ├── auth.ts              # Better Auth configuration
│   ├── auth-client.ts       # Auth client utilities
│   ├── prisma.ts            # Prisma client instance
│   ├── utils.ts             # Helper functions
│   └── trpc/                # tRPC configuration
│       ├── client.ts        # Client-side tRPC
│       └── provider.tsx     # tRPC React provider
├── server/                   # Server-side code
│   ├── api/                 # tRPC API
│   │   ├── context.ts       # tRPC context
│   │   ├── root.ts          # Root router
│   │   ├── trpc.ts          # tRPC instance
│   │   └── routers/         # API routers
│   ├── services/            # Business logic
│   └── index.ts             # Server exports
├── prisma/                   # Database
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Seed script
├── scripts/                  # Utility scripts
│   └── setup-db.sh          # Database setup script
├── public/                   # Static assets
├── components.json           # shadcn/ui configuration
├── docker-compose.yml        # Docker services
└── tsconfig.json            # TypeScript configuration
```

## 🔐 Authentication

This template uses Better Auth with email/password authentication. The authentication system includes:

- User registration and login
- Session management
- Password hashing with bcryptjs
- Database-backed sessions
- TypeScript support

### Database Schema

Pre-configured models:

- `User` - User accounts
- `Session` - Active sessions
- `Account` - OAuth accounts (extensible)
- `Verification` - Email verification tokens

## 🎨 UI Components

This template uses shadcn/ui with the "New York" style. Add new components:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
# ... and more
```

## 🔌 Adding tRPC Routes

Create new API routes in `server/api/routers/`:

```typescript
// server/api/routers/example.ts
import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { greeting: `Hello ${input.name}!` };
    }),
});
```

Then add to root router in `server/api/root.ts`:

```typescript
import { exampleRouter } from "./routers/example";

export const appRouter = router({
  example: exampleRouter,
  // ... other routers
});
```

## 🗄️ Database Migrations

### Development

```bash
# Push schema changes without migrations
npm run db:push

# Create and run migrations
npm run db:migrate
```

### Production

```bash
# Run migrations
npx prisma migrate deploy
```

## 🚀 Deployment

### Environment Variables

Make sure to set these in production:

- `DATABASE_URL` - Your production database URL
- `DATABASE_URL_UNPOOLED` - Direct database connection (for Prisma)
- `BETTER_AUTH_SECRET` - Strong random secret
- `BETTER_AUTH_URL` - Your production URL
- `NODE_ENV=production`

### Vercel Deployment

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Docker Deployment

The included `docker-compose.yml` can be extended for full application deployment.

## 🧪 Customization Guide

### Renaming the Project

1. Update `package.json` name field
2. Update `docker-compose.yml` container names and credentials
3. Update `.env.example` and `.env.local` database URLs
4. Update `scripts/setup-db.sh` references

### Changing Database

Update `prisma/schema.prisma` datasource and `docker-compose.yml` if using a different database.

### Adding OAuth Providers

Better Auth supports many OAuth providers. See [Better Auth docs](https://www.better-auth.com/docs/authentication/oauth) for setup.

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Better Auth Documentation](https://www.better-auth.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

This is a template repository. Feel free to fork and customize for your needs!

## 📄 License

MIT License - feel free to use this template for any project.

## 🙏 Acknowledgments

Built with amazing open-source tools and libraries. Thanks to all the maintainers!
