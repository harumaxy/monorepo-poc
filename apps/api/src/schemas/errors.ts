import * as t from "@sinclair/typebox";
import type { ResolverResult } from "hono-openapi";
import { OpenAPIV3 } from "openapi-types";

type ResponseItem =
  | OpenAPIV3.ReferenceObject
  | (OpenAPIV3.ResponseObject & {
      content?: {
        [key: string]: Omit<OpenAPIV3.MediaTypeObject, "schema"> & {
          schema?:
            | OpenAPIV3.ReferenceObject
            | OpenAPIV3.SchemaObject
            | ResolverResult;
        };
      };
    });

export const ErrorSchema = t.Object({
  code: t.String({
    description: "エラーコード",
    example: "INTERNAL_SERVER_ERROR",
  }),
  message: t.String({
    description: "エラーメッセージ",
    example: "サーバーでエラーが発生しました",
  }),
  timestamp: t.String({
    format: "date-time",
    description: "エラー発生時刻",
    example: "2024-02-06T15:30:00+09:00",
  }),
  details: t.Optional(
    t.Record(t.String(), t.Any(), {
      description: "エラーの詳細情報（オプション）",
      example: {
        requestId: "req-123456",
        errorType: "DatabaseError",
      },
    })
  ),
});

export const internalServerErrorResponse: ResponseItem = {
  description: "サーバーエラー",
  content: {
    schema: ErrorSchema,
  },
};
