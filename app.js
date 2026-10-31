/* ==========================================================================
   0. FIREBASE IMPORT ÉS KONFIGURÁCIÓ (ES MODULOK) / FIREBASE INTEGRATION
   ========================================================================== */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCtgQahhvHCzXBo-RR_yjATWh8ZmLF7SnQ',
  authDomain: 'lockin-37a53.firebaseapp.com',
  projectId: 'lockin-37a53',
  storageBucket: 'lockin-37a53.firebasestorage.app',
  messagingSenderId: '101347204648',
  appId: '1:101347204648:web:2f6048497c01bda0511f1d',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

/* ==========================================================================
   1. KONFIGURÁCIÓ ÉS SZÖVEGEK (T LOKALIZÁCIÓ) / CONFIGURATION & STRINGS
   ========================================================================== */

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
  auth: {
    loginTab: 'Belépés', registerTab: 'Regisztráció',
    emailLabel: 'E-mail-cím', emailPlaceholder: 'sportolo@lockin.hu',
    passwordLabel: 'Jelszó', passwordPlaceholder: '••••••••',
    showPassword: 'Mutat', hidePassword: 'Elrejt',
    forgotPasswordLink: 'Elfelejtett jelszó?',
    loginBtn: 'Belépés', registerBtn: 'Fiók létrehozása',
    passwordMinHint: 'Legalább 8 karakter szükséges',
    ageCheckbox: 'Elmúltam 18 éves',
    ageInfo: 'A Junior mód később érhető el, gondviselői hozzájárulással.',
    ageRequiredWarning: 'A regisztrációhoz a 18. életév betöltése kötelező.',
    resetTitle: 'Jelszó visszaállítása',
    resetDesc: 'Add meg a regisztrált e-mail-címed, és küldünk egy linket az új jelszó megadásához.',
    sendResetBtn: 'Visszaállító link küldése',
    resetSentSuccess: 'A jelszó-visszaállító linket elküldtük az e-mail-címedre!',
    backToLogin: 'Vissza a belépéshez',
  },
  onboarding: {
    title: 'Hogy hívjunk?',
    desc: 'Add meg a sportolói neved vagy beceneved, amivel a Lockinban látni szeretnéd magad.',
    nameLabel: 'Sportolói név',
    namePlaceholder: 'pl. Kovács Bence',
    nameValidation: 'A név hossza 1 és 60 karakter között lehet.',
    submitBtn: 'Mentés és indítás',
  },
  verification: {
    bannerTitle: 'Erősítsd meg az e-mail-címed',
    bannerDesc: 'A fiókod védelmében kattints a megadott címre küldött megerősítő linkre.',
    resendBtn: 'Újraküldés',
    resentSuccess: 'Megerősítő levél elküldve!',
    statusVerified: 'Megerősítve',
    statusPending: 'Megerősítésre vár',
  },
  profile: {
    title: 'Sportolói profil',
    backToMore: 'Vissza a beállításokhoz',
    emailLabel: 'Regisztrált e-mail-cím',
    nameLabel: 'Sportolói név',
    saveNameBtn: 'Név mentése',
    savedSuccess: 'A profil sikeresen mentve!',
    signOutBtn: 'Kijelentkezés',
    deleteAccount: 'Fiók és adatok törlése',
  },
  home: {
    greeting: 'Szia!',
    readiness: 'Készenlét', readinessSub: '/ 100', readinessStatus: 'Magas készenlét',
    strain: 'Terhelés', strainSub: '0–21 skála', strainStatus: 'Közepes terhelés',
    sleep: 'Alvás', sleepSub: '84% minőség', sleepStatus: 'Megfelelő regeneráció',
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
    chips: { history: 'Saját múlt', team: 'Csapat', reference: 'Referencia' },
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
          { title: 'Energiarendszerek és állóképesség', desc: 'VO2max protokollok, laktátküszöb zónák és aerob alapozás tervezése.' },
          { title: 'Erő és neuromuszkuláris adaptáció', desc: 'Maximális erő, robbanékonyság és Rate of Force Development (RFD).' },
          { title: 'Technika és biomechanika', desc: 'Mozgásminták videoelemzése és energiahatékony végrehajtás.' },
          { title: 'Periodizáció', desc: 'Mikro-, mezo- és makrociklusok hangolása a versenycélokhoz.' },
        ],
      },
      recovery: {
        id: 'recovery',
        title: 'Regeneráció és helyreállítás',
        icon: 'icon-recovery',
        description: 'Alvásminőség, autonóm idegrendszer és aktív szöveti regeneráció.',
        submodules: [
          { title: 'Alvásminták és alváshigiénia', desc: 'Mély- és REM-fázisok, cirkadián ritmus és cirkadián fényprotokollok.' },
          { title: 'Fizioterápia és aktív regeneráció', desc: 'Nyirokkeringés serkentése, myofasciális lazítás és szaunaprotokollok.' },
          { title: 'Idegrendszeri mérések', desc: 'HRV trendek, tap-test és szimpatikus-paraszimpatikus egyensúly.' },
        ],
      },
      nutrition: {
        id: 'nutrition',
        title: 'Táplálkozás és hidratáció',
        icon: 'icon-nutrition',
        description: 'Tápanyag-időzítés, sejt-szintű hidratáció és célzott mikrotápanyagok.',
        submodules: [
          { title: 'Makrotápanyag-periodizáció', desc: 'Szénhidrát- és fehérjebevitel ciklikus igazítása az edzésnapokhoz.' },
          { title: 'Hidratáció és elektrolit-háztartás', desc: 'Nátrium-, kálium- és magnéziumveszteség pótlása izzadási ráta alapján.' },
          { title: 'Célzott kiegészítés', desc: 'Kreatin, béta-alanin, omega-3 és sportági mikrotápanyag-protokollok.' },
        ],
      },
      mental: {
        id: 'mental',
        title: 'Mentális és pszichológiai felkészülés',
        icon: 'icon-mental',
        description: 'Fókusz, reziliencia, stresszkezelés és flow-állapot előidézése.',
        submodules: [
          { title: 'Csúcsteljesítmény-állapot (Flow / Zone)', desc: 'Rituálék, fókuszhorgonyok és optimális arousal-szint beállítása.' },
          { title: 'Monotónia-tűrés és fájdalomkezelés', desc: 'Kognitív átkeretezés és magas intenzitású diszkomfort-tűrés.' },
          { title: 'Érzelmi szabályozás', desc: 'Verseny előtti szorongáscsökkentés és mentális reziliencia-gyakorlatok.' },
          { title: 'Légzés- és meditációs protokollok', desc: 'Fiziológiai sóhaj, box-breathing és autonóm lecsillapítás.' },
        ],
      },
    },
  },
  journal: {
    title: 'Journal',
    views: { list: 'Lista', calendar: 'Naptár' },
    emptyTitle: 'Még nincs bejegyzés',
    emptyDesc: 'Rögzítsd a napi edzéseidet, alvásminőségedet és szubjektív érzéseidet a fejlődésed követéséhez.',
    newActivityBtn: '+ Új activity',
  },
  more: {
    title: 'More',
    sections: { settings: 'Beállítások', features: 'Funkciók és fiók' },
    appearance: 'Megjelenés',
    appearanceDesc: 'Rendszerszintű, sötét vagy világos felület beállítása',
    themes: { auto: 'Auto', dark: 'Sötét', light: 'Világos' },
    mode: 'Mód',
    modeDesc: 'Sportolói profil és célkitűzés fókusza',
    language: 'Nyelv',
    languageDesc: 'Felhasználói felület nyelve',
    langValue: 'Magyar',
    version: 'Verzió',
    versionValue: '0.2.0',
    menu: {
      profile: 'Profil',
      devices: 'Eszközök és szinkron',
      privacy: 'Adatvédelem',
      team: 'Csapat',
      notifications: 'Értesítések',
      help: 'Súgó',
    },
  },
  errors: {
    invalidCredential: 'Helytelen e-mail-cím vagy jelszó. Kérjük, ellenőrizd az adataidat!',
    emailInUse: 'Ezzel az e-mail-címmel már létezik regisztráció. Jelentkezz be, vagy kérj új jelszót!',
    weakPassword: 'A jelszó túl gyenge. Kérjük, használj legalább 8 karaktert!',
    invalidEmail: 'Érvénytelen e-mail-cím formátum.',
    tooManyRequests: 'Túl sok sikertelen kísérlet. Kérjük, próbáld újra pár perc múlva!',
    networkFailed: 'Hálózati hiba történt. Kérjük, ellenőrizd az internetkapcsolatodat!',
    general: 'Váratlan hiba történt. Kérjük, próbáld újra később!',
  },
};

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
  themeSetting: 'auto',
  resolvedTheme: 'dark',
  journalView: 'list',
  activeChip: 'history',

  // Hitelesítési és felhasználói profil állapotok
  authState: 'loading', // 'loading' | 'unauthenticated' | 'onboarding' | 'authenticated'
  currentUser: null,
  userProfile: null,
  authTab: 'login', // 'login' | 'register' | 'forgot'
  authError: null,
  authSuccess: null,
};

