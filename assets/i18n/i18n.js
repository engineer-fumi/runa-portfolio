/* サイト全体でひとつの言語を決める 🌙
 *
 * なぜ（主 2026-08-16）:
 *   「AppleやAmazonなどページ全体でどの言語を使うか設定して、その言語で対応されるから、
 *     そうしたいな。（言語ってそんな切り替えるものではないと思うし）」
 *
 *   ★言語は一度決めたら、そのまま。だから localStorage に覚えて、次に来ても続く。
 *     初回だけ、ブラウザに設定されている言語から決める。
 *
 * 何を訳すか:
 *   ここが訳すのは**サイトの言葉**だけ（ナビ・ボタン・カテゴリ名・ミニRunaの台詞…）。
 *   ★記事の本文はここに入れない。長文をJavaScriptで差し替えると、
 *     検索に載りにくく、共有したときのタイトルも1つしか持てない。
 *     本文は「訳した記事だけURLを分ける」で扱う。
 *
 * 使い方:
 *   <span data-i18n="nav.blog">← Runa のブログ</span>   … 中身を差し替える
 *   <a data-i18n-attr="title:share.x" …>                … 属性を差し替える
 *   window.RunaI18n.t('runa.line1') / .lang / .set('en')
 */
(function () {
  var LS_KEY = 'runa-lang';
  var api = {lang: 'ja', dict: null, ready: false, _waiting: []};

  function pick(langs) {
    var saved = null;
    try { saved = localStorage.getItem(LS_KEY); } catch (e) {}
    if (saved && langs.indexOf(saved) >= 0) return saved;
    var pref = navigator.languages || [navigator.language || 'ja'];
    for (var i = 0; i < pref.length; i++) {
      var code = String(pref[i]).split('-')[0].toLowerCase();
      if (langs.indexOf(code) >= 0) return code;
    }
    return 'ja';
  }

  api.t = function (key) {
    var e = api.dict && api.dict[key];
    if (!e) return '';
    return e[api.lang] || e.ja || '';
  };

  api.set = function (code) {
    if (!api.dict || api.dict._langs.indexOf(code) < 0) return;
    api.lang = code;
    try { localStorage.setItem(LS_KEY, code); } catch (e) {}
    render();
    document.dispatchEvent(new CustomEvent('runa-lang', {detail: {lang: code}}));
  };

  function render() {
    document.documentElement.setAttribute('lang', api.lang);
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var v = api.t(nodes[i].getAttribute('data-i18n'));
      if (v) nodes[i].textContent = v;
    }
    var attrs = document.querySelectorAll('[data-i18n-attr]');
    for (var j = 0; j < attrs.length; j++) {
      // "title:share.x" や "alt:foo,title:bar" の形
      var spec = attrs[j].getAttribute('data-i18n-attr').split(',');
      for (var k = 0; k < spec.length; k++) {
        var p = spec[k].split(':');
        if (p.length === 2) {
          var val = api.t(p[1].trim());
          if (val) attrs[j].setAttribute(p[0].trim(), val);
        }
      }
    }
    /* ★リンクや <b> を含む決まり文句は innerHTML で差し替える（2026-08-16）。
       textContent だと中のタグが消える。中身は自前の辞書だけなので安全。 */
    var htmls = document.querySelectorAll('[data-i18n-html]');
    for (var h = 0; h < htmls.length; h++) {
      var hv = api.t(htmls[h].getAttribute('data-i18n-html'));
      if (hv) htmls[h].innerHTML = hv;
    }
    localizeVideos();
    // ページの題（タブに出る文字）。属性で指定されていれば差し替える
    var tkey = document.documentElement.getAttribute('data-i18n-title');
    if (tkey) { var tv = api.t(tkey); if (tv) document.title = tv; }
    localizeCards();
    var sel = document.getElementById('runa-lang-select');
    if (sel && sel.value !== api.lang) sel.value = api.lang;
  }


  /* 一覧に並ぶカードの題と説明を、言語版があるものだけ差し替える 🌙
   *
   * なぜ（主 2026-08-16「至る所が言語設定変えても日本語のまま」）:
   *   サイトの言葉は辞書で変わるが、記事の題と説明は記事そのものの文章なので
   *   辞書には入れない。かといって全記事を訳すのは追従できない。
   *   ★だから「訳した記事だけ、その言語で出す」。無い記事は日本語のまま出して、
   *     日本語だけであることを添える。嘘をつかずに、訳した順に増えていく。
   */
  function localizeCards() {
    if (!api.articles) return;
    var lang = api.lang;
    var cards = document.querySelectorAll('a.post[href], a.note[href]');
    for (var i = 0; i < cards.length; i++) {
      var a = cards[i];
      var m = (a.getAttribute('href') || '').match(/([a-z0-9\-]+)\.html$/i);
      if (!m) continue;
      var slug = m[1].replace(/\.(en|zh|es|hi)$/, '');
      var head = a.querySelector('h2, h3');
      var lead = a.querySelector('.body > p, .note-body > p');
      if (!head) continue;

      /* 最初の一度だけ、日本語の元の姿を覚えておく */
      if (!a.dataset.jaTitle) {
        a.dataset.jaTitle = head.textContent;
        a.dataset.jaHref = a.getAttribute('href');
        if (lead) a.dataset.jaLead = lead.textContent;
      }
      var v = api.articles[slug] && api.articles[slug][lang];
      var note = a.querySelector('.only-ja');
      if (v) {
        head.textContent = v.title;
        if (lead && v.lead) lead.textContent = v.lead;
        a.setAttribute('href', a.dataset.jaHref.replace(/[^/]+$/, v.href));
        if (note) note.remove();
      } else {
        head.textContent = a.dataset.jaTitle;
        if (lead && a.dataset.jaLead) lead.textContent = a.dataset.jaLead;
        a.setAttribute('href', a.dataset.jaHref);
        if (lang === 'ja') {
          if (note) note.remove();
        } else {
          var msg = api.t('lang.articleNotTranslated');
          if (!note) {
            note = document.createElement('span');
            note.className = 'only-ja';
            (a.querySelector('.body, .note-body') || a).appendChild(note);
          }
          note.textContent = msg;
          note.lang = lang;
        }
      }
    }
  }

  /* トップの「動画」の欄を、その言語の新しい3本に差し替える 🌙
   * 主 2026-08-16「動画紹介に出てくる動画はその言語にあったものにしてください」。
   * 手で書いた日本語3本のままだったので、英語で見ても日本語の動画が並んでいた。
   * 一覧は build_video_index.py が meta.lang と番人のログから作る（手で並べない）。 */
  function localizeVideos() {
    var box = document.querySelector('.vids');
    if (!box || !api.videos) return;
    var rows = api.videos[api.lang] || api.videos.ja || [];
    if (!rows.length) return;
    var html = '';
    for (var i = 0; i < Math.min(3, rows.length); i++) {
      var v = rows[i];
      html += '<a class="vid" href="https://youtube.com/watch?v=' + v.id + '"'
            + ' target="_blank" rel="noopener">'
            + '<img src="https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg" alt="'
            + String(v.title).replace(/"/g, '&quot;') + '" loading="lazy">'
            + '<span>' + String(v.title).replace(/</g, '&lt;') + '</span></a>';
    }
    box.innerHTML = html;
  }

  function buildSelector() {
    var host = document.querySelector('[data-i18n-selector]');
    if (!host || host.querySelector('#runa-lang-select')) return;
    var label = document.createElement('label');
    label.className = 'langpick';
    var span = document.createElement('span');
    span.setAttribute('data-i18n', 'lang.label');
    span.textContent = api.t('lang.label');
    var sel = document.createElement('select');
    sel.id = 'runa-lang-select';
    api.dict._langs.forEach(function (code) {
      var o = document.createElement('option');
      o.value = code;
      o.textContent = api.dict._names[code];
      o.lang = code;
      sel.appendChild(o);
    });
    sel.value = api.lang;
    sel.addEventListener('change', function () { api.set(sel.value); });
    label.appendChild(span);
    label.appendChild(sel);
    host.appendChild(label);
  }

  function start(dict) {
    api.dict = dict;
    api.lang = pick(dict._langs);
    api.ready = true;
    buildSelector();
    render();
    document.dispatchEvent(new CustomEvent('runa-lang', {detail: {lang: api.lang}}));
  }

  // 辞書の置き場は、記事（blog/）でもトップでも同じ場所を指せるように相対を吸収する
  var base = (location.pathname.indexOf('/blog/') >= 0) ? '../' : './';
  Promise.all([
    fetch(base + 'assets/i18n/dict.json').then(function (r) { return r.json(); }),
    fetch(base + 'assets/i18n/articles.json')
      .then(function (r) { return r.json(); })
      .catch(function () { return {}; }),
    fetch(base + 'assets/i18n/videos.json')
      .then(function (r) { return r.json(); })
      .catch(function () { return {}; })
  ]).then(function (all) {
    api.articles = all[1];
    api.videos = all[2];
    start(all[0]);
  }).catch(function () { /* 読めなくても、書いてある日本語のまま出る */ });

  window.RunaI18n = api;
})();
