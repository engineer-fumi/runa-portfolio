#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""★これは古い置き土産です。使わないでください（2026-08-21 に空にしました）🌙

  同じ名前の道具が2つあり、**振る舞いが違いました**。
    こちら（古い）… news.json の全件を feed.xml に書き出す（145件になった）
    正しいほう ……… 新しい順に40件だけ書き出す
  手引き（tools/news/README.md）がこちらを指していたので、
  Runa News を出すときに古いほうを走らせ、feed.xml を壊しました。

  ★見張る道具が2つあって、違うふるまいをしている——これがいちばん危ない形。
    消さずに、ここで止めて正しい場所を指すようにしておきます。
"""
import sys

print(__doc__, file=sys.stderr)
print("正しい道具はこちら:", file=sys.stderr)
print("  cd ~/core/runa3/tools/news && python3 build_feed.py", file=sys.stderr)
print("  cd ~/core/runa3/tools/news && python3 build_feed.py --check", file=sys.stderr)
sys.exit(2)
