import { PrismaClient, Prisma } from "@prisma/client";

const log: Prisma.LogLevel[] = ["warn", "error"];

const prismaClientSingleton = () => {
  return new PrismaClient({ log });
};

export const db: ReturnType<typeof prismaClientSingleton> =
  (globalThis as any).prismaGlobal ?? prismaClientSingleton();

export * from "@prisma/client";

if ((globalThis as any).process.env.NODE_ENV !== "production") (globalThis as any).prismaGlobal = db;