/* ==========================================================================
   3. HIBAKEZELÉS ÉS BIZTONSÁG / ERROR HANDLING & SECURITY
   ========================================================================== */

export function getFriendlyErrorMessage(err) {
  const code = typeof err === 'string' ? err : err?.code;
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return T.errors.invalidCredential;
    case 'auth/email-already-in-use':
      return T.errors.emailInUse;
    case 'auth/weak-password':
      return T.errors.weakPassword;
    case 'auth/invalid-email':
      return T.errors.invalidEmail;
    case 'auth/too-many-requests':
      return T.errors.tooManyRequests;
    case 'auth/network-request-failed':
      return T.errors.networkFailed;
    default:
      return err?.message && !err?.message.includes('auth/') ? err.message : T.errors.general;
  }
}

/* ==========================================================================
   4. TÉMAKEZELÉS ÉS MENTÉS / THEME MANAGEMENT
   ========================================================================== */

function resolveTheme(setting) {
  if (setting === 'auto') {
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    return prefersLight ? 'light' : 'dark';
  }
  return setting === 'light' ? 'light' : 'dark';
}

export function applyTheme(setting) {
  state.themeSetting = setting;
  state.resolvedTheme = resolveTheme(setting);

  try {
    localStorage.setItem('lockin_theme', setting);
  } catch (err) {}

  document.documentElement.setAttribute('data-theme', state.resolvedTheme);
  document.documentElement.setAttribute('data-theme-setting', setting);

  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', state.resolvedTheme === 'light' ? '#F6F7F9' : '#0A0C0F');
  }

  updateLogos();

  if (state.currentRoute === 'more') {
    updateThemeControlUI();
  }
}

