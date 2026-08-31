(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- scroll reveal with stagger ---- */
  var rev = [].slice.call(document.querySelectorAll('.reveal'));
  rev.forEach(function (el) {
    if (!el.style.getPropertyValue('--i')) {
      var sibs = [].slice.call(el.parentNode.children).filter(function (c) { return c.classList.contains('reveal'); });
      el.style.transitionDelay = (Math.min(sibs.indexOf(el), 6) * 65) + 'ms';
    }
  });
  if (reduce || !('IntersectionObserver' in window)) {
    rev.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    rev.forEach(function (el) { io.observe(el); });
  }

  /* ---- flip cards: click / keyboard toggle + hover tilt ---- */
  var canHover = window.matchMedia('(hover: hover)').matches;
  [].slice.call(document.querySelectorAll('.flip')).forEach(function (card) {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-pressed', 'false');
    var front = card.querySelector('.flip-front');
    function toggle() {
      var on = card.classList.toggle('flipped');
      card.setAttribute('aria-pressed', on ? 'true' : 'false');
      card.style.transform = '';
    }
    card.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') return;
      toggle();
    });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });

    if (canHover && !reduce) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        if (front) {
          front.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
          front.style.setProperty('--my', (py * 100).toFixed(1) + '%');
        }
        if (!card.classList.contains('flipped')) {
          card.style.transform =
            'rotateX(' + ((0.5 - py) * 5).toFixed(2) + 'deg) rotateY(' + ((px - 0.5) * 7).toFixed(2) + 'deg)';
        }
      });
      card.addEventListener('pointerleave', function () { card.style.transform = ''; });
    }
  });

  /* ---- accordion (work achievements) ---- */
  [].slice.call(document.querySelectorAll('.exp-card > button')).forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.parentNode.classList.toggle('open');
    });
  });

  /* ---- hero parallax (index only) ---- */
  var hero = document.querySelector('.hero');
  if (hero && !reduce) {
    var pl = [].slice.call(document.querySelectorAll('[data-parallax]'));
    var ticking = false;
    function upd() {
      var y = window.pageYOffset;
      pl.forEach(function (el) {
        el.style.transform = 'translate3d(0,' + (y * parseFloat(el.dataset.parallax)).toFixed(1) + 'px,0)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(upd); ticking = true; }
    }, { passive: true });
    upd();

    var mv = [].slice.call(hero.querySelectorAll('[data-mouse]'));
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      var dx = (e.clientX - r.left) / r.width - 0.5;
      var dy = (e.clientY - r.top) / r.height - 0.5;
      mv.forEach(function (el) {
        var f = parseFloat(el.dataset.mouse);
        var y = window.pageYOffset * parseFloat(el.dataset.parallax || 0);
        el.style.transform = 'translate3d(' + (dx * f).toFixed(1) + 'px,' + (y + dy * f).toFixed(1) + 'px,0)';
      });
    });
  }
})();
