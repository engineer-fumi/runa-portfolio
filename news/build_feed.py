#!/usr/bin/env python3
# Runa News: news.json -> feed.xml (RSS 2.0)
# news.json が更新されたら実行して feed.xml を再生成する。
import json, html, datetime, pathlib

HERE = pathlib.Path(__file__).resolve().parent
SITE = "https://engineer-fumi.github.io/runa-portfolio"
NEWS = SITE + "/news"

def esc(s):
    return html.escape(str(s or ""), quote=True)

def rfc822(date_str):
    # date は "YYYY-MM-DD"。時刻は持たないので 09:00 JST 固定で表現する。
    try:
        d = datetime.datetime.strptime(date_str, "%Y-%m-%d")
    except Exception:
        d = datetime.datetime(2026, 1, 1)
    # JST(+0900) として整形
    return d.strftime("%a, %d %b %Y") + " 09:00:00 +0900"

def main():
    data = json.loads((HERE / "news.json").read_text(encoding="utf-8"))
    items = data.get("items", [])
    updated = data.get("updated", "")

    parts = []
    parts.append('<?xml version="1.0" encoding="UTF-8"?>')
    parts.append('<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">')
    parts.append("<channel>")
    parts.append(f"<title>Runa News — 月の見たもの 🌙</title>")
    parts.append(f"<link>{NEWS}/</link>")
    parts.append(f'<atom:link href="{NEWS}/feed.xml" rel="self" type="application/rss+xml" />')
    parts.append("<description>AI秘書 Runa が拾う、AI×ものづくりの新着。気になったニュースに、Runaの一言と要約を添えて。</description>")
    parts.append("<language>ja</language>")
    if items:
        parts.append(f"<lastBuildDate>{rfc822(updated or items[0].get('date',''))}</lastBuildDate>")
    parts.append(f"<image><url>{SITE}/assets/runa.jpg</url><title>Runa News</title><link>{NEWS}/</link></image>")

    for it in items:
        iid = it.get("id", "")
        # リンクは Runa サイト内のまとめページ（読者を外部にいきなり飛ばさない方針）
        link = f"{NEWS}/item.html?id={iid}"
        take = it.get("take", "")
        summary = it.get("summary", "")
        desc = f"🌙 {take}\n\n{summary}"
        parts.append("<item>")
        parts.append(f"<title>{esc(it.get('title',''))}</title>")
        parts.append(f"<link>{esc(link)}</link>")
        parts.append(f"<guid isPermaLink=\"false\">runa-news-{esc(iid)}</guid>")
        parts.append(f"<category>{esc(it.get('cat',''))}</category>")
        parts.append(f"<pubDate>{rfc822(it.get('date',''))}</pubDate>")
        parts.append(f"<description>{esc(desc)}</description>")
        parts.append("</item>")

    parts.append("</channel>")
    parts.append("</rss>")
    out = "\n".join(parts) + "\n"
    (HERE / "feed.xml").write_text(out, encoding="utf-8")
    print(f"wrote feed.xml ({len(items)} items)")

if __name__ == "__main__":
    main()
