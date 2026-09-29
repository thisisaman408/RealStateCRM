# @resyl/prisma

Prisma 7 ORM client, database schema, migrations, and seed scripts for Resyl.

---

## Overview

`@resyl/prisma` contains the centralized PostgreSQL data model for Resyl. The generated Prisma Client is stored under `generated/client` and consumed across the monorepo via `@resyl/prisma`.

## Core Commands (Run from Monorepo Root)

```bash
# Generate Prisma Client
pnpm db:generate

# Run migrations against active database
pnpm db:migrate

# Seed demo projects, users, units, and leads
pnpm db:seed

# Open Prisma Studio web inspector
pnpm --filter @resyl/prisma db:studio

# Format schema.prisma file
pnpm --filter @resyl/prisma db:format
```

## Structure

- **`schema.prisma`**: Single source of truth database model (Leads, Projects, Units, Bookings, Marketing Campaigns, Approvals, Chat, Better Auth).
- **`seed.ts`**: Comprehensive test database seeder creating full hierarchies for direct sales and CP partner networks.
- **`src/index.ts`**: Exports the typed `PrismaClient` and all generated model types.

## Important Invariant

Resyl strictly separates the **Brokerage** (internal direct sales) and **Channel Partner (CP)** networks using the boolean flag `Project.isCpProject`. Data must never be mixed across this boundary.
