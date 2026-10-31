// FIREBASE: a 2. lépésben

/* ==========================================================================
   1. KONFIGURÁCIÓ ÉS SZÖVEGEK (T LOKALIZÁCIÓ) / CONFIGURATION & STRINGS
   ========================================================================== */

/**
 * Alkalmazás felhasználói feliratok szótára (magyar nyelven).
 * Később további nyelvekkel (pl. angol) bővíthető.
 */
export const T = {
  appName: 'Lockin',
  tagline: 'Sportolói teljesítmény- és egészségkövető',
  sampleBadge: 'Minta adat',
  comingSoonBadge: 'Hamarosan',
  backToLab: 'Vissza a Labhez',
  nav: {
    home: 'Home',
    lab: 'Performance Lab',
    journal: 'Journal',
    more: 'More',
  },
  home: {
    greeting: 'Szia!',
    readiness: 'Készenlét',
    readinessSub: '/ 100',
    readinessStatus: 'Magas készenlét',
    strain: 'Terhelés',
    strainSub: '0–21 skála',
    strainStatus: 'Közepes terhelés',
    sleep: 'Alvás',
    sleepSub: '84% minőség',
    sleepStatus: 'Megfelelő regeneráció',
    whyTitle: 'Miért?',
    whyText: 'A pulzusvariabilitásod (HRV) stabil, az éjszakai nyugalmi pulzusod (48 bpm) optimális. A tegnapi intenzív edzés után a regenerációd megfelelő ütemben halad.',
    suggestionTitle: 'Mai javaslat',
    suggestionText: 'Közepes intenzitású aerob munka vagy technikai gyakorlás ajánlott (RPE 6–7). Kerüld a maximális glikolitikus terhelést a holnapi felmérő előtt.',
    tasksTitle: 'Mai teendők',
    tasks: [
      { id: 1, text: 'Reggeli mobilitási rutin (15 perc)', completed: true },
      { id: 2, text: 'Hidratációs cél: 3,5 liter elektrolittal', completed: false },
      { id: 3, text: 'Délutáni zóna 2 állóképességi blokk (45 perc)', completed: false },
    ],
    chips: {
      history: 'Saját múlt',
      team: 'Csapat',
      reference: 'Referencia',
    },
  },
  lab: {
    title: 'Performance Lab',
    subtitle: 'Négy alappillérre épülő sporttudományos teljesítményoptimalizálás',
    submodulesCount: 'almodul',
    pillars: {
      physical: {
        id: 'physical',
        title: 'Fizikai és technikai felkészülés',
        icon: 'icon-physical',
        description: 'Aerob kapacitás, neuromuszkuláris erő és technikai precizitás fejlesztése.',
        submodules: [
          {
            title: 'Energiarendszerek és állóképesség',
            desc: 'VO2max protokollok, laktátküszöb zónák és aerob alapozás tervezése.',
          },
          {
            title: 'Erő és neuromuszkuláris adaptáció',
            desc: 'Maximális erő, robbanékonyság és Rate of Force Development (RFD).',
          },
          {
            title: 'Technika és biomechanika',
            desc: 'Mozgásminták videoelemzése és energiahatékony végrehajtás.',
          },
          {
            title: 'Periodizáció',
            desc: 'Mikro-, mezo- és makrociklusok hangolása a versenycélokhoz.',
          },
        ],
      },
      recovery: {
        id: 'recovery',
        title: 'Regeneráció és helyreállítás',
        icon: 'icon-recovery',
        description: 'Alvásminőség, autonóm idegrendszer és aktív szöveti regeneráció.',
        submodules: [
          {
            title: 'Alvásminták és alváshigiénia',
            desc: 'Mély- és REM-fázisok, cirkadián ritmus és cirkadián fényprotokollok.',
          },
          {
            title: 'Fizioterápia és aktív regeneráció',
            desc: 'Nyirokkeringés serkentése, myofasciális lazítás és szaunaprotokollok.',
          },
          {
            title: 'Idegrendszeri mérések',
            desc: 'HRV trendek, tap-test és szimpatikus-paraszimpatikus egyensúly.',
          },
        ],
      },
      nutrition: {
        id: 'nutrition',
        title: 'Táplálkozás és hidratáció',
        icon: 'icon-nutrition',
        description: 'Tápanyag-időzítés, sejt-szintű hidratáció és célzott mikrotápanyagok.',
        submodules: [
          {
            title: 'Makrotápanyag-periodizáció',
            desc: 'Szénhidrát- és fehérjebevitel ciklikus igazítása az edzésnapokhoz.',
          },
          {
            title: 'Hidratáció és elektrolit-háztartás',
            desc: 'Nátrium-, kálium- és magnéziumveszteség pótlása izzadási ráta alapján.',
          },
          {
            title: 'Célzott kiegészítés',
            desc: 'Kreatin, béta-alanin, omega-3 és sportági mikrotápanyag-protokollok.',
          },
        ],
      },
      mental: {
        id: 'mental',
        title: 'Mentális és pszichológiai felkészülés',
        icon: 'icon-mental',
        description: 'Fókusz, reziliencia, stresszkezelés és flow-állapot előidézése.',
        submodules: [
          {
            title: 'Csúcsteljesítmény-állapot (Flow / Zone)',
            desc: 'Rituálék, fókuszhorgonyok és optimális arousal-szint beállítása.',
          },
          {
            title: 'Monotónia-tűrés és fájdalomkezelés',
            desc: 'Kognitív átkeretezés és magas intenzitású diszkomfort-tűrés.',
          },
          {
            title: 'Érzelmi szabályozás',
            desc: 'Verseny előtti szorongáscsökkentés és mentális reziliencia-gyakorlatok.',
          },
          {
            title: 'Légzés- és meditációs protokollok',
            desc: 'Fiziológiai sóhaj, box-breathing és autonóm lecsillapítás.',
          },
        ],
      },
    },
  },
  journal: {
    title: 'Journal',
    views: {
      list: 'Lista',
      calendar: 'Naptár',
    },
    emptyTitle: 'Még nincs bejegyzés',
    emptyDesc: 'Rögzítsd a napi edzéseidet, alvásminőségedet és szubjektív érzéseidet a fejlődésed követéséhez.',
    newActivityBtn: '+ Új activity',
  },
  more: {
    title: 'More',
    sections: {
      settings: 'Beállítások',
      features: 'Funkciók és fiók',
    },
    appearance: 'Megjelenés',
    appearanceDesc: 'Rendszerszintű, sötét vagy világos felület beállítása',
    themes: {
      auto: 'Auto',
      dark: 'Sötét',
      light: 'Világos',
    },
    mode: 'Mód',
    modeDesc: 'Sportolói profil és célkitűzés fókusza',
    language: 'Nyelv',
    languageDesc: 'Felhasználói felület nyelve',
    langValue: 'Magyar',
    version: 'Verzió',
    versionValue: '0.1.0',
    menu: {
      profile: 'Profil',
      devices: 'Eszközök és szinkron',
      privacy: 'Adatvédelem',
      team: 'Csapat',
      notifications: 'Értesítések',
      help: 'Súgó',
    },
  },
};

