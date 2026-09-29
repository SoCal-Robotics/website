// Progressive enhancement: all navigation remains available without JavaScript.
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-navigation');
const mobile = window.matchMedia('(max-width: 900px)');
function setOpen(open, returnFocus = false) {
  toggle.setAttribute('aria-expanded', String(open));
  nav.hidden = mobile.matches && !open;
  if (returnFocus) toggle.focus();
}
function sync() { toggle.hidden = !mobile.matches; setOpen(false); }
toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
nav.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobile.matches) { event.preventDefault(); setOpen(false, true); }
});
toggle.addEventListener('keydown', event => { if (event.key === 'Escape') setOpen(false); });
nav.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link || !mobile.matches) return;
  setOpen(false);
  if (link.hash && link.pathname === window.location.pathname) {
    const target = document.querySelector(link.hash);
    if (target) { target.setAttribute('tabindex', '-1'); target.focus(); }
  }
});
document.addEventListener('click', event => { if (mobile.matches && !event.target.closest('.site-header')) setOpen(false); });
mobile.addEventListener('change', sync);
sync();
