import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { describeRoute, generateSpecs } from "hono-openapi";
import { resolver, validator as vValidator } from "hono-openapi/typebox";
import { VideoListSchema } from "./schemas/video-list.js";
import { internalServerErrorResponse } from "./schemas/errors.js";
import * as fs from "node:fs/promises";

const tags = {
  video: "video",
} as const;

const app = new Hono().basePath("/api");

const documentation = {
  openapi: "3.1.0",
  info: {
    title: "連携API",
    version: "0.0.1",
  },
};

app.get("", (c) => c.text("Hello Videos!"));

// 例: GET /videos パス定義
app.get(
  "/videos",
  describeRoute({
    summary: "動画一覧を取得",
    description: "条件に合致する動画の一覧を取得します",
    tags: [tags.video],
    responses: {
      200: {
        description: "成功",
        content: {
          "application/json": { schema: resolver(VideoListSchema) },
        },
      },
      500: internalServerErrorResponse,
    },
    validateResponse: true, // レスポンスを検証
  }),
  // ハンドラー実装
  (c) => {
    return c.json({}); // バリデーションに失敗して500エラーになる
  }
);

export default app;

// ローカルファイルに保存できる
if (process.env.NODE_ENV === "development") {
  await generateSpecs(app, { documentation }).then((openapi) => {
    fs.writeFile("./openapi.json", JSON.stringify(openapi, null, 2));
  });
}

// 単体でサーバー実行可能 (ライブラリとして export して Next.js の routes.ts でAPIとして実行も可能)
// if ((process.argv.pop() ?? "").includes("main.ts")) {
//   serve(
//     {
//       fetch: app.fetch,
//       port: 3000,
//     },
//     (info) => {
//       console.log(`Server is running on http://localhost:${info.port}`);
//     }
//   );
// }