/**
 * Támogatott felhasználói módok konfigurációja.
 * A fül- és pillér-feliratok, valamint láthatóságuk ebből fakad.
 */
export const MODES = {
  athlete: {
    id: 'athlete',
    name: 'Athlete',
    label: 'Athlete mód',
    available: true,
    tabs: ['home', 'lab', 'journal', 'more'],
    pillars: ['physical', 'recovery', 'nutrition', 'mental'],
  },
  junior: {
    id: 'junior',
    name: 'Junior',
    label: 'Junior mód',
    available: false,
    tabs: ['home', 'lab', 'journal', 'more'],
    pillars: ['physical', 'recovery', 'nutrition', 'mental'],
  },
  longevity: {
    id: 'longevity',
    name: 'Longevity',
    label: 'Longevity mód',
    available: false,
    tabs: ['home', 'lab', 'journal', 'more'],
    pillars: ['physical', 'recovery', 'nutrition', 'mental'],
  },
};


/* ==========================================================================
   2. ALKALMAZÁS ÁLLAPOTA (STATE) / APPLICATION STATE
   ========================================================================== */

export const state = {
  mode: 'athlete',
  currentRoute: 'home',
  currentPillar: null,
  themeSetting: 'auto', // 'auto' | 'dark' | 'light'
  resolvedTheme: 'dark', // 'dark' | 'light'
  journalView: 'list', // 'list' | 'calendar'
  activeChip: 'history', // 'history' | 'team' | 'reference'
};


