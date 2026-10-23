/* PhysioNest — page interactions: accordions, carousel, scroll reveal, forms */
(function () {
  'use strict';

  var WHATSAPP_NUMBER = '918660811031';

  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');

  /* ---------- Accordion (FAQ) ---------- */
  document.querySelectorAll('[data-accordion]').forEach(function (acc) {
    acc.addEventListener('click', function (e) {
      var trigger = e.target.closest('.acc-trigger');
      if (!trigger || !acc.contains(trigger)) return;
      var item = trigger.closest('.acc-item');
      var open = trigger.getAttribute('aria-expanded') !== 'true';
      trigger.setAttribute('aria-expanded', String(open));
      item.classList.toggle('is-open', open);
      var panel = document.getElementById(trigger.getAttribute('aria-controls'));
      if (panel) panel.setAttribute('aria-hidden', String(!open));
    });
  });

  /* ---------- Carousel (testimonials) ---------- */
  document.querySelectorAll('[data-carousel]').forEach(function (root) {
    var track = root.querySelector('.carousel-track');
    var slides = Array.prototype.slice.call(track.children);
    var prev = root.querySelector('[data-carousel-prev]');
    var next = root.querySelector('[data-carousel-next]');
    var dotsWrap = root.querySelector('.carousel-dots');
    var dots = [];

    function perView() {
      var w = slides[0].getBoundingClientRect().width || 1;
      return Math.max(1, Math.round(track.clientWidth / w));
    }
    function pageCount() { return Math.max(1, slides.length - perView() + 1); }
    function current() {
      var w = slides[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0);
      return Math.round(track.scrollLeft / w);
    }
    function goTo(i) {
      i = Math.max(0, Math.min(i, pageCount() - 1));
      track.scrollTo({ left: slides[i].offsetLeft - slides[0].offsetLeft, behavior: 'smooth' });
    }
    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      dots = [];
      for (var i = 0; i < pageCount(); i++) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
        b.addEventListener('click', goTo.bind(null, i));
        dotsWrap.appendChild(b);
        dots.push(b);
      }
      update();
    }
    function update() {
      var c = current();
      if (prev) prev.disabled = c <= 0;
      if (next) next.disabled = c >= pageCount() - 1;
      dots.forEach(function (d, i) { d.setAttribute('aria-current', String(i === c)); });
    }

    if (prev) prev.addEventListener('click', function () { goTo(current() - 1); });
    if (next) next.addEventListener('click', function () { goTo(current() + 1); });
    track.addEventListener('scroll', function () { window.requestAnimationFrame(update); }, { passive: true });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current() + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current() - 1); }
    });
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(buildDots, 150);
    });
    buildDots();
  });

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Forms ----------
     Each form validates on the client using the original site's messages.
     If the form has a data-endpoint attribute it is POSTed there (configure a
     backend to enable this). Without one, the details are handed off to
     WhatsApp, the booking channel the original site already uses. */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var PHONE_RE = /^\+?[0-9\s\-()]{7,20}$/;

  function setError(field, message) {
    var wrap = field.closest('.field');
    if (!wrap) return;
    var err = wrap.querySelector('.field-error');
    wrap.classList.toggle('has-error', !!message);
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (err) err.textContent = message || '';
  }

  function validateField(form, field) {
    var value = field.value.trim();
    var msgs = form.dataset;
    if (field.required && !value) return msgs.msgRequired;
    if (value && field.type === 'email' && !EMAIL_RE.test(value)) return msgs.msgEmail;
    if (value && field.dataset.phone !== undefined && msgs.msgPhone && !PHONE_RE.test(value)) return msgs.msgPhone;
    return '';
  }

  function buildMessage(form) {
    var lines = [form.dataset.title || 'Appointment request'];
    form.querySelectorAll('[data-label]').forEach(function (f) {
      var v = f.value.trim();
      if (v) lines.push(f.dataset.label + ': ' + v);
    });
    return lines.join('\n');
  }

  document.querySelectorAll('form[data-validate]').forEach(function (form) {
    var fields = Array.prototype.slice.call(form.querySelectorAll('input:not([type=hidden]):not([tabindex="-1"]), textarea'));
    var status = form.querySelector('.form-status');

    fields.forEach(function (f) {
      f.addEventListener('blur', function () { if (f.value) setError(f, validateField(form, f)); });
      f.addEventListener('input', function () {
        if (f.closest('.field').classList.contains('has-error')) setError(f, validateField(form, f));
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstInvalid = null;
      fields.forEach(function (f) {
        var msg = validateField(form, f);
        setError(f, msg);
        if (msg && !firstInvalid) firstInvalid = f;
      });
      if (firstInvalid) { firstInvalid.focus(); return; }

      var honeypot = form.querySelector('.hp-field input');
      if (honeypot && honeypot.value) return;

      function showStatus(kind, text) {
        if (!status) return;
        status.className = 'form-status is-' + kind;
        status.textContent = text;
      }

      var endpoint = form.dataset.endpoint;
      if (endpoint) {
        var btn = form.querySelector('[type=submit]');
        btn.disabled = true;
        fetch(endpoint, { method: 'POST', body: new FormData(form) })
          .then(function (res) {
            if (!res.ok) throw new Error(res.status);
            form.reset();
            showStatus('info', form.dataset.msgSent || '');
          })
          .catch(function () { showStatus('error', form.dataset.msgError); })
          .finally(function () { btn.disabled = false; });
        return;
      }

      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(buildMessage(form));
      var win = window.open(url, '_blank');
      showStatus('info', form.dataset.msgHandoff);
      if (win) win.opener = null;
      else window.location.href = url;
    });
  });
})();
