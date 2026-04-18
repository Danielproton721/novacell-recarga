// NovaCell Recarga - Interactive Script
(function () {
  'use strict';

  // Toggle extra plans
  const seeMoreBtn = document.getElementById('seeMoreBtn');
  const plansExtra = document.getElementById('plansExtra');

  if (seeMoreBtn && plansExtra) {
    seeMoreBtn.addEventListener('click', function () {
      const isVisible = plansExtra.classList.contains('visible');
      plansExtra.classList.toggle('visible');
      seeMoreBtn.classList.toggle('active');
      seeMoreBtn.querySelector('svg');
      if (!isVisible) {
        seeMoreBtn.innerHTML = 'Ver menos valores <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      } else {
        seeMoreBtn.innerHTML = 'Ver mais valores <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      }
    });
  }

  // Scroll reveal animation
  const revealElements = document.querySelectorAll('.scheduled, .tv-section, .offers, .app-section, .recharge-options');
  revealElements.forEach(function (el) {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '-40px' });

  revealElements.forEach(function (el) {
    observer.observe(el);
  });

  // Plan card click feedback
  document.querySelectorAll('.plan-card').forEach(function (card) {
    card.addEventListener('click', function () {
      const btn = card.querySelector('.plan-btn');
      if (btn) btn.click();
    });
  });

  // Button ripple effect
  document.querySelectorAll('.plan-btn, .btn-primary, .btn-outline, .offer-card-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = 'position:absolute;border-radius:50%;background:rgba(255,255,255,0.3);pointer-events:none;transform:scale(0);animation:ripple 500ms ease-out forwards;width:' + size + 'px;height:' + size + 'px;left:' + (e.clientX - rect.left - size / 2) + 'px;top:' + (e.clientY - rect.top - size / 2) + 'px;';
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 600);
    });
  });

  // Add ripple keyframe
  var style = document.createElement('style');
  style.textContent = '@keyframes ripple{to{transform:scale(2.5);opacity:0;}}';
  document.head.appendChild(style);
})();