/* ==========================================================================
   3. TÉMAKEZELÉS ÉS MENTÉS / THEME MANAGEMENT
   ========================================================================== */

/**
 * Kiszámítja a tényleges témát a beállítás és a rendszer preferenciája alapján.
 */
function resolveTheme(setting) {
  if (setting === 'auto') {
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    return prefersLight ? 'light' : 'dark';
  }
  return setting === 'light' ? 'light' : 'dark';
}

/**
 * Frissíti a DOM elemeket a beállított témának megfelelően.
 */
export function applyTheme(setting) {
  state.themeSetting = setting;
  state.resolvedTheme = resolveTheme(setting);

  // Mentés localStorage-ba hibatűréssel
  try {
    localStorage.setItem('lockin_theme', setting);
  } catch (err) {
    // Tároló nem elérhető (pl. privát mód korlátozás)
  }

  // HTML attribútumok beállítása
  document.documentElement.setAttribute('data-theme', state.resolvedTheme);
  document.documentElement.setAttribute('data-theme-setting', setting);

  // Mobil böngésző fejlécszín frissítése
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', state.resolvedTheme === 'light' ? '#F6F7F9' : '#0A0C0F');
  }

  // Logó képek frissítése a témához
  updateLogos();

  // Ha a More oldalon vagyunk, a szegmentált kapcsoló aktív gombját is frissítjük
  if (state.currentRoute === 'more') {
    updateThemeControlUI();
  }
}

/**
 * Téma inicializálása indításkor
 */
function initTheme() {
  let savedSetting = 'auto';
  try {
    savedSetting = localStorage.getItem('lockin_theme') || 'auto';
  } catch (e) {
    savedSetting = 'auto';
  }
  applyTheme(savedSetting);

  // Rendszerszintű témaváltozás figyelése
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    mediaQuery.addEventListener('change', () => {
      if (state.themeSetting === 'auto') {
        applyTheme('auto');
      }
    });
  }
}


/* ==========================================================================
   4. LOGÓ ÉS HIBAKEZELÉS / LOGO FALLBACK MECHANISM
   ========================================================================== */

/**
 * Betölti a megfelelő témájú logót (.svg -> .png -> szöveges fallback).
 */
export function updateLogos() {
  const logoImages = document.querySelectorAll('[data-logo-img]');
  const isLight = state.resolvedTheme === 'light';
  const baseName = isLight ? 'logo-light-mode' : 'logo-dark-mode';

  logoImages.forEach((img) => {
    let attempt = 0; // 0 = .svg, 1 = .png, 2 = sikertelen

    img.classList.remove('is-loaded');

    img.onload = () => {
      img.classList.add('is-loaded');
    };

    img.onerror = () => {
      if (attempt === 0) {
        attempt = 1;
        img.src = `${baseName}.png`;
      } else {
        attempt = 2;
        img.classList.remove('is-loaded');
        img.removeAttribute('src');
      }
    };

    img.src = `${baseName}.svg`;
  });
}


/* ==========================================================================
   5. ROUTER ÉS NAVIGÁCIÓ / ROUTER & NAVIGATION
   ========================================================================== */

/**
 * Útvonal feldolgozása a hash string alapján.
 */
