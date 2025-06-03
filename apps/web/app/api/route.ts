import { PrismaClient } from "@monorepo-poc/db";

const client = new PrismaClient();

export async function GET() {
  const users = await client.user.findMany();
  return new Response(JSON.stringify(users));
}
