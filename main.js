(function () {
  var header = document.querySelector('.header');
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.menu-toggle');

  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Highlight the current section in the practice-area side nav
  var sideLinks = document.querySelectorAll('.pa-nav a');
  if (sideLinks.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        sideLinks.forEach(function (l) {
          l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id);
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    document.querySelectorAll('.pa-item').forEach(function (s) { spy.observe(s); });
  }

  // No backend yet: the enquiry form opens the visitor's email app with the details filled in
  var form = document.getElementById('enquiry');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var d = new FormData(form);
      var subject = 'Website enquiry: ' + (d.get('matter') || 'General');
      var body = [
        'Name: ' + d.get('name'),
        'Phone: ' + d.get('phone'),
        'Email: ' + d.get('email'),
        'Matter: ' + d.get('matter'),
        '',
        d.get('message')
      ].join('\n');
      window.location.href = 'mailto:fnmuthoni.law@gmail.com?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
