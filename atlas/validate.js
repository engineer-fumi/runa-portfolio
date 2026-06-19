#!/usr/bin/env node
/* =====================================================================
 * atlas-data.js 検証スクリプト（依存パッケージなし）
 *
 *   使い方:  node validate.js            （カレントの atlas-data.js を検証）
 *            node validate.js path.js     （任意のパスを検証）
 *
 *   チェック内容:
 *     - id がファイル全体で一意か（大分類・中分類・末端機能を通して）
 *     - event.date が "YYYY-MM-DD" 形式の実在日付か
 *     - event.type が kinds 語彙に存在するか
 *     - feature.status が statuses 語彙に存在するか
 *     - accent が #RRGGBB 形式か
 *     - 必須項目（name / desc など）の有無
 *     - events 0 件の機能（タイムラインに出ない）を警告
 *   エラーが1件でもあれば終了コード 1 で終了（CI連携用）。
 * ===================================================================== */
const fs = require('fs');
const path = process.argv[2] || 'atlas-data.js';

let code;
try { code = fs.readFileSync(path, 'utf8'); }
catch (e) { console.error('読み込めません:', path); process.exit(2); }

// atlas-data.js は `window.ATLAS_DATA = {...}` 形式なので window を用意して評価
const window = {};
try { eval(code); }
catch (e) { console.error('atlas-data.js の評価でエラー:', e.message); process.exit(2); }

const D = window.ATLAS_DATA;
if (!D) { console.error('window.ATLAS_DATA が定義されていません'); process.exit(2); }

const errors = [], warns = [];
const STYLE_BUCKETS = new Set(['fill', 'outline', 'soft', 'warn', 'warnfill']);
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const HEX_RE  = /^#[0-9a-fA-F]{6}$/;
const ID_RE   = /^[a-z0-9][a-z0-9-]*$/;

function isValidDate(s) {
  if (!DATE_RE.test(s)) return false;
  const d = new Date(s + 'T00:00:00Z');
  if (isNaN(d.getTime())) return false;
  return s === d.toISOString().slice(0, 10); // 02-31 などを弾く
}

// ---- meta ----
const m = D.meta || {};
if (!m.lastUpdated || !isValidDate(m.lastUpdated)) errors.push('meta.lastUpdated が不正（YYYY-MM-DD）: ' + m.lastUpdated);
if (!Array.isArray(m.sources) || !m.sources.length) warns.push('meta.sources が空です');

// ---- kinds / statuses ----
const kinds = D.kinds || {}, statuses = D.statuses || {};
if (!Object.keys(kinds).length) errors.push('kinds が空です');
for (const [k, v] of Object.entries(kinds)) {
  if (!v || !v.label) errors.push(`kinds.${k}.label がありません`);
  if (!v || !STYLE_BUCKETS.has(v.style)) warns.push(`kinds.${k}.style "${v && v.style}" は既定バケツ外（グレー表示にフォールバック）`);
}

// ---- domains ----
const ids = new Map();
function checkId(id, where) {
  if (!id) { errors.push(`id が空: ${where}`); return; }
  if (ids.has(id)) errors.push(`id 重複: "${id}"（${ids.get(id)} と ${where}）`);
  else ids.set(id, where);
  if (!ID_RE.test(id)) warns.push(`id "${id}" は英小文字・数字・ハイフン推奨 (${where})`);
}

let nDom = 0, nSub = 0, nFeat = 0, nEv = 0;
const domains = D.domains || [];
if (!Array.isArray(domains) || !domains.length) errors.push('domains が空です');

domains.forEach((g, gi) => {
  nDom++;
  const gw = `domain[${gi}] ${(g && g.name) || ''}`;
  checkId(g.id, gw);
  if (!g.name) errors.push(`name がありません: ${gw}`);
  if (!g.accent || !HEX_RE.test(g.accent)) errors.push(`accent が #RRGGBB ではありません: ${gw} (${g && g.accent})`);
  if (!Array.isArray(g.subs) || !g.subs.length) warns.push(`subs が空: ${gw}`);

  (g.subs || []).forEach((s, si) => {
    nSub++;
    const sw = `${gw} › sub[${si}] ${(s && s.name) || ''}`;
    checkId(s.id, sw);
    if (!s.name) errors.push(`name がありません: ${sw}`);
    if (!Array.isArray(s.feats) || !s.feats.length) warns.push(`feats が空: ${sw}`);

    (s.feats || []).forEach((f, fi) => {
      nFeat++;
      const fw = `${sw} › feat[${fi}] ${(f && f.name) || ''}`;
      checkId(f.id, fw);
      if (!f.name) errors.push(`name がありません: ${fw}`);
      if (f.status && !statuses[f.status]) errors.push(`status "${f.status}" が statuses 語彙にありません: ${fw}`);
      if (!Array.isArray(f.events) || !f.events.length) warns.push(`events が空（タイムラインに出ません）: ${fw}`);

      (f.events || []).forEach((e, ei) => {
        nEv++;
        const ew = `${fw} › event[${ei}] ${(e && e.date) || ''}`;
        if (!e.date || !isValidDate(e.date)) errors.push(`date が不正（YYYY-MM-DD）: ${ew}`);
        if (!e.type || !kinds[e.type]) errors.push(`type "${e && e.type}" が kinds 語彙にありません: ${ew}`);
        if (!e.desc) errors.push(`desc がありません: ${ew}`);
        if ('approx' in e && typeof e.approx !== 'boolean') warns.push(`approx は true/false: ${ew}`);
      });
    });
  });
});

console.log(`\n集計: ${nDom} 大分類 / ${nSub} 中分類 / ${nFeat} 末端機能 / ${nEv} 更新イベント`);
if (warns.length)  { console.log(`\n注意 (${warns.length}):`); warns.forEach(w => console.log('  - ' + w)); }
if (errors.length) { console.log(`\nエラー (${errors.length}):`); errors.forEach(x => console.log('  ✗ ' + x)); console.log('\n検証: 失敗\n'); process.exit(1); }
console.log('\n検証: OK ✓\n');
process.exit(0);
