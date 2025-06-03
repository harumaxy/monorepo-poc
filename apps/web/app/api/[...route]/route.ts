import server from "@monorepo-poc/api";
import { handle } from "hono/vercel";

export const GET = handle(server);
