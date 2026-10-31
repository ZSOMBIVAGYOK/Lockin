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
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  deleteUser,
} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
  serverTimestamp,
  documentId,
} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyAfXv2vFc3hZqwcv_tiQwK_-fyZHFrGuiw',
  authDomain: 'lockinlab.firebaseapp.com',
  projectId: 'lockinlab',
  storageBucket: 'lockinlab.firebasestorage.app',
  messagingSenderId: '78200354598',
  appId: '1:78200354598:web:a1c4ac61818016729673e7',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.languageCode = 'hu';
export const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();


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
    googleBtn: 'Folytatás Google-lal', orDivider: 'vagy',
    emailLabel: 'E-mail-cím', emailPlaceholder: 'sportolo@lockin.hu',
    passwordLabel: 'Jelszó', passwordPlaceholder: '••••••••',
    showPassword: 'Mutat', hidePassword: 'Elrejt',
    forgotPasswordLink: 'Elfelejtett jelszó?',
    loginBtn: 'Belépés', registerBtn: 'Fiók létrehozása',
    passwordMinHint: 'Legalább 8 karakter szükséges',
    registerAgeNote: 'A folytatáshoz meg kell erősítened, hogy elmúltál 18 éves.',
    resetTitle: 'Jelszó visszaállítása',
    resetDesc: 'Add meg a regisztrált e-mail-címed, és küldünk egy linket az új jelszó megadásához.',
    sendResetBtn: 'Visszaállító link küldése',
    resetSentSuccess: 'A jelszó-visszaállító linket elküldtük az e-mail-címedre!',
    resetNeutralFeedback: 'Ha ehhez az e-mail-címhez jelszavas fiók tartozik, elküldtük a levelet. Nézd meg a Spam és Promóciók mappát is. Ha Google-lal regisztráltál, használd a Google-belépést.',
    backToLogin: 'Vissza a belépéshez',
  },
  onboarding: {
    title: 'Hogy hívjunk?',
    desc: 'Add meg a sportolói neved vagy beceneved, amivel a Lockinban látni szeretnéd magad.',
    nameLabel: 'Sportolói név',
    namePlaceholder: 'pl. Kovács Bence',
    nameValidation: 'A név hossza 1 és 60 karakter között lehet.',
    ageCheckbox: 'Elmúltam 18 éves',
    submitBtn: 'Folytatás',
    under18Btn: 'Nem múltam el 18 éves',
    under18Info: 'A Junior mód később érhető el, gondviselői hozzájárulással.',
  },
  verification: {
    bannerTitle: 'Erősítsd meg az e-mail-címed',
    bannerDesc: 'A fiókod védelmében kattints a megadott címre küldött megerősítő linkre.',
    resendBtn: 'Újraküldés',
    resentSuccess: 'Elküldtük. Nézd meg a Spam mappát is.',
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
    noActivityToday: 'Ma még nincs bejegyzés',
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
        id: 'physical', title: 'Fizikai és technikai felkészülés', icon: 'icon-physical',
        description: 'Aerob kapacitás, neuromuszkuláris erő és technikai precizitás fejlesztése.',
        submodules: [
          { title: 'Energiarendszerek és állóképesség', desc: 'VO2max protokollok, laktátküszöb zónák és aerob alapozás tervezése.' },
          { title: 'Erő és neuromuszkuláris adaptáció', desc: 'Maximális erő, robbanékonyság és Rate of Force Development (RFD).' },
          { title: 'Technika és biomechanika', desc: 'Mozgásminták videoelemzése és energiahatékony végrehajtás.' },
          { title: 'Periodizáció', desc: 'Mikro-, mezo- és makrociklusok hangolása a versenycélokhoz.' },
        ],
      },
      recovery: {
        id: 'recovery', title: 'Regeneráció és helyreállítás', icon: 'icon-recovery',
        description: 'Alvásminőség, autonóm idegrendszer és aktív szöveti regeneráció.',
        submodules: [
          { title: 'Alvásminták és alváshigiénia', desc: 'Mély- és REM-fázisok, cirkadián ritmus és cirkadián fényprotokollok.' },
          { title: 'Fizioterápia és aktív regeneráció', desc: 'Nyirokkeringés serkentése, myofasciális lazítás és szaunaprotokollok.' },
          { title: 'Idegrendszeri mérések', desc: 'HRV trendek, tap-test és szimpatikus-paraszimpatikus egyensúly.' },
        ],
      },
      nutrition: {
        id: 'nutrition', title: 'Táplálkozás és hidratáció', icon: 'icon-nutrition',
        description: 'Tápanyag-időzítés, sejt-szintű hidratáció és célzott mikrotápanyagok.',
        submodules: [
          { title: 'Makrotápanyag-periodizáció', desc: 'Szénhidrát- és fehérjebevitel ciklikus igazítása az edzésnapokhoz.' },
          { title: 'Hidratáció és elektrolit-háztartás', desc: 'Nátrium-, kálium- és magnéziumveszteség pótlása izzadási ráta alapján.' },
          { title: 'Célzott kiegészítés', desc: 'Kreatin, béta-alanin, omega-3 és sportági mikrotápanyag-protokollok.' },
        ],
      },
      mental: {
        id: 'mental', title: 'Mentális és pszichológiai felkészülés', icon: 'icon-mental',
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
    emptyMonthDesc: 'Ebben a hónapban még nem rögzítettél tevékenységet.',
    emptyDesc: 'Rögzítsd a napi edzéseidet, alvásminőségedet és szubjektív érzéseidet a fejlődésed követéséhez.',
    newActivityBtn: '+ Új activity',
    prevMonth: 'Előző hónap',
    nextMonth: 'Következő hónap',
    todayLabel: 'Ma',
    yesterdayLabel: 'Tegnap',
    dayStrainPrefix: 'Strain',
    dailyStrainLabel: 'Napi strain',
    noDayActivities: 'Ezen a napon nem volt rögzített tevékenység.',
    addForThisDay: '+ Bejegyzés ehhez a naphoz',
    weekdaysShort: ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'],
    categories: {
      training: 'Edzés',
      recovery: 'Regeneráció',
      mental: 'Mentális',
      event: 'Esemény',
    },
    types: {
      running: 'Futás',
      cycling: 'Kerékpár',
      swimming: 'Úszás',
      rowing: 'Evezés / kajak-kenu',
      strength: 'Erőedzés',
      ballgame: 'Labdajáték',
      race: 'Verseny',
      test: 'Teszt',
      other_training: 'Egyéb edzés',
      massage: 'Masszázs',
      sauna: 'Szauna',
      cold_water: 'Hideg víz',
      mobility: 'Mobilitás / nyújtás',
      active_recovery: 'Aktív regeneráció',
      physiotherapy: 'Fizioterápia',
      other_recovery: 'Egyéb regeneráció',
      breathing: 'Légzés',
      meditation: 'Meditáció',
      visualization: 'Vizualizáció',
      other_mental: 'Egyéb mentális',
      travel: 'Utazás',
      injury_illness: 'Sérülés / betegség',
      rest_day: 'Szabadnap',
      other_event: 'Egyéb esemény',
    },
    rpeLabels: {
      1: 'Nagyon könnyű',
      2: 'Könnyű',
      3: 'Mérsékelt',
      4: 'Kissé nehéz',
      5: 'Közepes',
      6: 'Erőteljes',
      7: 'Nehéz',
      8: 'Nagyon nehéz',
      9: 'Rendkívül nehéz',
      10: 'Maximális',
    },
    feelLabels: {
      1: 'Nagyon rossz',
      2: 'Rossz',
      3: 'Átlagos',
      4: 'Jó',
      5: 'Kiváló',
    },
    modal: {
      newTitle: 'Új activity rögzítése',
      editTitle: 'Activity szerkesztése',
      categoryLabel: 'Kategória',
      typeLabel: 'Típus',
      dateLabel: 'Dátum',
      timeLabel: 'Kezdési idő',
      durationLabel: 'Időtartam (perc)',
      durationPlaceholder: 'pl. 45',
      rpeLabel: 'Érzékelt megerőltetés (RPE 1–10)',
      feelLabel: 'Érzet edzés után (1–5)',
      titleLabel: 'Cím (opcionális)',
      titlePlaceholder: 'pl. Reggeli zóna 2 futás',
      noteLabel: 'Megjegyzés (opcionális)',
      notePlaceholder: 'pl. Jó tempó, könnyű lábak...',
      strainPreview: 'Várható strain:',
      saveBtn: 'Mentés',
      deleteBtn: 'Törlés',
      cancelBtn: 'Mégse',
      confirmDelete: 'Biztosan törölni szeretnéd ezt a bejegyzést? A művelet nem vonható vissza.',
      validationDuration: 'Kérjük, adj meg érvényes időtartamot (1 és 1440 perc között)!',
      validationDate: 'Kérjük, válassz érvényes dátumot!',
      saveSuccess: 'Activity sikeresen elmentve!',
      deleteSuccess: 'Activity sikeresen törölve!',
      errorPermission: 'Nincs jogosultságod a művelet végrehajtásához. Kérjük, ellenőrizd a Firestore szabályokat!',
      errorGeneral: 'Hiba történt a mentés során. Kérjük, próbáld újra!',
    },
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
    versionValue: '0.5.0',
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
    accountExistsDifferent: 'Ehhez az e-mail-címhez már van másik módszerrel létrehozott fiók. Lépj be azzal.',
    general: 'Váratlan hiba történt. Kérjük, próbáld újra később!',
  },
  checkin: {
    dateLabel: 'Ébredés napja',
    title: 'Reggeli check-in',
    editTitle: 'Reggeli check-in szerkesztése',
    sleepSectionTitle: 'Alvás adatok',
    bedTimeLabel: 'Lefekvés ideje',
    sleepTimeLabel: 'Elalvás ideje',
    wakeTimeLabel: 'Ébredés ideje',
    upTimeLabel: 'Felkelés ideje',
    awakeLabel: 'Éjszakai ébrenlét (perc)',
    awakePlaceholder: '0',
    previewEmpty: 'Add meg a 4 időpontot az alvás kiszámításához...',
    ratingsTitle: 'Reggeli állapot és érzet',
    sleepQualityLabel: 'Alvásminőség',
    sleepQualityEndpoints: ['rossz', 'kiváló'],
    restednessLabel: 'Kipihentség',
    restednessEndpoints: ['kimerült', 'kipihent'],
    sorenessLabel: 'Izomláz / fáradtság',
    sorenessEndpoints: ['nincs', 'nagyon erős'],
    moodLabel: 'Hangulat',
    moodEndpoints: ['rossz', 'kiváló'],
    stressLabel: 'Stressz',
    stressEndpoints: ['alacsony', 'magas'],
    metricsTitle: 'Mért értékek (opcionális)',
    restingHrLabel: 'Nyugalmi pulzus (bpm)',
    restingHrPlaceholder: 'pl. 50',
    hrvLabel: 'Reggeli HRV (rMSSD ms)',
    hrvPlaceholder: 'pl. 65',
    tagsTitle: 'Körülmények és címkék',
    tags: {
      sick: 'Beteg',
      travel: 'Utazás',
      alcohol: 'Alkohol',
      lateTraining: 'Késői edzés',
    },
    noteLabel: 'Megjegyzés (opcionális)',
    notePlaceholder: 'pl. Nyugodt éjszaka, mély alvás...',
    saveBtn: 'Mentés',
    cancelBtn: 'Mégse',
    errors: {
      missingTimes: 'Kérjük, add meg mind a 4 alvási időpontot!',
      timeInBedMax: 'Az ágyban töltött idő nem haladhatja meg a 16 órát (960 perc)!',
      awakeTooLong: 'Az éjszakai ébrenlét ideje nem haladhatja meg a teljes alvási időt!',
      negativeSleep: 'A kiszámított alvásidő nem lehet negatív!',
      missingRatings: 'Kérjük, értékeld mind az 5 reggeli állapot-tényezőt (1–5)!',
      invalidHr: 'Kérjük, érvényes nyugalmi pulzust adj meg (25 és 220 bpm között), vagy hagyd üresen!',
      invalidHrv: 'Kérjük, érvényes HRV értéket adj meg (5 és 300 ms között), vagy hagyd üresen!',
      invalidDate: 'Kérjük, érvényes dátumot válassz (legfeljebb 14 nappal visszamenőleg, jövőbeli nem választható)!',
      saveFailed: 'Hiba történt a mentés során. Kérjük, próbáld újra!',
    },
    home: {
      taskTitle: 'Reggeli check-in',
      taskDoneTitle: 'Reggeli check-in elvégezve',
      btnStart: '1 perc',
      btnEdit: 'Szerkesztés',
      estimatedBadge: 'Becsült',
      estimatedSub: 'kérdőív alapján',
      noCheckinRing: 'Töltsd ki a check-int',
    },
  },
  sleep: {
    title: 'Alvásminták és alváshigiénia',
    subtitle: 'Alvásminőség, hatékonyság, alvásablak és trendek elemzése',
    backToRecovery: 'Vissza a Regenerációhoz',
    periods: {
      7: '7 nap',
      14: '14 nap',
      30: '30 nap',
    },
    need: {
      label: 'Alvásigényed',
      editBtn: 'Módosítás',
      modalTitle: 'Alvásigény módosítása',
      modalDesc: 'Állítsd be a napi cél alvásidődet 15 perces lépésekkel (5 és 12 óra között).',
      saveBtn: 'Mentés',
      cancelBtn: 'Mégse',
      invalidRange: 'Az alvásigénynek 300 és 720 perc (5–12 óra) között kell lennie.',
    },
    stats: {
      avgSleep: 'Átlagos alvás',
      avgBed: 'Átlagos ágyban',
      efficiency: 'Hatékonyság',
      debt: 'Alvásadósság (utolsó 7 nap)',
      regularity: 'Lefekvés rendszeressége',
      fromN: '{n} éjszaka adatából',
      regularityMinRequired: 'Legalább 4 éjszaka kell',
      regVeryGood: 'Nagyon rendszeres',
      regFair: 'Elfogadható',
      regFluctuating: 'Ingadozó',
    },
    charts: {
      chart1Title: 'Alvás és ágyban töltött idő',
      chart1LegendBed: 'Ágyban töltött idő',
      chart1LegendSleep: 'Tiszta alvás',
      chart1LegendTarget: 'Cél alvásigény',
      chart2Title: 'Alvásablak (18:00 – 12:00)',
      chart2LegendBed: 'Ágyban tartózkodás',
      chart2LegendSleep: 'Alvás fázis',
      emptyState: 'A trendhez legalább 3 check-in kell',
      clickInfo: 'Koppints egy napra a részletekért',
    },
    log: {
      title: 'Napi alvásnapló',
      editPrompt: 'Koppints a szerkesztéshez',
      restedLabel: 'Kipihentség',
    },
    hygiene: {
      title: 'Alvás-higiénia',
      disclaimerTop: 'Általános tippek, nem orvosi tanács.',
      tips: [
        'Rendszeres lefekvés és ébredés, hétvégén is.',
        'Hűvös, sötét, csendes hálószoba.',
        'Koffein késő délután már ne.',
        'Alkohol és nehéz étkezés lefekvés előtt rontja az alvás minőségét.',
        'Képernyő és erős fény lefekvés előtt mérsékelve.',
        'Reggeli természetes fény segít a napi ritmusban.',
        'Szunyókálás rövid és korai délutánra.',
        'Esti lenyugvó rutin (légzés, nyújtás).',
      ],
      disclaimerBottom: 'Tartós alvászavar, hangos horkolás vagy légzéskimaradás gyanúja esetén fordulj orvoshoz.',
    },
  },
};

export const MODES = {
  athlete: { id: 'athlete', name: 'Athlete', label: 'Athlete mód', available: true, tabs: ['home', 'lab', 'journal', 'more'], pillars: ['physical', 'recovery', 'nutrition', 'mental'] },
  junior: { id: 'junior', name: 'Junior', label: 'Junior mód', available: false, tabs: ['home', 'lab', 'journal', 'more'], pillars: ['physical', 'recovery', 'nutrition', 'mental'] },
  longevity: { id: 'longevity', name: 'Longevity', label: 'Longevity mód', available: false, tabs: ['home', 'lab', 'journal', 'more'], pillars: ['physical', 'recovery', 'nutrition', 'mental'] },
};

export const ACTIVITY_TYPES = {
  training: ['running', 'cycling', 'swimming', 'rowing', 'strength', 'ballgame', 'race', 'test', 'other_training'],
  recovery: ['massage', 'sauna', 'cold_water', 'mobility', 'active_recovery', 'physiotherapy', 'other_recovery'],
  mental: ['breathing', 'meditation', 'visualization', 'other_mental'],
  event: ['travel', 'injury_illness', 'rest_day', 'other_event'],
};


/* ==========================================================================
   2. ALKALMAZÁS ÁLLAPOTA (STATE) / APPLICATION STATE
   ========================================================================== */

export const state = {
  // Egyetlen állapot-forrás az alkalmazás szintjén / Single source of truth
  status: 'loading', // 'loading' | 'signedOut' | 'onboarding' | 'ready'

  mode: 'athlete',
  currentRoute: 'home',
  currentPillar: null,
  currentSubpage: null,
  themeSetting: 'auto',
  resolvedTheme: 'dark',
  journalView: 'list',
  journalDate: new Date(),
  journalActivities: [],
  journalSelectedDateKey: null,
  todayActivities: [],
  isModalOpen: false,
  editingActivity: null,
  journalUnsubscribe: null,
  todayUnsubscribe: null,
  activeChip: 'history',

  // Hitelesítési és felhasználói profil állapotok
  currentUser: null,
  userProfile: null,
  authTab: 'login', // 'login' | 'register' | 'forgot'
  authError: null,
  authSuccess: null,
  resendCooldownUntil: null,
  resendFeedback: null,

  // 4. lépés: Check-in állapot
  todayCheckin: null,
  checkinUnsubscribe: null,
  isCheckinModalOpen: false,

  // 5. lépés: Alvás-áttekintő állapot
  sleepPeriod: 7, // 7 | 14 | 30
  sleepCheckins: [],
  sleepUnsubscribe: null,
  sleepChartSelectedDay: null,
  isSleepNeedModalOpen: false,
};


/* ==========================================================================
   3. HIBAKEZELÉS ÉS BIZTONSÁG / ERROR HANDLING & SECURITY
   ========================================================================== */

