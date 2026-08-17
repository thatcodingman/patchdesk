// The Patch Desk — daily meme ticker

const MEME_PHRASES = [
  "THIS GAME SAID 'TRUST THE PROCESS' AND THE PROCESS WAS DLC",
  "PATCH NOTES: 'FIXED VARIOUS ISSUES' — COOL COOL COOL",
  "70 DOLLARS FOR A HORSE ARMOR REBOOT? NO CAP DETECTED",
  "YEAR 1: REVOLUTIONARY. YEAR 2: SAME MAP, NEW BATTLE PASS",
  "THE GRIND IS REAL AND SO IS THE MICROTRANSACTION",
  "LOADING SCREEN TIPS SHOULD NOT OUTNUMBER ACTUAL FEATURES",
  "NERFED INTO OBLIVION, BUFFED INTO THE SHADOW REALM",
  "REMASTER? RE-RELEASE? RE-BUY IT FOR THE THIRD TIME?",
];

function todaysPhrase() {
  const dayIndex = Math.floor(Date.now() / 86400000);
  return MEME_PHRASES[dayIndex % MEME_PHRASES.length];
}

function initTicker() {
  const track = document.querySelector('.meme-ticker .track');
  if (!track) return;
  const phrase = todaysPhrase();
  // duplicate content so the CSS marquee loops seamlessly
  const itemHTML = `<span class="item">🎮 ${phrase} 🎮</span>`;
  track.innerHTML = itemHTML.repeat(6);
}

document.addEventListener('DOMContentLoaded', () => {
  initTicker();
  initNotifyForms();
  initPollWidgets();
});

/* ---- one-click frequency poll (Netlify Forms, no reload, no fake tallies) ---- */
function initPollWidgets() {
  document.querySelectorAll('.poll-card').forEach(card => {
    const options = card.querySelectorAll('.poll-option');
    const form = card.querySelector('.poll-form');
    const success = card.querySelector('.poll-success');
    if (!form) return;

    options.forEach(btn => {
      btn.addEventListener('click', () => {
        if (card.classList.contains('voted')) return;
        card.classList.add('voted');
        options.forEach(o => o.disabled = true);
        btn.classList.add('selected');

        form.querySelector('[name="choice"]').value = btn.getAttribute('data-value');
        const body = new URLSearchParams(new FormData(form)).toString();

        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body
        })
          .then(() => {
            card.querySelector('.poll-options').style.display = 'none';
            if (success) success.style.display = 'block';
          })
          .catch(() => {
            card.classList.remove('voted');
            options.forEach(o => o.disabled = false);
            btn.classList.remove('selected');
            alert('Something went wrong — mind trying again?');
          });
      });
    });
  });
}

/* ---- "notify me when video drops" signup (Netlify Forms, no reload) ---- */
function initNotifyForms() {
  document.querySelectorAll('form.notify-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const body = new URLSearchParams(new FormData(form)).toString();

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
      })
        .then(() => {
          form.style.display = 'none';
          const success = form.nextElementSibling;
          if (success && success.classList.contains('notify-success')) {
            success.style.display = 'block';
          }
        })
        .catch(() => {
          alert('Something went wrong — mind trying again?');
        });
    });
  });
}
