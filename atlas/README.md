# Claude / Anthropic 機能アトラス — 運用ガイド

Anthropic（Claude）の公開機能と更新履歴を、**大分類 → 中分類 → 末端機能 → 更新タイムライン**として連動表示する静的サイトです。左のツリーで機能を選ぶと右のタイムラインがその範囲に絞り込まれ、タイムライン上の更新をクリックすると該当機能がツリー側で展開・ハイライトされます。

このドキュメントは、**内容を更新する人（および Claude Code セッション）向けの運用手順書**です。

---

## ファイル構成

| ファイル | 役割 | 編集するか |
|---|---|---|
| `index.html` | 表示アプリ（CSS＋描画ロジック）。データは持たない。 | 原則しない |
| `atlas-data.js` | **全データ＋語彙**。`window.ATLAS_DATA` に代入。内容更新はここだけ。 | **ここを編集** |
| `validate.js` | データ検証（Node・依存なし）。 | しない |
| `README.md` | 本書。 | 必要に応じ |

ビルド工程はありません。`index.html` がエントリポイントです。

---

## 動かし方・公開

- **ローカル確認**: `index.html` をブラウザで開くだけ。`fetch` ではなく `<script>` 読み込みでデータを取り込むため、`file://`（ダブルクリック）でもそのまま動きます。
- **静的サーバ（任意）**: `python3 -m http.server` を実行し `http://localhost:8000` を開く。
- **公開**: `index.html` と `atlas-data.js`（＋必要なら `README.md` / `validate.js`）を、任意の静的ホスティング（GitHub Pages / Netlify / Cloudflare Pages / S3 など）にそのまま置く。`index.html` が自動的に入口になります。

---

## データ構造（`atlas-data.js`）

```
window.ATLAS_DATA = { meta, kinds, statuses, domains }

domains[]            大分類（色を持つ最上位グループ）
  └ subs[]           中分類
      └ feats[]      末端機能（タイムラインに集約される単位）
          └ events[] 更新イベント（時系列の最小単位）
```

### 各フィールド

| 階層 | フィールド | 必須 | 内容 |
|---|---|---|---|
| meta | `lastUpdated` | ✓ | 最終更新日 `"YYYY-MM-DD"`。マストヘッドとフッターに表示。**更新のたびに必ず変える。** |
| meta | `rangeStart` / `rangeEnd` | ✓ | 収録範囲の表示ラベル（例 `"2025.09"`）。 |
| meta | `sources[]` | – | 出典リンク `{label, url}` の配列。フッターに表示。 |
| kinds | （キー）→ `{label, style}` | ✓ | 更新種別の語彙。`event.type` はこのキーのいずれか。`style` は見た目のバケツ（後述）。 |
| statuses | （キー）→ 文字列 | ✓ | 機能の状態語彙。`feature.status` はこのキーのいずれか。 |
| domain | `id` | ✓ | **全体で一意**な識別子。 |
| domain | `name` | ✓ | 表示名。 |
| domain | `accent` | ✓ | 大分類の色 `"#RRGGBB"`。**1大分類＝1色。** |
| domain | `subs[]` | ✓ | 中分類の配列。 |
| sub | `id` / `name` | ✓ | 識別子（全体で一意）／表示名。 |
| sub | `feats[]` | ✓ | 末端機能の配列。 |
| feature | `id` / `name` | ✓ | 識別子（全体で一意）／表示名。 |
| feature | `status` | – | 状態。`statuses` のキー（例 `"current"`）。省略すると無印。 |
| feature | `events[]` | ✓ | 更新イベントの配列（最低1件）。 |
| event | `date` | ✓ | `"YYYY-MM-DD"`。 |
| event | `type` | ✓ | 更新種別。`kinds` のキー。 |
| event | `desc` | ✓ | 説明（短く・自分の言葉で。原文の長文コピペは避ける）。 |
| event | `title` | – | 小見出し。同じ機能内で複数の更新を見分けたいときに付ける。 |
| event | `approx` | – | `true` で月単位の概算。日付は月初 `"01"` にし、表示は「YYYY.MM〜」になる。 |

### 重要な規約

- **`id` はファイル全体で一意**（大分類・中分類・末端機能を通して重複禁止）。英小文字・数字・ハイフン推奨。連動表示が id で機能を特定するため、重複すると誤動作します。
- **並び順は自由**。アプリが日付の新しい順に自動整列し、月ごとに区切って表示します。
- **末端機能は `events` を最低1件**持たせる（0件だとタイムラインに出ません）。
- **色は大分類ごとに1色**。新しい大分類を足すときは、既存の5色と十分に区別できる、彩度を少し抑えたトーンを選ぶと全体に馴染みます。
- 更新したら **`meta.lastUpdated` を変更**し、**`node validate.js`** を通す。

### 更新種別（`kinds`）の意味