export function getFriendlyErrorMessage(err) {
  const code = typeof err === 'string' ? err : err?.code;
  const hostname = window.location.hostname || 'ismeretlen';

  switch (code) {
    case 'auth/operation-not-allowed':
      return 'A Google-belépés nincs engedélyezve a Firebase-projektben. Engedélyezd a Firebase Konzolban (Authentication → Sign-in method → Google).';
    case 'auth/unauthorized-domain':
      if (hostname === '127.0.0.1') {
        return 'Ez a cím (127.0.0.1) nincs a Firebase engedélyezett domainjei között. Kérjük, a böngésző címsorában a http://localhost:... címet használd (a localhost alapértelmezésben engedélyezett)!';
      }
      return `Ez a cím (${hostname}) nincs a Firebase engedélyezett domainjei között. Add hozzá a Firebase Konzolban (Authentication → Settings → Authorized domains)!`;
    case 'auth/popup-blocked':
      return 'A böngésző letiltotta az előugró ablakot.';
    case 'auth/popup-closed-by-user':
      return 'A bejelentkezési ablak be lett zárva a folyamat befejezése előtt.';
    case 'auth/cancelled-popup-request':
      return 'A folyamat megszakadt, mert egy újabb bejelentkezési kérés indult.';
    case 'auth/invalid-api-key':
      return 'Érvénytelen Firebase API kulcs. Ellenőrizd a projekt konfigurációját!';
    case 'auth/internal-error':
      return 'Belső hitelesítési hiba történt a Firebase rendszerében. Kérjük, próbáld újra később!';
    case 'auth/network-request-failed':
      return 'Hálózati hiba történt. Kérjük, ellenőrizd az internetkapcsolatot!';
    case 'auth/account-exists-with-different-credential':
      return T.errors.accountExistsDifferent;
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
    default:
      return err?.message && !err?.message.includes('auth/') ? err.message : T.errors.general;
  }
}

export function setAuthError(err) {
  if (!err) {
    state.authError = null;
    return;
  }
  console.error('Firebase Auth error:', err);
  if (typeof err === 'object' && (err.code || err.message)) {
    console.error('Auth error details -> code:', err.code, 'message:', err.message);
  }

  const message = getFriendlyErrorMessage(err);
  const code = typeof err === 'object' && err.code ? err.code : (typeof err === 'string' && (err.startsWith('auth/') || err.startsWith('protocol/') || err.startsWith('validation/')) ? err : null);
  state.authError = { message, code };
}

export function renderAuthError(err) {
  if (!err) return '';
  const message = typeof err === 'string' ? err : err.message;
  const code = typeof err === 'object' && err.code ? err.code : null;

  return `
    <div class="form-error-alert" role="alert">
      <div>${escapeHtml(message)}</div>
      ${code ? `<div class="auth-error-code">Hibakód: ${escapeHtml(code)}</div>` : ''}
    </div>
  `;
}


/* ==========================================================================
   3B. ACTIVITY, STRAIN, ALVÁS ÉS KÉSZENLÉT SZÁMÍTÁSOK / CALCULATIONS
   ========================================================================== */

export const SLEEP_NEED_MIN = 480; // 8 óra alapértelmezett alvásigény percben

/**
 * Felhasználó profiljában beállított alvásigény lekérése (300–720 perc, alapérték 480).
 */
export function getUserSleepNeedMin() {
  const val = Number(state.userProfile?.sleepNeedMin);
  return val >= 300 && val <= 720 ? val : SLEEP_NEED_MIN;
}

/**
 * "HH:MM" formátumú időpont átváltása percekre (0–1439).
 */
export function parseTimeToMinutes(timeStr) {
  if (!timeStr || typeof timeStr !== 'string') return null;
  const parts = timeStr.trim().split(':');
  if (parts.length < 2) return null;
  const h = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10);
  if (isNaN(h) || isNaN(m) || h < 0 || h > 23 || m < 0 || m > 59) return null;
  return h * 60 + m;
}

/**
 * Percek formázása óra és perc szöveggé (pl. 432 perc -> "7 ó 12 p").
 */
export function fmtDuration(totalMinutes) {
  const m = Math.max(0, Math.round(Number(totalMinutes) || 0));
  const hours = Math.floor(m / 60);
  const mins = m % 60;
  return `${hours} ó ${String(mins).padStart(2, '0')} p`;
}

export const formatDurationHoursMin = fmtDuration;

/**
 * Kiszámítja az alvási mutatókat (ágyban töltött idő, alvásidő, hatékonyság).
 * A 4 időpont egymás utáni időrendben értendő, éjfélen átnyúlhat.
 */
export function calcSleepMetrics(bedTime, sleepTime, wakeTime, upTime, awakeMin = 0) {
  const t1 = parseTimeToMinutes(bedTime);
  const t2 = parseTimeToMinutes(sleepTime);
  const t3 = parseTimeToMinutes(wakeTime);
  const t4 = parseTimeToMinutes(upTime);

  if (t1 === null || t2 === null || t3 === null || t4 === null) {
    return { error: T.checkin.errors.missingTimes };
  }

  let bedMin = t1;
  let sleepStartMin = t2;
  while (sleepStartMin < bedMin) {
    sleepStartMin += 1440;
  }

  let wakeMin = t3;
  while (wakeMin < sleepStartMin) {
    wakeMin += 1440;
  }

  let upMin = t4;
  while (upMin < wakeMin) {
    upMin += 1440;
  }

  const timeInBedMin = upMin - bedMin;
  const rawSleepMin = wakeMin - sleepStartMin;
  const awakeNum = Math.max(0, parseInt(awakeMin, 10) || 0);

  if (timeInBedMin > 960) {
    return { error: T.checkin.errors.timeInBedMax };
  }

  if (awakeNum > rawSleepMin) {
    return { error: T.checkin.errors.awakeTooLong };
  }

  const sleepMin = rawSleepMin - awakeNum;
  if (sleepMin < 0) {
    return { error: T.checkin.errors.negativeSleep };
  }

  const sleepEfficiency = timeInBedMin > 0
    ? Math.round((sleepMin / timeInBedMin) * 100)
    : 0;

  return {
    timeInBedMin,
    sleepMin,
    sleepEfficiency,
    awakeMin: awakeNum,
  };
}

/**
 * Készenlét (Readiness) pontszám számítása kérdőív alapján (0–100, egész).
 * Dinamikus célalvásigénnyel a profilból vagy paraméterből.
 */
export function calcReadiness({ sleepMin, sleepQuality, restedness, soreness, mood, stress, sleepNeedMin = null }) {
  const sMin = Number(sleepMin) || 0;
  const qVal = Number(sleepQuality) || 1;
  const rVal = Number(restedness) || 1;
  const soVal = Number(soreness) || 1;
  const mVal = Number(mood) || 1;
  const stVal = Number(stress) || 1;
  const targetNeed = Number(sleepNeedMin) || getUserSleepNeedMin();

  const sleepComp = Math.min(Math.max(0, sMin / targetNeed), 1);
  const qualityComp = Math.min(Math.max(0, (qVal - 1) / 4), 1);
  const restedComp = Math.min(Math.max(0, (rVal - 1) / 4), 1);
  const sorenessComp = Math.min(Math.max(0, 1 - (soVal - 1) / 4), 1);
  const moodComp = Math.min(Math.max(0, (mVal - 1) / 4), 1);
  const stressComp = Math.min(Math.max(0, 1 - (stVal - 1) / 4), 1);

  const raw = 100 * (
    0.25 * sleepComp +
    0.15 * qualityComp +
    0.20 * restedComp +
    0.15 * sorenessComp +
    0.10 * moodComp +
    0.15 * stressComp
  );

  return Math.round(Math.max(0, Math.min(100, raw)));
}

/**
 * A két legnagyobb levonást okozó tényező meghatározása a "Miért?" kártyához.
 * Rangsorolási szempont: súly × (1 − komponens).
 */
export function getReadinessFactors({ sleepMin, sleepQuality, restedness, soreness, mood, stress, sleepNeedMin = null }) {
  const sMin = Number(sleepMin) || 0;
  const qVal = Number(sleepQuality) || 1;
  const rVal = Number(restedness) || 1;
  const soVal = Number(soreness) || 1;
  const mVal = Number(mood) || 1;
  const stVal = Number(stress) || 1;
  const targetNeed = Number(sleepNeedMin) || getUserSleepNeedMin();

  const sleepComp = Math.min(Math.max(0, sMin / targetNeed), 1);
  const qualityComp = Math.min(Math.max(0, (qVal - 1) / 4), 1);
  const restedComp = Math.min(Math.max(0, (rVal - 1) / 4), 1);
  const sorenessComp = Math.min(Math.max(0, 1 - (soVal - 1) / 4), 1);
  const moodComp = Math.min(Math.max(0, (mVal - 1) / 4), 1);
  const stressComp = Math.min(Math.max(0, 1 - (stVal - 1) / 4), 1);

  const factors = [
    { key: 'sleep', name: 'alvás', deduction: 0.25 * (1 - sleepComp), text: `alvás ${fmtDuration(sMin)}` },
    { key: 'quality', name: 'alvásminőség', deduction: 0.15 * (1 - qualityComp), text: `alvásminőség ${qVal}/5` },
    { key: 'rested', name: 'kipihentség', deduction: 0.20 * (1 - restedComp), text: `kipihentség ${rVal}/5` },
    { key: 'soreness', name: 'izomláz', deduction: 0.15 * (1 - sorenessComp), text: `izomláz ${soVal}/5` },
    { key: 'mood', name: 'hangulat', deduction: 0.10 * (1 - moodComp), text: `hangulat ${mVal}/5` },
    { key: 'stress', name: 'stressz', deduction: 0.15 * (1 - stressComp), text: `stressz ${stVal}/5` },
  ];

  factors.sort((a, b) => b.deduction - a.deduction);
  return factors.slice(0, 2);
}

/**
 * Időszaki alvásstatisztikák kiszámítása (átlag alvás, ágyban töltött idő, hatékonyság, alvásadósság, lefekvési szórás).
 */
export function calcSleepPeriodStats(checkins, sleepNeedMin = null) {
  const targetNeed = Number(sleepNeedMin) || getUserSleepNeedMin();
  const validCheckins = (checkins || []).filter(
    (c) => c && typeof c.sleepMin === 'number' && typeof c.timeInBedMin === 'number'
  );

  const n = validCheckins.length;
  if (n === 0) {
    return {
      count: 0,
      avgSleepMin: 0,
      avgBedMin: 0,
      avgSleepFmt: '0 ó 00 p',
      avgBedFmt: '0 ó 00 p',
      efficiency: 0,
      sleepDebtMin: 0,
      sleepDebtFmt: '0 ó 00 p',
      debtCount: 0,
      regularityStdDev: null,
      regularityLabel: T.sleep.stats.regularityMinRequired,
      regularityStatus: 'insufficient',
    };
  }

  const totalSleepMin = validCheckins.reduce((sum, c) => sum + c.sleepMin, 0);
  const totalBedMin = validCheckins.reduce((sum, c) => sum + c.timeInBedMin, 0);

  const avgSleepMin = Math.round(totalSleepMin / n);
  const avgBedMin = Math.round(totalBedMin / n);
  const efficiency = totalBedMin > 0 ? Math.round((totalSleepMin / totalBedMin) * 100) : 0;

  // Alvásadósság: az időszak utolsó 7 napjának kitöltött éjszakáira
  const last7StartDateKey = formatDateKey(new Date(Date.now() - 6 * 86400000));
  const last7Checkins = validCheckins.filter((c) => c.dateKey >= last7StartDateKey);
  const debtCheckins = last7Checkins.length > 0 ? last7Checkins : validCheckins.slice(-7);
  const debtSum = debtCheckins.reduce((sum, c) => sum + (targetNeed - c.sleepMin), 0);
  const sleepDebtMin = Math.max(0, debtSum);

  // Lefekvés rendszeressége: 18:00 óta eltelt percek szórása (legalább 4 éjszaka kell)
  let regularityStdDev = null;
  let regularityLabel = T.sleep.stats.regularityMinRequired;
  let regularityStatus = 'insufficient';

  if (n >= 4) {
    const minsFrom18 = validCheckins.map((c) => {
      const bedMin = parseTimeToMinutes(c.bedTime) || 0;
      return (bedMin - 1080 + 1440) % 1440;
    });

    const mean = minsFrom18.reduce((sum, v) => sum + v, 0) / n;
    const variance = minsFrom18.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / n;
    regularityStdDev = Math.round(Math.sqrt(variance));

    if (regularityStdDev <= 30) {
      regularityLabel = T.sleep.stats.regVeryGood;
      regularityStatus = 'good';
    } else if (regularityStdDev <= 60) {
      regularityLabel = T.sleep.stats.regFair;
      regularityStatus = 'medium';
    } else {
      regularityLabel = T.sleep.stats.regFluctuating;
      regularityStatus = 'bad';
    }
  }

  return {
    count: n,
    avgSleepMin,
    avgBedMin,
    avgSleepFmt: fmtDuration(avgSleepMin),
    avgBedFmt: fmtDuration(avgBedMin),
    efficiency,
    sleepDebtMin,
    sleepDebtFmt: fmtDuration(sleepDebtMin),
    debtCount: debtCheckins.length,
    regularityStdDev,
    regularityLabel,
    regularityStatus,
  };
}

/**
 * Egyéni activity strain számítása (IDEIGLENES KÉPLET, később cseréljük).
 * load = rpe * durationMin
 * strain = 21 * (1 - e^(-load / 400)), 1 tizedesre kerekítve.
 */
export function calcStrain(rpe, durationMin) {
  const r = Number(rpe) || 0;
  const d = Number(durationMin) || 0;
  const load = r * d;
  if (load <= 0) return 0;
  const raw = 21 * (1 - Math.exp(-load / 400));
  return Math.round(raw * 10) / 10;
}

/**
 * Napi összegzett strain számítása a nap összes (training, recovery, mental) loadjából.
 * NEM a strainek összege, hanem az összegzett load alapján számítva.
 * Az event kategória nem számít bele.
 */
export function calcDayStrain(activities) {
  if (!activities || !activities.length) return 0;
  let totalLoad = 0;
  for (const act of activities) {
    if (act && act.category !== 'event') {
      const r = Number(act.rpe) || 0;
      const d = Number(act.durationMin) || 0;
      const load = typeof act.load === 'number' ? act.load : (r * d);
      totalLoad += load;
    }
  }
  if (totalLoad <= 0) return 0;
  const raw = 21 * (1 - Math.exp(-totalLoad / 400));
  return Math.round(raw * 10) / 10;
}

/**
 * Helyi dátumkulcs formázása ("YYYY-MM-DD")
 */
