'use strict';
const bookingURL = new URL('https://designer.my.site.com/scheduling?slug=mid-ad-mk');
const incoming = new URLSearchParams(location.search);
const attributionKeys = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','utm_id','fbclid','gclid','ttclid','affiliate_id','source','platform','media','ad_source'];
for (const key of attributionKeys) {
  const value = incoming.get(key);
  if(value && value.length <= 2000) bookingURL.searchParams.set(key,value);
}
bookingURL.searchParams.set('lp_variant','sales-environment');
window.dataLayer = window.dataLayer || [];
for (const link of document.querySelectorAll('[data-booking]')) {
  link.href = bookingURL.href;
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
