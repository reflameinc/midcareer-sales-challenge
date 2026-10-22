'use strict';
// Booking happens in the embedded form (#reflame-booking); the CTAs only scroll there.
// The form reads utm/fbclid from this page's URL and sends the booking event itself,
// so never push a booking event here (it would be counted twice).
window.dataLayer = window.dataLayer || [];
for (const link of document.querySelectorAll('[data-booking]')) {
  link.addEventListener('click',()=>window.dataLayer.push({event:'lp_cta_click',lp:'midcareer_sales_challenge',section:link.dataset.position}));
}

// Keep the sticky action clear of both visible reservation actions.
const stickyAction = document.querySelector('.sticky-bar');
const mainBookingAction = document.querySelector('[data-position="hero"]');
const finalBookingSection = document.getElementById('reservation');
if ('IntersectionObserver' in window) {
  const visibleBookingAreas = new Set();
  const bookingVisibility = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) visibleBookingAreas.add(entry.target);
      else visibleBookingAreas.delete(entry.target);
    }
    stickyAction.hidden = visibleBookingAreas.size > 0;
  }, {threshold:0});
  bookingVisibility.observe(mainBookingAction);
  bookingVisibility.observe(finalBookingSection);
} else { stickyAction.hidden = false; }