export function formatDateKey(date) {
  if (!date) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Helyi időkulcs formázása ("HH:MM")
 */
export function formatTimeKey(date) {
  if (!date) return '';
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

export function formatActivityTime(timestampOrDate) {
  if (!timestampOrDate) return '';
  const d = timestampOrDate.toDate ? timestampOrDate.toDate() : new Date(timestampOrDate);
  return formatTimeKey(d);
}

export function formatDayGroupTitle(dateKey) {
  const todayKey = formatDateKey(new Date());
  if (dateKey === todayKey) return T.journal.todayLabel;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (dateKey === formatDateKey(yesterday)) return T.journal.yesterdayLabel;

  try {
    const [y, m, d] = dateKey.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    const formatter = new Intl.DateTimeFormat('hu-HU', {
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
    const formatted = formatter.format(date);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  } catch (e) {
    return dateKey;
  }
}

export function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}


/* ==========================================================================
   3C. REAL-TIME FIRESTORE FELIRATKOZÁSOK / REAL-TIME SUBSCRIPTIONS
   ========================================================================== */

function subscribeJournalMonth(uid, date) {
  if (state.journalUnsubscribe) {
    state.journalUnsubscribe();
    state.journalUnsubscribe = null;
  }
  if (!uid || !date) return;

  const year = date.getFullYear();
  const month = date.getMonth();
  const startKey = `${year}-${String(month + 1).padStart(2, '0')}-01`;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const endKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(daysInMonth).padStart(2, '0')}`;

  try {
    const actsCol = collection(db, 'users', uid, 'activities');
    const q = query(
      actsCol,
      where('dateKey', '>=', startKey),
      where('dateKey', '<=', endKey),
      orderBy('dateKey', 'desc')
    );

    state.journalUnsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
        list.sort((a, b) => {
          const timeA = a.startAt?.seconds ? a.startAt.seconds : (a.startAt?.toDate ? a.startAt.toDate().getTime() / 1000 : 0);
          const timeB = b.startAt?.seconds ? b.startAt.seconds : (b.startAt?.toDate ? b.startAt.toDate().getTime() / 1000 : 0);
          return timeB - timeA;
        });
        state.journalActivities = list;
        if (state.currentRoute === 'journal') {
          render();
        }
      },
      (err) => {
        console.error('Firestore journal subscription error:', err);
      }
    );
  } catch (err) {
    console.error('Failed to subscribe journal month:', err);
  }
}

function subscribeTodayActivities(uid) {
  if (state.todayUnsubscribe) {
    state.todayUnsubscribe();
    state.todayUnsubscribe = null;
  }
  if (!uid) return;

  const todayKey = formatDateKey(new Date());

  try {
    const actsCol = collection(db, 'users', uid, 'activities');
    const q = query(actsCol, where('dateKey', '==', todayKey));

    state.todayUnsubscribe = onSnapshot(
      q,
      (snapshot) => {
        state.todayActivities = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
        if (state.currentRoute === 'home') {
          render();
        }
      },
      (err) => {
        console.error('Firestore today activities subscription error:', err);
      }
    );
  } catch (err) {
    console.error('Failed to subscribe today activities:', err);
  }
}

function subscribeTodayCheckin(uid) {
  if (state.checkinUnsubscribe) {
    state.checkinUnsubscribe();
    state.checkinUnsubscribe = null;
  }
  if (!uid) return;

  const todayKey = formatDateKey(new Date());

  try {
    const checkinRef = doc(db, 'users', uid, 'checkins', todayKey);
    state.checkinUnsubscribe = onSnapshot(
      checkinRef,
      (docSnap) => {
        if (docSnap.exists()) {
          state.todayCheckin = { dateKey: docSnap.id, ...docSnap.data() };
        } else {
          state.todayCheckin = null;
        }
        if (state.currentRoute === 'home') {
          render();
        }
      },
      (err) => {
        console.error('Firestore today checkin subscription error:', err);
      }
    );
  } catch (err) {
    console.error('Failed to subscribe today checkin:', err);
  }
}

function subscribeSleepPeriod(uid, periodDays = 7) {
  if (state.sleepUnsubscribe) {
    state.sleepUnsubscribe();
    state.sleepUnsubscribe = null;
  }
  if (!uid) return;

  const days = Number(periodDays) || 7;
  const endDate = new Date();
  const startDate = new Date(Date.now() - (days - 1) * 86400000);
  const startKey = formatDateKey(startDate);
  const endKey = formatDateKey(endDate);

  try {
    const checkinsCol = collection(db, 'users', uid, 'checkins');
    const q = query(
      checkinsCol,
      where(documentId(), '>=', startKey),
      where(documentId(), '<=', endKey),
      orderBy(documentId(), 'asc')
    );

    state.sleepUnsubscribe = onSnapshot(
      q,
      (snapshot) => {
        state.sleepCheckins = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          dateKey: docSnap.id,
          ...docSnap.data(),
        }));
        if (state.currentRoute === 'lab' && state.currentSubpage === 'sleep') {
          render();
        }
      },
      (err) => {
        console.error('Firestore sleep period subscription error:', err);
      }
    );
  } catch (err) {
    console.error('Failed to subscribe sleep period:', err);
  }
}

function cleanupSubscriptions() {
  if (state.journalUnsubscribe) {
    state.journalUnsubscribe();
    state.journalUnsubscribe = null;
  }
  if (state.todayUnsubscribe) {
    state.todayUnsubscribe();
    state.todayUnsubscribe = null;
  }
  if (state.checkinUnsubscribe) {
    state.checkinUnsubscribe();
    state.checkinUnsubscribe = null;
  }
  if (state.sleepUnsubscribe) {
    state.sleepUnsubscribe();
    state.sleepUnsubscribe = null;
  }
  state.journalActivities = [];
  state.todayActivities = [];
  state.todayCheckin = null;
  state.sleepCheckins = [];
  state.sleepChartSelectedDay = null;
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

async function initAuth() {
  state.status = 'loading';

  // Átirányításos (redirect) bejelentkezés eredményének kezelése
  try {
    await getRedirectResult(auth);
  } catch (redirErr) {
    setAuthError(redirErr);
  }

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      cleanupSubscriptions();
      state.currentUser = null;
      state.userProfile = null;
      state.status = 'signedOut';
      render();
      return;
    }

    state.currentUser = user;

    try {
      const userRef = doc(db, 'users', user.uid);
      const snap = await getDoc(userRef);

      if (snap.exists() && snap.data().displayName) {
        state.userProfile = snap.data();
        state.status = 'ready';
        subscribeJournalMonth(user.uid, state.journalDate);
        subscribeTodayActivities(user.uid);
        subscribeTodayCheckin(user.uid);
      } else {
        state.userProfile = snap.exists() ? snap.data() : null;
        state.status = 'onboarding';
      }
    } catch (err) {
      console.error('Firestore user profile fetch error:', err);
      if (user.displayName) {
        state.userProfile = { displayName: user.displayName, mode: 'athlete', language: 'hu' };
        state.status = 'ready';
        subscribeJournalMonth(user.uid, state.journalDate);
        subscribeTodayActivities(user.uid);
        subscribeTodayCheckin(user.uid);
      } else {
        state.status = 'onboarding';
      }
    }

    render();
  });
}

/**
 * Szinkronizálja az alkalmazás elrendezését és a navigáció láthatóságát a state.status alapján.
 * KIZÁRÓLAG status === 'ready' esetén látható a menü és a fejléc!
 */
export function syncLayoutVisibility() {
  const appLayout = document.querySelector('.app-layout');
  const appNav = document.getElementById('app-nav');
  const mobileHeader = document.querySelector('.mobile-header');

  const isReady = state.status === 'ready';

  if (appLayout) {
    if (isReady) {
      appLayout.classList.remove('auth-mode');
    } else {
      appLayout.classList.add('auth-mode');
    }
  }

  if (appNav) {
    appNav.style.display = isReady ? '' : 'none';
    if (isReady) {
      appNav.removeAttribute('aria-hidden');
    } else {
      appNav.setAttribute('aria-hidden', 'true');
    }
  }

  if (mobileHeader) {
    mobileHeader.style.display = isReady ? '' : 'none';
    if (isReady) {
      mobileHeader.removeAttribute('aria-hidden');
    } else {
      mobileHeader.setAttribute('aria-hidden', 'true');
    }
  }
}

async function handleGoogleSignIn() {
  state.authError = null;
  state.authSuccess = null;

  if (window.location.protocol === 'file:') {
    const msg = 'A Google-belépés nem működik helyi fájlrendszerről (file://). Kérjük, indíts egy helyi webszervert (pl. http://localhost:8000)!';
    setAuthError({ message: msg, code: 'protocol/file-unsupported' });
    state.status = 'signedOut';
    render();
    return;
  }

  try {
    await signInWithPopup(auth, googleProvider);
  } catch (err) {
    if (err?.code === 'auth/popup-blocked' || err?.code === 'auth/operation-not-supported-in-this-environment') {
      try {
        await signInWithRedirect(auth, googleProvider);
        return;
      } catch (redirErr) {
        setAuthError(redirErr);
        state.status = 'signedOut';
        render();
      }
    } else {
      setAuthError(err);
      state.status = 'signedOut';
      render();
    }
  }
}

async function handleLogin(email, password) {
  state.authError = null;
  state.authSuccess = null;
  try {
    await signInWithEmailAndPassword(auth, email.trim(), password);
  } catch (err) {
    setAuthError(err);
    state.status = 'signedOut';
    render();
  }
}

async function handleRegister(email, password) {
  state.authError = null;
  state.authSuccess = null;

  if (password.length < 8) {
    setAuthError({ message: T.auth.weakPassword, code: 'auth/weak-password' });
    state.status = 'signedOut';
    render();
    return;
  }

  try {
    const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
    try {
      await sendEmailVerification(cred.user);
    } catch (mailErr) {
      console.error('Firebase Auth error (sendEmailVerification on register):', mailErr);
    }
  } catch (err) {
    setAuthError(err);
    state.status = 'signedOut';
    render();
  }
}

async function handleForgotPassword(email) {
  state.authError = null;
  state.authSuccess = null;

  if (!email || !email.includes('@')) {
    setAuthError({ message: T.errors.invalidEmail, code: 'auth/invalid-email' });
    render();
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email.trim());
    state.authSuccess = T.auth.resetNeutralFeedback;
    render();
  } catch (err) {
    setAuthError(err);
    render();
  }
}

async function handleSaveOnboarding(name, ageConfirmed) {
  const trimmed = (name || '').trim();
  if (!trimmed || trimmed.length < 1 || trimmed.length > 60) {
    setAuthError({ message: T.onboarding.nameValidation, code: 'validation/invalid-name' });
    state.status = 'onboarding';
    render();
    return;
  }

  if (!ageConfirmed) {
    setAuthError({ message: 'A folytatáshoz meg kell erősítened, hogy elmúltál 18 éves.', code: 'validation/under-18' });
    state.status = 'onboarding';
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
    state.status = 'ready';
    state.authError = null;
    subscribeJournalMonth(state.currentUser.uid, state.journalDate);
    subscribeTodayActivities(state.currentUser.uid);
    subscribeTodayCheckin(state.currentUser.uid);
    render();
    navigateTo('#/home');
  } catch (err) {
    setAuthError(err);
    state.status = 'onboarding';
    render();
  }
}

async function handleUnder18() {
  cleanupSubscriptions();
  try {
    if (auth.currentUser) {
      await deleteUser(auth.currentUser);
    }
  } catch (e) {
    console.error('Error deleting under 18 user:', e);
  }

  try {
    await signOut(auth);
  } catch (e) {
    console.error('Error signing out under 18 user:', e);
  }

  state.currentUser = null;
  state.userProfile = null;
  state.status = 'signedOut';
  setAuthError({ message: T.onboarding.under18Info, code: 'onboarding/under-18' });
  render();
}

async function handleUpdateProfileName(newName) {
  const trimmed = (newName || '').trim();
  if (!trimmed || trimmed.length < 1 || trimmed.length > 60) {
    showProfileFeedback(T.onboarding.nameValidation, true, 'validation/invalid-name');
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
    console.error('Error updating profile name:', err);
    showProfileFeedback(getFriendlyErrorMessage(err), true, err?.code || null);
  }
}

function showProfileFeedback(msg, isError, code = null) {
  const alertEl = document.getElementById('profile-feedback-box');
  if (!alertEl) return;
  alertEl.innerHTML = `
    <div>${escapeHtml(msg)}</div>
    ${code ? `<div class="auth-error-code">Hibakód: ${escapeHtml(code)}</div>` : ''}
  `;
  alertEl.className = isError ? 'form-error-alert' : 'form-success-alert';
  alertEl.style.display = 'block';
}

let resendTimerId = null;

function startResendTimer() {
  if (resendTimerId) clearInterval(resendTimerId);
  resendTimerId = setInterval(() => {
    const now = Date.now();
    if (!state.resendCooldownUntil || state.resendCooldownUntil <= now) {
      clearInterval(resendTimerId);
      resendTimerId = null;
      state.resendCooldownUntil = null;
      const btn = document.getElementById('btn-resend-verification');
      if (btn) {
        btn.disabled = false;
        btn.textContent = T.verification.resendBtn;
      }
      return;
    }
    const btn = document.getElementById('btn-resend-verification');
    if (btn) {
      const sec = Math.ceil((state.resendCooldownUntil - now) / 1000);
      btn.disabled = true;
      btn.textContent = `${T.verification.resendBtn} (${sec}s)`;
    }
  }, 1000);
}

async function handleResendVerification(btnEl) {
  if (!state.currentUser) return;
  const now = Date.now();
  if (state.resendCooldownUntil && state.resendCooldownUntil > now) return;

  try {
    if (btnEl) btnEl.disabled = true;
    await sendEmailVerification(state.currentUser);
    state.resendFeedback = T.verification.resentSuccess;
    state.resendCooldownUntil = Date.now() + 60000;
    startResendTimer();
    render();
  } catch (err) {
    console.error('Firebase Auth error (resend verification):', err, 'code:', err?.code, 'message:', err?.message);
    const msg = getFriendlyErrorMessage(err);
    state.resendFeedback = `${msg}${err?.code ? ` (Hibakód: ${err.code})` : ''}`;
    if (btnEl) {
      btnEl.disabled = false;
      btnEl.textContent = T.verification.resendBtn;
    }
    render();
  }
}

async function handleSignOut() {
  try {
    if (resendTimerId) {
      clearInterval(resendTimerId);
      resendTimerId = null;
    }
    state.resendCooldownUntil = null;
    state.resendFeedback = null;
    cleanupSubscriptions();
    state.currentUser = null;
    state.userProfile = null;
    state.currentRoute = 'home';
    state.currentPillar = null;
    state.status = 'signedOut';
    render();
    await signOut(auth);
    window.location.hash = '';
  } catch (err) {
    console.error('Firebase Auth error (signOut):', err);
    state.status = 'signedOut';
    render();
  }
}


/* ==========================================================================
   7. ROUTER ÉS NAVIGÁCIÓ / ROUTER & NAVIGATION
   ========================================================================== */

function parseHash(hash) {
  const cleanHash = (hash || '').trim().toLowerCase();

  if (!cleanHash || cleanHash === '#' || cleanHash === '#/') {
    return { route: 'home', pillar: null, subpage: null };
  }

  // 1. Lab aloldal (pl. #/lab/recovery/sleep)
  const labSubpageMatch = cleanHash.match(/^#\/lab\/([a-z0-9_-]+)\/([a-z0-9_-]+)$/);
  if (labSubpageMatch) {
    const pillarId = labSubpageMatch[1];
    const subpageId = labSubpageMatch[2];
    if (MODES[state.mode].pillars.includes(pillarId)) {
      return { route: 'lab', pillar: pillarId, subpage: subpageId };
    }
  }

  // 2. Lab fő pillér (pl. #/lab/recovery)
  const pillarMatch = cleanHash.match(/^#\/lab\/([a-z0-9_-]+)$/);
  if (pillarMatch) {
    const pillarId = pillarMatch[1];
    if (MODES[state.mode].pillars.includes(pillarId)) {
      return { route: 'lab', pillar: pillarId, subpage: null };
    }
    return { route: 'lab', pillar: null, subpage: null };
  }

  if (cleanHash === '#/more/profile') return { route: 'more', pillar: 'profile', subpage: null };
  if (cleanHash === '#/home') return { route: 'home', pillar: null, subpage: null };
  if (cleanHash === '#/lab') return { route: 'lab', pillar: null, subpage: null };
  if (cleanHash === '#/journal') return { route: 'journal', pillar: null, subpage: null };
  if (cleanHash === '#/more') return { route: 'more', pillar: null, subpage: null };

  return { route: 'home', pillar: null, subpage: null };
}

export function navigateTo(hash) {
  if (window.location.hash !== hash) {
    window.location.hash = hash;
  } else {
    handleRouteChange();
  }
}

function handleRouteChange() {
  const { route, pillar, subpage } = parseHash(window.location.hash);
  state.currentRoute = route;
  state.currentPillar = pillar;
  state.currentSubpage = subpage || null;

  // Ha az alvás aloldalra lépünk, feliratkozunk az időszakra
  if (state.currentRoute === 'lab' && state.currentSubpage === 'sleep' && state.currentUser) {
    subscribeSleepPeriod(state.currentUser.uid, state.sleepPeriod || 7);
  } else if (state.sleepUnsubscribe) {
    state.sleepUnsubscribe();
    state.sleepUnsubscribe = null;
  }

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

function renderSvgRing(value, max, label, subtext, statusText, colorClass, displayValue = null, isSample = true, extraBadgeHtml = '', linkHref = null) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const ratio = Math.max(0, Math.min(1, value / max));
  const offset = circumference * (1 - ratio);
  const formattedVal = displayValue !== null ? displayValue : value;

  const tagOpen = linkHref
    ? `<a href="${linkHref}" class="ring-card ring-card-clickable" aria-label="${escapeHtml(label)} megnyitása">`
    : `<div class="ring-card">`;
  const tagClose = linkHref ? `</a>` : `</div>`;

  return `
    ${tagOpen}
      <div class="ring-gauge">
        <svg class="ring-svg" viewBox="0 0 100 100" aria-hidden="true">
          <circle class="ring-track" cx="50" cy="50" r="${radius}"></circle>
          <circle class="ring-progress ${colorClass}" cx="50" cy="50" r="${radius}" stroke-dasharray="${circumference.toFixed(2)}" stroke-dashoffset="${offset.toFixed(2)}"></circle>
        </svg>
        <div class="ring-center-content">
          <span class="ring-value tabular-nums">${formattedVal}</span>
          <span class="ring-unit">${subtext}</span>
        </div>
      </div>
      <div class="ring-meta">
        <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
          <span class="ring-label">${label}</span>
          ${isSample ? `<span class="badge badge-sample">${T.sampleBadge}</span>` : extraBadgeHtml}
        </div>
        <span class="ring-status">${statusText}</span>
      </div>
    ${tagClose}
  `;
}

function renderEmailVerificationBanner() {
  if (!state.currentUser || state.currentUser.emailVerified) return '';
  const isGoogle = state.currentUser.providerData?.some((p) => p.providerId === 'google.com');
  if (isGoogle) return '';

  const now = Date.now();
  const cooldownSec = state.resendCooldownUntil && state.resendCooldownUntil > now
    ? Math.ceil((state.resendCooldownUntil - now) / 1000)
    : 0;
  const isCoolingDown = cooldownSec > 0;
  const btnText = isCoolingDown ? `${T.verification.resendBtn} (${cooldownSec}s)` : T.verification.resendBtn;
  const descText = state.resendFeedback || T.verification.bannerDesc;

  return `
    <div class="verification-banner" role="alert">
      <div class="verification-banner-content">
        <svg class="verification-banner-icon" aria-hidden="true"><use href="#icon-info"></use></svg>
        <div class="verification-banner-text">
          <span class="verification-banner-title">${T.verification.bannerTitle}</span>
          <span class="verification-banner-desc">${escapeHtml(descText)}</span>
        </div>
      </div>
      <button type="button" class="btn btn-secondary btn-sm" id="btn-resend-verification" ${isCoolingDown ? 'disabled' : ''}>
        ${btnText}
      </button>
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

        ${renderAuthError(state.authError)}
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
        <button type="button" class="segmented-btn ${!isRegister ? 'active' : ''}" role="tab" id="tab-btn-login">${tAuth.loginTab}</button>
        <button type="button" class="segmented-btn ${isRegister ? 'active' : ''}" role="tab" id="tab-btn-register">${tAuth.registerTab}</button>
      </div>

      <!-- Google bejelentkezés gomb -->
      <button type="button" class="btn-google" id="btn-google-auth">
        <svg class="google-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
          <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
        </svg>
        <span>${tAuth.googleBtn}</span>
      </button>

      <div class="auth-divider"><span>${tAuth.orDivider}</span></div>

      ${renderAuthError(state.authError)}
      ${state.authSuccess ? `<div class="form-success-alert" role="alert">${state.authSuccess}</div>` : ''}

      <form id="form-auth">
        <div class="form-group">
          <label for="auth-email" class="form-label">${tAuth.emailLabel}</label>
          <input type="email" id="auth-email" class="form-input" required autocomplete="email" placeholder="${tAuth.emailPlaceholder}">
        </div>

        <div class="form-group">
          <label for="auth-password" class="form-label">${tAuth.passwordLabel}</label>
          <div class="password-input-wrap">
            <input
              type="password"
              id="auth-password"
              class="form-input"
              required
              minlength="${isRegister ? '8' : '6'}"
              autocomplete="${isRegister ? 'new-password' : 'current-password'}"
              placeholder="${tAuth.passwordPlaceholder}"
            >
            <button type="button" class="btn-toggle-password" id="btn-toggle-pwd" aria-label="Jelszó mutatása">
              <span id="pwd-toggle-text">${tAuth.showPassword}</span>
            </button>
          </div>
          ${isRegister ? `<span class="form-hint">${tAuth.passwordMinHint}</span>` : ''}
        </div>

        ${isRegister ? `<p class="form-hint" style="text-align: center; margin: 10px 0 14px 0;">${tAuth.registerAgeNote}</p>` : ''}

        <button type="submit" class="btn btn-primary btn-block">
          ${isRegister ? tAuth.registerBtn : tAuth.loginBtn}
        </button>

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
  const initialName = state.currentUser?.displayName || '';

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

      ${renderAuthError(state.authError)}

      <form id="form-onboarding">
        <div class="form-group">
          <label for="onboarding-name" class="form-label">${tOnb.nameLabel}</label>
          <input
            type="text"
            id="onboarding-name"
            class="form-input"
            required
            maxlength="60"
            autocomplete="name"
            placeholder="${tOnb.namePlaceholder}"
            value="${initialName}"
          >
        </div>

        <div class="form-checkbox-wrap" style="margin: 16px 0;">
          <label class="form-checkbox-label">
            <input type="checkbox" id="onboarding-age-check" class="form-checkbox">
            <span>${tOnb.ageCheckbox}</span>
          </label>
        </div>

        <button type="submit" class="btn btn-primary btn-block" id="btn-onboarding-submit" disabled>
          ${tOnb.submitBtn}
        </button>

        <button type="button" class="btn btn-secondary btn-block" id="btn-onboarding-under18" style="margin-top: 10px; color: var(--bad); border-color: var(--bad-subtle);">
          ${tOnb.under18Btn}
        </button>
      </form>
    </div>
  `;
}


/* ==========================================================================
   10. ALKALMAZÁS NÉZETEK / APPLICATION VIEWS
   ========================================================================== */

function renderHome() {
  const tHome = T.home;
  const tCheckin = T.checkin;
  const todayString = getFormattedToday();

  // 1. Terhelés számítása valós mai activitykből (3. lépés)
  const todayStrain = calcDayStrain(state.todayActivities);
  const hasTodayActivity = state.todayActivities && state.todayActivities.length > 0;
  const strainFormatted = hasTodayActivity ? String(todayStrain.toFixed(1)).replace('.', ',') : '0,0';
  const strainStatus = hasTodayActivity
    ? (todayStrain >= 14 ? 'Magas terhelés' : (todayStrain >= 7 ? 'Közepes terhelés' : 'Alacsony terhelés'))
    : tHome.noActivityToday;

  // 2. Alvás és Készenlét számítása valós mai check-inből (4. lépés)
  const checkin = state.todayCheckin;
  const hasCheckin = Boolean(checkin);

  // KÉSZENLÉT gyűrű
  let readinessRing = '';
  if (hasCheckin) {
    const readinessVal = Number(checkin.readiness) || 0;
    const readinessStatus = readinessVal >= 67 ? 'Magas készenlét' : (readinessVal >= 34 ? 'Közepes készenlét' : 'Alacsony készenlét');
    const readinessColor = readinessVal >= 67 ? 'ring-color-good' : (readinessVal >= 34 ? 'ring-color-medium' : 'ring-color-bad');
    const estimatedBadge = `<span class="badge badge-estimated">${tCheckin.home.estimatedBadge}</span>`;
    readinessRing = renderSvgRing(
      readinessVal,
      100,
      tHome.readiness,
      tCheckin.home.estimatedSub,
      readinessStatus,
      readinessColor,
      String(readinessVal),
      false,
      estimatedBadge
    );
  } else {
    readinessRing = renderSvgRing(
      0,
      100,
      tHome.readiness,
      tHome.readinessSub,
      tCheckin.home.noCheckinRing,
      'ring-color-empty',
      '—',
      false
    );
  }

  // TERHELÉS gyűrű
  const strainRing = renderSvgRing(
    todayStrain,
    21,
    tHome.strain,
    tHome.strainSub,
    strainStatus,
    'ring-strain',
    strainFormatted,
    false
  );

  // ALVÁS gyűrű
  let sleepRing = '';
  const userSleepNeed = getUserSleepNeedMin();
  if (hasCheckin) {
    const sleepMin = Number(checkin.sleepMin) || 0;
    const sleepEff = Number(checkin.sleepEfficiency) || 0;
    const sleepRatio = Math.min(100, Math.round((sleepMin / userSleepNeed) * 100));
    const sleepDisplay = fmtDuration(sleepMin);
    const sleepSub = `Hatékonyság ${sleepEff}%`;
    const sleepStatus = sleepEff >= 90 ? 'Kiváló hatékonyság' : (sleepEff >= 80 ? 'Megfelelő hatékonyság' : 'Alacsony hatékonyság');
    const sleepColor = sleepEff >= 85 ? 'ring-color-good' : (sleepEff >= 70 ? 'ring-color-medium' : 'ring-color-bad');
    sleepRing = renderSvgRing(
      sleepRatio,
      100,
      tHome.sleep,
      sleepSub,
      sleepStatus,
      sleepColor,
      sleepDisplay,
      false,
      '',
      '#/lab/recovery/sleep'
    );
  } else {
    sleepRing = renderSvgRing(
      0,
      100,
      tHome.sleep,
      '—',
      tCheckin.home.noCheckinRing,
      'ring-color-empty',
      '—',
      false,
      '',
      '#/lab/recovery/sleep'
    );
  }

  // "Miért?" kártya szövege
  let whyCardHtml = '';
  if (hasCheckin) {
    const factors = getReadinessFactors(checkin);
    const factorsText = factors.map((f) => f.text).join(', ');
    const whyDesc = `Fő tényezők: ${factorsText}. A készenléti szinted (${checkin.readiness} / 100) az alvásidőd és a reggeli állapot-visszajelzéseid alapján lett megbecsülve.`;
    whyCardHtml = `
      <section class="card">
        <div class="section-header">
          <h2 class="section-title"><svg style="width: 18px; height: 18px; color: var(--accent);" aria-hidden="true"><use href="#icon-info"></use></svg>${tHome.whyTitle}</h2>
        </div>
        <p class="text-muted" style="font-size: 0.9375rem; line-height: 1.5;">${escapeHtml(whyDesc)}</p>
      </section>
    `;
  } else {
    whyCardHtml = `
      <section class="card">
        <div class="section-header">
          <h2 class="section-title"><svg style="width: 18px; height: 18px; color: var(--accent);" aria-hidden="true"><use href="#icon-info"></use></svg>${tHome.whyTitle}</h2>
          <span class="badge badge-sample">${T.sampleBadge}</span>
        </div>
        <p class="text-muted" style="font-size: 0.9375rem; line-height: 1.5;">${tHome.whyText}</p>
      </section>
    `;
  }

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
        ${readinessRing}
        ${strainRing}
        ${sleepRing}
      </section>

      ${whyCardHtml}

      <section class="card" style="border-left: 4px solid var(--accent);">
        <div class="section-header">
          <h2 class="section-title"><svg style="width: 18px; height: 18px; color: var(--accent);" aria-hidden="true"><use href="#icon-sparkle"></use></svg>${tHome.suggestionTitle}</h2>
          <span class="badge badge-sample">${T.sampleBadge}</span>
        </div>
        <p style="font-size: 0.9375rem; line-height: 1.5;">${tHome.suggestionText}</p>
      </section>

      <section class="card">
        <div class="section-header">
          <h2 class="section-title">${tHome.tasksTitle}</h2>
        </div>
        <div class="tasks-list">
          <div class="task-item ${hasCheckin ? 'completed' : ''}">
            <div class="task-checkbox-mock" aria-hidden="true">
              ${hasCheckin ? '<svg style="width: 14px; height: 14px;" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>' : ''}
            </div>
            <span class="task-text">${hasCheckin ? tCheckin.home.taskDoneTitle : tCheckin.home.taskTitle}</span>
            ${
              hasCheckin
                ? `<button type="button" class="btn-text-link" id="btn-edit-checkin" style="margin-left: auto; font-size: 0.8125rem;">${tCheckin.home.btnEdit}</button>`
                : `<button type="button" class="btn btn-secondary btn-sm" id="btn-start-checkin" style="margin-left: auto; padding: 4px 10px; font-size: 0.75rem;">${tCheckin.home.btnStart}</button>`
            }
          </div>
          ${tHome.tasks.slice(1).map((task) => `
            <div class="task-item ${task.completed ? 'completed' : ''}">
              <div class="task-checkbox-mock" aria-hidden="true">${task.completed ? '<svg style="width: 14px; height: 14px;" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>' : ''}</div>
              <span class="task-text">${task.text}</span>
              <span class="badge badge-sample">${T.sampleBadge}</span>
            </div>`).join('')}
        </div>
      </section>

      <section class="chip-bar" aria-label="Adatösszehasonlítás nézetek">
        <button type="button" class="chip ${state.activeChip === 'history' ? 'active' : ''}" data-chip-id="history">${tHome.chips.history}</button>
        <button type="button" class="chip ${state.activeChip === 'team' ? 'active' : ''}" data-chip-id="team">${tHome.chips.team}</button>
        <button type="button" class="chip ${state.activeChip === 'reference' ? 'active' : ''}" data-chip-id="reference">${tHome.chips.reference}</button>
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
        <div><h1>${tLab.title}</h1><p class="section-subtitle">${tLab.subtitle}</p></div>
        <span class="badge badge-sample">${T.sampleBadge}</span>
      </div>

      <div class="lab-grid">
        ${pillarsConfig.map((pillarKey) => {
          const pillar = tLab.pillars[pillarKey];
          if (!pillar) return '';
          const submodulesPreview = pillar.submodules.map((sm) => sm.title).join(' • ');
          return `
            <a href="#/lab/${pillar.id}" class="pillar-card card-clickable" aria-label="${pillar.title} részletek">
              <div class="pillar-header"><div class="pillar-icon-box"><svg class="pillar-icon" aria-hidden="true"><use href="#${pillar.icon}"></use></svg></div><span class="badge badge-sample">${T.sampleBadge}</span></div>
              <div><h2 class="pillar-title">${pillar.title}</h2><p class="pillar-submodules-preview">${submodulesPreview}</p></div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 8px;">
                <span class="text-small text-muted">${pillar.submodules.length} ${tLab.submodulesCount}</span>
                <svg class="pillar-arrow-icon" aria-hidden="true"><use href="#icon-chevron-right"></use></svg>
              </div>
            </a>`;
        }).join('')}
      </div>
    </div>
  `;
}

function renderPillar(pillarId) {
  const pillar = T.lab.pillars[pillarId];
  if (!pillar) return `<div class="empty-state"><p>A keresett pillér nem található.</p><a href="#/lab" class="btn btn-secondary">Vissza</a></div>`;

  return `
    <div class="pillar-subpage">
      <div>
        <a href="#/lab" class="btn-back" aria-label="${T.backToLab}"><svg class="btn-back-icon" aria-hidden="true"><use href="#icon-arrow-left"></use></svg><span>${T.backToLab}</span></a>
      </div>
      <div class="pillar-hero">
        <div class="section-header">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div class="pillar-icon-box"><svg class="pillar-icon" aria-hidden="true"><use href="#${pillar.icon}"></use></svg></div>
            <div><h1>${pillar.title}</h1><p class="section-subtitle">${pillar.description}</p></div>
          </div>
          <span class="badge badge-sample">${T.sampleBadge}</span>
        </div>
      </div>

      <div class="section-header" style="margin-top: 12px;"><h2 class="section-title">Almodulok</h2><span class="badge badge-coming-soon">${T.comingSoonBadge}</span></div>
      <div class="submodules-list">
        ${pillar.submodules.map((sm, idx) => {
          const isSleepSub = pillarId === 'recovery' && idx === 0;
          if (isSleepSub) {
            return `
              <a href="#/lab/recovery/sleep" class="submodule-card card-clickable" style="text-decoration: none; color: inherit; display: block;" aria-label="${escapeHtml(sm.title)} megnyitása">
                <div class="submodule-card-header">
                  <h3 class="submodule-title" style="color: var(--accent);">${escapeHtml(sm.title)}</h3>
                  <svg style="width: 18px; height: 18px; color: var(--accent);" aria-hidden="true"><use href="#icon-chevron-right"></use></svg>
                </div>
                <p class="submodule-desc">${escapeHtml(sm.desc)}</p>
                <div style="display: flex; justify-content: flex-end; margin-top: 6px;">
                  <span class="badge badge-sample" style="background: var(--accent-subtle); color: var(--accent); border-color: rgba(76, 141, 255, 0.3);">Megnyitás</span>
                </div>
              </a>
            `;
          }
          return `
            <div class="submodule-card">
              <div class="submodule-card-header"><h3 class="submodule-title">${escapeHtml(sm.title)}</h3><span class="badge badge-coming-soon">${T.comingSoonBadge}</span></div>
              <p class="submodule-desc">${escapeHtml(sm.desc)}</p>
              <div style="display: flex; justify-content: flex-end; margin-top: 6px;"><span class="badge badge-sample">${T.sampleBadge}</span></div>
            </div>`;
        }).join('')}
      </div>
    </div>
  `;
}

/* ==========================================================================
   10B. JOURNAL KOMPONENSEK ÉS NÉZETEK / JOURNAL COMPONENTS & VIEWS
   ========================================================================== */

function renderActivityCard(act) {
  const catKey = act.category || 'training';
  const typeKey = act.type || '';
  const typeLabel = T.journal.types[typeKey] || typeKey;
  const timeStr = formatActivityTime(act.startAt);
  const strainFormatted = typeof act.strain === 'number' ? String(act.strain.toFixed(1)).replace('.', ',') : '0,0';

  const feelEmojis = { 1: '😫', 2: '🙁', 3: '😐', 4: '🙂', 5: '😁' };
  const feelEmoji = act.feelAfter ? feelEmojis[act.feelAfter] : null;

  const iconName = `icon-cat-${catKey}`;

  return `
    <div class="activity-card" data-activity-id="${act.id}" role="button" tabindex="0" aria-label="${escapeHtml(typeLabel)} szerkesztése">
      <div class="activity-card-left">
        <div class="activity-cat-icon cat-${catKey}">
          <svg aria-hidden="true"><use href="#${iconName}"></use></svg>
        </div>
        <div class="activity-details">
          <div class="activity-title-line">
            <span class="activity-type-name">${escapeHtml(typeLabel)}</span>
            ${act.title ? `<span class="activity-custom-title">– ${escapeHtml(act.title)}</span>` : ''}
          </div>
          <div class="activity-meta-line">
            ${timeStr ? `<span class="activity-meta-item"><svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${timeStr}</span>` : ''}
            ${act.durationMin && act.category !== 'event' ? `<span class="activity-meta-item">${act.durationMin} p</span>` : ''}
            ${act.rpe && act.category !== 'event' ? `<span class="activity-meta-item">RPE ${act.rpe}</span>` : ''}
            ${feelEmoji ? `<span class="activity-meta-item" title="Érzet: ${act.feelAfter}/5">${feelEmoji}</span>` : ''}
          </div>
          ${act.note ? `<div class="activity-note-preview">${escapeHtml(act.note)}</div>` : ''}
        </div>
      </div>
      <div class="activity-card-right">
        ${act.category !== 'event' ? `<span class="activity-strain-pill">${strainFormatted} strain</span>` : ''}
        <svg style="width: 16px; height: 16px; color: var(--text-muted);" aria-hidden="true"><use href="#icon-chevron-right"></use></svg>
      </div>
    </div>
  `;
}

function renderJournalListView() {
  const tJournal = T.journal;
  const activities = state.journalActivities;

  if (!activities || activities.length === 0) {
    return `
      <div class="empty-state">
        <svg class="empty-state-icon" aria-hidden="true"><use href="#icon-empty"></use></svg>
        <h2 class="empty-state-title">${tJournal.emptyTitle}</h2>
        <p class="empty-state-desc">${tJournal.emptyMonthDesc}</p>
        <button type="button" class="btn btn-primary" id="btn-empty-new-activity">
          <svg style="width: 18px; height: 18px;" aria-hidden="true"><use href="#icon-plus"></use></svg>
          <span>${tJournal.newActivityBtn}</span>
        </button>
      </div>
    `;
  }

  // Csoportosítás napok (dateKey) szerint
  const groups = {};
  for (const act of activities) {
    const dk = act.dateKey || (act.startAt?.toDate ? formatDateKey(act.startAt.toDate()) : 'ismeretlen');
    if (!groups[dk]) groups[dk] = [];
    groups[dk].push(act);
  }

  const sortedDates = Object.keys(groups).sort((a, b) => b.localeCompare(a));

  const dayGroupsHtml = sortedDates.map((dateKey) => {
    const dayActs = groups[dateKey];
    const dayStrain = calcDayStrain(dayActs);
    const dayTitle = formatDayGroupTitle(dateKey);
    const strainFormatted = String(dayStrain.toFixed(1)).replace('.', ',');
    const cardsHtml = dayActs.map(renderActivityCard).join('');

    return `
      <section class="journal-day-group">
        <div class="journal-day-header">
          <h2 class="journal-day-title">${dayTitle}</h2>
          <span class="journal-day-strain-badge ${dayStrain > 0 ? 'has-strain' : ''}">
            ${tJournal.dayStrainPrefix} ${strainFormatted}
          </span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${cardsHtml}
        </div>
      </section>
    `;
  }).join('');

  return `<div class="journal-list-view">${dayGroupsHtml}</div>`;
}

function renderJournalCalendarView() {
  const tJournal = T.journal;
  const year = state.journalDate.getFullYear();
  const month = state.journalDate.getMonth();
  const todayKey = formatDateKey(new Date());

  const groups = {};
  for (const act of state.journalActivities) {
    const dk = act.dateKey || (act.startAt?.toDate ? formatDateKey(act.startAt.toDate()) : '');
    if (dk) {
      if (!groups[dk]) groups[dk] = [];
      groups[dk].push(act);
    }
  }

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const startOffset = (firstDay + 6) % 7; // Hétfő kezdésű eltolás

  let selectedDateKey = state.journalSelectedDateKey;
  if (!selectedDateKey || !selectedDateKey.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`)) {
    if (todayKey.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`)) {
      selectedDateKey = todayKey;
    } else {
      selectedDateKey = `${year}-${String(month + 1).padStart(2, '0')}-01`;
    }
    state.journalSelectedDateKey = selectedDateKey;
  }

  const weekdaysHtml = tJournal.weekdaysShort
    .map((wd) => `<div class="calendar-weekday-title">${wd}</div>`)
    .join('');

  let cellsHtml = '';
  for (let i = 0; i < startOffset; i++) {
    cellsHtml += `<div class="calendar-day-cell is-empty" aria-hidden="true"></div>`;
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const dayActs = groups[dateKey] || [];
    const dayStrain = calcDayStrain(dayActs);
    const isToday = dateKey === todayKey;
    const isSelected = dateKey === selectedDateKey;

    let intensityClass = 'strain-intensity-0';
    if (dayStrain > 0 && dayStrain < 7) intensityClass = 'strain-intensity-1';
    else if (dayStrain >= 7 && dayStrain < 14) intensityClass = 'strain-intensity-2';
    else if (dayStrain >= 14) intensityClass = 'strain-intensity-3';

    const categoriesOnDay = Array.from(new Set(dayActs.map((a) => a.category)));
    const dotsHtml = categoriesOnDay
      .map((cat) => `<span class="cal-dot dot-${cat}"></span>`)
      .join('');

    const strainStr = dayStrain > 0 ? String(dayStrain.toFixed(1)).replace('.', ',') : '';

    cellsHtml += `
      <div
        class="calendar-day-cell ${intensityClass} ${isToday ? 'is-today' : ''} ${isSelected ? 'is-selected' : ''}"
        data-calendar-date="${dateKey}"
        role="button"
        tabindex="0"
        aria-label="${d}. nap, strain: ${dayStrain > 0 ? strainStr : '0'}"
      >
        <span class="cal-day-num">${d}</span>
        <span class="cal-day-strain">${strainStr}</span>
        <div class="cal-dots">${dotsHtml}</div>
      </div>
    `;
  }

  const selectedActs = groups[selectedDateKey] || [];
  const selectedDayStrain = calcDayStrain(selectedActs);
  const selectedDateTitle = formatDayGroupTitle(selectedDateKey);
  const selectedStrainFormatted = String(selectedDayStrain.toFixed(1)).replace('.', ',');

  let selectedDayContent = '';
  if (selectedActs.length > 0) {
    selectedDayContent = `
      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${selectedActs.map(renderActivityCard).join('')}
      </div>
    `;
  } else {
    selectedDayContent = `
      <div class="calendar-empty-day-note">
        <p>${tJournal.noDayActivities}</p>
        <button type="button" class="btn btn-secondary btn-sm" id="btn-add-for-selected-day" data-date="${selectedDateKey}">
          ${tJournal.addForThisDay}
        </button>
      </div>
    `;
  }

  return `
    <div class="journal-calendar-view">
      <div class="calendar-card">
        <div class="calendar-weekdays-row">${weekdaysHtml}</div>
        <div class="calendar-grid">${cellsHtml}</div>
      </div>

      <section class="calendar-selected-section">
        <div class="calendar-selected-header">
          <h2 class="calendar-selected-title">${selectedDateTitle}</h2>
          <span class="journal-day-strain-badge ${selectedDayStrain > 0 ? 'has-strain' : ''}">
            ${tJournal.dayStrainPrefix} ${selectedStrainFormatted}
          </span>
        </div>
        ${selectedDayContent}
      </section>
    </div>
  `;
}

