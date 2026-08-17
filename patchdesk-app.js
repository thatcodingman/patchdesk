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
  initChipSelect('#reason-select', '#reason-hidden', 'reason-chip');
  initContactForm();
});

/* ---- shared Netlify Forms AJAX submit (no page reload, no default Netlify page) ---- */
function submitFormAjax(form) {
  const body = new URLSearchParams(new FormData(form)).toString();
  return fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  });
}

/* ---- frequency poll: pick an option, then confirm with Submit vote ---- */
function initPollWidgets() {
  document.querySelectorAll('.poll-card').forEach(card => {
    const options = card.querySelectorAll('.poll-option');
    const submitBtn = card.querySelector('.poll-submit');
    const form = card.querySelector('.poll-form');
    const success = card.querySelector('.poll-success');
    if (!form || !submitBtn) return;
    let chosen = null;

    options.forEach(btn => {
      btn.addEventListener('click', () => {
        options.forEach(o => o.classList.remove('selected'));
        btn.classList.add('selected');
        chosen = btn.getAttribute('data-value');
        submitBtn.disabled = false;
      });
    });

    submitBtn.addEventListener('click', () => {
      if (!chosen || card.classList.contains('voted')) return;
      card.classList.add('voted');
      options.forEach(o => o.disabled = true);
      submitBtn.disabled = true;
      form.querySelector('[name="choice"]').value = chosen;

      submitFormAjax(form)
        .then(() => {
          card.querySelector('.poll-options').style.display = 'none';
          submitBtn.style.display = 'none';
          if (success) success.style.display = 'block';
        })
        .catch(() => {
          card.classList.remove('voted');
          options.forEach(o => o.disabled = false);
          submitBtn.disabled = false;
          alert('Something went wrong — mind trying again?');
        });
    });
  });
}

/* ---- "notify me when video drops" signup ---- */
function initNotifyForms() {
  document.querySelectorAll('form.notify-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submitFormAjax(form)
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

/* ---- contact page: chip-based "Reason" picker (no native <select> popup) ---- */
function initChipSelect(containerSelector, hiddenInputSelector, chipClass) {
  const container = document.querySelector(containerSelector);
  const hidden = document.querySelector(hiddenInputSelector);
  if (!container || !hidden) return;
  const chips = container.querySelectorAll('.' + chipClass);

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      hidden.value = chip.getAttribute('data-value');
    });
  });
}

/* ---- contact form: AJAX submit + on-brand success message ---- */
function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  const success = document.querySelector('#contact-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitFormAjax(form)
      .then(() => {
        form.style.display = 'none';
        if (success) success.style.display = 'block';
      })
      .catch(() => {
        alert('Something went wrong — mind trying again?');
      });
  });
}
