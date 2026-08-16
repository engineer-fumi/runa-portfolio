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
    // ページの題（タブに出る文字）。属性で指定されていれば差し替える
    var tkey = document.documentElement.getAttribute('data-i18n-title');
    if (tkey) { var tv = api.t(tkey); if (tv) document.title = tv; }
    var sel = document.getElementById('runa-lang-select');
    if (sel && sel.value !== api.lang) sel.value = api.lang;
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
  fetch(base + 'assets/i18n/dict.json')
    .then(function (r) { return r.json(); })
    .then(start)
    .catch(function () { /* 読めなくても、書いてある日本語のまま出る */ });

  window.RunaI18n = api;
})();