function renderJournal() {
  const tJournal = T.journal;
  const isListView = state.journalView === 'list';

  const monthFormatter = new Intl.DateTimeFormat('hu-HU', { year: 'numeric', month: 'long' });
  const rawMonthTitle = monthFormatter.format(state.journalDate);
  const monthTitle = rawMonthTitle.charAt(0).toUpperCase() + rawMonthTitle.slice(1);

  const viewContent = isListView ? renderJournalListView() : renderJournalCalendarView();

  return `
    <div class="journal-page">
      <div class="journal-top-bar">
        <div>
          <h1>${tJournal.title}</h1>
          <p class="section-subtitle">Tevékenységek és terhelés követése</p>
        </div>

        <div class="journal-header-controls">
          <div class="month-selector" aria-label="Hónap váltó">
            <button type="button" class="btn-month-nav" id="btn-journal-prev-month" aria-label="${tJournal.prevMonth}">
              <svg aria-hidden="true"><use href="#icon-chevron-left"></use></svg>
            </button>
            <span class="month-current-title">${monthTitle}</span>
            <button type="button" class="btn-month-nav" id="btn-journal-next-month" aria-label="${tJournal.nextMonth}">
              <svg aria-hidden="true"><use href="#icon-chevron-right"></use></svg>
            </button>
          </div>

          <div class="segmented-control" role="tablist" aria-label="Nézet kiválasztása">
            <button type="button" class="segmented-btn ${isListView ? 'active' : ''}" role="tab" aria-selected="${isListView}" data-journal-view="list">
              ${tJournal.views.list}
            </button>
            <button type="button" class="segmented-btn ${!isListView ? 'active' : ''}" role="tab" aria-selected="${!isListView}" data-journal-view="calendar">
              ${tJournal.views.calendar}
            </button>
          </div>

          <button type="button" class="btn btn-primary" id="btn-open-new-activity">
            <svg style="width: 18px; height: 18px;" aria-hidden="true"><use href="#icon-plus"></use></svg>
            <span>${tJournal.newActivityBtn}</span>
          </button>
        </div>
      </div>

      ${viewContent}

      <button type="button" class="journal-fab" id="fab-new-activity" aria-label="${tJournal.newActivityBtn}">
        <svg aria-hidden="true"><use href="#icon-plus"></use></svg>
      </button>
    </div>
  `;
}

