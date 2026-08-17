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

document.addEventListener('DOMContentLoaded', initTicker);
