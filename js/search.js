/* PhysioNest — client-side site search.
   Replaces the WordPress ?s= search. Page text lives in js/search-index.js. */
(function () {
  'use strict';

  var index = window.SEARCH_INDEX || [];
  var params = new URLSearchParams(window.location.search);
  var query = (params.get('s') || '').trim();
  var input = document.getElementById('search-page-input');
  var heading = document.getElementById('search-heading');
  var list = document.getElementById('search-results');
  if (!list) return;

  if (input) input.value = query;
  if (!query) return;

  var terms = query.toLowerCase().split(/\s+/).filter(Boolean);

  function snippet(text) {
    var lower = text.toLowerCase();
    var at = lower.indexOf(terms[0]);
    var start = Math.max(0, at - 80);
    var out = (start > 0 ? '… ' : '') + text.slice(start, start + 240);
    return out + (start + 240 < text.length ? ' …' : '');
  }

  /* Append text to el, wrapping matched terms in <mark> (built with DOM nodes, no innerHTML) */
  function highlight(el, text) {
    var re = new RegExp('(' + terms.map(function (t) { return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join('|') + ')', 'gi');
    text.split(re).forEach(function (part, i) {
      if (i % 2) { var m = document.createElement('mark'); m.textContent = part; el.appendChild(m); }
      else if (part) el.appendChild(document.createTextNode(part));
    });
  }

  var results = index
    .map(function (page) {
      var hay = (page.title + ' ' + page.text).toLowerCase();
      var score = 0;
      for (var i = 0; i < terms.length; i++) {
        var n = hay.split(terms[i]).length - 1;
        if (!n) return null;
        score += n + (page.title.toLowerCase().indexOf(terms[i]) > -1 ? 5 : 0);
      }
      return { page: page, score: score };
    })
    .filter(Boolean)
    .sort(function (a, b) { return b.score - a.score; });

  if (heading) heading.textContent = results.length + (results.length === 1 ? ' result' : ' results') + ' for “' + query + '”';

  results.forEach(function (r) {
    var li = document.createElement('li');
    li.className = 'search-result';
    var h = document.createElement('h2');
    var a = document.createElement('a');
    a.href = r.page.url;
    a.textContent = r.page.title;
    h.appendChild(a);
    var p = document.createElement('p');
    highlight(p, snippet(r.page.text));
    li.appendChild(h);
    li.appendChild(p);
    list.appendChild(li);
  });
})();