/* ==========================================================================
   10C. ACTIVITY MODAL LOGIKA ÉS RENDERELÉS / ACTIVITY MODAL LOGIC
   ========================================================================== */

let currentModalEscHandler = null;

function openActivityModal(activity = null, prefillDate = null) {
  state.editingActivity = activity;
  state.isModalOpen = true;

  const modalRoot = document.getElementById('activity-modal-root');
  if (!modalRoot) return;

  const tModal = T.journal.modal;
  const tJournal = T.journal;
  const isEdit = Boolean(activity && activity.id);

  let initialCategory = activity?.category || 'training';
  let initialType = activity?.type || ACTIVITY_TYPES[initialCategory][0];
  let initialDate = activity?.dateKey || (activity?.startAt?.toDate ? formatDateKey(activity.startAt.toDate()) : (prefillDate || formatDateKey(new Date())));
  let initialTime = activity?.startAt ? formatActivityTime(activity.startAt) : formatTimeKey(new Date());
  let initialDuration = typeof activity?.durationMin === 'number' ? activity.durationMin : (initialCategory === 'event' ? '' : 45);
  let initialRpe = typeof activity?.rpe === 'number' ? activity.rpe : 5;
  let initialFeel = activity?.feelAfter || null;
  let initialTitle = activity?.title || '';
  let initialNote = activity?.note || '';

  const initialStrain = initialCategory === 'event' ? 0 : calcStrain(initialRpe, initialDuration || 0);
  const initialStrainFormatted = String(initialStrain.toFixed(1)).replace('.', ',');

  const feelOptions = [
    { val: 1, emoji: '😫', label: tJournal.feelLabels[1] },
    { val: 2, emoji: '🙁', label: tJournal.feelLabels[2] },
    { val: 3, emoji: '😐', label: tJournal.feelLabels[3] },
    { val: 4, emoji: '🙂', label: tJournal.feelLabels[4] },
    { val: 5, emoji: '😁', label: tJournal.feelLabels[5] },
  ];

  modalRoot.innerHTML = `
    <div class="modal-backdrop" id="activity-modal-backdrop">
      <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-activity-title-heading">
        <div class="modal-header">
          <h2 class="modal-title" id="modal-activity-title-heading">${isEdit ? tModal.editTitle : tModal.newTitle}</h2>
          <button type="button" class="btn-modal-close" id="btn-close-modal" aria-label="Ablak bezárása">
            <svg aria-hidden="true"><use href="#icon-close"></use></svg>
          </button>
        </div>

        <form id="form-activity-modal" class="modal-form-wrap">
          <div class="modal-body">
            <div id="modal-error-alert" class="form-error-alert" style="display: none;" role="alert"></div>

            <div class="form-group">
              <label class="form-label">${tModal.categoryLabel}</label>
              <div class="segmented-control" role="radiogroup" aria-label="${tModal.categoryLabel}">
                ${['training', 'recovery', 'mental', 'event']
                  .map((cat) => `
                    <button type="button" class="segmented-btn ${initialCategory === cat ? 'active' : ''}" data-cat-choice="${cat}">
                      ${tJournal.categories[cat]}
                    </button>
                  `)
                  .join('')}
              </div>
              <input type="hidden" id="modal-input-category" value="${initialCategory}">
            </div>

            <div class="form-group">
              <label for="modal-select-type" class="form-label">${tModal.typeLabel}</label>
              <select id="modal-select-type" class="form-input" required></select>
            </div>

            <div class="modal-form-grid-2">
              <div class="form-group">
                <label for="modal-input-date" class="form-label">${tModal.dateLabel}</label>
                <input type="date" id="modal-input-date" class="form-input" required value="${initialDate}">
              </div>
              <div class="form-group">
                <label for="modal-input-time" class="form-label">${tModal.timeLabel}</label>
                <input type="time" id="modal-input-time" class="form-input" required value="${initialTime}">
              </div>
            </div>

            <div class="form-group" id="modal-duration-group">
              <label for="modal-input-duration" class="form-label">${tModal.durationLabel}</label>
              <input type="number" id="modal-input-duration" class="form-input" min="1" max="1440" placeholder="${tModal.durationPlaceholder}" value="${initialDuration}">
            </div>

            <div class="form-group" id="modal-rpe-group">
              <label class="form-label">${tModal.rpeLabel}</label>
              <div class="rpe-slider-box">
                <div class="rpe-slider-header">
                  <span class="rpe-badge-display">RPE <strong id="modal-rpe-num">${initialRpe}</strong></span>
                  <span class="rpe-text-label" id="modal-rpe-label">${tJournal.rpeLabels[initialRpe]}</span>
                </div>
                <input type="range" id="modal-input-rpe" class="form-range" min="1" max="10" step="1" value="${initialRpe}">
                <div class="rpe-ticks">
                  <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                  <span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">${tModal.feelLabel}</label>
              <div class="feel-rating-group" role="group">
                ${feelOptions
                  .map((f) => `
                    <button type="button" class="btn-feel-option ${initialFeel === f.val ? 'active' : ''}" data-feel-val="${f.val}" title="${f.label}">
                      <span class="feel-emoji">${f.emoji}</span>
                      <span style="font-size: 0.75rem;">${f.val}</span>
                    </button>
                  `)
                  .join('')}
              </div>
              <input type="hidden" id="modal-input-feel" value="${initialFeel || ''}">
            </div>

            <div class="form-group">
              <label for="modal-input-title" class="form-label">${tModal.titleLabel}</label>
              <input type="text" id="modal-input-title" class="form-input" maxlength="60" placeholder="${tModal.titlePlaceholder}" value="${escapeHtml(initialTitle)}">
            </div>

            <div class="form-group">
              <label for="modal-input-note" class="form-label">${tModal.noteLabel}</label>
              <textarea id="modal-input-note" class="form-input" maxlength="500" rows="3" placeholder="${tModal.notePlaceholder}">${escapeHtml(initialNote)}</textarea>
            </div>

            <div class="modal-strain-preview">
              <span class="modal-strain-preview-label">${tModal.strainPreview}</span>
              <span class="modal-strain-preview-value" id="modal-live-strain-display">Strain: ${initialStrainFormatted} / 21</span>
            </div>
          </div>

          <div class="modal-footer">
            ${isEdit ? `<button type="button" class="btn btn-secondary btn-delete-activity" id="btn-delete-activity"><svg style="width: 16px; height: 16px;" aria-hidden="true"><use href="#icon-trash"></use></svg><span>${tModal.deleteBtn}</span></button>` : ''}
            <button type="button" class="btn btn-secondary" id="btn-cancel-modal">${tModal.cancelBtn}</button>
            <button type="submit" class="btn btn-primary" id="btn-submit-modal">${tModal.saveBtn}</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.classList.add('modal-open');
  document.body.style.overflow = 'hidden';

  const typeSelect = document.getElementById('modal-select-type');
  const catInput = document.getElementById('modal-input-category');
  const durInput = document.getElementById('modal-input-duration');
  const rpeInput = document.getElementById('modal-input-rpe');
  const rpeNum = document.getElementById('modal-rpe-num');
  const rpeLabel = document.getElementById('modal-rpe-label');
  const rpeGroup = document.getElementById('modal-rpe-group');
  const strainLiveDisplay = document.getElementById('modal-live-strain-display');
  const feelInput = document.getElementById('modal-input-feel');

  function populateTypes(cat, selectedType = null) {
    if (!typeSelect) return;
    const types = ACTIVITY_TYPES[cat] || [];
    typeSelect.innerHTML = types
      .map((t) => `<option value="${t}" ${selectedType === t ? 'selected' : ''}>${T.journal.types[t] || t}</option>`)
      .join('');
  }

  function updateLiveStrain() {
    const cat = catInput ? catInput.value : 'training';
    if (cat === 'event') {
      if (rpeGroup) rpeGroup.style.display = 'none';
      if (strainLiveDisplay) strainLiveDisplay.textContent = 'Strain: 0,0 / 21';
    } else {
      if (rpeGroup) rpeGroup.style.display = 'block';
      const d = Number(durInput?.value) || 0;
      const r = Number(rpeInput?.value) || 1;
      const s = calcStrain(r, d);
      if (strainLiveDisplay) strainLiveDisplay.textContent = `Strain: ${String(s.toFixed(1)).replace('.', ',')} / 21`;
    }
  }

  populateTypes(initialCategory, initialType);
  updateLiveStrain();

  // Kategória váltás
  const catButtons = modalRoot.querySelectorAll('[data-cat-choice]');
  catButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const cat = e.currentTarget.getAttribute('data-cat-choice');
      catButtons.forEach((b) => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      if (catInput) catInput.value = cat;
      populateTypes(cat);
      updateLiveStrain();
    });
  });

  // Időtartam és RPE változás figyelése
  if (durInput) durInput.addEventListener('input', updateLiveStrain);
  if (rpeInput) {
    rpeInput.addEventListener('input', (e) => {
      const val = Number(e.currentTarget.value);
      if (rpeNum) rpeNum.textContent = String(val);
      if (rpeLabel) rpeLabel.textContent = T.journal.rpeLabels[val] || '';
      updateLiveStrain();
    });
  }

  // Érzet utána gombok
  const feelButtons = modalRoot.querySelectorAll('[data-feel-val]');
  feelButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const val = e.currentTarget.getAttribute('data-feel-val');
      const isAlreadyActive = e.currentTarget.classList.contains('active');
      feelButtons.forEach((b) => b.classList.remove('active'));
      if (isAlreadyActive) {
        if (feelInput) feelInput.value = '';
      } else {
        e.currentTarget.classList.add('active');
        if (feelInput) feelInput.value = val;
      }
    });
  });

  // Modal bezárás gombok
  const btnClose = document.getElementById('btn-close-modal');
  const btnCancel = document.getElementById('btn-cancel-modal');
  const backdrop = document.getElementById('activity-modal-backdrop');

  if (btnClose) btnClose.addEventListener('click', closeActivityModal);
  if (btnCancel) btnCancel.addEventListener('click', closeActivityModal);
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeActivityModal();
    });
  }

  // ESC billentyű figyelése
  currentModalEscHandler = (e) => {
    if (e.key === 'Escape') {
      closeActivityModal();
    }
  };
  window.addEventListener('keydown', currentModalEscHandler);

  // Mobil billentyűzet megnyílásakor a fókuszált mező látható maradjon
  const formInputs = modalRoot.querySelectorAll('input, select, textarea');
  formInputs.forEach((el) => {
    el.addEventListener('focus', () => {
      setTimeout(() => {
        el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }, 150);
    });
  });

  // Törlés gomb (szerkesztéskor)
  const btnDelete = document.getElementById('btn-delete-activity');
  if (btnDelete) {
    btnDelete.addEventListener('click', handleDeleteActivity);
  }

  // Form submit
  const form = document.getElementById('form-activity-modal');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const cat = catInput ? catInput.value : 'training';
      const type = typeSelect ? typeSelect.value : '';
      const dateVal = document.getElementById('modal-input-date')?.value;
      const timeVal = document.getElementById('modal-input-time')?.value;
      const durVal = durInput?.value;
      const rpeVal = rpeInput?.value;
      const feelVal = feelInput?.value;
      const titleVal = document.getElementById('modal-input-title')?.value;
      const noteVal = document.getElementById('modal-input-note')?.value;

      if (!dateVal) {
        showModalError(T.journal.modal.validationDate);
        return;
      }

      if (cat !== 'event') {
        const dNum = Number(durVal);
        if (!dNum || dNum < 1 || dNum > 1440) {
          showModalError(T.journal.modal.validationDuration);
          return;
        }
      }

      const [y, m, d] = dateVal.split('-').map(Number);
      const [hh, mm] = (timeVal || '12:00').split(':').map(Number);
      const startDate = new Date(y, m - 1, d, hh, mm);

      const dMin = cat === 'event' ? (Number(durVal) || 0) : Number(durVal);
      const rpeNum = cat === 'event' ? 1 : (Number(rpeVal) || 1);
      const load = cat === 'event' ? 0 : rpeNum * dMin;
      const strain = cat === 'event' ? 0 : calcStrain(rpeNum, dMin);

      const payload = {
        category: cat,
        type: type,
        title: titleVal ? titleVal.trim() : null,
        note: noteVal ? noteVal.trim() : null,
        dateKey: dateVal,
        startAt: Timestamp.fromDate(startDate),
        durationMin: dMin,
        rpe: rpeNum,
        feelAfter: feelVal ? Number(feelVal) : null,
        load: load,
        strain: strain,
      };

      handleSaveActivity(payload);
    });
  }
}

function showModalError(msg, code = null) {
  const errBox = document.getElementById('modal-error-alert');
  if (errBox) {
    errBox.innerHTML = `
      <div>${escapeHtml(msg)}</div>
      ${code ? `<div class="auth-error-code">Hibakód: ${escapeHtml(code)}</div>` : ''}
    `;
    errBox.style.display = 'block';
    errBox.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
}

function closeActivityModal() {
  if (currentModalEscHandler) {
    window.removeEventListener('keydown', currentModalEscHandler);
    currentModalEscHandler = null;
  }
  state.isModalOpen = false;
  state.editingActivity = null;
  const modalRoot = document.getElementById('activity-modal-root');
  if (modalRoot) modalRoot.innerHTML = '';
  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';
}

async function handleSaveActivity(payload) {
  if (!state.currentUser) return;
  const uid = state.currentUser.uid;
  const isEdit = Boolean(state.editingActivity && state.editingActivity.id);

  try {
    if (isEdit) {
      const actRef = doc(db, 'users', uid, 'activities', state.editingActivity.id);
      await updateDoc(actRef, {
        ...payload,
        source: 'manual',
        updatedAt: serverTimestamp(),
      });
    } else {
      const actsCol = collection(db, 'users', uid, 'activities');
      await addDoc(actsCol, {
        ...payload,
        source: 'manual',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    closeActivityModal();
  } catch (err) {
    console.error('Error saving activity:', err);
    const msg = err?.code === 'permission-denied' ? T.journal.modal.errorPermission : T.journal.modal.errorGeneral;
    showModalError(msg, err?.code || null);
  }
}

async function handleDeleteActivity() {
  if (!state.currentUser || !state.editingActivity?.id) return;
  if (!window.confirm(T.journal.modal.confirmDelete)) return;

  const uid = state.currentUser.uid;
  try {
    const actRef = doc(db, 'users', uid, 'activities', state.editingActivity.id);
    await deleteDoc(actRef);
    closeActivityModal();
  } catch (err) {
    console.error('Error deleting activity:', err);
    const msg = err?.code === 'permission-denied' ? T.journal.modal.errorPermission : T.journal.modal.errorGeneral;
    showModalError(msg, err?.code || null);
  }
}


/* ==========================================================================
   10D. REGGELI CHECK-IN MODAL LOGIKA / MORNING CHECK-IN MODAL LOGIC
   ========================================================================== */

let currentCheckinEscHandler = null;

function renderRatingCard(fieldKey, label, endpoints, currentVal) {
  return `
    <div class="rating-scale-card" data-rating-field="${fieldKey}">
      <div class="rating-scale-header">
        <span class="rating-scale-label">${escapeHtml(label)}</span>
        <span class="rating-endpoints">${escapeHtml(endpoints[0])} ··· ${escapeHtml(endpoints[1])}</span>
      </div>
      <div class="rating-buttons-row" role="group" aria-label="${escapeHtml(label)}">
        ${[1, 2, 3, 4, 5].map((val) => `
          <button type="button" class="btn-rating-choice ${Number(currentVal) === val ? 'active' : ''}" data-rating-val="${val}">
            ${val}
          </button>
        `).join('')}
      </div>
      <input type="hidden" id="checkin-rating-${fieldKey}" value="${currentVal ?? ''}">
    </div>
  `;
}

function showCheckinModalError(msg, code = null) {
  const errBox = document.getElementById('checkin-modal-error');
  if (errBox) {
    errBox.innerHTML = `
      <div>${escapeHtml(msg)}</div>
      ${code ? `<div class="auth-error-code">Hibakód: ${escapeHtml(code)}</div>` : ''}
    `;
    errBox.style.display = 'block';
    errBox.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
}

function closeCheckinModal() {
  if (currentCheckinEscHandler) {
    window.removeEventListener('keydown', currentCheckinEscHandler);
    currentCheckinEscHandler = null;
  }
  state.isCheckinModalOpen = false;
  const modalRoot = document.getElementById('activity-modal-root');
  if (modalRoot) modalRoot.innerHTML = '';
  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';
}

function openCheckinModal(requestedDateKey = null) {
  state.isCheckinModalOpen = true;
  document.body.classList.add('modal-open');

  const modalRoot = document.getElementById('activity-modal-root');
  if (!modalRoot) return;

  const tCheckin = T.checkin;
  const todayKey = formatDateKey(new Date());
  const initialDateKey = requestedDateKey || todayKey;

  const maxDateKey = todayKey;
  const minDateKey = formatDateKey(new Date(Date.now() - 14 * 86400000));

  // Alapértékek betöltése
  let initialBedTime = '23:00';
  let initialSleepTime = '23:30';
  let initialWakeTime = '07:00';
  let initialUpTime = '07:15';
  let initialAwakeMin = 0;

  try {
    const saved = localStorage.getItem('lockin_last_sleep_times');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.bedTime) initialBedTime = parsed.bedTime;
      if (parsed.sleepTime) initialSleepTime = parsed.sleepTime;
      if (parsed.wakeTime) initialWakeTime = parsed.wakeTime;
      if (parsed.upTime) initialUpTime = parsed.upTime;
    }
  } catch (_) {}

  modalRoot.innerHTML = `
    <div class="modal-backdrop" id="checkin-modal-backdrop">
      <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-checkin-title-heading">
        <div class="modal-header">
          <h2 class="modal-title" id="modal-checkin-title-heading">${tCheckin.title}</h2>
          <button type="button" class="btn-modal-close" id="btn-close-checkin-modal" aria-label="Ablak bezárása">
            <svg aria-hidden="true"><use href="#icon-close"></use></svg>
          </button>
        </div>

        <form id="form-checkin-modal" class="modal-form-wrap" novalidate>
          <div class="modal-body">
            <div id="checkin-modal-error" class="form-error-alert" style="display: none;" role="alert"></div>

            <!-- Dátumválasztó mező -->
            <div class="form-group" style="margin-bottom: 16px;">
              <label class="form-label" for="checkin-date">${tCheckin.dateLabel}</label>
              <input type="date" class="form-input" id="checkin-date" value="${initialDateKey}" min="${minDateKey}" max="${maxDateKey}" required>
            </div>

            <!-- 1. Alvás adatok blokk -->
            <div class="modal-section-title">
              <svg style="width: 16px; height: 16px; color: var(--accent);" aria-hidden="true"><use href="#icon-recovery"></use></svg>
              ${tCheckin.sleepSectionTitle}
            </div>

            <div class="modal-form-grid-2">
              <div class="form-group">
                <label class="form-label" for="checkin-bed-time">${tCheckin.bedTimeLabel}</label>
                <input type="time" class="form-input" id="checkin-bed-time" value="${initialBedTime}" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="checkin-sleep-time">${tCheckin.sleepTimeLabel}</label>
                <input type="time" class="form-input" id="checkin-sleep-time" value="${initialSleepTime}" required>
              </div>
            </div>

            <div class="modal-form-grid-2">
              <div class="form-group">
                <label class="form-label" for="checkin-wake-time">${tCheckin.wakeTimeLabel}</label>
                <input type="time" class="form-input" id="checkin-wake-time" value="${initialWakeTime}" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="checkin-up-time">${tCheckin.upTimeLabel}</label>
                <input type="time" class="form-input" id="checkin-up-time" value="${initialUpTime}" required>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="checkin-awake-min">${tCheckin.awakeLabel}</label>
              <input type="number" min="0" max="600" step="1" class="form-input" id="checkin-awake-min" value="${initialAwakeMin}" placeholder="${tCheckin.awakePlaceholder}">
            </div>

            <div class="modal-sleep-preview" id="checkin-sleep-preview">
              <!-- Élő alvás előnézet -->
            </div>

            <!-- 2. Reggeli állapot és érzet (5 skála) -->
            <div class="modal-section-title" style="margin-top: 18px;">
              <svg style="width: 16px; height: 16px; color: var(--accent);" aria-hidden="true"><use href="#icon-sparkle"></use></svg>
              ${tCheckin.ratingsTitle}
            </div>

            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${renderRatingCard('sleepQuality', tCheckin.sleepQualityLabel, tCheckin.sleepQualityEndpoints, null)}
              ${renderRatingCard('restedness', tCheckin.restednessLabel, tCheckin.restednessEndpoints, null)}
              ${renderRatingCard('soreness', tCheckin.sorenessLabel, tCheckin.sorenessEndpoints, null)}
              ${renderRatingCard('mood', tCheckin.moodLabel, tCheckin.moodEndpoints, null)}
              ${renderRatingCard('stress', tCheckin.stressLabel, tCheckin.stressEndpoints, null)}
            </div>

            <!-- 3. Mért értékek (opcionális) -->
            <div class="modal-section-title" style="margin-top: 18px;">
              <svg style="width: 16px; height: 16px; color: var(--accent);" aria-hidden="true"><use href="#icon-physical"></use></svg>
              ${tCheckin.metricsTitle}
            </div>

            <div class="modal-form-grid-2">
              <div class="form-group">
                <label class="form-label" for="checkin-resting-hr">${tCheckin.restingHrLabel}</label>
                <input type="number" min="25" max="220" class="form-input" id="checkin-resting-hr" value="" placeholder="${tCheckin.restingHrPlaceholder}">
              </div>
              <div class="form-group">
                <label class="form-label" for="checkin-hrv">${tCheckin.hrvLabel}</label>
                <input type="number" min="5" max="300" class="form-input" id="checkin-hrv" value="" placeholder="${tCheckin.hrvPlaceholder}">
              </div>
            </div>

            <!-- 4. Címkék -->
            <div class="modal-section-title" style="margin-top: 18px;">
              ${tCheckin.tagsTitle}
            </div>

            <div class="modal-tags-grid">
              ${Object.entries(tCheckin.tags).map(([tagKey, tagLabel]) => `
                <button type="button" class="chip-tag-select" data-tag-key="${tagKey}">
                  ${escapeHtml(tagLabel)}
                </button>
              `).join('')}
            </div>

            <!-- 5. Megjegyzés -->
            <div class="form-group" style="margin-top: 16px;">
              <label class="form-label" for="checkin-note">${tCheckin.noteLabel}</label>
              <textarea class="form-input" id="checkin-note" maxlength="300" rows="2" placeholder="${tCheckin.notePlaceholder}" style="resize: vertical;"></textarea>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="btn-cancel-checkin-modal">${tCheckin.cancelBtn}</button>
            <button type="submit" class="btn btn-primary" id="btn-save-checkin-modal">${tCheckin.saveBtn}</button>
          </div>
        </form>
      </div>
    </div>
  `;

  // Élő alvás előnézet frissítése
  function updateLiveSleepPreview() {
    const previewBox = document.getElementById('checkin-sleep-preview');
    if (!previewBox) return;

    const bed = document.getElementById('checkin-bed-time')?.value;
    const sleep = document.getElementById('checkin-sleep-time')?.value;
    const wake = document.getElementById('checkin-wake-time')?.value;
    const up = document.getElementById('checkin-up-time')?.value;
    const awake = document.getElementById('checkin-awake-min')?.value || 0;

    if (!bed || !sleep || !wake || !up) {
      previewBox.textContent = tCheckin.previewEmpty;
      previewBox.style.color = 'var(--text-muted)';
      return;
    }

    const metrics = calcSleepMetrics(bed, sleep, wake, up, awake);
    if (metrics.error) {
      previewBox.textContent = metrics.error;
      previewBox.style.color = 'var(--bad)';
      return;
    }

    previewBox.style.color = 'var(--accent)';
    previewBox.innerHTML = `
      <span>Ágyban: <strong>${fmtDuration(metrics.timeInBedMin)}</strong></span>
      <span style="opacity: 0.4; margin: 0 6px;">|</span>
      <span>Alvás: <strong>${fmtDuration(metrics.sleepMin)}</strong></span>
      <span style="opacity: 0.4; margin: 0 6px;">|</span>
      <span>Hatékonyság: <strong>${metrics.sleepEfficiency}%</strong></span>
    `;
  }

  // Adatok betöltése egy kiválasztott naphoz
  async function loadCheckinDateData(dateKey) {
    let existingData = null;
    if (dateKey === todayKey && state.todayCheckin) {
      existingData = state.todayCheckin;
    } else if (state.sleepCheckins && state.sleepCheckins.length > 0) {
      existingData = state.sleepCheckins.find((c) => c.dateKey === dateKey) || null;
    }

    if (!existingData && state.currentUser) {
      try {
        const docSnap = await getDoc(doc(db, 'users', state.currentUser.uid, 'checkins', dateKey));
        if (docSnap.exists()) {
          existingData = { dateKey: docSnap.id, ...docSnap.data() };
        }
      } catch (e) {
        console.error('Error fetching checkin for date:', dateKey, e);
      }
    }

    const titleHeading = document.getElementById('modal-checkin-title-heading');
    if (titleHeading) {
      titleHeading.textContent = existingData ? tCheckin.editTitle : tCheckin.title;
    }

    // Alvásidők
    let bedVal = '23:00';
    let sleepVal = '23:30';
    let wakeVal = '07:00';
    let upVal = '07:15';
    let awakeVal = 0;

    if (existingData) {
      bedVal = existingData.bedTime || '23:00';
      sleepVal = existingData.sleepTime || '23:30';
      wakeVal = existingData.wakeTime || '07:00';
      upVal = existingData.upTime || '07:15';
      awakeVal = existingData.awakeMin ?? 0;
    } else {
      try {
        const saved = localStorage.getItem('lockin_last_sleep_times');
        if (saved) {
          const p = JSON.parse(saved);
          if (p.bedTime) bedVal = p.bedTime;
          if (p.sleepTime) sleepVal = p.sleepTime;
          if (p.wakeTime) wakeVal = p.wakeTime;
          if (p.upTime) upVal = p.upTime;
        }
      } catch (_) {}
    }

    const bedInput = document.getElementById('checkin-bed-time');
    const sleepInput = document.getElementById('checkin-sleep-time');
    const wakeInput = document.getElementById('checkin-wake-time');
    const upInput = document.getElementById('checkin-up-time');
    const awakeInput = document.getElementById('checkin-awake-min');

    if (bedInput) bedInput.value = bedVal;
    if (sleepInput) sleepInput.value = sleepVal;
    if (wakeInput) wakeInput.value = wakeVal;
    if (upInput) upInput.value = upVal;
    if (awakeInput) awakeInput.value = awakeVal;

    // Értékelések
    const ratings = ['sleepQuality', 'restedness', 'soreness', 'mood', 'stress'];
    ratings.forEach((fieldKey) => {
      const hidden = document.getElementById(`checkin-rating-${fieldKey}`);
      const card = modalRoot.querySelector(`.rating-scale-card[data-rating-field="${fieldKey}"]`);
      const val = existingData ? existingData[fieldKey] : null;
      if (hidden) hidden.value = val ?? '';
      if (card) {
        card.querySelectorAll('.btn-rating-choice').forEach((btn) => {
          const btnVal = Number(btn.getAttribute('data-rating-val'));
          btn.classList.toggle('active', btnVal === val);
        });
      }
    });

    // Opcionális mezők
    const hrInput = document.getElementById('checkin-resting-hr');
    const hrvInput = document.getElementById('checkin-hrv');
    const noteInput = document.getElementById('checkin-note');

    if (hrInput) hrInput.value = existingData?.restingHr ?? '';
    if (hrvInput) hrvInput.value = existingData?.hrv ?? '';
    if (noteInput) noteInput.value = existingData?.note || '';

    // Címkék
    const activeTags = new Set(existingData?.tags || []);
    modalRoot.querySelectorAll('.chip-tag-select[data-tag-key]').forEach((btn) => {
      const tag = btn.getAttribute('data-tag-key');
      btn.classList.toggle('active', activeTags.has(tag));
    });

    updateLiveSleepPreview();
  }

  // Dátumválasztó figyelése
  const dateInput = document.getElementById('checkin-date');
  if (dateInput) {
    dateInput.addEventListener('change', (e) => {
      loadCheckinDateData(e.target.value);
    });
  }

  // Kezdeti adatok betöltése
  loadCheckinDateData(initialDateKey);

  // Időpontok és ébrenlét figyelése
  const sleepInputs = [
    document.getElementById('checkin-bed-time'),
    document.getElementById('checkin-sleep-time'),
    document.getElementById('checkin-wake-time'),
    document.getElementById('checkin-up-time'),
    document.getElementById('checkin-awake-min'),
  ].filter(Boolean);

  sleepInputs.forEach((el) => {
    el.addEventListener('input', updateLiveSleepPreview);
    el.addEventListener('change', updateLiveSleepPreview);
  });

  // Értékelő skálák gombjai
  const ratingCards = modalRoot.querySelectorAll('.rating-scale-card[data-rating-field]');
  ratingCards.forEach((card) => {
    const fieldKey = card.getAttribute('data-rating-field');
    const hiddenInput = document.getElementById(`checkin-rating-${fieldKey}`);
    const buttons = card.querySelectorAll('.btn-rating-choice');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-rating-val');
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        if (hiddenInput) hiddenInput.value = val;
      });
    });
  });

  // Címkék (tags) választása
  const tagButtons = modalRoot.querySelectorAll('.chip-tag-select[data-tag-key]');
  tagButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
    });
  });

  // Bezárás gombok
  const btnClose = document.getElementById('btn-close-checkin-modal');
  const btnCancel = document.getElementById('btn-cancel-checkin-modal');
  const backdrop = document.getElementById('checkin-modal-backdrop');

  if (btnClose) btnClose.addEventListener('click', closeCheckinModal);
  if (btnCancel) btnCancel.addEventListener('click', closeCheckinModal);
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeCheckinModal();
    });
  }

  // ESC billentyű
  currentCheckinEscHandler = (e) => {
    if (e.key === 'Escape') {
      closeCheckinModal();
    }
  };
  window.addEventListener('keydown', currentCheckinEscHandler);

  // Mobil fókusz görgetés
  const formInputs = modalRoot.querySelectorAll('input, textarea');
  formInputs.forEach((el) => {
    el.addEventListener('focus', () => {
      setTimeout(() => {
        el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }, 150);
    });
  });

  // Check-in beküldése
  const form = document.getElementById('form-checkin-modal');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const selectedDate = document.getElementById('checkin-date')?.value || todayKey;
      if (selectedDate < minDateKey || selectedDate > maxDateKey) {
        showCheckinModalError(tCheckin.errors.invalidDate);
        return;
      }

      const bedTime = document.getElementById('checkin-bed-time')?.value;
      const sleepTime = document.getElementById('checkin-sleep-time')?.value;
      const wakeTime = document.getElementById('checkin-wake-time')?.value;
      const upTime = document.getElementById('checkin-up-time')?.value;
      const awakeVal = Number(document.getElementById('checkin-awake-min')?.value) || 0;

      if (!bedTime || !sleepTime || !wakeTime || !upTime) {
        showCheckinModalError(tCheckin.errors.missingTimes);
        return;
      }

      const metrics = calcSleepMetrics(bedTime, sleepTime, wakeTime, upTime, awakeVal);
      if (metrics.error) {
        showCheckinModalError(metrics.error);
        return;
      }

      // Értékelések
      const sq = document.getElementById('checkin-rating-sleepQuality')?.value;
      const rest = document.getElementById('checkin-rating-restedness')?.value;
      const sore = document.getElementById('checkin-rating-soreness')?.value;
      const mood = document.getElementById('checkin-rating-mood')?.value;
      const stress = document.getElementById('checkin-rating-stress')?.value;

      if (!sq || !rest || !sore || !mood || !stress) {
        showCheckinModalError(tCheckin.errors.missingRatings);
        return;
      }

      // Opcionális mérések
      const hrRaw = document.getElementById('checkin-resting-hr')?.value?.trim();
      const hrvRaw = document.getElementById('checkin-hrv')?.value?.trim();

      let restingHr = null;
      if (hrRaw) {
        const hrNum = Number(hrRaw);
        if (isNaN(hrNum) || hrNum < 25 || hrNum > 220) {
          showCheckinModalError(tCheckin.errors.invalidHr);
          return;
        }
        restingHr = hrNum;
      }

      let hrv = null;
      if (hrvRaw) {
        const hrvNum = Number(hrvRaw);
        if (isNaN(hrvNum) || hrvNum < 5 || hrvNum > 300) {
          showCheckinModalError(tCheckin.errors.invalidHrv);
          return;
        }
        hrv = hrvNum;
      }

      // Címkék
      const tags = [];
      modalRoot.querySelectorAll('.chip-tag-select.active[data-tag-key]').forEach((btn) => {
        tags.push(btn.getAttribute('data-tag-key'));
      });

      // Megjegyzés
      const noteRaw = document.getElementById('checkin-note')?.value || '';
      const note = noteRaw.trim().slice(0, 300);

      const readiness = calcReadiness({
        sleepMin: metrics.sleepMin,
        sleepQuality: Number(sq),
        restedness: Number(rest),
        soreness: Number(sore),
        mood: Number(mood),
        stress: Number(stress),
      });

      const payload = {
        bedTime,
        sleepTime,
        wakeTime,
        upTime,
        awakeMin: metrics.awakeMin,
        timeInBedMin: metrics.timeInBedMin,
        sleepMin: metrics.sleepMin,
        sleepEfficiency: metrics.sleepEfficiency,
        sleepQuality: Number(sq),
        restedness: Number(rest),
        soreness: Number(sore),
        mood: Number(mood),
        stress: Number(stress),
        restingHr,
        hrv,
        tags,
        note: note || null,
        readiness,
        readinessVersion: 1,
      };

      handleSaveCheckin(payload, selectedDate, { bedTime, sleepTime, wakeTime, upTime });
    });
  }
}

async function handleSaveCheckin(payload, dateKey, sleepTimes) {
  if (!state.currentUser) return;
  const uid = state.currentUser.uid;

  try {
    const docRef = doc(db, 'users', uid, 'checkins', dateKey);
    const todayKey = formatDateKey(new Date());

    let isExisting = false;
    if (dateKey === todayKey && state.todayCheckin) {
      isExisting = true;
    } else if (state.sleepCheckins && state.sleepCheckins.some((c) => c.dateKey === dateKey)) {
      isExisting = true;
    }

    const savePayload = {
      ...payload,
      updatedAt: serverTimestamp(),
    };
    if (!isExisting) {
      savePayload.createdAt = serverTimestamp();
    }

    await setDoc(docRef, savePayload, { merge: true });

    if (dateKey === todayKey) {
      state.todayCheckin = { dateKey, ...payload };
    }

    try {
      if (sleepTimes) {
        localStorage.setItem('lockin_last_sleep_times', JSON.stringify(sleepTimes));
      }
    } catch (_) {}

    closeCheckinModal();

    if (state.currentRoute === 'lab' && state.currentSubpage === 'sleep') {
      render();
    }
  } catch (err) {
    console.error('Error saving check-in:', err);
    const msg = err?.code === 'permission-denied'
      ? T.journal.modal.errorPermission
      : T.checkin.errors.saveFailed;
    showCheckinModalError(msg, err?.code || null);
  }
}


/* ==========================================================================
   10E. ALVÁSIGÉNY ÉS ALVÁS-ÁTTEKINTŐ OLDAL (5. LÉPÉS)
   ========================================================================== */

let currentSleepNeedEscHandler = null;

function closeSleepNeedModal() {
  if (currentSleepNeedEscHandler) {
    window.removeEventListener('keydown', currentSleepNeedEscHandler);
    currentSleepNeedEscHandler = null;
  }
  state.isSleepNeedModalOpen = false;
  const modalRoot = document.getElementById('activity-modal-root');
  if (modalRoot) modalRoot.innerHTML = '';
  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';
}

function openSleepNeedModal() {
  state.isSleepNeedModalOpen = true;
  document.body.classList.add('modal-open');

  const modalRoot = document.getElementById('activity-modal-root');
  if (!modalRoot) return;

  const tNeed = T.sleep.need;
  let currentNeed = getUserSleepNeedMin();

  modalRoot.innerHTML = `
    <div class="modal-backdrop" id="sleep-need-backdrop">
      <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-sleep-need-title" style="max-width: 440px;">
        <div class="modal-header">
          <h2 class="modal-title" id="modal-sleep-need-title">${escapeHtml(tNeed.modalTitle)}</h2>
          <button type="button" class="btn-modal-close" id="btn-close-sleep-need-modal" aria-label="Ablak bezárása">
            <svg aria-hidden="true"><use href="#icon-close"></use></svg>
          </button>
        </div>

        <form id="form-sleep-need-modal" class="modal-form-wrap" novalidate>
          <div class="modal-body" style="text-align: center; padding: 20px 16px;">
            <p class="text-muted" style="font-size: 0.875rem; line-height: 1.5; margin-bottom: 16px;">${escapeHtml(tNeed.modalDesc)}</p>

            <div class="sleep-need-stepper">
              <button type="button" class="btn btn-secondary" id="btn-step-need-minus" style="font-size: 1.25rem; width: 44px; height: 44px; padding: 0;">−</button>
              <div class="sleep-need-display-val" id="sleep-need-preview">${fmtDuration(currentNeed)}</div>
              <button type="button" class="btn btn-secondary" id="btn-step-need-plus" style="font-size: 1.25rem; width: 44px; height: 44px; padding: 0;">+</button>
            </div>

            <div style="margin: 16px 0 8px 0;">
              <input type="range" id="input-sleep-need-slider" min="300" max="720" step="15" value="${currentNeed}" style="width: 100%; accent-color: var(--accent); cursor: pointer;">
              <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--text-muted); margin-top: 4px;">
                <span>5 ó 00 p</span>
                <span>8 ó 00 p</span>
                <span>12 ó 00 p</span>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="btn-cancel-sleep-need">${tNeed.cancelBtn}</button>
            <button type="submit" class="btn btn-primary" id="btn-save-sleep-need">${tNeed.saveBtn}</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const slider = document.getElementById('input-sleep-need-slider');
  const preview = document.getElementById('sleep-need-preview');
  const btnMinus = document.getElementById('btn-step-need-minus');
  const btnPlus = document.getElementById('btn-step-need-plus');

  const updatePreview = (val) => {
    currentNeed = Math.max(300, Math.min(720, Math.round(val / 15) * 15));
    if (slider) slider.value = currentNeed;
    if (preview) preview.textContent = fmtDuration(currentNeed);
  };

  if (slider) {
    slider.addEventListener('input', (e) => updatePreview(Number(e.target.value)));
  }

  if (btnMinus) {
    btnMinus.addEventListener('click', () => updatePreview(currentNeed - 15));
  }

  if (btnPlus) {
    btnPlus.addEventListener('click', () => updatePreview(currentNeed + 15));
  }

  const btnClose = document.getElementById('btn-close-sleep-need-modal');
  const btnCancel = document.getElementById('btn-cancel-sleep-need');
  const backdrop = document.getElementById('sleep-need-backdrop');

  if (btnClose) btnClose.addEventListener('click', closeSleepNeedModal);
  if (btnCancel) btnCancel.addEventListener('click', closeSleepNeedModal);
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeSleepNeedModal();
    });
  }

  currentSleepNeedEscHandler = (e) => {
    if (e.key === 'Escape') closeSleepNeedModal();
  };
  window.addEventListener('keydown', currentSleepNeedEscHandler);

  const form = document.getElementById('form-sleep-need-modal');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSaveSleepNeed(currentNeed);
    });
  }
}

