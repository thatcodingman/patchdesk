// The Patch Desk — Release Calendar data
// Add a new upcoming release by adding one object here.
// date: ISO string "YYYY-MM-DD"
// confidence: "confirmed" (official page states this exact date) | "estimated" (window/TBD)
// previousDelay: null, or a short note if the date has slipped/moved before
// cover: null until you have a real, verified direct image-file URL — never guess one

const RELEASES = [
  {
    slug: "blood-of-dawnwalker",
    title: "The Blood of Dawnwalker",
    platforms: ["PC", "PS5", "Xbox Series X|S"],
    date: "2026-09-03",
    confidence: "confirmed",
    genre: "RPG",
    developer: "Rebel Wolves",
    publisher: "Bandai Namco Entertainment",
    sourceUrl: "https://www.bandainamcoent.com/games/dawnwalker",
    blurb: "A dark-fantasy action RPG set in a 14th-century world where a man becomes a vampire while trying to save his family.",
    cover: null,
    lastVerified: "2026-08-26",
    previousDelay: null
  },
  {
    slug: "onimusha-way-of-the-sword",
    title: "Onimusha: Way of the Sword",
    platforms: ["PC", "PS5", "Xbox Series X|S"],
    date: "2026-09-04",
    confidence: "confirmed",
    genre: "Swordplay action",
    developer: "Capcom",
    publisher: "Capcom",
    sourceUrl: "https://www.capcom-games.com/onimusha/ws/",
    blurb: "A swordplay action game following Miyamoto Musashi through an early-Edo Kyoto overrun by demons.",
    cover: null,
    lastVerified: "2026-08-26",
    previousDelay: "Moved forward from Sept 25 to Sept 4, 2026 (per Capcom's official site)"
  },
  {
    slug: "nba-2k27",
    title: "NBA 2K27",
    platforms: ["PS5", "Xbox Series X|S", "PC", "Nintendo Switch 2"],
    date: "2026-09-04",
    confidence: "confirmed",
    genre: "Sports / Basketball",
    developer: "Visual Concepts",
    publisher: "2K",
    sourceUrl: "https://newsroom.2k.com/news/nbar-2k27-cover-athletes-revealed-victor-wembanyama-caitlin-clark-and-derrick-rose",
    blurb: "The annual NBA and WNBA basketball simulation with updated rosters, modes and gameplay.",
    cover: null,
    lastVerified: "2026-08-26",
    previousDelay: null
  },
  {
    slug: "halloween-the-game",
    title: "Halloween: The Game",
    platforms: ["PS5", "Xbox Series X|S", "PC (Steam, Epic Games Store)"],
    date: "2026-09-08",
    confidence: "confirmed",
    genre: "Asymmetrical horror / Action",
    developer: "IllFonic",
    publisher: "IllFonic",
    sourceUrl: "https://halloweengame.com/news/unleash-hell-upon-haddonfield/",
    blurb: "A 1-vs-4 horror game based on Halloween, with players controlling Michael Myers or a Hero of Haddonfield.",
    cover: null,
    lastVerified: "2026-08-26",
    previousDelay: null
  },
  {
    slug: "marvels-wolverine",
    title: "Marvel's Wolverine",
    platforms: ["PS5"],
    date: "2026-09-15",
    confidence: "confirmed",
    genre: "Action-adventure",
    developer: "Insomniac Games",
    publisher: "Sony Interactive Entertainment",
    sourceUrl: "https://blog.playstation.com/2026/06/02/marvels-wolverine-new-gameplay-story-details-from-state-of-play/",
    blurb: "A single-player Wolverine action game following Logan through a story spanning locations including Madripoor and Japan.",
    cover: null,
    lastVerified: "2026-08-26",
    previousDelay: null
  },
  {
    slug: "trails-in-the-sky-2nd-chapter",
    title: "Trails in the Sky 2nd Chapter",
    platforms: ["Nintendo Switch 2", "Nintendo Switch", "PS5", "PC (Steam)"],
    date: "2026-09-17",
    confidence: "confirmed",
    genre: "RPG / Adventure",
    developer: "Nihon Falcom",
    publisher: "Nihon Falcom / GungHo Online Entertainment America / Clouded Leopard Entertainment",
    sourceUrl: "https://trails2ndchapter.com/",
    blurb: "A 3D RPG remake following Estelle as she searches for Joshua after he disappears.",
    cover: null,
    lastVerified: "2026-08-26",
    previousDelay: null
  },
  {
    slug: "dawn-of-war-iv",
    title: "Warhammer 40,000: Dawn of War IV",
    platforms: ["PC"],
    date: "2026-09-17",
    confidence: "confirmed",
    genre: "Strategy / RTS",
    developer: "KING Art",
    publisher: "Deep Silver",
    sourceUrl: "https://store.steampowered.com/app/2272360/Warhammer_40000_Dawn_of_War_IV/",
    blurb: "A real-time strategy game featuring four Warhammer 40,000 factions, campaigns, skirmishes and multiplayer.",
    cover: null,
    lastVerified: "2026-08-26",
    previousDelay: null
  },
  {
    slug: "dune-awakening-console",
    title: "Dune: Awakening — Console Release",
    platforms: ["PS5", "Xbox Series X|S"],
    date: "2026-09-22",
    confidence: "confirmed",
    genre: "Open-world survival / MMO",
    developer: "Funcom",
    publisher: "Funcom",
    sourceUrl: "https://pr.funcom.com/Dune-Awakening-arrives-on-console-September-22-nd-includes-full-single",
    blurb: "An open-world survival game set on Arrakis, arriving on consoles with its full story and a single-player mode.",
    cover: null,
    lastVerified: "2026-08-26",
    previousDelay: null
  },
  {
    slug: "control-resonant",
    title: "CONTROL Resonant",
    platforms: ["PC", "PS5", "Xbox Series X|S"],
    date: "2026-09-24",
    confidence: "confirmed",
    genre: "Action-adventure / RPG",
    developer: "Remedy Entertainment",
    publisher: "Remedy Entertainment",
    sourceUrl: "https://store.steampowered.com/app/3669870/CONTROL_Resonant/",
    blurb: "A supernatural action RPG in which Dylan Faden investigates a reality-warping crisis in Manhattan.",
    cover: null,
    lastVerified: "2026-08-26",
    previousDelay: null
  },
  {
    slug: "silent-hill-townfall",
    title: "SILENT HILL: Townfall",
    platforms: ["PC (Steam, Epic Games Store)", "PS5"],
    date: "2026-09-24",
    confidence: "confirmed",
    genre: "Psychological horror",
    developer: "Screen Burn Interactive",
    publisher: "Konami Digital Entertainment",
    sourceUrl: "https://www.konami.com/games/eu/en/topics/19146/",
    blurb: "A first-person psychological horror game set on the Scottish island of St. Amelia.",
    cover: null,
    lastVerified: "2026-08-26",
    previousDelay: null
  }
];

if (typeof module !== "undefined") module.exports = RELEASES;
