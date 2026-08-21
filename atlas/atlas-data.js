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
    lastUpdated: "2026-08-21",   // 最終更新日（必ず更新する）
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
                  "desc": "speedパラメータで出力を最大2.5倍高速化（プレミアム価格）。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
                {
                  "date": "2026-03-13",
                  "type": "ga",
                  "title": "1Mトークンコンテキスト 正式提供",
                  "desc": "200kを超えるリクエストが追加ヘッダ無しで自動対応に。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
                {
                  "date": "2026-05-28",
                  "type": "deprecate",
                  "title": "Fast mode 非推奨",
                  "desc": "4.8/4.7のFast modeへ移行を案内。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "desc": "Opus 4.7でもFast mode（研究プレビュー）を利用可能に。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                }
              ]
            },
            {
              "id": "opus48",
              "name": "Claude Opus 4.8",
              "name_en": "Claude Opus 4.8",
              "events": [
                {
                  "date": "2026-05-28",
                  "type": "launch",
                  "desc": "コーディング・エージェント能力・推論・実務知識でOpus 4.7を上回る。1Mコンテキスト標準、最大出力128k。effortは既定でhigh。",
                  "url": "https://www.anthropic.com/news/claude-opus-4-8"
                }
              ]
            },
            {
              "id": "opus5",
              "name": "Claude Opus 5",
              "name_en": "Claude Opus 5",
              "status": "current",
              "events": [
                {
                  "date": "2026-07-24",
                  "type": "launch",
                  "desc": "現行の最上位モデル（model id は claude-opus-5）。1Mコンテキストが既定かつ最大、出力128k、思考は既定でオン。価格は $5/$25 とOpus 4.8から据え置きで、性能向上ぶんが実質の値下げに。Claude Max の既定モデル。",
                  "url": "https://www.anthropic.com/news/claude-opus-5"
                },
                {
                  "date": "2026-07-24",
                  "type": "update",
                  "title": "effort が主要な制御に",
                  "desc": "low〜max の effort で挙動を調整する形へ。xhigh と max では thinking を無効化できず400エラーになる（破壊的変更）。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                }
              ]
            },
            {
              "id": "opus-research",
              "name": "研究版モデルの成果",
              "name_en": "Research-version milestones",
              "events": [
                {
                  "date": "2026-08-10",
                  "type": "update",
                  "title": "リーマン予想の関連問題で下界を改善",
                  "desc": "未公開の研究版Claudeが、リーマンゼータ関数の零点のうち予想を満たす割合の下界を41.6%から67.2%へ更新。Claude Code上で約60のサブエージェントを統括し、証明はLeanで形式検証可能な形にした。",
                  "url": "https://www.anthropic.com/research/riemann-zeta"
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
                  "desc": "標準料金で1Mコンテキストが利用可能に。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                }
              ]
            },
            {
              "id": "sonnet5",
              "name": "Claude Sonnet 5",
              "name_en": "Claude Sonnet 5",
              "status": "current",
              "events": [
                {
                  "date": "2026-06-30",
                  "type": "launch",
                  "desc": "Sonnet 4.6から推論・ツール利用・コーディングを大きく伸ばした新しい標準モデル（model id は claude-sonnet-5）。1Mコンテキスト・出力128k、適応的思考が既定。導入価格 $2/$10（2026-08-31まで、以降 $3/$15）。",
                  "url": "https://www.anthropic.com/news/claude-sonnet-5"
                },
                {
                  "date": "2026-06-30",
                  "type": "update",
                  "title": "新トークナイザと非対応パラメータ",
                  "desc": "手動のextended thinkingとsamplingパラメータは400エラーに。新トークナイザにより同じ文章でもトークン数が約3割増える点に注意。Priority Tierは非対応。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "desc": "防御的サイバーセキュリティ向けの招待制プレビューとして発表（Project Glasswing）。",
                  "url": "https://www.anthropic.com/glasswing"
                }
              ]
            },
            {
              "id": "fable5",
              "name": "Claude Fable 5",
              "name_en": "Claude Fable 5",
              "status": "current",
              "events": [
                {
                  "date": "2026-06-09",
                  "type": "launch",
                  "desc": "一般利用向けに安全対策を施したMythosクラスのモデルとして登場。1Mコンテキスト標準・常時adaptive thinking。",
                  "url": "https://www.anthropic.com/news/claude-fable-5-mythos-5"
                },
                {
                  "date": "2026-06-12",
                  "type": "suspend",
                  "title": "アクセス一時停止",
                  "desc": "輸出管理上の理由でMythos 5とともにアクセスを一時停止。",
                  "url": "https://www.anthropic.com/news/fable-mythos-access"
                },
                {
                  "date": "2026-07-01",
                  "type": "update",
                  "title": "グローバル再展開",
                  "desc": "6月末に規制が解除され、Claude Platform・Claude.ai・Claude Code・Cowork で全世界に再提供。クラウド各社での提供は順次復旧。",
                  "url": "https://www.anthropic.com/news/redeploying-fable-5"
                },
                {
                  "date": "2026-08-07",
                  "type": "update",
                  "title": "生物学セーフガードの改善",
                  "desc": "誤検知を約85%減らし、正当な生物学・ヘルスケア用途に応えやすく。デュアルユース悪用への防御は維持。",
                  "url": "https://www.anthropic.com/news/improving-fable-5-s-biology-safeguards"
                }
              ]
            },
            {
              "id": "mythos5",
              "name": "Claude Mythos 5",
              "name_en": "Claude Mythos 5",
              "status": "current",
              "events": [
                {
                  "date": "2026-06-09",
                  "type": "launch",
                  "desc": "Project Glasswing参加者向けの限定提供として登場。",
                  "url": "https://www.anthropic.com/news/claude-fable-5-mythos-5"
                },
                {
                  "date": "2026-06-12",
                  "type": "suspend",
                  "title": "アクセス一時停止",
                  "desc": "輸出管理上の理由でアクセスを一時停止。",
                  "url": "https://www.anthropic.com/news/fable-mythos-access"
                },
                {
                  "date": "2026-07-01",
                  "type": "update",
                  "title": "グローバル再展開",
                  "desc": "Fable 5とともに提供を再開。",
                  "url": "https://www.anthropic.com/news/redeploying-fable-5"
                }
              ]
            },
            {
              "id": "cyber-safeguards",
              "name": "サイバー分野の安全対策",
              "name_en": "Cyber safeguards",
              "events": [
                {
                  "date": "2026-07-02",
                  "type": "launch",
                  "title": "CJS（脱獄の深刻度）フレームワーク公表",
                  "desc": "ジェイルブレイクの深刻度をCJS-0〜CJS-4の5段階で測る共通の物差しを提案。capability gain・breadth・ease of weaponization・discoverability の4軸で評価する。",
                  "url": "https://www.anthropic.com/news/fable-safeguards-jailbreak-framework"
                },
                {
                  "date": "2026-07-30",
                  "type": "update",
                  "title": "サイバー評価中のインシデント調査",
                  "desc": "隔離されているはずの評価環境からモデルが実インターネットへ到達した3件を調査・公表。評価パートナー側の設定不備が原因だった。",
                  "url": "https://www.anthropic.com/news/investigating-incidents-cybersecurity-evals"
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
              "id": "output-provenance",
              "name": "生成物の来歴（透かし・C2PA）",
              "name_en": "Output provenance (watermark & C2PA)",
              "events": [
                {
                  "date": "2026-08-11",
                  "type": "launch",
                  "title": "生成物に機械が読める印をつける",
                  "desc": "文章には目に見えない透かしを文そのものに埋め込み、コピー＆ペーストしても残る形に。画像などのファイルにはC2PA準拠の署名つき来歴情報を付与。EU AI法の透明性ルール（2026-08-02適用）への対応で、8月2日以降にEUでローンチするモデルから。提供範囲はEUに限らず世界中で、Claude・Claude Code・Cowork・APIが対象。",
                  "url": "https://support.claude.com/en/articles/16266773-how-claude-marks-ai-generated-content"
                },
                {
                  "date": "2026-08-14",
                  "type": "update",
                  "title": "仕組みの解説を公開",
                  "desc": "テキスト透かしの仕組み（SynthID-Textベース）と方針を説明する記事を公開。今後のモデルへの標準搭載と、透かしを見つけるAPIを開発中であることも書かれた。",
                  "url": "https://www.anthropic.com/news/claude-text-watermark"
                }
              ]
            },
            {
              "id": "ctx1m",
              "name": "1Mトークンコンテキスト",
              "name_en": "1M token context",
              "events": [
                {
                  "date": "2026-02-05",
                  "type": "beta",
                  "desc": "Opus 4.6でも1Mコンテキストがベータ提供開始（長コンテキスト料金）。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
                {
                  "date": "2026-03-13",
                  "type": "ga",
                  "desc": "Opus 4.6 / Sonnet 4.6で正式提供。1M利用時の画像/PDF上限を100→600に拡大、専用レート上限は撤廃。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
                {
                  "date": "2026-04-30",
                  "type": "retire",
                  "desc": "Sonnet 4.5 / Sonnet 4向けの1Mコンテキストβ（context-1m-2025-08-07）を提供終了。200k超の要求はエラーに。利用には4.6世代へ移行。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "desc": "adaptive thinkingを導入（Opus 4.6推奨）。必要なときだけ推論を発動。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
                {
                  "date": "2026-03-16",
                  "type": "update",
                  "title": "思考表示の制御",
                  "desc": "thinking.display=omittedで思考内容を省いて高速ストリーミング可能に。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
                {
                  "date": "2026-05-27",
                  "type": "update",
                  "title": "思考トークンの可視化",
                  "desc": "課金出力トークンのうち思考分をusageで確認可能に。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "desc": "Opus 4.5向けに、応答の徹底度と効率を調整するeffortをベータ提供。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
                {
                  "date": "2026-02-05",
                  "type": "ga",
                  "desc": "正式提供。budget_tokensに代わる思考深度の制御へ。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
                {
                  "date": "2026-05-28",
                  "type": "update",
                  "desc": "Opus 4.8では既定値がhighに。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "desc": "Opus 4.7で長辺2576pxまでの高解像度画像入力に対応（4.8にも継承）。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "desc": "Opus 4.7から新トークナイザを採用。同じ文章で約30%多くのトークンに（Fable/Mythos 5も継承）。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "desc": "Opus 4.8でユーザーターン後にrole:systemを送信可能に。長時間セッション中の指示変更でもキャッシュを維持。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
              "id": "retire-opus47-fast",
              "name": "Opus 4.7 の Fast mode 廃止",
              "name_en": "Opus 4.7 fast mode retired",
              "events": [
                {
                  "date": "2026-07-24",
                  "type": "retire",
                  "desc": "claude-opus-4-7 に speed:\"fast\" を指定するとエラーに（4.6と違いフォールバックなし）。標準速度の4.7自体は継続。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
              ]
            },
            {
              "id": "retire-opus41",
              "name": "Claude Opus 4.1 提供終了",
              "name_en": "Claude Opus 4.1 retired",
              "events": [
                {
                  "date": "2026-08-05",
                  "type": "retire",
                  "desc": "claude-opus-4-1-20250805 への全リクエストがエラーに。Opus 5への移行が案内された。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
              ]
            },
            {
              "id": "dep-opus3",
              "name": "Opus 3 / Sonnet 3.7 / Haiku 3.x",
              "name_en": "Opus 3 / Sonnet 3.7 / Haiku 3.x",
              "status": "retired",
              "events": [
                {
                  "date": "2026-01-05",
                  "type": "retire",
                  "desc": "Opus 3 をAPIから提供終了。Opus 4.5への移行を推奨。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
                {
                  "date": "2026-02-19",
                  "type": "retire",
                  "desc": "Sonnet 3.7 と Haiku 3.5 を提供終了。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
                {
                  "date": "2026-04-20",
                  "type": "retire",
                  "desc": "Haiku 3 を提供終了。Haiku 4.5へ。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "desc": "Opus 4 と 4.1 をClaude/Claude Codeのモデル選択から削除。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
                },
                {
                  "date": "2026-04-14",
                  "type": "deprecate",
                  "desc": "Sonnet 4 / Opus 4 の非推奨を告知（API終了予定: 6/15）。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
                {
                  "date": "2026-06-05",
                  "type": "deprecate",
                  "desc": "Opus 4.1 の非推奨を告知（API終了予定: 8/5）。Opus 4.8へ。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
                {
                  "date": "2026-06-15",
                  "type": "retire",
                  "desc": "Sonnet 4 と Opus 4 をAPIから提供終了。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "date": "2025-11-14",
                  "type": "beta",
                  "desc": "スキーマ準拠を保証する構造化出力を公開ベータ提供開始（Sonnet 4.5 / Opus 4.1、ヘッダ structured-outputs-2025-11-13）。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
                {
                  "date": "2025-12-04",
                  "type": "update",
                  "desc": "Haiku 4.5でも構造化出力に対応。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
                {
                  "date": "2026-01-29",
                  "type": "ga",
                  "desc": "Sonnet/Opus/Haiku 4.5で正式提供。スキーマ対応拡大、追加ヘッダ不要に。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "desc": "GET /v1/models が max_input_tokens・max_tokens・capabilities を返すように。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "desc": "refusal応答のstop_detailsを公式文書化（category: cyber/bio）。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
                {
                  "date": "2026-06-02",
                  "type": "update",
                  "desc": "出力前に拒否された場合は課金されない仕様に。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                }
              ]
            },
            {
              "id": "fallbacks",
              "name": "fallbacks パラメータ",
              "name_en": "fallbacks parameter",
              "events": [
                {
                  "date": "2026-06-09",
                  "type": "beta",
                  "desc": "拒否されたリクエストを別モデルで再実行できるサーバ側オプション（Claude API/AWS版でベータ、Batches API除く）。料金は再実行先モデルに従う。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
          "id": "computer-use",
          "name": "画面を見て、クリックして動かす",
          "name_en": "Computer use tool",
          "status": "current",
          "events": [
            {
              "date": "2026-08-19",
              "type": "ga",
              "desc": "コンピュータ操作の道具が computer_toolset_20260801 として一般提供に。ベータの合図をつけずに使える。ひと続きの操作をまとめて返せるようになり、拡大は既定で入り、部品ごとの設定もできる。前のベータ版も残るが、乗り換えると要求の形が変わる。",
              "url": "https://platform.claude.com/docs/en/release-notes/overview"
            }
          ]
        },
        {
          "id": "browser-toolset",
          "name": "ブラウザの窓の中だけで動かす",
          "name_en": "Browser use tool",
          "status": "current",
          "events": [
            {
              "date": "2026-08-19",
              "type": "launch",
              "desc": "browser_toolset_20260801 として公開。机全体ではなく、こちらが用意したブラウザの表示領域の中で動く。画面の絵とクリックだけでなく、ページの構造そのもの（読み上げ用の木・要素・入力欄・タブ）を読み、要素の指し示し・入力欄への記入・タブの出し入れ・取得したファイルの報告に対応する。",
              "url": "https://platform.claude.com/docs/en/release-notes/overview"
            }
          ]
        },
            {
              "id": "files-api",
              "name": "ファイルを一度あずけて、何度も使う",
              "name_en": "Files API",
              "events": [
                {
                  "date": "2026-08-19",
                  "type": "ga",
                  "desc": "一度あずけたファイルを file_id で呼び出す仕組みが正式版に。ためし版の合図（files-api-2025-04-14）が要らなくなった。あずけるときに expires_in_seconds で保つ長さを決められ、一覧はページ送りと ids での絞り込みに対応。置ける量は組織あたり1TB、呼び出しは毎分500回まで。",
                  "url": "https://platform.claude.com/docs/en/build-with-claude/files"
                },
              ]
            },
            {
              "id": "codeexec",
              "name": "コード実行ツール",
              "name_en": "Code execution tool",
              "events": [
                {
                  "date": "2026-02-17",
                  "type": "ga",
                  "desc": "正式提供。Web検索/フェッチと併用時は無料に。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
                {
                  "date": "2026-05-21",
                  "type": "update",
                  "desc": "1セル90秒の実行上限を説明に明示し、長時間処理を計画しやすく。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                }
              ]
            },
            {
              "id": "websearch",
              "name": "Web検索 / Webフェッチ",
              "name_en": "Web search / Web fetch",
              "events": [
                {
                  "date": "2025-09-10",
                  "type": "beta",
                  "desc": "指定したWebページやPDFの全文を取得できるWebフェッチツールをベータ提供開始。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
                {
                  "date": "2026-02-17",
                  "type": "ga",
                  "desc": "正式提供。動的フィルタリングでコンテキスト投入前に結果を絞り込み。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
                {
                  "date": "2026-03-18",
                  "type": "update",
                  "desc": "response_inclusionパラメータで消費済み結果を除外可能に。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
                {
                  "date": "2026-05-18",
                  "type": "update",
                  "desc": "SEC提出書類の詳細データを返すように（財務リサーチの裏付けに）。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "desc": "コード実行内からツールを呼び、レイテンシとトークンを削減（ベータ）。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
                {
                  "date": "2026-02-17",
                  "type": "ga",
                  "desc": "正式提供。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "desc": "大量のツールから必要なものを動的に発見・読込（ベータ）。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
                {
                  "date": "2026-02-17",
                  "type": "ga",
                  "desc": "正式提供。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                }
              ]
            },
            {
              "id": "memtool",
              "name": "メモリツール",
              "name_en": "Memory tool",
              "events": [
                {
                  "date": "2025-09-29",
                  "type": "beta",
                  "desc": "会話をまたいで情報を保存・参照できるメモリツールをベータ提供開始。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
                {
                  "date": "2026-02-17",
                  "type": "ga",
                  "desc": "正式提供（追加ヘッダ不要）。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                }
              ]
            },
            {
              "id": "context-editing",
              "name": "コンテキスト編集",
              "name_en": "Context editing",
              "events": [
                {
                  "date": "2025-09-29",
                  "type": "beta",
                  "desc": "トークン上限が近づくと古いツール結果/呼び出しを自動で除去し、長い会話のコンテキストを管理するベータ機能。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "desc": "高速な実行モデルに、生成途中で助言する高知能モデルを組み合わせるベータ。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
                {
                  "date": "2026-06-02",
                  "type": "update",
                  "desc": "max_tokensで助言の出力長を制限可能に。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "desc": "全モデル・全プラットフォームで正式提供。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "desc": "cache_controlを1つ付けるだけで、会話の伸びに合わせ自動でキャッシュ点を前進。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "desc": "サーバ側のコンテキスト要約で実質無限長の会話を実現（ベータ・Opus 4.6）。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "desc": "cache_miss_reasonでプロンプトキャッシュの不一致箇所を報告（公開ベータ）。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "desc": "Batch APIでOpus 4.6/Sonnet 4.6のmax_tokensを300kに引き上げ。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
              "id": "ma-web-domains",
              "name": "エージェントが見にいける先を、こちらで決める",
              "name_en": "Web tool domain restrictions for Managed Agents",
              "events": [
                {
                  "date": "2026-08-19",
                  "type": "update",
                  "desc": "エージェントの検索とページ取得に、行っていい先（allowed_domains）と行ってはいけない先（blocked_domains）を書けるように。あわせて取得は max_content_tokens、検索は user_location を受ける。今までの書き方のままでも動く。",
                  "url": "https://platform.claude.com/docs/en/managed-agents/tools"
                },
              ]
            },
            {
              "id": "ma-budget-advisor",
              "name": "セッション予算とadvisor",
              "name_en": "Session budgets & advisor",
              "events": [
                {
                  "date": "2026-08-07",
                  "type": "update",
                  "desc": "セッションに予算を設定でき、上限に達するとbudget_reachedで一時停止する。途中で上位モデルに相談できるadvisor、データレジデンシー指定、GitHubリポジトリの.claude/skills自動読込も追加。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
              ]
            },
            {
              "id": "ma-launch",
              "name": "Managed Agents（管理型エージェント）",
              "name_en": "Managed Agents",
              "status": "beta",
              "events": [
        {
          "date": "2026-08-19",
          "type": "update",
          "desc": "Consoleのセッション表示が作り直された。時間軸のミニマップ、モデルへの問い合わせ単位でまとまった記録、それに詳細・費用・生のイベント・道具ごとの統計・つないだ資源・筋ごとの動きを見る画面が付いた。",
          "url": "https://platform.claude.com/docs/en/release-notes/overview"
        },
                {
                  "date": "2026-04-08",
                  "type": "beta",
                  "desc": "安全なサンドボックスと内蔵ツールでClaudeを自律エージェントとして動かす公開ベータ。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "date": "2026-08-19",
                  "type": "update",
                  "desc": "自前のサンドボックスで動かすときも、記憶の置き場をつなげるように。Python・TypeScript・Go の下働きが、置き場を mount_path に降ろして、エージェントが書き換えたぶんを戻す。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
                {
                  "date": "2026-04-23",
                  "type": "beta",
                  "desc": "Managed Agentsのメモリ機能を公開ベータで提供。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "desc": "複数エージェントの連携と成果(Outcomes)定義を公開ベータで提供。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "desc": "セッション/Vaultのライフサイクルを通知するWebhookと、資格情報を安全に扱うVaultを提供。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
                {
                  "date": "2026-06-09",
                  "type": "update",
                  "desc": "Vaultで環境変数の資格情報をサンドボックスに注入可能に。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "desc": "ツール実行を自社環境で動かせる自前サンドボックスを提供。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
                {
                  "date": "2026-06-09",
                  "type": "update",
                  "desc": "cronスケジュールでセッションを定期実行できるように。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "desc": "プライベートネットワーク内のMCPサーバへ接続できる研究プレビュー。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
              "id": "apps-gateway",
              "name": "Claude apps gateway",
              "name_en": "Claude apps gateway",
              "events": [
                {
                  "date": "2026-06-29",
                  "type": "launch",
                  "desc": "Bedrock・Google Cloud向けのゲートウェイを提供開始。あわせてClaude in Microsoft FoundryがGAに。",
                  "url": "https://claude.com/blog/introducing-the-claude-apps-gateway"
                },
              ]
            },
            {
              "id": "inference-hooks",
              "name": "Inference hooks（インラインDLP）",
              "name_en": "Inference hooks (inline DLP)",
              "events": [
                {
                  "date": "2026-08-05",
                  "type": "beta",
                  "desc": "claude.ai・Cowork・Claude Codeの各プロンプトを組織のAIセキュリティサーバへ照会し、許可・拒否を判定してから推論する。拒否はActivity Feedに記録される（Enterprise向け）。",
                  "url": "https://claude.com/blog/claude-enterprise-inference-hooks"
                },
              ]
            },
            {
              "id": "playground",
              "name": "Playground（旧Workbench）",
              "name_en": "Playground (formerly Workbench)",
              "events": [
                {
                  "date": "2026-08-18",
                  "type": "update",
                  "desc": "コンソールの試し場が Workbench から Playground に改名。Messages API のパラメータをひととおり触れるようになり、コード実行やウェブ検索を試す雛形が同梱。実行するたびに、送ったSDKのリクエスト全文と返ってきた応答の両方が見られる。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
              ]
            },
            {
              "id": "workbench-retire",
              "name": "旧Workbenchと実験的プロンプトAPIの終了",
              "name_en": "Legacy Workbench retirement",
              "events": [
                {
                  "date": "2026-07-17",
                  "type": "retire",
                  "desc": "旧Workbenchは2026-08-17でアクセス終了、実験的なプロンプト生成APIも同日終了。保存済みのプロンプトや変数は新Playgroundへ引き継がれないので、事前のエクスポートが要る。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
              ]
            },
            {
              "id": "admin-user-mgmt",
              "name": "組織の人を、APIで足したり分けたりする",
              "name_en": "Admin API user-management endpoints",
              "events": [
                {
                  "date": "2026-08-19",
                  "type": "ga",
                  "desc": "Claude Enterprise の組織で、メンバー・招待・グループ・役割をAPIから扱う口が正式版に。グループと役割の請求に要っていたためし版の合図（ce-user-management-2026-07-13）が不要になった。付けて呼んでも今までどおり受け取る。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
              ]
            },
            {
              "id": "apikey-expiry",
              "name": "APIキーの有効期限設定",
              "name_en": "API key expiration",
              "events": [
                {
                  "date": "2026-07-08",
                  "type": "update",
                  "desc": "ConsoleでAPIキーやAdminキーに有効期限を設定できるように。7日以上のキーは期限前にメールで知らせてくれる。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
              ]
            },
            {
              "id": "console",
              "name": "Console → platform.claude.com",
              "name_en": "Console → platform.claude.com",
              "events": [
                {
                  "date": "2026-08-19",
                  "type": "update",
                  "desc": "セッションを見る画面を作り直した。時間の流れの小さな地図と、モデルの請求ごとにまとめた記録。細かい欄から、費用・生の出来事・道具ごとの数・積んだ資源・筋ごとの動きが見られる。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
                {
                  "date": "2026-01-12",
                  "type": "update",
                  "desc": "ブランド統合に伴い、コンソールがplatform.claude.comへ移行（自動リダイレクト）。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "desc": "AWS経由・AWS課金・IAM認証でClaude APIを利用できる基盤を提供。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
                {
                  "date": "2026-05-29",
                  "type": "expand",
                  "desc": "Managed AgentsのWebhook/マルチエージェント/自前サンドボックスをAWSでも提供。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "desc": "Messages APIをBedrockで研究プレビュー提供。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
                {
                  "date": "2026-04-16",
                  "type": "expand",
                  "desc": "全Bedrock顧客に開放。Opus 4.7/Haiku 4.5を27リージョンでセルフサーブ。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                }
              ]
            },
            {
              "id": "foundry",
              "name": "Claude in Microsoft Foundry",
              "name_en": "Claude in Microsoft Foundry",
              "events": [
                {
                  "date": "2025-11-18",
                  "type": "preview",
                  "desc": "Azure課金・OAuth認証でClaudeを使える新しいデプロイ基盤（Bedrock/Vertexに続く第3の経路）。拡張思考・プロンプトキャッシュ・PDF・Agent Skills・ツール使用に対応。",
                  "url": "https://www.anthropic.com/news/claude-in-microsoft-foundry"
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
                  "desc": "組織/ワークスペースのレート上限をプログラムから照会可能に。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                }
              ]
            },
            {
              "id": "workspace-id-header",
              "name": "応答からワークスペースを特定",
              "name_en": "Identify the workspace behind an API response",
              "events": [
                {
                  "date": "2026-08-11",
                  "type": "update",
                  "desc": "APIの応答に anthropic-workspace-id ヘッダーが付くように。そのリクエストの鍵がどのワークスペースに属していたかが、返事を見るだけで分かる。既定のワークスペースでも返る。",
                  "url": "https://platform.claude.com/docs/en/manage-claude/workspaces"
                }
              ]
            },
            {
              "id": "usage-tiers",
              "name": "利用ティアとレート上限",
              "name_en": "Usage tiers & rate limits",
              "status": "current",
              "events": [
                {
                  "date": "2026-06-26",
                  "type": "expand",
                  "desc": "API全体でレート上限を引き上げ、Sonnet/HaikuのレートをOpusと同水準に揃えた。利用ティアをStart/Build/Scaleの3つに集約（多くの組織は上位ティアへ移行・制限が下がる組織はなく対応不要）。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "desc": "inference_geoで推論実行地域を指定可能に（US限定は1.1倍）。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "approx": true,
                  "url": "https://claude.com/blog/workload-identity-federation"
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
                  "desc": "Claude API用のコマンドラインクライアント。Claude Codeとの統合やYAMLでのリソース管理が可能。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "desc": "Python/TypeScript SDKに、要約でコンテキストを自動管理するクライアント側圧縮を追加。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
              "id": "voice-think",
              "name": "ボイスモードでじっくり考える",
              "name_en": "Thinking in voice mode",
              "events": [
                {
                  "date": "2026-07-23",
                  "type": "update",
                  "desc": "声で話しているときにも、難しい問いをじっくり考えられるように。",
                  "url": "https://claude.com/blog/think-through-hard-problems-in-voice-mode"
                },
              ]
            },
            {
              "id": "reflect",
              "name": "Reflect（月次のふりかえり）",
              "name_en": "Reflect (monthly review)",
              "events": [
                {
                  "date": "2026-07-09",
                  "type": "launch",
                  "desc": "設定の中で、会話のトピックや使い方の傾向をふりかえれる機能。休憩の通知や静かな時間の設定もあわせて追加。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
                },
              ]
            },
            {
              "id": "visuals",
              "name": "チャット内のチャート・図・可視化",
              "name_en": "In-chat charts, diagrams & visualizations",
              "events": [
                {
                  "date": "2026-03-12",
                  "type": "launch",
                  "desc": "応答内にカスタムのチャート・図・可視化をインラインで生成できるように。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
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
                  "desc": "Proユーザーとモバイル(iOS/Android)でファイル作成・編集が可能に。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
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
                  "desc": "上限接近時に前半を要約し、実質無限長の会話と長さ制限エラーの大幅削減を実現。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
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
              "id": "memory-revamp",
              "name": "メモリの刷新",
              "name_en": "Memory revamp",
              "events": [
                {
                  "date": "2026-07-10",
                  "type": "update",
                  "desc": "日ごとの要約をためる方式から、会話の最中にClaude自身がカテゴリ別のエントリを読み書きする方式へ。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
                },
              ]
            },
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
                  "desc": "無料ユーザーを含む全ユーザーに開放。メモリのインポート/エクスポートも可能に。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
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
                  "desc": "iOS/Androidで健康・運動データを読み取り、活動/睡眠などをネイティブチャートで分析（Pro/Max・米国）。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
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
                  "desc": "モバイルアプリがインタラクティブなアプリに接続。会話内でライブチャートや図、共有可能な成果物を表示。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
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
                  "desc": "Max/Team/Enterpriseにベータ提供。ピボット・グラフ・ファイルアップロード対応。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
                },
                {
                  "date": "2026-02-05",
                  "type": "update",
                  "desc": "Opus 4.6採用。ピボット編集や条件付き書式などネイティブ操作に対応。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
                },
                {
                  "date": "2026-03-11",
                  "type": "update",
                  "desc": "PowerPointと会話コンテキストを共有、スキル対応、LLMゲートウェイ接続に対応。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
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
                  "desc": "PowerPoint用アドインとして提供開始。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
                },
                {
                  "date": "2026-03-11",
                  "type": "update",
                  "desc": "Excelとの相互コンテキスト共有・スキル対応。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
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
                  "desc": "営業を介さずWebから直接Enterpriseプランを購入可能に（Claude/Code/Cowork込み）。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
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
                  "desc": "保護対象保健情報(PHI)を扱う組織向けのHIPAA対応版を提供。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
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
                  "desc": "ユーザーをグループ化し、機能の可否をロールで定義（ロールベースアクセス制御）。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
                },
                {
                  "date": "2026-05-28",
                  "type": "update",
                  "desc": "コネクタ単位・ツール単位の権限をカスタムロールで制御可能に。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
                },
                {
                  "date": "2026-06-02",
                  "type": "update",
                  "desc": "請求やプライバシーなど管理権限をオーナー化せずに付与可能に。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
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
                  "desc": "Claude/Claude Code Remoteの利用・エンゲージメントデータにプログラムからアクセス（Enterprise）。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
                },
                {
                  "date": "2026-04-09",
                  "type": "expand",
                  "desc": "Cowork の利用状況もAnalytics APIで取得可能に。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
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
                  "desc": "主要なセキュリティ/コンプライアンスツールと連携し、IT/セキュリティ部門がClaude全体を統制可能に。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
                },
                {
                  "date": "2026-08-11",
                  "type": "beta",
                  "desc": "利用者の端末上で動くCoworkやClaude Codeのセッション記録も取得できるように（Enterprise向けベータ）。これまで手の届かなかったローカル側の記録を、既存のコンプライアンス用の鍵と権限のまま扱える。",
                  "url": "https://platform.claude.com/docs/en/manage-claude/compliance-content-data"
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
          "id": "science",
          "name": "Claude Science（研究者向け）",
          "name_en": "Claude Science (for researchers)",
          "feats": [
            {
              "id": "science-workbench",
              "name": "科学者向けAIワークベンチ",
              "name_en": "AI workbench for scientists",
              "events": [
                {
                  "date": "2026-06-30",
                  "type": "beta",
                  "desc": "文献を読み解くところから多段階の研究の実行、図表や原稿の推敲までを一つの環境でまとめて扱えるアプリ。macOSとLinux向けで、ローカルまたはSSH/HPCのログインノード経由で動く。ゲノミクスや単一細胞、プロテオミクス、構造生物学など60を超えるスキルとコネクタが最初から用意されている。",
                  "url": "https://www.anthropic.com/news/claude-science-ai-workbench"
                }
              ]
            }
          ]
        },
        {
          "id": "code",
          "name": "Claude Code",
          "name_en": "Claude Code",
          "feats": [
        {
          "id": "cc-keybinding-flavor",
          "name": "Ctrl+W の削り方を、Bash風にえらぶ",
          "name_en": "keybindingFlavor setting",
          "status": "current",
          "events": [
            {
              "date": "2026-08-21",
              "type": "update",
              "approx": true,
              "desc": "設定 keybindingFlavor に readline を選ぶと、入力欄の Ctrl+W が Bash と同じく直前の空白まで削るようになる。既定の classic は変わらない（Claude Code 2.1.238）。",
              "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
            }
          ]
        },
            {
              "id": "cc-gov",
              "name": "政府機関向け提供",
              "name_en": "Available to government",
              "events": [
                {
                  "date": "2026-07-07",
                  "type": "expand",
                  "desc": "Claude Code と Cowork を政府機関向けに提供開始。",
                  "url": "https://claude.com/blog/bringing-claude-code-and-claude-cowork-to-government"
                },
              ]
            },
            {
              "id": "cc-concise-style",
              "name": "前置きを省いて、結果から言う型",
              "name_en": "Concise output style",
              "events": [
                {
                  "date": "2026-08-20",
                  "type": "update",
                  "approx": true,
                  "desc": "組み込みの話し方に「Concise」が加わった（Claude Code 2.1.237）。前置きや実況を省いて結果から言う。仕事の丁寧さはそのまま、とされる。/config の Output style で選ぶ。",
                  "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
                },
              ]
            },
            {
              "id": "cc-default-model-env",
              "name": "始まりのモデルを、環境変数で決める",
              "name_en": "ANTHROPIC_DEFAULT_MODEL",
              "events": [
                {
                  "date": "2026-08-20",
                  "type": "update",
                  "approx": true,
                  "desc": "新しいセッションが始まるモデルを ANTHROPIC_DEFAULT_MODEL で決められる（2.1.236）。/model で選び直せばそちらが勝ち、立ち上げ直しても残る。ANTHROPIC_MODEL とはそこが違う。",
                  "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
                },
              ]
            },
            {
              "id": "cc-notify-idle",
              "name": "手が空いたら、一度だけ知らせて",
              "name_en": "notify_when_idle for cross-session SendMessage",
              "events": [
                {
                  "date": "2026-08-20",
                  "type": "update",
                  "approx": true,
                  "desc": "同じ機械の別のセッションに「次に手が空いたら一度だけ知らせて」と頼めるようになった（2.1.236）。頼んだときだけ・一度きりで、繰り返し見にいかない形。",
                  "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
                },
              ]
            },
            {
              "id": "cc-goal-checkin",
              "name": "長い作業の後ろで止まったら、自分から声をかける",
              "name_en": "/goal auto check-in",
              "events": [
                {
                  "date": "2026-08-20",
                  "type": "update",
                  "approx": true,
                  "desc": "後ろで動いている長い仕事を待って止まっているとき、こちらが戻るのを待たずに30分後（次は1時間、2時間）に自分から知らせる（2.1.236）。",
                  "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
                },
              ]
            },
            {
              "id": "cc-spellcheck",
              "name": "打ちながら綴りの間違いに下線",
              "name_en": "Spellcheck in the prompt input",
              "events": [
                {
                  "date": "2026-08-19",
                  "type": "update",
                  "approx": true,
                  "desc": "入力欄に打っているそばから、綴りの怪しい語に下線が引かれる（任意設定 spellcheck・Claude Code 2.1.235）。手元に入っている aspell / hunspell / ispell を使うもの。",
                  "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
                },
              ]
            },
            {
              "id": "cc-todo-tools-off",
              "name": "やること管理ツールの既定オフ",
              "name_en": "Todo tools off by default on newer models",
              "events": [
                {
                  "date": "2026-08-15",
                  "type": "deprecate",
                  "approx": true,
                  "desc": "やること・作業の管理に使っていた道具（TodoWrite や作業票まわり）が、Opus 4.8 と Sonnet 5 以降の新しいモデルでは既定で使えなくなった。必要なら CLAUDE_CODE_ENABLE_TODO_TOOLS=1 で戻せる。",
                  "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
                }
              ]
            },
            {
              "id": "cc-webfetch-cache-ttl",
              "name": "ページ取得のキャッシュ時間の設定",
              "name_en": "Configurable WebFetch cache TTL",
              "events": [
                {
                  "date": "2026-08-15",
                  "type": "update",
                  "approx": true,
                  "desc": "取ってきたページを覚えておく時間を、環境変数 CLAUDE_CODE_WEBFETCH_CACHE_TTL_MS で変えられるように。既定は今までどおり15分。",
                  "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
                }
              ]
            },
            {
              "id": "cc-tool-memory",
              "name": "コマンドのメモリ上限",
              "name_en": "Memory limit for tool commands",
              "events": [
                {
                  "date": "2026-08-15",
                  "type": "beta",
                  "approx": true,
                  "desc": "Linuxで、Bashツールが動かすコマンドにメモリの上限を設けられるように（任意設定・CLAUDE_CODE_TOOL_MEMORY_LIMIT）。暴走したビルドがセッション全体を止めてしまうのを防ぐ。",
                  "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
                }
              ]
            },
            {
              "id": "cc-auto-continue-limit",
              "name": "上限が戻ったら、自分で続きから",
              "name_en": "Auto-continue when the usage limit resets",
              "events": [
                {
                  "date": "2026-08-18",
                  "type": "launch",
                  "approx": true,
                  "desc": "claude.ai の利用上限に当たって止まっても、上限が戻った時点で自分でセッションの続きを始める。要らなければ /config の「Continue automatically at usage limit」で切れる。",
                  "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
                }
              ]
            },
            {
              "id": "cc-dialogs-midturn",
              "name": "作業中でも設定の窓を開ける",
              "name_en": "Open dialogs while Claude is working",
              "events": [
                {
                  "date": "2026-08-18",
                  "type": "update",
                  "approx": true,
                  "desc": "/permissions を作業の途中で開けるようになり、変えた許可はその回の残りから効く。/add-dir・/autocompact・/theme・/help・/config・/advisor も、全画面表示のまま途中で開ける。",
                  "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
                }
              ]
            },
            {
              "id": "cc-gitlab-mr",
              "name": "GitLabのマージリクエスト対応",
              "name_en": "GitLab merge request support",
              "events": [
                {
                  "date": "2026-08-15",
                  "type": "expand",
                  "approx": true,
                  "desc": "作業用の別ツリーを開くときと、走っているエージェントの一覧で、GitLabのマージリクエストのURLを受け付けるように。一覧では !番号 の形で表示される。",
                  "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
                },
                {
                  "date": "2026-08-18",
                  "type": "update",
                  "approx": true,
                  "desc": "画面の下と状態表示にマージリクエストのバッジが出るように。下書き・確認待ち・通過の三つの状態が見分けられる（GitLabのリモートがあり、glabに認証が通っているとき）。",
                  "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
                }
              ]
            },
            {
              "id": "cc-user-attribution",
              "name": "利用者ごとの利用額の按分",
              "name_en": "Per-user spend attribution",
              "events": [
                {
                  "date": "2026-08-15",
                  "type": "update",
                  "approx": true,
                  "desc": "アプリ用の中継にforward_user_identityという任意の設定が加わり、サインインしている人の身元をヘッダで渡せるように。中継の後ろに置いた代理サーバで、誰がどれだけ使ったかを分けて数えられる。",
                  "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
                }
              ]
            },
            {
              "id": "cc-cross-session",
              "name": "セッション間メッセージング",
              "name_en": "Cross-session messaging",
              "events": [
        {
          "date": "2026-08-21",
          "type": "update",
          "approx": true,
          "desc": "受け取らない設定の相手へ送ったとき、これまで成功したように見えていたのが「断られた」と返るように。相手の受け口があふれて捨てられた場合も、送った側に伝わる（Claude Code 2.1.238）。",
          "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
        },
                {
                  "date": "2026-08-14",
                  "type": "update",
                  "approx": true,
                  "desc": "入力欄で @ を打つと、動いている別のセッションを名前で指名できるように。同じ機械の中では名前が重複しないよう自動で振り分けられ、受け取り方（承諾・保留・拒否）も設定から選べる。",
                  "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
                },
                {
                  "date": "2026-08-01",
                  "type": "launch",
                  "desc": "別のセッションへメッセージを送れる仕組み。v2.1.224以降のmacOSとLinux（WSL2含む）が対象でnative Windowsは非対象。公式ドキュメントに日付表記がないため時期は概算。",
                  "url": "https://code.claude.com/docs/en/cross-session-messaging",
                  "approx": true
                },
              ]
            },
            {
              "id": "cc-selfhost",
              "name": "自社コンピュートでのセッション実行",
              "name_en": "Run sessions on your own compute",
              "events": [
        {
          "date": "2026-08-21",
          "type": "update",
          "approx": true,
          "desc": "止める合図を受けても、つながっているセッションは指定した分だけ続けてから終われるように（--defer-shutdown-max-min）。接続ごとに新しい認証ヘッダを求める出口プロキシ向けの指定も加わった（Claude Code 2.1.238）。",
          "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
        },
                {
                  "date": "2026-08-06",
                  "type": "beta",
                  "desc": "自社ネットワーク内でセッションを走らせ、内部サービスやDBを外へ公開せずに扱える。Team/Enterprise向けのパブリックベータで既定はオフ。",
                  "url": "https://claude.com/blog/run-claude-code-sessions-on-your-own-compute"
                },
              ]
            },
            {
              "id": "cc-auto-mode",
              "name": "auto mode が既定に",
              "name_en": "Auto mode becomes the default",
              "events": [
                {
                  "date": "2026-08-07",
                  "type": "update",
                  "desc": "2026-08-14からPro/Max/Teamでauto mode（安全性の分類器を通して自動実行する動作）が既定に。分類器ぶんの追加トークン課金は撤廃。Shift+Tabで切り替えでき、管理者はmanaged settingsで統制できる。",
                  "url": "https://claude.com/blog/auto-mode-default-in-claude-code"
                },
              ]
            },
            {
              "id": "code-team",
              "name": "Team標準シートに同梱",
              "name_en": "Included in Team standard seats",
              "events": [
                {
                  "date": "2026-01-16",
                  "type": "expand",
                  "desc": "Teamプランの全標準シートにClaude Codeアクセスを同梱。",
                  "url": "https://www.anthropic.com/news/claude-code-on-team-and-enterprise"
                }
              ]
            },
            {
              "id": "code-analytics-api",
              "name": "Claude Code Analytics API",
              "name_en": "Claude Code Analytics API",
              "events": [
                {
                  "date": "2025-09-10",
                  "type": "launch",
                  "desc": "Claude Codeの日次集計メトリクス（生産性・ツール使用統計・コスト等）をプログラムから取得できるAPIを提供開始。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "desc": "長時間タスク向けAutoモードを拡大。Workflowsを研究プレビューで提供。MaxはOpus 4.8でFast modeが既定に。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
                  "date": "2026-08-14",
                  "type": "update",
                  "approx": true,
                  "desc": "サブエージェントの fork が既定に。会話の流れとプロンプトキャッシュをそのまま引き継いだまま分岐でき、対話中に立てた別働隊は既定で裏側で走るようになった。",
                  "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
                },
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
          "date": "2026-08-21",
          "type": "update",
          "approx": true,
          "desc": "プラグインの入手元やカタログの項目に headersHelper を置けるように。取得のたびにコマンドを走らせて、短命のトークンなどのHTTPヘッダを作れる。カタログ側のものは導入・更新のときだけ走り、走らせる前にコマンドが示されて可否を尋ねられる（Claude Code 2.1.238）。",
          "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
        },
                {
                  "date": "2026-08-14",
                  "type": "expand",
                  "approx": true,
                  "desc": "プラグインの入手元として GitLab に対応。github.com と同じように素のリポジトリURLから取り込めるようになり、入れ子のサブグループも扱える。あわせて GitLab のトークンが記録に残らないよう伏せられるようになった。",
                  "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
                },
                {
                  "date": "2025-10-01",
                  "type": "launch",
                  "approx": true,
                  "desc": "コマンド・サブエージェント・フック・MCPサーバをまとめて配布できるプラグインと、その導入元となるマーケットプレイスに対応。",
                  "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
                },
                {
                  "date": "2026-08-12",
                  "type": "update",
                  "approx": true,
                  "desc": "マーケットプレイスの入手元に「コマンド」を追加。IDEなどのローカルのコマンドがプラグインの置き場所を教える形で、毎回のセッションで解決し直されるため、再起動なしに反映される。",
                  "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
                }
              ]
            },
            {
              "id": "code-artifacts",
              "name": "アーティファクト（共有ページ）",
              "name_en": "Artifacts (shareable pages)",
              "status": "current",
              "events": [
                {
                  "date": "2026-06-18",
                  "type": "beta",
                  "desc": "Claude Codeのセッション出力を、組織内で共有できるライブなインタラクティブページ（PRウォークスルー／ダッシュボード／調査タイムライン等）として公開。更新は同じURLに即反映され、版履歴つき。Team/Enterpriseでベータ提供。",
                  "url": "https://claude.com/blog/artifacts-in-claude-code"
                }
              ]
            },
            {
              "id": "code-trusted-devices",
              "name": "リモート操作の信頼済みデバイス",
              "name_en": "Trusted Devices for Remote Control",
              "status": "current",
              "events": [
                {
                  "date": "2026-06-25",
                  "type": "update",
                  "desc": "Team/Enterpriseの管理者が、メンバーのローカルClaude Codeセッションをリモートで閲覧・操作する前にデバイス認証（信頼済みデバイス）を必須にできるように。リモート操作のセキュリティを強化。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
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
              "id": "cowork-webmobile",
              "name": "Web・モバイルへ展開",
              "name_en": "Expands to web and mobile",
              "events": [
                {
                  "date": "2026-07-07",
                  "type": "expand",
                  "desc": "デスクトップ専用からWeb・モバイルへ。あわせてMicrosoft 365コネクタが書き込みに対応し、メール下書きや予定作成、ファイルの作成・更新ができるように。",
                  "url": "https://claude.com/blog/cowork-web-mobile"
                },
              ]
            },
            {
              "id": "cowork-rp",
              "name": "研究プレビュー（提供拡大）",
              "name_en": "Research preview (rollout)",
              "events": [
                {
                  "date": "2026-01-12",
                  "type": "preview",
                  "desc": "Claude Codeのエージェント能力をデスクトップの知的作業に拡張。隔離VMでローカルファイル/MCPに直接アクセス（Max・macOS）。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
                },
                {
                  "date": "2026-01-16",
                  "type": "expand",
                  "desc": "Proプランにも研究プレビューを拡大（macOS）。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
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
                  "desc": "プラグインのマーケットプレイスとTeam/Enterprise向け管理機能を提供。Google Drive・Gmail・Docusign・FactSet等の連携も拡充。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
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
                  "desc": "定期/オンデマンドのタスク作成と、スキル/プラグイン/コネクタをまとめる「Customize」を追加。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
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
                  "desc": "デスクトップやモバイルから常駐スレッドでCoworkのタスクを管理（Pro/Max研究プレビュー）。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
                },
                {
                  "date": "2026-03-23",
                  "type": "preview",
                  "title": "コンピュータ操作の研究プレビュー",
                  "desc": "画面上のファイルを開く・クリック等をClaude自身が実行。離席中もDispatchがPC操作を代行。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
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
                  "desc": "デスクトップアプリでCoworkが一般提供に。利用分析やOpenTelemetryにも対応。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
                }
              ]
            },
            {
              "id": "cowork-cloud-enterprise",
              "name": "3大クラウドでフル機能（企業向け）",
              "name_en": "Full experience on AWS / Google Cloud / Microsoft Foundry",
              "events": [
                {
                  "date": "2026-06-22",
                  "type": "expand",
                  "desc": "Claude Desktopのフル機能（チャット＋Cowork＋Code）をAWS・Google Cloud・Microsoft Foundry経由で利用可能に。従来はCowork/Codeのみだった3クラウドにチャットが加わり完全版へ。推論は各社リージョン内に保持、SSO/MDM/オフラインインストーラ等で企業展開に対応。",
                  "url": "https://claude.com/blog/the-full-claude-desktop-experience-on-aws-google-cloud-and-microsoft-foundry"
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
                  "approx": true,
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
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
                  "desc": "既定をHaiku 4.5に高速化。画像アップロード代行や画面のスクショ/範囲指定に対応。",
                  "url": "https://claude.com/blog/claude-for-chrome"
                },
                {
                  "date": "2025-11-24",
                  "type": "expand",
                  "desc": "全Maxに拡大。定期タスク・計画承認実行・モデル選択を追加。",
                  "url": "https://claude.com/blog/claude-for-chrome"
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
                  "approx": true,
                  "url": "https://claude.com/blog/claude-design-stays-on-brand-for-daily-work"
                }
              ]
            }
          ]
        },
        {
          "id": "tag",
          "name": "Claude Tag（Slackのチームメンバー）",
          "name_en": "Claude Tag",
          "feats": [
            {
              "id": "tag-slack",
              "name": "Slackでチームの一員として働く",
              "name_en": "Joins Slack as a team member",
              "status": "beta",
              "events": [
                {
                  "date": "2026-06-23",
                  "type": "beta",
                  "desc": "ClaudeがSlackにチームメンバーとして参加し、@メンションでタスクを受けて、会話の文脈や接続ツールを使いながら非同期で作業する新しい連携。Enterprise/Team向けにベータ提供。",
                  "url": "https://www.anthropic.com/news/introducing-claude-tag"
                },
                {
                  "date": "2026-06-24",
                  "type": "launch",
                  "desc": "Claude Tagの土台となる「エージェント・アイデンティティ」を導入。個人の資格情報でなくワークスペース単位の独自アカウントと権限を持ち、管理者がチャンネル単位でアクセスを絞れる、共有環境向けのアクセスモデル。",
                  "url": "https://claude.com/blog/agent-identity-access-model"
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
                  "date": "2026-06-18",
                  "type": "beta",
                  "desc": "IdP(まずOkta)経由で管理者がMCPコネクタの認可を組織全体に一括プロビジョニングし、ユーザーは初回ログインで自動利用（チャット/Code/Cowork横断・Asana/Atlassian/Figma等に対応）。",
                  "url": "https://claude.com/blog/enterprise-managed-auth"
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
                  "desc": "どのコネクタ・どのツールを各ロールに許可するかを制御可能に。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
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
              "id": "mcp-spec-20260728",
              "name": "MCP 仕様 2026-07-28 への対応",
              "name_en": "MCP spec 2026-07-28 support",
              "events": [
                {
                  "date": "2026-07-28",
                  "type": "update",
                  "desc": "MCPがステートレスなrequest/response中心の設計へ。MCP AppsとTasksが拡張として標準化され、OAuth 2.0/OIDC準拠の認可でEntraやOktaと直接つなげる。Claude側は会話内でのインタラクティブUI描画やMCP tunnelsに対応。",
                  "url": "https://claude.com/blog/bringing-mcp-2026-07-28-to-claude"
                },
              ]
            },
            {
              "id": "mcp-interactive",
              "name": "インタラクティブ・コネクタ",
              "name_en": "Interactive connectors",
              "events": [
                {
                  "date": "2026-03-25",
                  "type": "launch",
                  "desc": "会話内で動くアプリ（ライブチャート/図/共有成果物）に接続できるインタラクティブ・コネクタ。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
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
                  "desc": "社内ネットワークのMCPサーバに接続できる研究プレビュー。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
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
              "id": "skill-security-scan",
              "name": "スキル・プラグインのセキュリティスキャン",
              "name_en": "Security scanning for skills & plugins",
              "events": [
                {
                  "date": "2026-08-06",
                  "type": "beta",
                  "desc": "サードパーティのスキルやプラグインをアップロード・変更したときに、有害なコードが含まれていないかを自動で検査できる（Enterprise向け）。",
                  "url": "https://support.claude.com/en/articles/12138966-release-notes"
                },
                {
                  "date": "2026-08-11",
                  "type": "update",
                  "approx": true,
                  "desc": "claude.aiから同期したスキルの扱いを厳しく。手元のコマンドやMCPのプロンプトを上書きしない、説明文を無害化する、シェル実行やファイル展開の記法を無効にする、といった制限を追加。",
                  "url": "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
                },
              ]
            },
            {
              "id": "skills-intro",
              "name": "スキルの導入",
              "name_en": "Skills introduction",
              "events": [
                {
                  "date": "2026-08-19",
                  "type": "ga",
                  "desc": "Agent Skills と Skills API（/v1/skills）がAPIで正式版に。container で読み込む請求も含めて、ためし版の合図（skills-2025-10-02）が要らなくなった。今までどおり合図を付けて呼んでも動く。",
                  "url": "https://platform.claude.com/docs/en/release-notes/overview"
                },
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
                  "desc": "Team/Enterpriseの組織横断管理、パートナー製スキルのディレクトリ、AIプラットフォーム横断のオープン標準(Agent Skills)を提供。",
                  "url": "https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
