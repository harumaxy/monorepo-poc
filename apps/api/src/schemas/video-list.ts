import * as t from "@sinclair/typebox";

export const VideoListSchema = t.Object({
  videoId: t.String({
    format: "uuid",
    description: "動画管理用番号（UUID v4形式）",
    example: "123e4567-e89b-12d3-a456-426614174000",
  }),
  scheduleSessionId: t.String({
    format: "uuid",
    description:
      "英語実況の動画には必ずあるはずのid。日本語実況でも英語実況の分のschedleSessionIdが自動で入る。",
    example: "6d6a41cd-d384-a634-70b6-b0c88247fad8",
  }),
  videoSessionId: t.String({
    description: "データ連携用",
    example: "VS_20240206_001",
  }),
  title: t.String({
    description: "動画のタイトル",
    example: "フィギュアスケート 男子シングル フリー 平野歩夢選手",
  }),
  thumbnail: t.String({
    format: "uri",
    description: "サムネイル画像のURL",
    example: "https://example.com/thumbnails/VID_20240206_001.jpg",
  }),
  duration: t.Integer({ description: "動画時間（秒）", example: 3600 }),
  updatedAt: t.String({
    format: "date-time",
    description: "情報更新時刻",
    example: "2024-02-06T15:30:00+09:00",
  }),
  category: t.String({
    description:
      "カテゴリーは配信種別の情報を示す（見逃し、放送同時見逃し、ショート動画など）",
    enum: ["見逃し", "放送同時見逃し", "ショート動画"],
    example: "見逃し",
  }),
  tags: t.Optional(
    t.Array(t.String(), {
      description:
        "タグはコンテンツ内容の情報を示す（日本語実況、英語実況、ハイライト、日本代表、1日まとめ、取材班が現場からなど）",
      example: [
        "日本語実況",
        "フィギュアスケート",
        "2月6日（大会1日目）",
        "ハイライト",
      ],
    })
  ),
  sports: t.Optional(
    t.Array(t.String(), {
      description: "競技名（アイスホッケー、フィギュアスケートなど）",
      example: ["フィギュアスケート"],
    })
  ),
  athleteIds: t.Optional(
    t.Array(t.String(), {
      description: "出場選手ID（ARC1890977など）",
      example: ["ARC1890977", "ARC1890978", "ARC1890979"],
    })
  ),
  athleteNames: t.Optional(
    t.Array(t.String(), {
      description: "出場選手名（平野 歩夢、千葉 百音など）",
      example: ["平野 歩夢", "千葉 百音", "三浦 璃来"],
    })
  ),
  athleteNameReadings: t.Optional(
    t.Array(t.String(), {
      description: "出場選手名のよみ（ひらの あゆむ、ちば もねなど）",
      example: ["ひらの あゆむ", "ちば もね", "みうら りく"],
    })
  ),
  fluctuationWords: t.Optional(
    t.Array(t.String(), {
      description: "ゆらぎワード（スマイルジャパン、リーダーズなど）",
      example: ["スマイルジャパン", "リーダーズ", "チームジャパン"],
    })
  ),
  description: t.Optional(
    t.String({
      description: "動画の概要",
      example:
        "フィギュアスケート男子シングルフリー演技。平野歩夢選手の演技を完全収録。",
    })
  ),
});