async function handleSaveSleepNeed(val) {
  if (!state.currentUser) return;
  const uid = state.currentUser.uid;
  const numVal = Math.max(300, Math.min(720, Number(val) || 480));

  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      sleepNeedMin: numVal,
      updatedAt: serverTimestamp(),
    });

    if (!state.userProfile) state.userProfile = {};
    state.userProfile.sleepNeedMin = numVal;

    closeSleepNeedModal();
    render();
  } catch (err) {
    console.error('Error saving sleepNeedMin:', err);
    alert('Hiba történt az alvásigény mentése során.');
  }
}

function renderSleepDurationChart(checkins, periodDays, sleepNeedMin, selectedDayKey) {
  const validCheckins = (checkins || []).filter((c) => c && typeof c.sleepMin === 'number');
  if (validCheckins.length < 3) {
    return `<div class="chart-empty-state"><p>${T.sleep.charts.emptyState}</p></div>`;
  }

  const days = [];
  const now = new Date();
  for (let i = periodDays - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const dateKey = formatDateKey(d);
    const c = checkins.find((item) => item.dateKey === dateKey) || null;
    days.push({ date: d, dateKey, checkin: c });
  }

  const maxBedMin = Math.max(...days.map((d) => d.checkin?.timeInBedMin || 0), sleepNeedMin);
  const maxVal = Math.max(600, Math.ceil((maxBedMin + 60) / 60) * 60);

  const plotW = 530;
  const plotH = 150;
  const xLeft = 45;
  const yTop = 20;
  const yBottom = yTop + plotH;

  // Rácsvonalak (3 óránként)
  const gridLines = [];
  for (let m = 180; m <= maxVal; m += 180) {
    const y = yBottom - (m / maxVal) * plotH;
    const hLabel = `${m / 60} ó`;
    gridLines.push(`
      <line x1="${xLeft}" x2="${xLeft + plotW}" y1="${y}" y2="${y}" stroke="var(--border-subtle)" stroke-width="1"></line>
      <text x="${xLeft - 6}" y="${y + 3}" font-size="10" fill="var(--text-muted)" text-anchor="end">${hLabel}</text>
    `);
  }

  // Alvásigény szaggatott vonal
  const yTarget = yBottom - (sleepNeedMin / maxVal) * plotH;
  const targetLine = `
    <line x1="${xLeft}" x2="${xLeft + plotW}" y1="${yTarget}" y2="${yTarget}" stroke="var(--accent)" stroke-dasharray="4,4" stroke-width="1.5"></line>
    <text x="${xLeft + plotW}" y="${yTarget - 4}" font-size="10" fill="var(--accent)" font-weight="600" text-anchor="end">Cél: ${fmtDuration(sleepNeedMin)}</text>
  `;

  // Oszlopok
  const colStep = plotW / periodDays;
  const barW = periodDays === 7 ? 26 : (periodDays === 14 ? 14 : 7);

  const bars = days.map((d, idx) => {
    const xC = xLeft + (idx + 0.5) * colStep;
    const xL = xC - barW / 2;
    const c = d.checkin;
    const isSelected = d.dateKey === selectedDayKey;

    let barsContent = '';
    if (c) {
      const bedH = Math.max(2, (c.timeInBedMin / maxVal) * plotH);
      const sleepH = Math.max(2, (c.sleepMin / maxVal) * plotH);
      const yBed = yBottom - bedH;
      const ySleep = yBottom - sleepH;

      barsContent = `
        <rect x="${xL}" y="${yBed}" width="${barW}" height="${bedH}" rx="3" fill="rgba(76, 141, 255, 0.25)"></rect>
        <rect x="${xL}" y="${ySleep}" width="${barW}" height="${sleepH}" rx="3" fill="var(--accent)"></rect>
      `;
    } else {
      barsContent = `
        <line x1="${xL}" x2="${xL + barW}" y1="${yBottom}" y2="${yBottom}" stroke="var(--border)" stroke-width="2"></line>
      `;
    }

    // X címke
    let dateLabel = '';
    const weekdaysShort = ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'];
    if (periodDays === 7) {
      dateLabel = `${weekdaysShort[d.date.getDay()]} ${d.date.getDate()}`;
    } else if (periodDays === 14) {
      dateLabel = `${d.date.getDate()}.`;
    } else {
      dateLabel = idx % 5 === 0 ? `${d.date.getDate()}.` : '';
    }

    const selectHighlight = isSelected ? `
      <rect x="${xC - colStep / 2 + 1}" y="${yTop}" width="${colStep - 2}" height="${plotH}" fill="rgba(76, 141, 255, 0.08)" stroke="var(--accent)" stroke-width="1" rx="4"></rect>
    ` : '';

    return `
      <g class="chart-bar-group ${isSelected ? 'selected' : ''}" data-chart-date="${d.dateKey}" tabindex="0" role="button" aria-label="${d.dateKey} adatai">
        ${selectHighlight}
        ${barsContent}
        ${dateLabel ? `<text x="${xC}" y="${yBottom + 16}" font-size="10" fill="var(--text-muted)" text-anchor="middle">${dateLabel}</text>` : ''}
        <rect x="${xC - colStep / 2}" y="${yTop}" width="${colStep}" height="${plotH + 20}" fill="transparent" style="cursor: pointer;"></rect>
      </g>
    `;
  }).join('');

  return `
    <svg class="chart-svg" viewBox="0 0 600 210" aria-label="Alvás és ágyban töltött idő oszlopdiagram">
      ${gridLines.join('')}
      <line x1="${xLeft}" x2="${xLeft + plotW}" y1="${yBottom}" y2="${yBottom}" stroke="var(--border)" stroke-width="1"></line>
      ${targetLine}
      ${bars}
    </svg>
  `;
}