function initTheme() {
  let savedSetting = 'auto';
  try {
    savedSetting = localStorage.getItem('lockin_theme') || 'auto';
  } catch (e) {
    savedSetting = 'auto';
  }
  applyTheme(savedSetting);

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
      if (state.themeSetting === 'auto') {
        applyTheme('auto');
      }
    });
  }
}

/* ==========================================================================
   5. LOGÓ ÉS HIBAKEZELÉS / LOGO FALLBACK MECHANISM
   ========================================================================== */

export function updateLogos() {
  const logoImages = document.querySelectorAll('[data-logo-img]');
  const isLight = state.resolvedTheme === 'light';
  const baseName = isLight ? 'logo-light-mode' : 'logo-dark-mode';

  logoImages.forEach((img) => {
    let attempt = 0;
    img.classList.remove('is-loaded');

    img.onload = () => img.classList.add('is-loaded');
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
   6. HITELESÍTÉS ÉS FIÓKKEZELÉS / AUTH & ACCOUNT LOGIC
   ========================================================================== */

function initAuth() {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      state.currentUser = null;
      state.userProfile = null;
      state.authState = 'unauthenticated';
      updateLayoutMode();
      render();
      return;
    }

    state.currentUser = user;

    try {
      const userRef = doc(db, 'users', user.uid);
      const snap = await getDoc(userRef);

      if (snap.exists() && snap.data().displayName) {
        state.userProfile = snap.data();
        state.authState = 'authenticated';
      } else {
        state.userProfile = snap.exists() ? snap.data() : null;
        state.authState = 'onboarding';
      }
    } catch (err) {
      if (user.displayName) {
        state.userProfile = { displayName: user.displayName, mode: 'athlete', language: 'hu' };
        state.authState = 'authenticated';
      } else {
        state.authState = 'onboarding';
      }
    }

    updateLayoutMode();
    render();
  });
}

function updateLayoutMode() {
  const appLayout = document.querySelector('.app-layout');
  if (!appLayout) return;

  if (state.authState === 'authenticated') {
    appLayout.classList.remove('auth-mode');
  } else {
    appLayout.classList.add('auth-mode');
  }
}

async function handleLogin(email, password) {
  state.authError = null;
  state.authSuccess = null;
  try {
    await signInWithEmailAndPassword(auth, email.trim(), password);
  } catch (err) {
    state.authError = getFriendlyErrorMessage(err);
    render();
  }
}

async function handleRegister(email, password, ageConfirmed) {
  state.authError = null;
  state.authSuccess = null;

  if (!ageConfirmed) {
    state.authError = T.auth.ageRequiredWarning;
    render();
    return;
  }

  if (password.length < 8) {
    state.authError = T.auth.weakPassword;
    render();
    return;
  }

  try {
    const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
    try {
      await sendEmailVerification(cred.user);
    } catch (mailErr) {}
  } catch (err) {
    state.authError = getFriendlyErrorMessage(err);
    render();
  }
}

async function handleForgotPassword(email) {
  state.authError = null;
  state.authSuccess = null;

  if (!email || !email.includes('@')) {
    state.authError = T.errors.invalidEmail;
    render();
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email.trim());
    state.authSuccess = T.auth.resetSentSuccess;
    render();
  } catch (err) {
    state.authError = getFriendlyErrorMessage(err);
    render();
  }
}

