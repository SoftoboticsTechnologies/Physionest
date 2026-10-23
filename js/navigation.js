/* PhysioNest — header & mobile navigation */
(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  var mobileQuery = window.matchMedia('(max-width: 959px)');

  /* Shadow on scroll */
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (!toggle || !nav) return;

  function setOpen(open, returnFocus) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
    if (open) {
      var first = nav.querySelector('a');
      if (first) first.focus();
    } else if (returnFocus) {
      toggle.focus();
    }
  }

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  /* Close when a link is chosen (covers same-page #anchors) */
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a') && mobileQuery.matches) setOpen(false);
  });

  /* Escape closes; Tab is kept inside the open menu */
  document.addEventListener('keydown', function (e) {
    if (!nav.classList.contains('is-open')) return;
    if (e.key === 'Escape') { setOpen(false, true); return; }
    if (e.key === 'Tab') {
      var items = [toggle].concat(Array.prototype.slice.call(nav.querySelectorAll('a, button')));
      var first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* Tap outside the panel closes it */
  document.addEventListener('click', function (e) {
    if (nav.classList.contains('is-open') && !nav.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
  });

  /* Reset when resizing up to desktop */
  function onBreakpoint(e) { if (!e.matches) setOpen(false); }
  if (mobileQuery.addEventListener) mobileQuery.addEventListener('change', onBreakpoint);
  else mobileQuery.addListener(onBreakpoint);
})();
