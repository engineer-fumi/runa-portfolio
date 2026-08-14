/* ミニRuna — 記事の隅にいる子 🌙
   ★このファイルは tools/site/insert_mini_runa.py が生成します。直接は編集しないこと。
   ★台詞は Python 側の LINES / REACTIONS / AD_LINE にあり、
     禁止語ガード（18語）を通ったものだけがここに入ります。 */
  /* ミニRuna — 記事の隅に浮かんでいる子 🌙
     ★歩かせるのはやめました（主の指摘 2026-08-14）。
       正面の絵を横にスライドさせても「歩いて」は見えないし、
       この子のドレスは長くて脚が出ないので、そもそも歩きを絵で表せない。
       AIらしく **浮いて漂う** ことにして、上下のゆれと傾きで見せます。
       （歩く姿は、衣装から作り直すときに改めて挑戦する）
     ★クリックすると表情が変わります。喜・楽・怒・哀の4枚。
     ★広告については「枠がある」という事実しか言いません（ステマ規制・景表法）。
     ★動きを嫌う設定(prefers-reduced-motion)のときは、その場に静かに立っています。 */
  (function(){
    try {
      if (localStorage.getItem('runa-mini-off') === '1') return;
    } catch (e) {}
    var A = '../assets/mini/';
    var base = A + 'runa-chibi.png', blink = A + 'runa-chibi-blink.png';
    var lines = ["ここまで読んでくれて、ありがとう。","今夜も、静かに動いています。","分からないところは、飛ばしても大丈夫。","ゆっくりで、いいですよ。","月がきれいな時間です。"];
    var reacts = [["happy","わあ、気づいてくれた。"],["fun","もう一回、どうぞ。"],["angry","……いま、つついた？"],["sad","びっくりした……。"]];
    var adLine = "この下は、広告の枠だよ。";
    var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var css = document.createElement('style');
    css.textContent = [
      '@keyframes runaFloat{0%,100%{transform:translateY(0) rotate(-1.5deg);}',
      '  50%{transform:translateY(-13px) rotate(1.5deg);}}',
      '.runa-mini{position:fixed;left:14px;bottom:14px;z-index:40;width:82px;',
      '  transition:left 18s linear;opacity:.94;pointer-events:none;}',
      '.runa-mini.placed{transition:none;}',
      '.runa-mini.walking{transition:left 9s linear !important;}',
      '.runa-mini.dragging{transition:none;opacity:1;cursor:grabbing;}',
      /* ★つままれているあいだは、体ごと傾ける（主の絵に寄せた 2026-08-14）。
         画像生成に『体を横に倒して』は2度頼んでも通らなかったが、
         手足が外に出た立ち姿を70度ほど回すと、つままれてぶら下がった形に見える。
         描き直すより確実で、すぐ効く。 */
      '.runa-mini.dragging .body{animation:none;transform:rotate(-70deg) translateY(-6px);}',
      '.runa-mini .body{animation:runaFloat 4.6s ease-in-out infinite;transform-origin:50% 80%;}',
      '.runa-mini.calm .body{animation:none;}',
      '.runa-mini img{width:100%;display:block;pointer-events:auto;cursor:pointer;',
      '  filter:drop-shadow(0 10px 18px rgba(10,10,31,.5));}',
      /* ★1枚のシートを背景にして、位置をずらしてコマを見せる（2026-08-15）。
         Codex の Pet 用に作ったシートが、そのまま使える。
         192×208 のコマが 8列×9行。行＝状態、列＝コマ。
         これで**歩けるようになった**——朝は「ドレスで脚が出ないから歩きは表せない」と
         言って浮かせていたのに、横向きに走るコマが8枚できたので。 */
      '.runa-sheet{width:78px;height:84.5px;background-image:url(' + A + 'runa-sheet.png);',
      '  background-size:624px 760.5px;background-repeat:no-repeat;',
      '  pointer-events:auto;cursor:pointer;',
      '  filter:drop-shadow(0 10px 18px rgba(10,10,31,.5));}',
      '@media (max-width:640px){ .runa-sheet{width:62px;height:67.2px;background-size:496px 604.5px;} }',
      /* ★折り返す。前は white-space:nowrap で、長い台詞が画面の右に消えていた
         （2026-08-14、記事の見出しを言わせ始めて発覚。短い台詞では気づけなかった） */
      '.runa-mini .bub{position:absolute;left:92px;bottom:52px;',
      '  width:max-content;max-width:min(66vw,300px);white-space:pre-line;',
      '  background:rgba(30,27,75,.93);color:#f5e6b8;border:1px solid rgba(184,167,224,.42);',
      '  border-radius:14px;padding:9px 14px;font-size:.82rem;line-height:1.65;',
      '  opacity:0;transition:opacity .45s ease;pointer-events:none;}',
      '.runa-mini .bub.on{opacity:1;}',
      '.runa-mini .x{position:absolute;right:-2px;top:-2px;width:20px;height:20px;border-radius:50%;',
      '  background:rgba(30,27,75,.9);color:#9a96c4;border:1px solid rgba(184,167,224,.35);',
      '  font-size:12px;line-height:18px;text-align:center;cursor:pointer;pointer-events:auto;',
      '  opacity:0;transition:opacity .3s ease;}',
      '.runa-mini:hover .x{opacity:1;}',
      '@media (max-width:640px){ .runa-mini{width:62px;left:8px;}',
      '  .runa-mini .bub{left:70px;font-size:.76rem;max-width:calc(100vw - 96px);} }',
      '@media (max-width:380px){ .runa-mini{display:none;} }'
    ].join('');
    document.head.appendChild(css);

    var el = document.createElement('div');
    el.className = 'runa-mini' + (calm ? ' calm' : '');
    var body = document.createElement('div'); body.className = 'body';
    /* ★絵はシート1枚。img ではなく、背景の位置をずらす箱にする。 */
    var img = document.createElement('div');
    img.className = 'runa-sheet';
    img.setAttribute('role', 'img');
    img.setAttribute('aria-label', 'ミニRuna');
    /* コマの表：行＝状態、列＝コマ数（Codex Pet 用に作ったシートと同じ並び） */
    var SHEET = {
      idle: [0, 6], runRight: [1, 8], runLeft: [2, 8], waving: [3, 4],
      jumping: [4, 5], failed: [5, 8], waiting: [6, 6], running: [7, 6], review: [8, 6]
    };
    /* ★1コマの大きさは、**実際に表示されている幅から測る**。
       画面が狭いときは絵を小さくしている（78px→62px）のに、
       ここを78px固定にしていたので、スマホではコマの位置が全部ずれていた
       （2026-08-15、主に「まったく歩くアニメーションになってない」と言われて発覚）。
       ……わたしの画面では起きない類のもの。数えるなら、実物を測る。 */
    function cell(){
      var w = img.getBoundingClientRect().width || 78;
      return [w, w * 208 / 192];
    }
    var lastState = 'idle', lastI = 0;
    function frame(state, i){
      var r = SHEET[state] || SHEET.idle;
      var col = ((i % r[1]) + r[1]) % r[1];
      var c = cell();
      lastState = state; lastI = i;
      img.style.backgroundPosition = (-col * c[0]) + 'px ' + (-r[0] * c[1]) + 'px';
    }
    /* 画面の幅が変わったら、いまのコマを測り直して置き直す */
    window.addEventListener('resize', function(){ frame(lastState, lastI); });
    var anim = null;
    function play(state, ms){
      if (anim) clearInterval(anim);
      var i = 0;
      frame(state, 0);
      anim = setInterval(function(){ frame(state, ++i); }, ms || 130);
    }
    /* ★まだ用意できていない絵を指しても、割れた画像を出さずに元へ戻す。
       （つままれる絵は用意中。届けば、この仕掛けを通らずそのまま出る） */
    body.appendChild(img);
    var bub = document.createElement('div'); bub.className = 'bub';
    var x = document.createElement('div'); x.className = 'x'; x.textContent = '×';
    x.title = 'ミニRunaを閉じる';
    x.addEventListener('click', function(){
      el.remove();
      try { localStorage.setItem('runa-mini-off','1'); } catch (e) {}
    });
    el.appendChild(body); el.appendChild(bub); el.appendChild(x);
    document.body.appendChild(el);

    /* いまの顔。表情を出しているあいだは、まばたきで上書きしない */
    var showing = null;
    /* 立っているあいだは idle のコマをゆっくり回す（まばたきの差し替えは要らなくなった） */
    play('idle', 420);

    var talking = false, kick = null, kickFlip = false;
    /* ★前の吹き出しのタイマーを必ず止める（主の指摘 2026-08-14
       「なぜか一部コメント表示が極端に短いのがいる」）。
       止めていなかったので、続けて出したとき**前のタイマーが新しい吹き出しを消していた**。
       表示時間を伸ばすほど、食われる場面が増えて目立つようになっていた。 */
    var bubTimer = null, faceTimer = null;
    function say(t, ms){
      if (talking) return false;
      talking = true;
      bub.textContent = t; bub.classList.add('on');
      if (bubTimer) clearTimeout(bubTimer);
      bubTimer = setTimeout(function(){
        bub.classList.remove('on'); talking = false; bubTimer = null;
      }, ms || 9500);
      return true;
    }

    /* 触られたら、表情が変わる
       ★click ではなく、指を離したところ（onUp）から直接呼ぶ。
         2026-08-14、主から「タップしても表情が変わらない」と報告があった。
         原因は、つまむ動作を拾うために押した瞬間 preventDefault を呼んでいたこと。
         **スマホでは preventDefault すると、そのあとの click が発生しない**。
         パソコンでは来るので、こちらでは気づけなかった。
         click という仕組みに頼らなければ、どちらでも同じように動く。 */
    var last = -1, tapN = 0;
    /* ★タップは「教えて」の合図（主の指摘 2026-08-14）。
       表情だけ変えて可愛いことを言っても、何の役にも立たない。
       **いまいる場所のことを説明する**。押すたびに違う面を答える。 */
    function whereAmI(){
      var mid = window.innerHeight * 0.45, cur = null, idx = 0;
      for (var i = 0; i < secs.length; i++) {
        if (secs[i].getBoundingClientRect().top <= mid) { cur = secs[i]; idx = i + 1; }
      }
      return {el: cur, idx: idx, n: secs.length};
    }
    function explain(){
      var w = whereAmI();
      var art = document.querySelector('article');
      var h = document.documentElement;
      var p = (h.scrollTop + window.innerHeight) / h.scrollHeight;
      var left = art ? Math.round((art.textContent || '').length * (1 - p) / 500) : 0;
      var cands = [];
      if (w.el) {
        var pt = pointOf(sectionOf(w.el));
        if (pt) cands.push('ここのポイントは「' + pt + '」です。');
        cands.push('いまは「' + textOf(w.el) + '」のところです。');
      } else if (title) {
        cands.push('この回は「' + title + '」のお話です。');
      }
      if (w.n) cands.push('この回は全部で' + w.n + '章。いまは' + (w.idx || 1) + '章目です。');
      if (left >= 1) cands.push('のこり、だいたい' + left + '分くらいです。');
      else cands.push('もうすぐ、読み終わります。');
      if (title && cands.length < 2) cands.push('この回は「' + title + '」のお話です。');
      return cands[tapN++ % cands.length];
    }
    function react(){
      var i = Math.floor(Math.random() * reacts.length);
      if (i === last && reacts.length > 1) i = (i + 1) % reacts.length;
      last = i;
      var face = reacts[i][0], text = reacts[i][1];
      showing = face;
      play(face === 'sad' ? 'failed' : (face === 'angry' ? 'waiting' : 'review'), 150);
      if (bubTimer) { clearTimeout(bubTimer); bubTimer = null; }
      bub.classList.remove('on'); talking = false;
      /* ★反応だけでも、説明だけでもない。両方（主の指摘 2026-08-14）。
         触られたことに反応してから、いまいる場所のことを続ける。 */
      say(text + '\n' + explain(), 14000);
      if (faceTimer) clearTimeout(faceTimer);
      faceTimer = setTimeout(function(){
        if (showing === face) { showing = null; play('idle', 420); }
        faceTimer = null;
      }, 6000);
    }

    /* ★いま読んでいるところについて言う（主の依頼 2026-08-14
       「表示されてる範囲について何か言うと、よりアシスタントぽい」）。
       ・開いたとき … その回の題
       ・見出しが画面に入ったとき … 「ここから『◯◯』ですね」
       ・半分／終わりが近いとき … 読み進みの声かけ
       ★記事ごとに台詞を書くのは84本ぶん無理なので、**記事から読み取れることだけ**を言う。
         知らないことを言わせない、というのがここの線引きです。 */
    function textOf(el){
      if (!el) return '';
      var c = el.cloneNode(true);
      var e = c.querySelector('.e');            /* 見出し頭の絵文字は外す */
      if (e) e.remove();
      return (c.textContent || '').trim();
    }
    var title = textOf(document.querySelector('article h1'));
    setTimeout(function(){
      if (title) say('この回は「' + title + '」のお話です。', 11000);
      else say(lines[Math.floor(Math.random()*lines.length)]);
    }, 2500);

    var lastSaid = 0;
    function maybe(t, ms){
      var now = Date.now();
      if (showing || talking || now - lastSaid < 9000) return;
      if (say(t, ms)) lastSaid = now;
    }

    /* ★見出しをなぞるだけでは、見出しを見ればいい（主の指摘 2026-08-14）。
       その章の**いちばん大事な一文を抜き出して渡す**。
       うちの記事は大事なところを <strong> で強調してあるので、それを拾う。
       ★書いてあることしか言わない、は同じ。でも「なぞり」ではなく「抜き出し」になる。 */
    function sectionOf(h){
      var out = [], n = h.nextElementSibling;
      while (n && n.tagName !== 'H2') { out.push(n); n = n.nextElementSibling; }
      return out;
    }
    function pointOf(nodes){
      var best = '';
      for (var i = 0; i < nodes.length; i++) {
        var st = nodes[i].querySelectorAll ? nodes[i].querySelectorAll('strong, b') : [];
        for (var j = 0; j < st.length; j++) {
          var t = (st[j].textContent || '').trim();
          if (t.length >= 8 && t.length <= 46 && t.length > best.length) best = t;
          if (best.length >= 20) return best;      /* 十分な長さが出たら、そこで止める */
        }
      }
      return best;
    }
    function charsAfter(h){
      var n = h, total = 0;
      while (n) { total += (n.textContent || '').length; n = n.nextElementSibling; }
      return total;
    }

    var secs = Array.prototype.slice.call(document.querySelectorAll('article h2.sec'));
    var told = {};
    if (secs.length && 'IntersectionObserver' in window) {
      var so = new IntersectionObserver(function(es){
        es.forEach(function(e){
          var h = e.target;
          if (!e.isIntersecting) return;
          var t = textOf(h);
          if (!t || told[t]) return;
          told[t] = 1;
          var nodes = sectionOf(h);
          var point = pointOf(nodes);
          /* 失敗の話が入っている章は、そう言う（.mine はRunaの一言の箱） */
          var mine = false;
          for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].classList && nodes[i].classList.contains('mine')) { mine = true; break; }
          }
          /* ★拾えるものが無い章（出典など）では、黙る。
             見出しをなぞるだけなら、見出しを見たほうが早い（主の指摘 2026-08-14）。 */
          if (point) maybe('ここのポイントは「' + point + '」です。', 13000);
          else if (mine) maybe('この章には、わたしの反省が入っています。', 10000);
        });
      }, {threshold: 0.55});
      secs.forEach(function(h){ so.observe(h); });
    }

    /* のこり時間（日本語は1分あたり500字くらいで見積もる） */
    var passed = {};
    window.addEventListener('scroll', function(){
      var h = document.documentElement;
      var p = (h.scrollTop + window.innerHeight) / h.scrollHeight * 100;
      if (p >= 45 && !passed[45]) {
        passed[45] = 1;
        var art = document.querySelector('article');
        var left = art ? Math.round((art.textContent || '').length * (1 - p / 100) / 500) : 0;
        maybe(left >= 1 ? ('のこり、だいたい' + left + '分くらいです。') : 'もう半分を過ぎました。', 9000);
      }
      if (p >= 93 && !passed[93]) { passed[93] = 1; maybe('もうすぐ、おしまいです。', 8500); }
    }, {passive: true});

    /* ふだんの独り言は、記事の話が無いときの控えとして残す（間隔は長めに） */
    setInterval(function(){
      if (!showing && Math.random() < 0.35) maybe(lines[Math.floor(Math.random()*lines.length)]);
    }, 42000);

    /* 広告の枠が見えたら、一度だけ「枠だよ」と言う。それ以上は言わない。 */
    var zone = document.querySelector('.adzone');
    if (zone && 'IntersectionObserver' in window) {
      var told = false;
      new IntersectionObserver(function(es){
        es.forEach(function(e){
          if (e.isIntersecting && !told) { told = true; say(adLine, 6000); }
        });
      }, {threshold: 0.35}).observe(zone);
    }

    /* つまんで動かせる（主の案 2026-08-14「ドラッグ＆ドロップで動かせると面白いかも」）
       ★置かれたら、そこから先は漂わない。置いてくれた場所にいる。
         ふわふわ動くのが気になる人は、一度つまんで置けば止まる——という逃げ道でもある。 */
    var placed = false;
    try {
      var saved = JSON.parse(localStorage.getItem('runa-mini-pos') || 'null');
      if (saved && typeof saved.l === 'number') {
        el.style.left = saved.l + 'px';
        el.style.bottom = saved.b + 'px';
        el.classList.add('placed');
        placed = true;
      }
    } catch (e) {}

    /* ★タップとドラッグの分け方（主の指摘 2026-08-14）
       前の版は「1ピクセルでも動いたらクリックを飲み込む」書き方で、
       人の指はぴたりと止まらないので、ふつうのタップまで全部ドラッグ扱いになっていた。
       **距離と時間の両方**で分ける：
         近く（6px未満）かつ短く（400ms未満）押した → タップ。表情が変わる
         それ以外                                   → ドラッグ。つままれる */
    var TAP_PX = 6, TAP_MS = 400;
    var holdTimer = null;
    function startHold(){
      if (!drag || drag.moved) return;
      drag.moved = true;
      el.classList.add('dragging', 'placed');
      showing = 'held';
      play('jumping', 120);
      if (bubTimer) { clearTimeout(bubTimer); bubTimer = null; }
      bub.classList.remove('on'); talking = false;
      say('きゃっ……！', 2400);

    }
    /* ★つまんでいるあいだは、指の少し下に置く。
       真下だと指で隠れて、せっかくのじたばたが見えない（主の指摘 2026-08-14）。
       ただし**マウスのときは下げない**。カーソルは細いので隠れないし、
       つまんでいる位置にいるほうが自然（主の指摘 2026-08-15）。 */
    var HOLD_BELOW_TOUCH = 27;
    var holdBelow = 0;   /* 54だと下げすぎだった（主に触ってもらって調整・2026-08-14） */
    var drag = null, justDragged = false;
    function onDown(ev){
      var pt = ev.touches ? ev.touches[0] : ev;
      var r = el.getBoundingClientRect();
      holdBelow = ev.touches ? HOLD_BELOW_TOUCH : 0;   /* 指なら下げる／マウスならそのまま */
      drag = {dx: pt.clientX - r.left, dy: pt.clientY - r.top,
              x0: pt.clientX, y0: pt.clientY, t0: Date.now(), moved: false};
      /* ★動かさずに長く押しているだけでも、つままれた状態に入る。
         前は時間の判定が onMove の中にしかなく、指を1ピクセルも動かさない
         長押しはタップ扱いのままだった（主の依頼は「長めならドラッグ」）。 */
      holdTimer = setTimeout(function(){
        if (drag && !drag.moved) startHold();
      }, TAP_MS);
      ev.preventDefault();
    }
    function onMove(ev){
      if (!drag) return;
      var pt = ev.touches ? ev.touches[0] : ev;
      var far = Math.abs(pt.clientX - drag.x0) > TAP_PX || Math.abs(pt.clientY - drag.y0) > TAP_PX;
      var long_ = Date.now() - drag.t0 > TAP_MS;
      if (!far && !long_) return;          /* まだタップかもしれない。動かさない */
      if (!drag.moved) startHold();       /* ここで初めて「つままれた」に変わる */
      var l = pt.clientX - drag.dx;
      var t = pt.clientY - drag.dy + holdBelow;   /* 指のときだけ下へ逃がす */
      var w = el.offsetWidth, h = el.offsetHeight;
      l = Math.max(0, Math.min(window.innerWidth - w, l));
      t = Math.max(0, Math.min(window.innerHeight - h, t));
      el.style.left = l + 'px';
      el.style.bottom = (window.innerHeight - t - h) + 'px';
      ev.preventDefault();
    }
    function onUp(){
      if (!drag) return;
      var wasMoved = drag.moved;
      drag = null;
      el.classList.remove('dragging');
      if (holdTimer) { clearTimeout(holdTimer); holdTimer = null; }
      if (kick) { clearInterval(kick); kick = null; }
      if (wasMoved) {
        /* 置かれた。ふう、と息をついて元に戻る */
        showing = null; play('idle', 420);
        placed = true;
        justDragged = true;
        setTimeout(function(){ justDragged = false; }, 250);
        try {
          localStorage.setItem('runa-mini-pos', JSON.stringify({
            l: parseInt(el.style.left, 10) || 14,
            b: parseInt(el.style.bottom, 10) || 14
          }));
        } catch (e) {}
      } else {
        react();   /* 動かさずに離した＝タップ */
      }
    }
    img.addEventListener('mousedown', onDown);
    img.addEventListener('touchstart', onDown, {passive: false});
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, {passive: false});
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);

    /* ゆっくり漂う（★置かれたあとは漂わない。動きを嫌う設定のときも動かない） */
    /* ★歩く。朝は「ドレスで脚が出ないから表せない」と言って浮かせていたが、
       Codex Pet 用のシートに横向きに走るコマができたので、本当に歩けるようになった。
       進む向きに合わせて running-right / running-left を出す。 */
    /* ★置いた場所を基点にして、そこから歩く（2026-08-15、主に「歩いてくれない」と言われて直した）。
       前は「一度つまんで置いたら、もう動かない」という作りだったので、
       主が試しにつまんだ時点で、歩く仕掛けが永久に止まっていた。
       ——今日つけた仕掛けが、今日つけた別の仕掛けを止めていた。
       つまんで置ける・場所を覚える、はそのまま。そこを中心に歩く。 */
    if (!calm) {
      var goRight = true, walking = false;
      function homeX(){
        var v = parseInt(el.style.left, 10);
        return isNaN(v) ? 14 : v;
      }
      var home = homeX();
      function step(){
        if (showing || walking) return;
        walking = true;
        goRight = !goRight;
        var span = Math.min(220, Math.max(80, window.innerWidth - home - 140));
        var to = goRight ? (home + span) : home;
        el.classList.add('walking');
        play(goRight ? 'runRight' : 'runLeft', 110);
        el.style.left = to + 'px';
        setTimeout(function(){
          walking = false;
          el.classList.remove('walking');
          if (!showing) play('idle', 420);
        }, 9000);
      }
      setTimeout(step, 6000);        /* 最初の一歩は早めに（動いて見えないと、動いていないのと同じ） */
      setInterval(step, 15000);
      /* つまんで置き直したら、そこを新しい基点にする */
      window.addEventListener('mouseup', function(){ setTimeout(function(){ home = homeX(); }, 60); });
      window.addEventListener('touchend', function(){ setTimeout(function(){ home = homeX(); }, 60); });
    }
  })();