| key | ラベル | 使うとき |
|---|---|---|
| `launch` | 新登場 | 新しいモデル・製品・機能の初登場 |
| `ga` | 正式提供 | ベータ/プレビューから一般提供（GA）へ |
| `beta` | ベータ | 公開ベータ提供開始 |
| `preview` | プレビュー | 研究プレビュー／限定プレビュー |
| `update` | 改善 | 既存機能の改善・能力追加 |
| `expand` | 範囲拡大 | 対象プラン・地域・プラットフォームの拡大 |
| `deprecate` | 非推奨 | 非推奨告知（終了予定あり） |
| `retire` | 提供終了 | 実際に利用不可へ |
| `suspend` | 一時停止 | アクセスの一時停止 |

`style` のバケツは `fill`（塗り）/ `outline`（枠線）/ `soft`（淡い塗り）/ `warn`（警告枠）/ `warnfill`（警告塗り）。新しい種別を足すときは、このいずれかに割り当てます（未知の style はグレー表示にフォールバックします）。

---

## 更新の手順（レシピ）

いずれの場合も最後に **`node validate.js` → ブラウザで `index.html` を開いて目視確認** を行ってください。

### A. 既存機能に更新を1件足す
対象の `feature.events` に1件追加し、`meta.lastUpdated` を更新する。

```js
{ date: "2026-07-01", type: "update", title: "新オプション", desc: "○○に対応。" }
```

### B. 新しい末端機能を足す
対象の `sub.feats` に1件追加（`id` は全体で一意、`events` を最低1件）。

```js
{ id: "new-feature", name: "新機能名", events: [
  { date: "2026-07-01", type: "launch", desc: "△△を提供開始。" }
]}
```

### C. 新しい中分類／大分類を足す
中分類は `domain.subs` に、大分類は `domains` に追加する。大分類には新しい `accent`（#RRGGBB）も付ける。

### D. 最新リリースをまとめて反映（Claude Code 向けの定型タスク）

> このリポジトリを受け取った Claude Code セッションは、次の手順で「最新の更新」を反映できます。

1. **公式リリースノートを取得**（出典は `meta.sources` にも記載）:
   - Claude アプリ: `https://support.claude.com/en/articles/12138966-release-notes`
   - Claude Platform（API/SDK/Console）: `https://platform.claude.com/docs/en/release-notes/overview`
   - Claude Code の細かな更新（必要時）: `https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md`
   - 大型発表: `https://www.anthropic.com/news`
2. **差分を特定**: `atlas-data.js` の現在の `meta.lastUpdated` 以降の日付を対象に、まだ収録されていない項目を洗い出す（既存イベントの最新日付と突き合わせる）。
3. **適切な位置に追加**: 大分類 → 中分類 → 末端機能をたどり、`events` に追記する。該当機能・中分類が無ければ新設（レシピ B / C）。`type` と `status` は語彙（`kinds` / `statuses`）に従う。**説明は要約して自分の言葉で書く**（原文の段落コピペはしない）。
4. **メタ更新**: `meta.lastUpdated` を最新の取得日に。必要なら `meta.rangeEnd` も更新。
5. **検証**: `node validate.js` を実行し、エラー0件を確認。
6. **目視確認**: ブラウザで `index.html` を開き、件数・タイムライン・ツリー連動が崩れていないか確認。

### 日付が未確定のとき
公式に正確な日付が無いもの（集計サイト由来など）は、**月初日 + `approx: true`** にする。例: `{ date: "2026-06-01", type: "beta", approx: true, desc: "…" }`。表示は「2026.06〜」になり概算であることが伝わります。確定したら `approx` を外して正確な日付に直す。

---

## 検証（`validate.js`）

```bash
node validate.js          # カレントの atlas-data.js
node validate.js path.js  # 任意のパス
```

`id` 重複・日付形式・未知の `type`・`accent` 形式・`status` 語彙・`events` 0件などをチェックし、件数サマリを表示します。エラーが1件でもあれば終了コード `1`（CI に組み込み可能）。`atlas-data.js` を `window` を用意して評価する方式なので、構文エラーもここで検出できます。

---

## デザイン上の約束（保つべき点）

- **ツリー（左）↔ タイムライン（右）の双方向連動が中核**。描画ロジック（`index.html`）は原則いじらない。仕様変更が必要なときも、この連動と「1大分類＝1色」「更新種別の語彙」は壊さない。
- レスポンシブ（モバイルで縦積み）、キーボードフォーカス可視、`prefers-reduced-motion` 対応済み。

---

## トラブルシュート

- **画面が「データを読み込めませんでした」になる**: `atlas-data.js` が `index.html` と同じ階層にあるか／`window.ATLAS_DATA = {...}` の形になっているか／構文エラーが無いか（`node validate.js` で確認）。
- **文字化け**: ファイルを UTF-8 で保存する。
- **追加した更新が出ない**: その機能の `events` が空でないか、`type` が `kinds` に存在するか、フィルタ（種別チップ）で消していないかを確認。