async function handleSaveOnboarding(name) {
  const trimmed = (name || '').trim();
  if (!trimmed || trimmed.length < 1 || trimmed.length > 60) {
    state.authError = T.onboarding.nameValidation;
    render();
    return;
  }

  try {
    const uid = state.currentUser.uid;
    const userRef = doc(db, 'users', uid);

    const profileData = {
      displayName: trimmed,
      mode: 'athlete',
      language: 'hu',
      ageConfirmed18: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(userRef, profileData, { merge: true });
    await updateProfile(state.currentUser, { displayName: trimmed });

    state.userProfile = profileData;
    state.authState = 'authenticated';
    state.authError = null;
    navigateTo('#/home');
  } catch (err) {
    state.authError = getFriendlyErrorMessage(err);
    render();
  }
}

async function handleUpdateProfileName(newName) {
  const trimmed = (newName || '').trim();
  if (!trimmed || trimmed.length < 1 || trimmed.length > 60) {
    showProfileFeedback(T.onboarding.nameValidation, true);
    return;
  }

  try {
    const uid = state.currentUser.uid;
    const userRef = doc(db, 'users', uid);

    await updateDoc(userRef, {
      displayName: trimmed,
      updatedAt: serverTimestamp(),
    });
    await updateProfile(state.currentUser, { displayName: trimmed });

    if (!state.userProfile) state.userProfile = {};
    state.userProfile.displayName = trimmed;

    showProfileFeedback(T.profile.savedSuccess, false);
  } catch (err) {
    showProfileFeedback(getFriendlyErrorMessage(err), true);
  }
}

function showProfileFeedback(msg, isError) {
  const alertEl = document.getElementById('profile-feedback-box');
  if (!alertEl) return;
  alertEl.textContent = msg;
  alertEl.className = isError ? 'form-error-alert' : 'form-success-alert';
  alertEl.style.display = 'block';
}

async function handleResendVerification(btnEl) {
  if (!state.currentUser) return;
  try {
    if (btnEl) btnEl.disabled = true;
    await sendEmailVerification(state.currentUser);
    if (btnEl) btnEl.textContent = T.verification.resentSuccess;
  } catch (err) {
    if (btnEl) {
      btnEl.disabled = false;
      btnEl.textContent = 'Hiba az újraküldéskor';
    }
  }
}

async function handleSignOut() {
  try {
    await signOut(auth);
    state.currentRoute = 'home';
    state.currentPillar = null;
    window.location.hash = '';
  } catch (err) {}
}

/* ==========================================================================
   7. ROUTER ÉS NAVIGÁCIÓ / ROUTER & NAVIGATION
   ========================================================================== */

function parseHash(hash) {
  const cleanHash = (hash || '').trim().toLowerCase();

  if (!cleanHash || cleanHash === '#' || cleanHash === '#/') {
    return { route: 'home', pillar: null };
  }

  const pillarMatch = cleanHash.match(/^#\/lab\/([a-z0-9_-]+)$/);
  if (pillarMatch) {
    const pillarId = pillarMatch[1];
    if (MODES[state.mode].pillars.includes(pillarId)) {
      return { route: 'lab', pillar: pillarId };
    }
    return { route: 'lab', pillar: null };
  }

  if (cleanHash === '#/more/profile') return { route: 'more', pillar: 'profile' };
  if (cleanHash === '#/home') return { route: 'home', pillar: null };
  if (cleanHash === '#/lab') return { route: 'lab', pillar: null };
  if (cleanHash === '#/journal') return { route: 'journal', pillar: null };
  if (cleanHash === '#/more') return { route: 'more', pillar: null };

  return { route: 'home', pillar: null };
}

export function navigateTo(hash) {
  if (window.location.hash !== hash) {
    window.location.hash = hash;
  } else {
    handleRouteChange();
  }
}

function handleRouteChange() {
  const { route, pillar } = parseHash(window.location.hash);
  state.currentRoute = route;
  state.currentPillar = pillar;

  updateNavigationUI();
  render();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function updateNavigationUI() {
  const activeTab = state.currentRoute;
  const navLinks = document.querySelectorAll('[data-nav-route]');

  navLinks.forEach((link) => {
    const route = link.getAttribute('data-nav-route');
    if (route === activeTab) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  const modeLabels = document.querySelectorAll('[data-mode-label]');
  const currentModeConfig = MODES[state.mode];
  modeLabels.forEach((label) => {
    label.textContent = currentModeConfig.name;
  });
}

/* ==========================================================================
   8. KOMPONENS GENERÁTOROK / COMPONENT GENERATORS
   ========================================================================== */

function renderSvgRing(value, max, label, subtext, statusText, colorClass, displayValue = null) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const ratio = Math.max(0, Math.min(1, value / max));
  const offset = circumference * (1 - ratio);
  const formattedVal = displayValue !== null ? displayValue : value;

  return `
    <div class="ring-card">
      <div class="ring-gauge">
        <svg class="ring-svg" viewBox="0 0 100 100" aria-hidden="true">
          <circle class="ring-track" cx="50" cy="50" r="${radius}"></circle>
          <circle class="ring-progress ${colorClass}" cx="50" cy="50" r="${radius}" stroke-dasharray="${circumference.toFixed(2)}" stroke-dashoffset="${offset.toFixed(2)}" ></circle>
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

function renderEmailVerificationBanner() {
  if (!state.currentUser || state.currentUser.emailVerified) return '';

  return `
    <div class="verification-banner" role="alert">
      <div class="verification-banner-content">
        <svg class="verification-banner-icon" aria-hidden="true"><use href="#icon-info"></use></svg>
        <div class="verification-banner-text">
          <span class="verification-banner-title">${T.verification.bannerTitle}</span>
          <span class="verification-banner-desc">${T.verification.bannerDesc}</span>
        </div>
      </div>
      <button type="button" class="btn btn-secondary btn-sm" id="btn-resend-verification"> ${T.verification.resendBtn} </button>
    </div>
  `;
}

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
   9. HITELESÍTÉSI ÉS ONBOARDING NÉZETEK / AUTH & ONBOARDING VIEWS
   ========================================================================== */

function renderLoading() {
  return `
    <div class="loading-screen" role="status" aria-live="polite">
      <div class="spinner" aria-hidden="true"></div>
      <p class="text-muted">Lockin betöltése...</p>
    </div>
  `;
}

function renderAuth() {
  const tAuth = T.auth;
  const isForgot = state.authTab === 'forgot';
  const isRegister = state.authTab === 'register';

  if (isForgot) {
    return `
      <div class="auth-card">
        <div class="auth-brand-wrap">
          <div class="brand-logo-container">
            <img class="brand-logo-img" alt="Lockin" data-logo-img />
            <span class="brand-wordmark" data-logo-wordmark>Lockin</span>
          </div>
          <h1 style="font-size: 1.25rem; font-weight: 700; margin-top: 8px;">${tAuth.resetTitle}</h1>
          <p class="auth-tagline">${tAuth.resetDesc}</p>
        </div>

        ${state.authError ? `<div class="form-error-alert" role="alert">${state.authError}</div>` : ''}
        ${state.authSuccess ? `<div class="form-success-alert" role="alert">${state.authSuccess}</div>` : ''}

        <form id="form-forgot-pwd">
          <div class="form-group">
            <label for="forgot-email" class="form-label">${tAuth.emailLabel}</label>
            <input type="email" id="forgot-email" class="form-input" required autocomplete="email" placeholder="${tAuth.emailPlaceholder}">
          </div>
          <button type="submit" class="btn btn-primary btn-block">${tAuth.sendResetBtn}</button>
          <div style="text-align: center; margin-top: 16px;">
            <button type="button" class="btn-text-link" id="btn-back-to-login">${tAuth.backToLogin}</button>
          </div>
        </form>
      </div>
    `;
  }

  return `
    <div class="auth-card">
      <div class="auth-brand-wrap">
        <div class="brand-logo-container">
          <img class="brand-logo-img" alt="Lockin" data-logo-img />
          <span class="brand-wordmark" data-logo-wordmark>Lockin</span>
        </div>
        <p class="auth-tagline">${T.tagline}</p>
      </div>

      <div class="segmented-control auth-segmented" role="tablist">
        <button type="button" class="segmented-btn ${!isRegister ? 'active' : ''}" role="tab" id="tab-btn-login" > ${tAuth.loginTab} </button>
        <button type="button" class="segmented-btn ${isRegister ? 'active' : ''}" role="tab" id="tab-btn-register" > ${tAuth.registerTab} </button>
      </div>

      ${state.authError ? `<div class="form-error-alert" role="alert">${state.authError}</div>` : ''}
      ${state.authSuccess ? `<div class="form-success-alert" role="alert">${state.authSuccess}</div>` : ''}

      <form id="form-auth">
        <div class="form-group">
          <label for="auth-email" class="form-label">${tAuth.emailLabel}</label>
          <input type="email" id="auth-email" class="form-input" required autocomplete="email" placeholder="${tAuth.emailPlaceholder}">
        </div>

        <div class="form-group">
          <label for="auth-password" class="form-label">${tAuth.passwordLabel}</label>
          <div class="password-input-wrap">
            <input type="password" id="auth-password" class="form-input" required minlength="${isRegister ? '8' : '6'}" autocomplete="${isRegister ? 'new-password' : 'current-password'}" placeholder="${tAuth.passwordPlaceholder}" >
            <button type="button" class="btn-toggle-password" id="btn-toggle-pwd" aria-label="Jelszó mutatása">
              <span id="pwd-toggle-text">${tAuth.showPassword}</span>
            </button>
          </div>
          ${isRegister ? `<span class="form-hint">${tAuth.passwordMinHint}</span>` : ''}
        </div>

        ${
          isRegister
            ? `
          <div class="form-checkbox-wrap">
            <label class="form-checkbox-label">
              <input type="checkbox" id="auth-age-check" class="form-checkbox" required>
              <span>${tAuth.ageCheckbox}</span>
            </label>
            <p class="form-checkbox-info">${tAuth.ageInfo}</p>
          </div>
        `
            : ''
        }

        <button type="submit" class="btn btn-primary btn-block"> ${isRegister ? tAuth.registerBtn : tAuth.loginBtn} </button>

        ${
          !isRegister
            ? `
          <div style="text-align: center; margin-top: 14px;">
            <button type="button" class="btn-text-link" id="link-forgot-pwd">${tAuth.forgotPasswordLink}</button>
          </div>
        `
            : ''
        }
      </form>
    </div>
  `;
}

function renderOnboarding() {
  const tOnb = T.onboarding;

  return `
    <div class="auth-card">
      <div class="auth-brand-wrap">
        <div class="brand-logo-container">
          <img class="brand-logo-img" alt="Lockin" data-logo-img />
          <span class="brand-wordmark" data-logo-wordmark>Lockin</span>
        </div>
        <h1 style="font-size: 1.35rem; font-weight: 700; margin-top: 10px;">${tOnb.title}</h1>
        <p class="auth-tagline">${tOnb.desc}</p>
      </div>

      ${state.authError ? `<div class="form-error-alert" role="alert">${state.authError}</div>` : ''}

      <form id="form-onboarding">
        <div class="form-group">
          <label for="onboarding-name" class="form-label">${tOnb.nameLabel}</label>
          <input type="text" id="onboarding-name" class="form-input" required maxlength="60" autocomplete="name" placeholder="${tOnb.namePlaceholder}" >
        </div>
        <button type="submit" class="btn btn-primary btn-block">${tOnb.submitBtn}</button>
      </form>
    </div>
  `;
}

/* ==========================================================================
   10. ALKALMAZÁS NÉZETEK / APPLICATION VIEWS
   ========================================================================== */

function renderHome() {
  const tHome = T.home;
  const todayString = getFormattedToday();

  return `
    <div class="home-page">
      ${renderEmailVerificationBanner()}

      <section class="home-greeting-card">
        <div class="greeting-row">
          <div>
            <h1 id="home-greeting-heading"></h1>
            <p class="home-date">${todayString}</p>
          </div>
          <span class="badge badge-sample">${T.sampleBadge}</span>
        </div>
      </section>

      <section class="rings-wrapper" aria-label="Napi mutatók">
        ${renderSvgRing(72, 100, tHome.readiness, tHome.readinessSub, tHome.readinessStatus, 'ring-readiness', '72')}
        ${renderSvgRing(11.4, 21, tHome.strain, tHome.strainSub, tHome.strainStatus, 'ring-strain', '11,4')}
        ${renderSvgRing(84, 100, tHome.sleep, tHome.sleepSub, tHome.sleepStatus, 'ring-sleep', '84%')}
      </section>

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

      <section class="chip-bar" aria-label="Adatösszehasonlítás nézetek">
        <button type="button" class="chip ${state.activeChip === 'history' ? 'active' : ''}" data-chip-id="history"> ${tHome.chips.history} </button>
        <button type="button" class="chip ${state.activeChip === 'team' ? 'active' : ''}" data-chip-id="team"> ${tHome.chips.team} </button>
        <button type="button" class="chip ${state.activeChip === 'reference' ? 'active' : ''}" data-chip-id="reference"> ${tHome.chips.reference} </button>
      </section>
    </div>
  `;
}

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

function renderJournal() {
  const tJournal = T.journal;

  return `
    <div class="journal-page">
      <div class="journal-header">
        <div>
          <h1>${tJournal.title}</h1>
          <p class="section-subtitle">Tevékenységek és megfigyelések naplózása</p>
        </div>

        <div class="segmented-control" role="tablist" aria-label="Nézet kiválasztása">
          <button type="button" class="segmented-btn ${state.journalView === 'list' ? 'active' : ''}" role="tab" aria-selected="${state.journalView === 'list'}" data-journal-view="list" > ${tJournal.views.list} </button>
          <button type="button" class="segmented-btn ${state.journalView === 'calendar' ? 'active' : ''}" role="tab" aria-selected="${state.journalView === 'calendar'}" data-journal-view="calendar" > ${tJournal.views.calendar} </button>
        </div>
      </div>

      <div class="empty-state">
        <svg class="empty-state-icon" aria-hidden="true"><use href="#icon-empty"></use></svg>
        <h2 class="empty-state-title">${tJournal.emptyTitle}</h2>
        <p class="empty-state-desc">${tJournal.emptyDesc}</p>
        <button type="button" class="btn btn-primary" aria-disabled="true" disabled>
          <svg style="width: 18px; height: 18px;" aria-hidden="true"><use href="#icon-plus"></use></svg>
          ${tJournal.newActivityBtn}
        </button>
      </div>
    </div>
  `;
}

function renderMore() {
  const tMore = T.more;

  return `
    <div class="more-page">
      <div>
        <h1>${tMore.title}</h1>
        <p class="section-subtitle">Beállítások, profil és rendszerinformációk</p>
      </div>

      <div class="settings-group">
        <div class="section-header">
          <h2 class="section-title">${tMore.sections.settings}</h2>
        </div>

        <div class="settings-card">
          <div class="settings-item">
            <div>
              <div class="settings-item-title">${tMore.appearance}</div>
              <div class="settings-item-desc">${tMore.appearanceDesc}</div>
            </div>
            <div class="segmented-control" role="group" aria-label="${tMore.appearance}">
              <button type="button" class="segmented-btn ${state.themeSetting === 'auto' ? 'active' : ''}" data-theme-btn="auto"> ${tMore.themes.auto} </button>
              <button type="button" class="segmented-btn ${state.themeSetting === 'dark' ? 'active' : ''}" data-theme-btn="dark"> ${tMore.themes.dark} </button>
              <button type="button" class="segmented-btn ${state.themeSetting === 'light' ? 'active' : ''}" data-theme-btn="light"> ${tMore.themes.light} </button>
            </div>
          </div>

          <hr style="border: none; border-top: 1px solid var(--border-subtle);">

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

          <div class="settings-item">
            <div>
              <div class="settings-item-title">${tMore.version}</div>
              <div class="settings-item-desc">Alkalmazás build és kiadás</div>
            </div>
            <span class="tabular-nums text-muted" style="font-weight: 600;">${tMore.versionValue}</span>
          </div>
        </div>
      </div>

      <div class="settings-group">
        <div class="section-header">
          <h2 class="section-title">${tMore.sections.features}</h2>
        </div>

        <div class="menu-list" role="list">
          <a href="#/more/profile" class="menu-item" role="listitem" style="cursor: pointer;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-weight: 600;">${tMore.menu.profile}</span>
              <span id="more-menu-user-name" class="text-muted text-small"></span>
            </div>
            <div class="menu-item-action">
              <svg style="width: 16px; height: 16px; color: var(--text-muted);" aria-hidden="true"><use href="#icon-chevron-right"></use></svg>
            </div>
          </a>

          ${[tMore.menu.devices, tMore.menu.privacy, tMore.menu.team, tMore.menu.notifications, tMore.menu.help]
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

function renderProfile() {
  const tProf = T.profile;
  const isVerified = state.currentUser?.emailVerified;

  return `
    <div class="more-page">
      <div>
        <a href="#/more" class="btn-back" aria-label="${tProf.backToMore}">
          <svg class="btn-back-icon" aria-hidden="true"><use href="#icon-arrow-left"></use></svg>
          <span>${tProf.backToMore}</span>
        </a>
      </div>

      ${renderEmailVerificationBanner()}

      <div class="card" style="display: flex; flex-direction: column; gap: 18px;">
        <div class="section-header" style="margin-bottom: 0;">
          <h1 style="font-size: 1.35rem; font-weight: 700;">${tProf.title}</h1>
        </div>

        <div id="profile-feedback-box" style="display: none;"></div>

        <div class="form-group">
          <label class="form-label">${tProf.emailLabel}</label>
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; background: var(--surface-2); padding: 12px 14px; border-radius: var(--radius-md); border: 1px solid var(--border);">
            <span id="profile-user-email" style="font-weight: 500; word-break: break-all;"></span>
            <span class="badge ${isVerified ? 'badge-sample' : 'badge-coming-soon'}"> ${isVerified ? T.verification.statusVerified : T.verification.statusPending} </span>
          </div>
        </div>

        <form id="form-profile-name">
          <div class="form-group">
            <label for="profile-input-name" class="form-label">${tProf.nameLabel}</label>
            <input type="text" id="profile-input-name" class="form-input" required maxlength="60" placeholder="${T.onboarding.namePlaceholder}" >
          </div>
          <button type="submit" class="btn btn-primary">${tProf.saveNameBtn}</button>
        </form>

        <hr style="border: none; border-top: 1px solid var(--border-subtle); margin: 6px 0;">

        <div style="display: flex; flex-direction: column; gap: 10px;">
          <button type="button" class="btn btn-secondary" id="btn-profile-signout" style="color: var(--bad); border-color: var(--bad-subtle); justify-content: flex-start;">
            <svg style="width: 18px; height: 18px;" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>${tProf.signOutBtn}</span>
          </button>

          <div class="menu-item" style="opacity: 0.5; cursor: not-allowed; padding: 12px 0;">
            <span style="color: var(--bad); font-size: 0.875rem;">${tProf.deleteAccount}</span>
            <span class="badge badge-coming-soon">${T.comingSoonBadge}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

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

/* ==========================================================================
   11. ESEMÉNYFIGYELŐK ÉS BIZTONSÁGOS DOM FELTÖLTÉS / VIEW LOGIC
   ========================================================================== */

function attachViewEventListeners() {
  // 1. Téma gombok (More oldal)
  const themeButtons = document.querySelectorAll('[data-theme-btn]');
  themeButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const selectedTheme = e.currentTarget.getAttribute('data-theme-btn');
      applyTheme(selectedTheme);
    });
  });

  // 2. Chip gombok (Home oldal)
  const chipButtons = document.querySelectorAll('[data-chip-id]');
  chipButtons.forEach((chip) => {
    chip.addEventListener('click', (e) => {
      state.activeChip = e.currentTarget.getAttribute('data-chip-id');
      chipButtons.forEach((c) => c.classList.remove('active'));
      e.currentTarget.classList.add('active');
    });
  });

  // 3. Journal lista / naptár
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

  // 4. E-mail újraküldő gomb
  const resendBtn = document.getElementById('btn-resend-verification');
  if (resendBtn) {
    resendBtn.addEventListener('click', () => handleResendVerification(resendBtn));
  }

  // 5. Auth felület eseményei
  const tabLogin = document.getElementById('tab-btn-login');
  const tabRegister = document.getElementById('tab-btn-register');
  if (tabLogin && tabRegister) {
    tabLogin.addEventListener('click', () => {
      state.authTab = 'login';
      state.authError = null;
      render();
    });
    tabRegister.addEventListener('click', () => {
      state.authTab = 'register';
      state.authError = null;
      render();
    });
  }

  const linkForgot = document.getElementById('link-forgot-pwd');
  if (linkForgot) {
    linkForgot.addEventListener('click', () => {
      state.authTab = 'forgot';
      state.authError = null;
      render();
    });
  }

  const btnBackToLogin = document.getElementById('btn-back-to-login');
  if (btnBackToLogin) {
    btnBackToLogin.addEventListener('click', () => {
      state.authTab = 'login';
      state.authError = null;
      render();
    });
  }

  const btnTogglePwd = document.getElementById('btn-toggle-pwd');
  const pwdInput = document.getElementById('auth-password');
  const pwdToggleText = document.getElementById('pwd-toggle-text');
  if (btnTogglePwd && pwdInput) {
    btnTogglePwd.addEventListener('click', () => {
      const isPwd = pwdInput.type === 'password';
      pwdInput.type = isPwd ? 'text' : 'password';
      if (pwdToggleText) {
        pwdToggleText.textContent = isPwd ? T.auth.hidePassword : T.auth.showPassword;
      }
    });
  }

  const formAuth = document.getElementById('form-auth');
  if (formAuth) {
    formAuth.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('auth-email').value;
      const pwd = document.getElementById('auth-password').value;
      if (state.authTab === 'register') {
        const ageCheck = document.getElementById('auth-age-check');
        handleRegister(email, pwd, ageCheck ? ageCheck.checked : false);
      } else {
        handleLogin(email, pwd);
      }
    });
  }

  const formForgot = document.getElementById('form-forgot-pwd');
  if (formForgot) {
    formForgot.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('forgot-email').value;
      handleForgotPassword(email);
    });
  }

  const formOnboarding = document.getElementById('form-onboarding');
  if (formOnboarding) {
    formOnboarding.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('onboarding-name').value;
      handleSaveOnboarding(name);
    });
  }

  // 6. Profil oldal eseményei
  const formProfileName = document.getElementById('form-profile-name');
  if (formProfileName) {
    formProfileName.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('profile-input-name').value;
      handleUpdateProfileName(name);
    });
  }

  const btnSignOut = document.getElementById('btn-profile-signout');
  if (btnSignOut) {
    btnSignOut.addEventListener('click', handleSignOut);
  }

  // 7. Biztonságos textContent feltöltések
  populateSafeTexts();
}

/**
 * Felhasználó által megadott szövegek biztonságos (textContent) kiírása.
 */
function populateSafeTexts() {
  // Home fejléc köszöntés
  const homeGreeting = document.getElementById('home-greeting-heading');
  if (homeGreeting) {
    const name = state.userProfile?.displayName;
    homeGreeting.textContent = name ? `Szia, ${name}!` : T.home.greeting;
  }

  // More oldal profil sor
  const moreUserLabel = document.getElementById('more-menu-user-name');
  if (moreUserLabel && state.userProfile?.displayName) {
    moreUserLabel.textContent = `(${state.userProfile.displayName})`;
  }

  // Profil oldal e-mail és név mező
  const profEmail = document.getElementById('profile-user-email');
  if (profEmail && state.currentUser) {
    profEmail.textContent = state.currentUser.email || '';
  }

  const profNameInput = document.getElementById('profile-input-name');
  if (profNameInput && state.userProfile?.displayName) {
    profNameInput.value = state.userProfile.displayName;
  }
}

/* ==========================================================================
   12. FŐ RENDER FÜGGVÉNY / MAIN RENDER DISPATCHER
   ========================================================================== */

export function render() {
  const container = document.getElementById('app-view');
  if (!container) return;

  let htmlContent = '';

  // Auth állapot szerinti döntés
  if (state.authState === 'loading') {
    htmlContent = renderLoading();
  } else if (state.authState === 'unauthenticated') {
    htmlContent = renderAuth();
  } else if (state.authState === 'onboarding') {
    htmlContent = renderOnboarding();
  } else {
    // Bejelentkezett állapot – fülek renderelése
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
      if (state.currentPillar === 'profile') {
        htmlContent = renderProfile();
      } else {
        htmlContent = renderMore();
      }
    } else {
      htmlContent = renderHome();
    }
  }

  container.innerHTML = htmlContent;
  updateLogos();
  attachViewEventListeners();
}

/* ==========================================================================
   13. ALKALMAZÁS INICIALIZÁLÁSA / INITIALIZATION
   ========================================================================== */

function init() {
  initTheme();
  initAuth();
  window.addEventListener('hashchange', handleRouteChange);
  handleRouteChange();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