function renderSleepWindowChart(checkins, periodDays, selectedDayKey) {
  const validCheckins = (checkins || []).filter((c) => c && typeof c.sleepMin === 'number');
  if (validCheckins.length < 3) {
    return `<div class="chart-empty-state"><p>${T.sleep.charts.emptyState}</p></div>`;
  }

  const days = [];
  const now = new Date();
  for (let i = periodDays - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const dateKey = formatDateKey(d);
    const c = checkins.find((item) => item.dateKey === dateKey) || null;
    days.push({ date: d, dateKey, checkin: c });
  }

  const plotW = 530;
  const plotH = 150;
  const xLeft = 45;
  const yTop = 20;
  const yBottom = yTop + plotH;

  // Y tengely: 18:00 – másnap 12:00 (1080 perc)
  const timePoints = [
    { m: 0, label: '18:00' },
    { m: 180, label: '21:00' },
    { m: 360, label: '00:00' },
    { m: 540, label: '03:00' },
    { m: 720, label: '06:00' },
    { m: 900, label: '09:00' },
    { m: 1080, label: '12:00' },
  ];

  const gridLines = timePoints.map((tp) => {
    const y = yTop + (tp.m / 1080) * plotH;
    const isMidnight = tp.m === 360;
    return `
      <line x1="${xLeft}" x2="${xLeft + plotW}" y1="${y}" y2="${y}" stroke="${isMidnight ? 'var(--border)' : 'var(--border-subtle)'}" stroke-width="${isMidnight ? 1.5 : 1}"></line>
      <text x="${xLeft - 6}" y="${y + 3}" font-size="10" fill="${isMidnight ? 'var(--text)' : 'var(--text-muted)'}" font-weight="${isMidnight ? '700' : '400'}" text-anchor="end">${tp.label}</text>
    `;
  }).join('');

  // Sávok
  const colStep = plotW / periodDays;
  const barW = periodDays === 7 ? 26 : (periodDays === 14 ? 14 : 7);

  const bars = days.map((d, idx) => {
    const xC = xLeft + (idx + 0.5) * colStep;
    const xL = xC - barW / 2;
    const c = d.checkin;
    const isSelected = d.dateKey === selectedDayKey;

    let barsContent = '';
    if (c) {
      const bedM = parseTimeToMinutes(c.bedTime) || 0;
      const bedStart = (bedM - 1080 + 1440) % 1440;
      const bedEnd = bedStart + c.timeInBedMin;

      const sleepM = parseTimeToMinutes(c.sleepTime) || 0;
      const sleepStart = (sleepM - 1080 + 1440) % 1440;
      const wakeM = parseTimeToMinutes(c.wakeTime) || 0;
      let wakeEnd = (wakeM - 1080 + 1440) % 1440;
      if (wakeEnd < sleepStart) wakeEnd += 1440;

      const yBed1 = yTop + (bedStart / 1080) * plotH;
      const yBed2 = yTop + (bedEnd / 1080) * plotH;
      const ySleep1 = yTop + (sleepStart / 1080) * plotH;
      const ySleep2 = yTop + (wakeEnd / 1080) * plotH;

      barsContent = `
        <rect x="${xL}" y="${yBed1}" width="${barW}" height="${Math.max(4, yBed2 - yBed1)}" rx="3" fill="rgba(76, 141, 255, 0.25)"></rect>
        <rect x="${xL}" y="${ySleep1}" width="${barW}" height="${Math.max(4, ySleep2 - ySleep1)}" rx="3" fill="var(--accent)"></rect>
      `;
    } else {
      barsContent = `
        <line x1="${xL}" x2="${xL + barW}" y1="${yTop + (360 / 1080) * plotH}" y2="${yTop + (360 / 1080) * plotH}" stroke="var(--border)" stroke-width="2"></line>
      `;
    }

    let dateLabel = '';
    const weekdaysShort = ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'];
    if (periodDays === 7) {
      dateLabel = `${weekdaysShort[d.date.getDay()]} ${d.date.getDate()}`;
    } else if (periodDays === 14) {
      dateLabel = `${d.date.getDate()}.`;
    } else {
      dateLabel = idx % 5 === 0 ? `${d.date.getDate()}.` : '';
    }

    const selectHighlight = isSelected ? `
      <rect x="${xC - colStep / 2 + 1}" y="${yTop}" width="${colStep - 2}" height="${plotH}" fill="rgba(76, 141, 255, 0.08)" stroke="var(--accent)" stroke-width="1" rx="4"></rect>
    ` : '';

    return `
      <g class="chart-bar-group ${isSelected ? 'selected' : ''}" data-chart-date="${d.dateKey}" tabindex="0" role="button" aria-label="${d.dateKey} alvásablak">
        ${selectHighlight}
        ${barsContent}
        ${dateLabel ? `<text x="${xC}" y="${yBottom + 16}" font-size="10" fill="var(--text-muted)" text-anchor="middle">${dateLabel}</text>` : ''}
        <rect x="${xC - colStep / 2}" y="${yTop}" width="${colStep}" height="${plotH + 20}" fill="transparent" style="cursor: pointer;"></rect>
      </g>
    `;
  }).join('');

  return `
    <svg class="chart-svg" viewBox="0 0 600 210" aria-label="Alvásablak lebegő sáv diagram">
      ${gridLines}
      ${bars}
    </svg>
  `;
}

