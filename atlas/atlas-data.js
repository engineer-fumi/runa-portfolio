/* =====================================================================
 * Claude / Anthropic 機能アトラス — データファイル
 * ★ 内容の更新はこのファイルだけを編集します（index.html は触らない）。
 *
 * 構造: window.ATLAS_DATA = { meta, kinds, statuses, domains }
 *   domains[]（大分類）→ subs[]（中分類）→ feats[]（末端機能）→ events[]（更新）
 *
 * 規約（詳細は README.md）:
 *   - id はファイル全体で一意。英小文字・数字・ハイフン。
 *   - event.date は "YYYY-MM-DD"。月単位の概算は approx:true（日付は月初 "01" に）。
 *   - event.type は kinds のキー、feature.status は statuses のキー。
 *   - accent は大分類の色 #RRGGBB（1大分類＝1色）。
 *   - 並び順は自由（アプリが日付の新しい順に自動整列）。
 *   - 更新したら meta.lastUpdated を変更し、node validate.js で検証。
 * ===================================================================== */
window.ATLAS_DATA = {

  // 表示メタ情報（マストヘッド・フッターに反映）
  meta: {
    lastUpdated: "2026-06-19",   // 最終更新日（必ず更新する）
    rangeStart: "2025.09",       // 収録範囲の開始（表示用ラベル）
    rangeEnd: "2026.06",         // 収録範囲の終了（表示用ラベル）
    sources: [
      { label: "Claude アプリのリリースノート", url: "https://support.claude.com/en/articles/12138966-release-notes" },
      { label: "Claude Platform のリリースノート", url: "https://platform.claude.com/docs/en/release-notes/overview" },
      { label: "Anthropic ニュース", url: "https://www.anthropic.com/news" }
    ]
  },

  // 更新の「種類」の語彙。event.type はこのキーのいずれか。
  // style は見た目のバケツ: fill(塗り) / outline(枠線) / soft(淡い塗り) / warn(警告枠) / warnfill(警告塗り)
  kinds: {
    launch:    { label: "新登場",     style: "fill" },
    ga:        { label: "正式提供",   style: "fill" },
    beta:      { label: "ベータ",     style: "outline" },
    preview:   { label: "プレビュー", style: "outline" },
    update:    { label: "改善",       style: "soft" },
    expand:    { label: "範囲拡大",   style: "soft" },
    deprecate: { label: "非推奨",     style: "warn" },
    retire:    { label: "提供終了",   style: "warnfill" },
    suspend:   { label: "一時停止",   style: "warnfill" }
  },

  // 機能の「状態」の語彙。feature.status はこのキーのいずれか（任意・省略可）。
  statuses: {
    current:    "現行",
    beta:       "ベータ",
    preview:    "プレビュー",
    deprecated: "非推奨",
    retired:    "終了",
    suspended:  "停止中"
  },

  // 分類ツリー本体（大分類 → 中分類 → 末端機能 → 更新イベント）
  domains: [
    {
      "id": "models",
      "name": "モデル",
      "name_en": "Models",
      "accent": "#6C56D6",
      "subs": [
        {
          "id": "opus",
          "name": "Opus（最上位・フロンティア）",
          "name_en": "Opus (flagship / frontier)",
          "feats": [
            {
              "id": "opus45",
              "name": "Claude Opus 4.5",
              "name_en": "Claude Opus 4.5",
              "events": [
                {
                  "date": "2025-11-24",
                  "type": "launch",
                  "desc": "当時最強のフロンティアモデルとして登場。視覚・コーディング・コンピュータ操作が大きく向上し、従来Opusより手頃な価格に。",
                  "url": "https://www.anthropic.com/news/claude-opus-4-5"
                }
              ]
            },
            {
              "id": "opus46",
              "name": "Claude Opus 4.6",
              "name_en": "Claude Opus 4.6",
              "events": [
                {
                  "date": "2026-02-05",
                  "type": "launch",
                  "desc": "長時間タスク向けの最も賢いモデルを更新。適応的思考(adaptive thinking)を推奨に。",
                  "url": "https://www.anthropic.com/news/claude-opus-4-6"
                },
                {
                  "date": "2026-02-07",
                  "type": "preview",
                  "title": "Fast mode（研究プレビュー）",
                  "desc": "speedパラメータで出力を最大2.5倍高速化（プレミアム価格）。"
                },
                {
                  "date": "2026-03-13",
                  "type": "ga",
                  "title": "1Mトークンコンテキスト 正式提供",
                  "desc": "200kを超えるリクエストが追加ヘッダ無しで自動対応に。"
                },
                {
                  "date": "2026-05-28",
                  "type": "deprecate",
                  "title": "Fast mode 非推奨",
                  "desc": "4.8/4.7のFast modeへ移行を案内。"
                }
              ]
            },
            {
              "id": "opus47",
              "name": "Claude Opus 4.7",
              "name_en": "Claude Opus 4.7",
              "events": [
                {
                  "date": "2026-04-16",
                  "type": "launch",
                  "desc": "ソフトウェア工学・長時間コーディングが向上し、より高解像度の画像も扱える新トークナイザ採用モデル。価格はOpus 4.6と同じ。",
                  "url": "https://www.anthropic.com/news/claude-opus-4-7"
                },
                {
                  "date": "2026-05-12",
                  "type": "preview",
                  "title": "Fast mode 対応",
                  "desc": "Opus 4.7でもFast mode（研究プレビュー）を利用可能に。"
                }
              ]
            },
            {
              "id": "opus48",
              "name": "Claude Opus 4.8",
              "name_en": "Claude Opus 4.8",
              "status": "current",
              "events": [
                {
                  "date": "2026-05-28",
                  "type": "launch",
                  "desc": "現行の最上位モデル。コーディング・エージェント能力・推論・実務知識でOpus 4.7を上回る。1Mコンテキスト標準、最大出力128k。effortは既定でhigh。",
                  "url": "https://www.anthropic.com/news/claude-opus-4-8"
                }
              ]
            }
          ]
        },
        {
          "id": "sonnet",
          "name": "Sonnet（バランス）",
          "name_en": "Sonnet (balanced)",
          "feats": [
            {
              "id": "sonnet45",
              "name": "Claude Sonnet 4.5",
              "name_en": "Claude Sonnet 4.5",
              "events": [
                {
                  "date": "2025-09-29",
                  "type": "launch",
                  "desc": "実世界のエージェント・コーディング・コンピュータ操作で当時最良のモデルとして登場。",
                  "url": "https://www.anthropic.com/news/claude-sonnet-4-5"
                }
              ]
            },
            {
              "id": "sonnet46",
              "name": "Claude Sonnet 4.6",
              "name_en": "Claude Sonnet 4.6",
              "events": [
                {
                  "date": "2026-02-17",
                  "type": "launch",
                  "desc": "速度と知能を両立した最新の標準モデル。トークン消費を抑えつつエージェント検索が向上。1Mコンテキスト(ベータ)対応。",
                  "url": "https://www.anthropic.com/news/claude-sonnet-4-6"
                },
                {
                  "date": "2026-03-13",
                  "type": "ga",
                  "title": "1Mトークンコンテキスト 正式提供",
                  "desc": "標準料金で1Mコンテキストが利用可能に。"
                }
              ]
            }
          ]
        },
        {
          "id": "haiku",
          "name": "Haiku（高速・低コスト）",
          "name_en": "Haiku (fast / low-cost)",
          "feats": [
            {
              "id": "haiku45",
              "name": "Claude Haiku 4.5",
              "name_en": "Claude Haiku 4.5",
              "events": [
                {
                  "date": "2025-10-15",
                  "type": "launch",
                  "desc": "最速・最も低コストの小型モデル。コーディングやエージェント処理でSonnet 4相当の性能。リアルタイム/大量処理向け。",
                  "url": "https://www.anthropic.com/news/claude-haiku-4-5"
                }
              ]
            }
          ]
        },
        {
          "id": "mythos",
          "name": "Mythos ティア（最上位プレビュー）",
          "name_en": "Mythos tier (top-tier preview)",
          "feats": [
            {
              "id": "mythosp",
              "name": "Claude Mythos Preview",
              "name_en": "Claude Mythos Preview",
              "status": "preview",
              "events": [
                {
                  "date": "2026-04-07",
                  "type": "preview",
                  "desc": "防御的サイバーセキュリティ向けの招待制プレビューとして発表（Project Glasswing）。"
                }
              ]
            },
            {
              "id": "fable5",
              "name": "Claude Fable 5",
              "name_en": "Claude Fable 5",
              "status": "suspended",
              "events": [
                {
                  "date": "2026-06-09",
                  "type": "launch",
                  "desc": "一般利用向けに安全対策を施したMythosクラスのモデルとして登場。1Mコンテキスト標準・常時adaptive thinking。"
                },
                {
                  "date": "2026-06-12",
                  "type": "suspend",
                  "title": "アクセス一時停止",
                  "desc": "輸出管理上の理由でMythos 5とともにアクセスを一時停止。"
                }
              ]
            },
            {
              "id": "mythos5",
              "name": "Claude Mythos 5",
              "name_en": "Claude Mythos 5",
              "status": "suspended",
              "events": [
                {
                  "date": "2026-06-09",
                  "type": "launch",
                  "desc": "Project Glasswing参加者向けの限定提供として登場。"
                },
                {
                  "date": "2026-06-12",
                  "type": "suspend",
                  "title": "アクセス一時停止",
                  "desc": "輸出管理上の理由でアクセスを一時停止。"
                }
              ]
            }
          ]
        },
        {
          "id": "mcap",
          "name": "モデル機能・パラメータ",
          "name_en": "Model capabilities & parameters",
          "feats": [
            {
              "id": "ctx1m",
              "name": "1Mトークンコンテキスト",
              "name_en": "1M token context",
              "events": [
                {
                  "date": "2026-02-05",
                  "type": "beta",
                  "desc": "Opus 4.6でも1Mコンテキストがベータ提供開始（長コンテキスト料金）。"
                },
                {
                  "date": "2026-03-13",
                  "type": "ga",
                  "desc": "Opus 4.6 / Sonnet 4.6で正式提供。1M利用時の画像/PDF上限を100→600に拡大、専用レート上限は撤廃。"
                }
              ]
            },
            {
              "id": "thinking",
              "name": "適応的思考 / 思考制御",
              "name_en": "Adaptive / extended thinking",
              "events": [
                {
                  "date": "2026-02-05",
                  "type": "launch",
                  "desc": "adaptive thinkingを導入（Opus 4.6推奨）。必要なときだけ推論を発動。"
                },
                {
                  "date": "2026-03-16",
                  "type": "update",
                  "title": "思考表示の制御",
                  "desc": "thinking.display=omittedで思考内容を省いて高速ストリーミング可能に。"
                },
                {
                  "date": "2026-05-27",
                  "type": "update",
                  "title": "思考トークンの可視化",
                  "desc": "課金出力トークンのうち思考分をusageで確認可能に。"
                }
              ]
            },
            {
              "id": "effort",
              "name": "effort パラメータ",
              "name_en": "Effort parameter",
              "events": [
                {
                  "date": "2025-11-24",
                  "type": "beta",
                  "desc": "Opus 4.5向けに、応答の徹底度と効率を調整するeffortをベータ提供。"
                },
                {
                  "date": "2026-02-05",
                  "type": "ga",
                  "desc": "正式提供。budget_tokensに代わる思考深度の制御へ。"
                },
                {
                  "date": "2026-05-28",
                  "type": "update",
                  "desc": "Opus 4.8では既定値がhighに。"
                }
              ]
            },
            {
              "id": "hires",
              "name": "高解像度画像入力",
              "name_en": "High-resolution image input",
              "events": [
                {
                  "date": "2026-04-16",
                  "type": "launch",
                  "desc": "Opus 4.7で長辺2576pxまでの高解像度画像入力に対応（4.8にも継承）。"
                }
              ]
            },
            {
              "id": "tokenizer",
              "name": "新トークナイザ",
              "name_en": "New tokenizer",
              "events": [
                {
                  "date": "2026-04-16",
                  "type": "update",
                  "desc": "Opus 4.7から新トークナイザを採用。同じ文章で約30%多くのトークンに（Fable/Mythos 5も継承）。"
                }
              ]
            },
            {
              "id": "midsys",
              "name": "会話途中のシステムメッセージ",
              "name_en": "Mid-conversation system messages",
              "events": [
                {
                  "date": "2026-05-28",
                  "type": "launch",
                  "desc": "Opus 4.8でユーザーターン後にrole:systemを送信可能に。長時間セッション中の指示変更でもキャッシュを維持。"
                }
              ]
            }
          ]
        },
        {
          "id": "lifecycle",
          "name": "モデルのライフサイクル（提供終了）",
          "name_en": "Model lifecycle (retirements)",
          "feats": [
            {
              "id": "dep-opus3",
              "name": "Opus 3 / Sonnet 3.7 / Haiku 3.x",
              "name_en": "Opus 3 / Sonnet 3.7 / Haiku 3.x",
              "status": "retired",
              "events": [
                {
                  "date": "2026-01-05",
                  "type": "retire",
                  "desc": "Opus 3 をAPIから提供終了。Opus 4.5への移行を推奨。"
                },
                {
                  "date": "2026-02-19",
                  "type": "retire",
                  "desc": "Sonnet 3.7 と Haiku 3.5 を提供終了。"
                },
                {
                  "date": "2026-04-20",
                  "type": "retire",
                  "desc": "Haiku 3 を提供終了。Haiku 4.5へ。"
                }
              ]
            },
            {
              "id": "dep-4",
              "name": "Opus 4 / 4.1 / Sonnet 4",
              "name_en": "Opus 4 / 4.1 / Sonnet 4",
              "status": "retired",
              "events": [
                {
                  "date": "2026-01-16",
                  "type": "retire",
                  "title": "セレクタから削除",
                  "desc": "Opus 4 と 4.1 をClaude/Claude Codeのモデル選択から削除。"
                },
                {
                  "date": "2026-04-14",
                  "type": "deprecate",
                  "desc": "Sonnet 4 / Opus 4 の非推奨を告知（API終了予定: 6/15）。"
                },
                {
                  "date": "2026-06-05",
                  "type": "deprecate",
                  "desc": "Opus 4.1 の非推奨を告知（API終了予定: 8/5）。Opus 4.8へ。"
                },
                {
                  "date": "2026-06-15",
                  "type": "retire",
                  "desc": "Sonnet 4 と Opus 4 をAPIから提供終了。"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "platform",
      "name": "開発者プラットフォーム / API",
      "name_en": "Developer Platform / API",
      "accent": "#0E9C8C",
      "subs": [
        {
          "id": "messages",
          "name": "Messages API・生成制御",
          "name_en": "Messages API & generation controls",
          "feats": [
            {
              "id": "struct",
              "name": "構造化出力（Structured outputs）",
              "name_en": "Structured outputs",
              "events": [
                {
                  "date": "2025-12-04",
                  "type": "update",
                  "desc": "Haiku 4.5でも構造化出力に対応。"
                },
                {
                  "date": "2026-01-29",
                  "type": "ga",
                  "desc": "Sonnet/Opus/Haiku 4.5で正式提供。スキーマ対応拡大、追加ヘッダ不要に。"
                }
              ]
            },
            {
              "id": "modelsapi",
              "name": "Models API の能力フィールド",
              "name_en": "Models API capability fields",
              "events": [
                {
                  "date": "2026-03-18",
                  "type": "update",
                  "desc": "GET /v1/models が max_input_tokens・max_tokens・capabilities を返すように。"
                }
              ]
            },
            {
              "id": "refusal",
              "name": "拒否(refusal)の扱い",
              "name_en": "Refusal handling",
              "events": [
                {
                  "date": "2026-05-28",
                  "type": "update",
                  "desc": "refusal応答のstop_detailsを公式文書化（category: cyber/bio）。"
                },
                {
                  "date": "2026-06-02",
                  "type": "update",
                  "desc": "出力前に拒否された場合は課金されない仕様に。"
                }
              ]
            }
          ]
        },
        {
          "id": "tools",
          "name": "ツール（Tool use）",
          "name_en": "Tool use",
          "feats": [
            {
              "id": "codeexec",
              "name": "コード実行ツール",
              "name_en": "Code execution tool",
              "events": [
                {
                  "date": "2026-02-17",
                  "type": "ga",
                  "desc": "正式提供。Web検索/フェッチと併用時は無料に。"
                },
                {
                  "date": "2026-05-21",
                  "type": "update",
                  "desc": "1セル90秒の実行上限を説明に明示し、長時間処理を計画しやすく。"
                }
              ]
            },
            {
              "id": "websearch",
              "name": "Web検索 / Webフェッチ",
              "name_en": "Web search / Web fetch",
              "events": [
                {
                  "date": "2026-02-17",
                  "type": "ga",
                  "desc": "正式提供。動的フィルタリングでコンテキスト投入前に結果を絞り込み。"
                },
                {
                  "date": "2026-03-18",
                  "type": "update",
                  "desc": "response_inclusionパラメータで消費済み結果を除外可能に。"
                },
                {
                  "date": "2026-05-18",
                  "type": "update",
                  "desc": "SEC提出書類の詳細データを返すように（財務リサーチの裏付けに）。"
                }
              ]
            },
            {
              "id": "ptc",
              "name": "プログラム的ツール呼び出し",
              "name_en": "Programmatic tool calling",
              "events": [
                {
                  "date": "2025-11-24",
                  "type": "beta",
                  "desc": "コード実行内からツールを呼び、レイテンシとトークンを削減（ベータ）。"
                },
                {
                  "date": "2026-02-17",
                  "type": "ga",
                  "desc": "正式提供。"
                }
              ]
            },
            {
              "id": "toolsearch",
              "name": "ツール検索ツール",
              "name_en": "Tool search tool",
              "events": [
                {
                  "date": "2025-11-24",
                  "type": "beta",
                  "desc": "大量のツールから必要なものを動的に発見・読込（ベータ）。"
                },
                {
                  "date": "2026-02-17",
                  "type": "ga",
                  "desc": "正式提供。"
                }
              ]
            },
            {
              "id": "memtool",
              "name": "メモリツール",
              "name_en": "Memory tool",
              "events": [
                {
                  "date": "2026-02-17",
                  "type": "ga",
                  "desc": "正式提供（追加ヘッダ不要）。"
                }
              ]
            },
            {
              "id": "advisor",
              "name": "アドバイザツール",
              "name_en": "Advisor tool",
              "events": [
                {
                  "date": "2026-04-09",
                  "type": "beta",
                  "desc": "高速な実行モデルに、生成途中で助言する高知能モデルを組み合わせるベータ。"
                },
                {
                  "date": "2026-06-02",
                  "type": "update",
                  "desc": "max_tokensで助言の出力長を制限可能に。"
                }
              ]
            },
            {
              "id": "fgts",
              "name": "細粒度ツールストリーミング",
              "name_en": "Fine-grained tool streaming",
              "events": [
                {
                  "date": "2026-02-05",
                  "type": "ga",
                  "desc": "全モデル・全プラットフォームで正式提供。"
                }
              ]
            }
          ]
        },
        {
          "id": "context",
          "name": "コンテキスト・キャッシュ",
          "name_en": "Context & caching",
          "feats": [
            {
              "id": "autocache",
              "name": "自動キャッシュ",
              "name_en": "Automatic prompt caching",
              "events": [
                {
                  "date": "2026-02-19",
                  "type": "launch",
                  "desc": "cache_controlを1つ付けるだけで、会話の伸びに合わせ自動でキャッシュ点を前進。"
                }
              ]
            },
            {
              "id": "compaction",
              "name": "圧縮(Compaction) API",
              "name_en": "Compaction API",
              "events": [
                {
                  "date": "2026-02-05",
                  "type": "beta",
                  "desc": "サーバ側のコンテキスト要約で実質無限長の会話を実現（ベータ・Opus 4.6）。"
                }
              ]
            },
            {
              "id": "cachediag",
              "name": "キャッシュ診断",
              "name_en": "Cache diagnostics",
              "status": "beta",
              "events": [
                {
                  "date": "2026-05-13",
                  "type": "beta",
                  "desc": "cache_miss_reasonでプロンプトキャッシュの不一致箇所を報告（公開ベータ）。"
                }
              ]
            },
            {
              "id": "output300k",
              "name": "拡張出力（最大300k）",
              "name_en": "Extended output (up to 300k)",
              "events": [
                {
                  "date": "2026-03-30",
                  "type": "update",
                  "desc": "Batch APIでOpus 4.6/Sonnet 4.6のmax_tokensを300kに引き上げ。"
                }
              ]
            }
          ]
        },
        {
          "id": "agents-api",
          "name": "Claude Managed Agents",
          "name_en": "Claude Managed Agents",
          "feats": [
            {
              "id": "ma-launch",
              "name": "Managed Agents（管理型エージェント）",
              "name_en": "Managed Agents",
              "status": "beta",
              "events": [
                {
                  "date": "2026-04-08",
                  "type": "beta",
                  "desc": "安全なサンドボックスと内蔵ツールでClaudeを自律エージェントとして動かす公開ベータ。"
                }
              ]
            },
            {
              "id": "ma-mem",
              "name": "エージェントメモリ",
              "name_en": "Agent memory",
              "status": "beta",
              "events": [
                {
                  "date": "2026-04-23",
                  "type": "beta",
                  "desc": "Managed Agentsのメモリ機能を公開ベータで提供。"
                }
              ]
            },
            {
              "id": "ma-multi",
              "name": "マルチエージェント / Outcomes",
              "name_en": "Multi-agent / Outcomes",
              "status": "beta",
              "events": [
                {
                  "date": "2026-05-06",
                  "type": "beta",
                  "desc": "複数エージェントの連携と成果(Outcomes)定義を公開ベータで提供。"
                }
              ]
            },
            {
              "id": "ma-webhook",
              "name": "Webhook / Vault（資格情報）",
              "name_en": "Webhooks / Vault (credentials)",
              "events": [
                {
                  "date": "2026-05-06",
                  "type": "launch",
                  "desc": "セッション/Vaultのライフサイクルを通知するWebhookと、資格情報を安全に扱うVaultを提供。"
                },
                {
                  "date": "2026-06-09",
                  "type": "update",
                  "desc": "Vaultで環境変数の資格情報をサンドボックスに注入可能に。"
                }
              ]
            },
            {
              "id": "ma-sandbox",
              "name": "自前サンドボックス / スケジュール",
              "name_en": "Bring-your-own sandbox / scheduling",
              "events": [
                {
                  "date": "2026-05-19",
                  "type": "launch",
                  "desc": "ツール実行を自社環境で動かせる自前サンドボックスを提供。"
                },
                {
                  "date": "2026-06-09",
                  "type": "update",
                  "desc": "cronスケジュールでセッションを定期実行できるように。"
                }
              ]
            },
            {
              "id": "mcptunnel",
              "name": "MCPトンネル",
              "name_en": "MCP tunnel",
              "status": "preview",
              "events": [
                {
                  "date": "2026-05-19",
                  "type": "preview",
                  "desc": "プライベートネットワーク内のMCPサーバへ接続できる研究プレビュー。"
                }
              ]
            }
          ]
        },
        {
          "id": "infra",
          "name": "プラットフォーム・インフラ",
          "name_en": "Platform infrastructure",
          "feats": [
            {
              "id": "console",
              "name": "Console → platform.claude.com",
              "name_en": "Console → platform.claude.com",
              "events": [
                {
                  "date": "2026-01-12",
                  "type": "update",
                  "desc": "ブランド統合に伴い、コンソールがplatform.claude.comへ移行（自動リダイレクト）。"
                }
              ]
            },
            {
              "id": "aws",
              "name": "Claude Platform on AWS",
              "name_en": "Claude Platform on AWS",
              "events": [
                {
                  "date": "2026-05-11",
                  "type": "launch",
                  "desc": "AWS経由・AWS課金・IAM認証でClaude APIを利用できる基盤を提供。"
                },
                {
                  "date": "2026-05-29",
                  "type": "expand",
                  "desc": "Managed AgentsのWebhook/マルチエージェント/自前サンドボックスをAWSでも提供。"
                }
              ]
            },
            {
              "id": "bedrock",
              "name": "Claude in Amazon Bedrock",
              "name_en": "Claude in Amazon Bedrock",
              "events": [
                {
                  "date": "2026-04-07",
                  "type": "preview",
                  "desc": "Messages APIをBedrockで研究プレビュー提供。"
                },
                {
                  "date": "2026-04-16",
                  "type": "expand",
                  "desc": "全Bedrock顧客に開放。Opus 4.7/Haiku 4.5を27リージョンでセルフサーブ。"
                }
              ]
            },
            {
              "id": "ratelimit",
              "name": "Rate Limits API",
              "name_en": "Rate Limits API",
              "events": [
                {
                  "date": "2026-04-24",
                  "type": "launch",
                  "desc": "組織/ワークスペースのレート上限をプログラムから照会可能に。"
                }
              ]
            },
            {
              "id": "residency",
              "name": "データ所在地コントロール",
              "name_en": "Data residency controls",
              "events": [
                {
                  "date": "2026-02-05",
                  "type": "launch",
                  "desc": "inference_geoで推論実行地域を指定可能に（US限定は1.1倍）。"
                }
              ]
            },
            {
              "id": "wif",
              "name": "Workload Identity Federation",
              "name_en": "Workload Identity Federation",
              "events": [
                {
                  "date": "2026-06-01",
                  "type": "launch",
                  "desc": "静的APIキーを、リクエスト時に発行される短命・スコープ付き資格情報に置き換える認証方式。",
                  "approx": true
                }
              ]
            }
          ]
        },
        {
          "id": "sdk",
          "name": "SDK・CLI",
          "name_en": "SDK & CLI",
          "feats": [
            {
              "id": "antcli",
              "name": "ant CLI",
              "name_en": "ant CLI",
              "events": [
                {
                  "date": "2026-04-08",
                  "type": "launch",
                  "desc": "Claude API用のコマンドラインクライアント。Claude Codeとの統合やYAMLでのリソース管理が可能。"
                }
              ]
            },
            {
              "id": "sdkcompact",
              "name": "SDKのクライアント側圧縮",
              "name_en": "SDK client-side compaction",
              "events": [
                {
                  "date": "2025-11-24",
                  "type": "launch",
                  "desc": "Python/TypeScript SDKに、要約でコンテキストを自動管理するクライアント側圧縮を追加。"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "apps",
      "name": "Claudeアプリ（Claude.ai・モバイル）",
      "name_en": "Claude apps (Claude.ai & mobile)",
      "accent": "#DD6147",
      "subs": [
        {
          "id": "chatx",
          "name": "チャット体験",
          "name_en": "Chat experience",
          "feats": [
            {
              "id": "visuals",
              "name": "チャット内のチャート・図・可視化",
              "name_en": "In-chat charts, diagrams & visualizations",
              "events": [
                {
                  "date": "2026-03-12",
                  "type": "launch",
                  "desc": "応答内にカスタムのチャート・図・可視化をインラインで生成できるように。"
                }
              ]
            },
            {
              "id": "filecreate",
              "name": "ファイルの作成・編集",
              "name_en": "File creation & editing",
              "events": [
                {
                  "date": "2025-09-29",
                  "type": "launch",
                  "desc": "Proユーザーとモバイル(iOS/Android)でファイル作成・編集が可能に。"
                }
              ]
            },
            {
              "id": "compact-chat",
              "name": "コンテキスト圧縮（無限長会話）",
              "name_en": "Context compaction (infinite chats)",
              "events": [
                {
                  "date": "2025-11-24",
                  "type": "update",
                  "desc": "上限接近時に前半を要約し、実質無限長の会話と長さ制限エラーの大幅削減を実現。"
                }
              ]
            }
          ]
        },
        {
          "id": "memory",
          "name": "メモリ・検索",
          "name_en": "Memory & search",
          "feats": [
            {
              "id": "mem-app",
              "name": "メモリ（チャット履歴の活用）",
              "name_en": "Memory",
              "events": [
                {
                  "date": "2025-10-23",
                  "type": "launch",
                  "desc": "Maxプランでメモリ機能が利用可能に（Proへ順次展開）。",
                  "url": "https://claude.com/blog/memory"
                },
                {
                  "date": "2026-03-02",
                  "type": "expand",
                  "desc": "無料ユーザーを含む全ユーザーに開放。メモリのインポート/エクスポートも可能に。"
                }
              ]
            }
          ]
        },
        {
          "id": "mobile",
          "name": "モバイル（iOS / Android）",
          "name_en": "Mobile (iOS / Android)",
          "feats": [
            {
              "id": "health",
              "name": "ヘルス・フィットネスデータ",
              "name_en": "Health & fitness data",
              "events": [
                {
                  "date": "2026-01-12",
                  "type": "launch",
                  "desc": "iOS/Androidで健康・運動データを読み取り、活動/睡眠などをネイティブチャートで分析（Pro/Max・米国）。"
                }
              ]
            },
            {
              "id": "mob-interactive",
              "name": "モバイルのインタラクティブアプリ接続",
              "name_en": "Mobile interactive app connections",
              "events": [
                {
                  "date": "2026-03-25",
                  "type": "launch",
                  "desc": "モバイルアプリがインタラクティブなアプリに接続。会話内でライブチャートや図、共有可能な成果物を表示。"
                }
              ]
            }
          ]
        },
        {
          "id": "office",
          "name": "Office アドイン",
          "name_en": "Office add-ins",
          "feats": [
            {
              "id": "excel",
              "name": "Claude for Excel",
              "name_en": "Claude for Excel",
              "events": [
                {
                  "date": "2025-11-24",
                  "type": "beta",
                  "desc": "Max/Team/Enterpriseにベータ提供。ピボット・グラフ・ファイルアップロード対応。"
                },
                {
                  "date": "2026-02-05",
                  "type": "update",
                  "desc": "Opus 4.6採用。ピボット編集や条件付き書式などネイティブ操作に対応。"
                },
                {
                  "date": "2026-03-11",
                  "type": "update",
                  "desc": "PowerPointと会話コンテキストを共有、スキル対応、LLMゲートウェイ接続に対応。"
                }
              ]
            },
            {
              "id": "ppt",
              "name": "Claude for PowerPoint",
              "name_en": "Claude for PowerPoint",
              "events": [
                {
                  "date": "2026-02-05",
                  "type": "launch",
                  "desc": "PowerPoint用アドインとして提供開始。"
                },
                {
                  "date": "2026-03-11",
                  "type": "update",
                  "desc": "Excelとの相互コンテキスト共有・スキル対応。"
                }
              ]
            }
          ]
        },
        {
          "id": "plans",
          "name": "プラン・管理・コンプライアンス",
          "name_en": "Plans, admin & compliance",
          "feats": [
            {
              "id": "selfserve",
              "name": "セルフサーブ Enterprise",
              "name_en": "Self-serve Enterprise",
              "events": [
                {
                  "date": "2026-02-12",
                  "type": "launch",
                  "desc": "営業を介さずWebから直接Enterpriseプランを購入可能に（Claude/Code/Cowork込み）。"
                }
              ]
            },
            {
              "id": "hipaa",
              "name": "HIPAA対応 Enterprise",
              "name_en": "HIPAA-eligible Enterprise",
              "events": [
                {
                  "date": "2026-01-12",
                  "type": "launch",
                  "desc": "保護対象保健情報(PHI)を扱う組織向けのHIPAA対応版を提供。"
                }
              ]
            },
            {
              "id": "roles",
              "name": "ロール / カスタムロール",
              "name_en": "Roles / custom roles",
              "events": [
                {
                  "date": "2026-04-09",
                  "type": "launch",
                  "desc": "ユーザーをグループ化し、機能の可否をロールで定義（ロールベースアクセス制御）。"
                },
                {
                  "date": "2026-05-28",
                  "type": "update",
                  "desc": "コネクタ単位・ツール単位の権限をカスタムロールで制御可能に。"
                },
                {
                  "date": "2026-06-02",
                  "type": "update",
                  "desc": "請求やプライバシーなど管理権限をオーナー化せずに付与可能に。"
                }
              ]
            },
            {
              "id": "analytics",
              "name": "Analytics API（利用状況）",
              "name_en": "Analytics API (usage)",
              "events": [
                {
                  "date": "2026-02-13",
                  "type": "launch",
                  "desc": "Claude/Claude Code Remoteの利用・エンゲージメントデータにプログラムからアクセス（Enterprise）。"
                },
                {
                  "date": "2026-04-09",
                  "type": "expand",
                  "desc": "Cowork の利用状況もAnalytics APIで取得可能に。"
                }
              ]
            },
            {
              "id": "compliance",
              "name": "コンプライアンスAPI連携",
              "name_en": "Compliance API integrations",
              "events": [
                {
                  "date": "2026-05-21",
                  "type": "launch",
                  "desc": "主要なセキュリティ/コンプライアンスツールと連携し、IT/セキュリティ部門がClaude全体を統制可能に。"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "agents",
      "name": "エージェント製品",
      "name_en": "Agent products",
      "accent": "#BC831A",
      "subs": [
        {
          "id": "code",
          "name": "Claude Code",
          "name_en": "Claude Code",
          "feats": [
            {
              "id": "code-team",
              "name": "Team標準シートに同梱",
              "name_en": "Included in Team standard seats",
              "events": [
                {
                  "date": "2026-01-16",
                  "type": "expand",
                  "desc": "Teamプランの全標準シートにClaude Codeアクセスを同梱。"
                }
              ]
            },
            {
              "id": "code-auto",
              "name": "Auto モード / Workflows / Fast",
              "name_en": "Auto mode / Workflows / Fast",
              "events": [
                {
                  "date": "2026-05-28",
                  "type": "update",
                  "desc": "長時間タスク向けAutoモードを拡大。Workflowsを研究プレビューで提供。MaxはOpus 4.8でFast modeが既定に。"
                }
              ]
            },
            {
              "id": "code-launch",
              "name": "提供開始（研究プレビュー → 一般提供）",
              "name_en": "Availability (research preview → GA)",
              "events": [
                {
                  "date": "2025-02-24",
                  "type": "preview",
                  "desc": "ターミナルで動くエージェント型コーディングツールとして研究プレビューで初登場（Claude 3.7 Sonnetと同時）。",
                  "url": "https://www.anthropic.com/news/claude-3-7-sonnet"
                },
                {
                  "date": "2025-05-22",
                  "type": "ga",
                  "desc": "Claude 4世代の発表と同時に一般提供へ。誰でもターミナルから使えるように。",
                  "url": "https://www.anthropic.com/news/claude-4"
                }
              ]
            },
            {
              "id": "code-mcp",
              "name": "MCP対応",
              "name_en": "MCP support",
              "events": [
                {
                  "date": "2025-05-01",
                  "type": "launch",
                  "approx": true,
                  "desc": "Model Context Protocol(MCP)に対応し、外部ツール/データソースをサーバ経由で接続できるように。",
                  "url": "https://www.anthropic.com/news/model-context-protocol"
                }
              ]
            },
            {
              "id": "code-slash",
              "name": "スラッシュコマンド / カスタムコマンド",
              "name_en": "Slash commands / custom commands",
              "events": [
                {
                  "date": "2025-06-01",
                  "type": "launch",
                  "approx": true,
                  "desc": "/で呼び出す組み込みコマンドと、Markdownで定義する独自のカスタムスラッシュコマンドに対応。",
                  "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
                }
              ]
            },
            {
              "id": "code-plan",
              "name": "プランモード",
              "name_en": "Plan mode",
              "events": [
                {
                  "date": "2025-06-01",
                  "type": "launch",
                  "approx": true,
                  "desc": "実行前に計画だけを立てる読み取り専用のプランモードを追加。安全に方針を確認してから着手できる。",
                  "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
                }
              ]
            },
            {
              "id": "code-subagents",
              "name": "サブエージェント",
              "name_en": "Subagents",
              "events": [
                {
                  "date": "2025-07-01",
                  "type": "launch",
                  "approx": true,
                  "desc": "専門タスクを独立コンテキストで処理する custom subagent を導入。メインの文脈を汚さず分業できる。",
                  "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
                }
              ]
            },
            {
              "id": "code-hooks",
              "name": "フック",
              "name_en": "Hooks",
              "events": [
                {
                  "date": "2025-07-01",
                  "type": "launch",
                  "approx": true,
                  "desc": "ツール実行などのライフサイクル各点で任意のコマンドを走らせるフックを導入。lint/テストの自動実行などを決定的に組み込める。",
                  "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
                }
              ]
            },
            {
              "id": "code-gha",
              "name": "GitHub Actions 連携",
              "name_en": "GitHub Actions integration",
              "events": [
                {
                  "date": "2025-07-01",
                  "type": "launch",
                  "approx": true,
                  "desc": "GitHub Actionsから起動し、PRやIssueにClaude Codeを組み込んでCIワークフローを自動化できるように。",
                  "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
                }
              ]
            },
            {
              "id": "code-ide",
              "name": "ネイティブVS Code拡張 / IDE連携",
              "name_en": "Native VS Code extension / IDE integration",
              "events": [
                {
                  "date": "2025-09-29",
                  "type": "launch",
                  "desc": "v2.0でネイティブVS Code拡張を提供。ターミナルだけでなくIDE内で差分確認しながら作業できるように（JetBrains等のIDE連携も対応）。",
                  "url": "https://www.anthropic.com/news/enabling-claude-code-to-work-more-autonomously"
                }
              ]
            },
            {
              "id": "code-checkpoints",
              "name": "チェックポイント",
              "name_en": "Checkpoints",
              "events": [
                {
                  "date": "2025-09-29",
                  "type": "launch",
                  "desc": "v2.0で各プロンプトごとに状態を自動保存するネイティブのチェックポイントを導入。変更を巻き戻して安全に試行錯誤できる（既定30日保持）。",
                  "url": "https://www.anthropic.com/news/enabling-claude-code-to-work-more-autonomously"
                }
              ]
            },
            {
              "id": "code-agentsdk",
              "name": "Claude Agent SDK（旧 Claude Code SDK）",
              "name_en": "Claude Agent SDK (formerly Claude Code SDK)",
              "events": [
                {
                  "date": "2025-09-29",
                  "type": "update",
                  "desc": "Claude Code SDKをClaude Agent SDKへ改称。Claude Codeを支える基盤を、独自エージェントを作るための汎用SDKとして位置づけ直し。",
                  "url": "https://www.anthropic.com/news/enabling-claude-code-to-work-more-autonomously"
                }
              ]
            },
            {
              "id": "code-output-styles",
              "name": "アウトプットスタイル",
              "name_en": "Output styles",
              "events": [
                {
                  "date": "2025-08-01",
                  "type": "launch",
                  "approx": true,
                  "desc": "Claude Codeの応答の調子・形式を切り替えるアウトプットスタイルを導入。用途に合わせて振る舞いを変えられる。",
                  "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
                }
              ]
            },
            {
              "id": "code-plugins",
              "name": "プラグイン / マーケットプレイス",
              "name_en": "Plugins / marketplace",
              "events": [
                {
                  "date": "2025-10-01",
                  "type": "launch",
                  "approx": true,
                  "desc": "コマンド・サブエージェント・フック・MCPサーバをまとめて配布できるプラグインと、その導入元となるマーケットプレイスに対応。",
                  "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
                }
              ]
            }
          ]
        },
        {
          "id": "cowork",
          "name": "Claude Cowork",
          "name_en": "Claude Cowork",
          "feats": [
            {
              "id": "cowork-rp",
              "name": "研究プレビュー（提供拡大）",
              "name_en": "Research preview (rollout)",
              "events": [
                {
                  "date": "2026-01-12",
                  "type": "preview",
                  "desc": "Claude Codeのエージェント能力をデスクトップの知的作業に拡張。隔離VMでローカルファイル/MCPに直接アクセス（Max・macOS）。"
                },
                {
                  "date": "2026-01-16",
                  "type": "expand",
                  "desc": "Proプランにも研究プレビューを拡大（macOS）。"
                }
              ]
            },
            {
              "id": "cowork-plugins",
              "name": "プラグイン / 管理機能",
              "name_en": "Plugins / admin controls",
              "events": [
                {
                  "date": "2026-02-24",
                  "type": "launch",
                  "desc": "プラグインのマーケットプレイスとTeam/Enterprise向け管理機能を提供。Google Drive・Gmail・Docusign・FactSet等の連携も拡充。"
                }
              ]
            },
            {
              "id": "cowork-sched",
              "name": "定期/オンデマンドのタスク",
              "name_en": "Scheduled / on-demand tasks",
              "events": [
                {
                  "date": "2026-02-25",
                  "type": "launch",
                  "desc": "定期/オンデマンドのタスク作成と、スキル/プラグイン/コネクタをまとめる「Customize」を追加。"
                }
              ]
            },
            {
              "id": "cowork-phone",
              "name": "スマホからの操作（Dispatch）",
              "name_en": "Phone control (Dispatch)",
              "events": [
                {
                  "date": "2026-03-17",
                  "type": "preview",
                  "desc": "デスクトップやモバイルから常駐スレッドでCoworkのタスクを管理（Pro/Max研究プレビュー）。"
                },
                {
                  "date": "2026-03-23",
                  "type": "preview",
                  "title": "コンピュータ操作の研究プレビュー",
                  "desc": "画面上のファイルを開く・クリック等をClaude自身が実行。離席中もDispatchがPC操作を代行。"
                }
              ]
            },
            {
              "id": "cowork-ga",
              "name": "一般提供（macOS / Windows）",
              "name_en": "General availability (macOS / Windows)",
              "events": [
                {
                  "date": "2026-04-09",
                  "type": "ga",
                  "desc": "デスクトップアプリでCoworkが一般提供に。利用分析やOpenTelemetryにも対応。"
                }
              ]
            },
            {
              "id": "cowork-legal",
              "name": "法務向けコネクタ / プラグイン",
              "name_en": "Legal connectors / plugins",
              "events": [
                {
                  "date": "2026-06-01",
                  "type": "expand",
                  "desc": "20以上の法務系MCPコネクタと12の実務分野プラグインを追加し、リサーチ/契約/ディスカバリ等の業務を支援。",
                  "approx": true
                }
              ]
            }
          ]
        },
        {
          "id": "chrome",
          "name": "Claude in Chrome",
          "name_en": "Claude in Chrome",
          "feats": [
            {
              "id": "chrome-rollout",
              "name": "提供拡大とモデル選択",
              "name_en": "Rollout & model selection",
              "events": [
                {
                  "date": "2025-09-29",
                  "type": "update",
                  "desc": "待機リストのMaxユーザーに開放。既定をSonnet 4.5に。",
                  "url": "https://claude.com/blog/claude-for-chrome"
                },
                {
                  "date": "2025-10-15",
                  "type": "update",
                  "desc": "既定をHaiku 4.5に高速化。画像アップロード代行や画面のスクショ/範囲指定に対応。"
                },
                {
                  "date": "2025-11-24",
                  "type": "expand",
                  "desc": "全Maxに拡大。定期タスク・計画承認実行・モデル選択を追加。"
                },
                {
                  "date": "2025-12-18",
                  "type": "expand",
                  "desc": "全有料プランにベータ拡大。Claude Code連携、デスクトップからの操作、操作の記録、コンソールログ読取、管理機能を追加。",
                  "url": "https://claude.com/blog/claude-for-chrome"
                }
              ]
            }
          ]
        },
        {
          "id": "design",
          "name": "Claude Design",
          "name_en": "Claude Design",
          "feats": [
            {
              "id": "design-launch",
              "name": "Claude Design（Anthropic Labs）",
              "name_en": "Claude Design (Anthropic Labs)",
              "events": [
                {
                  "date": "2026-04-17",
                  "type": "launch",
                  "desc": "自然言語でデザイン・プロトタイプ・スライド・ワンページャー等のビジュアルを共同制作できる新製品（Opus 4.7と同時）。",
                  "url": "https://www.anthropic.com/news/claude-design-anthropic-labs"
                },
                {
                  "date": "2026-06-01",
                  "type": "update",
                  "desc": "デザインシステムへの追従、Claude Codeとの連携強化、キャンバス直接編集、サイドバー常設などを追加。",
                  "approx": true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "connect",
      "name": "連携・MCP・スキル",
      "name_en": "Integrations, MCP & Skills",
      "accent": "#2F6BE0",
      "subs": [
        {
          "id": "connectors",
          "name": "コネクタ",
          "name_en": "Connectors",
          "feats": [
            {
              "id": "conn-managed",
              "name": "組織管理型のコネクタアクセス",
              "name_en": "Org-managed connector access",
              "status": "beta",
              "events": [
                {
                  "date": "2026-06-01",
                  "type": "beta",
                  "desc": "IdP(まずOkta)経由で管理者が一括設定し、ユーザーは初回ログインで自動的にコネクタを利用（チャット/Code/Cowork横断）。",
                  "approx": true
                }
              ]
            },
            {
              "id": "conn-perm",
              "name": "コネクタ権限（ロール連携）",
              "name_en": "Connector permissions (role-based)",
              "events": [
                {
                  "date": "2026-05-28",
                  "type": "update",
                  "desc": "どのコネクタ・どのツールを各ロールに許可するかを制御可能に。"
                }
              ]
            }
          ]
        },
        {
          "id": "mcp",
          "name": "MCP",
          "name_en": "Model Context Protocol (MCP)",
          "feats": [
            {
              "id": "mcp-interactive",
              "name": "インタラクティブ・コネクタ",
              "name_en": "Interactive connectors",
              "events": [
                {
                  "date": "2026-03-25",
                  "type": "launch",
                  "desc": "会話内で動くアプリ（ライブチャート/図/共有成果物）に接続できるインタラクティブ・コネクタ。"
                }
              ]
            },
            {
              "id": "mcp-tunnel2",
              "name": "MCPトンネル（プライベート接続）",
              "name_en": "MCP tunnel (private connections)",
              "status": "preview",
              "events": [
                {
                  "date": "2026-05-19",
                  "type": "preview",
                  "desc": "社内ネットワークのMCPサーバに接続できる研究プレビュー。"
                }
              ]
            }
          ]
        },
        {
          "id": "skills",
          "name": "Agent Skills（スキル）",
          "name_en": "Agent Skills",
          "feats": [
            {
              "id": "skills-intro",
              "name": "スキルの導入",
              "name_en": "Skills introduction",
              "events": [
                {
                  "date": "2025-10-15",
                  "type": "launch",
                  "desc": "作業手順をClaudeに教える「スキル」を導入。pptx/xlsx/docx/pdf用の標準スキルとカスタムスキルAPIを提供。",
                  "approx": true,
                  "url": "https://claude.com/blog/skills"
                }
              ]
            },
            {
              "id": "skills-eco",
              "name": "組織管理 / ディレクトリ / オープン標準",
              "name_en": "Org management / directory / open standard",
              "events": [
                {
                  "date": "2025-12-18",
                  "type": "expand",
                  "desc": "Team/Enterpriseの組織横断管理、パートナー製スキルのディレクトリ、AIプラットフォーム横断のオープン標準(Agent Skills)を提供。"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
