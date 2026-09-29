import { PrismaClient } from "../generated/client/index.js";


import path from 'path';
import { fileURLToPath } from 'url';

// Load root .env if available, regardless of where this script is executed from
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootEnv = path.resolve(__dirname, '../../../.env');
import { config } from 'dotenv';
try { config({ path: rootEnv, override: true }); } catch {}

import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";

neonConfig.webSocketConstructor = ws;
const connectionString = process.env.DATABASE_URL as string;

const adapter = new PrismaNeon({ connectionString });

export const prismaClient = new PrismaClient({ adapter });

// Re-export PrismaClient class and ALL generated types/enums so that
// apps/api, apps/workers, integrations/ can all import from '@resyl/prisma'
// instead of using a local generated path.
export { PrismaClient };
export * from "../generated/client/index.js";