function renderSleepPage() {
  const tSleep = T.sleep;
  const userSleepNeed = getUserSleepNeedMin();
  const periodDays = state.sleepPeriod || 7;
  const checkins = state.sleepCheckins || [];
  const stats = calcSleepPeriodStats(checkins, userSleepNeed);

  // Kijelölt nap infója
  let selectedDayInfo = '';
  const selectedKey = state.sleepChartSelectedDay;
  const selectedCheckin = selectedKey
    ? checkins.find((c) => c.dateKey === selectedKey)
    : (checkins.length > 0 ? checkins[checkins.length - 1] : null);

  if (selectedCheckin) {
    const formattedDate = formatDayGroupTitle(selectedCheckin.dateKey);
    selectedDayInfo = `
      <span><strong>${escapeHtml(formattedDate)}</strong></span>
      <span>Alvás: <strong>${fmtDuration(selectedCheckin.sleepMin)}</strong></span>
      <span>Ágyban: <strong>${fmtDuration(selectedCheckin.timeInBedMin)}</strong></span>
      <span>Hatékonyság: <strong>${selectedCheckin.sleepEfficiency}%</strong></span>
      <span>Ablak: <strong>${selectedCheckin.bedTime} – ${selectedCheckin.upTime}</strong></span>
    `;
  } else {
    selectedDayInfo = `<span class="text-muted">${tSleep.charts.clickInfo}</span>`;
  }

  // Összesítő kártyák
  const statsHtml = `
    <div class="sleep-stats-grid">
      <div class="sleep-stat-card">
        <span class="sleep-stat-label">${tSleep.stats.avgSleep}</span>
        <span class="sleep-stat-value">${stats.avgSleepFmt}</span>
        <span class="sleep-stat-sub">${tSleep.stats.fromN.replace('{n}', stats.count)}</span>
      </div>

      <div class="sleep-stat-card">
        <span class="sleep-stat-label">${tSleep.stats.avgBed}</span>
        <span class="sleep-stat-value">${stats.avgBedFmt}</span>
        <span class="sleep-stat-sub">${tSleep.stats.fromN.replace('{n}', stats.count)}</span>
      </div>

      <div class="sleep-stat-card">
        <span class="sleep-stat-label">${tSleep.stats.efficiency}</span>
        <span class="sleep-stat-value">${stats.efficiency}%</span>
        <span class="sleep-stat-sub">${tSleep.stats.fromN.replace('{n}', stats.count)}</span>
      </div>

      <div class="sleep-stat-card">
        <span class="sleep-stat-label">${tSleep.stats.debt}</span>
        <span class="sleep-stat-value">${stats.sleepDebtFmt}</span>
        <span class="sleep-stat-sub">${tSleep.stats.fromN.replace('{n}', stats.debtCount)}</span>
      </div>

      <div class="sleep-stat-card">
        <span class="sleep-stat-label">${tSleep.stats.regularity}</span>
        <span class="sleep-stat-value">${stats.regularityStdDev !== null ? `${stats.regularityStdDev} p` : '—'}</span>
        <span class="sleep-stat-tag tag-${stats.regularityStatus}">${stats.regularityLabel}</span>
      </div>
    </div>
  `;

  // Grafikonok
  const chart1Html = renderSleepDurationChart(checkins, periodDays, userSleepNeed, selectedKey);
  const chart2Html = renderSleepWindowChart(checkins, periodDays, selectedKey);

  // Napi lista
  const sortedCheckins = [...checkins].sort((a, b) => b.dateKey.localeCompare(a.dateKey));
  let logListHtml = '';
  if (sortedCheckins.length === 0) {
    logListHtml = `
      <div class="chart-empty-state">
        <p>Ebben az időszakban még nem rögzítettél alvási adatot.</p>
        <button type="button" class="btn btn-primary btn-sm" id="btn-sleep-log-new" style="margin-top: 10px;">+ Reggeli check-in rögzítése</button>
      </div>
    `;
  } else {
    logListHtml = `
      <div class="sleep-log-list">
        ${sortedCheckins.map((c) => {
          const dateTitle = formatDayGroupTitle(c.dateKey);
          const tags = Array.isArray(c.tags) ? c.tags : [];
          const tagLabels = {
            sick: 'Beteg',
            travel: 'Utazás',
            alcohol: 'Alkohol',
            lateTraining: 'Késői edzés',
          };
          return `
            <div class="sleep-log-card" data-checkin-date="${c.dateKey}" role="button" tabindex="0" aria-label="${escapeHtml(dateTitle)} check-in szerkesztése">
              <div class="sleep-log-main">
                <span class="sleep-log-date">${escapeHtml(dateTitle)}</span>
                <span class="sleep-log-sub">
                  <span>${c.bedTime} – ${c.upTime}</span>
                  ${c.restedness ? `<span>• ${tSleep.log.restedLabel}: ${c.restedness}/5</span>` : ''}
                </span>
                ${tags.length > 0 ? `
                  <div class="sleep-tags-row" style="margin-top: 4px;">
                    ${tags.map((t) => `<span class="sleep-tag-chip">${escapeHtml(tagLabels[t] || t)}</span>`).join('')}
                  </div>
                ` : ''}
              </div>
              <div class="sleep-log-right">
                <div>
                  <div class="sleep-log-val">${fmtDuration(c.sleepMin)}</div>
                  <div class="sleep-log-eff">${c.sleepEfficiency}% hatékonyság</div>
                </div>
                <svg style="width: 16px; height: 16px; color: var(--text-muted);" aria-hidden="true"><use href="#icon-chevron-right"></use></svg>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  // Alváshigiénia kártya
  const hygieneHtml = `
    <details class="accordion-card">
      <summary class="accordion-summary">
        <div style="display: flex; align-items: center; gap: 8px;">
          <svg style="width: 18px; height: 18px; color: var(--accent);" aria-hidden="true"><use href="#icon-sparkle"></use></svg>
          <span>${tSleep.hygiene.title}</span>
        </div>
        <svg style="width: 16px; height: 16px; color: var(--text-muted);" aria-hidden="true"><use href="#icon-chevron-right"></use></svg>
      </summary>
      <div class="accordion-body">
        <div class="text-muted" style="margin-bottom: 8px; font-weight: 500;">${tSleep.hygiene.disclaimerTop}</div>
        <ul class="hygiene-tips-list">
          ${tSleep.hygiene.tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join('')}
        </ul>
        <div class="hygiene-disclaimer">${tSleep.hygiene.disclaimerBottom}</div>
      </div>
    </details>
  `;

  return `
    <div class="sleep-page">
      <div>
        <a href="#/lab/recovery" class="btn-back" aria-label="${tSleep.backToRecovery}">
          <svg class="btn-back-icon" aria-hidden="true"><use href="#icon-arrow-left"></use></svg>
          <span>${tSleep.backToRecovery}</span>
        </a>
      </div>

      <div class="sleep-hero">
        <div class="section-header" style="margin-bottom: 0;">
          <div>
            <h1>${tSleep.title}</h1>
            <p class="section-subtitle">${tSleep.subtitle}</p>
          </div>
        </div>

        <!-- Alvásigény sor -->
        <div class="sleep-need-banner">
          <div class="sleep-need-info">
            <div class="sleep-need-icon">
              <svg aria-hidden="true"><use href="#icon-recovery"></use></svg>
            </div>
            <div class="sleep-need-text">
              ${tSleep.need.label}: <strong>${fmtDuration(userSleepNeed)}</strong>
            </div>
          </div>
          <button type="button" class="btn btn-secondary btn-sm" id="btn-edit-sleep-need">${tSleep.need.editBtn}</button>
        </div>

        <!-- Időszak választó -->
        <div class="sleep-period-bar">
          <span class="text-muted text-small" style="font-weight: 600;">Időszak:</span>
          <div class="segmented-control" role="group" aria-label="Időszak választása">
            <button type="button" class="segmented-btn ${periodDays === 7 ? 'active' : ''}" data-sleep-period="7">${tSleep.periods[7]}</button>
            <button type="button" class="segmented-btn ${periodDays === 14 ? 'active' : ''}" data-sleep-period="14">${tSleep.periods[14]}</button>
            <button type="button" class="segmented-btn ${periodDays === 30 ? 'active' : ''}" data-sleep-period="30">${tSleep.periods[30]}</button>
          </div>
        </div>
      </div>

      <!-- Összesítő statisztikák -->
      ${statsHtml}

      <!-- Grafikon 1: Alvás és ágyban töltött idő -->
      <section class="chart-card">
        <div class="chart-header">
          <h2 class="chart-title">
            <svg style="width: 18px; height: 18px; color: var(--accent);" aria-hidden="true"><use href="#icon-recovery"></use></svg>
            ${tSleep.charts.chart1Title}
          </h2>
          <div class="chart-legend">
            <div class="chart-legend-item"><span class="chart-legend-dot" style="background: rgba(76, 141, 255, 0.25);"></span>${tSleep.charts.chart1LegendBed}</div>
            <div class="chart-legend-item"><span class="chart-legend-dot" style="background: var(--accent);"></span>${tSleep.charts.chart1LegendSleep}</div>
            <div class="chart-legend-item"><span class="chart-legend-dot" style="background: transparent; border-top: 2px dashed var(--accent);"></span>${tSleep.charts.chart1LegendTarget}</div>
          </div>
        </div>
        <div class="chart-svg-wrap">
          ${chart1Html}
        </div>
      </section>

      <!-- Grafikon 2: Alvásablak -->
      <section class="chart-card">
        <div class="chart-header">
          <h2 class="chart-title">
            <svg style="width: 18px; height: 18px; color: var(--accent);" aria-hidden="true"><use href="#icon-recovery"></use></svg>
            ${tSleep.charts.chart2Title}
          </h2>
          <div class="chart-legend">
            <div class="chart-legend-item"><span class="chart-legend-dot" style="background: rgba(76, 141, 255, 0.25);"></span>${tSleep.charts.chart2LegendBed}</div>
            <div class="chart-legend-item"><span class="chart-legend-dot" style="background: var(--accent);"></span>${tSleep.charts.chart2LegendSleep}</div>
          </div>
        </div>
        <div class="chart-svg-wrap">
          ${chart2Html}
        </div>
      </section>

      <!-- Interaktív infósáv -->
      <div class="chart-info-box" id="sleep-chart-info">
        ${selectedDayInfo}
      </div>

      <!-- Napi alvásnapló lista -->
      <section class="card">
        <div class="section-header">
          <h2 class="section-title">${tSleep.log.title}</h2>
          <button type="button" class="btn btn-secondary btn-sm" id="btn-sleep-log-new">+ Új check-in</button>
        </div>
        ${logListHtml}
      </section>

      <!-- Alváshigiénia kártya -->
      ${hygieneHtml}
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
              <button type="button" class="segmented-btn ${state.themeSetting === 'auto' ? 'active' : ''}" data-theme-btn="auto">
                ${tMore.themes.auto}
              </button>
              <button type="button" class="segmented-btn ${state.themeSetting === 'dark' ? 'active' : ''}" data-theme-btn="dark">
                ${tMore.themes.dark}
              </button>
              <button type="button" class="segmented-btn ${state.themeSetting === 'light' ? 'active' : ''}" data-theme-btn="light">
                ${tMore.themes.light}
              </button>
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
              <span class="chip" style="opacity: 0.55; cursor: not-allowed;">${MODES.junior.name} <span class="badge badge-coming-soon" style="margin-left: 6px;">${T.comingSoonBadge}</span></span>
              <span class="chip" style="opacity: 0.55; cursor: not-allowed;">${MODES.longevity.name} <span class="badge badge-coming-soon" style="margin-left: 6px;">${T.comingSoonBadge}</span></span>
            </div>
          </div>
          <hr style="border: none; border-top: 1px solid var(--border-subtle);">
          <div class="settings-item">
            <div>
              <div class="settings-item-title">${tMore.language}</div>
              <div class="settings-item-desc">${tMore.languageDesc}</div>
            </div>
            <div class="badge" style="background: var(--surface-2); color: var(--text); border: 1px solid var(--border); font-size: 0.85rem; padding: 6px 12px;">${tMore.langValue}</div>
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
        <div class="section-header"><h2 class="section-title">${tMore.sections.features}</h2></div>
        <div class="menu-list" role="list">
          <a href="#/more/profile" class="menu-item" role="listitem" style="cursor: pointer;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-weight: 600;">${tMore.menu.profile}</span>
              <span id="more-menu-user-name" class="text-muted text-small"></span>
            </div>
            <div class="menu-item-action"><svg style="width: 16px; height: 16px; color: var(--text-muted);" aria-hidden="true"><use href="#icon-chevron-right"></use></svg></div>
          </a>
          ${[tMore.menu.devices, tMore.menu.privacy, tMore.menu.team, tMore.menu.notifications, tMore.menu.help].map((itemText) => `
            <div class="menu-item" role="listitem">
              <span>${itemText}</span>
              <div class="menu-item-action"><span class="badge badge-coming-soon">${T.comingSoonBadge}</span><svg style="width: 16px; height: 16px; color: var(--text-muted);" aria-hidden="true"><use href="#icon-chevron-right"></use></svg></div>
            </div>`).join('')}
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
          <svg class="btn-back-icon" aria-hidden="true"><use href="#icon-arrow-left"></use></svg><span>${tProf.backToMore}</span>
        </a>
      </div>

      ${renderEmailVerificationBanner()}

      <div class="card" style="display: flex; flex-direction: column; gap: 18px;">
        <div class="section-header" style="margin-bottom: 0;"><h1 style="font-size: 1.35rem; font-weight: 700;">${tProf.title}</h1></div>
        <div id="profile-feedback-box" style="display: none;"></div>

        <div class="form-group">
          <label class="form-label">${tProf.emailLabel}</label>
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; background: var(--surface-2); padding: 12px 14px; border-radius: var(--radius-md); border: 1px solid var(--border);">
            <span id="profile-user-email" style="font-weight: 500; word-break: break-all;"></span>
            <span class="badge ${isVerified ? 'badge-sample' : 'badge-coming-soon'}">${isVerified ? T.verification.statusVerified : T.verification.statusPending}</span>
          </div>
        </div>

        <form id="form-profile-name">
          <div class="form-group">
            <label for="profile-input-name" class="form-label">${tProf.nameLabel}</label>
            <input type="text" id="profile-input-name" class="form-input" required maxlength="60" placeholder="${T.onboarding.namePlaceholder}">
          </div>
          <button type="submit" class="btn btn-primary">${tProf.saveNameBtn}</button>
        </form>

        <hr style="border: none; border-top: 1px solid var(--border-subtle); margin: 6px 0;">

        <div style="display: flex; flex-direction: column; gap: 10px;">
          <button type="button" class="btn btn-secondary" id="btn-profile-signout" style="color: var(--bad); border-color: var(--bad-subtle); justify-content: flex-start;">
            <svg style="width: 18px; height: 18px;" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
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

  // 2b. Reggeli check-in indítás / szerkesztés gombok (Home oldal)
  const btnStartCheckin = document.getElementById('btn-start-checkin');
  if (btnStartCheckin) {
    btnStartCheckin.addEventListener('click', () => openCheckinModal());
  }
  const btnEditCheckin = document.getElementById('btn-edit-checkin');
  if (btnEditCheckin) {
    btnEditCheckin.addEventListener('click', () => openCheckinModal());
  }

  // 3. Journal interakciók és nézetek
  // 3a. Hónapváltó navigációs gombok (< és >)
  const btnPrevMonth = document.getElementById('btn-journal-prev-month');
  if (btnPrevMonth) {
    btnPrevMonth.addEventListener('click', () => {
      const d = new Date(state.journalDate);
      d.setDate(1);
      d.setMonth(d.getMonth() - 1);
      state.journalDate = d;
      if (state.currentUser) {
        subscribeJournalMonth(state.currentUser.uid, state.journalDate);
      }
      render();
    });
  }

  const btnNextMonth = document.getElementById('btn-journal-next-month');
  if (btnNextMonth) {
    btnNextMonth.addEventListener('click', () => {
      const d = new Date(state.journalDate);
      d.setDate(1);
      d.setMonth(d.getMonth() + 1);
      state.journalDate = d;
      if (state.currentUser) {
        subscribeJournalMonth(state.currentUser.uid, state.journalDate);
      }
      render();
    });
  }

  // 3b. Lista / Naptár nézetváltó gombok
  const journalViewButtons = document.querySelectorAll('[data-journal-view]');
  journalViewButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const selectedView = e.currentTarget.getAttribute('data-journal-view');
      if (state.journalView !== selectedView) {
        state.journalView = selectedView;
        render();
      }
    });
  });

  // 3c. Új activity megnyitása gombok (fejléc, üres állapot, lebegő FAB)
  const openNewButtons = [
    document.getElementById('btn-open-new-activity'),
    document.getElementById('btn-empty-new-activity'),
    document.getElementById('fab-new-activity'),
  ].filter(Boolean);

  openNewButtons.forEach((btn) => {
    btn.addEventListener('click', () => openActivityModal());
  });

  // 3d. Naptár nézet naphoz adás gomb
  const btnAddForDay = document.getElementById('btn-add-for-selected-day');
  if (btnAddForDay) {
    const dateKey = btnAddForDay.getAttribute('data-date') || state.journalSelectedDateKey;
    btnAddForDay.addEventListener('click', () => openActivityModal(null, dateKey));
  }

  // 3e. Naptár napcellák kiválasztása
  const calCells = document.querySelectorAll('.calendar-day-cell[data-calendar-date]');
  calCells.forEach((cell) => {
    const dateKey = cell.getAttribute('data-calendar-date');
    const onSelectDay = () => {
      state.journalSelectedDateKey = dateKey;
      render();
    };
    cell.addEventListener('click', onSelectDay);
    cell.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelectDay();
      }
    });
  });

  // 3f. Activity kártyák megnyitása szerkesztésre
  const actCards = document.querySelectorAll('.activity-card[data-activity-id]');
  actCards.forEach((card) => {
    const actId = card.getAttribute('data-activity-id');
    const onCardClick = () => {
      const found = state.journalActivities.find((a) => a.id === actId);
      if (found) {
        openActivityModal(found);
      }
    };
    card.addEventListener('click', onCardClick);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onCardClick();
      }
    });
  });

  // 3g. Alvás oldal (Performance Lab -> Regeneráció -> Alvás) eseményei
  const sleepPeriodBtns = document.querySelectorAll('[data-sleep-period]');
  sleepPeriodBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const period = Number(e.currentTarget.getAttribute('data-sleep-period'));
      if (period && period !== state.sleepPeriod) {
        state.sleepPeriod = period;
        state.sleepChartSelectedDay = null;
        if (state.currentUser) {
          subscribeSleepPeriod(state.currentUser.uid, period);
        }
        render();
      }
    });
  });

  const btnEditSleepNeed = document.getElementById('btn-edit-sleep-need');
  if (btnEditSleepNeed) {
    btnEditSleepNeed.addEventListener('click', () => {
      openSleepNeedModal();
    });
  }

  const chartBars = document.querySelectorAll('[data-chart-date]');
  chartBars.forEach((bar) => {
    const dateKey = bar.getAttribute('data-chart-date');
    const selectBarDay = () => {
      state.sleepChartSelectedDay = dateKey;
      render();
    };
    bar.addEventListener('click', selectBarDay);
    bar.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectBarDay();
      }
    });
  });

  const checkinCards = document.querySelectorAll('.sleep-log-card[data-checkin-date]');
  checkinCards.forEach((card) => {
    const dateKey = card.getAttribute('data-checkin-date');
    const onCardClick = () => {
      openCheckinModal(dateKey);
    };
    card.addEventListener('click', onCardClick);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onCardClick();
      }
    });
  });

  const btnSleepLogNewList = document.querySelectorAll('#btn-sleep-log-new');
  btnSleepLogNewList.forEach((btn) => {
    btn.addEventListener('click', () => {
      openCheckinModal();
    });
  });

  // 4. E-mail újraküldő gomb
  const resendBtn = document.getElementById('btn-resend-verification');
  if (resendBtn) {
    resendBtn.addEventListener('click', () => handleResendVerification(resendBtn));
  }

  // 5. Auth felület eseményei
  const btnGoogle = document.getElementById('btn-google-auth');
  if (btnGoogle) {
    btnGoogle.addEventListener('click', handleGoogleSignIn);
  }

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
        handleRegister(email, pwd);
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

  // Onboarding űrlap és interakciók
  const formOnboarding = document.getElementById('form-onboarding');
  if (formOnboarding) {
    const onbName = document.getElementById('onboarding-name');
    const onbAge = document.getElementById('onboarding-age-check');
    const onbSubmit = document.getElementById('btn-onboarding-submit');

    const updateOnbSubmitState = () => {
      const hasValidName = onbName && onbName.value.trim().length >= 1 && onbName.value.trim().length <= 60;
      const isAgeConfirmed = onbAge && onbAge.checked;
      if (onbSubmit) {
        onbSubmit.disabled = !(hasValidName && isAgeConfirmed);
      }
    };

    if (onbName) onbName.addEventListener('input', updateOnbSubmitState);
    if (onbAge) onbAge.addEventListener('change', updateOnbSubmitState);
    updateOnbSubmitState();

    formOnboarding.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSaveOnboarding(onbName.value, onbAge.checked);
    });

    const btnUnder18 = document.getElementById('btn-onboarding-under18');
    if (btnUnder18) {
      btnUnder18.addEventListener('click', handleUnder18);
    }
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
  const homeGreeting = document.getElementById('home-greeting-heading');
  if (homeGreeting) {
    const name = state.userProfile?.displayName;
    homeGreeting.textContent = name ? `Szia, ${name}!` : T.home.greeting;
  }

  const moreUserLabel = document.getElementById('more-menu-user-name');
  if (moreUserLabel && state.userProfile?.displayName) {
    moreUserLabel.textContent = `(${state.userProfile.displayName})`;
  }

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

  // 1. A menü és layout láthatóságának kötelező szinkronizálása a state.status alapján!
  syncLayoutVisibility();

  let htmlContent = '';

  if (state.status === 'loading') {
    htmlContent = renderLoading();
  } else if (state.status === 'signedOut') {
    htmlContent = renderAuth();
  } else if (state.status === 'onboarding') {
    htmlContent = renderOnboarding();
  } else if (state.status === 'ready') {
    if (state.currentRoute === 'home') {
      htmlContent = renderHome();
    } else if (state.currentRoute === 'lab') {
      if (state.currentPillar === 'recovery' && state.currentSubpage === 'sleep') {
        htmlContent = renderSleepPage();
      } else if (state.currentPillar) {
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

  if (state.status === 'ready') {
    updateNavigationUI();
  }

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
