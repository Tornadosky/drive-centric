(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- header ---------- */
  var header = document.querySelector('[data-header]');
  function onScroll() { if (header) header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile drawer ---------- */
  var toggle = document.querySelector('[data-menu-toggle]');
  var drawer = document.querySelector('[data-mobile-drawer]');
  function closeDrawer() {
    if (!drawer || !toggle) return;
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  }
  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      var open = !drawer.classList.contains('open');
      drawer.classList.toggle('open', open);
      drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('no-scroll', open);
    });
    drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeDrawer); });
    window.addEventListener('resize', function () { if (window.innerWidth > 900) closeDrawer(); });
  }

  /* ---------- split headline into words ---------- */
  document.querySelectorAll('[data-split]').forEach(function (el) {
    var words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    words.forEach(function (w, i) {
      var s = document.createElement('span');
      s.className = 'w';
      s.style.setProperty('--wi', i);
      s.textContent = w;
      el.appendChild(s);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
  });
  requestAnimationFrame(function () { document.documentElement.classList.add('hero-in'); });

  /* ---------- blueprint falling cells ---------- */
  var cellsHost = document.querySelector('[data-cells]');
  if (cellsHost && !reduce) {
    var SIZE = 48, N = 26;
    function placeCell(c) {
      var w = cellsHost.clientWidth, h = cellsHost.clientHeight;
      var cols = Math.max(1, Math.floor(w / SIZE)), rows = Math.max(1, Math.floor(h / SIZE));
      var x = Math.floor(Math.random() * cols) * SIZE;
      var y = Math.floor(Math.random() * (rows * 0.7)) * SIZE;
      c.style.left = x + 'px';
      c.style.top = y + 'px';
      c.style.setProperty('--fall', (SIZE * (2 + Math.floor(Math.random() * 4))) + 'px');
      var dur = 3.5 + Math.random() * 4;
      c.style.animationDuration = dur + 's, ' + dur + 's';
      c.style.animationDelay = (Math.random() * 2) + 's, ' + (Math.random() * 2) + 's';
    }
    for (var i = 0; i < N; i++) {
      var c = document.createElement('i');
      c.className = 'blueprint-cell';
      placeCell(c);
      c.addEventListener('animationend', function (e) {
        var el = e.target;
        el.style.animation = 'none';
        void el.offsetWidth;
        el.style.animation = '';
        placeCell(el);
      });
      cellsHost.appendChild(c);
    }
  }

  /* ---------- live lead feed ---------- */
  var feed = document.querySelector('[data-feed]');
  if (feed) {
    var events = [
      { t: '09:41:02', k: 'lead', txt: '<b>New lead</b> · Jordan R. · 2023 Tacoma · web form', tag: 'in' },
      { t: '09:41:09', k: 'ai', txt: '<b>AI agent</b> replied with photos + two appointment slots', tag: '7s' },
      { t: '09:42:44', k: 'reply', txt: '<b>Jordan R.</b> "Thursday at 4:30 works"', tag: 'reply' },
      { t: '09:42:46', k: 'ok', txt: '<b>Appointment</b> booked · Thu 4:30 PM · assigned to Marcus', tag: 'booked' },
      { t: '09:43:10', k: 'lead', txt: '<b>New lead</b> · Priya S. · 2022 CR-V · phone', tag: 'in' },
      { t: '09:43:15', k: 'ai', txt: '<b>AI agent</b> confirmed availability, asked about trade-in', tag: '5s' },
      { t: '09:44:30', k: 'ok', txt: '<b>Trade-in offer</b> sent · 2019 Silverado · $21,400', tag: 'sent' },
      { t: '09:45:00', k: 'dim', txt: '<b>Service reminders</b> delivered to 212 customers', tag: 'auto' }
    ];
    var idx = 0, MAX = 5;
    function pushRow() {
      var e = events[idx % events.length];
      idx++;
      var row = document.createElement('div');
      row.className = 'hx-row k-' + e.k;
      row.innerHTML = '<span class="hx-t mono">' + e.t + '</span><span class="hx-txt">' + e.txt + '</span><span class="hx-tag mono">' + e.tag + '</span>';
      feed.appendChild(row);
      while (feed.children.length > MAX) {
        var first = feed.firstElementChild;
        first.classList.add('out');
        (function (n) { setTimeout(function () { if (n.parentNode) n.parentNode.removeChild(n); }, 350); })(first);
        if (feed.children.length - 1 <= MAX) break;
      }
    }
    if (reduce) { for (var j = 0; j < MAX; j++) pushRow(); }
    else {
      pushRow();
      var feedTimer = setInterval(pushRow, 1900);
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) { clearInterval(feedTimer); }
        else { feedTimer = setInterval(pushRow, 1900); }
      });
    }
  }

  /* ---------- hero card tilt ---------- */
  var tilt = document.querySelector('[data-tilt]');
  if (tilt && !reduce && window.matchMedia('(pointer: fine)').matches) {
    var raf = null;
    tilt.addEventListener('mousemove', function (e) {
      var r = tilt.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        tilt.style.transform = 'perspective(1200px) rotateX(' + (-y * 4) + 'deg) rotateY(' + (x * 6) + 'deg) translateY(-2px)';
      });
    });
    tilt.addEventListener('mouseleave', function () { tilt.style.transform = ''; });
  }

  /* ---------- reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- count up ---------- */
  function fmt(n, mode) {
    if (mode === 'time') { var m = Math.floor(n / 60), s = n % 60; return m ? (m + 'm ' + (s < 10 ? '0' : '') + s + 's') : (s + 's'); }
    return String(n);
  }
  var counters = document.querySelectorAll('[data-count]');
  function runCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var mode = el.getAttribute('data-format');
    if (reduce || target === 0) { el.textContent = fmt(target, mode); return; }
    var start = null, dur = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(target * eased), mode);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { runCount(en.target); cio.unobserve(en.target); } });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(runCount);
  }
})();
