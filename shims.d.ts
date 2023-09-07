import type { PrismaClient } from "@prisma/client";

declare global { 
  var cachedPrisma: PrismaClient;
}