function parseHash(hash) {
  const cleanHash = (hash || '').trim().toLowerCase();
  
  // Alapértelmezett kezdőlap
  if (!cleanHash || cleanHash === '#' || cleanHash === '#/') {
    return { route: 'home', pillar: null };
  }

  // Pillér aloldal: #/lab/<pillar>
  const pillarMatch = cleanHash.match(/^#\/lab\/([a-z0-9_-]+)$/);
  if (pillarMatch) {
    const pillarId = pillarMatch[1];
    const availablePillars = MODES[state.mode].pillars;
    if (availablePillars.includes(pillarId)) {
      return { route: 'lab', pillar: pillarId };
    }
    return { route: 'lab', pillar: null };
  }

  // Főoldalak: #/home, #/lab, #/journal, #/more
  if (cleanHash === '#/home') return { route: 'home', pillar: null };
  if (cleanHash === '#/lab') return { route: 'lab', pillar: null };
  if (cleanHash === '#/journal') return { route: 'journal', pillar: null };
  if (cleanHash === '#/more') return { route: 'more', pillar: null };

  // Ismeretlen útvonal -> vissza a kezdőlapra
  return { route: 'home', pillar: null };
}

/**
 * Navigálás a megadott hash-re.
 */
export function navigateTo(hash) {
  if (window.location.hash !== hash) {
    window.location.hash = hash;
  } else {
    handleRouteChange();
  }
}

/**
 * Útvonal változás kezelése (hashchange esemény és indulás).
 */
function handleRouteChange() {
  const { route, pillar } = parseHash(window.location.hash);
  state.currentRoute = route;
  state.currentPillar = pillar;

  updateNavigationUI();
  render();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

/**
 * Navigációs sávok aktív állapotainak frissítése (aria-current és osztályok).
 */
function updateNavigationUI() {
  const activeTab = state.currentRoute;

  // Frissítjük a desktop és mobil linkeket
  const navLinks = document.querySelectorAll('[data-nav-route]');
  navLinks.forEach((link) => {
    const route = link.getAttribute('data-nav-route');
    if (route === activeTab) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  // Mód címkék frissítése
  const modeLabels = document.querySelectorAll('[data-mode-label]');
  const currentModeConfig = MODES[state.mode];
  modeLabels.forEach((label) => {
    label.textContent = currentModeConfig.name;
  });
}


/* ==========================================================================
   6. SEGÉDFUNKCIÓK ÉS KOMPONENS GENERÁTOROK / HELPERS & COMPONENTS
   ========================================================================== */

/**
 * SVG Gyűrű generátor helper.
 * 100x100 viewBox, sugár = 42, kerület = ~263.89
 */
function renderSvgRing(value, max, label, subtext, statusText, colorClass, displayValue = null) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius; // ~263.89
  const ratio = Math.max(0, Math.min(1, value / max));
  const offset = circumference * (1 - ratio);
  const formattedVal = displayValue !== null ? displayValue : value;

  return `
    <div class="ring-card">
      <div class="ring-gauge">
        <svg class="ring-svg" viewBox="0 0 100 100" aria-hidden="true">
          <circle class="ring-track" cx="50" cy="50" r="${radius}"></circle>
          <circle
            class="ring-progress ${colorClass}"
            cx="50"
            cy="50"
            r="${radius}"
            stroke-dasharray="${circumference.toFixed(2)}"
            stroke-dashoffset="${offset.toFixed(2)}"
          ></circle>
        </svg>
        <div class="ring-center-content">
          <span class="ring-value tabular-nums">${formattedVal}</span>
          <span class="ring-unit">${subtext}</span>
        </div>
      </div>
      <div class="ring-meta">
        <span class="ring-label">${label}</span>
        <span class="ring-status">${statusText}</span>
      </div>
    </div>
  `;
}

/**
 * Dátum formázása magyar nyelven.
 */
function getFormattedToday() {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('hu-HU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const formatted = formatter.format(now);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  } catch (err) {
    return 'Ma';
  }
}


/* ==========================================================================
   7. OLDALAK RENDERELÉSE / PAGE RENDERERS
   ========================================================================== */

/**
 * HOME oldal megjelenítése
 */
function renderHome() {
  const tHome = T.home;
  const todayString = getFormattedToday();

  return `
    <div class="home-page">
      <!-- Üdvözlés és Fejléc Kártya -->
      <section class="home-greeting-card">
        <div class="greeting-row">
          <div>
            <h1>${tHome.greeting}</h1>
            <p class="home-date">${todayString}</p>
          </div>
          <span class="badge badge-sample">${T.sampleBadge}</span>
        </div>
      </section>

      <!-- Három Gyűrű Szekció -->
      <section class="rings-wrapper" aria-label="Napi mutatók">
        ${renderSvgRing(
          72,
          100,
          tHome.readiness,
          tHome.readinessSub,
          tHome.readinessStatus,
          'ring-readiness',
          '72'
        )}
        ${renderSvgRing(
          11.4,
          21,
          tHome.strain,
          tHome.strainSub,
          tHome.strainStatus,
          'ring-strain',
          '11,4'
        )}
        ${renderSvgRing(
          84,
          100,
          tHome.sleep,
          tHome.sleepSub,
          tHome.sleepStatus,
          'ring-sleep',
          '84%'
        )}
      </section>

      <!-- Miért? Magyarázat Kártya -->
      <section class="card">
        <div class="section-header">
          <h2 class="section-title">
            <svg style="width: 18px; height: 18px; color: var(--accent);" aria-hidden="true"><use href="#icon-info"></use></svg>
            ${tHome.whyTitle}
          </h2>
          <span class="badge badge-sample">${T.sampleBadge}</span>
        </div>
        <p class="text-muted" style="font-size: 0.9375rem; line-height: 1.5;">${tHome.whyText}</p>
      </section>

      <!-- Mai javaslat Kártya -->
      <section class="card" style="border-left: 4px solid var(--accent);">
        <div class="section-header">
          <h2 class="section-title">
            <svg style="width: 18px; height: 18px; color: var(--accent);" aria-hidden="true"><use href="#icon-sparkle"></use></svg>
            ${tHome.suggestionTitle}
          </h2>
          <span class="badge badge-sample">${T.sampleBadge}</span>
        </div>
        <p style="font-size: 0.9375rem; line-height: 1.5;">${tHome.suggestionText}</p>
      </section>

      <!-- Mai teendők Kártya -->
      <section class="card">
        <div class="section-header">
          <h2 class="section-title">${tHome.tasksTitle}</h2>
          <span class="badge badge-sample">${T.sampleBadge}</span>
        </div>
        <div class="tasks-list">
          ${tHome.tasks
            .map(
              (task) => `
            <div class="task-item ${task.completed ? 'completed' : ''}">
              <div class="task-checkbox-mock" aria-hidden="true">
                ${
                  task.completed
                    ? '<svg style="width: 14px; height: 14px;" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>'
                    : ''
                }
              </div>
              <span class="task-text">${task.text}</span>
              <span class="badge badge-sample">${T.sampleBadge}</span>
            </div>
          `
            )
            .join('')}
        </div>
      </section>

      <!-- Három Chipes Összehasonlító Sáv (Vizuális) -->
      <section class="chip-bar" aria-label="Adatösszehasonlítás nézetek">
        <button type="button" class="chip ${state.activeChip === 'history' ? 'active' : ''}" data-chip-id="history">
          ${tHome.chips.history}
        </button>
        <button type="button" class="chip ${state.activeChip === 'team' ? 'active' : ''}" data-chip-id="team">
          ${tHome.chips.team}
        </button>
        <button type="button" class="chip ${state.activeChip === 'reference' ? 'active' : ''}" data-chip-id="reference">
          ${tHome.chips.reference}
        </button>
      </section>
    </div>
  `;
}

/**
 * PERFORMANCE LAB oldal (2x2 rács a 4 pillérrel)
 */
function renderLab() {
  const tLab = T.lab;
  const pillarsConfig = MODES[state.mode].pillars;

  return `
    <div class="lab-page">
      <div class="section-header">
        <div>
          <h1>${tLab.title}</h1>
          <p class="section-subtitle">${tLab.subtitle}</p>
        </div>
        <span class="badge badge-sample">${T.sampleBadge}</span>
      </div>

      <div class="lab-grid">
        ${pillarsConfig
          .map((pillarKey) => {
            const pillar = tLab.pillars[pillarKey];
            if (!pillar) return '';
            const submodulesPreview = pillar.submodules.map((sm) => sm.title).join(' • ');

            return `
              <a href="#/lab/${pillar.id}" class="pillar-card card-clickable" aria-label="${pillar.title} részletek">
                <div class="pillar-header">
                  <div class="pillar-icon-box">
                    <svg class="pillar-icon" aria-hidden="true"><use href="#${pillar.icon}"></use></svg>
                  </div>
                  <span class="badge badge-sample">${T.sampleBadge}</span>
                </div>
                <div>
                  <h2 class="pillar-title">${pillar.title}</h2>
                  <p class="pillar-submodules-preview">${submodulesPreview}</p>
                </div>
                <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 8px;">
                  <span class="text-small text-muted">${pillar.submodules.length} ${tLab.submodulesCount}</span>
                  <svg class="pillar-arrow-icon" aria-hidden="true"><use href="#icon-chevron-right"></use></svg>
                </div>
              </a>
            `;
          })
          .join('')}
      </div>
    </div>
  `;
}

/**
 * Pillér Aloldal megjelenítése (#/lab/<pillar>)
 */
function renderPillar(pillarId) {
  const pillar = T.lab.pillars[pillarId];
  if (!pillar) {
    return `<div class="empty-state"><p>A keresett pillér nem található.</p><a href="#/lab" class="btn btn-secondary">Vissza</a></div>`;
  }

  return `
    <div class="pillar-subpage">
      <div>
        <a href="#/lab" class="btn-back" aria-label="${T.backToLab}">
          <svg class="btn-back-icon" aria-hidden="true"><use href="#icon-arrow-left"></use></svg>
          <span>${T.backToLab}</span>
        </a>
      </div>

      <div class="pillar-hero">
        <div class="section-header">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div class="pillar-icon-box">
              <svg class="pillar-icon" aria-hidden="true"><use href="#${pillar.icon}"></use></svg>
            </div>
            <div>
              <h1>${pillar.title}</h1>
              <p class="section-subtitle">${pillar.description}</p>
            </div>
          </div>
          <span class="badge badge-sample">${T.sampleBadge}</span>
        </div>
      </div>

      <div class="section-header" style="margin-top: 12px;">
        <h2 class="section-title">Almodulok</h2>
        <span class="badge badge-coming-soon">${T.comingSoonBadge}</span>
      </div>

      <div class="submodules-list">
        ${pillar.submodules
          .map(
            (sm) => `
          <div class="submodule-card">
            <div class="submodule-card-header">
              <h3 class="submodule-title">${sm.title}</h3>
              <span class="badge badge-coming-soon">${T.comingSoonBadge}</span>
            </div>
            <p class="submodule-desc">${sm.desc}</p>
            <div style="display: flex; justify-content: flex-end; margin-top: 6px;">
              <span class="badge badge-sample">${T.sampleBadge}</span>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  `;
}

/**
 * JOURNAL oldal megjelenítése
 */
function renderJournal() {
  const tJournal = T.journal;

  return `
    <div class="journal-page">
      <div class="journal-header">
        <div>
          <h1>${tJournal.title}</h1>
          <p class="section-subtitle">Tevékenységek és megfigyelések naplózása</p>
        </div>
        
        <!-- Lista / Naptár Szegmentált Kapcsoló (Vizuális) -->
        <div class="segmented-control" role="tablist" aria-label="Nézet kiválasztása">
          <button
            type="button"
            class="segmented-btn ${state.journalView === 'list' ? 'active' : ''}"
            role="tab"
            aria-selected="${state.journalView === 'list'}"
            data-journal-view="list"
          >
            ${tJournal.views.list}
          </button>
          <button
            type="button"
            class="segmented-btn ${state.journalView === 'calendar' ? 'active' : ''}"
            role="tab"
            aria-selected="${state.journalView === 'calendar'}"
            data-journal-view="calendar"
          >
            ${tJournal.views.calendar}
          </button>
        </div>
      </div>

      <!-- Üres Állapot Komponens -->
      <div class="empty-state">
        <svg class="empty-state-icon" aria-hidden="true"><use href="#icon-empty"></use></svg>
        <h2 class="empty-state-title">${tJournal.emptyTitle}</h2>
        <p class="empty-state-desc">${tJournal.emptyDesc}</p>
        <button
          type="button"
          class="btn btn-primary"
          aria-disabled="true"
          disabled
        >
          <svg style="width: 18px; height: 18px;" aria-hidden="true"><use href="#icon-plus"></use></svg>
          ${tJournal.newActivityBtn}
        </button>
      </div>
    </div>
  `;
}

/**
 * MORE oldal megjelenítése
 */
function renderMore() {
  const tMore = T.more;

  return `
    <div class="more-page">
      <div>
        <h1>${tMore.title}</h1>
        <p class="section-subtitle">Beállítások, profil és rendszerinformációk</p>
      </div>

      <!-- Beállítások szekció -->
      <div class="settings-group">
        <div class="section-header">
          <h2 class="section-title">${tMore.sections.settings}</h2>
        </div>

        <div class="settings-card">
          <!-- Megjelenés Beállítás (Működő!) -->
          <div class="settings-item">
            <div>
              <div class="settings-item-title">${tMore.appearance}</div>
              <div class="settings-item-desc">${tMore.appearanceDesc}</div>
            </div>
            <div class="segmented-control" role="group" aria-label="${tMore.appearance}">
              <button
                type="button"
                class="segmented-btn ${state.themeSetting === 'auto' ? 'active' : ''}"
                data-theme-btn="auto"
              >
                ${tMore.themes.auto}
              </button>
              <button
                type="button"
                class="segmented-btn ${state.themeSetting === 'dark' ? 'active' : ''}"
                data-theme-btn="dark"
              >
                ${tMore.themes.dark}
              </button>
              <button
                type="button"
                class="segmented-btn ${state.themeSetting === 'light' ? 'active' : ''}"
                data-theme-btn="light"
              >
                ${tMore.themes.light}
              </button>
            </div>
          </div>

          <hr style="border: none; border-top: 1px solid var(--border-subtle);">

          <!-- Mód választás (Athlete aktív, Junior/Longevity szürkítve) -->
          <div class="settings-item">
            <div>
              <div class="settings-item-title">${tMore.mode}</div>
              <div class="settings-item-desc">${tMore.modeDesc}</div>
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <span class="chip active">${MODES.athlete.name}</span>
              <span class="chip" style="opacity: 0.55; cursor: not-allowed;">
                ${MODES.junior.name} <span class="badge badge-coming-soon" style="margin-left: 6px;">${T.comingSoonBadge}</span>
              </span>
              <span class="chip" style="opacity: 0.55; cursor: not-allowed;">
                ${MODES.longevity.name} <span class="badge badge-coming-soon" style="margin-left: 6px;">${T.comingSoonBadge}</span>
              </span>
            </div>
          </div>

          <hr style="border: none; border-top: 1px solid var(--border-subtle);">

          <!-- Nyelv -->
          <div class="settings-item">
            <div>
              <div class="settings-item-title">${tMore.language}</div>
              <div class="settings-item-desc">${tMore.languageDesc}</div>
            </div>
            <div class="badge" style="background: var(--surface-2); color: var(--text); border: 1px solid var(--border); font-size: 0.85rem; padding: 6px 12px;">
              ${tMore.langValue}
            </div>
          </div>

          <hr style="border: none; border-top: 1px solid var(--border-subtle);">

          <!-- Verzió -->
          <div class="settings-item">
            <div>
              <div class="settings-item-title">${tMore.version}</div>
              <div class="settings-item-desc">Alkalmazás build és kiadás</div>
            </div>
            <span class="tabular-nums text-muted" style="font-weight: 600;">${tMore.versionValue}</span>
          </div>
        </div>
      </div>

      <!-- Funkciók és fiók (Hamarosan sorok) -->
      <div class="settings-group">
        <div class="section-header">
          <h2 class="section-title">${tMore.sections.features}</h2>
        </div>

        <div class="menu-list" role="list">
          ${[
            tMore.menu.profile,
            tMore.menu.devices,
            tMore.menu.privacy,
            tMore.menu.team,
            tMore.menu.notifications,
            tMore.menu.help,
          ]
            .map(
              (itemText) => `
            <div class="menu-item" role="listitem">
              <span>${itemText}</span>
              <div class="menu-item-action">
                <span class="badge badge-coming-soon">${T.comingSoonBadge}</span>
                <svg style="width: 16px; height: 16px; color: var(--text-muted);" aria-hidden="true"><use href="#icon-chevron-right"></use></svg>
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    </div>
  `;
}

/**
 * Téma szegmentált kapcsoló aktív állapotának frissítése a More oldalon.
 */
function updateThemeControlUI() {
  const themeButtons = document.querySelectorAll('[data-theme-btn]');
  themeButtons.forEach((btn) => {
    const val = btn.getAttribute('data-theme-btn');
    if (val === state.themeSetting) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

/**
 * Eseményfigyelők felcsatolása a renderelt nézethez.
 */
function attachViewEventListeners() {
  // More oldal téma gombok
  const themeButtons = document.querySelectorAll('[data-theme-btn]');
  themeButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const selectedTheme = e.currentTarget.getAttribute('data-theme-btn');
      applyTheme(selectedTheme);
    });
  });

  // Home oldal chip gombok
  const chipButtons = document.querySelectorAll('[data-chip-id]');
  chipButtons.forEach((chip) => {
    chip.addEventListener('click', (e) => {
      state.activeChip = e.currentTarget.getAttribute('data-chip-id');
      chipButtons.forEach((c) => c.classList.remove('active'));
      e.currentTarget.classList.add('active');
    });
  });

  // Journal lista / naptár kapcsoló
  const journalViewButtons = document.querySelectorAll('[data-journal-view]');
  journalViewButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const selectedView = e.currentTarget.getAttribute('data-journal-view');
      state.journalView = selectedView;
      journalViewButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      e.currentTarget.classList.add('active');
      e.currentTarget.setAttribute('aria-selected', 'true');
    });
  });
}

/**
 * Fő Render függvény: a state alapján újraépíti a nézetet.
 */
export function render() {
  const container = document.getElementById('app-view');
  if (!container) return;

  let htmlContent = '';

  if (state.currentRoute === 'home') {
    htmlContent = renderHome();
  } else if (state.currentRoute === 'lab') {
    if (state.currentPillar) {
      htmlContent = renderPillar(state.currentPillar);
    } else {
      htmlContent = renderLab();
    }
  } else if (state.currentRoute === 'journal') {
    htmlContent = renderJournal();
  } else if (state.currentRoute === 'more') {
    htmlContent = renderMore();
  } else {
    htmlContent = renderHome();
  }

  container.innerHTML = htmlContent;
  attachViewEventListeners();
}


/* ==========================================================================
   8. ALKALMAZÁS INICIALIZÁLÁSA / INITIALIZATION
   ========================================================================== */

function init() {
  initTheme();
  window.addEventListener('hashchange', handleRouteChange);
  handleRouteChange();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
