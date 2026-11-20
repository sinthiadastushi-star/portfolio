// Typing effect
const roles = ['responsive websites', 'clean interfaces', 'useful web apps'];
const typed = document.getElementById('typed');
let r = 0, c = 0, del = false;
function type() {
  const word = roles[r];
  typed.textContent = word.slice(0, c);
  if (!del && c < word.length) c++;
  else if (!del) { del = true; return setTimeout(type, 1400); }
  else if (c > 0) c--;
  else { del = false; r = (r + 1) % roles.length; }
  setTimeout(type, del ? 40 : 90);
}
type();

// Mobile menu
const btn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
btn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', e => {
  if (e.target.tagName === 'A') { menu.classList.remove('open'); btn.setAttribute('aria-expanded', false); }
});

// Skill bars fill when visible
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.querySelector('i').style.width = en.target.dataset.level + '%';
      io.unobserve(en.target);
    }
  });
}, { threshold: .4 });
document.querySelectorAll('.skill').forEach(s => io.observe(s));

// Contact form (opens email app; replace the address)
const EMAIL = '251-35-145@diu.edu.bd';
const form = document.getElementById('contact-form');
const note = document.getElementById('form-note');
form.addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(form);
  if (!d.get('name') || !/^\S+@\S+\.\S+$/.test(d.get('email')) || !d.get('message')) {
    note.textContent = 'Please enter your name, a valid email and a message.';
    return;
  }
  const body = encodeURIComponent(d.get('message') + '\n\nFrom: ' + d.get('name') + ' (' + d.get('email') + ')');
  window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Portfolio message from ' + d.get('name')) + '&body=' + body;
  note.textContent = 'Opening your email app...';
});

document.getElementById('year').textContent = new Date().getFullYear();
