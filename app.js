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
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  writeBatch,
  onSnapshot,
  Timestamp,
  serverTimestamp,
  documentId,
  deleteField,
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
  routeError: {
    title: 'Hiba történt',
    message: 'Nem sikerült megnyitni az oldalt. Próbáld újra.',
    retryBtn: 'Újra',
    backBtn: 'Vissza',
  },
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
    whyEmpty: 'Töltsd ki a reggeli check-int, és megmutatjuk, mi áll a számok mögött.',
    welcome: {
      title: 'Üdv a Lockinban!',
      desc: 'Kezdd egy reggeli check-innel vagy az első edzésed naplózásával.',
      btnCheckin: 'Reggeli check-in',
      btnActivity: 'Új activity',
    },
    tasksTitle: 'Mai teendők',
    todos: {
      checkin: 'Reggeli check-in',
      checkinDone: 'Reggeli check-in rögzítve',
      activity: 'Edzés vagy regeneráció naplózása',
      activityDone: 'Edzés vagy regeneráció rögzítve',
      hydration: 'Hidratáció naplózása',
      hydrationDone: 'Hidratáció naplózva',
      btnStart: 'Kitöltés',
      btnEdit: 'Szerkesztés',
      btnLog: 'Naplózás',
      btnOpen: 'Megnyitás',
    },
    suggestionTitle: 'Mai javaslat',
    suggestionText: 'Közepes intenzitású aerob munka vagy technikai gyakorlás ajánlott (RPE 6–7). Kerüld a maximális glikolitikus terhelést a holnapi felmérő előtt.',
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
          { title: 'Étkezési terv', desc: 'Heti étkezési terv, étkezésenkénti és napi összesített makrotápanyagok követése.' },
          { title: 'Ételtár', desc: 'Saját ételek és receptek könyvtára makrókkal, összetevőkkel és allergénekkel.' },
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
    details: {
      title: 'Tevékenység részletei',
      shareBtn: 'Megosztás',
      editBtn: 'Szerkesztés',
      closeBtn: 'Bezárás',
      typeLabel: 'Típus',
      dateLabel: 'Dátum és idő',
      durationLabel: 'Időtartam',
      strainLabel: 'Strain',
      rpeLabel: 'RPE intenzitás',
      feelLabel: 'Érzet utána',
      noteLabel: 'Megjegyzés',
    },
  },
  more: {
    title: 'More',
    sections: { settings: 'Beállítások', dataManagement: 'Adatkezelés', features: 'Funkciók és fiók' },
    deleteData: {
      btn: 'Összes adatom törlése',
      desc: 'Minden mentett tevékenység, check-in, hidratáció, étel és étkezési bejegyzés végleges törlése',
      modalTitle: 'Összes saját adat törlése',
      modalWarning: 'Ez a művelet visszavonhatatlan. Véglegesen törlődni fog minden saját adatod a Lockin adatbázisából:',
      collectionsList: [
        'Tevékenységek és edzések (activities)',
        'Reggeli check-inek és alvási adatok (checkins)',
        'Folyadék- és hidratációs napló (hydration)',
        'Saját ételek könyvtára (foods)',
        'Étkezési naplóbejegyzések (mealEntries)',
      ],
      confirmInstruction: 'A megerősítéshez írd be a TÖRLÉS szót az alábbi mezőbe:',
      confirmPlaceholder: 'TÖRLÉS',
      cancelBtn: 'Mégse',
      confirmBtn: 'Adatok végleges törlése',
      deleting: 'Törlés… {n} elem törölve',
      deletedSuccess: 'Sikeresen törölve: {n} elem.',
      errorMsg: 'Hiba történt a törlés során: {error}',
      retryBtn: 'Újra',
    },
    appearance: 'Megjelenés',
    appearanceDesc: 'Rendszerszintű, sötét vagy világos felület beállítása',
    themes: { auto: 'Auto', dark: 'Sötét', light: 'Világos' },
    mode: 'Mód',
    modeDesc: 'Sportolói profil és célkitűzés fókusza',
    language: 'Nyelv',
    languageDesc: 'Felhasználói felület nyelve',
    langValue: 'Magyar',
    version: 'Verzió',
    versionValue: '0.8.0',
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
      chipQuestionnaire: 'Becsült (kérdőív)',
      chipMetrics: 'Becsült (kérdőív + mérések)',
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
  nervous: {
    title: 'Idegrendszeri mérések',
    subtitle: 'HRV trendek, nyugalmi pulzus és személyes alapvonal',
    backToRecovery: 'Vissza a Regenerációhoz',
    periods: {
      14: '14 nap',
      30: '30 nap',
      60: '60 nap',
    },
    excludeToggleLabel: 'Beteg, utazásos és alkoholos napok kihagyása az alapvonalból',
    baselineCard: {
      title: 'Személyes alapvonal',
      learningStatus: 'Tanulunk ({n}/14)',
      activeStatus: 'Aktív ({n} mérés alapján)',
      hrvRow: 'HRV (rMSSD)',
      rhrRow: 'Nyugalmi pulzus',
      bandLabel: 'Normál sáv',
      avg7dLabel: '7 napos átlag',
      statusWithin: 'Normál tartomány',
      statusAbove: 'Sáv felett',
      statusBelow: 'Sáv alatt',
      statusLearning: 'Tanulás alatt',
      noData: 'Nincs adat',
    },
    charts: {
      hrvTitle: 'HRV (pulzusvariabilitás)',
      rhrTitle: 'Nyugalmi pulzus',
      legendPoints: 'Napi mérés',
      legend7d: '7 napos átlag',
      legendBand: 'Normál sáv',
      emptyState: 'A trendhez legalább 3 mérés kell',
      clickInfo: 'Koppints egy pontra a részletekért',
      unitHrv: 'ms',
      unitRhr: 'bpm',
    },
    signals: {
      title: 'Jelzések',
      bothDeviating: 'Több jel együtt eltér a szokásostól (alacsonyabb HRV, magasabb nyugalmi pulzus). Fontold meg a terhelés csökkentését. Rosszullét vagy láz esetén egyeztess orvossal. Ez nem diagnózis.',
      hrvOnlyBelow: 'A HRV-d a szokásosnál alacsonyabb, ami megnövekedett stresszre vagy fáradtságra utalhat. Ügyelj a pihenésre és az alvásminőségre. Ez nem diagnózis.',
      rhrOnlyAbove: 'A nyugalmi pulzusod kissé emelkedett a szokásos alapvonaladhoz képest. Figyeld a tested jelzéseit és hidratálj megfelelően. Ez nem diagnózis.',
      disclaimer: 'Ez nem diagnózis.',
    },
    guide: {
      title: 'Mérési útmutató',
      tips: [
        'Reggel ébredés után mérj, mielőtt felkelsz vagy kávézol.',
        'Mindig ugyanabban a testhelyzetben és ugyanazzal az eszközzel.',
        '1–5 percig maradj nyugodtan a mérés alatt.',
        'Az eszközök értékei nem összehasonlíthatók egymással, a saját trended számít.',
        'A HRV egyénenként nagyon eltérő.',
        'A betegség, alkohol, kevés alvás miatti kiugrás természetes.',
      ],
      disclaimerBottom: 'Általános tippek, nem orvosi tanács.',
    },
    log: {
      title: 'Napi mérések',
      editPrompt: 'Koppints a szerkesztéshez',
      emptyLog: 'Ebben az időszakban még nem rögzítettél mérést.',
    },
  },
  share: {
    title: 'Megosztás',
    backToDetails: 'Vissza a részletekhez',
    headerTagline: 'Performance Lab',
    previewAlt: 'Activity megosztási kép előnézete',
    renderError: 'Nem sikerült elkészíteni a képet. Próbáld újra.',
    retryBtn: 'Újra',
    bgLabel: 'Háttér',
    bgTransparent: 'Átlátszó',
    bgDark: 'Sötét',
    bgLight: 'Világos',
    textColorLabel: 'Szövegszín',
    textWhite: 'Fehér',
    textBlack: 'Fekete',
    shadowLabel: 'Árnyék a jobb olvashatóságért',
    previewBgLabel: 'Előnézeti háttér',
    previewBgs: {
      checkered: 'Kockás',
      dark: 'Sötét',
      light: 'Világos',
      custom: 'Saját fotó',
    },
    previewUploadBtn: 'Fotó kiválasztása...',
    previewChangeBtn: 'Fotó cseréje...',
    transparencyHint: 'A kockás mező átlátszó. A letöltött és kimásolt PNG-ben nincs háttér.',
    copyAppNotice: 'Néhány alkalmazás beillesztéskor fehér vagy fekete háttérre lapítja a képet. Ha ez történik, használd a Letöltés gombot!',
    fieldsSection: 'Megjelenő adatok',
    noData: 'Nincs adat ehhez az activityhez',
    fields: {
      typeTitle: 'Típus és cím',
      date: 'Dátum',
      duration: 'Időtartam',
      strain: 'Strain',
      rpe: 'RPE intenzitás',
      feelAfter: 'Érzet utána',
      note: 'Megjegyzés',
      startTime: 'Kezdési idő',
      userName: 'Név (sportolói profil)',
      route: 'Útvonal-rajz',
      routePrivacy: 'Kezdő és végpont elrejtése (200 m)',
      hrSeries: 'Pulzus-grafikon',
      distance: 'Távolság',
      pace: 'Tempó',
      avgHr: 'Átlagpulzus',
      maxHr: 'Max pulzus',
      elevationGain: 'Szintemelkedés',
    },
    actions: {
      copy: 'Kép másolása',
      copied: 'Kép a vágólapra másolva!',
      copyNotSupported: 'A vágólapra másolás ebben a böngészőben nem támogatott. Kérjük, használd a Letöltés gombot!',
      download: 'Letöltés (PNG)',
      share: 'Megosztás',
      downloadSuccess: 'Kép letöltése elindult!',
      rendering: 'Kép generálása...',
    },
    canvas: {
      brandTagline: 'Sportolói teljesítmény és egészség',
      strainScale: '0–21 skála',
      strainLabel: 'STRAIN',
      strainLevels: {
        high: 'Magas terhelés',
        med: 'Közepes terhelés',
        low: 'Könnyű terhelés',
      },
      durationLabel: 'IDŐTARTAM',
      rpeLabel: 'RPE INTENZITÁS',
      feelLabel: 'ÉRZET UTÁNA',
      distanceLabel: 'TÁVOLSÁG',
      paceLabel: 'TEMPÓ',
      avgHrLabel: 'ÁTLAGPULZUS',
      maxHrLabel: 'MAX PULZUS',
      elevationLabel: 'SZINTEMELKEDÉS',
      routeLabel: 'ÚTVONAL',
      routeTooShort: 'Az útvonal a 200 m-es védelmi zóna után túl rövid a megjelenítéshez.',
      hrLabel: 'PULZUSGÖRBE',
      noteLabel: 'MEGJEGYZÉS',
      emptyCardMessage: 'Lockin Teljesítménykártya',
    },
  },
  hydration: {
    title: 'Hidratáció',
    subtitle: 'Folyadék- és elektrolit-egyensúly, hatékony hidratáció (BHI)',
    backToNutrition: 'Vissza a Táplálkozáshoz',
    todayLabel: 'Ma',
    summary: {
      rawLabel: 'Nyers folyadék',
      effectiveLabel: 'Hatékony folyadék',
      effectiveSub: 'BHI súlyozva',
      caffeineLabel: 'Koffein',
      lastCaffeineLabel: 'Utolsó koffein',
      goalLabel: 'Napi cél',
      noGoalSet: 'Napi cél beállítása (opcionális)',
      editGoal: 'Módosítás',
      goalProgress: '{current} / {goal} ({percent}%)',
    },
    quickAdd: {
      title: 'Folyadék naplózása',
      repeatBtn: '⚡ Ismét: {drink} {amount} ml',
      repeatDefault: '⚡ Ismétlés',
    },
    log: {
      title: 'Napi napló',
      empty: 'Ezen a napon még nem naplóztál folyadékot.',
      caffeineBadge: '{n} mg koffein',
    },
    chart: {
      title: 'Heti folyadékbevitel',
      emptyState: 'A heti grafikonhoz legalább 2 nap adata szükséges.',
      goalLine: 'Cél: {goal}',
      clickInfo: 'Koppints egy oszlopra a részletekért',
      rawAmount: 'Nyers folyadék',
    },
    info: {
      title: 'Tudományos háttér és orvosi megjegyzés',
      bhiTitle: 'Mi az a Beverage Hydration Index (BHI)?',
      bhiText: 'A BHI (Maughan et al., 2016) azt méri, hogy egy adott ital milyen hatékonyan tartja meg a folyadékot a szervezetben a sima vízhez képest. Az elektrolitokat, fehérjét vagy zsírt tartalmazó italok (pl. ORS, tej) lassabban ürülnek a gyomorból, így magasabb hidratációs indexszel bírnak (1,3×).',
      caffeineTitle: 'Koffein és hidratáció',
      caffeineText: 'A rendszeres kávé- és teafogyasztás mérsékelt mennyiségben nem dehidratál, de a napi összkoffein és különösen a délutáni/esti koffeinbevitel ronthatja az alvásminőséget (csökkenti a mélyalvást és gátolja az adenozin receptorokat).',
      disclaimer: 'Ez az alkalmazás kizárólag sportolói teljesítmény- és szokáskövetési célokat szolgál, nem minősül orvosi diagnózisnak vagy egyéni terápiás javaslatnak. Egészségügyi panasz esetén konzultálj szakorvossal.',
    },
    addModal: {
      title: 'Folyadék rögzítése',
      amountLabel: 'Mennyiség (ml)',
      timeLabel: 'Fogyasztás ideje',
      effectivePreview: 'Hatékony folyadék:',
      caffeinePreview: 'Koffein:',
      saveBtn: 'Mentés',
      cancelBtn: 'Mégse',
    },
    editModal: {
      title: 'Bejegyzés szerkesztése',
      deleteBtn: 'Törlés',
      deleteConfirm: 'Biztosan törlöd ezt a hidratációs bejegyzést?',
      saveBtn: 'Módosítás mentése',
      cancelBtn: 'Mégse',
    },
    goalModal: {
      title: 'Napi hidratációs cél',
      desc: 'Állíts be egy napi irányadó folyadékbeviteli célt (500–6 000 ml, 50 ml-es lépésekkel).',
      sliderLabel: 'Napi cél',
      deleteGoalBtn: 'Cél törlése',
      saveBtn: 'Mentés',
      cancelBtn: 'Mégse',
    },
    classes: {
      exceptional: 'Kiemelkedő (1.3×)',
      standard: 'Víz-szintű (1.0×)',
      less_effective: 'Kevésbé hatékony (0.9×)',
    },
    drinks: {
      ors: 'Orális rehidratáló oldat (ORS)',
      milk: 'Tej',
      chocMilk: 'Csokis tej',
      juice100: '100%-os gyümölcslé',
      water: 'Víz',
      sparklingWater: 'Szénsavas víz / szóda',
      isotonic: 'Izotóniás sportital',
      electrolyte: 'Elektrolit-oldat',
      coconutWater: 'Kókuszvíz',
      tea: 'Tea',
      coffee: 'Kávé',
      dilutedSyrup: 'Hígított szörp / gyümölcslé',
      shake: 'Fehérje- / regeneráló shake',
      soda: 'Szénsavas üdítő',
      energyDrink: 'Energiaital',
    },
  },
  foods: {
    title: 'Ételtár',
    subtitle: 'Saját ételeid, receptjeid és tápértékeik könyvtára',
    searchPlaceholder: 'Keresés név vagy összetevő alapján…',
    tabs: { all: 'Mind', favorites: 'Kedvencek' },
    newFoodBtn: '+ Új étel',
    emptyAll: 'Még nincsenek elmentett ételeid az ételtárban.',
    emptyFavorites: 'Még nincsenek kedvencként megjelölt ételeid.',
    emptySearch: 'Nincs találat a keresési feltételre.',
    showCaloriesLabel: 'Kalória megjelenítése',
    modal: {
      titleNew: 'Új étel létrehozása',
      titleEdit: 'Étel szerkesztése',
      nameLabel: 'Étel neve',
      namePlaceholder: 'pl. Zabkása, Csirkemell',
      perLabel: 'Adagolás alapja',
      perServing: '1 adag',
      per100g: '100 g',
      kcalLabel: 'Kalória (kcal)',
      carbsLabel: 'Szénhidrát (g)',
      proteinLabel: 'Fehérje (g)',
      fatLabel: 'Zsír (g)',
      calcKcalBtn: 'Kalória számolása a makrókból',
      ingredientsLabel: 'Összetevők (opcionális)',
      ingredientsPlaceholder: 'pl. 50g zabpehely, 200ml mandulatej, 15g chia mag…',
      methodLabel: 'Elkészítés (opcionális)',
      methodPlaceholder: 'Elkészítési lépések, javaslatok…',
      allergensLabel: 'Allergének',
      favLabel: 'Kedvencekhez adom',
      saveBtn: 'Mentés',
      cancelBtn: 'Mégse',
      deleteBtn: 'Étel törlése',
      deleteConfirm: 'Biztosan törlöd ezt az ételt az ételtárból? (A már naplózott étkezési bejegyzéseid megmaradnak.)',
      errorNameRequired: 'Add meg az étel nevét (1–80 karakter).',
    },
    allergens: {
      gluten: 'Glutén',
      milk: 'Tej',
      egg: 'Tojás',
      nuts: 'Diófélék',
      fish: 'Hal',
      soy: 'Szója',
      sesame: 'Szezám',
    },
  },
  meals: {
    title: 'Étkezési terv',
    subtitle: 'Heti étkezési terv és napi makrók követése',
    week: 'Hét',
    today: 'Ma',
    copyPrevWeek: 'Előző hét betöltése',
    copyConfirm: 'Biztosan átmásolod az előző hét étkezéseit a jelenlegi hét üres napjaira?',
    copyNoEntries: 'Az előző héten nincsenek étkezési bejegyzések.',
    copyNoneCopied: 'Nem volt másolható étkezés a jelenlegi hét üres napjaira.',
    showCaloriesLabel: 'Kalória megjelenítése',
    goToFoodsBtn: 'Ételtár',
    baseMeals: {
      breakfast: 'Reggeli',
      snack1: 'Tízórai',
      lunch: 'Ebéd',
      snack2: 'Uzsonna',
      dinner: 'Vacsora',
    },
    addCustomMealBtn: '+ Új étkezés',
    customMealPrompt: 'Add meg az új étkezés nevét (pl. Edzés előtti snack):',
    customMealDefault: 'Egyedi étkezés',
    eatenLabel: 'Megettem',
    plannedLabel: 'Tervezett',
    emptyMealHint: 'Nincs még étel hozzáadva',
    summaryTitle: 'Napi összesítő',
    macroTargetsBtn: 'Napi célsávok',
    macroTargetsModal: {
      title: 'Napi makró-célsávok',
      subtitle: 'A célokat általában dietetikus vagy edző állítja be.',
      carbsLabel: 'Szénhidrát (g)',
      proteinLabel: 'Fehérje (g)',
      fatLabel: 'Zsír (g)',
      kcalLabel: 'Kalória (kcal)',
      minPlaceholder: 'Minimum',
      maxPlaceholder: 'Maximum',
      clearMacro: 'Törlés',
      lowCalorieWarning: 'Ha tartósan alacsony energiabevitelre törekszel, egyeztess dietetikussal vagy sportorvossal.',
      errorMinMax: 'A minimum érték nem lehet nagyobb a maximumnál.',
      errorNegative: 'Az értékek nem lehetnek negatívak.',
      saveBtn: 'Célsávok mentése',
      cancelBtn: 'Mégse',
    },
    targetStatus: {
      in: 'a sávban',
      below: 'alatta',
      above: 'felette',
    },
    addModal: {
      title: 'Étel hozzáadása',
      tabLibrary: 'Étel az ételtárból',
      tabQuick: 'Gyors hozzáadás',
      tabBarcode: 'Vonalkód-olvasás',
      searchPlaceholder: 'Keresés az ételtárban…',
      noFoodsFound: 'Nincs ilyen étel az ételtárban.',
      createFoodShortcut: '+ Új étel létrehozása az ételtárban',
      amountLabel: 'Mennyiség',
      unitServing: 'adag',
      unitG: 'g',
      quickNameLabel: 'Étel neve',
      quickNamePlaceholder: 'pl. Alma',
      quickSaveToFoods: 'Mentés az ételtárba is',
      addBtn: 'Hozzáadás',
      cancelBtn: 'Mégse',
      errorFoodRequired: 'Válassz ki egy ételt az ételtárból.',
      errorNameRequired: 'Add meg az étel nevét.',
      // Vonalkód-olvasó feliratok
      barcodeCameraStart: 'Kamera indítása',
      barcodeCameraStop: 'Kamera leállítása',
      barcodeScanning: 'Vonalkód keresése a kameraképen...',
      barcodeManualTitle: 'Vonalkód beírása',
      barcodeManualPlaceholder: 'pl. 5449000000996 (8–13 számjegy)',
      barcodeSearchBtn: 'Keresés',
      barcodeInvalid: 'Érvénytelen vonalkód',
      barcodeNotFound: 'A termék nem található az Open Food Facts adatbázisában.',
      barcodeIncomplete: 'Nem található minden tápérték, kérlek add meg őket.',
      barcodeManualEntryBtn: 'Kézi felvétel',
      barcodeSearching: 'Keresés az Open Food Facts adatbázisában...',
      barcodeNetworkError: 'Nincs kapcsolat, vagy a szerver nem érhető el.',
      barcodeTimeoutError: 'Időtúllépés az Open Food Facts keresése során.',
      barcodeServerError: 'A szerver hibát jelzett. Próbáld újra később.',
      barcodeCameraNotAllowed: 'A kamera elérését megtagadtad. Engedélyezd a böngésző beállításaiban!',
      barcodeCameraNotFound: 'Nem található kamera az eszközön.',
      barcodeInsecureContext: 'A kamera csak biztonságos (https) kapcsolaton vagy localhoston működik.',
      barcodeQuantityLabel: 'Mennyiség (g)',
      barcodeSaveToFoods: 'Mentés az ételtárba is',
      barcodeAttribution: 'Adatok forrása: Open Food Facts (ODbL licenc)',
      barcodeAddBtn: 'Hozzáadás az étkezéshez',
    },
    editModal: {
      title: 'Étel szerkesztése az étkezésben',
      amountLabel: 'Mennyiség',
      eatenCheckbox: 'Megettem ezt az ételt',
      saveBtn: 'Módosítás mentése',
      cancelBtn: 'Mégse',
      deleteBtn: 'Törlés az étkezésből',
      deleteConfirm: 'Biztosan törlöd ezt az ételt az étkezésből?',
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

// ==========================================================================
// 1B. KONFIGURÁCIÓK / CONFIGURATIONS
// ==========================================================================

export const USER_DATA_COLLECTIONS = ['activities', 'checkins', 'hydration', 'foods', 'mealEntries'];

export const FOOD_ALLERGENS = [
  { id: 'gluten', label: 'Glutén' },
  { id: 'milk', label: 'Tej' },
  { id: 'egg', label: 'Tojás' },
  { id: 'nuts', label: 'Diófélék' },
  { id: 'fish', label: 'Hal' },
  { id: 'soy', label: 'Szója' },
  { id: 'sesame', label: 'Szezám' },
];

export const BASE_MEALS = [
  { key: 'breakfast', name: 'Reggeli' },
  { key: 'snack1', name: 'Tízórai' },
  { key: 'lunch', name: 'Ebéd' },
  { key: 'snack2', name: 'Uzsonna' },
  { key: 'dinner', name: 'Vacsora' },
];

export const WEEK_DAYS = [
  { dayIndex: 0, short: 'H', full: 'Hétfő' },
  { dayIndex: 1, short: 'K', full: 'Kedd' },
  { dayIndex: 2, short: 'Sze', full: 'Szerda' },
  { dayIndex: 3, short: 'Cs', full: 'Csütörtök' },
  { dayIndex: 4, short: 'P', full: 'Péntek' },
  { dayIndex: 5, short: 'Szo', full: 'Szombat' },
  { dayIndex: 6, short: 'V', full: 'Vasárnap' },
];

export const DRINKS = {
  // Kiemelkedő (faktor: 1.3, koffein: 0)
  ors: { id: 'ors', class: 'exceptional', factor: 1.3, caffeinePer100ml: 0, defaultMl: 300 },
  milk: { id: 'milk', class: 'exceptional', factor: 1.3, caffeinePer100ml: 0, defaultMl: 250 },
  chocMilk: { id: 'chocMilk', class: 'exceptional', factor: 1.3, caffeinePer100ml: 0, defaultMl: 250 },
  juice100: { id: 'juice100', class: 'exceptional', factor: 1.3, caffeinePer100ml: 0, defaultMl: 250 },

  // Víz-szintű (faktor: 1.0)
  water: { id: 'water', class: 'standard', factor: 1.0, caffeinePer100ml: 0, defaultMl: 300 },
  sparklingWater: { id: 'sparklingWater', class: 'standard', factor: 1.0, caffeinePer100ml: 0, defaultMl: 300 },
  isotonic: { id: 'isotonic', class: 'standard', factor: 1.0, caffeinePer100ml: 0, defaultMl: 500 },
  electrolyte: { id: 'electrolyte', class: 'standard', factor: 1.0, caffeinePer100ml: 0, defaultMl: 500 },
  coconutWater: { id: 'coconutWater', class: 'standard', factor: 1.0, caffeinePer100ml: 0, defaultMl: 330 },
  tea: { id: 'tea', class: 'standard', factor: 1.0, caffeinePer100ml: 20, defaultMl: 250 },
  coffee: { id: 'coffee', class: 'standard', factor: 1.0, caffeinePer100ml: 40, defaultMl: 150 },
  dilutedSyrup: { id: 'dilutedSyrup', class: 'standard', factor: 1.0, caffeinePer100ml: 0, defaultMl: 300 },
  shake: { id: 'shake', class: 'standard', factor: 1.0, caffeinePer100ml: 0, defaultMl: 350 },
  soda: { id: 'soda', class: 'standard', factor: 1.0, caffeinePer100ml: 10, defaultMl: 330 },

  // Kevésbé hatékony (faktor: 0.9)
  energyDrink: { id: 'energyDrink', class: 'less_effective', factor: 0.9, caffeinePer100ml: 32, defaultMl: 250 },
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

  // 6. lépés: Activity részletek és megosztás állapot
  viewingActivity: null,
  isDetailsModalOpen: false,
  isShareModalOpen: false,
  shareOptions: {
    bgMode: 'transparent',
    textColor: 'white',
    textShadow: true,
    previewBg: 'checkered',
    selectedFields: ['typeTitle', 'date', 'duration', 'strain', 'rpe'],
    routePrivacy: true,
  },
  shareBlobUrl: null,
  shareBlob: null,

  // 7. lépés: Idegrendszeri mérések állapot
  nervousPeriod: 30, // 14 | 30 | 60
  nervousCheckins: [],
  nervousUnsubscribe: null,
  nervousChartSelectedDay: null,

  // 8. lépés: Hidratációs napló és adattörlés állapot
  hydrationSelectedDateKey: null,
  hydrationEntries: [],
  hydrationUnsubscribe: null,
  todayHydration: [],
  todayHydrationUnsubscribe: null,
  hydrationChartSelectedDay: null,
  lastLoggedDrink: null,
  isAddHydrationModalOpen: false,
  isEditHydrationModalOpen: false,
  isHydrationGoalModalOpen: false,
  isDeleteDataModalOpen: false,

  // 9. lépés: Ételtár és heti étkezési terv állapot
  foods: [],
  foodsUnsubscribe: null,
  foodSearchQuery: '',
  foodFilterTab: 'all', // 'all' | 'favorites'
  isFoodModalOpen: false,
  editingFood: null,
  mealsWeekStartKey: null,
  mealsSelectedDateKey: null,
  mealEntries: [],
  weekMealsUnsubscribe: null,
  isAddMealEntryModalOpen: false,
  addMealEntryContext: null,
  isEditMealEntryModalOpen: false,
  editingMealEntry: null,

  // 10. lépés: Logó előtöltés, vonalkód-olvasás és makró-célsávok állapot
  logoStatus: 'loading', // 'loading' | 'ok' | 'missing'
  preloadedLogos: { dark: null, light: null },
  barcodeCache: {},
  isMacroTargetsModalOpen: false,
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
 * Felhasználó alapvonal-kizárási beállítása (alapérték: true).
 */
export function getBaselineExcludeTagged() {
  if (state.userProfile && typeof state.userProfile.baselineExcludeTagged === 'boolean') {
    return state.userProfile.baselineExcludeTagged;
  }
  return true;
}

/**
 * Felhasználó kalória-megjelenítési beállítása (alapérték: true).
 */
export function getShowCalories() {
  if (state.userProfile && typeof state.userProfile.showCalories === 'boolean') {
    return state.userProfile.showCalories;
  }
  return true;
}

export async function setShowCalories(val) {
  const boolVal = Boolean(val);
  if (!state.userProfile) state.userProfile = {};
  state.userProfile.showCalories = boolVal;
  render();
  if (state.currentUser?.uid) {
    try {
      const userRef = doc(db, 'users', state.currentUser.uid);
      await updateDoc(userRef, {
        showCalories: boolVal,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('Error saving showCalories:', err);
    }
  }
}

/**
 * Szöveg normalizálása ékezet- és kis/nagybetű-független kereséshez.
 */
export function normalizeSearchText(str) {
  if (!str) return '';
  return String(str)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * Makró-érték formázása magyar tizedesvesszővel (pl. 58.5 -> "58,5", 55 -> "55").
 */
export function fmtMacro(val) {
  if (val === null || val === undefined || isNaN(val)) return '0';
  const num = Math.round(Number(val) * 10) / 10;
  return Number.isInteger(num) ? String(num) : num.toFixed(1).replace('.', ',');
}

/**
 * Kalória egész számra kerekítve (pl. 247.5 -> "248").
 */
export function fmtKcal(val) {
  if (val === null || val === undefined || isNaN(val)) return '0';
  return String(Math.round(Number(val)));
}

/**
 * Vonalkód ellenőrzőszám validáció (EAN-13, EAN-8, UPC-A).
 * A GS1 szabványos súlyozott algoritmusát használja.
 */
export function validateBarcodeChecksum(barcode) {
  if (!barcode || typeof barcode !== 'string') return false;
  const clean = barcode.trim();
  if (!/^\d{8}$|^\d{12,14}$/.test(clean)) return false;

  const digits = clean.split('').map(Number);
  const checkDigit = digits[digits.length - 1];

  let sum = 0;
  let multiplier = 3;
  for (let i = digits.length - 2; i >= 0; i--) {
    sum += digits[i] * multiplier;
    multiplier = multiplier === 3 ? 1 : 3;
  }
  const computed = (10 - (sum % 10)) % 10;
  return computed === checkDigit;
}

/**
 * Érték besorolása egy min-max céltartományhoz viszonyítva.
 * Visszatérési értékek: 'none' (ha nincs min és max), 'below', 'in', 'above'.
 */
export function classifyAgainstRange(value, min, max) {
  const hasMin = min != null && min !== '' && !isNaN(Number(min));
  const hasMax = max != null && max !== '' && !isNaN(Number(max));

  if (!hasMin && !hasMax) return 'none';

  const numVal = Number(value) || 0;
  if (hasMin && numVal < Number(min)) return 'below';
  if (hasMax && numVal > Number(max)) return 'above';
  return 'in';
}

/**
 * Kalória becslése makrókból: 4 * ch + 4 * protein + 9 * fat.
 */
export function calculateKcalFromMacros(carbsG, proteinG, fatG) {
  const c = Math.max(0, Number(carbsG) || 0);
  const p = Math.max(0, Number(proteinG) || 0);
  const f = Math.max(0, Number(fatG) || 0);
  return Math.round(4 * c + 4 * p + 9 * f);
}

/**
 * Dátumkulcs ("YYYY-MM-DD") értelmezése helyi Date objektumként.
 */
export function parseDateKey(dateKey) {
  if (!dateKey || typeof dateKey !== 'string') return new Date();
  const parts = dateKey.split('-').map(Number);
  if (parts.length !== 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
    return new Date();
  }
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

/**
 * Adott dátumhoz tartozó hétfő dátumkulcsa (YYYY-MM-DD). A hét szigorúan hétfővel kezdődik.
 */
export function getMondayOfDate(d) {
  const date = typeof d === 'string' ? parseDateKey(d) : new Date(d);
  const day = date.getDay(); // 0: vasárnap, 1: hétfő...
  const diff = (day === 0 ? -6 : 1) - day;
  date.setDate(date.getDate() + diff);
  return formatDateKey(date);
}

const HU_MONTHS_SHORT = ['jan.', 'febr.', 'márc.', 'ápr.', 'máj.', 'jún.', 'júl.', 'aug.', 'szept.', 'okt.', 'nov.', 'dec.'];

/**
 * Hét címkéjének formázása (pl. "2026. nov. 2–8.").
 */
export function formatWeekLabel(mondayKey) {
  if (!mondayKey) return '';
  const mon = parseDateKey(mondayKey);
  const sun = new Date(mon);
  sun.setDate(sun.getDate() + 6);

  const y1 = mon.getFullYear();
  const m1 = HU_MONTHS_SHORT[mon.getMonth()];
  const d1 = mon.getDate();

  const y2 = sun.getFullYear();
  const m2 = HU_MONTHS_SHORT[sun.getMonth()];
  const d2 = sun.getDate();

  if (y1 === y2) {
    if (mon.getMonth() === sun.getMonth()) {
      return `${y1}. ${m1} ${d1}–${d2}.`;
    }
    return `${y1}. ${m1} ${d1}. – ${m2} ${d2}.`;
  }
  return `${y1}. ${m1} ${d1}. – ${y2}. ${m2} ${d2}.`;
}

/**
 * A hét 7 napjának objektumai a hétfői kulcs alapján.
 */
export function getWeekDates(mondayKey) {
  if (!mondayKey) return [];
  const mon = parseDateKey(mondayKey);
  const todayKey = formatDateKey(new Date());
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(mon);
    d.setDate(d.getDate() + i);
    const dateKey = formatDateKey(d);
    dates.push({
      dateKey,
      dayIndex: i,
      dayShort: WEEK_DAYS[i].short,
      dayFull: WEEK_DAYS[i].full,
      dayNum: d.getDate(),
      isToday: dateKey === todayKey,
    });
  }
  return dates;
}

/**
 * Nyugalmi pulzus alapvonal számítása (tiszta függvény).
 * @param {Array<number>} rhrValues - Nyers bpm értékek
 * @returns {{ count: number, mean: number, sd: number, effectiveSd: number, bandMin: number, bandMax: number, isActive: boolean }}
 */
export function calcRhrBaseline(rhrValues) {
  const valid = (rhrValues || []).filter((v) => typeof v === 'number' && !isNaN(v) && v > 0);
  const n = valid.length;
  if (n === 0) {
    return { count: 0, mean: 0, sd: 0, effectiveSd: 1.0, bandMin: 0, bandMax: 0, isActive: false };
  }
  const mean = valid.reduce((acc, v) => acc + v, 0) / n;
  const variance = valid.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / n;
  const sd = Math.sqrt(variance);
  const effectiveSd = Math.max(1.0, sd);
  const bandMin = mean - 0.75 * effectiveSd;
  const bandMax = mean + 0.75 * effectiveSd;
  const isActive = n >= 14;

  return {
    count: n,
    mean,
    sd,
    effectiveSd,
    bandMin,
    bandMax,
    isActive,
  };
}

/**
 * HRV alapvonal számítása ln(rMSSD) értékeken (tiszta függvény).
 * @param {Array<number>} hrvValues - rMSSD értékek (ms)
 * @returns {{ count: number, geometricMean: number, meanLn: number, sdLn: number, effectiveSdLn: number, bandMin: number, bandMax: number, isActive: boolean }}
 */
export function calcHrvBaseline(hrvValues) {
  const valid = (hrvValues || []).filter((v) => typeof v === 'number' && !isNaN(v) && v > 0);
  const n = valid.length;
  if (n === 0) {
    return { count: 0, geometricMean: 0, meanLn: 0, sdLn: 0, effectiveSdLn: 0.05, bandMin: 0, bandMax: 0, isActive: false };
  }
  const lnValues = valid.map((v) => Math.log(v));
  const meanLn = lnValues.reduce((acc, v) => acc + v, 0) / n;
  const geometricMean = Math.exp(meanLn);
  const varianceLn = lnValues.reduce((acc, v) => acc + Math.pow(v - meanLn, 2), 0) / n;
  const sdLn = Math.sqrt(varianceLn);
  const effectiveSdLn = Math.max(0.05, sdLn);
  const bandMinLn = meanLn - 0.75 * effectiveSdLn;
  const bandMaxLn = meanLn + 0.75 * effectiveSdLn;
  const bandMin = Math.exp(bandMinLn);
  const bandMax = Math.exp(bandMaxLn);
  const isActive = n >= 14;

  return {
    count: n,
    geometricMean,
    meanLn,
    sdLn,
    effectiveSdLn,
    bandMin,
    bandMax,
    isActive,
  };
}

/**
 * 7 napos mozgó átlag számítása (legalább 3 mérésből, különben null).
 * @param {Array<number>} values - Mérések értékei
 * @param {boolean} isHrv - Ha true, ln-átlagot számol és vissza-exponenciál
 * @returns {number|null}
 */
export function calc7DayMovingAvg(values, isHrv = false) {
  const valid = (values || []).filter((v) => typeof v === 'number' && !isNaN(v) && v > 0);
  if (valid.length < 3) return null;
  const n = valid.length;
  if (isHrv) {
    const sumLn = valid.reduce((acc, v) => acc + Math.log(v), 0);
    return Math.exp(sumLn / n);
  }
  return valid.reduce((acc, v) => acc + v, 0) / n;
}

/**
 * Check-in listából alapvonal és 7 napos átlagok számítása (28 napos ablak, a kizárt napok és a mai nap nélkül).
 */
export function computeBaselinesFromCheckins(allCheckins, excludeDateKey = null) {
  const todayKey = excludeDateKey || formatDateKey(new Date());
  const excludeTagged = getBaselineExcludeTagged();

  // 1. Alapvonal ablak: utolsó 28 naptári nap a cél-nap (ma) NÉLKÜL
  const baselineDays = [];
  const targetDate = new Date(todayKey + 'T00:00:00');
  for (let i = 1; i <= 28; i++) {
    const d = new Date(targetDate.getTime() - i * 86400000);
    baselineDays.push(formatDateKey(d));
  }

  const baselineCheckins = (allCheckins || []).filter((c) => {
    if (!c || !c.dateKey) return false;
    if (!baselineDays.includes(c.dateKey)) return false;
    if (excludeTagged && Array.isArray(c.tags)) {
      if (c.tags.includes('sick') || c.tags.includes('travel') || c.tags.includes('alcohol')) {
        return false;
      }
    }
    return true;
  });

  const hrvValues = baselineCheckins
    .map((c) => Number(c.hrv))
    .filter((v) => typeof v === 'number' && !isNaN(v) && v > 0);

  const rhrValues = baselineCheckins
    .map((c) => Number(c.restingHr))
    .filter((v) => typeof v === 'number' && !isNaN(v) && v > 0);

  const baselineHrv = calcHrvBaseline(hrvValues);
  const baselineRhr = calcRhrBaseline(rhrValues);

  // 2. 7 napos mozgó átlag az utolsó 7 naptári napból (beleértve a mai napot is, ha van mérés)
  const last7Days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(targetDate.getTime() - i * 86400000);
    last7Days.push(formatDateKey(d));
  }

  const checkins7d = (allCheckins || []).filter((c) => c && last7Days.includes(c.dateKey));
  const hrv7dValues = checkins7d
    .map((c) => Number(c.hrv))
    .filter((v) => typeof v === 'number' && !isNaN(v) && v > 0);
  const rhr7dValues = checkins7d
    .map((c) => Number(c.restingHr))
    .filter((v) => typeof v === 'number' && !isNaN(v) && v > 0);

  const avg7dHrv = calc7DayMovingAvg(hrv7dValues, true);
  const avg7dRhr = calc7DayMovingAvg(rhr7dValues, false);

  let statusHrv = 'learning';
  if (baselineHrv.isActive && avg7dHrv !== null) {
    if (avg7dHrv < baselineHrv.bandMin) statusHrv = 'below';
    else if (avg7dHrv > baselineHrv.bandMax) statusHrv = 'above';
    else statusHrv = 'within';
  }

  let statusRhr = 'learning';
  if (baselineRhr.isActive && avg7dRhr !== null) {
    if (avg7dRhr < baselineRhr.bandMin) statusRhr = 'below';
    else if (avg7dRhr > baselineRhr.bandMax) statusRhr = 'above';
    else statusRhr = 'within';
  }

  return {
    baselineHrv,
    baselineRhr,
    avg7dHrv,
    avg7dRhr,
    statusHrv,
    statusRhr,
    baselineCheckinsCount: baselineCheckins.length,
  };
}

/**
 * Készenlét (Readiness) pontszám számítása (ReadinessVersion 2).
 * Súlyok: sleep 0.20, quality 0.10, rested 0.15, soreness 0.10, mood 0.05, stress 0.10, hrv 0.20, rhr 0.10.
 * Csak az elérhető komponensekre számolva, azok súlyösszegére normalizálva (0–100, egész).
 */
export function calcReadiness({
  sleepMin,
  sleepQuality,
  restedness,
  soreness,
  mood,
  stress,
  sleepNeedMin = null,
  todayHrv = null,
  todayRhr = null,
  baselineHrv = null,
  baselineRhr = null,
}) {
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

  const items = [
    { weight: 0.20, comp: sleepComp },
    { weight: 0.10, comp: qualityComp },
    { weight: 0.15, comp: restedComp },
    { weight: 0.10, comp: sorenessComp },
    { weight: 0.05, comp: moodComp },
    { weight: 0.10, comp: stressComp },
  ];

  const hrvNum = Number(todayHrv);
  if (baselineHrv?.isActive && typeof hrvNum === 'number' && !isNaN(hrvNum) && hrvNum > 0) {
    const zHrv = (Math.log(hrvNum) - baselineHrv.meanLn) / baselineHrv.effectiveSdLn;
    const hrvComp = Math.min(Math.max(0, 0.5 + 0.25 * zHrv), 1);
    items.push({ weight: 0.20, comp: hrvComp });
  }

  const rhrNum = Number(todayRhr);
  if (baselineRhr?.isActive && typeof rhrNum === 'number' && !isNaN(rhrNum) && rhrNum > 0) {
    const zRhr = (rhrNum - baselineRhr.mean) / baselineRhr.effectiveSd;
    const rhrComp = Math.min(Math.max(0, 0.5 - 0.25 * zRhr), 1);
    items.push({ weight: 0.10, comp: rhrComp });
  }

  const sumWeight = items.reduce((acc, it) => acc + it.weight, 0);
  const weightedSum = items.reduce((acc, it) => acc + it.weight * it.comp, 0);

  const rawScore = sumWeight > 0 ? (100 * weightedSum) / sumWeight : 0;
  return Math.round(Math.max(0, Math.min(100, rawScore)));
}

export const calcReadinessV2 = calcReadiness;

/**
 * A két legnagyobb levonást okozó tényező meghatározása a "Miért?" kártyához.
 * Rangsorolási szempont: súly × (1 − komponens).
 */
export function getReadinessFactors({
  sleepMin,
  sleepQuality,
  restedness,
  soreness,
  mood,
  stress,
  sleepNeedMin = null,
  todayHrv = null,
  todayRhr = null,
  baselineHrv = null,
  baselineRhr = null,
}) {
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
    { key: 'sleep', name: 'alvás', deduction: 0.20 * (1 - sleepComp), text: `alvás ${fmtDuration(sMin)}` },
    { key: 'quality', name: 'alvásminőség', deduction: 0.10 * (1 - qualityComp), text: `alvásminőség ${qVal}/5` },
    { key: 'rested', name: 'kipihentség', deduction: 0.15 * (1 - restedComp), text: `kipihentség ${rVal}/5` },
    { key: 'soreness', name: 'izomláz', deduction: 0.10 * (1 - sorenessComp), text: `izomláz ${soVal}/5` },
    { key: 'mood', name: 'hangulat', deduction: 0.05 * (1 - moodComp), text: `hangulat ${mVal}/5` },
    { key: 'stress', name: 'stressz', deduction: 0.10 * (1 - stressComp), text: `stressz ${stVal}/5` },
  ];

  const hrvNum = Number(todayHrv);
  if (baselineHrv?.isActive && typeof hrvNum === 'number' && !isNaN(hrvNum) && hrvNum > 0) {
    const zHrv = (Math.log(hrvNum) - baselineHrv.meanLn) / baselineHrv.effectiveSdLn;
    const hrvComp = Math.min(Math.max(0, 0.5 + 0.25 * zHrv), 1);
    const minStr = Math.round(baselineHrv.bandMin);
    const maxStr = Math.round(baselineHrv.bandMax);
    factors.push({
      key: 'hrv',
      name: 'HRV',
      deduction: 0.20 * (1 - hrvComp),
      text: `HRV ${hrvNum} ms (sáv ${minStr}–${maxStr})`,
    });
  }

  const rhrNum = Number(todayRhr);
  if (baselineRhr?.isActive && typeof rhrNum === 'number' && !isNaN(rhrNum) && rhrNum > 0) {
    const zRhr = (rhrNum - baselineRhr.mean) / baselineRhr.effectiveSd;
    const rhrComp = Math.min(Math.max(0, 0.5 - 0.25 * zRhr), 1);
    const minStr = Math.round(baselineRhr.bandMin);
    const maxStr = Math.round(baselineRhr.bandMax);
    factors.push({
      key: 'rhr',
      name: 'nyugalmi pulzus',
      deduction: 0.10 * (1 - rhrComp),
      text: `nyugalmi pulzus ${rhrNum} bpm (sáv ${minStr}–${maxStr})`,
    });
  }

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
  if (typeof timestampOrDate === 'string' && /^\d{1,2}:\d{2}$/.test(timestampOrDate)) {
    return timestampOrDate.length === 4 ? '0' + timestampOrDate : timestampOrDate;
  }
  const d = timestampOrDate.toDate ? timestampOrDate.toDate() : new Date(timestampOrDate);
  if (isNaN(d.getTime())) return '';
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

/**
 * Ezres tagolású folyadék-mennyiség formázása szóközzel (pl. 1150 -> "1 150 ml")
 */
export function fmtMl(ml) {
  const num = Math.round(Number(ml) || 0);
  const formatted = String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${formatted} ml`;
}

/**
 * Hidratációs statisztikák összegzése (nyers, hatékony BHI szerint, koffein, utolsó koffein időpont).
 */
export function calcHydrationStats(entries, goalMl = null) {
  const safeEntries = entries || [];
  let rawTotal = 0;
  let effectiveTotal = 0;
  let caffeineTotal = 0;
  let lastCaffeineTime = null;

  const sorted = [...safeEntries].sort((a, b) => {
    const getTimeMs = (val, dKey) => {
      if (!val) return 0;
      if (typeof val === 'string' && /^\d{1,2}:\d{2}$/.test(val)) {
        const [h, m] = val.split(':').map(Number);
        const base = dKey ? new Date(dKey + 'T00:00:00').getTime() : 0;
        return base + (h * 60 + m) * 60000;
      }
      if (val.toDate) return val.toDate().getTime();
      const d = new Date(val);
      return isNaN(d.getTime()) ? 0 : d.getTime();
    };
    return getTimeMs(a.loggedAt, a.dateKey) - getTimeMs(b.loggedAt, b.dateKey);
  });

  for (const entry of sorted) {
    const amount = Number(entry.amountMl) || 0;
    const drinkConfig = DRINKS[entry.drinkType] || { factor: 1.0, caffeinePer100ml: 0 };
    const factor = typeof entry.hydrationFactor === 'number'
      ? entry.hydrationFactor
      : drinkConfig.factor;
    const caffeine = typeof entry.caffeineMg === 'number'
      ? entry.caffeineMg
      : Math.round(amount * (drinkConfig.caffeinePer100ml || 0) / 100);

    rawTotal += amount;
    effectiveTotal += Math.round(amount * factor);
    caffeineTotal += caffeine;

    if (caffeine > 0 && entry.loggedAt) {
      lastCaffeineTime = formatActivityTime(entry.loggedAt);
    }
  }

  const progressPercent = goalMl && goalMl > 0 ? Math.min(100, Math.round((rawTotal / goalMl) * 100)) : null;

  return {
    rawTotal,
    effectiveTotal,
    caffeineTotal,
    lastCaffeineTime: lastCaffeineTime || '—',
    goalMl,
    progressPercent,
    count: safeEntries.length,
    sortedEntries: sorted,
  };
}

export function getUserHydrationGoalMl() {
  const g = state.userProfile?.hydrationGoalMl;
  if (typeof g === 'number' && g >= 500 && g <= 6000) {
    return g;
  }
  return null;
}

export async function setUserHydrationGoalMl(val) {
  const goalVal = typeof val === 'number' && val >= 500 && val <= 6000 ? Math.round(val / 50) * 50 : null;
  if (!state.userProfile) state.userProfile = {};
  state.userProfile.hydrationGoalMl = goalVal;
  render();
  if (state.currentUser?.uid) {
    try {
      const userRef = doc(db, 'users', state.currentUser.uid);
      await updateDoc(userRef, {
        hydrationGoalMl: goalVal,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('Error saving hydrationGoalMl:', err);
    }
  }
}

export function isNewUserWithin7Days() {
  if (!state.userProfile?.createdAt) return false;
  let createdMs = 0;
  if (typeof state.userProfile.createdAt.toDate === 'function') {
    createdMs = state.userProfile.createdAt.toDate().getTime();
  } else if (typeof state.userProfile.createdAt.seconds === 'number') {
    createdMs = state.userProfile.createdAt.seconds * 1000;
  } else if (state.userProfile.createdAt instanceof Date) {
    createdMs = state.userProfile.createdAt.getTime();
  } else if (typeof state.userProfile.createdAt === 'number') {
    createdMs = state.userProfile.createdAt;
  }
  if (!createdMs) return false;
  const diffDays = (Date.now() - createdMs) / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= 7;
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
        if (state.currentRoute === 'lab' && state.currentSubpage === 'sleep') {
          const container = document.getElementById('app-view');
          if (container) {
            container.innerHTML = renderRouteError(err);
            try { attachViewEventListeners(); } catch (e) {}
          }
        }
      }
    );
  } catch (err) {
    console.error('Failed to subscribe sleep period:', err);
  }
}

function subscribeNervousPeriod(uid, periodDays = 60) {
  if (state.nervousUnsubscribe) {
    state.nervousUnsubscribe();
    state.nervousUnsubscribe = null;
  }
  if (!uid) return;

  const days = Number(periodDays) || 60;
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

    state.nervousUnsubscribe = onSnapshot(
      q,
      (snapshot) => {
        state.nervousCheckins = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          dateKey: docSnap.id,
          ...docSnap.data(),
        }));
        if (state.currentRoute === 'lab' && state.currentSubpage === 'nervous') {
          render();
        }
      },
      (err) => {
        console.error('Firestore nervous period subscription error:', err);
        if (state.currentRoute === 'lab' && state.currentSubpage === 'nervous') {
          const container = document.getElementById('app-view');
          if (container) {
            container.innerHTML = renderRouteError(err);
            try { attachViewEventListeners(); } catch (e) {}
          }
        }
      }
    );
  } catch (err) {
    console.error('Failed to subscribe nervous period:', err);
  }
}

export async function setBaselineExcludeTagged(val) {
  const boolVal = Boolean(val);
  if (!state.userProfile) state.userProfile = {};
  state.userProfile.baselineExcludeTagged = boolVal;
  render();
  if (state.currentUser?.uid) {
    try {
      const userRef = doc(db, 'users', state.currentUser.uid);
      await updateDoc(userRef, {
        baselineExcludeTagged: boolVal,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('Error saving baselineExcludeTagged:', err);
    }
  }
}

export async function getBaselineDataForUser(uid, excludeDateKey = null) {
  let docs = state.nervousCheckins || [];
  if (docs.length === 0 && uid) {
    try {
      const now = new Date();
      const startKey = formatDateKey(new Date(now.getTime() - 60 * 86400000));
      const endKey = formatDateKey(now);
      const checkinsCol = collection(db, 'users', uid, 'checkins');
      const q = query(
        checkinsCol,
        where(documentId(), '>=', startKey),
        where(documentId(), '<=', endKey),
        orderBy(documentId(), 'asc')
      );
      const snap = await getDocs(q);
      docs = snap.docs.map((d) => ({ id: d.id, dateKey: d.id, ...d.data() }));
    } catch (e) {
      console.warn('Could not fetch checkins for baseline calculation:', e);
      docs = [];
    }
  }
  return computeBaselinesFromCheckins(docs, excludeDateKey);
}

function subscribeTodayHydration(uid) {
  if (state.todayHydrationUnsubscribe) {
    state.todayHydrationUnsubscribe();
    state.todayHydrationUnsubscribe = null;
  }
  if (!uid) return;

  const todayKey = formatDateKey(new Date());

  try {
    const colRef = collection(db, 'users', uid, 'hydration');
    const q = query(colRef, where('dateKey', '==', todayKey));

    state.todayHydrationUnsubscribe = onSnapshot(
      q,
      (snapshot) => {
        state.todayHydration = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
        if (state.currentRoute === 'home') {
          render();
        }
      },
      (err) => {
        console.error('Firestore today hydration subscription error:', err);
      }
    );
  } catch (err) {
    console.error('Failed to subscribe today hydration:', err);
  }
}

function subscribeHydrationPeriod(uid) {
  if (state.hydrationUnsubscribe) {
    state.hydrationUnsubscribe();
    state.hydrationUnsubscribe = null;
  }
  if (!uid) return;

  const now = new Date();
  const startKey = formatDateKey(new Date(now.getTime() - 14 * 86400000));
  const endKey = formatDateKey(now);

  try {
    const colRef = collection(db, 'users', uid, 'hydration');
    const q = query(
      colRef,
      where('dateKey', '>=', startKey),
      where('dateKey', '<=', endKey),
      orderBy('dateKey', 'asc')
    );

    state.hydrationUnsubscribe = onSnapshot(
      q,
      (snapshot) => {
        state.hydrationEntries = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        if (state.currentRoute === 'lab' && state.currentPillar === 'nutrition' && state.currentSubpage === 'hydration') {
          render();
        }
      },
      (err) => {
        console.error('Firestore hydration period subscription error:', err);
        if (state.currentRoute === 'lab' && state.currentPillar === 'nutrition' && state.currentSubpage === 'hydration') {
          const container = document.getElementById('app-view');
          if (container) {
            container.innerHTML = renderRouteError(err);
            try { attachViewEventListeners(); } catch (e) {}
          }
        }
      }
    );
  } catch (err) {
    console.error('Failed to subscribe hydration period:', err);
  }
}

export function subscribeFoods(uid) {
  if (state.foodsUnsubscribe) {
    state.foodsUnsubscribe();
    state.foodsUnsubscribe = null;
  }
  if (!uid) return;

  try {
    const colRef = collection(db, 'users', uid, 'foods');
    const q = query(colRef, orderBy('name', 'asc'));

    state.foodsUnsubscribe = onSnapshot(
      q,
      (snapshot) => {
        state.foods = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        if (state.currentRoute === 'lab' && state.currentPillar === 'nutrition' && (state.currentSubpage === 'foods' || state.currentSubpage === 'meals')) {
          render();
        }
      },
      (err) => {
        console.error('Firestore foods subscription error:', err);
        if (state.currentRoute === 'lab' && state.currentPillar === 'nutrition' && state.currentSubpage === 'foods') {
          const container = document.getElementById('app-view');
          if (container) {
            container.innerHTML = renderRouteError(err);
            try { attachViewEventListeners(); } catch (e) {}
          }
        }
      }
    );
  } catch (err) {
    console.error('Failed to subscribe foods:', err);
  }
}

export function subscribeWeekMeals(uid, mondayKey) {
  if (state.weekMealsUnsubscribe) {
    state.weekMealsUnsubscribe();
    state.weekMealsUnsubscribe = null;
  }
  if (!uid || !mondayKey) return;

  const mon = parseDateKey(mondayKey);
  const sun = new Date(mon);
  sun.setDate(sun.getDate() + 6);
  const sundayKey = formatDateKey(sun);

  try {
    const colRef = collection(db, 'users', uid, 'mealEntries');
    const q = query(
      colRef,
      where('dateKey', '>=', mondayKey),
      where('dateKey', '<=', sundayKey),
      orderBy('dateKey', 'asc')
    );

    state.weekMealsUnsubscribe = onSnapshot(
      q,
      (snapshot) => {
        state.mealEntries = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        if (state.currentRoute === 'lab' && state.currentPillar === 'nutrition' && state.currentSubpage === 'meals') {
          render();
        }
      },
      (err) => {
        console.error('Firestore week meals subscription error:', err);
        if (state.currentRoute === 'lab' && state.currentPillar === 'nutrition' && state.currentSubpage === 'meals') {
          const container = document.getElementById('app-view');
          if (container) {
            container.innerHTML = renderRouteError(err);
            try { attachViewEventListeners(); } catch (e) {}
          }
        }
      }
    );
  } catch (err) {
    console.error('Failed to subscribe week meals:', err);
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
  if (state.nervousUnsubscribe) {
    state.nervousUnsubscribe();
    state.nervousUnsubscribe = null;
  }
  if (state.todayHydrationUnsubscribe) {
    state.todayHydrationUnsubscribe();
    state.todayHydrationUnsubscribe = null;
  }
  if (state.hydrationUnsubscribe) {
    state.hydrationUnsubscribe();
    state.hydrationUnsubscribe = null;
  }
  if (state.foodsUnsubscribe) {
    state.foodsUnsubscribe();
    state.foodsUnsubscribe = null;
  }
  if (state.weekMealsUnsubscribe) {
    state.weekMealsUnsubscribe();
    state.weekMealsUnsubscribe = null;
  }
  state.journalActivities = [];
  state.todayActivities = [];
  state.todayCheckin = null;
  state.todayHydration = [];
  state.hydrationEntries = [];
  state.hydrationChartSelectedDay = null;
  state.sleepCheckins = [];
  state.sleepChartSelectedDay = null;
  state.nervousCheckins = [];
  state.nervousChartSelectedDay = null;
  state.foods = [];
  state.mealEntries = [];
  state.editingFood = null;
  state.editingMealEntry = null;
  state.addMealEntryContext = null;
  if (state.shareBlobUrl) {
    URL.revokeObjectURL(state.shareBlobUrl);
    state.shareBlobUrl = null;
    state.shareBlob = null;
  }
}

/**
 * Felhasználó összes adatának törlése batch-ekben a USER_DATA_COLLECTIONS konfiguráció alapján.
 */
export async function deleteAllUserData(onProgress) {
  const uid = state.currentUser?.uid;
  if (!uid) throw new Error('Nincs bejelentkezett felhasználó.');

  // 1. Feliratkozások leállítása törlés előtt
  cleanupSubscriptions();

  let totalDeleted = 0;

  // 2. Végigmegyünk a felhasználói subcollection-ökön
  for (const colName of USER_DATA_COLLECTIONS) {
    const colRef = collection(db, 'users', uid, colName);
    let hasMore = true;
    while (hasMore) {
      const q = query(colRef, limit(400));
      const snap = await getDocs(q);
      if (snap.empty) {
        hasMore = false;
        break;
      }
      const batch = writeBatch(db);
      snap.docs.forEach((d) => {
        batch.delete(d.ref);
      });
      await batch.commit();
      totalDeleted += snap.size;
      if (typeof onProgress === 'function') {
        onProgress(totalDeleted);
      }
      if (snap.size < 400) {
        hasMore = false;
      }
    }
  }

  // 3. Helyi állapot ürítése
  state.journalActivities = [];
  state.todayActivities = [];
  state.todayCheckin = null;
  state.todayHydration = [];
  state.hydrationEntries = [];
  state.sleepCheckins = [];
  state.nervousCheckins = [];
  state.foods = [];
  state.mealEntries = [];

  // 4. Újra-feliratkozás az üres állapotra
  subscribeJournalMonth(uid, state.journalDate);
  subscribeTodayActivities(uid);
  subscribeTodayCheckin(uid);
  subscribeTodayHydration(uid);
  if (state.currentRoute === 'lab') {
    if (state.currentSubpage === 'sleep') subscribeSleepPeriod(uid, state.sleepPeriod);
    if (state.currentSubpage === 'nervous') subscribeNervousPeriod(uid, state.nervousPeriod);
    if (state.currentSubpage === 'hydration') subscribeHydrationPeriod(uid);
    if (state.currentSubpage === 'foods') subscribeFoods(uid);
    if (state.currentSubpage === 'meals') {
      subscribeWeekMeals(uid, state.mealsWeekStartKey || getMondayOfDate(new Date()));
      subscribeFoods(uid);
    }
  }

  render();
  return totalDeleted;
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
   5. LOGÓ ÉS HIBAKEZELÉS / LOGO PRELOAD & FALLBACK MECHANISM
   ========================================================================== */

/**
 * Mindkét logó-változat előtöltése (sötét- és világos-módos, SVG majd PNG sorrenddel)
 */
export function preloadLogos() {
  state.logoStatus = 'loading';
  syncLogoUI();

  const themes = ['dark', 'light'];
  let pending = themes.length;

  themes.forEach((theme) => {
    const baseName = `logo-${theme}-mode`;
    // 1. Első kísérlet: SVG
    const imgSvg = new Image();
    imgSvg.onload = () => {
      state.preloadedLogos[theme] = `${baseName}.svg`;
      onVariantDone();
    };
    imgSvg.onerror = () => {
      // 2. Második kísérlet: PNG
      const imgPng = new Image();
      imgPng.onload = () => {
        state.preloadedLogos[theme] = `${baseName}.png`;
        onVariantDone();
      };
      imgPng.onerror = () => {
        state.preloadedLogos[theme] = null;
        onVariantDone();
      };
      imgPng.src = `${baseName}.png`;
    };
    imgSvg.src = `${baseName}.svg`;
  });

  function onVariantDone() {
    pending--;
    if (pending === 0) {
      updateActiveLogoStatus();
      syncLogoUI();
    }
  }
}

/**
 * Az aktív téma alapján beállítja a globális logoStatus értékét ('loading' | 'ok' | 'missing')
 */
export function updateActiveLogoStatus() {
  const currentTheme = state.resolvedTheme === 'light' ? 'light' : 'dark';
  const url = state.preloadedLogos[currentTheme];
  if (url) {
    state.logoStatus = 'ok';
  } else if (state.preloadedLogos[currentTheme] === null) {
    state.logoStatus = 'missing';
  } else {
    state.logoStatus = 'loading';
  }
}

/**
 * Szinkronizálja a felületen meglévő logó-elemeket.
 * A logó-elem egyszer jön létre és megmarad a navigáció során.
 * Az `src` csak témaváltáskor cserélődik, és csak akkor, ha ténylegesen különbözik.
 */
export function updateLogos() {
  updateActiveLogoStatus();
  syncLogoUI();
}

export function syncLogoUI() {
  const currentTheme = state.resolvedTheme === 'light' ? 'light' : 'dark';
  const targetUrl = state.preloadedLogos[currentTheme];

  const containers = document.querySelectorAll('.brand-logo-container');
  containers.forEach((cnt) => {
    cnt.setAttribute('data-logo-status', state.logoStatus);
  });

  const logoImages = document.querySelectorAll('[data-logo-img]');
  const wordmarks = document.querySelectorAll('[data-logo-wordmark]');

  if (state.logoStatus === 'ok' && targetUrl) {
    logoImages.forEach((img) => {
      if (!img.src || !img.src.endsWith(targetUrl)) {
        img.src = targetUrl;
      }
      img.classList.add('is-loaded');
      img.style.display = 'block';
    });
    wordmarks.forEach((wm) => {
      wm.style.display = 'none';
    });
  } else if (state.logoStatus === 'missing') {
    logoImages.forEach((img) => {
      img.classList.remove('is-loaded');
      img.style.display = 'none';
    });
    wordmarks.forEach((wm) => {
      wm.style.display = 'inline-flex';
    });
  } else {
    // 'loading' állapot: se kép, se szöveges tartalék nem látszik, de a hely le van foglalva
    logoImages.forEach((img) => {
      img.classList.remove('is-loaded');
      img.style.display = 'none';
    });
    wordmarks.forEach((wm) => {
      wm.style.display = 'none';
    });
  }
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
        subscribeTodayHydration(user.uid);
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
        subscribeTodayHydration(user.uid);
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
    subscribeTodayHydration(state.currentUser.uid);
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
    const validPillars = MODES[state.mode]?.pillars || [];
    if (validPillars.includes(pillarId)) {
      return { route: 'lab', pillar: pillarId, subpage: subpageId };
    }
    return { route: 'notFound', pillar: null, subpage: null };
  }

  // 2. Lab fő pillér (pl. #/lab/recovery)
  const pillarMatch = cleanHash.match(/^#\/lab\/([a-z0-9_-]+)$/);
  if (pillarMatch) {
    const pillarId = pillarMatch[1];
    const validPillars = MODES[state.mode]?.pillars || [];
    if (validPillars.includes(pillarId)) {
      return { route: 'lab', pillar: pillarId, subpage: null };
    }
    return { route: 'notFound', pillar: null, subpage: null };
  }

  if (cleanHash === '#/more/profile') return { route: 'more', pillar: 'profile', subpage: null };
  if (cleanHash === '#/home') return { route: 'home', pillar: null, subpage: null };
  if (cleanHash === '#/lab') return { route: 'lab', pillar: null, subpage: null };
  if (cleanHash === '#/journal') return { route: 'journal', pillar: null, subpage: null };
  if (cleanHash === '#/more') return { route: 'more', pillar: null, subpage: null };

  return { route: 'notFound', pillar: null, subpage: null };
}

export function navigateTo(hash) {
  if (window.location.hash !== hash) {
    window.location.hash = hash;
  } else {
    handleRouteChange();
  }
}

function handleRouteChange() {
  try {
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

    // Ha az idegrendszeri mérések aloldalra lépünk, feliratkozunk (60 napos ablak)
    if (state.currentRoute === 'lab' && state.currentSubpage === 'nervous' && state.currentUser) {
      subscribeNervousPeriod(state.currentUser.uid, 60);
    } else if (state.nervousUnsubscribe) {
      state.nervousUnsubscribe();
      state.nervousUnsubscribe = null;
    }

    // Ha a hidratáció aloldalra lépünk, feliratkozunk (14 napos ablak)
    if (state.currentRoute === 'lab' && state.currentPillar === 'nutrition' && state.currentSubpage === 'hydration' && state.currentUser) {
      if (!state.hydrationSelectedDateKey) {
        state.hydrationSelectedDateKey = formatDateKey(new Date());
      }
      subscribeHydrationPeriod(state.currentUser.uid);
    } else if (state.hydrationUnsubscribe) {
      state.hydrationUnsubscribe();
      state.hydrationUnsubscribe = null;
    }

    // Ha az ételtár aloldalra lépünk, feliratkozunk az ételekre
    if (state.currentRoute === 'lab' && state.currentPillar === 'nutrition' && state.currentSubpage === 'foods' && state.currentUser) {
      subscribeFoods(state.currentUser.uid);
    } else if (state.currentSubpage !== 'meals' && state.foodsUnsubscribe) {
      state.foodsUnsubscribe();
      state.foodsUnsubscribe = null;
    }

    // Ha az étkezési terv aloldalra lépünk, feliratkozunk a hétre és az ételekre is
    if (state.currentRoute === 'lab' && state.currentPillar === 'nutrition' && state.currentSubpage === 'meals' && state.currentUser) {
      if (!state.mealsWeekStartKey) {
        state.mealsWeekStartKey = getMondayOfDate(new Date());
      }
      if (!state.mealsSelectedDateKey) {
        state.mealsSelectedDateKey = formatDateKey(new Date());
      }
      subscribeWeekMeals(state.currentUser.uid, state.mealsWeekStartKey);
      subscribeFoods(state.currentUser.uid);
    } else if (state.currentSubpage !== 'meals' && state.weekMealsUnsubscribe) {
      state.weekMealsUnsubscribe();
      state.weekMealsUnsubscribe = null;
    }

    updateNavigationUI();
    render();
    window.scrollTo({ top: 0, behavior: 'instant' });
  } catch (err) {
    console.error('handleRouteChange error:', err);
    const container = document.getElementById('app-view');
    if (container) {
      container.innerHTML = renderRouteError(err);
      try {
        attachViewEventListeners();
      } catch (attachErr) {
        console.error('attachViewEventListeners error:', attachErr);
      }
    }
  }
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

/**
 * Útvonal hibaüzenet (404 vagy renderelési kivétel) barátságos megjelenítése
 */
export function renderRouteError(err) {
  return `
    <div class="empty-state route-error-state" role="alert" style="margin-top: 32px;">
      <svg class="empty-state-icon" aria-hidden="true"><use href="#icon-empty"></use></svg>
      <div class="empty-state-title">${escapeHtml(T.routeError?.title || 'Hiba történt')}</div>
      <div class="empty-state-desc">${escapeHtml(T.routeError?.message || 'Nem sikerült megnyitni az oldalt. Próbáld újra.')}</div>
      <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
        <button type="button" class="btn btn-primary" id="btn-route-error-retry">${escapeHtml(T.routeError?.retryBtn || 'Újra')}</button>
        <button type="button" class="btn btn-secondary" id="btn-route-error-back">${escapeHtml(T.routeError?.backBtn || 'Vissza')}</button>
      </div>
    </div>
  `;
}

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
    const isWithMetrics = Boolean(checkin.isWithMetrics);
    const chipText = isWithMetrics ? tCheckin.home.chipMetrics : tCheckin.home.chipQuestionnaire;
    const estimatedBadge = `<span class="badge badge-estimated">${escapeHtml(chipText)}</span>`;
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
    const baselines = computeBaselinesFromCheckins(state.nervousCheckins, checkin.dateKey);
    const factors = getReadinessFactors({
      ...checkin,
      todayHrv: checkin.hrv,
      todayRhr: checkin.restingHr,
      baselineHrv: baselines.baselineHrv,
      baselineRhr: baselines.baselineRhr,
      sleepNeedMin: userSleepNeed,
    });
    const factorsText = factors.map((f) => f.text).join(', ');
    const isWithMetrics = Boolean(checkin.isWithMetrics);
    const descSuffix = isWithMetrics
      ? 'az alvásidőd, az állapot-visszajelzéseid és a mért idegrendszeri adataid alapján lett kiszámítva.'
      : 'az alvásidőd és a reggeli állapot-visszajelzéseid alapján lett megbecsülve.';
    const whyDesc = `Fő tényezők: ${factorsText}. A készenléti szinted (${checkin.readiness} / 100) ${descSuffix}`;
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
        </div>
        <p class="text-muted" style="font-size: 0.9375rem; line-height: 1.5;">${tHome.whyEmpty}</p>
      </section>
    `;
  }

  // Welcome kártya új fiókoknak (7 napon belül, ha még semmilyen mai adat nincs)
  const hasHydrationToday = state.todayHydration && state.todayHydration.length > 0;
  let welcomeCardHtml = '';
  if (!hasCheckin && !hasTodayActivity && !hasHydrationToday && isNewUserWithin7Days()) {
    welcomeCardHtml = `
      <section class="welcome-card card">
        <h2 class="welcome-card-title">${tHome.welcome.title}</h2>
        <p class="welcome-card-desc">${tHome.welcome.desc}</p>
        <div class="welcome-card-actions">
          <button type="button" class="btn btn-primary btn-sm" id="btn-welcome-checkin">
            <svg style="width: 14px; height: 14px;" aria-hidden="true"><use href="#icon-check"></use></svg>
            <span>${tHome.welcome.btnCheckin}</span>
          </button>
          <button type="button" class="btn btn-secondary btn-sm" id="btn-welcome-activity">
            <svg style="width: 14px; height: 14px;" aria-hidden="true"><use href="#icon-plus"></use></svg>
            <span>${tHome.welcome.btnActivity}</span>
          </button>
        </div>
      </section>
    `;
  }

  // 3. Mai teendők: valós, számolt feladatlista
  const hasWorkout = Boolean(
    state.todayActivities && state.todayActivities.some((a) => ['training', 'recovery', 'mental'].includes(a.category))
  );

  const checkinIcon = hasCheckin
    ? '<svg style="width: 14px; height: 14px;" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>'
    : '';
  const workoutIcon = hasWorkout
    ? '<svg style="width: 14px; height: 14px;" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>'
    : '';
  const hydrationIcon = hasHydrationToday
    ? '<svg style="width: 14px; height: 14px;" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>'
    : '';

  const todayHydrationTotal = (state.todayHydration || []).reduce((s, e) => s + (Number(e.amountMl) || 0), 0);

  return `
    <div class="home-page">
      ${renderEmailVerificationBanner()}

      <section class="home-greeting-card">
        <div class="greeting-row">
          <div>
            <h1 id="home-greeting-heading"></h1>
            <p class="home-date">${todayString}</p>
          </div>
        </div>
      </section>

      ${welcomeCardHtml}

      <section class="rings-wrapper" aria-label="Napi mutatók">
        ${readinessRing}
        ${strainRing}
        ${sleepRing}
      </section>

      ${whyCardHtml}

      <section class="card">
        <div class="section-header">
          <h2 class="section-title">${tHome.tasksTitle}</h2>
        </div>
        <div class="tasks-list">
          <div class="task-item task-item-clickable ${hasCheckin ? 'completed' : ''}" id="todo-task-checkin" role="button" tabindex="0">
            <div class="task-checkbox-mock" aria-hidden="true">${checkinIcon}</div>
            <span class="task-text">${hasCheckin ? tHome.todos.checkinDone : tHome.todos.checkin}</span>
            ${hasCheckin
              ? `<button type="button" class="btn-text-link" style="margin-left: auto; font-size: 0.8125rem;">${tHome.todos.btnEdit}</button>`
              : `<button type="button" class="btn btn-secondary btn-sm task-action-btn">${tHome.todos.btnStart}</button>`}
          </div>

          <div class="task-item task-item-clickable ${hasWorkout ? 'completed' : ''}" id="todo-task-activity" role="button" tabindex="0">
            <div class="task-checkbox-mock" aria-hidden="true">${workoutIcon}</div>
            <span class="task-text">${hasWorkout ? tHome.todos.activityDone : tHome.todos.activity}</span>
            ${hasWorkout
              ? `<span class="badge" style="margin-left: auto; background: var(--surface); color: var(--text-muted); border: 1px solid var(--border-subtle);">${state.todayActivities.length} db</span>`
              : `<button type="button" class="btn btn-secondary btn-sm task-action-btn">${tHome.todos.btnLog}</button>`}
          </div>

          <div class="task-item task-item-clickable ${hasHydrationToday ? 'completed' : ''}" id="todo-task-hydration" role="button" tabindex="0">
            <div class="task-checkbox-mock" aria-hidden="true">${hydrationIcon}</div>
            <span class="task-text">${hasHydrationToday ? tHome.todos.hydrationDone : tHome.todos.hydration}</span>
            ${hasHydrationToday
              ? `<span class="badge" style="margin-left: auto; background: var(--surface); color: var(--text-muted); border: 1px solid var(--border-subtle);">${fmtMl(todayHydrationTotal)}</span>`
              : `<button type="button" class="btn btn-secondary btn-sm task-action-btn">${tHome.todos.btnOpen}</button>`}
          </div>
        </div>
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
        </div>
      </div>

      <div class="section-header" style="margin-top: 12px;"><h2 class="section-title">Almodulok</h2><span class="badge badge-coming-soon">${T.comingSoonBadge}</span></div>
      <div class="submodules-list">
        ${pillar.submodules.map((sm, idx) => {
          const isSleepSub = pillarId === 'recovery' && idx === 0;
          const isNervousSub = pillarId === 'recovery' && (idx === 2 || sm.title === 'Idegrendszeri mérések');
          const isMealsSub = pillarId === 'nutrition' && (sm.title === 'Étkezési terv' || idx === 0);
          const isFoodsSub = pillarId === 'nutrition' && (sm.title === 'Ételtár' || idx === 1);
          const isHydrationSub = pillarId === 'nutrition' && (sm.title.includes('Hidratáció') || idx === 2);
          if (isSleepSub) {
            return `
              <a href="#/lab/recovery/sleep" class="submodule-card card-clickable" style="text-decoration: none; color: inherit; display: block;" aria-label="${escapeHtml(sm.title)} megnyitása">
                <div class="submodule-card-header">
                  <h3 class="submodule-title" style="color: var(--accent);">${escapeHtml(sm.title)}</h3>
                  <svg style="width: 18px; height: 18px; color: var(--accent);" aria-hidden="true"><use href="#icon-chevron-right"></use></svg>
                </div>
                <p class="submodule-desc">${escapeHtml(sm.desc)}</p>
                <div style="display: flex; justify-content: flex-end; margin-top: 6px;">
                  <span class="badge" style="background: var(--accent-subtle); color: var(--accent); border-color: rgba(76, 141, 255, 0.3);">Megnyitás</span>
                </div>
              </a>
            `;
          }
          if (isNervousSub) {
            return `
              <a href="#/lab/recovery/nervous" class="submodule-card card-clickable" style="text-decoration: none; color: inherit; display: block;" aria-label="${escapeHtml(sm.title)} megnyitása">
                <div class="submodule-card-header">
                  <h3 class="submodule-title" style="color: var(--accent);">${escapeHtml(sm.title)}</h3>
                  <svg style="width: 18px; height: 18px; color: var(--accent);" aria-hidden="true"><use href="#icon-chevron-right"></use></svg>
                </div>
                <p class="submodule-desc">${escapeHtml(sm.desc)}</p>
                <div style="display: flex; justify-content: flex-end; margin-top: 6px;">
                  <span class="badge" style="background: var(--accent-subtle); color: var(--accent); border-color: rgba(76, 141, 255, 0.3);">Megnyitás</span>
                </div>
              </a>
            `;
          }
          if (isMealsSub) {
            return `
              <a href="#/lab/nutrition/meals" class="submodule-card card-clickable" style="text-decoration: none; color: inherit; display: block;" aria-label="${escapeHtml(sm.title)} megnyitása">
                <div class="submodule-card-header">
                  <h3 class="submodule-title" style="color: var(--accent);">${escapeHtml(sm.title)}</h3>
                  <svg style="width: 18px; height: 18px; color: var(--accent);" aria-hidden="true"><use href="#icon-chevron-right"></use></svg>
                </div>
                <p class="submodule-desc">${escapeHtml(sm.desc)}</p>
                <div style="display: flex; justify-content: flex-end; margin-top: 6px;">
                  <span class="badge" style="background: var(--accent-subtle); color: var(--accent); border-color: rgba(76, 141, 255, 0.3);">Megnyitás</span>
                </div>
              </a>
            `;
          }
          if (isFoodsSub) {
            return `
              <a href="#/lab/nutrition/foods" class="submodule-card card-clickable" style="text-decoration: none; color: inherit; display: block;" aria-label="${escapeHtml(sm.title)} megnyitása">
                <div class="submodule-card-header">
                  <h3 class="submodule-title" style="color: var(--accent);">${escapeHtml(sm.title)}</h3>
                  <svg style="width: 18px; height: 18px; color: var(--accent);" aria-hidden="true"><use href="#icon-chevron-right"></use></svg>
                </div>
                <p class="submodule-desc">${escapeHtml(sm.desc)}</p>
                <div style="display: flex; justify-content: flex-end; margin-top: 6px;">
                  <span class="badge" style="background: var(--accent-subtle); color: var(--accent); border-color: rgba(76, 141, 255, 0.3);">Megnyitás</span>
                </div>
              </a>
            `;
          }
          if (isHydrationSub) {
            return `
              <a href="#/lab/nutrition/hydration" class="submodule-card card-clickable" style="text-decoration: none; color: inherit; display: block;" aria-label="${escapeHtml(sm.title)} megnyitása">
                <div class="submodule-card-header">
                  <h3 class="submodule-title" style="color: var(--accent);">${escapeHtml(sm.title)}</h3>
                  <svg style="width: 18px; height: 18px; color: var(--accent);" aria-hidden="true"><use href="#icon-chevron-right"></use></svg>
                </div>
                <p class="submodule-desc">${escapeHtml(sm.desc)}</p>
                <div style="display: flex; justify-content: flex-end; margin-top: 6px;">
                  <span class="badge" style="background: var(--accent-subtle); color: var(--accent); border-color: rgba(76, 141, 255, 0.3);">Megnyitás</span>
                </div>
              </a>
            `;
          }
          return `
            <div class="submodule-card">
              <div class="submodule-card-header"><h3 class="submodule-title">${escapeHtml(sm.title)}</h3><span class="badge badge-coming-soon">${T.comingSoonBadge}</span></div>
              <p class="submodule-desc">${escapeHtml(sm.desc)}</p>
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
   10F. ACTIVITY RÉSZLETEK NÉZET (6. LÉPÉS) / ACTIVITY DETAILS MODAL
   ========================================================================== */

let currentDetailsEscHandler = null;

function openActivityDetailsModal(activity) {
  if (!activity) return;
  state.viewingActivity = activity;
  state.isDetailsModalOpen = true;

  const modalRoot = document.getElementById('activity-modal-root');
  if (!modalRoot) return;

  document.body.classList.add('modal-open');

  const tDet = T.journal.details;
  const tJourn = T.journal;
  const category = activity.category || 'training';
  const categoryLabel = tJourn.categories[category] || category;
  const typeLabel = tJourn.types[activity.type] || activity.type;

  const formattedDate = activity.dateKey ? formatDayGroupTitle(activity.dateKey) : '';
  const timeText = activity.startAt ? formatActivityTime(activity.startAt) : '';

  const feelOptions = [
    { val: 1, emoji: '😫', label: tJourn.feelLabels[1] },
    { val: 2, emoji: '🙁', label: tJourn.feelLabels[2] },
    { val: 3, emoji: '😐', label: tJourn.feelLabels[3] },
    { val: 4, emoji: '🙂', label: tJourn.feelLabels[4] },
    { val: 5, emoji: '😁', label: tJourn.feelLabels[5] },
  ];
  const feelObj = feelOptions.find((f) => f.val === activity.feelAfter);

  modalRoot.innerHTML = `
    <div class="modal-backdrop" id="activity-details-backdrop">
      <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-act-details-title" style="max-width: 520px;">
        <div class="modal-header">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="badge badge-sample" style="text-transform: capitalize;">${escapeHtml(categoryLabel)}</span>
            <h2 class="modal-title" id="modal-act-details-title">${escapeHtml(typeLabel)}</h2>
          </div>
          <button type="button" class="btn-modal-close" id="btn-close-details-modal" aria-label="${tDet.closeBtn}">
            <svg aria-hidden="true"><use href="#icon-close"></use></svg>
          </button>
        </div>

        <div class="modal-body" style="padding: 20px;">
          ${activity.title ? `<div class="act-details-custom-title">${escapeHtml(activity.title)}</div>` : ''}

          <div class="act-details-meta-row">
            <div class="act-details-meta-item">
              <svg class="act-details-icon" aria-hidden="true"><use href="#icon-journal"></use></svg>
              <span>${escapeHtml(formattedDate)}</span>
            </div>
            ${timeText ? `
              <div class="act-details-meta-item">
                <svg class="act-details-icon" aria-hidden="true"><use href="#icon-sparkle"></use></svg>
                <span>${escapeHtml(timeText)}</span>
              </div>
            ` : ''}
          </div>

          <div class="act-details-grid">
            ${category !== 'event' && typeof activity.strain === 'number' ? `
              <div class="act-details-card">
                <span class="act-details-label">${tDet.strainLabel}</span>
                <span class="act-details-val val-strain">${activity.strain.toFixed(1).replace('.', ',')}</span>
                <span class="act-details-sub">0–21 skála</span>
              </div>
            ` : ''}

            ${typeof activity.durationMin === 'number' && activity.durationMin > 0 ? `
              <div class="act-details-card">
                <span class="act-details-label">${tDet.durationLabel}</span>
                <span class="act-details-val">${fmtDuration(activity.durationMin)}</span>
                <span class="act-details-sub">${activity.durationMin} perc</span>
              </div>
            ` : ''}

            ${category !== 'event' && typeof activity.rpe === 'number' && activity.rpe > 0 ? `
              <div class="act-details-card">
                <span class="act-details-label">${tDet.rpeLabel}</span>
                <span class="act-details-val">${activity.rpe} / 10</span>
                <span class="act-details-sub">${escapeHtml(tJourn.rpeLabels[activity.rpe] || '')}</span>
              </div>
            ` : ''}

            ${feelObj ? `
              <div class="act-details-card">
                <span class="act-details-label">${tDet.feelLabel}</span>
                <span class="act-details-val">${feelObj.emoji} ${feelObj.val}/5</span>
                <span class="act-details-sub">${escapeHtml(feelObj.label)}</span>
              </div>
            ` : ''}
          </div>

          ${activity.note && activity.note.trim() ? `
            <div class="act-details-note-box">
              <span class="act-details-label">${tDet.noteLabel}</span>
              <p class="act-details-note-text">${escapeHtml(activity.note)}</p>
            </div>
          ` : ''}
        </div>

        <div class="modal-footer" style="display: flex; gap: 12px; justify-content: flex-end;">
          <button type="button" class="btn btn-secondary" id="btn-details-edit">${tDet.editBtn}</button>
          <button type="button" class="btn btn-primary" id="btn-details-share" style="display: inline-flex; align-items: center; gap: 8px;">
            <svg style="width: 16px; height: 16px;" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            <span>${tDet.shareBtn}</span>
          </button>
        </div>
      </div>
    </div>
  `;

  const btnClose = document.getElementById('btn-close-details-modal');
  const backdrop = document.getElementById('activity-details-backdrop');
  const btnEdit = document.getElementById('btn-details-edit');
  const btnShare = document.getElementById('btn-details-share');

  if (btnClose) btnClose.addEventListener('click', closeActivityDetailsModal);
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeActivityDetailsModal();
    });
  }

  if (btnEdit) {
    btnEdit.addEventListener('click', () => {
      closeActivityDetailsModal();
      openActivityModal(activity);
    });
  }

  if (btnShare) {
    btnShare.addEventListener('click', () => {
      closeActivityDetailsModal();
      openShareModal(activity);
    });
  }

  currentDetailsEscHandler = (e) => {
    if (e.key === 'Escape') {
      closeActivityDetailsModal();
    }
  };
  window.addEventListener('keydown', currentDetailsEscHandler);
}

function closeActivityDetailsModal() {
  if (currentDetailsEscHandler) {
    window.removeEventListener('keydown', currentDetailsEscHandler);
    currentDetailsEscHandler = null;
  }
  state.isDetailsModalOpen = false;
  state.viewingActivity = null;
  const modalRoot = document.getElementById('activity-modal-root');
  if (modalRoot) modalRoot.innerHTML = '';
  document.body.classList.remove('modal-open');
}


/* ==========================================================================
   10G. ACTIVITY MEGOSZTÁS KÉP ÉS CANVAS GENERÁTOR (6. LÉPÉS)
   ========================================================================== */

let currentShareEscHandler = null;
let currentShareLogoImg = null;
let shareDebounceTimer = null;

function haversineDistanceMeters(p1, p2) {
  const R = 6371000;
  const dLat = (p2[0] - p1[0]) * Math.PI / 180;
  const dLon = (p2[1] - p1[1]) * Math.PI / 180;
  const lat1 = p1[0] * Math.PI / 180;
  const lat2 = p2[0] * Math.PI / 180;

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function trimRouteEndpoints(route, trimMeters = 200) {
  if (!Array.isArray(route) || route.length < 2) return [];

  let startIdx = 0;
  let accumStart = 0;
  for (let i = 0; i < route.length - 1; i++) {
    const d = haversineDistanceMeters(route[i], route[i + 1]);
    accumStart += d;
    if (accumStart >= trimMeters) {
      startIdx = i + 1;
      break;
    }
  }
  if (accumStart < trimMeters) return [];

  let endIdx = route.length - 1;
  let accumEnd = 0;
  for (let i = route.length - 1; i > startIdx; i--) {
    const d = haversineDistanceMeters(route[i], route[i - 1]);
    accumEnd += d;
    if (accumEnd >= trimMeters) {
      endIdx = i - 1;
      break;
    }
  }
  if (accumEnd < trimMeters) return [];

  if (endIdx - startIdx + 1 < 2) return [];

  return route.slice(startIdx, endIdx + 1);
}

function fmtPace(secPerKm) {
  if (!secPerKm || secPerKm <= 0) return '—';
  const m = Math.floor(secPerKm / 60);
  const s = Math.floor(secPerKm % 60);
  return `${m}:${String(s).padStart(2, '0')} /km`;
}

function fmtDistance(meters) {
  if (!meters || meters <= 0) return '—';
  const km = meters / 1000;
  return `${km.toFixed(2).replace('.', ',')} km`;
}

let cachedBrandLogos = {
  dark: null,
  light: null,
};

export function loadBrandLogo(isDarkTheme) {
  const cacheKey = isDarkTheme ? 'dark' : 'light';
  if (cachedBrandLogos[cacheKey]) {
    return Promise.resolve(cachedBrandLogos[cacheKey]);
  }
  return new Promise((resolve) => {
    const baseName = isDarkTheme ? 'logo-dark-mode' : 'logo-light-mode';

    // 1. Elsőbbség a PNG változatnak az SVG-vel szemben
    const imgPng = new Image();
    imgPng.onload = () => {
      if ((imgPng.naturalWidth || imgPng.width) > 0 && (imgPng.naturalHeight || imgPng.height) > 0) {
        cachedBrandLogos[cacheKey] = imgPng;
        resolve(imgPng);
      } else {
        trySvg();
      }
    };
    imgPng.onerror = () => {
      trySvg();
    };

    function trySvg() {
      // 2. Ha a PNG nem elérhető vagy hibás, megpróbáljuk az SVG-t
      const imgSvg = new Image();
      imgSvg.onload = () => {
        // Explicit méretek biztosítása ha hiányozna (pl. viewBox-os SVG méret nélküli drawImage hibájának elkerülésére)
        if (!imgSvg.width || !imgSvg.height || imgSvg.width <= 0 || imgSvg.height <= 0) {
          imgSvg.width = imgSvg.naturalWidth || 180;
          imgSvg.height = imgSvg.naturalHeight || 44;
        }
        cachedBrandLogos[cacheKey] = imgSvg;
        resolve(imgSvg);
      };
      imgSvg.onerror = () => {
        // 3. Sem PNG, sem SVG nincs -> null (szöveges tartalékra váltunk)
        resolve(null);
      };
      imgSvg.src = `${baseName}.svg`;
    }

    imgPng.src = `${baseName}.png`;
  });
}

function drawRoundedRect(ctx, x, y, width, height, radius, fill = null, stroke = null, lineWidth = 1) {
  if (width <= 0 || height <= 0) return;
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
}

function drawGaugeArc(ctx, cx, cy, radius, startAngle, endAngle, strokeStyle, lineWidth) {
  ctx.beginPath();
  ctx.arc(cx, cy, radius, startAngle, endAngle);
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.stroke();
}

function wrapText(ctx, text, maxWidth, maxLines = 3) {
  if (!text) return [];
  const words = text.split(/\s+/);
  const lines = [];
  let currentLine = '';

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth) {
      if (lines.length + 1 >= maxLines) {
        let trunc = currentLine ? `${currentLine} ${word}` : word;
        while (trunc.length > 0 && ctx.measureText(`${trunc}…`).width > maxWidth) {
          trunc = trunc.slice(0, -1);
        }
        lines.push(`${trunc}…`);
        return lines;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }
  return lines;
}

function getShareThemeTokens(bgMode = 'transparent', textColor = 'white', category = 'training') {
  const isTransparent = bgMode === 'transparent';
  const catColorsDark = {
    training: '#4C8DFF',
    recovery: '#34E0A1',
    mental: '#A78BFA',
    event: '#F59E0B',
  };
  const catColorsLight = {
    training: '#2563EB',
    recovery: '#0E9F6E',
    mental: '#7C3AED',
    event: '#D97706',
  };

  if (isTransparent) {
    const isWhite = textColor !== 'black';
    if (isWhite) {
      return {
        isTransparent: true,
        isDark: true,
        isWhite: true,
        bg: null,
        bgGrad: null,
        surface: null,
        surfaceHover: null,
        border: 'rgba(255, 255, 255, 0.25)',
        textPrimary: '#FFFFFF',
        textSecondary: 'rgba(255, 255, 255, 0.70)',
        textMuted: 'rgba(255, 255, 255, 0.40)',
        accent: '#FFFFFF',
        strainColor: '#FFFFFF',
        trackColor: 'rgba(255, 255, 255, 0.25)',
        catColor: '#FFFFFF',
        badgeBg: 'rgba(255, 255, 255, 0.16)',
        shadowColor: 'rgba(0, 0, 0, 0.45)',
        headerSubColor: 'rgba(255, 255, 255, 0.60)',
      };
    } else {
      return {
        isTransparent: true,
        isDark: false,
        isWhite: false,
        bg: null,
        bgGrad: null,
        surface: null,
        surfaceHover: null,
        border: 'rgba(18, 22, 27, 0.25)',
        textPrimary: '#12161B',
        textSecondary: 'rgba(18, 22, 27, 0.70)',
        textMuted: 'rgba(18, 22, 27, 0.40)',
        accent: '#12161B',
        strainColor: '#12161B',
        trackColor: 'rgba(18, 22, 27, 0.20)',
        catColor: '#12161B',
        badgeBg: 'rgba(18, 22, 27, 0.12)',
        shadowColor: 'rgba(255, 255, 255, 0.50)',
        headerSubColor: 'rgba(0, 0, 0, 0.55)',
      };
    }
  }

  const isDark = bgMode === 'dark';
  const catColor = isDark ? (catColorsDark[category] || '#4C8DFF') : (catColorsLight[category] || '#2563EB');

  if (isDark) {
    return {
      isTransparent: false,
      isDark: true,
      isWhite: true,
      bg: '#0A0C0F',
      bgGrad: '#12161E',
      surface: '#12161B',
      surfaceHover: '#181E25',
      border: 'rgba(255, 255, 255, 0.08)',
      textPrimary: '#F2F5F7',
      textSecondary: '#8E99A6',
      textMuted: '#5F6B7A',
      accent: '#34E0A1',
      strainColor: '#4C8DFF',
      trackColor: 'rgba(255, 255, 255, 0.06)',
      catColor: catColor,
      badgeBg: 'rgba(76, 141, 255, 0.15)',
      shadowColor: 'transparent',
      headerSubColor: '#8E99A6',
    };
  } else {
    return {
      isTransparent: false,
      isDark: false,
      isWhite: false,
      bg: '#F6F7F9',
      bgGrad: '#EDF1F5',
      surface: '#FFFFFF',
      surfaceHover: '#F1F5F9',
      border: 'rgba(0, 0, 0, 0.08)',
      textPrimary: '#12161B',
      textSecondary: '#64748B',
      textMuted: '#94A3B8',
      accent: '#0E9F6E',
      strainColor: '#2563EB',
      trackColor: 'rgba(0, 0, 0, 0.06)',
      catColor: catColor,
      badgeBg: 'rgba(37, 99, 235, 0.10)',
      shadowColor: 'transparent',
      headerSubColor: '#64748B',
    };
  }
}

function drawMetricTile(ctx, area, tokens, label, val, sub = '') {
  drawRoundedRect(ctx, area.x, area.y, area.width, area.height, 20, tokens.surface, tokens.border, 1.5);
  ctx.textAlign = 'left';

  ctx.font = '700 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = tokens.textMuted;
  ctx.fillText(label, area.x + 20, area.y + 26);

  ctx.font = '800 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = tokens.textPrimary;
  ctx.fillText(val, area.x + 20, area.y + 58);

  if (sub) {
    ctx.font = '500 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = tokens.textSecondary;
    ctx.fillText(sub, area.x + 20, area.y + 80);
  }
}

export function drawTopBrandLogo(ctx, width, padTop, tokens, logoImg) {
  const row1H = 44;
  const wordmark = 'Lockin';
  const tagline = T.share.headerTagline || 'Performance Lab';

  ctx.save();

  // Ellenőrizzük, hogy a logókép használható-e és érvényes méretekkel bír-e
  const imgW = logoImg ? (logoImg.naturalWidth || logoImg.width || 0) : 0;
  const imgH = logoImg ? (logoImg.naturalHeight || logoImg.height || 0) : 0;
  const hasValidLogo = Boolean(logoImg && imgW > 0 && imgH > 0);

  let logoW = 0;
  let logoH = row1H;
  if (hasValidLogo) {
    const aspect = imgW / imgH;
    logoW = Math.round(row1H * aspect);
    if (logoW > 180) {
      logoW = 180;
      logoH = Math.round(logoW / aspect);
    }
  }

  // Első sor: logó és "Lockin" név egymás mellett, VAGY ha nincs logó, csak "Lockin"
  ctx.font = '800 38px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const textW = ctx.measureText(wordmark).width;
  const gap = 14;

  const totalRow1W = hasValidLogo ? logoW + gap + textW : textW;
  const startX = (width - totalRow1W) / 2;
  const row1CenterY = padTop + row1H / 2;

  if (hasValidLogo) {
    const logoY = padTop + (row1H - logoH) / 2;
    try {
      ctx.drawImage(logoImg, startX, logoY, logoW, logoH);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = tokens.textPrimary;
      ctx.fillText(wordmark, startX + logoW + gap, row1CenterY);
    } catch (e) {
      console.warn('drawTopBrandLogo drawImage failed, fallback to centered text:', e);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = tokens.textPrimary;
      ctx.fillText(wordmark, width / 2, row1CenterY);
    }
  } else {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = tokens.textPrimary;
    ctx.fillText(wordmark, width / 2, row1CenterY);
  }

  // Második sor: "Performance Lab", kisebb betűmérettel és visszafogott szürkével
  const row2Y = padTop + row1H + 16;
  ctx.font = '600 17px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = tokens.headerSubColor || tokens.textSecondary;
  ctx.fillText(tagline, width / 2, row2Y);

  ctx.restore();
}

export const SHARE_FIELDS = [
  {
    key: 'typeTitle',
    defaultChecked: true,
    available: () => true,
    measure: (ctx, width, a) => {
      const hasCustomTitle = Boolean(a.title && a.title.trim());
      return hasCustomTitle ? 116 : 84;
    },
    draw: (ctx, area, a, tokens) => {
      const tJourn = T.journal;
      const cat = a.category || 'training';
      const catLabel = (tJourn.categories[cat] || cat).toUpperCase();
      const typeLabel = tJourn.types[a.type] || a.type;
      const hasCustomTitle = Boolean(a.title && a.title.trim());

      ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      const pillW = ctx.measureText(catLabel).width + 24;
      drawRoundedRect(ctx, area.x, area.y, pillW, 28, 14, tokens.badgeBg, null);
      ctx.fillStyle = tokens.catColor;
      ctx.textAlign = 'center';
      ctx.fillText(catLabel, area.x + pillW / 2, area.y + 19);

      ctx.textAlign = 'left';
      if (hasCustomTitle) {
        ctx.font = '800 40px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = tokens.textPrimary;
        const titleText = a.title.length > 32 ? a.title.slice(0, 31) + '…' : a.title;
        ctx.fillText(titleText, area.x, area.y + 70);

        ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = tokens.textSecondary;
        ctx.fillText(typeLabel, area.x, area.y + 102);
      } else {
        ctx.font = '800 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = tokens.textPrimary;
        ctx.fillText(typeLabel, area.x, area.y + 74);
      }
    },
  },
  {
    key: 'date',
    defaultChecked: true,
    available: () => true,
    measure: () => 28,
    draw: (ctx, area, a, tokens) => {
      const dateText = a.dateKey ? formatDayGroupTitle(a.dateKey) : '';
      ctx.font = '500 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = tokens.textSecondary;
      ctx.textAlign = 'left';
      ctx.fillText(`📅  ${dateText}`, area.x, area.y + 20);
    },
  },
  {
    key: 'duration',
    defaultChecked: true,
    available: (a) => typeof a.durationMin === 'number' && a.durationMin > 0,
    measure: () => 100,
    draw: (ctx, area, a, tokens) => {
      drawMetricTile(ctx, area, tokens, T.share.canvas.durationLabel, fmtDuration(a.durationMin), `${a.durationMin} perc`);
    },
  },
  {
    key: 'strain',
    defaultChecked: true,
    available: (a) => typeof a.strain === 'number',
    measure: (ctx, width, a, options) => {
      const format = options?.format || 'sticker';
      return format === 'square' ? 140 : 160;
    },
    draw: (ctx, area, a, tokens) => {
      drawRoundedRect(ctx, area.x, area.y, area.width, area.height, 24, tokens.surface, tokens.border, 1.5);

      const cx = area.x + 95;
      const cy = area.y + area.height / 2;
      const radius = Math.min(58, (area.height - 30) / 2);
      const strokeW = 12;

      const startAngle = 0.75 * Math.PI;
      const totalArc = 1.5 * Math.PI;
      const strainVal = Math.max(0, Math.min(21, a.strain || 0));
      const progressAngle = startAngle + (strainVal / 21) * totalArc;

      drawGaugeArc(ctx, cx, cy, radius, startAngle, startAngle + totalArc, tokens.trackColor, strokeW);
      if (strainVal > 0) {
        drawGaugeArc(ctx, cx, cy, radius, startAngle, progressAngle, tokens.strainColor, strokeW);
      }

      ctx.textAlign = 'center';
      ctx.font = '800 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = tokens.textPrimary;
      const strValText = strainVal.toFixed(1).replace('.', ',');
      ctx.fillText(strValText, cx, cy + 8);

      ctx.font = '600 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = tokens.textMuted;
      ctx.fillText('/ 21', cx, cy + 24);

      const textX = area.x + 180;
      ctx.textAlign = 'left';

      ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = tokens.strainColor;
      ctx.fillText(T.share.canvas.strainLabel, textX, cy - 20);

      let levelText = T.share.canvas.strainLevels.low;
      if (strainVal >= 14) levelText = T.share.canvas.strainLevels.high;
      else if (strainVal >= 7) levelText = T.share.canvas.strainLevels.med;

      ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = tokens.textPrimary;
      ctx.fillText(levelText, textX, cy + 12);

      ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = tokens.textMuted;
      ctx.fillText('Napi kardiovaszkuláris és izomzati terhelés', textX, cy + 36);
    },
  },
  {
    key: 'rpe',
    defaultChecked: true,
    available: (a) => typeof a.rpe === 'number' && a.rpe > 0,
    measure: () => 100,
    draw: (ctx, area, a, tokens) => {
      const rpeDesc = T.journal.rpeLabels[a.rpe] || '';
      drawMetricTile(ctx, area, tokens, T.share.canvas.rpeLabel, `${a.rpe} / 10`, rpeDesc);
    },
  },
  {
    key: 'feelAfter',
    defaultChecked: false,
    available: (a) => typeof a.feelAfter === 'number' && a.feelAfter >= 1 && a.feelAfter <= 5,
    measure: () => 100,
    draw: (ctx, area, a, tokens) => {
      const feelObj = [
        { val: 1, emoji: '😫' },
        { val: 2, emoji: '🙁' },
        { val: 3, emoji: '😐' },
        { val: 4, emoji: '🙂' },
        { val: 5, emoji: '😁' },
      ].find((f) => f.val === a.feelAfter);
      const emoji = feelObj?.emoji || '😐';
      const label = T.journal.feelLabels[a.feelAfter] || '';
      drawMetricTile(ctx, area, tokens, T.share.canvas.feelLabel, `${emoji} ${a.feelAfter} / 5`, label);
    },
  },
  {
    key: 'note',
    defaultChecked: false,
    available: (a) => Boolean(a.note && a.note.trim()),
    measure: (ctx, width, a) => {
      const lines = wrapText(ctx, a.note || '', (width || 952) - 44, 4);
      return Math.max(76, 44 + lines.length * 24);
    },
    draw: (ctx, area, a, tokens) => {
      drawRoundedRect(ctx, area.x, area.y, area.width, area.height, 18, tokens.surface, tokens.border, 1.5);
      if (!tokens.isTransparent) {
        ctx.fillStyle = tokens.accent;
        ctx.fillRect(area.x, area.y + 12, 4, area.height - 24);
      }

      ctx.textAlign = 'left';
      ctx.font = '700 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = tokens.textMuted;
      ctx.fillText(T.share.canvas.noteLabel, area.x + 22, area.y + 24);

      ctx.font = '500 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = tokens.textPrimary;
      const lines = wrapText(ctx, a.note || '', area.width - 44, 4);
      for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], area.x + 22, area.y + 50 + i * 24);
      }
    },
  },
  {
    key: 'startTime',
    defaultChecked: false,
    available: (a) => Boolean(a.startAt),
    measure: () => 28,
    draw: (ctx, area, a, tokens) => {
      const timeText = a.startAt ? formatActivityTime(a.startAt) : '';
      if (!timeText) return;
      ctx.font = '500 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = tokens.textSecondary;
      ctx.textAlign = 'left';
      ctx.fillText(`🕒  ${timeText}`, area.x, area.y + 20);
    },
  },
  {
    key: 'userName',
    defaultChecked: false,
    available: () => Boolean(state.userProfile?.displayName && state.userProfile.displayName.trim()),
    measure: () => 28,
    draw: (ctx, area, a, tokens) => {
      const name = state.userProfile?.displayName || '';
      if (!name) return;
      ctx.font = '700 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = tokens.textSecondary;
      ctx.textAlign = 'left';
      ctx.fillText(`👤  ${name}`, area.x, area.y + 20);
    },
  },
  {
    key: 'route',
    defaultChecked: true,
    available: (a) => Array.isArray(a.route) && a.route.length >= 2,
    measure: (ctx, width, a, options) => {
      const format = options?.format || 'sticker';
      if (format === 'square') return 180;
      if (format === 'story') return 280;
      return 240;
    },
    draw: (ctx, area, a, tokens, options) => {
      drawRoundedRect(ctx, area.x, area.y, area.width, area.height, 22, tokens.surface, tokens.border, 1.5);

      ctx.textAlign = 'left';
      ctx.font = '700 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      const badgeText = T.share.canvas.routeLabel;
      const bW = ctx.measureText(badgeText).width + 20;
      drawRoundedRect(ctx, area.x + 20, area.y + 16, bW, 24, 6, tokens.badgeBg, null);
      ctx.fillStyle = tokens.catColor;
      ctx.fillText(badgeText, area.x + 30, area.y + 33);

      const isPrivacy = options?.routePrivacy !== false;
      const pointsToDraw = isPrivacy ? trimRouteEndpoints(a.route, 200) : a.route;

      if (!pointsToDraw || pointsToDraw.length < 2) {
        ctx.textAlign = 'center';
        ctx.font = '500 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = tokens.textMuted;
        ctx.fillText(T.share.canvas.routeTooShort, area.x + area.width / 2, area.y + area.height / 2 + 10);
        return;
      }

      let minLat = Infinity, maxLat = -Infinity;
      let minLon = Infinity, maxLon = -Infinity;
      for (const p of pointsToDraw) {
        if (p[0] < minLat) minLat = p[0];
        if (p[0] > maxLat) maxLat = p[0];
        if (p[1] < minLon) minLon = p[1];
        if (p[1] > maxLon) maxLon = p[1];
      }
      const midLat = (minLat + maxLat) / 2;
      const cosMid = Math.cos(midLat * Math.PI / 180);

      const padX = 40;
      const padTop = 54;
      const padBottom = 24;
      const drawW = area.width - padX * 2;
      const drawH = area.height - padTop - padBottom;

      const rawW = Math.max(0.00001, (maxLon - minLon) * cosMid);
      const rawH = Math.max(0.00001, maxLat - minLat);
      const scale = Math.min(drawW / rawW, drawH / rawH);

      const actualW = rawW * scale;
      const actualH = rawH * scale;

      const offX = area.x + padX + (drawW - actualW) / 2;
      const offY = area.y + padTop + (drawH - actualH) / 2;

      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = tokens.catColor;
      ctx.lineWidth = tokens.isTransparent ? 8 : 5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let i = 0; i < pointsToDraw.length; i++) {
        const px = offX + (pointsToDraw[i][1] - minLon) * cosMid * scale;
        const py = offY + (maxLat - pointsToDraw[i][0]) * scale;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      const sX = offX + (pointsToDraw[0][1] - minLon) * cosMid * scale;
      const sY = offY + (maxLat - pointsToDraw[0][0]) * scale;
      const eX = offX + (pointsToDraw[pointsToDraw.length - 1][1] - minLon) * cosMid * scale;
      const eY = offY + (maxLat - pointsToDraw[pointsToDraw.length - 1][0]) * scale;

      if (tokens.isTransparent) {
        ctx.fillStyle = tokens.textPrimary;
        ctx.beginPath();
        ctx.arc(sX, sY, 7, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = tokens.textPrimary;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(eX, eY, 7, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        ctx.fillStyle = '#34E0A1';
        ctx.beginPath();
        ctx.arc(sX, sY, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FF5252';
        ctx.beginPath();
        ctx.arc(eX, eY, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    },
  },
  {
    key: 'hrSeries',
    defaultChecked: true,
    available: (a) => Array.isArray(a.hrSeries) && a.hrSeries.length >= 2,
    measure: (ctx, width, a, options) => {
      const format = options?.format || 'sticker';
      if (format === 'square') return 150;
      if (format === 'story') return 240;
      return 200;
    },
    draw: (ctx, area, a, tokens) => {
      drawRoundedRect(ctx, area.x, area.y, area.width, area.height, 22, tokens.surface, tokens.border, 1.5);

      ctx.textAlign = 'left';
      ctx.font = '700 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      const badgeText = T.share.canvas.hrLabel;
      const bW = ctx.measureText(badgeText).width + 20;

      if (tokens.isTransparent) {
        drawRoundedRect(ctx, area.x + 20, area.y + 16, bW, 24, 6, tokens.badgeBg, null);
        ctx.fillStyle = tokens.textPrimary;
      } else {
        drawRoundedRect(ctx, area.x + 20, area.y + 16, bW, 24, 6, 'rgba(255, 82, 82, 0.15)', null);
        ctx.fillStyle = '#FF5252';
      }
      ctx.fillText(badgeText, area.x + 30, area.y + 33);

      const pts = a.hrSeries;
      if (!pts || pts.length < 2) return;

      let minB = Infinity, maxB = -Infinity;
      for (const p of pts) {
        if (p.bpm < minB) minB = p.bpm;
        if (p.bpm > maxB) maxB = p.bpm;
      }
      const yMin = Math.max(30, minB - 5);
      const yMax = maxB + 5;
      const bRange = Math.max(10, yMax - yMin);

      const padX = 36;
      const padTop = 56;
      const padBottom = 22;
      const drawW = area.width - padX * 2;
      const drawH = area.height - padTop - padBottom;

      const minT = pts[0].t;
      const maxT = pts[pts.length - 1].t;
      const tRange = Math.max(1, maxT - minT);

      const coords = pts.map((pt) => ({
        x: area.x + padX + ((pt.t - minT) / tRange) * drawW,
        y: area.y + padTop + (1 - (pt.bpm - yMin) / bRange) * drawH,
      }));

      ctx.save();
      const baseBottom = area.y + area.height - padBottom;
      const grad = ctx.createLinearGradient(0, area.y + padTop, 0, baseBottom);

      if (tokens.isTransparent) {
        const fillTop = tokens.isWhite ? 'rgba(255, 255, 255, 0.25)' : 'rgba(18, 22, 27, 0.20)';
        const fillZero = tokens.isWhite ? 'rgba(255, 255, 255, 0.0)' : 'rgba(18, 22, 27, 0.0)';
        grad.addColorStop(0, fillTop);
        grad.addColorStop(1, fillZero);
      } else {
        grad.addColorStop(0, 'rgba(255, 82, 82, 0.35)');
        grad.addColorStop(1, 'rgba(255, 82, 82, 0.0)');
      }

      ctx.beginPath();
      ctx.moveTo(coords[0].x, baseBottom);
      for (const c of coords) ctx.lineTo(c.x, c.y);
      ctx.lineTo(coords[coords.length - 1].x, baseBottom);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.strokeStyle = tokens.isTransparent ? tokens.textPrimary : '#FF5252';
      ctx.lineWidth = tokens.isTransparent ? 6 : 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      for (let i = 0; i < coords.length; i++) {
        if (i === 0) ctx.moveTo(coords[i].x, coords[i].y);
        else ctx.lineTo(coords[i].x, coords[i].y);
      }
      ctx.stroke();
      ctx.restore();
    },
  },
  {
    key: 'distance',
    defaultChecked: true,
    available: (a) => typeof a.distanceM === 'number' && a.distanceM > 0,
    measure: () => 100,
    draw: (ctx, area, a, tokens) => {
      drawMetricTile(ctx, area, tokens, T.share.canvas.distanceLabel, fmtDistance(a.distanceM), 'Megtett távolság');
    },
  },
  {
    key: 'pace',
    defaultChecked: true,
    available: (a) => typeof a.paceSecPerKm === 'number' && a.paceSecPerKm > 0,
    measure: () => 100,
    draw: (ctx, area, a, tokens) => {
      drawMetricTile(ctx, area, tokens, T.share.canvas.paceLabel, fmtPace(a.paceSecPerKm), 'Átlagos tempó');
    },
  },
  {
    key: 'avgHr',
    defaultChecked: true,
    available: (a) => typeof a.avgHr === 'number' && a.avgHr > 0,
    measure: () => 100,
    draw: (ctx, area, a, tokens) => {
      drawMetricTile(ctx, area, tokens, T.share.canvas.avgHrLabel, `${Math.round(a.avgHr)} bpm`, 'Átlagos pulzus');
    },
  },
  {
    key: 'maxHr',
    defaultChecked: true,
    available: (a) => typeof a.maxHr === 'number' && a.maxHr > 0,
    measure: () => 100,
    draw: (ctx, area, a, tokens) => {
      drawMetricTile(ctx, area, tokens, T.share.canvas.maxHrLabel, `${Math.round(a.maxHr)} bpm`, 'Csúcs pulzusszám');
    },
  },
  {
    key: 'elevationGain',
    defaultChecked: true,
    available: (a) => typeof a.elevationGainM === 'number' && a.elevationGainM > 0,
    measure: () => 100,
    draw: (ctx, area, a, tokens) => {
      drawMetricTile(ctx, area, tokens, T.share.canvas.elevationLabel, `+${Math.round(a.elevationGainM)} m`, 'Szintemelkedés');
    },
  },
];

export async function drawShareCard(canvas, activity, options = {}, logoImg = null) {
  const format = options.format || 'sticker';
  const width = 1080;
  const bgMode = options.bgMode || 'transparent';
  const isTransparent = bgMode === 'transparent';
  const textColor = isTransparent ? (options.textColor || 'white') : (bgMode === 'dark' ? 'white' : 'black');
  const textShadow = isTransparent && (options.textShadow !== false);
  const tokens = getShareThemeTokens(bgMode, textColor, activity.category);

  // Logo aszinkron betöltése ha még nincs meg és nincs letiltva
  if (!logoImg && !options.noLogo) {
    const needsDarkLogo = isTransparent ? (textColor !== 'black') : (bgMode !== 'light');
    logoImg = await loadBrandLogo(needsDarkLogo);
  }
  if (options.noLogo) {
    logoImg = null;
  }

  const marginX = 60;
  const contentW = width - marginX * 2;
  const padTop = 60;
  const padBottom = 60;
  const headerBlockH = 80;
  const headerBlockGap = 32;

  let ctx = canvas.getContext('2d');

  const selectedKeys = options.selectedFields || [];
  const activeFields = SHARE_FIELDS.filter((f) => selectedKeys.includes(f.key) && f.available(activity));

  const hasTypeTitle = activeFields.some((f) => f.key === 'typeTitle');
  const hasDate = activeFields.some((f) => f.key === 'date');
  const hasStartTime = activeFields.some((f) => f.key === 'startTime');
  const hasUserName = activeFields.some((f) => f.key === 'userName');
  const hasHeader = hasTypeTitle || hasDate || hasStartTime || hasUserName;

  let headerH = 0;
  if (hasHeader) {
    if (hasTypeTitle) {
      const f = activeFields.find((x) => x.key === 'typeTitle');
      const baseH = f ? f.measure(ctx, contentW, activity, options) : 84;
      headerH = baseH + (hasDate || hasStartTime || hasUserName ? 36 : 0);
    } else {
      headerH = 36;
    }
  }

  const hasStrain = activeFields.some((f) => f.key === 'strain');
  const strainH = hasStrain
    ? (activeFields.find((f) => f.key === 'strain')?.measure(ctx, contentW, activity, options) || 160)
    : 0;

  const metricKeys = ['duration', 'rpe', 'feelAfter', 'distance', 'pace', 'avgHr', 'maxHr', 'elevationGain'];
  const activeMetrics = activeFields.filter((f) => metricKeys.includes(f.key));
  let metricsH = 0;
  if (activeMetrics.length > 0) {
    const numRows = activeMetrics.length <= 3 ? 1 : 2;
    metricsH = numRows * 100 + (numRows - 1) * 14;
  }

  const hasRoute = activeFields.some((f) => f.key === 'route');
  const routeH = hasRoute
    ? (activeFields.find((f) => f.key === 'route')?.measure(ctx, contentW, activity, options) || 240)
    : 0;

  const hasHr = activeFields.some((f) => f.key === 'hrSeries');
  const hrH = hasHr
    ? (activeFields.find((f) => f.key === 'hrSeries')?.measure(ctx, contentW, activity, options) || 200)
    : 0;

  const hasNote = activeFields.some((f) => f.key === 'note');
  const noteH = hasNote
    ? (activeFields.find((f) => f.key === 'note')?.measure(ctx, contentW, activity, options) || 80)
    : 0;

  const gap = 20;
  const blocks = [
    { type: 'header', h: headerH },
    { type: 'strain', h: strainH },
    { type: 'metrics', h: metricsH },
    { type: 'route', h: routeH },
    { type: 'hr', h: hrH },
    { type: 'note', h: noteH },
  ].filter((b) => b.h > 0);

  const totalBlocksH = blocks.reduce((acc, b) => acc + b.h, 0) + (blocks.length > 1 ? (blocks.length - 1) * gap : 0);

  let height = 0;
  if (activeFields.length === 0) {
    height = Math.round(padTop + headerBlockH + padBottom);
  } else {
    height = Math.round(padTop + headerBlockH + headerBlockGap + totalBlocksH + padBottom);
  }
  if (!isFinite(height) || isNaN(height) || height <= 0) {
    height = 200;
  }

  // Canvas átméretezése (újra inicializálja a rajzteret)
  canvas.width = width;
  canvas.height = height;
  ctx = canvas.getContext('2d');

  // Háttér rajzolása: Átlátszó módban clearRect (0 háttérpixel!), tele módban szolid gradiens
  if (isTransparent) {
    ctx.clearRect(0, 0, width, height);
  } else {
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, tokens.bg);
    bgGrad.addColorStop(1, tokens.bgGrad);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);
  }

  // Árnyék beállítása átlátszó módban (ha be van kapcsolva)
  if (textShadow) {
    ctx.shadowColor = tokens.shadowColor;
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 3;
  } else {
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }

  // Logó és felirat MINDIG a kép tetején, középre igazítva
  drawTopBrandLogo(ctx, width, padTop, tokens, logoImg);

  if (activeFields.length === 0) {
    // Ha minden adat ki van kapcsolva, a kép csak a fejléc-blokkot tartalmazza!
    return;
  }

  const topContentY = padTop + headerBlockH + headerBlockGap;
  let currentY = topContentY;

  for (const block of blocks) {
    const actualH = block.h;

    if (block.type === 'header') {
      const headerArea = { x: marginX, y: currentY, width: contentW, height: actualH };
      if (hasTypeTitle) {
        const f = activeFields.find((x) => x.key === 'typeTitle');
        if (f) f.draw(ctx, headerArea, activity, tokens, options);
      }
      const titleH = hasTypeTitle ? (activeFields.find((x) => x.key === 'typeTitle')?.measure(ctx, contentW, activity, options) || 84) : 0;
      const subY = headerArea.y + (hasTypeTitle ? titleH + 8 : 8);
      let subX = headerArea.x;

      if (hasDate) {
        const f = activeFields.find((x) => x.key === 'date');
        if (f) {
          const dText = activity.dateKey ? formatDayGroupTitle(activity.dateKey) : '';
          ctx.font = '500 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
          const dW = ctx.measureText(`📅  ${dText}`).width + 24;
          f.draw(ctx, { x: subX, y: subY, width: dW, height: 28 }, activity, tokens, options);
          subX += dW + 16;
        }
      }
      if (hasStartTime) {
        const f = activeFields.find((x) => x.key === 'startTime');
        if (f) {
          const tText = activity.startAt ? formatActivityTime(activity.startAt) : '';
          ctx.font = '500 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
          const tW = ctx.measureText(`🕒  ${tText}`).width + 24;
          f.draw(ctx, { x: subX, y: subY, width: tW, height: 28 }, activity, tokens, options);
          subX += tW + 16;
        }
      }
      if (hasUserName) {
        const f = activeFields.find((x) => x.key === 'userName');
        if (f) {
          const uName = state.userProfile?.displayName || '';
          ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
          const uW = ctx.measureText(`👤  ${uName}`).width + 24;
          f.draw(ctx, { x: subX, y: subY, width: uW, height: 28 }, activity, tokens, options);
        }
      }
    } else if (block.type === 'strain') {
      const f = activeFields.find((x) => x.key === 'strain');
      if (f) {
        f.draw(ctx, { x: marginX, y: currentY, width: contentW, height: actualH }, activity, tokens, options);
      }
    } else if (block.type === 'metrics') {
      const count = activeMetrics.length;
      const numCols = count <= 3 ? count : Math.ceil(count / 2);
      const numRows = count <= 3 ? 1 : 2;
      const colGap = 14;
      const rowGap = 14;
      const tileW = (contentW - (numCols - 1) * colGap) / numCols;
      const tileH = (actualH - (numRows - 1) * rowGap) / numRows;

      activeMetrics.forEach((f, idx) => {
        const r = Math.floor(idx / numCols);
        const c = idx % numCols;
        const tx = marginX + c * (tileW + colGap);
        const ty = currentY + r * (tileH + rowGap);
        f.draw(ctx, { x: tx, y: ty, width: tileW, height: tileH }, activity, tokens, options);
      });
    } else if (block.type === 'route') {
      const f = activeFields.find((x) => x.key === 'route');
      if (f) {
        f.draw(ctx, { x: marginX, y: currentY, width: contentW, height: actualH }, activity, tokens, options);
      }
    } else if (block.type === 'hr') {
      const f = activeFields.find((x) => x.key === 'hrSeries');
      if (f) {
        f.draw(ctx, { x: marginX, y: currentY, width: contentW, height: actualH }, activity, tokens, options);
      }
    } else if (block.type === 'note') {
      const f = activeFields.find((x) => x.key === 'note');
      if (f) {
        f.draw(ctx, { x: marginX, y: currentY, width: contentW, height: actualH }, activity, tokens, options);
      }
    }

    currentY += actualH + gap;
  }
}

function showShareFeedback(msg, type = 'success') {
  const box = document.getElementById('share-feedback-box');
  if (!box) return;
  box.className = `share-feedback-alert ${type}`;
  box.textContent = msg;
  box.style.display = 'block';
  setTimeout(() => {
    if (box) box.style.display = 'none';
  }, 4000);
}

async function copyShareCardImage(blob) {
  if (!blob) return;
  if (!navigator.clipboard || !window.ClipboardItem) {
    showShareFeedback(T.share.actions.copyNotSupported, 'warning');
    return;
  }
  try {
    const item = new ClipboardItem({ 'image/png': blob });
    await navigator.clipboard.write([item]);
    showShareFeedback(T.share.actions.copied, 'success');
  } catch (err) {
    console.warn('Clipboard write error:', err);
    showShareFeedback(T.share.actions.copyNotSupported, 'warning');
  }
}

function downloadShareCardImage(blob, activity) {
  if (!blob) return;
  const isTrans = state.shareOptions?.bgMode === 'transparent';
  const typeKey = activity.type || 'activity';
  const dateKey = activity.dateKey || 'today';
  const fileName = isTrans
    ? `lockin-${typeKey}-${dateKey}-atlatszo.png`
    : `lockin-${typeKey}-${dateKey}.png`;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  showShareFeedback(T.share.actions.downloadSuccess, 'success');
}

function canUseNativeShare(blob, activity) {
  if (!navigator.share || !navigator.canShare) return false;
  try {
    const isTrans = state.shareOptions?.bgMode === 'transparent';
    const typeKey = activity.type || 'activity';
    const dateKey = activity.dateKey || 'today';
    const fileName = isTrans
      ? `lockin-${typeKey}-${dateKey}-atlatszo.png`
      : `lockin-${typeKey}-${dateKey}.png`;
    const file = new File([blob], fileName, { type: 'image/png' });
    return navigator.canShare({ files: [file] });
  } catch (e) {
    return false;
  }
}

async function triggerNativeShare(blob, activity) {
  if (!blob) return;
  const isTrans = state.shareOptions?.bgMode === 'transparent';
  const typeKey = activity.type || 'activity';
  const dateKey = activity.dateKey || 'today';
  const fileName = isTrans
    ? `lockin-${typeKey}-${dateKey}-atlatszo.png`
    : `lockin-${typeKey}-${dateKey}.png`;
  const file = new File([blob], fileName, { type: 'image/png' });
  const typeName = T.journal.types[activity.type] || activity.type;
  try {
    await navigator.share({
      files: [file],
      title: `Lockin – ${typeName}`,
      text: `${typeName} – Lockin teljesítménykártya`,
    });
  } catch (err) {
    if (err && err.name === 'AbortError') {
      return;
    }
    console.warn('Native share error:', err);
  }
}

function openShareModal(activity) {
  if (!activity) return;
  state.isShareModalOpen = true;

  const modalRoot = document.getElementById('activity-modal-root');
  if (!modalRoot) return;

  document.body.classList.add('modal-open');

  state.shareOptions = {
    bgMode: 'transparent',
    textColor: 'white',
    textShadow: true,
    previewBg: 'checkered',
    selectedFields: SHARE_FIELDS.filter((f) => f.defaultChecked && f.available(activity)).map((f) => f.key),
    routePrivacy: true,
  };

  const tShare = T.share;

  modalRoot.innerHTML = `
    <div class="modal-backdrop" id="activity-share-backdrop">
      <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-share-title" style="max-width: 620px;">
        <div class="modal-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <button type="button" class="btn-back" id="btn-share-back-details" aria-label="${tShare.backToDetails}" style="margin: 0; padding: 4px 8px; font-size: 0.85rem;">
              <svg class="btn-back-icon" aria-hidden="true"><use href="#icon-arrow-left"></use></svg>
              <span>${tShare.backToDetails}</span>
            </button>
            <h2 class="modal-title" id="modal-share-title" style="font-size: 1.1rem; margin-left: 6px;">${tShare.title}</h2>
          </div>
          <button type="button" class="btn-modal-close" id="btn-close-share-modal" aria-label="Ablak bezárása">
            <svg aria-hidden="true"><use href="#icon-close"></use></svg>
          </button>
        </div>

        <div class="modal-body" style="padding: 18px 20px;">
          <div class="share-preview-outer">
            <div class="share-preview-stage is-transparent" id="share-preview-stage" data-preview-bg="checkered">
              <img id="share-preview-custom-bg" class="share-preview-custom-bg" alt="" style="display: none;" />
              <img id="share-preview-img" class="share-preview-img" alt="${tShare.previewAlt}" />
              <div id="share-preview-error" class="share-preview-error" style="display: none;">
                <p class="share-error-text">${tShare.renderError}</p>
                <button type="button" class="btn btn-secondary btn-sm" id="btn-share-retry">${tShare.retryBtn}</button>
              </div>
            </div>
            <div class="share-preview-hint">
              <svg class="share-hint-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>${tShare.transparencyHint}</span>
            </div>
          </div>

          <div id="share-feedback-box" style="display: none;"></div>

          <div class="share-control-group">
            <div class="share-section-title">${tShare.bgLabel}</div>
            <div class="segmented-control" role="radiogroup" aria-label="${tShare.bgLabel}">
              <button type="button" class="segmented-btn ${state.shareOptions.bgMode === 'transparent' ? 'active' : ''}" data-share-bg="transparent">
                ${tShare.bgTransparent}
              </button>
              <button type="button" class="segmented-btn ${state.shareOptions.bgMode === 'dark' ? 'active' : ''}" data-share-bg="dark">
                ${tShare.bgDark}
              </button>
              <button type="button" class="segmented-btn ${state.shareOptions.bgMode === 'light' ? 'active' : ''}" data-share-bg="light">
                ${tShare.bgLight}
              </button>
            </div>
          </div>

          <div class="share-control-group" id="share-text-color-group" style="${state.shareOptions.bgMode === 'transparent' ? '' : 'display: none;'}">
            <div class="share-section-title">${tShare.textColorLabel}</div>
            <div class="segmented-control" role="radiogroup" aria-label="${tShare.textColorLabel}">
              <button type="button" class="segmented-btn ${state.shareOptions.textColor === 'white' ? 'active' : ''}" data-share-text-color="white">
                ${tShare.textWhite}
              </button>
              <button type="button" class="segmented-btn ${state.shareOptions.textColor === 'black' ? 'active' : ''}" data-share-text-color="black">
                ${tShare.textBlack}
              </button>
            </div>
            <div style="margin-top: 10px;">
              <label class="share-field-row" style="padding: 4px 2px;">
                <input type="checkbox" id="share-text-shadow-toggle" ${state.shareOptions.textShadow ? 'checked' : ''} class="share-field-checkbox">
                <span class="share-field-label">
                  <span>${tShare.shadowLabel}</span>
                </span>
              </label>
            </div>
          </div>

          <div class="share-control-group">
            <div class="share-section-title">${tShare.previewBgLabel}</div>
            <div class="segmented-control" role="radiogroup" aria-label="${tShare.previewBgLabel}">
              <button type="button" class="segmented-btn ${state.shareOptions.previewBg === 'checkered' ? 'active' : ''}" data-preview-bg-opt="checkered">
                ${tShare.previewBgs.checkered}
              </button>
              <button type="button" class="segmented-btn ${state.shareOptions.previewBg === 'dark' ? 'active' : ''}" data-preview-bg-opt="dark">
                ${tShare.previewBgs.dark}
              </button>
              <button type="button" class="segmented-btn ${state.shareOptions.previewBg === 'light' ? 'active' : ''}" data-preview-bg-opt="light">
                ${tShare.previewBgs.light}
              </button>
              <button type="button" class="segmented-btn ${state.shareOptions.previewBg === 'custom' ? 'active' : ''}" data-preview-bg-opt="custom">
                ${tShare.previewBgs.custom}
              </button>
            </div>
            <div id="share-custom-photo-wrap" style="${state.shareOptions.previewBg === 'custom' ? '' : 'display: none;'} margin-top: 10px;">
              <input type="file" id="share-custom-photo-input" accept="image/*" style="display: none;">
              <button type="button" class="btn btn-secondary btn-sm" id="btn-share-pick-photo" style="display: inline-flex; align-items: center; gap: 6px;">
                <svg style="width: 14px; height: 14px;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                <span id="share-pick-photo-label">${state.shareCustomPhotoUrl ? tShare.previewChangeBtn : tShare.previewUploadBtn}</span>
              </button>
            </div>
          </div>

          <div class="share-control-group">
            <div class="share-section-title">${tShare.fieldsSection}</div>
            <div class="share-fields-list">
              ${SHARE_FIELDS.map((field) => {
                const isAvail = field.available(activity);
                const isChecked = state.shareOptions.selectedFields.includes(field.key);
                const labelText = T.share.fields[field.key] || field.key;
                const isRoute = field.key === 'route';

                return `
                  <div>
                    <label class="share-field-row ${!isAvail ? 'disabled' : ''}">
                      <input type="checkbox" data-share-field="${field.key}" ${isChecked && isAvail ? 'checked' : ''} ${!isAvail ? 'disabled' : ''} class="share-field-checkbox">
                      <span class="share-field-label">
                        <span>${escapeHtml(labelText)}</span>
                        ${!isAvail ? `<span class="share-field-nodata">(${tShare.noData})</span>` : ''}
                      </span>
                    </label>
                    ${isRoute && isAvail ? `
                      <div class="share-subfield-row" id="share-route-privacy-wrap" style="${isChecked ? '' : 'display: none;'}">
                        <label class="share-field-row">
                          <input type="checkbox" id="share-route-privacy-toggle" ${state.shareOptions.routePrivacy ? 'checked' : ''} class="share-field-checkbox">
                          <span class="share-field-label text-muted" style="font-size: 0.825rem;">
                            ${escapeHtml(T.share.fields.routePrivacy)}
                          </span>
                        </label>
                      </div>
                    ` : ''}
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <div class="share-app-notice">
            <span class="share-notice-icon">ℹ️</span>
            <span>${tShare.copyAppNotice}</span>
          </div>
        </div>

        <div class="modal-footer" style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: flex-end; align-items: center;">
          <button type="button" class="btn btn-secondary" id="btn-share-copy" style="display: inline-flex; align-items: center; gap: 6px;">
            <svg style="width: 16px; height: 16px;" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <span>${tShare.actions.copy}</span>
          </button>
          <button type="button" class="btn btn-secondary" id="btn-share-download" style="display: inline-flex; align-items: center; gap: 6px;">
            <svg style="width: 16px; height: 16px;" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            <span>${tShare.actions.download}</span>
          </button>
          <button type="button" class="btn btn-primary" id="btn-share-native" style="display: none; align-items: center; gap: 6px;">
            <svg style="width: 16px; height: 16px;" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
            <span>${tShare.actions.share}</span>
          </button>
        </div>
      </div>
    </div>
  `;

  const btnClose = document.getElementById('btn-close-share-modal');
  const btnBack = document.getElementById('btn-share-back-details');
  const backdrop = document.getElementById('activity-share-backdrop');

  if (btnClose) btnClose.addEventListener('click', closeShareModal);
  if (btnBack) {
    btnBack.addEventListener('click', () => {
      closeShareModal();
      openActivityDetailsModal(activity);
    });
  }
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeShareModal();
    });
  }

  // Háttér mód váltó (Átlátszó / Sötét / Világos)
  const bgBtns = modalRoot.querySelectorAll('[data-share-bg]');
  bgBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const bg = e.currentTarget.getAttribute('data-share-bg');
      if (state.shareOptions.bgMode !== bg) {
        state.shareOptions.bgMode = bg;
        bgBtns.forEach((b) => b.classList.remove('active'));
        e.currentTarget.classList.add('active');

        const textColorGroup = document.getElementById('share-text-color-group');
        const stage = document.getElementById('share-preview-stage');
        if (bg === 'transparent') {
          if (textColorGroup) textColorGroup.style.display = 'block';
          if (stage) stage.classList.add('is-transparent');
        } else {
          if (textColorGroup) textColorGroup.style.display = 'none';
          if (stage) stage.classList.remove('is-transparent');
        }

        updateSharePreview(activity);
      }
    });
  });

  // Szövegszín választó (Fehér / Fekete)
  const textColorBtns = modalRoot.querySelectorAll('[data-share-text-color]');
  textColorBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const tc = e.currentTarget.getAttribute('data-share-text-color');
      if (state.shareOptions.textColor !== tc) {
        state.shareOptions.textColor = tc;
        textColorBtns.forEach((b) => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        updateSharePreview(activity);
      }
    });
  });

  // Árnyék kapcsoló
  const shadowChk = document.getElementById('share-text-shadow-toggle');
  if (shadowChk) {
    shadowChk.addEventListener('change', (e) => {
      state.shareOptions.textShadow = e.currentTarget.checked;
      updateSharePreview(activity);
    });
  }

  // Előnézeti háttér választó (Kockás / Sötét / Világos / Saját fotó)
  const pbgBtns = modalRoot.querySelectorAll('[data-preview-bg-opt]');
  pbgBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const pbg = e.currentTarget.getAttribute('data-preview-bg-opt');
      if (state.shareOptions.previewBg !== pbg) {
        state.shareOptions.previewBg = pbg;
        pbgBtns.forEach((b) => b.classList.remove('active'));
        e.currentTarget.classList.add('active');

        const stage = document.getElementById('share-preview-stage');
        if (stage) stage.setAttribute('data-preview-bg', pbg);

        const customWrap = document.getElementById('share-custom-photo-wrap');
        const customBg = document.getElementById('share-preview-custom-bg');
        if (pbg === 'custom') {
          if (customWrap) customWrap.style.display = 'block';
          if (customBg && state.shareCustomPhotoUrl) {
            customBg.src = state.shareCustomPhotoUrl;
            customBg.style.display = 'block';
          }
        } else {
          if (customWrap) customWrap.style.display = 'none';
          if (customBg) customBg.style.display = 'none';
        }
      }
    });
  });

  // Saját fotó kiválasztó gomb és input
  const btnPickPhoto = document.getElementById('btn-share-pick-photo');
  const photoInput = document.getElementById('share-custom-photo-input');
  if (btnPickPhoto && photoInput) {
    btnPickPhoto.addEventListener('click', () => {
      photoInput.click();
    });
    photoInput.addEventListener('change', (e) => {
      const file = e.currentTarget.files && e.currentTarget.files[0];
      if (file) {
        if (state.shareCustomPhotoUrl) {
          URL.revokeObjectURL(state.shareCustomPhotoUrl);
        }
        state.shareCustomPhotoUrl = URL.createObjectURL(file);
        const customBg = document.getElementById('share-preview-custom-bg');
        if (customBg) {
          customBg.src = state.shareCustomPhotoUrl;
          customBg.style.display = 'block';
        }
        const lbl = document.getElementById('share-pick-photo-label');
        if (lbl) lbl.textContent = T.share.previewChangeBtn;
      }
    });
  }

  // Mezők jelölőnégyzetei
  const fieldBoxes = modalRoot.querySelectorAll('[data-share-field]');
  fieldBoxes.forEach((chk) => {
    chk.addEventListener('change', (e) => {
      const key = e.currentTarget.getAttribute('data-share-field');
      const isChecked = e.currentTarget.checked;
      if (isChecked) {
        if (!state.shareOptions.selectedFields.includes(key)) {
          state.shareOptions.selectedFields.push(key);
        }
      } else {
        state.shareOptions.selectedFields = state.shareOptions.selectedFields.filter((k) => k !== key);
      }

      if (key === 'route') {
        const wrap = document.getElementById('share-route-privacy-wrap');
        if (wrap) wrap.style.display = isChecked ? 'block' : 'none';
      }

      updateSharePreview(activity);
    });
  });

  const routePrivChk = document.getElementById('share-route-privacy-toggle');
  if (routePrivChk) {
    routePrivChk.addEventListener('change', (e) => {
      state.shareOptions.routePrivacy = e.currentTarget.checked;
      updateSharePreview(activity);
    });
  }

  const btnCopy = document.getElementById('btn-share-copy');
  const btnDownload = document.getElementById('btn-share-download');
  const btnNative = document.getElementById('btn-share-native');

  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      copyShareCardImage(state.shareBlob);
    });
  }

  if (btnDownload) {
    btnDownload.addEventListener('click', () => {
      downloadShareCardImage(state.shareBlob, activity);
    });
  }

  if (btnNative) {
    btnNative.addEventListener('click', () => {
      triggerNativeShare(state.shareBlob, activity);
    });
  }

  currentShareEscHandler = (e) => {
    if (e.key === 'Escape') {
      closeShareModal();
    }
  };
  window.addEventListener('keydown', currentShareEscHandler);

  updateSharePreview(activity);
}

let sharePreviewRequestId = 0;

function exportCanvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    try {
      canvas.toBlob((blob) => {
        if (!blob || blob.size === 0) {
          reject(new Error('canvas.toBlob returned null or 0 byte blob'));
        } else {
          resolve(blob);
        }
      }, 'image/png');
    } catch (err) {
      reject(err);
    }
  });
}

function showSharePreviewError(err, activity) {
  console.error('Share preview render error:', err);
  const previewImg = document.getElementById('share-preview-img');
  const errorBox = document.getElementById('share-preview-error');
  if (previewImg) {
    previewImg.style.display = 'none';
    previewImg.classList.remove('is-updating');
  }
  if (errorBox) {
    errorBox.style.display = 'flex';
    const btnRetry = document.getElementById('btn-share-retry');
    if (btnRetry) {
      btnRetry.onclick = () => {
        updateSharePreview(activity);
      };
    }
  }
}

function closeShareModal() {
  sharePreviewRequestId++;
  if (currentShareEscHandler) {
    window.removeEventListener('keydown', currentShareEscHandler);
    currentShareEscHandler = null;
  }
  if (shareDebounceTimer) {
    clearTimeout(shareDebounceTimer);
    shareDebounceTimer = null;
  }
  if (state.shareBlobUrl) {
    URL.revokeObjectURL(state.shareBlobUrl);
    state.shareBlobUrl = null;
    state.shareBlob = null;
  }
  if (state.shareCustomPhotoUrl) {
    URL.revokeObjectURL(state.shareCustomPhotoUrl);
    state.shareCustomPhotoUrl = null;
  }
  state.isShareModalOpen = false;
  const modalRoot = document.getElementById('activity-modal-root');
  if (modalRoot) modalRoot.innerHTML = '';
  document.body.classList.remove('modal-open');
}

export async function updateSharePreview(activity) {
  if (!activity) return;
  const requestId = ++sharePreviewRequestId;

  if (shareDebounceTimer) clearTimeout(shareDebounceTimer);
  shareDebounceTimer = setTimeout(async () => {
    if (requestId !== sharePreviewRequestId) return;

    const previewImg = document.getElementById('share-preview-img');
    const errorBox = document.getElementById('share-preview-error');
    if (!previewImg) return;

    if (errorBox) errorBox.style.display = 'none';
    previewImg.style.display = 'block';
    previewImg.classList.add('is-updating');

    try {
      const isTrans = state.shareOptions.bgMode === 'transparent';
      const needsDarkLogo = isTrans
        ? (state.shareOptions.textColor !== 'black')
        : (state.shareOptions.bgMode !== 'light');
      const logoKey = needsDarkLogo ? 'dark' : 'light';

      if (!currentShareLogoImg || currentShareLogoImg.logoKey !== logoKey) {
        currentShareLogoImg = await loadBrandLogo(needsDarkLogo);
        if (currentShareLogoImg) currentShareLogoImg.logoKey = logoKey;
      }

      if (requestId !== sharePreviewRequestId) return;

      const canvas = document.createElement('canvas');
      let blob = null;

      try {
        await drawShareCard(canvas, activity, state.shareOptions, currentShareLogoImg);
        blob = await exportCanvasToBlob(canvas);
      } catch (drawErr) {
        if (currentShareLogoImg) {
          console.warn('Canvas export failed with logo, retrying with text fallback:', drawErr);
          const fallbackCanvas = document.createElement('canvas');
          await drawShareCard(fallbackCanvas, activity, { ...state.shareOptions, noLogo: true }, null);
          blob = await exportCanvasToBlob(fallbackCanvas);
        } else {
          throw drawErr;
        }
      }

      if (requestId !== sharePreviewRequestId) return;

      if (!blob || blob.size === 0) {
        throw new Error('Generated blob is empty or null');
      }

      const newUrl = URL.createObjectURL(blob);
      const oldUrl = state.shareBlobUrl;

      state.shareBlob = blob;
      state.shareBlobUrl = newUrl;

      // Az előző URL-t csak akkor szabadítjuk fel, miután az új kép már betöltődött a DOM-ban
      previewImg.onload = () => {
        if (oldUrl && oldUrl !== newUrl) {
          URL.revokeObjectURL(oldUrl);
        }
        previewImg.classList.remove('is-updating');
      };
      previewImg.onerror = () => {
        if (oldUrl && oldUrl !== newUrl) {
          URL.revokeObjectURL(oldUrl);
        }
        previewImg.classList.remove('is-updating');
        showSharePreviewError(new Error('Preview image failed to load blob URL'), activity);
      };
      previewImg.src = newUrl;

      const btnNative = document.getElementById('btn-share-native');
      if (btnNative) {
        const canShare = canUseNativeShare(blob, activity);
        btnNative.style.display = canShare ? 'inline-flex' : 'none';
      }
    } catch (err) {
      if (requestId === sharePreviewRequestId) {
        showSharePreviewError(err, activity);
      }
    }
  }, 80);
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
    form.addEventListener('submit', async (e) => {
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

      // Alapvonal lekérése az utolsó 28 napból a választott nap nélkül
      let baselines = { baselineHrv: null, baselineRhr: null };
      if (state.currentUser?.uid) {
        try {
          baselines = await getBaselineDataForUser(state.currentUser.uid, selectedDate);
        } catch (e) {
          console.warn('Baseline lookup error during checkin save:', e);
        }
      }

      const readiness = calcReadiness({
        sleepMin: metrics.sleepMin,
        sleepQuality: Number(sq),
        restedness: Number(rest),
        soreness: Number(sore),
        mood: Number(mood),
        stress: Number(stress),
        sleepNeedMin: getUserSleepNeedMin(),
        todayHrv: hrv,
        todayRhr: restingHr,
        baselineHrv: baselines.baselineHrv,
        baselineRhr: baselines.baselineRhr,
      });

      const isWithMetrics = Boolean(
        (baselines.baselineHrv?.isActive && typeof hrv === 'number' && hrv > 0) ||
        (baselines.baselineRhr?.isActive && typeof restingHr === 'number' && restingHr > 0)
      );

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
        readinessVersion: 2,
        isWithMetrics,
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

    if (state.currentRoute === 'home') {
      render();
    } else if (state.currentRoute === 'lab' && (state.currentSubpage === 'sleep' || state.currentSubpage === 'nervous')) {
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


/* ==========================================================================
   10F. IDEGRENDSZERI MÉRÉSEK ÉS SZEMÉLYES ALAPVONAL (7. LÉPÉS)
   ========================================================================== */

function renderNervousChart(type, checkins, allCheckins, periodDays, baseline, selectedDayKey) {
  const isHrv = type === 'hrv';
  const tNervous = T.nervous;
  const unit = isHrv ? tNervous.charts.unitHrv : tNervous.charts.unitRhr;
  const valKey = isHrv ? 'hrv' : 'restingHr';

  const validCheckins = (checkins || []).filter(
    (c) => c && typeof c[valKey] === 'number' && !isNaN(c[valKey]) && c[valKey] > 0
  );

  if (validCheckins.length < 3) {
    return `<div class="chart-empty-state"><p>${tNervous.charts.emptyState}</p></div>`;
  }

  const days = [];
  const now = new Date();
  for (let i = periodDays - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const dateKey = formatDateKey(d);
    const c = (checkins || []).find((item) => item.dateKey === dateKey) || null;
    days.push({ date: d, dateKey, checkin: c });
  }

  const vals = validCheckins.map((c) => Number(c[valKey]));
  if (baseline && baseline.isActive) {
    vals.push(baseline.bandMin, baseline.bandMax);
  }

  const minV = Math.min(...vals);
  const maxV = Math.max(...vals);
  const spread = Math.max(isHrv ? 12 : 8, maxV - minV);
  const pad = spread * 0.15;
  const yMin = Math.max(0, Math.floor((minV - pad) / 5) * 5);
  const yMax = Math.ceil((maxV + pad) / 5) * 5;
  const range = Math.max(1, yMax - yMin);

  const plotW = 530;
  const plotH = 150;
  const xLeft = 45;
  const yTop = 20;
  const yBottom = yTop + plotH;

  // Rácsvonalak
  const step = Math.max(5, Math.round(range / 4 / 5) * 5);
  const gridLines = [];
  for (let v = yMin + step; v < yMax; v += step) {
    const y = yBottom - ((v - yMin) / range) * plotH;
    gridLines.push(`
      <line x1="${xLeft}" x2="${xLeft + plotW}" y1="${y}" y2="${y}" stroke="var(--border-subtle)" stroke-width="1"></line>
      <text x="${xLeft - 6}" y="${y + 3}" font-size="10" fill="var(--text-muted)" text-anchor="end">${v}</text>
    `);
  }

  // Normál alapvonal háttérsáv (ha aktív)
  let bandSvg = '';
  if (baseline && baseline.isActive) {
    const yBandTop = Math.max(yTop, yBottom - ((baseline.bandMax - yMin) / range) * plotH);
    const yBandBottom = Math.min(yBottom, yBottom - ((baseline.bandMin - yMin) / range) * plotH);
    const bandH = Math.max(2, yBandBottom - yBandTop);
    const minStr = baseline.bandMin.toFixed(1).replace('.', ',');
    const maxStr = baseline.bandMax.toFixed(1).replace('.', ',');
    bandSvg = `
      <rect x="${xLeft}" y="${yBandTop}" width="${plotW}" height="${bandH}" fill="rgba(76, 141, 255, 0.10)" rx="2"></rect>
      <line x1="${xLeft}" x2="${xLeft + plotW}" y1="${yBandTop}" y2="${yBandTop}" stroke="rgba(76, 141, 255, 0.40)" stroke-dasharray="3,3" stroke-width="1"></line>
      <line x1="${xLeft}" x2="${xLeft + plotW}" y1="${yBandBottom}" y2="${yBandBottom}" stroke="rgba(76, 141, 255, 0.40)" stroke-dasharray="3,3" stroke-width="1"></line>
      <text x="${xLeft + plotW - 4}" y="${yBandTop + 11}" font-size="9" fill="rgba(76, 141, 255, 0.85)" font-weight="600" text-anchor="end">Sáv: ${minStr}–${maxStr} ${unit}</text>
    `;
  }

  const colStep = plotW / periodDays;

  // 7 napos mozgó átlag vonala
  const points7d = [];
  days.forEach((d, idx) => {
    const xC = xLeft + (idx + 0.5) * colStep;
    const windowStart = new Date(d.date.getTime() - 6 * 86400000);
    const windowStartKey = formatDateKey(windowStart);
    const windowCheckins = (allCheckins || []).filter(
      (c) => c && c.dateKey >= windowStartKey && c.dateKey <= d.dateKey
    );
    const winVals = windowCheckins
      .map((c) => Number(c[valKey]))
      .filter((v) => typeof v === 'number' && !isNaN(v) && v > 0);
    const avg7d = calc7DayMovingAvg(winVals, isHrv);
    if (avg7d !== null) {
      const y7d = yBottom - ((avg7d - yMin) / range) * plotH;
      points7d.push(`${xC.toFixed(1)},${y7d.toFixed(1)}`);
    }
  });

  const polyline7d = points7d.length >= 2
    ? `<polyline points="${points7d.join(' ')}" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></polyline>`
    : '';

  // Napi pontok és szaggatott összekötő vonal
  const pointsDaily = [];
  const pointsDailyNodes = [];

  days.forEach((d, idx) => {
    const xC = xLeft + (idx + 0.5) * colStep;
    const c = d.checkin;
    const val = c && typeof c[valKey] === 'number' && !isNaN(c[valKey]) && c[valKey] > 0 ? Number(c[valKey]) : null;
    const isSelected = d.dateKey === selectedDayKey;

    let dateLabel = '';
    if (periodDays === 14) {
      dateLabel = idx % 2 === 0 || idx === periodDays - 1 ? `${d.date.getDate()}.` : '';
    } else if (periodDays === 30) {
      dateLabel = idx % 5 === 0 || idx === periodDays - 1 ? `${d.date.getDate()}.` : '';
    } else {
      dateLabel = idx % 10 === 0 || idx === periodDays - 1 ? `${d.date.getDate()}.` : '';
    }

    let dotSvg = '';
    if (val !== null) {
      const yPt = yBottom - ((val - yMin) / range) * plotH;
      pointsDaily.push(`${xC.toFixed(1)},${yPt.toFixed(1)}`);
      dotSvg = `
        <circle cx="${xC}" cy="${yPt}" r="${isSelected ? 6 : 4}" fill="${isSelected ? 'var(--accent)' : 'var(--surface)'}" stroke="var(--accent)" stroke-width="2"></circle>
      `;
    }

    const selectHighlight = isSelected
      ? `<rect x="${xC - colStep / 2 + 1}" y="${yTop}" width="${colStep - 2}" height="${plotH}" fill="rgba(76, 141, 255, 0.08)" stroke="var(--accent)" stroke-width="1" rx="4"></rect>`
      : '';

    pointsDailyNodes.push(`
      <g class="chart-point-group ${isSelected ? 'selected' : ''}" data-nervous-date="${d.dateKey}" tabindex="0" role="button" aria-label="${d.dateKey}: ${val !== null ? `${val} ${unit}` : 'nincs mérés'}">
        ${selectHighlight}
        ${dotSvg}
        ${dateLabel ? `<text x="${xC}" y="${yBottom + 16}" font-size="10" fill="var(--text-muted)" text-anchor="middle">${dateLabel}</text>` : ''}
        <rect x="${xC - colStep / 2}" y="${yTop}" width="${colStep}" height="${plotH + 20}" fill="transparent" style="cursor: pointer;"></rect>
      </g>
    `);
  });

  const polylineDaily = pointsDaily.length >= 2
    ? `<polyline points="${pointsDaily.join(' ')}" fill="none" stroke="var(--text-muted)" stroke-width="1.2" stroke-dasharray="2,2" opacity="0.6"></polyline>`
    : '';

  const chartTitleAria = isHrv ? 'HRV pulzusvariabilitás grafikon' : 'Nyugalmi pulzus grafikon';

  return `
    <svg class="chart-svg" viewBox="0 0 600 205" role="img" aria-label="${chartTitleAria}">
      ${gridLines.join('')}
      ${bandSvg}
      ${polylineDaily}
      ${polyline7d}
      ${pointsDailyNodes.join('')}
    </svg>
  `;
}

function renderNervousPage() {
  const tNervous = T.nervous;
  const periodDays = state.nervousPeriod || 30;
  const allCheckins = state.nervousCheckins || [];
  const now = new Date();

  // Megjelenítési időszak szerinti szűrés
  const startPeriodDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (periodDays - 1));
  const startPeriodKey = formatDateKey(startPeriodDate);
  const periodCheckins = allCheckins.filter((c) => c && c.dateKey >= startPeriodKey);

  // Alapvonal és 7 napos átlagok számítása az összes meglévő check-inből (28 napos ablak a mai nap nélkül)
  const baselines = computeBaselinesFromCheckins(allCheckins, formatDateKey(now));
  const { baselineHrv, baselineRhr, avg7dHrv, avg7dRhr, statusHrv, statusRhr } = baselines;

  const isExcludeTagged = getBaselineExcludeTagged();

  // Kijelölt nap infója
  let selectedDayInfo = '';
  const selectedKey = state.nervousChartSelectedDay;
  const selectedCheckin = selectedKey
    ? allCheckins.find((c) => c.dateKey === selectedKey)
    : (periodCheckins.length > 0 ? periodCheckins[periodCheckins.length - 1] : null);

  if (selectedCheckin) {
    const formattedDate = formatDayGroupTitle(selectedCheckin.dateKey);
    const hrvText = selectedCheckin.hrv ? `<strong>${selectedCheckin.hrv} ms</strong>` : '<span class="text-muted">—</span>';
    const rhrText = selectedCheckin.restingHr ? `<strong>${selectedCheckin.restingHr} bpm</strong>` : '<span class="text-muted">—</span>';
    selectedDayInfo = `
      <span><strong>${escapeHtml(formattedDate)}</strong></span>
      <span>HRV: ${hrvText}</span>
      <span>Nyugalmi pulzus: ${rhrText}</span>
      ${selectedCheckin.sleepEfficiency ? `<span>Alváshatékonyság: <strong>${selectedCheckin.sleepEfficiency}%</strong></span>` : ''}
    `;
  } else {
    selectedDayInfo = `<span class="text-muted">${tNervous.charts.clickInfo}</span>`;
  }

  // Jelzések kártya (csak aktív alapvonalnál és csak ha van mit jelezni; utolsó 3 napban legalább 2 mérés)
  let signalCardHtml = '';
  const last3Keys = [0, 1, 2].map((i) => formatDateKey(new Date(now.getTime() - i * 86400000)));
  const checkinsLast3 = allCheckins.filter((c) => c && last3Keys.includes(c.dateKey));
  const hrvLast3Count = checkinsLast3.filter((c) => typeof c.hrv === 'number' && c.hrv > 0).length;
  const rhrLast3Count = checkinsLast3.filter((c) => typeof c.restingHr === 'number' && c.restingHr > 0).length;

  const isHrvBelow = baselineHrv.isActive && avg7dHrv !== null && avg7dHrv < baselineHrv.bandMin;
  const isRhrAbove = baselineRhr.isActive && avg7dRhr !== null && avg7dRhr > baselineRhr.bandMax;

  if (baselineHrv.isActive && baselineRhr.isActive && hrvLast3Count >= 2 && rhrLast3Count >= 2 && isHrvBelow && isRhrAbove) {
    signalCardHtml = `
      <section class="card nervous-signal-card signal-severe">
        <div class="signal-header">
          <svg class="signal-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <h2 class="signal-title">${tNervous.signals.title}</h2>
        </div>
        <p class="signal-text">${tNervous.signals.bothDeviating}</p>
      </section>
    `;
  } else if (baselineHrv.isActive && hrvLast3Count >= 2 && isHrvBelow) {
    signalCardHtml = `
      <section class="card nervous-signal-card signal-mild">
        <div class="signal-header">
          <svg class="signal-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <h2 class="signal-title">${tNervous.signals.title}</h2>
        </div>
        <p class="signal-text">${tNervous.signals.hrvOnlyBelow}</p>
      </section>
    `;
  } else if (baselineRhr.isActive && rhrLast3Count >= 2 && isRhrAbove) {
    signalCardHtml = `
      <section class="card nervous-signal-card signal-mild">
        <div class="signal-header">
          <svg class="signal-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <h2 class="signal-title">${tNervous.signals.title}</h2>
        </div>
        <p class="signal-text">${tNervous.signals.rhrOnlyAbove}</p>
      </section>
    `;
  }

  // Személyes alapvonal kártya státuszai és sávjai
  const hrvStatusText = baselineHrv.isActive
    ? tNervous.baselineCard.activeStatus.replace('{n}', baselineHrv.count)
    : tNervous.baselineCard.learningStatus.replace('{n}', baselineHrv.count);

  const rhrStatusText = baselineRhr.isActive
    ? tNervous.baselineCard.activeStatus.replace('{n}', baselineRhr.count)
    : tNervous.baselineCard.learningStatus.replace('{n}', baselineRhr.count);

  const hrvBandText = baselineHrv.isActive
    ? `${baselineHrv.bandMin.toFixed(1).replace('.', ',')}–${baselineHrv.bandMax.toFixed(1).replace('.', ',')} ms`
    : '—';

  const rhrBandText = baselineRhr.isActive
    ? `${baselineRhr.bandMin.toFixed(1).replace('.', ',')}–${baselineRhr.bandMax.toFixed(1).replace('.', ',')} bpm`
    : '—';

  const hrv7dText = avg7dHrv !== null ? `${avg7dHrv.toFixed(1).replace('.', ',')} ms` : '—';
  const rhr7dText = avg7dRhr !== null ? `${avg7dRhr.toFixed(1).replace('.', ',')} bpm` : '—';

  let hrvPillClass = 'pill-learning';
  let hrvPillText = tNervous.baselineCard.statusLearning;
  if (baselineHrv.isActive) {
    if (avg7dHrv === null) {
      hrvPillClass = 'pill-learning';
      hrvPillText = tNervous.baselineCard.noData;
    } else if (statusHrv === 'within') {
      hrvPillClass = 'pill-good';
      hrvPillText = tNervous.baselineCard.statusWithin;
    } else if (statusHrv === 'above') {
      hrvPillClass = 'pill-info';
      hrvPillText = tNervous.baselineCard.statusAbove;
    } else if (statusHrv === 'below') {
      hrvPillClass = 'pill-warning';
      hrvPillText = tNervous.baselineCard.statusBelow;
    }
  }

  let rhrPillClass = 'pill-learning';
  let rhrPillText = tNervous.baselineCard.statusLearning;
  if (baselineRhr.isActive) {
    if (avg7dRhr === null) {
      rhrPillClass = 'pill-learning';
      rhrPillText = tNervous.baselineCard.noData;
    } else if (statusRhr === 'within') {
      rhrPillClass = 'pill-good';
      rhrPillText = tNervous.baselineCard.statusWithin;
    } else if (statusRhr === 'above') {
      rhrPillClass = 'pill-warning';
      rhrPillText = tNervous.baselineCard.statusAbove;
    } else if (statusRhr === 'below') {
      rhrPillClass = 'pill-info';
      rhrPillText = tNervous.baselineCard.statusBelow;
    }
  }

  // Grafikonok
  const chart1Html = renderNervousChart('hrv', periodCheckins, allCheckins, periodDays, baselineHrv, selectedKey);
  const chart2Html = renderNervousChart('rhr', periodCheckins, allCheckins, periodDays, baselineRhr, selectedKey);

  // Napi lista
  const sortedCheckins = [...periodCheckins].sort((a, b) => b.dateKey.localeCompare(a.dateKey));
  let logListHtml = '';
  if (sortedCheckins.length === 0) {
    logListHtml = `
      <div class="chart-empty-state">
        <p>${tNervous.log.emptyLog}</p>
        <button type="button" class="btn btn-primary btn-sm" id="btn-nervous-log-new" style="margin-top: 10px;">+ Reggeli check-in rögzítése</button>
      </div>
    `;
  } else {
    logListHtml = `
      <div class="nervous-log-list">
        ${sortedCheckins.map((c) => {
          const dateTitle = formatDayGroupTitle(c.dateKey);
          const tags = Array.isArray(c.tags) ? c.tags : [];
          const tagLabels = {
            sick: '🤒 Beteg',
            travel: '✈️ Utazás',
            alcohol: '🍷 Alkohol',
            lateTraining: '🌙 Késői edzés',
          };
          const hrvDisplay = c.hrv ? `${c.hrv} ms` : '—';
          const rhrDisplay = c.restingHr ? `${c.restingHr} bpm` : '—';
          return `
            <div class="nervous-log-card" data-checkin-date="${c.dateKey}" role="button" tabindex="0" aria-label="${escapeHtml(dateTitle)} check-in szerkesztése">
              <div class="nervous-log-main">
                <span class="nervous-log-date">${escapeHtml(dateTitle)}</span>
                <div class="nervous-log-metrics">
                  <span>HRV: <strong>${hrvDisplay}</strong></span>
                  <span>Nyugalmi pulzus: <strong>${rhrDisplay}</strong></span>
                </div>
                ${tags.length > 0 ? `
                  <div class="nervous-tags-row">
                    ${tags.map((t) => `<span class="nervous-tag-chip">${escapeHtml(tagLabels[t] || t)}</span>`).join('')}
                  </div>
                ` : ''}
              </div>
              <div class="nervous-log-right">
                <svg style="width: 16px; height: 16px; color: var(--text-muted);" aria-hidden="true"><use href="#icon-chevron-right"></use></svg>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  // Mérési útmutató kártya (accordion)
  const guideHtml = `
    <details class="card accordion-card nervous-guide-card">
      <summary class="accordion-summary">
        <div style="display: flex; align-items: center; gap: 8px;">
          <svg style="width: 18px; height: 18px; color: var(--accent);" aria-hidden="true"><use href="#icon-info"></use></svg>
          <span>${tNervous.guide.title}</span>
        </div>
        <svg style="width: 16px; height: 16px; color: var(--text-muted);" aria-hidden="true"><use href="#icon-chevron-right"></use></svg>
      </summary>
      <div class="accordion-body">
        <ul class="nervous-guide-list">
          ${tNervous.guide.tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join('')}
        </ul>
        <div class="nervous-guide-disclaimer">${tNervous.guide.disclaimerBottom}</div>
      </div>
    </details>
  `;

  return `
    <div class="nervous-page">
      <div>
        <a href="#/lab/recovery" class="btn-back" aria-label="${tNervous.backToRecovery}">
          <svg class="btn-back-icon" aria-hidden="true"><use href="#icon-arrow-left"></use></svg>
          <span>${tNervous.backToRecovery}</span>
        </a>
      </div>

      <div class="nervous-hero">
        <div class="section-header" style="margin-bottom: 0;">
          <div>
            <h1>${tNervous.title}</h1>
            <p class="section-subtitle">${tNervous.subtitle}</p>
          </div>
        </div>

        <!-- Időszak és kizárási beállítás sáv -->
        <div class="nervous-controls-bar">
          <div class="nervous-period-wrap">
            <span class="text-muted text-small" style="font-weight: 600;">Időszak:</span>
            <div class="segmented-control" role="group" aria-label="Időszak választása">
              <button type="button" class="segmented-btn ${periodDays === 14 ? 'active' : ''}" data-nervous-period="14">${tNervous.periods[14]}</button>
              <button type="button" class="segmented-btn ${periodDays === 30 ? 'active' : ''}" data-nervous-period="30">${tNervous.periods[30]}</button>
              <button type="button" class="segmented-btn ${periodDays === 60 ? 'active' : ''}" data-nervous-period="60">${tNervous.periods[60]}</button>
            </div>
          </div>

          <div class="nervous-exclude-wrap">
            <label class="nervous-toggle-label">
              <input type="checkbox" id="nervous-exclude-toggle" ${isExcludeTagged ? 'checked' : ''} class="share-field-checkbox">
              <span>${tNervous.excludeToggleLabel}</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Személyes alapvonal kártya -->
      <section class="card nervous-baseline-card">
        <div class="section-header">
          <h2 class="section-title">
            <svg style="width: 18px; height: 18px; color: var(--accent);" aria-hidden="true"><use href="#icon-recovery"></use></svg>
            ${tNervous.baselineCard.title}
          </h2>
        </div>

        <div class="nervous-baseline-grid">
          <!-- HRV sor -->
          <div class="nervous-metric-box">
            <div class="nervous-metric-header">
              <span class="nervous-metric-title">${tNervous.baselineCard.hrvRow}</span>
              <span class="nervous-metric-status">${hrvStatusText}</span>
            </div>
            <div class="nervous-metric-body">
              <div class="nervous-stat-item">
                <span class="nervous-stat-lbl">${tNervous.baselineCard.bandLabel}</span>
                <span class="nervous-stat-val">${hrvBandText}</span>
              </div>
              <div class="nervous-stat-item">
                <span class="nervous-stat-lbl">${tNervous.baselineCard.avg7dLabel}</span>
                <span class="nervous-stat-val">${hrv7dText}</span>
              </div>
              <div style="display: flex; align-items: center; margin-top: 4px;">
                <span class="nervous-status-pill ${hrvPillClass}">${hrvPillText}</span>
              </div>
            </div>
          </div>

          <!-- Nyugalmi pulzus sor -->
          <div class="nervous-metric-box">
            <div class="nervous-metric-header">
              <span class="nervous-metric-title">${tNervous.baselineCard.rhrRow}</span>
              <span class="nervous-metric-status">${rhrStatusText}</span>
            </div>
            <div class="nervous-metric-body">
              <div class="nervous-stat-item">
                <span class="nervous-stat-lbl">${tNervous.baselineCard.bandLabel}</span>
                <span class="nervous-stat-val">${rhrBandText}</span>
              </div>
              <div class="nervous-stat-item">
                <span class="nervous-stat-lbl">${tNervous.baselineCard.avg7dLabel}</span>
                <span class="nervous-stat-val">${rhr7dText}</span>
              </div>
              <div style="display: flex; align-items: center; margin-top: 4px;">
                <span class="nervous-status-pill ${rhrPillClass}">${rhrPillText}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Jelzések kártya (ha van mit jelezni) -->
      ${signalCardHtml}

      <!-- Grafikon 1: HRV -->
      <section class="chart-card">
        <div class="chart-header">
          <h2 class="chart-title">
            <svg style="width: 18px; height: 18px; color: var(--accent);" aria-hidden="true"><use href="#icon-recovery"></use></svg>
            ${tNervous.charts.hrvTitle}
          </h2>
          <div class="chart-legend">
            <div class="chart-legend-item"><span class="chart-legend-dot" style="background: var(--surface); border: 2px solid var(--accent); width: 8px; height: 8px;"></span>${tNervous.charts.legendPoints}</div>
            <div class="chart-legend-item"><span class="chart-legend-dot" style="background: var(--accent); height: 3px; border-radius: 2px;"></span>${tNervous.charts.legend7d}</div>
            <div class="chart-legend-item"><span class="chart-legend-dot" style="background: rgba(76, 141, 255, 0.25); border: 1px dashed rgba(76, 141, 255, 0.6);"></span>${tNervous.charts.legendBand}</div>
          </div>
        </div>
        <div class="chart-svg-wrap">
          ${chart1Html}
        </div>
      </section>

      <!-- Grafikon 2: Nyugalmi pulzus -->
      <section class="chart-card">
        <div class="chart-header">
          <h2 class="chart-title">
            <svg style="width: 18px; height: 18px; color: var(--accent);" aria-hidden="true"><use href="#icon-recovery"></use></svg>
            ${tNervous.charts.rhrTitle}
          </h2>
          <div class="chart-legend">
            <div class="chart-legend-item"><span class="chart-legend-dot" style="background: var(--surface); border: 2px solid var(--accent); width: 8px; height: 8px;"></span>${tNervous.charts.legendPoints}</div>
            <div class="chart-legend-item"><span class="chart-legend-dot" style="background: var(--accent); height: 3px; border-radius: 2px;"></span>${tNervous.charts.legend7d}</div>
            <div class="chart-legend-item"><span class="chart-legend-dot" style="background: rgba(76, 141, 255, 0.25); border: 1px dashed rgba(76, 141, 255, 0.6);"></span>${tNervous.charts.legendBand}</div>
          </div>
        </div>
        <div class="chart-svg-wrap">
          ${chart2Html}
        </div>
      </section>

      <!-- Interaktív infósáv -->
      <div class="chart-info-box" id="nervous-chart-info">
        ${selectedDayInfo}
      </div>

      <!-- Mérési útmutató kártya -->
      ${guideHtml}

      <!-- Napi mérések lista -->
      <section class="card">
        <div class="section-header">
          <div>
            <h2 class="section-title">${tNervous.log.title}</h2>
            <p class="section-subtitle" style="margin-top: 2px; font-size: 0.85rem;">${tNervous.log.editPrompt}</p>
          </div>
          <button type="button" class="btn btn-secondary btn-sm" id="btn-nervous-log-new">+ Új check-in</button>
        </div>
        ${logListHtml}
      </section>
    </div>
  `;
}

/* ==========================================================================
   STEP 8: ADATTÖRLÉS ÉS HIDRATÁCIÓ MODALOK / MODALS & HELPERS
   ========================================================================== */

let currentDeleteModalEscHandler = null;

function closeDeleteAllDataModal() {
  state.isDeleteDataModalOpen = false;
  if (currentDeleteModalEscHandler) {
    window.removeEventListener('keydown', currentDeleteModalEscHandler);
    currentDeleteModalEscHandler = null;
  }
  const modalRoot = document.getElementById('activity-modal-root');
  if (modalRoot) modalRoot.innerHTML = '';
}

function openDeleteAllDataModal() {
  state.isDeleteDataModalOpen = true;
  const modalRoot = document.getElementById('activity-modal-root');
  if (!modalRoot) return;

  const tDel = T.more.deleteData;

  modalRoot.innerHTML = `
    <div class="modal-backdrop" id="delete-data-backdrop">
      <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-delete-data-title" style="max-width: 480px;">
        <div class="modal-header">
          <h2 class="modal-title" id="modal-delete-data-title" style="color: var(--bad);">${escapeHtml(tDel.modalTitle)}</h2>
          <button type="button" class="btn-modal-close" id="btn-close-delete-modal" aria-label="Ablak bezárása">
            <svg aria-hidden="true"><use href="#icon-close"></use></svg>
          </button>
        </div>

        <div class="modal-body" style="padding: 16px 20px; display: flex; flex-direction: column; gap: 14px;">
          <p style="font-size: 0.9375rem; line-height: 1.5; color: var(--text);">
            ${escapeHtml(tDel.modalWarning)}
          </p>

          <ul style="margin: 0; padding-left: 20px; font-size: 0.875rem; color: var(--text-muted); line-height: 1.6;">
            ${tDel.collectionsList.map((c) => `<li>${escapeHtml(c)}</li>`).join('')}
          </ul>

          <div style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: var(--radius-md); padding: 12px 14px; font-size: 0.8125rem; color: var(--text);">
            <strong>Figyelem:</strong> A fiókod és az alapbeállításaid (név, mód, nyelv, alvásigény, téma) megmaradnak, de a fenti adatok visszavonhatatlanul törlődnek.
          </div>

          <div class="form-group" style="margin-top: 4px;">
            <label for="input-confirm-delete" class="form-label" style="font-weight: 600;">
              ${escapeHtml(tDel.confirmInstruction)}
            </label>
            <input
              type="text"
              id="input-confirm-delete"
              class="form-input"
              placeholder="${escapeHtml(tDel.confirmPlaceholder)}"
              autocomplete="off"
              autocapitalize="characters"
              style="text-transform: uppercase; font-weight: 700; letter-spacing: 1px;"
            >
          </div>

          <div id="delete-data-status" style="display: none; padding: 10px; border-radius: var(--radius-md); font-size: 0.875rem; text-align: center;"></div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="btn-cancel-delete-data">${escapeHtml(tDel.cancelBtn)}</button>
          <button type="button" class="btn btn-danger" id="btn-confirm-delete-data" disabled>${escapeHtml(tDel.confirmBtn)}</button>
        </div>
      </div>
    </div>
  `;

  const btnClose = document.getElementById('btn-close-delete-modal');
  const btnCancel = document.getElementById('btn-cancel-delete-data');
  const backdrop = document.getElementById('delete-data-backdrop');
  const inputConfirm = document.getElementById('input-confirm-delete');
  const btnConfirm = document.getElementById('btn-confirm-delete-data');
  const statusEl = document.getElementById('delete-data-status');

  if (btnClose) btnClose.addEventListener('click', closeDeleteAllDataModal);
  if (btnCancel) btnCancel.addEventListener('click', closeDeleteAllDataModal);
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeDeleteAllDataModal();
    });
  }

  currentDeleteModalEscHandler = (e) => {
    if (e.key === 'Escape') closeDeleteAllDataModal();
  };
  window.addEventListener('keydown', currentDeleteModalEscHandler);

  if (inputConfirm && btnConfirm) {
    inputConfirm.addEventListener('input', () => {
      const isMatch = inputConfirm.value.trim() === 'TÖRLÉS';
      btnConfirm.disabled = !isMatch;
    });
  }

  if (btnConfirm) {
    btnConfirm.addEventListener('click', async () => {
      if (inputConfirm?.value.trim() !== 'TÖRLÉS') return;

      btnConfirm.disabled = true;
      if (btnCancel) btnCancel.disabled = true;
      if (inputConfirm) inputConfirm.disabled = true;

      if (statusEl) {
        statusEl.style.display = 'block';
        statusEl.style.background = 'var(--surface-2)';
        statusEl.style.color = 'var(--text-muted)';
        statusEl.textContent = tDel.deleting.replace('{n}', 0);
      }

      try {
        await deleteAllUserData((deletedSoFar) => {
          if (statusEl) {
            statusEl.textContent = tDel.deleting.replace('{n}', deletedSoFar);
          }
        });

        closeDeleteAllDataModal();
        alert('Minden rögzített adat sikeresen törölve.');
        render();
      } catch (err) {
        console.error('Delete all user data error:', err);
        if (statusEl) {
          statusEl.style.display = 'block';
          statusEl.style.background = 'rgba(239, 68, 68, 0.15)';
          statusEl.style.color = 'var(--bad)';
          statusEl.textContent = tDel.errorMsg.replace('{error}', err.message || 'Ismeretlen hiba');
        }
        btnConfirm.disabled = false;
        if (btnCancel) btnCancel.disabled = false;
        if (inputConfirm) inputConfirm.disabled = false;
      }
    });
  }
}

let currentAddHydrationEscHandler = null;

function closeAddHydrationModal() {
  state.isAddHydrationModalOpen = false;
  if (currentAddHydrationEscHandler) {
    window.removeEventListener('keydown', currentAddHydrationEscHandler);
    currentAddHydrationEscHandler = null;
  }
  const modalRoot = document.getElementById('activity-modal-root');
  if (modalRoot) modalRoot.innerHTML = '';
}

function openAddHydrationModal(drinkKey) {
  state.isAddHydrationModalOpen = true;
  const modalRoot = document.getElementById('activity-modal-root');
  if (!modalRoot) return;

  const drink = DRINKS[drinkKey] || { class: 'standard', factor: 1.0, caffeinePer100ml: 0, defaultMl: 250 };
  const drinkName = T.hydration.drinks[drinkKey] || drinkKey;
  const tAdd = T.hydration.addModal;
  const currentMl = drink.defaultMl || 250;

  const now = new Date();
  const defaultTime = formatTimeKey(now);

  modalRoot.innerHTML = `
    <div class="modal-backdrop" id="add-hydration-backdrop">
      <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-add-hydration-title" style="max-width: 440px;">
        <div class="modal-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="drink-cat-dot dot-${drink.class}"></span>
            <h2 class="modal-title" id="modal-add-hydration-title">${escapeHtml(drinkName)}</h2>
          </div>
          <button type="button" class="btn-modal-close" id="btn-close-add-hydration" aria-label="Ablak bezárása">
            <svg aria-hidden="true"><use href="#icon-close"></use></svg>
          </button>
        </div>

        <form id="form-add-hydration" class="modal-form-wrap" novalidate>
          <div class="modal-body" style="padding: 16px 20px; display: flex; flex-direction: column; gap: 14px;">
            <!-- Gyors dl választó chipsor -->
            <div>
              <label class="form-label text-muted text-small" style="margin-bottom: 6px;">Gyors választás</label>
              <div class="quick-dl-row">
                <button type="button" class="btn-dl-chip" data-dl="100">1 dl (100 ml)</button>
                <button type="button" class="btn-dl-chip" data-dl="200">2 dl (200 ml)</button>
                <button type="button" class="btn-dl-chip" data-dl="300">3 dl (300 ml)</button>
                <button type="button" class="btn-dl-chip" data-dl="500">5 dl (500 ml)</button>
              </div>
            </div>

            <!-- Mennyiség (ml) input -->
            <div class="form-group">
              <label for="input-hydration-amount" class="form-label">${escapeHtml(tAdd.amountLabel)}</label>
              <input type="number" id="input-hydration-amount" class="form-input" min="20" max="3000" step="10" value="${currentMl}" required>
            </div>

            <!-- Időpont input -->
            <div class="form-group">
              <label for="input-hydration-time" class="form-label">${escapeHtml(tAdd.timeLabel)}</label>
              <input type="time" id="input-hydration-time" class="form-input" value="${defaultTime}" required>
            </div>

            <!-- Élő előnézet kártya -->
            <div style="background: var(--surface-2); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px 14px; display: flex; justify-content: space-between; align-items: center; font-size: 0.8125rem;">
              <div>
                <span class="text-muted">${escapeHtml(tAdd.effectivePreview)}</span>
                <strong id="preview-effective-ml" style="margin-left: 4px; color: var(--text);"></strong>
                <span class="text-muted" style="margin-left: 2px;">(${drink.factor}×)</span>
              </div>
              <div>
                <span class="text-muted">${escapeHtml(tAdd.caffeinePreview)}</span>
                <strong id="preview-caffeine-mg" style="margin-left: 4px; color: #F59E0B;"></strong>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="btn-cancel-add-hydration">${escapeHtml(tAdd.cancelBtn)}</button>
            <button type="submit" class="btn btn-primary" id="btn-save-add-hydration">${escapeHtml(tAdd.saveBtn)}</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const amountInput = document.getElementById('input-hydration-amount');
  const timeInput = document.getElementById('input-hydration-time');
  const previewEffective = document.getElementById('preview-effective-ml');
  const previewCaffeine = document.getElementById('preview-caffeine-mg');

  const updatePreview = () => {
    const ml = Number(amountInput?.value) || 0;
    const eff = Math.round(ml * drink.factor);
    const caff = Math.round((ml / 100) * (drink.caffeinePer100ml || 0));
    if (previewEffective) previewEffective.textContent = fmtMl(eff);
    if (previewCaffeine) previewCaffeine.textContent = `${caff} mg`;

    document.querySelectorAll('.btn-dl-chip').forEach((btn) => {
      if (Number(btn.getAttribute('data-dl')) === ml) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  };

  updatePreview();

  if (amountInput) {
    amountInput.addEventListener('input', updatePreview);
  }

  document.querySelectorAll('.btn-dl-chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      const dlMl = Number(btn.getAttribute('data-dl'));
      if (amountInput) {
        amountInput.value = dlMl;
        updatePreview();
      }
    });
  });

  const btnClose = document.getElementById('btn-close-add-hydration');
  const btnCancel = document.getElementById('btn-cancel-add-hydration');
  const backdrop = document.getElementById('add-hydration-backdrop');

  if (btnClose) btnClose.addEventListener('click', closeAddHydrationModal);
  if (btnCancel) btnCancel.addEventListener('click', closeAddHydrationModal);
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeAddHydrationModal();
    });
  }

  currentAddHydrationEscHandler = (e) => {
    if (e.key === 'Escape') closeAddHydrationModal();
  };
  window.addEventListener('keydown', currentAddHydrationEscHandler);

  const form = document.getElementById('form-add-hydration');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const numMl = Math.max(20, Math.min(3000, Number(amountInput?.value) || drink.defaultMl));
      const timeVal = timeInput?.value || formatTimeKey(new Date());
      const dateKey = state.hydrationSelectedDateKey || formatDateKey(new Date());

      await handleSaveHydrationEntry({
        drinkType: drinkKey,
        amountMl: numMl,
        timeVal,
        dateKey,
        hydrationFactor: drink.factor,
        caffeineMg: Math.round((numMl / 100) * (drink.caffeinePer100ml || 0)),
      });
      closeAddHydrationModal();
    });
  }
}

let currentEditHydrationEscHandler = null;

function closeEditHydrationModal() {
  state.isEditHydrationModalOpen = false;
  if (currentEditHydrationEscHandler) {
    window.removeEventListener('keydown', currentEditHydrationEscHandler);
    currentEditHydrationEscHandler = null;
  }
  const modalRoot = document.getElementById('activity-modal-root');
  if (modalRoot) modalRoot.innerHTML = '';
}

function openEditHydrationModal(entry) {
  if (!entry) return;
  state.isEditHydrationModalOpen = true;
  const modalRoot = document.getElementById('activity-modal-root');
  if (!modalRoot) return;

  const drink = DRINKS[entry.drinkType] || { class: 'standard', factor: 1.0, caffeinePer100ml: 0 };
  const drinkName = T.hydration.drinks[entry.drinkType] || entry.drinkType;
  const tEdit = T.hydration.editModal;
  const currentTimeVal = formatActivityTime(entry.loggedAt) || '12:00';

  modalRoot.innerHTML = `
    <div class="modal-backdrop" id="edit-hydration-backdrop">
      <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-edit-hydration-title" style="max-width: 440px;">
        <div class="modal-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="drink-cat-dot dot-${drink.class}"></span>
            <h2 class="modal-title" id="modal-edit-hydration-title">${escapeHtml(drinkName)}</h2>
          </div>
          <button type="button" class="btn-modal-close" id="btn-close-edit-hydration" aria-label="Ablak bezárása">
            <svg aria-hidden="true"><use href="#icon-close"></use></svg>
          </button>
        </div>

        <form id="form-edit-hydration" class="modal-form-wrap" novalidate>
          <div class="modal-body" style="padding: 16px 20px; display: flex; flex-direction: column; gap: 14px;">
            <div>
              <label class="form-label text-muted text-small" style="margin-bottom: 6px;">Gyors választás</label>
              <div class="quick-dl-row">
                <button type="button" class="btn-dl-chip" data-dl="100">1 dl (100 ml)</button>
                <button type="button" class="btn-dl-chip" data-dl="200">2 dl (200 ml)</button>
                <button type="button" class="btn-dl-chip" data-dl="300">3 dl (300 ml)</button>
                <button type="button" class="btn-dl-chip" data-dl="500">5 dl (500 ml)</button>
              </div>
            </div>

            <div class="form-group">
              <label for="input-edit-hydration-amount" class="form-label">${escapeHtml(T.hydration.addModal.amountLabel)}</label>
              <input type="number" id="input-edit-hydration-amount" class="form-input" min="20" max="3000" step="10" value="${entry.amountMl}" required>
            </div>

            <div class="form-group">
              <label for="input-edit-hydration-time" class="form-label">${escapeHtml(T.hydration.addModal.timeLabel)}</label>
              <input type="time" id="input-edit-hydration-time" class="form-input" value="${currentTimeVal}" required>
            </div>

            <div style="background: var(--surface-2); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px 14px; display: flex; justify-content: space-between; align-items: center; font-size: 0.8125rem;">
              <div>
                <span class="text-muted">${escapeHtml(T.hydration.addModal.effectivePreview)}</span>
                <strong id="preview-edit-effective-ml" style="margin-left: 4px; color: var(--text);"></strong>
                <span class="text-muted" style="margin-left: 2px;">(${drink.factor}×)</span>
              </div>
              <div>
                <span class="text-muted">${escapeHtml(T.hydration.addModal.caffeinePreview)}</span>
                <strong id="preview-edit-caffeine-mg" style="margin-left: 4px; color: #F59E0B;"></strong>
              </div>
            </div>
          </div>

          <div class="modal-footer" style="display: flex; justify-content: space-between;">
            <button type="button" class="btn btn-danger" id="btn-delete-hydration-entry">${escapeHtml(tEdit.deleteBtn)}</button>
            <div style="display: flex; gap: 8px;">
              <button type="button" class="btn btn-secondary" id="btn-cancel-edit-hydration">${escapeHtml(tEdit.cancelBtn)}</button>
              <button type="submit" class="btn btn-primary" id="btn-save-edit-hydration">${escapeHtml(tEdit.saveBtn)}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;

  const amountInput = document.getElementById('input-edit-hydration-amount');
  const timeInput = document.getElementById('input-edit-hydration-time');
  const previewEffective = document.getElementById('preview-edit-effective-ml');
  const previewCaffeine = document.getElementById('preview-edit-caffeine-mg');

  const updatePreview = () => {
    const ml = Number(amountInput?.value) || 0;
    const eff = Math.round(ml * drink.factor);
    const caff = Math.round((ml / 100) * (drink.caffeinePer100ml || 0));
    if (previewEffective) previewEffective.textContent = fmtMl(eff);
    if (previewCaffeine) previewCaffeine.textContent = `${caff} mg`;

    document.querySelectorAll('.btn-dl-chip').forEach((btn) => {
      if (Number(btn.getAttribute('data-dl')) === ml) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  };

  updatePreview();

  if (amountInput) amountInput.addEventListener('input', updatePreview);
  document.querySelectorAll('.btn-dl-chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      const dlMl = Number(btn.getAttribute('data-dl'));
      if (amountInput) {
        amountInput.value = dlMl;
        updatePreview();
      }
    });
  });

  const btnClose = document.getElementById('btn-close-edit-hydration');
  const btnCancel = document.getElementById('btn-cancel-edit-hydration');
  const btnDelete = document.getElementById('btn-delete-hydration-entry');
  const backdrop = document.getElementById('edit-hydration-backdrop');

  if (btnClose) btnClose.addEventListener('click', closeEditHydrationModal);
  if (btnCancel) btnCancel.addEventListener('click', closeEditHydrationModal);
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeEditHydrationModal();
    });
  }

  currentEditHydrationEscHandler = (e) => {
    if (e.key === 'Escape') closeEditHydrationModal();
  };
  window.addEventListener('keydown', currentEditHydrationEscHandler);

  if (btnDelete) {
    btnDelete.addEventListener('click', async () => {
      if (!confirm(tEdit.deleteConfirm)) return;
      if (!state.currentUser?.uid) return;
      try {
        const entryRef = doc(db, 'users', state.currentUser.uid, 'hydration', entry.id);
        await deleteDoc(entryRef);
        closeEditHydrationModal();
      } catch (err) {
        console.error('Error deleting hydration entry:', err);
        alert('Hiba történt a törlés során.');
      }
    });
  }

  const form = document.getElementById('form-edit-hydration');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const numMl = Math.max(20, Math.min(3000, Number(amountInput?.value) || entry.amountMl));
      const timeVal = timeInput?.value || currentTimeVal;
      await handleSaveHydrationEntry({
        drinkType: entry.drinkType,
        amountMl: numMl,
        timeVal,
        dateKey: entry.dateKey,
        hydrationFactor: drink.factor,
        caffeineMg: Math.round((numMl / 100) * (drink.caffeinePer100ml || 0)),
        entryId: entry.id,
      });
      closeEditHydrationModal();
    });
  }
}

let currentGoalModalEscHandler = null;

function closeHydrationGoalModal() {
  state.isHydrationGoalModalOpen = false;
  if (currentGoalModalEscHandler) {
    window.removeEventListener('keydown', currentGoalModalEscHandler);
    currentGoalModalEscHandler = null;
  }
  const modalRoot = document.getElementById('activity-modal-root');
  if (modalRoot) modalRoot.innerHTML = '';
}

function openHydrationGoalModal() {
  state.isHydrationGoalModalOpen = true;
  const modalRoot = document.getElementById('activity-modal-root');
  if (!modalRoot) return;

  const tGoal = T.hydration.goalModal;
  let currentGoal = getUserHydrationGoalMl() || 2500;

  modalRoot.innerHTML = `
    <div class="modal-backdrop" id="goal-hydration-backdrop">
      <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-goal-hydration-title" style="max-width: 440px;">
        <div class="modal-header">
          <h2 class="modal-title" id="modal-goal-hydration-title">${escapeHtml(tGoal.title)}</h2>
          <button type="button" class="btn-modal-close" id="btn-close-goal-hydration" aria-label="Ablak bezárása">
            <svg aria-hidden="true"><use href="#icon-close"></use></svg>
          </button>
        </div>

        <form id="form-goal-hydration" class="modal-form-wrap" novalidate>
          <div class="modal-body" style="text-align: center; padding: 20px 16px;">
            <p class="text-muted" style="font-size: 0.875rem; line-height: 1.5; margin-bottom: 16px;">
              ${escapeHtml(tGoal.desc)}
            </p>

            <div class="sleep-need-stepper">
              <button type="button" class="btn btn-secondary" id="btn-step-goal-minus" style="font-size: 1.25rem; width: 44px; height: 44px; padding: 0;">−</button>
              <div class="sleep-need-display-val" id="hydration-goal-preview">${fmtMl(currentGoal)}</div>
              <button type="button" class="btn btn-secondary" id="btn-step-goal-plus" style="font-size: 1.25rem; width: 44px; height: 44px; padding: 0;">+</button>
            </div>

            <div style="margin: 16px 0 8px 0;">
              <div class="slider-with-endpoints">
                <span class="slider-endpoint-label">500 ml</span>
                <input type="range" id="input-hydration-goal-slider" min="500" max="6000" step="50" value="${currentGoal}" style="flex: 1; accent-color: var(--accent); cursor: pointer;" aria-label="Napi hidratációs cél ml">
                <span class="slider-endpoint-label">6 000 ml</span>
              </div>
            </div>
          </div>

          <div class="modal-footer" style="display: flex; justify-content: space-between;">
            <button type="button" class="btn btn-secondary" id="btn-delete-hydration-goal" style="color: var(--bad);">${escapeHtml(tGoal.deleteGoalBtn)}</button>
            <div style="display: flex; gap: 8px;">
              <button type="button" class="btn btn-secondary" id="btn-cancel-goal-hydration">${escapeHtml(tGoal.cancelBtn)}</button>
              <button type="submit" class="btn btn-primary" id="btn-save-goal-hydration">${escapeHtml(tGoal.saveBtn)}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;

  const slider = document.getElementById('input-hydration-goal-slider');
  const preview = document.getElementById('hydration-goal-preview');
  const btnMinus = document.getElementById('btn-step-goal-minus');
  const btnPlus = document.getElementById('btn-step-goal-plus');

  const updatePreview = (val) => {
    currentGoal = Math.max(500, Math.min(6000, Math.round(val / 50) * 50));
    if (slider) slider.value = currentGoal;
    if (preview) preview.textContent = fmtMl(currentGoal);
  };

  if (slider) slider.addEventListener('input', (e) => updatePreview(Number(e.target.value)));
  if (btnMinus) btnMinus.addEventListener('click', () => updatePreview(currentGoal - 50));
  if (btnPlus) btnPlus.addEventListener('click', () => updatePreview(currentGoal + 50));

  const btnClose = document.getElementById('btn-close-goal-hydration');
  const btnCancel = document.getElementById('btn-cancel-goal-hydration');
  const btnDelete = document.getElementById('btn-delete-hydration-goal');
  const backdrop = document.getElementById('goal-hydration-backdrop');

  if (btnClose) btnClose.addEventListener('click', closeHydrationGoalModal);
  if (btnCancel) btnCancel.addEventListener('click', closeHydrationGoalModal);
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeHydrationGoalModal();
    });
  }

  currentGoalModalEscHandler = (e) => {
    if (e.key === 'Escape') closeHydrationGoalModal();
  };
  window.addEventListener('keydown', currentGoalModalEscHandler);

  if (btnDelete) {
    btnDelete.addEventListener('click', async () => {
      await setUserHydrationGoalMl(null);
      closeHydrationGoalModal();
    });
  }

  const form = document.getElementById('form-goal-hydration');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await setUserHydrationGoalMl(currentGoal);
      closeHydrationGoalModal();
    });
  }
}

async function handleSaveHydrationEntry({ drinkType, amountMl, timeVal, dateKey, hydrationFactor, caffeineMg, entryId = null }) {
  if (!state.currentUser?.uid) return;
  const uid = state.currentUser.uid;

  const [hh, mm] = (timeVal || '12:00').split(':').map(Number);
  const [y, m, d] = dateKey.split('-').map(Number);
  const loggedAtDate = new Date(y, m - 1, d, hh || 0, mm || 0);

  const entryData = {
    drinkType,
    amountMl: Number(amountMl),
    loggedAt: loggedAtDate,
    dateKey,
    hydrationFactor: Number(hydrationFactor),
    caffeineMg: Number(caffeineMg),
    updatedAt: serverTimestamp(),
  };

  try {
    if (entryId) {
      const entryRef = doc(db, 'users', uid, 'hydration', entryId);
      await updateDoc(entryRef, entryData);
    } else {
      entryData.createdAt = serverTimestamp();
      const colRef = collection(db, 'users', uid, 'hydration');
      await addDoc(colRef, entryData);
    }

    state.lastLoggedDrink = { drinkType, amountMl: Number(amountMl) };
    try {
      localStorage.setItem('lockin_last_drink', JSON.stringify(state.lastLoggedDrink));
    } catch (e) {}
  } catch (err) {
    console.error('Error saving hydration entry:', err);
    alert('Hiba történt a hidratáció mentése során.');
  }
}

async function handleRepeatLastDrink() {
  if (!state.lastLoggedDrink || !state.currentUser?.uid) return;
  const { drinkType, amountMl } = state.lastLoggedDrink;
  const drink = DRINKS[drinkType] || { factor: 1.0, caffeinePer100ml: 0 };
  const now = new Date();
  const dateKey = state.hydrationSelectedDateKey || formatDateKey(now);
  const timeVal = formatTimeKey(now);

  await handleSaveHydrationEntry({
    drinkType,
    amountMl,
    timeVal,
    dateKey,
    hydrationFactor: drink.factor,
    caffeineMg: Math.round((amountMl / 100) * (drink.caffeinePer100ml || 0)),
  });
}

function formatHydrationDateLabel(dateKey) {
  const todayKey = formatDateKey(new Date());
  if (dateKey === todayKey) return T.hydration.todayLabel;

  try {
    const [y, m, d] = dateKey.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    const weekdaysShort = ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'];
    const monthsShort = ['jan.', 'febr.', 'márc.', 'ápr.', 'máj.', 'jún.', 'júl.', 'aug.', 'szept.', 'okt.', 'nov.', 'dec.'];
    return `${y}. ${monthsShort[m - 1]} ${d}. (${weekdaysShort[date.getDay()]})`;
  } catch (e) {
    return dateKey;
  }
}

function renderHydrationChart(entries, selectedDateKey, goalMl) {
  const targetDate = new Date(selectedDateKey + 'T00:00:00');
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(targetDate.getTime() - i * 86400000);
    const dKey = formatDateKey(d);
    const dayEntries = (entries || []).filter((e) => e.dateKey === dKey);
    const stats = calcHydrationStats(dayEntries, goalMl);
    days.push({
      date: d,
      dateKey: dKey,
      entries: dayEntries,
      stats,
    });
  }

  const daysWithData = days.filter((d) => d.stats.rawTotal > 0);
  if (daysWithData.length < 2) {
    return `
      <section class="chart-card">
        <div class="chart-header">
          <h2 class="chart-title">
            <svg style="width: 18px; height: 18px; color: var(--accent);" aria-hidden="true"><use href="#icon-nutrition"></use></svg>
            ${escapeHtml(T.hydration.chart.title)}
          </h2>
        </div>
        <div class="chart-empty-state"><p>${escapeHtml(T.hydration.chart.emptyState)}</p></div>
      </section>
    `;
  }

  const maxDataMl = Math.max(...days.map((d) => d.stats.rawTotal));
  const maxTarget = Math.max(2500, goalMl || 0, maxDataMl);
  const step = maxTarget > 4000 ? 1000 : 500;
  const maxVal = Math.ceil((maxTarget * 1.15) / step) * step;

  const plotW = 530;
  const plotH = 150;
  const xLeft = 45;
  const yTop = 20;
  const yBottom = yTop + plotH;

  const gridLines = [];
  for (let v = step; v <= maxVal; v += step) {
    const y = yBottom - (v / maxVal) * plotH;
    const lText = v >= 1000 ? `${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)} L` : `${v} ml`;
    gridLines.push(`
      <line x1="${xLeft}" x2="${xLeft + plotW}" y1="${y}" y2="${y}" stroke="var(--border-subtle)" stroke-width="1"></line>
      <text x="${xLeft - 6}" y="${y + 3}" font-size="10" fill="var(--text-muted)" text-anchor="end">${lText}</text>
    `);
  }

  let goalLineHtml = '';
  if (goalMl && goalMl > 0 && goalMl <= maxVal) {
    const yGoal = yBottom - (goalMl / maxVal) * plotH;
    goalLineHtml = `
      <line x1="${xLeft}" x2="${xLeft + plotW}" y1="${yGoal}" y2="${yGoal}" stroke="var(--accent)" stroke-dasharray="4,4" stroke-width="1.5"></line>
      <text x="${xLeft + plotW}" y="${yGoal - 4}" font-size="10" fill="var(--accent)" font-weight="600" text-anchor="end">${T.hydration.chart.goalLine.replace('{goal}', fmtMl(goalMl))}</text>
    `;
  }

  const colStep = plotW / 7;
  const barW = 28;
  const weekdaysShort = ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'];

  const bars = days.map((d, idx) => {
    const xC = xLeft + (idx + 0.5) * colStep;
    const xL = xC - barW / 2;
    const isSelected = d.dateKey === selectedDateKey;
    const rawMl = d.stats.rawTotal;

    let barContent = '';
    if (rawMl > 0) {
      const barH = Math.max(3, (rawMl / maxVal) * plotH);
      const yBar = yBottom - barH;
      barContent = `
        <rect x="${xL}" y="${yBar}" width="${barW}" height="${barH}" rx="4" fill="var(--accent)"></rect>
      `;
    } else {
      barContent = `
        <line x1="${xL}" x2="${xL + barW}" y1="${yBottom}" y2="${yBottom}" stroke="var(--border)" stroke-width="2"></line>
      `;
    }

    const selectHighlight = isSelected ? `
      <rect x="${xC - colStep / 2 + 2}" y="${yTop}" width="${colStep - 4}" height="${plotH}" fill="rgba(76, 141, 255, 0.08)" stroke="var(--accent)" stroke-width="1.5" rx="4"></rect>
    ` : '';

    const dateLabel = `${weekdaysShort[d.date.getDay()]} ${d.date.getDate()}`;

    return `
      <g class="chart-bar-clickable" data-hydration-chart-date="${d.dateKey}" tabindex="0" role="button" aria-label="${d.dateKey}: ${fmtMl(rawMl)}">
        ${selectHighlight}
        ${barContent}
        <text x="${xC}" y="${yBottom + 16}" font-size="10" font-weight="${isSelected ? '700' : '500'}" fill="${isSelected ? 'var(--accent)' : 'var(--text-muted)'}" text-anchor="middle">${dateLabel}</text>
      </g>
    `;
  }).join('');

  const selDay = days.find((d) => d.dateKey === selectedDateKey);
  const selInfoHtml = selDay ? `
    <div style="font-size: 0.8125rem; color: var(--text-muted); text-align: center; margin-top: 10px;">
      Kiválasztva: <strong style="color: var(--text);">${formatHydrationDateLabel(selectedDateKey)}</strong> • Nyers: <strong style="color: var(--text);">${fmtMl(selDay.stats.rawTotal)}</strong> • Hatékony: <strong style="color: var(--text);">${fmtMl(selDay.stats.effectiveTotal)}</strong> • Koffein: <strong style="color: #F59E0B;">${selDay.stats.caffeineTotal} mg</strong>
    </div>
  ` : '';

  return `
    <section class="chart-card">
      <div class="chart-header">
        <h2 class="chart-title">
          <svg style="width: 18px; height: 18px; color: var(--accent);" aria-hidden="true"><use href="#icon-nutrition"></use></svg>
          ${escapeHtml(T.hydration.chart.title)}
        </h2>
        <div class="chart-legend">
          <div class="chart-legend-item"><span class="chart-legend-dot" style="background: var(--accent);"></span>${escapeHtml(T.hydration.chart.rawAmount)}</div>
        </div>
      </div>
      <div class="chart-svg-wrap">
        <svg viewBox="0 0 600 200" class="chart-svg" aria-label="${escapeHtml(T.hydration.chart.title)}">
          ${gridLines.join('')}
          ${goalLineHtml}
          ${bars}
        </svg>
      </div>
      <p class="chart-hint">${escapeHtml(T.hydration.chart.clickInfo)}</p>
      ${selInfoHtml}
    </section>
  `;
}

function renderHydrationPage() {
  const tHyd = T.hydration;
  const currentDateKey = state.hydrationSelectedDateKey || formatDateKey(new Date());
  const todayKey = formatDateKey(new Date());
  const minDateKey = formatDateKey(new Date(Date.now() - 14 * 86400000));

  const isAtToday = currentDateKey >= todayKey;
  const isAtMinDate = currentDateKey <= minDateKey;

  const dayEntries = (state.hydrationEntries || []).filter((e) => e.dateKey === currentDateKey);
  const userGoal = getUserHydrationGoalMl();
  const stats = calcHydrationStats(dayEntries, userGoal);

  // Dátumválasztó sáv
  const dateBarHtml = `
    <div class="hydration-date-bar">
      <button type="button" class="hydration-date-btn" id="btn-hydration-prev-day" ${isAtMinDate ? 'disabled' : ''} aria-label="Előző nap">
        <svg style="width: 18px; height: 18px;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <div class="hydration-date-label">${formatHydrationDateLabel(currentDateKey)}</div>
      <button type="button" class="hydration-date-btn" id="btn-hydration-next-day" ${isAtToday ? 'disabled' : ''} aria-label="Következő nap">
        <svg style="width: 18px; height: 18px;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>
  `;

  // Összesítő kártya és napi cél
  const goalSectionHtml = userGoal && userGoal > 0 ? `
    <div class="hydration-goal-container">
      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8125rem;">
        <span><strong>${tHyd.summary.goalLabel}:</strong> ${fmtMl(stats.rawTotal)} / ${fmtMl(userGoal)} (${stats.progressPercent}%)</span>
        <button type="button" class="btn btn-secondary btn-sm" id="btn-edit-hydration-goal">${tHyd.summary.editGoal}</button>
      </div>
      <div class="hydration-progress-track">
        <div class="hydration-progress-fill" style="width: ${stats.progressPercent}%;"></div>
      </div>
    </div>
  ` : `
    <div class="hydration-goal-container" style="text-align: center;">
      <button type="button" class="btn btn-secondary btn-sm" id="btn-set-hydration-goal">${tHyd.summary.noGoalSet}</button>
    </div>
  `;

  const summaryCardHtml = `
    <section class="card hydration-summary-card">
      <div class="hydration-stats-grid">
        <div class="hydration-stat-item">
          <span class="hydration-stat-label">${tHyd.summary.rawLabel}</span>
          <span class="hydration-stat-value">${fmtMl(stats.rawTotal)}</span>
        </div>
        <div class="hydration-stat-item">
          <span class="hydration-stat-label">${tHyd.summary.effectiveLabel}</span>
          <span class="hydration-stat-value">${fmtMl(stats.effectiveTotal)}</span>
          <span class="hydration-stat-sub">${tHyd.summary.effectiveSub}</span>
        </div>
        <div class="hydration-stat-item">
          <span class="hydration-stat-label">${tHyd.summary.caffeineLabel}</span>
          <span class="hydration-stat-value" style="color: #F59E0B;">${stats.caffeineTotal} mg</span>
        </div>
        <div class="hydration-stat-item">
          <span class="hydration-stat-label">${tHyd.summary.lastCaffeineLabel}</span>
          <span class="hydration-stat-value">${stats.lastCaffeineTime}</span>
        </div>
      </div>
      ${goalSectionHtml}
    </section>
  `;

  // Gyors hozzáadás és 15 italcsempe
  const repeatBtnHtml = state.lastLoggedDrink ? `
    <button type="button" class="btn btn-secondary btn-sm" id="btn-repeat-hydration">
      ${tHyd.quickAdd.repeatBtn
        .replace('{drink}', T.hydration.drinks[state.lastLoggedDrink.drinkType] || state.lastLoggedDrink.drinkType)
        .replace('{amount}', state.lastLoggedDrink.amountMl)}
    </button>
  ` : '';

  const drinkTilesHtml = Object.entries(DRINKS).map(([drinkKey, drink]) => {
    return `
      <button type="button" class="drink-tile" data-drink-id="${drinkKey}">
        <div class="drink-tile-header">
          <span class="drink-cat-dot dot-${drink.class}"></span>
          <span class="drink-tile-name">${T.hydration.drinks[drinkKey] || drinkKey}</span>
        </div>
        <span class="drink-tile-meta">${drink.factor}× • ${drink.defaultMl} ml</span>
      </button>
    `;
  }).join('');

  const quickAddHtml = `
    <section class="card">
      <div class="drink-tiles-header">
        <h2 class="section-title">
          <svg style="width: 18px; height: 18px; color: var(--accent);" aria-hidden="true"><use href="#icon-nutrition"></use></svg>
          ${tHyd.quickAdd.title}
        </h2>
        ${repeatBtnHtml}
      </div>
      <div class="drink-tiles-grid">
        ${drinkTilesHtml}
      </div>
    </section>
  `;

  // Napi lista
  const logListHtml = dayEntries.length === 0 ? `
    <p class="text-muted" style="text-align: center; padding: 20px 0;">${tHyd.log.empty}</p>
  ` : `
    <div class="hydration-log-list">
      ${stats.sortedEntries.map((entry) => {
        const drink = DRINKS[entry.drinkType] || { class: 'standard', factor: 1.0 };
        const caffeineBadge = entry.caffeineMg > 0 ? `
          <span class="badge" style="background: rgba(245, 158, 11, 0.15); color: #F59E0B; font-size: 0.6875rem; padding: 1px 6px;">
            ${tHyd.log.caffeineBadge.replace('{n}', entry.caffeineMg)}
          </span>
        ` : '';

        return `
          <div class="hydration-log-item" data-hydration-id="${entry.id}" tabindex="0" role="button">
            <div class="hydration-log-left">
              <span class="hydration-log-time">${formatActivityTime(entry.loggedAt)}</span>
              <div>
                <div class="hydration-log-name">${T.hydration.drinks[entry.drinkType] || entry.drinkType}</div>
                <div class="hydration-log-sub">
                  <span class="drink-cat-dot dot-${drink.class}"></span>
                  <span>${entry.hydrationFactor || drink.factor}×</span>
                  ${caffeineBadge}
                </div>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="hydration-log-amount">${fmtMl(entry.amountMl)}</span>
              <svg style="width: 16px; height: 16px; color: var(--text-muted);" aria-hidden="true"><use href="#icon-chevron-right"></use></svg>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  const dailyLogHtml = `
    <section class="card">
      <div class="section-header">
        <h2 class="section-title">
          <svg style="width: 18px; height: 18px; color: var(--accent);" aria-hidden="true"><use href="#icon-journal"></use></svg>
          ${tHyd.log.title}
        </h2>
      </div>
      ${logListHtml}
    </section>
  `;

  // Heti grafikon
  const chartHtml = renderHydrationChart(state.hydrationEntries, currentDateKey, userGoal);

  // Összecsukható orvosi & tudományos kártya
  const infoHtml = `
    <details class="card accordion-card hydration-info-details">
      <summary class="accordion-summary hydration-info-summary">
        <div style="display: flex; align-items: center; gap: 8px;">
          <svg style="width: 18px; height: 18px; color: var(--accent);" aria-hidden="true"><use href="#icon-info"></use></svg>
          <span>${tHyd.info.title}</span>
        </div>
        <svg style="width: 16px; height: 16px; color: var(--text-muted);" aria-hidden="true"><use href="#icon-chevron-right"></use></svg>
      </summary>
      <div class="accordion-body hydration-info-content">
        <div style="margin-bottom: 12px;">
          <strong style="color: var(--text);">${tHyd.info.bhiTitle}</strong>
          <p style="margin-top: 4px;">${tHyd.info.bhiText}</p>
        </div>
        <div style="margin-bottom: 12px;">
          <strong style="color: var(--text);">${tHyd.info.caffeineTitle}</strong>
          <p style="margin-top: 4px;">${tHyd.info.caffeineText}</p>
        </div>
        <div style="font-size: 0.8125rem; opacity: 0.8; font-style: italic; border-top: 1px solid var(--border-subtle); padding-top: 8px;">
          ${tHyd.info.disclaimer}
        </div>
      </div>
    </details>
  `;

  return `
    <div class="hydration-page">
      <div>
        <a href="#/lab/nutrition" class="btn-back" aria-label="${escapeHtml(tHyd.backToNutrition)}">
          <svg class="btn-back-icon" aria-hidden="true"><use href="#icon-arrow-left"></use></svg>
          <span>${escapeHtml(tHyd.backToNutrition)}</span>
        </a>
      </div>

      <div class="section-header" style="margin-bottom: 0;">
        <div>
          <h1>${escapeHtml(tHyd.title)}</h1>
          <p class="section-subtitle">${escapeHtml(tHyd.subtitle)}</p>
        </div>
      </div>

      ${dateBarHtml}
      ${summaryCardHtml}
      ${quickAddHtml}
      ${dailyLogHtml}
      ${chartHtml}
      ${infoHtml}
    </div>
  `;
}


/* ==========================================================================
   11B. ÉTELTÁR ÉS ÉTKEZÉSI TERV MODALOK ÉS KEZELŐK / FOODS & MEALS HANDLERS
   ========================================================================== */

let currentFoodModalEscHandler = null;

export function closeFoodModal() {
  state.isFoodModalOpen = false;
  state.editingFood = null;
  if (currentFoodModalEscHandler) {
    window.removeEventListener('keydown', currentFoodModalEscHandler);
    currentFoodModalEscHandler = null;
  }
  const modalRoot = document.getElementById('activity-modal-root');
  if (modalRoot) modalRoot.innerHTML = '';
}

export function openFoodModal(food = null) {
  state.isFoodModalOpen = true;
  state.editingFood = food;
  const modalRoot = document.getElementById('activity-modal-root');
  if (!modalRoot) return;

  const tF = T.foods.modal;
  const isEdit = Boolean(food && food.id);
  const title = isEdit ? tF.titleEdit : tF.titleNew;

  const initialAllergens = new Set(Array.isArray(food?.allergens) ? food.allergens : []);
  const initialPer = food?.per === '100g' ? '100g' : 'serving';
  const initialFav = Boolean(food?.favorite);

  modalRoot.innerHTML = `
    <div class="modal-backdrop" id="food-modal-backdrop">
      <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-food-title" style="max-width: 520px;">
        <div class="modal-header">
          <h2 class="modal-title" id="modal-food-title">${escapeHtml(title)}</h2>
          <button type="button" class="btn-modal-close" id="btn-close-food-modal" aria-label="Ablak bezárása">
            <svg aria-hidden="true"><use href="#icon-close"></use></svg>
          </button>
        </div>

        <form id="form-food-editor" class="modal-form-wrap" novalidate>
          <div class="modal-body" style="padding: 16px 20px; display: flex; flex-direction: column; gap: 14px;">
            <!-- Név -->
            <div class="form-group" style="margin-bottom: 0;">
              <label for="food-input-name" class="form-label">${escapeHtml(tF.nameLabel)} *</label>
              <input type="text" id="food-input-name" class="form-input" maxlength="80" required placeholder="${escapeHtml(tF.namePlaceholder)}" value="${escapeHtml(food?.name || '')}">
              <div class="form-error-msg" id="food-name-error" style="display: none; color: var(--bad); font-size: 0.75rem; margin-top: 4px;">${escapeHtml(tF.errorNameRequired)}</div>
            </div>

            <!-- Adagolás alapja -->
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">${escapeHtml(tF.perLabel)}</label>
              <div class="segmented-control" role="group" aria-label="${escapeHtml(tF.perLabel)}" style="display: flex; width: 100%;">
                <button type="button" class="segmented-btn ${initialPer === 'serving' ? 'active' : ''}" id="btn-per-serving" style="flex: 1;">${escapeHtml(tF.perServing)}</button>
                <button type="button" class="segmented-btn ${initialPer === '100g' ? 'active' : ''}" id="btn-per-100g" style="flex: 1;">${escapeHtml(tF.per100g)}</button>
              </div>
            </div>

            <!-- Makrók és kalória rács -->
            <div style="background: var(--surface-2); padding: 12px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); display: flex; flex-direction: column; gap: 10px;">
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
                <div class="form-group" style="margin-bottom: 0;">
                  <label for="food-input-carbs" class="form-label" style="font-size: 0.75rem;">${escapeHtml(tF.carbsLabel)}</label>
                  <input type="number" id="food-input-carbs" class="form-input" min="0" max="1000" step="0.1" placeholder="0" value="${food?.carbsG ?? ''}">
                </div>
                <div class="form-group" style="margin-bottom: 0;">
                  <label for="food-input-protein" class="form-label" style="font-size: 0.75rem;">${escapeHtml(tF.proteinLabel)}</label>
                  <input type="number" id="food-input-protein" class="form-input" min="0" max="1000" step="0.1" placeholder="0" value="${food?.proteinG ?? ''}">
                </div>
                <div class="form-group" style="margin-bottom: 0;">
                  <label for="food-input-fat" class="form-label" style="font-size: 0.75rem;">${escapeHtml(tF.fatLabel)}</label>
                  <input type="number" id="food-input-fat" class="form-input" min="0" max="1000" step="0.1" placeholder="0" value="${food?.fatG ?? ''}">
                </div>
              </div>

              <div style="display: flex; align-items: flex-end; gap: 10px; margin-top: 2px;">
                <div class="form-group" style="margin-bottom: 0; flex: 1;">
                  <label for="food-input-kcal" class="form-label" style="font-size: 0.75rem;">${escapeHtml(tF.kcalLabel)}</label>
                  <input type="number" id="food-input-kcal" class="form-input" min="0" max="5000" step="1" placeholder="0" value="${food?.kcal ?? ''}">
                </div>
                <button type="button" class="btn btn-secondary" id="btn-calc-food-kcal" style="font-size: 0.75rem; white-space: nowrap; height: 38px;">
                  ${escapeHtml(tF.calcKcalBtn)}
                </button>
              </div>
            </div>

            <!-- Összetevők -->
            <div class="form-group" style="margin-bottom: 0;">
              <label for="food-input-ingredients" class="form-label">${escapeHtml(tF.ingredientsLabel)}</label>
              <textarea id="food-input-ingredients" class="form-input" rows="2" maxlength="1000" placeholder="${escapeHtml(tF.ingredientsPlaceholder)}" style="resize: vertical;">${escapeHtml(food?.ingredients || '')}</textarea>
            </div>

            <!-- Elkészítés -->
            <div class="form-group" style="margin-bottom: 0;">
              <label for="food-input-method" class="form-label">${escapeHtml(tF.methodLabel)}</label>
              <textarea id="food-input-method" class="form-input" rows="2" maxlength="3000" placeholder="${escapeHtml(tF.methodPlaceholder)}" style="resize: vertical;">${escapeHtml(food?.method || '')}</textarea>
            </div>

            <!-- Allergének -->
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">${escapeHtml(tF.allergensLabel)}</label>
              <div class="food-allergens-chips" style="display: flex; flex-wrap: wrap; gap: 6px;">
                ${FOOD_ALLERGENS.map((al) => {
                  const isActive = initialAllergens.has(al.id);
                  return `
                    <button type="button" class="allergen-chip ${isActive ? 'active' : ''}" data-allergen-id="${al.id}">
                      ${escapeHtml(al.label)}
                    </button>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Kedvenc -->
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 2px;">
              <input type="checkbox" id="food-input-favorite" ${initialFav ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--accent); cursor: pointer;">
              <label for="food-input-favorite" style="font-size: 0.875rem; cursor: pointer; user-select: none;">${escapeHtml(tF.favLabel)}</label>
            </div>
          </div>

          <div class="modal-footer" style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              ${isEdit ? `
                <button type="button" class="btn btn-secondary" id="btn-delete-food" style="color: var(--bad);">
                  ${escapeHtml(tF.deleteBtn)}
                </button>
              ` : '<span></span>'}
            </div>
            <div style="display: flex; gap: 8px;">
              <button type="button" class="btn btn-secondary" id="btn-cancel-food-modal">${escapeHtml(tF.cancelBtn)}</button>
              <button type="submit" class="btn btn-primary" id="btn-save-food-modal">${escapeHtml(tF.saveBtn)}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;

  let currentPer = initialPer;
  const selectedAllergens = new Set(initialAllergens);

  const btnPerServing = document.getElementById('btn-per-serving');
  const btnPer100g = document.getElementById('btn-per-100g');
  if (btnPerServing && btnPer100g) {
    btnPerServing.addEventListener('click', () => {
      currentPer = 'serving';
      btnPerServing.classList.add('active');
      btnPer100g.classList.remove('active');
    });
    btnPer100g.addEventListener('click', () => {
      currentPer = '100g';
      btnPer100g.classList.add('active');
      btnPerServing.classList.remove('active');
    });
  }

  const allergenChips = modalRoot.querySelectorAll('.allergen-chip[data-allergen-id]');
  allergenChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const aId = chip.getAttribute('data-allergen-id');
      if (selectedAllergens.has(aId)) {
        selectedAllergens.delete(aId);
        chip.classList.remove('active');
      } else {
        selectedAllergens.add(aId);
        chip.classList.add('active');
      }
    });
  });

  const btnCalcKcal = document.getElementById('btn-calc-food-kcal');
  const inputCarbs = document.getElementById('food-input-carbs');
  const inputProtein = document.getElementById('food-input-protein');
  const inputFat = document.getElementById('food-input-fat');
  const inputKcal = document.getElementById('food-input-kcal');

  if (btnCalcKcal) {
    btnCalcKcal.addEventListener('click', () => {
      const c = parseFloat(inputCarbs?.value || 0);
      const p = parseFloat(inputProtein?.value || 0);
      const f = parseFloat(inputFat?.value || 0);
      const calculated = calculateKcalFromMacros(c, p, f);
      if (inputKcal) inputKcal.value = calculated;
    });
  }

  const btnClose = document.getElementById('btn-close-food-modal');
  const btnCancel = document.getElementById('btn-cancel-food-modal');
  const backdrop = document.getElementById('food-modal-backdrop');

  if (btnClose) btnClose.addEventListener('click', closeFoodModal);
  if (btnCancel) btnCancel.addEventListener('click', closeFoodModal);
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeFoodModal();
    });
  }

  currentFoodModalEscHandler = (e) => {
    if (e.key === 'Escape') closeFoodModal();
  };
  window.addEventListener('keydown', currentFoodModalEscHandler);

  const btnDelete = document.getElementById('btn-delete-food');
  if (btnDelete && isEdit) {
    btnDelete.addEventListener('click', async () => {
      if (confirm(tF.deleteConfirm)) {
        await handleDeleteFood(food.id);
        closeFoodModal();
      }
    });
  }

  const form = document.getElementById('form-food-editor');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const inputName = document.getElementById('food-input-name');
      const nameVal = inputName?.value.trim() || '';
      const nameErr = document.getElementById('food-name-error');

      if (!nameVal || nameVal.length > 80) {
        if (nameErr) nameErr.style.display = 'block';
        if (inputName) inputName.focus();
        return;
      }
      if (nameErr) nameErr.style.display = 'none';

      const carbsG = Math.max(0, Math.min(1000, Math.round(parseFloat(inputCarbs?.value || 0) * 10) / 10));
      const proteinG = Math.max(0, Math.min(1000, Math.round(parseFloat(inputProtein?.value || 0) * 10) / 10));
      const fatG = Math.max(0, Math.min(1000, Math.round(parseFloat(inputFat?.value || 0) * 10) / 10));
      let kcal = Math.max(0, Math.min(5000, Math.round(parseFloat(inputKcal?.value || 0))));
      if (isNaN(kcal) || kcal === 0) {
        kcal = calculateKcalFromMacros(carbsG, proteinG, fatG);
      }

      const ingredients = document.getElementById('food-input-ingredients')?.value.trim().slice(0, 1000) || '';
      const method = document.getElementById('food-input-method')?.value.trim().slice(0, 3000) || '';
      const favorite = Boolean(document.getElementById('food-input-favorite')?.checked);

      await handleSaveFood({
        name: nameVal,
        per: currentPer,
        carbsG,
        proteinG,
        fatG,
        kcal,
        ingredients,
        method,
        allergens: Array.from(selectedAllergens),
        favorite,
      }, isEdit ? food.id : null);

      closeFoodModal();
    });
  }
}

export async function handleSaveFood(foodData, foodId = null) {
  const uid = state.currentUser?.uid;
  if (!uid) return;

  const data = {
    name: String(foodData.name || '').trim().slice(0, 80),
    per: foodData.per === '100g' ? '100g' : 'serving',
    kcal: Math.max(0, Math.min(5000, Math.round(Number(foodData.kcal) || 0))),
    carbsG: Math.max(0, Math.min(1000, Math.round((Number(foodData.carbsG) || 0) * 10) / 10)),
    proteinG: Math.max(0, Math.min(1000, Math.round((Number(foodData.proteinG) || 0) * 10) / 10)),
    fatG: Math.max(0, Math.min(1000, Math.round((Number(foodData.fatG) || 0) * 10) / 10)),
    ingredients: String(foodData.ingredients || '').trim().slice(0, 1000),
    method: String(foodData.method || '').trim().slice(0, 3000),
    allergens: Array.isArray(foodData.allergens) ? foodData.allergens : [],
    favorite: Boolean(foodData.favorite),
    updatedAt: serverTimestamp(),
  };

  if (foodData.barcode) {
    data.barcode = String(foodData.barcode).trim();
  }
  if (foodData.source) {
    data.source = String(foodData.source).trim();
  }

  try {
    if (foodId) {
      const docRef = doc(db, 'users', uid, 'foods', foodId);
      await updateDoc(docRef, data);
      return foodId;
    } else {
      data.createdAt = serverTimestamp();
      const colRef = collection(db, 'users', uid, 'foods');
      const docRef = await addDoc(colRef, data);
      return docRef.id;
    }
  } catch (err) {
    console.error('Error saving food:', err);
    alert('Hiba történt az étel mentése során.');
    return null;
  }
}

export async function handleDeleteFood(foodId) {
  const uid = state.currentUser?.uid;
  if (!uid || !foodId) return;
  try {
    const docRef = doc(db, 'users', uid, 'foods', foodId);
    await deleteDoc(docRef);
  } catch (err) {
    console.error('Error deleting food:', err);
    alert('Hiba történt az étel törlése során.');
  }
}

export async function handleToggleFoodFavorite(foodId) {
  const uid = state.currentUser?.uid;
  if (!uid || !foodId) return;
  const food = state.foods.find((f) => f.id === foodId);
  if (!food) return;

  const nextFav = !food.favorite;
  food.favorite = nextFav;
  render();

  try {
    const docRef = doc(db, 'users', uid, 'foods', foodId);
    await updateDoc(docRef, {
      favorite: nextFav,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    console.error('Error toggling food favorite:', err);
  }
}

/* ==========================================================================
   11B. VONALKÓD-OLVASÓ (ZXING / BARCODE DETECTOR) ÉS OPEN FOOD FACTS
   ========================================================================== */

export function mapOpenFoodFactsAllergens(tags) {
  if (!Array.isArray(tags)) return [];
  const res = new Set();
  const lower = tags.map((t) => String(t).toLowerCase());

  const allergenPatterns = [
    { id: 'gluten', patterns: ['gluten', 'wheat', 'barley', 'rye', 'oat', 'spelt', 'kamut'] },
    { id: 'milk', patterns: ['milk', 'lactose', 'dairy', 'whey', 'casein'] },
    { id: 'egg', patterns: ['egg'] },
    { id: 'nuts', patterns: ['nut', 'walnut', 'hazelnut', 'almond', 'cashew', 'pecan', 'pistachio', 'macadamia'] },
    { id: 'fish', patterns: ['fish'] },
    { id: 'soy', patterns: ['soy', 'soya', 'soybean'] },
    { id: 'sesame', patterns: ['sesame'] },
  ];

  allergenPatterns.forEach(({ id, patterns }) => {
    if (lower.some((tag) => patterns.some((p) => tag.includes(p)))) {
      res.add(id);
    }
  });

  return Array.from(res);
}

let zxingLoadingPromise = null;
export function loadZXing() {
  if (window.ZXing) return Promise.resolve(window.ZXing);
  if (zxingLoadingPromise) return zxingLoadingPromise;
  zxingLoadingPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@zxing/library@0.21.3/umd/index.min.js';
    script.async = true;
    script.onload = () => resolve(window.ZXing);
    script.onerror = () => {
      zxingLoadingPromise = null;
      reject(new Error('Nem sikerült betölteni a vonalkód-olvasó könyvtárat.'));
    };
    document.head.appendChild(script);
  });
  return zxingLoadingPromise;
}

let activeMediaStream = null;
let activeBarcodeInterval = null;
let activeZXingReader = null;

export function stopBarcodeScanner() {
  if (activeBarcodeInterval) {
    clearInterval(activeBarcodeInterval);
    activeBarcodeInterval = null;
  }
  if (activeZXingReader) {
    try {
      activeZXingReader.reset();
    } catch (e) {}
    activeZXingReader = null;
  }
  if (activeMediaStream) {
    try {
      activeMediaStream.getTracks().forEach((track) => track.stop());
    } catch (e) {}
    activeMediaStream = null;
  }
}

export async function startBarcodeScanner(videoEl, onDetected, onError) {
  stopBarcodeScanner();

  if (window.isSecureContext === false && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
    onError({ type: 'insecure', message: T.meals.addModal.barcodeInsecureContext });
    return;
  }

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    onError({ type: 'notFound', message: T.meals.addModal.barcodeCameraNotFound });
    return;
  }

  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' } },
      audio: false,
    });
  } catch (err) {
    if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
      onError({ type: 'notAllowed', message: T.meals.addModal.barcodeCameraNotAllowed });
    } else {
      onError({ type: 'notFound', message: T.meals.addModal.barcodeCameraNotFound });
    }
    return;
  }

  activeMediaStream = stream;
  if (videoEl) {
    videoEl.srcObject = stream;
    videoEl.setAttribute('playsinline', 'true');
    try {
      await videoEl.play();
    } catch (e) {}
  }

  // BarcodeDetector natív támogatás
  if ('BarcodeDetector' in window) {
    try {
      const detector = new window.BarcodeDetector({
        formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e'],
      });
      activeBarcodeInterval = setInterval(async () => {
        if (!videoEl || videoEl.readyState < 2) return;
        try {
          const barcodes = await detector.detect(videoEl);
          if (barcodes && barcodes.length > 0) {
            const code = barcodes[0].rawValue;
            stopBarcodeScanner();
            onDetected(code);
          }
        } catch (e) {
          // Frame detect kihagyás
        }
      }, 250);
      return;
    } catch (e) {
      console.warn('BarcodeDetector init sikertelen, ZXing fallback következik:', e);
    }
  }

  // ZXing fallback
  try {
    const ZXing = await loadZXing();
    const reader = new ZXing.BrowserMultiFormatReader();
    activeZXingReader = reader;
    reader.decodeFromVideoElement(videoEl, (result, err) => {
      if (result) {
        const text = result.getText();
        stopBarcodeScanner();
        onDetected(text);
      }
    });
  } catch (err) {
    stopBarcodeScanner();
    onError({ type: 'loadError', message: err.message || 'Nem sikerült betölteni a vonalkód-olvasót.' });
  }
}

export async function fetchOpenFoodFactsProduct(barcode) {
  const code = String(barcode).trim();
  if (!code) return { error: 'invalid', message: T.meals.addModal.barcodeInvalid };

  // 1. Keresés az Ételtárban (gyorsítótár, offline)
  const localMatch = state.foods.find((f) => f.barcode && String(f.barcode).trim() === code);
  if (localMatch) {
    return {
      found: true,
      code,
      name: localMatch.name,
      brands: '',
      servingQuantity: localMatch.per === '100g' ? 100 : 1,
      carbsG: localMatch.carbsG || 0,
      proteinG: localMatch.proteinG || 0,
      fatG: localMatch.fatG || 0,
      kcal: localMatch.kcal || 0,
      allergens: Array.isArray(localMatch.allergens) ? localMatch.allergens : [],
      isLocal: true,
      localFoodId: localMatch.id,
      isIncomplete: false,
    };
  }

  // 2. Munkamenet memóriabeli gyorsítótár
  state.barcodeCache = state.barcodeCache || {};
  if (state.barcodeCache[code]) {
    return state.barcodeCache[code];
  }

  // 3. Open Food Facts API (8 mp időtúllépés)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const url = `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(code)}.json?fields=code,product_name,product_name_hu,brands,quantity,serving_size,serving_quantity,nutriments,allergens_tags`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.status === 404) {
      return { found: false, code, message: T.meals.addModal.barcodeNotFound };
    }
    if (!res.ok) {
      return { error: 'server', message: T.meals.addModal.barcodeServerError };
    }

    const data = await res.json();
    if (data.status === 0 || !data.product) {
      return { found: false, code, message: T.meals.addModal.barcodeNotFound };
    }

    const p = data.product;
    const name = String(p.product_name_hu || p.product_name || '').trim();
    const brands = String(p.brands || '').trim();

    let servingQuantity = null;
    if (p.serving_quantity != null && !isNaN(Number(p.serving_quantity)) && Number(p.serving_quantity) > 0) {
      servingQuantity = Math.round(Number(p.serving_quantity));
    } else if (p.serving_size) {
      const match = String(p.serving_size).match(/(\d+(?:[.,]\d+)?)\s*(?:g|ml)?/i);
      if (match) {
        servingQuantity = Math.round(parseFloat(match[1].replace(',', '.')));
      }
    }

    const nutriments = p.nutriments || {};
    let carbsG = nutriments.carbohydrates_100g != null ? parseFloat(nutriments.carbohydrates_100g) : (nutriments.carbohydrates != null ? parseFloat(nutriments.carbohydrates) : NaN);
    let proteinG = nutriments.proteins_100g != null ? parseFloat(nutriments.proteins_100g) : (nutriments.proteins != null ? parseFloat(nutriments.proteins) : NaN);
    let fatG = nutriments.fat_100g != null ? parseFloat(nutriments.fat_100g) : (nutriments.fat != null ? parseFloat(nutriments.fat) : NaN);

    let kcal = nutriments['energy-kcal_100g'] != null ? parseFloat(nutriments['energy-kcal_100g']) : (nutriments['energy-kcal'] != null ? parseFloat(nutriments['energy-kcal']) : (nutriments['energy-kcal_value'] != null ? parseFloat(nutriments['energy-kcal_value']) : NaN));

    if (isNaN(kcal) || kcal <= 0) {
      const kj = parseFloat(nutriments.energy_100g != null ? nutriments.energy_100g : nutriments.energy);
      if (!isNaN(kj) && kj > 0) {
        kcal = Math.round(kj / 4.184);
      } else if (!isNaN(carbsG) && !isNaN(proteinG) && !isNaN(fatG)) {
        kcal = calculateKcalFromMacros(carbsG, proteinG, fatG);
      }
    }

    const allergens = mapOpenFoodFactsAllergens(p.allergens_tags);
    const isIncomplete = isNaN(carbsG) || isNaN(proteinG) || isNaN(fatG) || !name;

    const result = {
      found: true,
      code,
      name,
      brands,
      servingQuantity: servingQuantity || 100,
      carbsG: isNaN(carbsG) ? 0 : Math.round(carbsG * 10) / 10,
      proteinG: isNaN(proteinG) ? 0 : Math.round(proteinG * 10) / 10,
      fatG: isNaN(fatG) ? 0 : Math.round(fatG * 10) / 10,
      kcal: isNaN(kcal) ? 0 : Math.round(kcal),
      allergens,
      isIncomplete,
    };

    state.barcodeCache[code] = result;
    return result;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      return { error: 'timeout', message: T.meals.addModal.barcodeTimeoutError };
    }
    if (!navigator.onLine || err instanceof TypeError) {
      return { error: 'network', message: T.meals.addModal.barcodeNetworkError };
    }
    return { error: 'server', message: T.meals.addModal.barcodeServerError };
  }
}

let currentAddMealEscHandler = null;

export function closeAddMealEntryModal() {
  stopBarcodeScanner();
  state.isAddMealEntryModalOpen = false;
  state.addMealEntryContext = null;
  if (currentAddMealEscHandler) {
    window.removeEventListener('keydown', currentAddMealEscHandler);
    currentAddMealEscHandler = null;
  }
  const modalRoot = document.getElementById('activity-modal-root');
  if (modalRoot) modalRoot.innerHTML = '';
}

export function openAddMealEntryModal(context) {
  state.isAddMealEntryModalOpen = true;
  state.addMealEntryContext = context;
  const modalRoot = document.getElementById('activity-modal-root');
  if (!modalRoot) return;

  const { dateKey, mealKey, mealName } = context;
  let activeTab = context.initialTab || 'library';
  let selectedFoodId = null;
  let searchFilter = '';
  let amountVal = 1;

  // Vonalkód állapot
  let barcodeManualInput = '';
  let barcodeCameraActive = false;
  let barcodeSearching = false;
  let barcodeResult = null;
  let barcodeError = null;
  let barcodeAmount = 100;
  let barcodeSaveToFoods = true;

  const handleBarcodeLookup = async (code) => {
    barcodeSearching = true;
    barcodeError = null;
    barcodeResult = null;
    stopBarcodeScanner();
    barcodeCameraActive = false;
    renderModalContent();

    const res = await fetchOpenFoodFactsProduct(code);
    barcodeSearching = false;

    if (res.error) {
      barcodeError = res.message;
    } else if (res.found === false) {
      barcodeResult = res;
    } else if (res.found === true) {
      barcodeResult = res;
      barcodeAmount = res.servingQuantity || 100;
      barcodeSaveToFoods = !res.isLocal;
    }
    renderModalContent();
  };

  const renderModalContent = () => {
    const showCal = getShowCalories();
    const tM = T.meals.addModal;

    modalRoot.innerHTML = `
      <div class="modal-backdrop" id="add-meal-modal-backdrop">
        <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-add-meal-title" style="max-width: 520px;">
          <div class="modal-header">
            <div>
              <h2 class="modal-title" id="modal-add-meal-title">${escapeHtml(mealName)}</h2>
              <p class="text-muted" style="font-size: 0.75rem; margin-top: 2px;">${escapeHtml(dateKey)} • ${escapeHtml(tM.title)}</p>
            </div>
            <button type="button" class="btn-modal-close" id="btn-close-add-meal-modal" aria-label="Ablak bezárása">
              <svg aria-hidden="true"><use href="#icon-close"></use></svg>
            </button>
          </div>

          <div class="modal-body" style="padding: 16px 20px;">
            <!-- Fül-választó -->
            <div class="modal-tab-bar">
              <button type="button" class="modal-tab-btn ${activeTab === 'library' ? 'active' : ''}" id="tab-btn-library">
                ${escapeHtml(tM.tabLibrary)}
              </button>
              <button type="button" class="modal-tab-btn ${activeTab === 'quick' ? 'active' : ''}" id="tab-btn-quick">
                ${escapeHtml(tM.tabQuick)}
              </button>
              <button type="button" class="modal-tab-btn ${activeTab === 'barcode' ? 'active' : ''}" id="tab-btn-barcode">
                <svg style="width: 14px; height: 14px; margin-right: 4px; vertical-align: -2px;" aria-hidden="true"><use href="#icon-barcode"></use></svg>
                ${escapeHtml(tM.tabBarcode)}
              </button>
            </div>

            ${activeTab === 'library' ? renderLibraryTabHtml() : ''}
            ${activeTab === 'quick' ? renderQuickTabHtml() : ''}
            ${activeTab === 'barcode' ? renderBarcodeTabHtml() : ''}
          </div>

          <div class="modal-footer" style="display: flex; justify-content: flex-end; gap: 8px;">
            <button type="button" class="btn btn-secondary" id="btn-cancel-add-meal">${escapeHtml(tM.cancelBtn)}</button>
            ${activeTab !== 'barcode' ? `
              <button type="button" class="btn btn-primary" id="btn-submit-add-meal">${escapeHtml(tM.addBtn)}</button>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    attachModalEvents();
  };

  const renderLibraryTabHtml = () => {
    const tM = T.meals.addModal;
    const showCal = getShowCalories();
    const q = normalizeSearchText(searchFilter);
    const filtered = state.foods.filter((f) => {
      if (!q) return true;
      return normalizeSearchText(f.name).includes(q) || normalizeSearchText(f.ingredients).includes(q);
    });

    const selectedFood = state.foods.find((f) => f.id === selectedFoodId);
    if (selectedFood && amountVal <= 0) {
      amountVal = selectedFood.per === '100g' ? 100 : 1;
    }

    let calcKcal = 0, calcCh = 0, calcP = 0, calcFat = 0;
    if (selectedFood) {
      const r = selectedFood.per === '100g' ? (amountVal / 100) : amountVal;
      calcKcal = Math.round((selectedFood.kcal || 0) * r);
      calcCh = Math.round((selectedFood.carbsG || 0) * r * 10) / 10;
      calcP = Math.round((selectedFood.proteinG || 0) * r * 10) / 10;
      calcFat = Math.round((selectedFood.fatG || 0) * r * 10) / 10;
    }

    return `
      <div>
        <div class="search-input-wrapper" style="margin-bottom: 12px;">
          <svg class="search-icon" aria-hidden="true"><use href="#icon-search"></use></svg>
          <input type="text" id="input-modal-food-search" class="search-input" placeholder="${escapeHtml(tM.searchPlaceholder)}" value="${escapeHtml(searchFilter)}">
        </div>

        ${state.foods.length === 0 ? `
          <div style="background: var(--surface-2); padding: 20px; border-radius: var(--radius-md); text-align: center; border: 1px dashed var(--border);">
            <p class="text-muted" style="font-size: 0.875rem; margin-bottom: 10px;">${escapeHtml(tM.noFoodsFound)}</p>
            <button type="button" class="btn btn-secondary" id="btn-modal-create-food-shortcut" style="font-size: 0.8125rem;">
              ${escapeHtml(tM.createFoodShortcut)}
            </button>
          </div>
        ` : `
          <div style="max-height: 200px; overflow-y: auto; display: flex; flex-direction: column; gap: 6px; padding-right: 4px; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 6px;">
            ${filtered.length === 0 ? `
              <div class="text-muted text-small" style="padding: 12px; text-align: center;">${escapeHtml(tM.noFoodsFound)}</div>
            ` : filtered.map((f) => {
              const isSel = f.id === selectedFoodId;
              return `
                <div class="food-list-item ${isSel ? 'selected' : ''}" data-select-food-id="${f.id}" style="padding: 8px 10px; border-radius: var(--radius-sm); cursor: pointer; display: flex; justify-content: space-between; align-items: center; background: ${isSel ? 'var(--accent-subtle)' : 'var(--surface-2)'}; border: 1px solid ${isSel ? 'var(--accent)' : 'transparent'};">
                  <div>
                    <div style="font-size: 0.8125rem; font-weight: 600; color: var(--text);">${escapeHtml(f.name)}</div>
                    <div class="tabular-nums text-muted" style="font-size: 0.6875rem;">
                      ${showCal ? `<strong>${fmtKcal(f.kcal)} kcal</strong> • ` : ''}
                      ${fmtMacro(f.carbsG)} CH / ${fmtMacro(f.proteinG)} F / ${fmtMacro(f.fatG)} ZS (${f.per === '100g' ? '100 g' : '1 adag'})
                    </div>
                  </div>
                  <span class="badge" style="font-size: 0.6875rem;">${f.per === '100g' ? '100 g' : 'adag'}</span>
                </div>
              `;
            }).join('')}
          </div>
        `}

        ${selectedFood ? `
          <div style="margin-top: 14px; background: var(--surface-2); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 0.8125rem; font-weight: 600; color: var(--text);">${escapeHtml(selectedFood.name)}</span>
              <span class="badge" style="background: var(--accent-subtle); color: var(--accent);">${selectedFood.per === '100g' ? 'Gramm-alapú' : 'Adag-alapú'}</span>
            </div>

            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
              <label for="input-meal-amount" style="font-size: 0.75rem; color: var(--text-muted);">${escapeHtml(tM.amountLabel)} (${selectedFood.per === '100g' ? tM.unitG : tM.unitServing}):</label>
              <div style="display: flex; align-items: center; gap: 4px; margin-left: auto;">
                <button type="button" class="btn btn-secondary" id="btn-amount-minus" style="width: 32px; height: 32px; padding: 0; font-size: 1rem;">−</button>
                <input type="number" id="input-meal-amount" class="form-input" min="${selectedFood.per === '100g' ? '1' : '0.1'}" step="${selectedFood.per === '100g' ? '25' : '0.5'}" value="${amountVal}" style="width: 80px; text-align: center; height: 32px; padding: 4px;">
                <button type="button" class="btn btn-secondary" id="btn-amount-plus" style="width: 32px; height: 32px; padding: 0; font-size: 1rem;">+</button>
              </div>
            </div>

            <div style="background: var(--surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 8px 10px; display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem;">
              <span class="text-muted">Számított makrók:</span>
              <span class="tabular-nums" style="font-weight: 600; color: var(--text);">
                ${showCal ? `<strong>${fmtKcal(calcKcal)} kcal</strong> • ` : ''}
                ${fmtMacro(calcCh)} CH / ${fmtMacro(calcP)} F / ${fmtMacro(calcFat)} ZS
              </span>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  };

  const renderQuickTabHtml = () => {
    const tM = T.meals.addModal;
    return `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div class="form-group" style="margin-bottom: 0;">
          <label for="quick-food-name" class="form-label">${escapeHtml(tM.quickNameLabel)} *</label>
          <input type="text" id="quick-food-name" class="form-input" placeholder="${escapeHtml(tM.quickNamePlaceholder)}" maxlength="80" required>
          <div class="form-error-msg" id="quick-food-name-error" style="display: none; color: var(--bad); font-size: 0.75rem; margin-top: 4px;">${escapeHtml(tM.errorNameRequired)}</div>
        </div>

        <div style="background: var(--surface-2); padding: 12px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); display: flex; flex-direction: column; gap: 10px;">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
            <div class="form-group" style="margin-bottom: 0;">
              <label for="quick-carbs" class="form-label" style="font-size: 0.75rem;">Szénhidrát (g)</label>
              <input type="number" id="quick-carbs" class="form-input" min="0" max="1000" step="0.1" placeholder="0">
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label for="quick-protein" class="form-label" style="font-size: 0.75rem;">Fehérje (g)</label>
              <input type="number" id="quick-protein" class="form-input" min="0" max="1000" step="0.1" placeholder="0">
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label for="quick-fat" class="form-label" style="font-size: 0.75rem;">Zsír (g)</label>
              <input type="number" id="quick-fat" class="form-input" min="0" max="1000" step="0.1" placeholder="0">
            </div>
          </div>

          <div style="display: flex; align-items: flex-end; gap: 10px;">
            <div class="form-group" style="margin-bottom: 0; flex: 1;">
              <label for="quick-kcal" class="form-label" style="font-size: 0.75rem;">Kalória (kcal)</label>
              <input type="number" id="quick-kcal" class="form-input" min="0" max="5000" step="1" placeholder="0">
            </div>
            <button type="button" class="btn btn-secondary" id="btn-calc-quick-kcal" style="font-size: 0.75rem; white-space: nowrap; height: 38px;">
              Számolás makrókból
            </button>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 8px;">
          <input type="checkbox" id="quick-save-to-foods" style="width: 18px; height: 18px; accent-color: var(--accent); cursor: pointer;">
          <label for="quick-save-to-foods" style="font-size: 0.8125rem; cursor: pointer; user-select: none;">${escapeHtml(tM.quickSaveToFoods)}</label>
        </div>
      </div>
    `;
  };

  const renderBarcodeTabHtml = () => {
    const tM = T.meals.addModal;
    const showCal = getShowCalories();

    if (barcodeSearching) {
      return `
        <div style="text-align: center; padding: 32px 16px;">
          <div class="spinner" style="margin: 0 auto 12px; width: 32px; height: 32px; border: 3px solid var(--border); border-top-color: var(--accent); border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
          <p class="text-muted" style="font-size: 0.875rem;">${escapeHtml(tM.barcodeSearching)}</p>
        </div>
      `;
    }

    return `
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <!-- Kamera szekció -->
        ${barcodeCameraActive ? `
          <div class="barcode-scanner-wrap">
            <video id="barcode-video" autoplay muted playsinline></video>
            <div class="barcode-viewfinder">
              <div class="barcode-laser"></div>
            </div>
          </div>
          <button type="button" class="btn btn-secondary" id="btn-stop-camera" style="width: 100%; font-size: 0.8125rem;">
            ${escapeHtml(tM.barcodeCameraStop)}
          </button>
        ` : `
          <button type="button" class="btn btn-secondary" id="btn-start-camera" style="width: 100%; font-size: 0.8125rem; display: flex; align-items: center; justify-content: center; gap: 8px;">
            <svg style="width: 16px; height: 16px;" aria-hidden="true"><use href="#icon-barcode"></use></svg>
            <span>${escapeHtml(tM.barcodeCameraStart)}</span>
          </button>
        `}

        <!-- Kézi beírás -->
        <div class="form-group" style="margin-bottom: 0;">
          <label for="input-barcode-manual" class="form-label" style="font-size: 0.75rem;">${escapeHtml(tM.barcodeManualTitle)}</label>
          <div style="display: flex; gap: 8px;">
            <input type="text" id="input-barcode-manual" class="form-input" inputmode="numeric" placeholder="${escapeHtml(tM.barcodeManualPlaceholder)}" value="${escapeHtml(barcodeManualInput)}" style="font-family: monospace; height: 36px;">
            <button type="button" class="btn btn-secondary" id="btn-search-barcode" style="white-space: nowrap; height: 36px; font-size: 0.8125rem;">
              ${escapeHtml(tM.barcodeSearchBtn)}
            </button>
          </div>
        </div>

        ${barcodeError ? `
          <div class="form-error-msg" style="display: block; color: var(--bad); font-size: 0.75rem;">
            ${escapeHtml(barcodeError)}
          </div>
        ` : ''}

        <!-- Nincs találat nézet -->
        ${barcodeResult && barcodeResult.found === false ? `
          <div style="background: var(--surface-2); border: 1px dashed var(--border); border-radius: var(--radius-md); padding: 14px; text-align: center; margin-top: 6px;">
            <p style="font-size: 0.8125rem; color: var(--text); margin-bottom: 10px;">${escapeHtml(barcodeResult.message || tM.barcodeNotFound)}</p>
            <button type="button" class="btn btn-primary" id="btn-barcode-manual-entry" style="font-size: 0.8125rem;">
              ${escapeHtml(tM.barcodeManualEntryBtn)}
            </button>
          </div>
        ` : ''}

        <!-- Találat nézet -->
        ${barcodeResult && barcodeResult.found === true ? (() => {
          const ratio = (barcodeAmount || 100) / 100;
          const calcKcal = Math.round((barcodeResult.kcal || 0) * ratio);
          const calcCh = Math.round((barcodeResult.carbsG || 0) * ratio * 10) / 10;
          const calcP = Math.round((barcodeResult.proteinG || 0) * ratio * 10) / 10;
          const calcFat = Math.round((barcodeResult.fatG || 0) * ratio * 10) / 10;

          return `
            <div class="barcode-result-card">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px;">
                <div>
                  <div style="font-weight: 700; font-size: 0.9375rem; color: var(--text);">${escapeHtml(barcodeResult.name || 'Ismeretlen termék')}</div>
                  ${barcodeResult.brands ? `<span class="text-muted" style="font-size: 0.75rem;">${escapeHtml(barcodeResult.brands)}</span>` : ''}
                </div>
                <span class="badge" style="background: var(--surface); border: 1px solid var(--border-subtle); font-size: 0.6875rem;">100 g alap</span>
              </div>

              ${barcodeResult.isIncomplete ? `
                <div class="macro-target-warning" style="margin-top: 0;">
                  ${escapeHtml(tM.barcodeIncomplete)}
                </div>
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px;">
                  <div>
                    <label style="font-size: 0.6875rem; color: var(--text-muted);">CH (g)</label>
                    <input type="number" id="barcode-edit-ch" class="form-input" min="0" max="1000" step="0.1" value="${barcodeResult.carbsG}" style="height: 30px; font-size: 0.75rem; padding: 2px 4px;">
                  </div>
                  <div>
                    <label style="font-size: 0.6875rem; color: var(--text-muted);">F (g)</label>
                    <input type="number" id="barcode-edit-p" class="form-input" min="0" max="1000" step="0.1" value="${barcodeResult.proteinG}" style="height: 30px; font-size: 0.75rem; padding: 2px 4px;">
                  </div>
                  <div>
                    <label style="font-size: 0.6875rem; color: var(--text-muted);">ZS (g)</label>
                    <input type="number" id="barcode-edit-fat" class="form-input" min="0" max="1000" step="0.1" value="${barcodeResult.fatG}" style="height: 30px; font-size: 0.75rem; padding: 2px 4px;">
                  </div>
                  <div>
                    <label style="font-size: 0.6875rem; color: var(--text-muted);">kcal</label>
                    <input type="number" id="barcode-edit-kcal" class="form-input" min="0" max="5000" step="1" value="${barcodeResult.kcal}" style="height: 30px; font-size: 0.75rem; padding: 2px 4px;">
                  </div>
                </div>
              ` : `
                <div class="tabular-nums" style="font-size: 0.75rem; color: var(--text-muted); background: var(--surface); padding: 6px 10px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
                  100 g: ${showCal ? `<strong>${fmtKcal(barcodeResult.kcal)} kcal</strong> • ` : ''}
                  ${fmtMacro(barcodeResult.carbsG)} CH / ${fmtMacro(barcodeResult.proteinG)} F / ${fmtMacro(barcodeResult.fatG)} ZS
                </div>
              `}

              ${Array.isArray(barcodeResult.allergens) && barcodeResult.allergens.length > 0 ? `
                <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                  ${barcodeResult.allergens.map((aId) => `<span class="allergen-tag" style="font-size: 0.6875rem; padding: 2px 6px;">${escapeHtml(T.foods.allergens[aId] || aId)}</span>`).join('')}
                </div>
              ` : ''}

              <!-- Mennyiség beállítása -->
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                <label for="input-barcode-amount" style="font-size: 0.75rem; color: var(--text-muted);">${escapeHtml(tM.barcodeQuantityLabel)}:</label>
                <div style="display: flex; align-items: center; gap: 4px;">
                  <button type="button" class="btn btn-secondary" id="btn-barcode-amount-minus" style="width: 32px; height: 32px; padding: 0; font-size: 1rem;">−</button>
                  <input type="number" id="input-barcode-amount" class="form-input" min="1" max="5000" step="25" value="${barcodeAmount}" style="width: 80px; text-align: center; height: 32px; padding: 4px;">
                  <button type="button" class="btn btn-secondary" id="btn-barcode-amount-plus" style="width: 32px; height: 32px; padding: 0; font-size: 1rem;">+</button>
                </div>
              </div>

              <!-- Számított makrók erre a mennyiségre -->
              <div style="background: var(--surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 8px 10px; display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem;">
                <span class="text-muted">Számított makrók (${barcodeAmount} g):</span>
                <span class="tabular-nums" style="font-weight: 600; color: var(--text);">
                  ${showCal ? `<strong>${fmtKcal(calcKcal)} kcal</strong> • ` : ''}
                  ${fmtMacro(calcCh)} CH / ${fmtMacro(calcP)} F / ${fmtMacro(calcFat)} ZS
                </span>
              </div>

              ${!barcodeResult.isLocal ? `
                <div style="display: flex; align-items: center; gap: 8px;">
                  <input type="checkbox" id="barcode-save-to-foods" ${barcodeSaveToFoods ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--accent); cursor: pointer;">
                  <label for="barcode-save-to-foods" style="font-size: 0.8125rem; cursor: pointer; user-select: none;">${escapeHtml(tM.barcodeSaveToFoods)}</label>
                </div>
              ` : `
                <div style="font-size: 0.75rem; color: var(--accent);">✓ Ez a termék már szerepel az Ételtáradban.</div>
              `}

              <button type="button" class="btn btn-primary" id="btn-submit-barcode-meal" style="width: 100%; margin-top: 4px;">
                ${escapeHtml(tM.barcodeAddBtn)}
              </button>

              <div class="barcode-attribution-note">
                ${escapeHtml(tM.barcodeAttribution)}
              </div>
            </div>
          `;
        })() : ''}
      </div>
    `;
  };

  const attachModalEvents = () => {
    const btnClose = document.getElementById('btn-close-add-meal-modal');
    const btnCancel = document.getElementById('btn-cancel-add-meal');
    const backdrop = document.getElementById('add-meal-modal-backdrop');

    if (btnClose) btnClose.addEventListener('click', closeAddMealEntryModal);
    if (btnCancel) btnCancel.addEventListener('click', closeAddMealEntryModal);
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeAddMealEntryModal();
      });
    }

    currentAddMealEscHandler = (e) => {
      if (e.key === 'Escape') closeAddMealEntryModal();
    };
    window.addEventListener('keydown', currentAddMealEscHandler);

    const tabBtnLib = document.getElementById('tab-btn-library');
    const tabBtnQuick = document.getElementById('tab-btn-quick');
    const tabBtnBarcode = document.getElementById('tab-btn-barcode');

    if (tabBtnLib) tabBtnLib.addEventListener('click', () => { stopBarcodeScanner(); barcodeCameraActive = false; activeTab = 'library'; renderModalContent(); });
    if (tabBtnQuick) tabBtnQuick.addEventListener('click', () => { stopBarcodeScanner(); barcodeCameraActive = false; activeTab = 'quick'; renderModalContent(); });
    if (tabBtnBarcode) tabBtnBarcode.addEventListener('click', () => { activeTab = 'barcode'; renderModalContent(); });

    if (activeTab === 'library') {
      const searchInput = document.getElementById('input-modal-food-search');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          searchFilter = e.target.value;
          renderModalContent();
          const nextInput = document.getElementById('input-modal-food-search');
          if (nextInput) {
            nextInput.focus();
            nextInput.setSelectionRange(nextInput.value.length, nextInput.value.length);
          }
        });
      }

      const foodItems = modalRoot.querySelectorAll('[data-select-food-id]');
      foodItems.forEach((item) => {
        item.addEventListener('click', () => {
          selectedFoodId = item.getAttribute('data-select-food-id');
          const f = state.foods.find((x) => x.id === selectedFoodId);
          amountVal = f?.per === '100g' ? 100 : 1;
          renderModalContent();
        });
      });

      const btnMinus = document.getElementById('btn-amount-minus');
      const btnPlus = document.getElementById('btn-amount-plus');
      const inputAmount = document.getElementById('input-meal-amount');
      const selectedFood = state.foods.find((f) => f.id === selectedFoodId);

      if (btnMinus && selectedFood) {
        btnMinus.addEventListener('click', () => {
          const step = selectedFood.per === '100g' ? 25 : 0.5;
          const min = selectedFood.per === '100g' ? 1 : 0.1;
          amountVal = Math.max(min, Math.round((amountVal - step) * 10) / 10);
          renderModalContent();
        });
      }
      if (btnPlus && selectedFood) {
        btnPlus.addEventListener('click', () => {
          const step = selectedFood.per === '100g' ? 25 : 0.5;
          amountVal = Math.round((amountVal + step) * 10) / 10;
          renderModalContent();
        });
      }
      if (inputAmount && selectedFood) {
        inputAmount.addEventListener('input', (e) => {
          const val = parseFloat(e.target.value);
          if (!isNaN(val) && val > 0) {
            amountVal = val;
          }
        });
        inputAmount.addEventListener('change', () => renderModalContent());
      }

      const btnCreateShortcut = document.getElementById('btn-modal-create-food-shortcut');
      if (btnCreateShortcut) {
        btnCreateShortcut.addEventListener('click', () => {
          closeAddMealEntryModal();
          openFoodModal(null);
        });
      }

      const btnSubmit = document.getElementById('btn-submit-add-meal');
      if (btnSubmit) {
        btnSubmit.addEventListener('click', async () => {
          if (!selectedFood) {
            alert(T.meals.addModal.errorFoodRequired);
            return;
          }
          const r = selectedFood.per === '100g' ? (amountVal / 100) : amountVal;
          const kcal = Math.round((selectedFood.kcal || 0) * r);
          const carbsG = Math.round((selectedFood.carbsG || 0) * r * 10) / 10;
          const proteinG = Math.round((selectedFood.proteinG || 0) * r * 10) / 10;
          const fatG = Math.round((selectedFood.fatG || 0) * r * 10) / 10;

          await handleSaveMealEntry({
            dateKey,
            mealKey,
            mealName,
            foodId: selectedFood.id,
            name: selectedFood.name,
            amount: amountVal,
            unit: selectedFood.per === '100g' ? 'g' : 'serving',
            kcal,
            carbsG,
            proteinG,
            fatG,
            eaten: false,
          });
          closeAddMealEntryModal();
        });
      }
    } else if (activeTab === 'quick') {
      const btnCalcQuick = document.getElementById('btn-calc-quick-kcal');
      const quickCarbs = document.getElementById('quick-carbs');
      const quickProtein = document.getElementById('quick-protein');
      const quickFat = document.getElementById('quick-fat');
      const quickKcal = document.getElementById('quick-kcal');

      if (btnCalcQuick) {
        btnCalcQuick.addEventListener('click', () => {
          const c = parseFloat(quickCarbs?.value || 0);
          const p = parseFloat(quickProtein?.value || 0);
          const f = parseFloat(quickFat?.value || 0);
          if (quickKcal) quickKcal.value = calculateKcalFromMacros(c, p, f);
        });
      }

      const btnSubmit = document.getElementById('btn-submit-add-meal');
      if (btnSubmit) {
        btnSubmit.addEventListener('click', async () => {
          const nameInput = document.getElementById('quick-food-name');
          const nameVal = nameInput?.value.trim() || '';
          const nameErr = document.getElementById('quick-food-name-error');

          if (!nameVal) {
            if (nameErr) nameErr.style.display = 'block';
            if (nameInput) nameInput.focus();
            return;
          }
          if (nameErr) nameErr.style.display = 'none';

          const carbsG = Math.max(0, Math.min(1000, Math.round(parseFloat(quickCarbs?.value || 0) * 10) / 10));
          const proteinG = Math.max(0, Math.min(1000, Math.round(parseFloat(quickProtein?.value || 0) * 10) / 10));
          const fatG = Math.max(0, Math.min(1000, Math.round(parseFloat(quickFat?.value || 0) * 10) / 10));
          let kcal = Math.max(0, Math.min(5000, Math.round(parseFloat(quickKcal?.value || 0))));
          if (isNaN(kcal) || kcal === 0) {
            kcal = calculateKcalFromMacros(carbsG, proteinG, fatG);
          }

          const saveToFoods = Boolean(document.getElementById('quick-save-to-foods')?.checked);
          let createdFoodId = null;

          if (saveToFoods && state.currentUser?.uid) {
            try {
              const fData = {
                name: nameVal,
                per: 'serving',
                carbsG,
                proteinG,
                fatG,
                kcal,
                ingredients: '',
                method: '',
                allergens: [],
                favorite: false,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
              };
              const colRef = collection(db, 'users', state.currentUser.uid, 'foods');
              const docAdded = await addDoc(colRef, fData);
              createdFoodId = docAdded.id;
            } catch (err) {
              console.error('Error saving quick food to foods collection:', err);
            }
          }

          await handleSaveMealEntry({
            dateKey,
            mealKey,
            mealName,
            foodId: createdFoodId,
            name: nameVal,
            amount: 1,
            unit: 'quick',
            kcal,
            carbsG,
            proteinG,
            fatG,
            eaten: false,
          });

          closeAddMealEntryModal();
        });
      }
    } else if (activeTab === 'barcode') {
      const btnStartCamera = document.getElementById('btn-start-camera');
      const btnStopCamera = document.getElementById('btn-stop-camera');
      const inputManual = document.getElementById('input-barcode-manual');
      const btnSearchBarcode = document.getElementById('btn-search-barcode');

      if (btnStartCamera) {
        btnStartCamera.addEventListener('click', () => {
          barcodeCameraActive = true;
          renderModalContent();
        });
      }

      if (btnStopCamera) {
        btnStopCamera.addEventListener('click', () => {
          stopBarcodeScanner();
          barcodeCameraActive = false;
          renderModalContent();
        });
      }

      if (barcodeCameraActive) {
        const videoEl = document.getElementById('barcode-video');
        if (videoEl) {
          startBarcodeScanner(
            videoEl,
            (detectedCode) => {
              barcodeCameraActive = false;
              barcodeManualInput = detectedCode;
              handleBarcodeLookup(detectedCode);
            },
            (err) => {
              barcodeCameraActive = false;
              barcodeError = err.message || T.meals.addModal.barcodeCameraNotFound;
              renderModalContent();
            }
          );
        }
      }

      const triggerManualSearch = () => {
        const code = inputManual?.value.trim() || '';
        barcodeManualInput = code;
        if (!code) {
          barcodeError = T.meals.addModal.barcodeInvalid;
          barcodeResult = null;
          renderModalContent();
          return;
        }

        // Checksum ellenőrzés EAN-8, EAN-13, UPC-A esetén
        if (/^\d{8}$|^\d{12,14}$/.test(code)) {
          if (!validateBarcodeChecksum(code)) {
            barcodeError = T.meals.addModal.barcodeInvalid;
            barcodeResult = null;
            renderModalContent();
            return;
          }
        } else if (!/^\d{8,14}$/.test(code)) {
          barcodeError = T.meals.addModal.barcodeInvalid;
          barcodeResult = null;
          renderModalContent();
          return;
        }

        handleBarcodeLookup(code);
      };

      if (btnSearchBarcode) {
        btnSearchBarcode.addEventListener('click', triggerManualSearch);
      }
      if (inputManual) {
        inputManual.addEventListener('input', (e) => {
          barcodeManualInput = e.target.value;
        });
        inputManual.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            triggerManualSearch();
          }
        });
      }

      const btnManualEntry = document.getElementById('btn-barcode-manual-entry');
      if (btnManualEntry) {
        btnManualEntry.addEventListener('click', () => {
          activeTab = 'quick';
          renderModalContent();
          const quickName = document.getElementById('quick-food-name');
          if (quickName) {
            quickName.value = barcodeManualInput;
            quickName.focus();
          }
        });
      }

      // Incomplete fields módosítások
      const chEl = document.getElementById('barcode-edit-ch');
      const pEl = document.getElementById('barcode-edit-p');
      const fatEl = document.getElementById('barcode-edit-fat');
      const kcalEl = document.getElementById('barcode-edit-kcal');

      if (chEl && barcodeResult) chEl.addEventListener('input', (e) => { barcodeResult.carbsG = parseFloat(e.target.value) || 0; });
      if (pEl && barcodeResult) pEl.addEventListener('input', (e) => { barcodeResult.proteinG = parseFloat(e.target.value) || 0; });
      if (fatEl && barcodeResult) fatEl.addEventListener('input', (e) => { barcodeResult.fatG = parseFloat(e.target.value) || 0; });
      if (kcalEl && barcodeResult) kcalEl.addEventListener('input', (e) => { barcodeResult.kcal = parseFloat(e.target.value) || 0; });

      const btnAmountMinus = document.getElementById('btn-barcode-amount-minus');
      const btnAmountPlus = document.getElementById('btn-barcode-amount-plus');
      const inputAmount = document.getElementById('input-barcode-amount');

      if (btnAmountMinus) {
        btnAmountMinus.addEventListener('click', () => {
          barcodeAmount = Math.max(1, barcodeAmount - 25);
          renderModalContent();
        });
      }
      if (btnAmountPlus) {
        btnAmountPlus.addEventListener('click', () => {
          barcodeAmount = barcodeAmount + 25;
          renderModalContent();
        });
      }
      if (inputAmount) {
        inputAmount.addEventListener('input', (e) => {
          const val = parseFloat(e.target.value);
          if (!isNaN(val) && val > 0) barcodeAmount = val;
        });
        inputAmount.addEventListener('change', () => renderModalContent());
      }

      const cbSaveFoods = document.getElementById('barcode-save-to-foods');
      if (cbSaveFoods) {
        cbSaveFoods.addEventListener('change', (e) => {
          barcodeSaveToFoods = e.target.checked;
        });
      }

      const btnSubmitBarcode = document.getElementById('btn-submit-barcode-meal');
      if (btnSubmitBarcode && barcodeResult) {
        btnSubmitBarcode.addEventListener('click', async () => {
          const ratio = (barcodeAmount || 100) / 100;
          const calcKcal = Math.round((barcodeResult.kcal || 0) * ratio);
          const calcCh = Math.round((barcodeResult.carbsG || 0) * ratio * 10) / 10;
          const calcP = Math.round((barcodeResult.proteinG || 0) * ratio * 10) / 10;
          const calcFat = Math.round((barcodeResult.fatG || 0) * ratio * 10) / 10;

          let foodId = barcodeResult.localFoodId || null;

          if (barcodeSaveToFoods && !barcodeResult.isLocal && state.currentUser?.uid) {
            foodId = await handleSaveFood({
              name: barcodeResult.name,
              per: '100g',
              carbsG: barcodeResult.carbsG || 0,
              proteinG: barcodeResult.proteinG || 0,
              fatG: barcodeResult.fatG || 0,
              kcal: barcodeResult.kcal || 0,
              barcode: barcodeResult.code,
              source: 'openfoodfacts',
              allergens: barcodeResult.allergens || [],
              ingredients: '',
              method: '',
              favorite: false,
            });
          }

          await handleSaveMealEntry({
            dateKey,
            mealKey,
            mealName,
            foodId: foodId || null,
            name: barcodeResult.name,
            amount: barcodeAmount,
            unit: 'g',
            kcal: calcKcal,
            carbsG: calcCh,
            proteinG: calcP,
            fatG: calcFat,
            barcode: barcodeResult.code,
            eaten: false,
          });

          closeAddMealEntryModal();
        });
      }
    }
  };

  renderModalContent();
}

export async function handleSaveMealEntry(entryData) {
  const uid = state.currentUser?.uid;
  if (!uid) return;

  const data = {
    dateKey: entryData.dateKey,
    mealKey: entryData.mealKey,
    mealName: entryData.mealName,
    foodId: entryData.foodId || null,
    name: String(entryData.name || '').trim().slice(0, 80),
    amount: Number(entryData.amount) || 1,
    unit: entryData.unit || 'serving',
    kcal: Math.max(0, Math.round(Number(entryData.kcal) || 0)),
    carbsG: Math.max(0, Math.round(Number(entryData.carbsG || 0) * 10) / 10),
    proteinG: Math.max(0, Math.round(Number(entryData.proteinG || 0) * 10) / 10),
    fatG: Math.max(0, Math.round(Number(entryData.fatG || 0) * 10) / 10),
    eaten: Boolean(entryData.eaten),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  if (entryData.barcode) {
    data.barcode = String(entryData.barcode).trim();
  }

  try {
    const colRef = collection(db, 'users', uid, 'mealEntries');
    const docRef = await addDoc(colRef, data);
    return docRef.id;
  } catch (err) {
    console.error('Error saving meal entry:', err);
    alert('Hiba történt az étkezés mentése során.');
    return null;
  }
}

let currentEditMealEscHandler = null;

export function closeEditMealEntryModal() {
  state.isEditMealEntryModalOpen = false;
  state.editingMealEntry = null;
  if (currentEditMealEscHandler) {
    window.removeEventListener('keydown', currentEditMealEscHandler);
    currentEditMealEscHandler = null;
  }
  const modalRoot = document.getElementById('activity-modal-root');
  if (modalRoot) modalRoot.innerHTML = '';
}

export function openEditMealEntryModal(entry) {
  state.isEditMealEntryModalOpen = true;
  state.editingMealEntry = entry;
  const modalRoot = document.getElementById('activity-modal-root');
  if (!modalRoot) return;

  const tE = T.meals.editModal;
  const showCal = getShowCalories();
  const linkedFood = entry.foodId ? state.foods.find((f) => f.id === entry.foodId) : null;

  let currentAmount = Number(entry.amount) || 1;
  let isEaten = Boolean(entry.eaten);

  const getCalculatedMacros = (amt) => {
    if (linkedFood) {
      const r = linkedFood.per === '100g' ? (amt / 100) : amt;
      return {
        kcal: Math.round((linkedFood.kcal || 0) * r),
        carbsG: Math.round((linkedFood.carbsG || 0) * r * 10) / 10,
        proteinG: Math.round((linkedFood.proteinG || 0) * r * 10) / 10,
        fatG: Math.round((linkedFood.fatG || 0) * r * 10) / 10,
      };
    }
    const origAmt = Number(entry.amount) || 1;
    const ratio = origAmt > 0 ? amt / origAmt : 1;
    return {
      kcal: Math.round((entry.kcal || 0) * ratio),
      carbsG: Math.round((entry.carbsG || 0) * ratio * 10) / 10,
      proteinG: Math.round((entry.proteinG || 0) * ratio * 10) / 10,
      fatG: Math.round((entry.fatG || 0) * ratio * 10) / 10,
    };
  };

  const renderEditContent = () => {
    const macros = getCalculatedMacros(currentAmount);
    const unitLabel = entry.unit === 'g' ? 'g' : (entry.unit === 'serving' ? 'adag' : 'adag');

    modalRoot.innerHTML = `
      <div class="modal-backdrop" id="edit-meal-modal-backdrop">
        <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-edit-meal-title" style="max-width: 480px;">
          <div class="modal-header">
            <div>
              <h2 class="modal-title" id="modal-edit-meal-title">${escapeHtml(entry.name)}</h2>
              <p class="text-muted" style="font-size: 0.75rem; margin-top: 2px;">${escapeHtml(entry.mealName)} • ${escapeHtml(entry.dateKey)}</p>
            </div>
            <button type="button" class="btn-modal-close" id="btn-close-edit-meal-modal" aria-label="Ablak bezárása">
              <svg aria-hidden="true"><use href="#icon-close"></use></svg>
            </button>
          </div>

          <form id="form-edit-meal-entry" class="modal-form-wrap" novalidate>
            <div class="modal-body" style="padding: 16px 20px; display: flex; flex-direction: column; gap: 14px;">
              <div style="background: var(--surface-2); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                  <label for="input-edit-amount" style="font-size: 0.8125rem; font-weight: 600; color: var(--text);">
                    ${escapeHtml(tE.amountLabel)} (${unitLabel}):
                  </label>
                  <div style="display: flex; align-items: center; gap: 4px;">
                    <button type="button" class="btn btn-secondary" id="btn-edit-amount-minus" style="width: 32px; height: 32px; padding: 0; font-size: 1rem;">−</button>
                    <input type="number" id="input-edit-amount" class="form-input" min="${entry.unit === 'g' ? '1' : '0.1'}" step="${entry.unit === 'g' ? '25' : '0.5'}" value="${currentAmount}" style="width: 80px; text-align: center; height: 32px; padding: 4px;">
                    <button type="button" class="btn btn-secondary" id="btn-edit-amount-plus" style="width: 32px; height: 32px; padding: 0; font-size: 1rem;">+</button>
                  </div>
                </div>

                <div style="background: var(--surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 8px 10px; display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem;">
                  <span class="text-muted">Makrók (${currentAmount} ${unitLabel}):</span>
                  <span class="tabular-nums" style="font-weight: 600; color: var(--text);">
                    ${showCal ? `<strong>${fmtKcal(macros.kcal)} kcal</strong> • ` : ''}
                    ${fmtMacro(macros.carbsG)} CH / ${fmtMacro(macros.proteinG)} F / ${fmtMacro(macros.fatG)} ZS
                  </span>
                </div>
              </div>

              <!-- Megettem checkbox -->
              <div style="display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: var(--surface-2); border-radius: var(--radius-md);">
                <input type="checkbox" id="input-edit-eaten" ${isEaten ? 'checked' : ''} style="width: 20px; height: 20px; accent-color: var(--good, #10B981); cursor: pointer;">
                <label for="input-edit-eaten" style="font-size: 0.875rem; font-weight: 600; color: var(--text); cursor: pointer; user-select: none;">
                  ${escapeHtml(tE.eatenCheckbox)}
                </label>
              </div>
            </div>

            <div class="modal-footer" style="display: flex; justify-content: space-between; align-items: center;">
              <button type="button" class="btn btn-secondary" id="btn-delete-meal-entry" style="color: var(--bad);">
                ${escapeHtml(tE.deleteBtn)}
              </button>
              <div style="display: flex; gap: 8px;">
                <button type="button" class="btn btn-secondary" id="btn-cancel-edit-meal">${escapeHtml(tE.cancelBtn)}</button>
                <button type="submit" class="btn btn-primary" id="btn-save-edit-meal">${escapeHtml(tE.saveBtn)}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    `;

    attachEditEvents();
  };

  const attachEditEvents = () => {
    const btnClose = document.getElementById('btn-close-edit-meal-modal');
    const btnCancel = document.getElementById('btn-cancel-edit-meal');
    const backdrop = document.getElementById('edit-meal-modal-backdrop');

    if (btnClose) btnClose.addEventListener('click', closeEditMealEntryModal);
    if (btnCancel) btnCancel.addEventListener('click', closeEditMealEntryModal);
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeEditMealEntryModal();
      });
    }

    currentEditMealEscHandler = (e) => {
      if (e.key === 'Escape') closeEditMealEntryModal();
    };
    window.addEventListener('keydown', currentEditMealEscHandler);

    const btnMinus = document.getElementById('btn-edit-amount-minus');
    const btnPlus = document.getElementById('btn-edit-amount-plus');
    const inputAmount = document.getElementById('input-edit-amount');
    const inputEaten = document.getElementById('input-edit-eaten');

    if (btnMinus) {
      btnMinus.addEventListener('click', () => {
        const step = entry.unit === 'g' ? 25 : 0.5;
        const min = entry.unit === 'g' ? 1 : 0.1;
        currentAmount = Math.max(min, Math.round((currentAmount - step) * 10) / 10);
        renderEditContent();
      });
    }
    if (btnPlus) {
      btnPlus.addEventListener('click', () => {
        const step = entry.unit === 'g' ? 25 : 0.5;
        currentAmount = Math.round((currentAmount + step) * 10) / 10;
        renderEditContent();
      });
    }
    if (inputAmount) {
      inputAmount.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        if (!isNaN(val) && val > 0) {
          currentAmount = val;
        }
      });
      inputAmount.addEventListener('change', () => renderEditContent());
    }
    if (inputEaten) {
      inputEaten.addEventListener('change', (e) => {
        isEaten = e.target.checked;
      });
    }

    const btnDelete = document.getElementById('btn-delete-meal-entry');
    if (btnDelete) {
      btnDelete.addEventListener('click', async () => {
        if (confirm(tE.deleteConfirm)) {
          await handleDeleteMealEntry(entry.id);
          closeEditMealEntryModal();
        }
      });
    }

    const form = document.getElementById('form-edit-meal-entry');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const finalMacros = getCalculatedMacros(currentAmount);
        await handleUpdateMealEntry(entry.id, {
          amount: currentAmount,
          eaten: isEaten,
          ...finalMacros,
        });
        closeEditMealEntryModal();
      });
    }
  };

  renderEditContent();
}

export async function handleUpdateMealEntry(entryId, patch) {
  const uid = state.currentUser?.uid;
  if (!uid || !entryId) return;

  try {
    const docRef = doc(db, 'users', uid, 'mealEntries', entryId);
    await updateDoc(docRef, {
      ...patch,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    console.error('Error updating meal entry:', err);
    alert('Hiba történt a módosítás mentése során.');
  }
}

export async function handleToggleMealEntryEaten(entryId, currentEaten) {
  const uid = state.currentUser?.uid;
  if (!uid || !entryId) return;

  const entry = state.mealEntries.find((e) => e.id === entryId);
  const nextEaten = !currentEaten;
  if (entry) {
    entry.eaten = nextEaten;
    render();
  }

  try {
    const docRef = doc(db, 'users', uid, 'mealEntries', entryId);
    await updateDoc(docRef, {
      eaten: nextEaten,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    console.error('Error toggling eaten state:', err);
  }
}

export async function handleDeleteMealEntry(entryId) {
  const uid = state.currentUser?.uid;
  if (!uid || !entryId) return;
  try {
    const docRef = doc(db, 'users', uid, 'mealEntries', entryId);
    await deleteDoc(docRef);
  } catch (err) {
    console.error('Error deleting meal entry:', err);
    alert('Hiba történt a törlés során.');
  }
}

export async function handleCopyPreviousWeek() {
  const uid = state.currentUser?.uid;
  if (!uid) return;

  const curMondayKey = state.mealsWeekStartKey || getMondayOfDate(new Date());
  const prevMon = parseDateKey(curMondayKey);
  prevMon.setDate(prevMon.getDate() - 7);
  const prevMondayKey = formatDateKey(prevMon);

  const prevSun = new Date(prevMon);
  prevSun.setDate(prevSun.getDate() + 6);
  const prevSundayKey = formatDateKey(prevSun);

  try {
    const colRef = collection(db, 'users', uid, 'mealEntries');
    const q = query(
      colRef,
      where('dateKey', '>=', prevMondayKey),
      where('dateKey', '<=', prevSundayKey)
    );
    const snap = await getDocs(q);

    if (snap.empty) {
      alert(T.meals.copyNoEntries);
      return;
    }

    if (!confirm(T.meals.copyConfirm)) {
      return;
    }

    const prevEntries = snap.docs.map((d) => d.data());

    let copiedCount = 0;
    const batch = writeBatch(db);

    for (let i = 0; i < 7; i++) {
      const curD = new Date(parseDateKey(curMondayKey));
      curD.setDate(curD.getDate() + i);
      const curDateKey = formatDateKey(curD);

      const hasCurrent = state.mealEntries.some((e) => e.dateKey === curDateKey);
      if (hasCurrent) {
        continue;
      }

      const prevD = new Date(prevMon);
      prevD.setDate(prevD.getDate() + i);
      const prevDateKey = formatDateKey(prevD);

      const matchingPrev = prevEntries.filter((e) => e.dateKey === prevDateKey);
      for (const item of matchingPrev) {
        const newRef = doc(colRef);
        batch.set(newRef, {
          dateKey: curDateKey,
          mealKey: item.mealKey,
          mealName: item.mealName,
          foodId: item.foodId || null,
          name: item.name,
          amount: item.amount,
          unit: item.unit,
          kcal: item.kcal,
          carbsG: item.carbsG,
          proteinG: item.proteinG,
          fatG: item.fatG,
          eaten: false,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        copiedCount++;
      }
    }

    if (copiedCount > 0) {
      await batch.commit();
      alert(T.meals.copyResult(copiedCount));
    } else {
      alert(T.meals.copyNoneCopied);
    }
  } catch (err) {
    console.error('Error copying previous week meals:', err);
    alert('Hiba történt az előző hét másolása során.');
  }
}

export function handleAddCustomMealPrompt(dateKey) {
  const customName = prompt(T.meals.customMealPrompt, '');
  if (!customName || !customName.trim()) return;
  const nameTrimmed = customName.trim().slice(0, 40);
  const customKey = 'custom_' + Date.now();
  openAddMealEntryModal({
    dateKey,
    mealKey: customKey,
    mealName: nameTrimmed,
    initialTab: 'library',
  });
}

/* ==========================================================================
   11B2. NAPI MAKRO-CÉLSÁVOK (MACRO TARGET RANGES)
   ========================================================================== */

export function renderMacroTargetBar(macroName, plannedVal, eatenVal, minVal, maxVal, unit = 'g') {
  const hasMin = minVal != null && minVal !== '' && !isNaN(Number(minVal));
  const hasMax = maxVal != null && maxVal !== '' && !isNaN(Number(maxVal));
  if (!hasMin && !hasMax) return '';

  const min = hasMin ? Number(minVal) : null;
  const max = hasMax ? Number(maxVal) : null;
  const planned = Number(plannedVal) || 0;
  const eaten = Number(eatenVal) || 0;

  const status = classifyAgainstRange(eaten, min, max);
  const statusText = status === 'none' ? '' : T.meals.targetStatus[status] || status;

  const refTarget = max != null ? max : (min != null ? min * 1.3 : 100);
  const scaleMax = Math.max(refTarget * 1.15, planned * 1.1, eaten * 1.1, 10);

  const zoneLeft = min != null ? Math.max(0, Math.min(100, (min / scaleMax) * 100)) : 0;
  const zoneRight = max != null ? Math.max(0, Math.min(100, (max / scaleMax) * 100)) : 100;
  const zoneWidth = Math.max(0, zoneRight - zoneLeft);

  const plannedLeft = Math.max(0, Math.min(100, (planned / scaleMax) * 100));
  const eatenLeft = Math.max(0, Math.min(100, (eaten / scaleMax) * 100));

  let rangeLabel = '';
  if (hasMin && hasMax) rangeLabel = `${min}–${max} ${unit}`;
  else if (hasMin) rangeLabel = `≥ ${min} ${unit}`;
  else if (hasMax) rangeLabel = `≤ ${max} ${unit}`;

  return `
    <div class="macro-target-item">
      <div class="macro-target-meta">
        <span><strong>${escapeHtml(macroName)}</strong> <span style="font-weight: 400;">(${escapeHtml(rangeLabel)})</span></span>
        ${statusText ? `<span class="macro-target-status-badge">${escapeHtml(statusText)}</span>` : ''}
      </div>
      <div class="macro-target-bar-wrap" title="${escapeHtml(macroName)}: Megettem: ${eaten} ${unit}, Tervezett: ${planned} ${unit}">
        <div class="macro-target-zone" style="left: ${zoneLeft.toFixed(1)}%; width: ${zoneWidth.toFixed(1)}%;"></div>
        <div class="macro-target-marker planned" style="left: ${plannedLeft.toFixed(1)}%;" title="Tervezett: ${planned} ${unit}"></div>
        <div class="macro-target-marker eaten" style="left: ${eatenLeft.toFixed(1)}%;" title="Megettem: ${eaten} ${unit}"></div>
      </div>
    </div>
  `;
}

let currentMacroTargetsEscHandler = null;

export function closeMacroTargetsModal() {
  state.isMacroTargetsModalOpen = false;
  if (currentMacroTargetsEscHandler) {
    window.removeEventListener('keydown', currentMacroTargetsEscHandler);
    currentMacroTargetsEscHandler = null;
  }
  const modalRoot = document.getElementById('activity-modal-root');
  if (modalRoot) modalRoot.innerHTML = '';
}

export function openMacroTargetsModal() {
  state.isMacroTargetsModalOpen = true;
  const modalRoot = document.getElementById('activity-modal-root');
  if (!modalRoot) return;

  const tM = T.meals.macroTargetsModal;
  const showCal = getShowCalories();
  const currentTargets = state.userProfile?.macroTargets || {};

  let carbsMin = currentTargets.carbsG?.min ?? '';
  let carbsMax = currentTargets.carbsG?.max ?? '';
  let proteinMin = currentTargets.proteinG?.min ?? '';
  let proteinMax = currentTargets.proteinG?.max ?? '';
  let fatMin = currentTargets.fatG?.min ?? '';
  let fatMax = currentTargets.fatG?.max ?? '';
  let kcalMin = currentTargets.kcal?.min ?? '';
  let kcalMax = currentTargets.kcal?.max ?? '';

  let formError = null;

  const renderContent = () => {
    const isLowCal = showCal && kcalMax !== '' && !isNaN(Number(kcalMax)) && Number(kcalMax) > 0 && Number(kcalMax) < 1500;

    modalRoot.innerHTML = `
      <div class="modal-backdrop" id="macro-targets-modal-backdrop">
        <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-macro-targets-title" style="max-width: 480px;">
          <div class="modal-header">
            <div>
              <h2 class="modal-title" id="modal-macro-targets-title">${escapeHtml(tM.title)}</h2>
              <p class="text-muted" style="font-size: 0.75rem; margin-top: 2px;">${escapeHtml(tM.subtitle)}</p>
            </div>
            <button type="button" class="btn-modal-close" id="btn-close-macro-targets-modal" aria-label="Ablak bezárása">
              <svg aria-hidden="true"><use href="#icon-close"></use></svg>
            </button>
          </div>

          <div class="modal-body" style="padding: 16px 20px;">
            <div class="macro-targets-grid">
              ${showCal ? `
                <div class="macro-target-row">
                  <label for="target-kcal-min" style="font-size: 0.8125rem; font-weight: 600; color: var(--text);">${escapeHtml(tM.kcalLabel)}</label>
                  <input type="number" id="target-kcal-min" class="form-input" min="0" max="10000" placeholder="${escapeHtml(tM.minPlaceholder)}" value="${escapeHtml(kcalMin)}" style="height: 34px;">
                  <input type="number" id="target-kcal-max" class="form-input" min="0" max="10000" placeholder="${escapeHtml(tM.maxPlaceholder)}" value="${escapeHtml(kcalMax)}" style="height: 34px;">
                </div>
              ` : ''}

              <div class="macro-target-row">
                <label for="target-carbs-min" style="font-size: 0.8125rem; font-weight: 600; color: var(--text);">${escapeHtml(tM.carbsLabel)}</label>
                <input type="number" id="target-carbs-min" class="form-input" min="0" max="2000" step="1" placeholder="${escapeHtml(tM.minPlaceholder)}" value="${escapeHtml(carbsMin)}" style="height: 34px;">
                <input type="number" id="target-carbs-max" class="form-input" min="0" max="2000" step="1" placeholder="${escapeHtml(tM.maxPlaceholder)}" value="${escapeHtml(carbsMax)}" style="height: 34px;">
              </div>

              <div class="macro-target-row">
                <label for="target-protein-min" style="font-size: 0.8125rem; font-weight: 600; color: var(--text);">${escapeHtml(tM.proteinLabel)}</label>
                <input type="number" id="target-protein-min" class="form-input" min="0" max="2000" step="1" placeholder="${escapeHtml(tM.minPlaceholder)}" value="${escapeHtml(proteinMin)}" style="height: 34px;">
                <input type="number" id="target-protein-max" class="form-input" min="0" max="2000" step="1" placeholder="${escapeHtml(tM.maxPlaceholder)}" value="${escapeHtml(proteinMax)}" style="height: 34px;">
              </div>

              <div class="macro-target-row">
                <label for="target-fat-min" style="font-size: 0.8125rem; font-weight: 600; color: var(--text);">${escapeHtml(tM.fatLabel)}</label>
                <input type="number" id="target-fat-min" class="form-input" min="0" max="2000" step="1" placeholder="${escapeHtml(tM.minPlaceholder)}" value="${escapeHtml(fatMin)}" style="height: 34px;">
                <input type="number" id="target-fat-max" class="form-input" min="0" max="2000" step="1" placeholder="${escapeHtml(tM.maxPlaceholder)}" value="${escapeHtml(fatMax)}" style="height: 34px;">
              </div>
            </div>

            ${isLowCal ? `
              <div class="macro-target-warning">
                ${escapeHtml(tM.lowCalorieWarning)}
              </div>
            ` : ''}

            ${formError ? `
              <div class="form-error-msg" style="display: block; color: var(--bad); font-size: 0.75rem; margin-top: 10px;">
                ${escapeHtml(formError)}
              </div>
            ` : ''}
          </div>

          <div class="modal-footer" style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">
            <button type="button" class="btn btn-secondary" id="btn-clear-macro-targets" style="font-size: 0.8125rem; color: var(--bad);">
              ${escapeHtml(tM.clearMacro)}
            </button>
            <div style="display: flex; gap: 8px;">
              <button type="button" class="btn btn-secondary" id="btn-cancel-macro-targets">${escapeHtml(tM.cancelBtn)}</button>
              <button type="button" class="btn btn-primary" id="btn-save-macro-targets">${escapeHtml(tM.saveBtn)}</button>
            </div>
          </div>
        </div>
      </div>
    `;

    attachEvents();
  };

  const attachEvents = () => {
    const btnClose = document.getElementById('btn-close-macro-targets-modal');
    const btnCancel = document.getElementById('btn-cancel-macro-targets');
    const backdrop = document.getElementById('macro-targets-modal-backdrop');

    if (btnClose) btnClose.addEventListener('click', closeMacroTargetsModal);
    if (btnCancel) btnCancel.addEventListener('click', closeMacroTargetsModal);
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeMacroTargetsModal();
      });
    }

    currentMacroTargetsEscHandler = (e) => {
      if (e.key === 'Escape') closeMacroTargetsModal();
    };
    window.addEventListener('keydown', currentMacroTargetsEscHandler);

    const syncInputs = () => {
      if (showCal) {
        kcalMin = document.getElementById('target-kcal-min')?.value.trim() ?? '';
        kcalMax = document.getElementById('target-kcal-max')?.value.trim() ?? '';
      }
      carbsMin = document.getElementById('target-carbs-min')?.value.trim() ?? '';
      carbsMax = document.getElementById('target-carbs-max')?.value.trim() ?? '';
      proteinMin = document.getElementById('target-protein-min')?.value.trim() ?? '';
      proteinMax = document.getElementById('target-protein-max')?.value.trim() ?? '';
      fatMin = document.getElementById('target-fat-min')?.value.trim() ?? '';
      fatMax = document.getElementById('target-fat-max')?.value.trim() ?? '';
    };

    const targetKcalMaxEl = document.getElementById('target-kcal-max');
    if (targetKcalMaxEl) {
      targetKcalMaxEl.addEventListener('input', () => {
        syncInputs();
        const isLow = showCal && kcalMax !== '' && !isNaN(Number(kcalMax)) && Number(kcalMax) > 0 && Number(kcalMax) < 1500;
        const warningEl = modalRoot.querySelector('.macro-target-warning');
        if (isLow && !warningEl) {
          renderContent();
        } else if (!isLow && warningEl) {
          renderContent();
        }
      });
    }

    const btnClear = document.getElementById('btn-clear-macro-targets');
    if (btnClear) {
      btnClear.addEventListener('click', async () => {
        await handleSaveMacroTargets(null);
        closeMacroTargetsModal();
      });
    }

    const btnSave = document.getElementById('btn-save-macro-targets');
    if (btnSave) {
      btnSave.addEventListener('click', async () => {
        syncInputs();

        const validatePair = (minStr, maxStr) => {
          const hasMin = minStr !== '' && !isNaN(Number(minStr));
          const hasMax = maxStr !== '' && !isNaN(Number(maxStr));
          if (hasMin && Number(minStr) < 0) return tM.errorNegative;
          if (hasMax && Number(maxStr) < 0) return tM.errorNegative;
          if (hasMin && hasMax && Number(minStr) > Number(maxStr)) return tM.errorMinMax;
          return null;
        };

        const pairs = [
          { min: carbsMin, max: carbsMax },
          { min: proteinMin, max: proteinMax },
          { min: fatMin, max: fatMax },
        ];
        if (showCal) pairs.push({ min: kcalMin, max: kcalMax });

        for (const p of pairs) {
          const err = validatePair(p.min, p.max);
          if (err) {
            formError = err;
            renderContent();
            return;
          }
        }

        const buildRange = (minStr, maxStr) => {
          const min = minStr !== '' && !isNaN(Number(minStr)) ? Math.round(Number(minStr)) : null;
          const max = maxStr !== '' && !isNaN(Number(maxStr)) ? Math.round(Number(maxStr)) : null;
          if (min === null && max === null) return null;
          return { min, max };
        };

        const targets = {};
        const cRange = buildRange(carbsMin, carbsMax);
        if (cRange) targets.carbsG = cRange;

        const pRange = buildRange(proteinMin, proteinMax);
        if (pRange) targets.proteinG = pRange;

        const fRange = buildRange(fatMin, fatMax);
        if (fRange) targets.fatG = fRange;

        if (showCal) {
          const kRange = buildRange(kcalMin, kcalMax);
          if (kRange) targets.kcal = kRange;
        }

        await handleSaveMacroTargets(Object.keys(targets).length > 0 ? targets : null);
        closeMacroTargetsModal();
      });
    }
  };

  renderContent();
}

export async function handleSaveMacroTargets(targets) {
  const uid = state.currentUser?.uid;
  if (!uid) return;

  try {
    const userRef = doc(db, 'users', uid);
    if (!targets) {
      await updateDoc(userRef, {
        macroTargets: deleteField(),
        updatedAt: serverTimestamp(),
      });
      if (state.userProfile) {
        delete state.userProfile.macroTargets;
      }
    } else {
      await updateDoc(userRef, {
        macroTargets: targets,
        updatedAt: serverTimestamp(),
      });
      if (state.userProfile) {
        state.userProfile.macroTargets = targets;
      }
    }
    render();
  } catch (err) {
    console.error('Error saving macro targets:', err);
    alert('Hiba történt a célsávok mentése során.');
  }
}

/* ==========================================================================
   11C. ÉTELTÁR ÉS ÉTKEZÉSI TERV OLDAL-RENDERELŐK / FOODS & MEALS PAGES
   ========================================================================== */

function renderFoodsPage() {
  const tF = T.foods;
  const showCal = getShowCalories();
  const q = normalizeSearchText(state.foodSearchQuery);

  const filteredFoods = state.foods.filter((f) => {
    if (state.foodFilterTab === 'favorites' && !f.favorite) return false;
    if (!q) return true;
    return normalizeSearchText(f.name).includes(q) || normalizeSearchText(f.ingredients).includes(q);
  });

  return `
    <div class="foods-page">
      <div>
        <a href="#/lab/nutrition" class="btn-back" aria-label="${escapeHtml(T.backToLab)}">
          <svg class="btn-back-icon" aria-hidden="true"><use href="#icon-arrow-left"></use></svg>
          <span>Táplálkozás és hidratáció</span>
        </a>
      </div>

      <div class="foods-header">
        <div>
          <h1>${escapeHtml(tF.title)}</h1>
          <p class="section-subtitle">${escapeHtml(tF.subtitle)}</p>
        </div>
        <div class="show-calories-toggle-wrap">
          <label style="font-size: 0.8125rem; font-weight: 600; color: var(--text-muted); cursor: pointer;" for="toggle-show-calories-foods">
            ${escapeHtml(tF.showCaloriesLabel)}
          </label>
          <input type="checkbox" id="toggle-show-calories-foods" class="toggle-switch-input" data-toggle-show-calories ${showCal ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--accent); cursor: pointer;">
        </div>
      </div>

      <!-- Kereső és szűrősáv -->
      <div class="foods-toolbar">
        <div class="search-input-wrapper">
          <svg class="search-icon" aria-hidden="true"><use href="#icon-search"></use></svg>
          <input type="text" id="foods-search-input" class="search-input" placeholder="${escapeHtml(tF.searchPlaceholder)}" value="${escapeHtml(state.foodSearchQuery || '')}">
        </div>
        <div class="foods-tabs-group">
          <div class="segmented-control" role="group" aria-label="Ételek szűrése">
            <button type="button" class="segmented-btn ${state.foodFilterTab === 'all' ? 'active' : ''}" data-food-tab="all">
              ${escapeHtml(tF.tabs.all)} (${state.foods.length})
            </button>
            <button type="button" class="segmented-btn ${state.foodFilterTab === 'favorites' ? 'active' : ''}" data-food-tab="favorites">
              <svg style="width: 13px; height: 13px; vertical-align: -1px; margin-right: 3px;" aria-hidden="true"><use href="#icon-heart"></use></svg>
              ${escapeHtml(tF.tabs.favorites)}
            </button>
          </div>
          <button type="button" class="btn btn-primary" id="btn-open-add-food" style="white-space: nowrap;">
            ${escapeHtml(tF.newFoodBtn)}
          </button>
        </div>
      </div>

      <!-- Ételek listája -->
      <div class="food-cards-grid" id="foods-cards-container">
        ${state.foods.length === 0 ? `
          <div class="empty-state" style="grid-column: 1 / -1; padding: 40px 16px;">
            <p>${escapeHtml(tF.emptyAll)}</p>
            <button type="button" class="btn btn-primary" id="btn-empty-add-food" style="margin-top: 10px;">${escapeHtml(tF.newFoodBtn)}</button>
          </div>
        ` : filteredFoods.length === 0 ? `
          <div class="empty-state" style="grid-column: 1 / -1; padding: 30px 16px;">
            <p>${escapeHtml(state.foodFilterTab === 'favorites' ? tF.emptyFavorites : tF.emptySearch)}</p>
          </div>
        ` : filteredFoods.map((food) => {
          const perLabel = food.per === '100g' ? '100 g' : '1 adag';
          return `
            <div class="food-card" data-food-id="${food.id}" data-food-name-norm="${escapeHtml(normalizeSearchText(food.name))}" data-food-ing-norm="${escapeHtml(normalizeSearchText(food.ingredients))}">
              <div class="food-card-top">
                <div class="food-card-title-group">
                  <h3 class="food-card-title">${escapeHtml(food.name)}</h3>
                  <span class="food-card-per-badge">${escapeHtml(perLabel)}</span>
                </div>
                <button type="button" class="btn-fav-toggle ${food.favorite ? 'active' : ''}" data-fav-food-id="${food.id}" aria-label="Kedvenc váltása">
                  <svg aria-hidden="true"><use href="#icon-heart"></use></svg>
                </button>
              </div>

              <div class="food-card-macros tabular-nums">
                ${showCal ? `<strong>${fmtKcal(food.kcal)} kcal</strong> • ` : ''}
                <span class="macro-item ch">CH: ${fmtMacro(food.carbsG)} g</span> •
                <span class="macro-item p">F: ${fmtMacro(food.proteinG)} g</span> •
                <span class="macro-item f">ZS: ${fmtMacro(food.fatG)} g</span>
              </div>

              ${Array.isArray(food.allergens) && food.allergens.length > 0 ? `
                <div class="food-card-allergens">
                  ${food.allergens.map((aId) => `<span class="allergen-tag">${escapeHtml(tF.allergens[aId] || aId)}</span>`).join('')}
                </div>
              ` : ''}

              ${food.ingredients ? `
                <div class="food-card-ingredients">${escapeHtml(food.ingredients)}</div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderMealsPage() {
  const tM = T.meals;
  const showCal = getShowCalories();
  const currentMonKey = state.mealsWeekStartKey || getMondayOfDate(new Date());
  state.mealsWeekStartKey = currentMonKey;

  const weekDates = getWeekDates(currentMonKey);
  const selectedDateKey = state.mealsSelectedDateKey || formatDateKey(new Date());
  state.mealsSelectedDateKey = selectedDateKey;

  const activeDayObj = weekDates.find((w) => w.dateKey === selectedDateKey) || weekDates[0];

  const renderSingleDayContent = (d, isMobile = false) => {
    const dayEntries = state.mealEntries.filter((e) => e.dateKey === d.dateKey);

    const customMealKeys = new Set();
    dayEntries.forEach((e) => {
      if (!BASE_MEALS.some((bm) => bm.key === e.mealKey)) {
        customMealKeys.add(JSON.stringify({ key: e.mealKey, name: e.mealName || tM.customMealDefault }));
      }
    });

    const dayMeals = [
      ...BASE_MEALS,
      ...Array.from(customMealKeys).map((s) => JSON.parse(s)),
    ];

    let dayPlannedKcal = 0, dayPlannedCh = 0, dayPlannedP = 0, dayPlannedFat = 0;
    let dayEatenKcal = 0, dayEatenCh = 0, dayEatenP = 0, dayEatenFat = 0;

    dayEntries.forEach((e) => {
      const k = Number(e.kcal) || 0;
      const c = Number(e.carbsG) || 0;
      const p = Number(e.proteinG) || 0;
      const f = Number(e.fatG) || 0;

      dayPlannedKcal += k;
      dayPlannedCh += c;
      dayPlannedP += p;
      dayPlannedFat += f;

      if (e.eaten) {
        dayEatenKcal += k;
        dayEatenCh += c;
        dayEatenP += p;
        dayEatenFat += f;
      }
    });

    return `
      <div class="meals-day-column ${d.isToday ? 'is-today' : ''}" style="${isMobile ? 'border: none; background: transparent; padding: 0;' : ''}">
        <!-- Oszlop fejléc (csak asztali nézetben jelenik meg itt) -->
        ${!isMobile ? `
          <div class="meals-day-header">
            <div>
              <span class="meals-day-title">${escapeHtml(d.dayFull)}</span>
              <span class="meals-day-date-sub">(${d.dayNum}.)</span>
            </div>
            ${d.isToday ? `<span class="badge" style="background: var(--accent-subtle); color: var(--accent); font-size: 0.625rem;">${escapeHtml(tM.today)}</span>` : ''}
          </div>
        ` : ''}

        <!-- Étkezések kártyái -->
        <div class="meals-day-card">
          ${dayMeals.map((m) => {
            const entries = dayEntries.filter((e) => e.mealKey === m.key);
            let mKcal = 0, mCh = 0, mP = 0, mFat = 0;
            entries.forEach((e) => {
              mKcal += Number(e.kcal) || 0;
              mCh += Number(e.carbsG) || 0;
              mP += Number(e.proteinG) || 0;
              mFat += Number(e.fatG) || 0;
            });

            return `
              <div class="meal-card">
                <div class="meal-card-header">
                  <div class="meal-card-title">${escapeHtml(m.name)}</div>
                  <button type="button" class="btn-add-meal-entry" data-add-meal="${d.dateKey}|${m.key}|${escapeHtml(m.name)}" aria-label="Étel hozzáadása a(z) ${escapeHtml(m.name)} étkezéshez">
                    +
                  </button>
                </div>

                ${entries.length > 0 ? `
                  <div class="meal-card-subtotal">
                    ${showCal ? `<strong>${fmtKcal(mKcal)} kcal</strong> • ` : ''}
                    ${fmtMacro(mCh)} CH / ${fmtMacro(mP)} F / ${fmtMacro(mFat)} ZS
                  </div>
                ` : ''}

                <div class="meal-entries-list">
                  ${entries.length === 0 ? `
                    <div class="meal-empty-hint">${escapeHtml(tM.emptyMealHint)}</div>
                  ` : entries.map((item) => {
                    const unitLabel = item.unit === 'g' ? 'g' : (item.unit === 'serving' ? 'adag' : 'adag');
                    return `
                      <div class="meal-entry-item">
                        <button type="button" class="meal-entry-checkbox ${item.eaten ? 'checked' : ''}" data-toggle-meal-eaten="${item.id}" aria-label="${item.eaten ? 'Megettem visszavonása' : 'Megettem megjelölése'}">
                          ${item.eaten ? `<svg style="width: 12px; height: 12px;" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>` : ''}
                        </button>
                        <div class="meal-entry-content" data-edit-meal-item="${item.id}">
                          <span class="meal-entry-name">${escapeHtml(item.name)} <span class="text-muted" style="font-weight: 400;">(${item.amount} ${unitLabel})</span></span>
                          <span class="meal-entry-macros">
                            ${showCal ? `${fmtKcal(item.kcal)} kcal • ` : ''}
                            ${fmtMacro(item.carbsG)} CH / ${fmtMacro(item.proteinG)} F / ${fmtMacro(item.fatG)} ZS
                          </span>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }).join('')}

          <!-- Új egyedi étkezés gomb -->
          <button type="button" class="btn btn-secondary" data-add-custom-meal="${d.dateKey}" style="width: 100%; font-size: 0.75rem; padding: 6px; border-style: dashed;">
            ${escapeHtml(tM.addCustomMealBtn)}
          </button>

          <!-- Napi összesítő kártya -->
          <div class="meals-day-summary">
            <div style="font-size: 0.6875rem; font-weight: 700; color: var(--text); margin-bottom: 2px;">
              ${escapeHtml(tM.summaryTitle)}
            </div>
            <div class="meals-summary-row">
              <span>${escapeHtml(tM.plannedLabel)}:</span>
              <span>
                ${showCal ? `<strong>${fmtKcal(dayPlannedKcal)} kcal</strong> • ` : ''}
                ${fmtMacro(dayPlannedCh)} CH / ${fmtMacro(dayPlannedP)} F / ${fmtMacro(dayPlannedFat)} ZS
              </span>
            </div>
            <div class="meals-summary-row" style="color: var(--good, #10B981);">
              <span>${escapeHtml(tM.eatenLabel)}:</span>
              <span>
                ${showCal ? `<strong>${fmtKcal(dayEatenKcal)} kcal</strong> • ` : ''}
                ${fmtMacro(dayEatenCh)} CH / ${fmtMacro(dayEatenP)} F / ${fmtMacro(dayEatenFat)} ZS
              </span>
            </div>

            <!-- Napi célsávok megjelenítése (ha be vannak állítva) -->
            ${(() => {
              const targets = state.userProfile?.macroTargets;
              if (!targets) return '';
              const items = [];
              if (showCal && targets.kcal && (targets.kcal.min != null || targets.kcal.max != null)) {
                items.push(renderMacroTargetBar('Kalória', dayPlannedKcal, dayEatenKcal, targets.kcal.min, targets.kcal.max, 'kcal'));
              }
              if (targets.carbsG && (targets.carbsG.min != null || targets.carbsG.max != null)) {
                items.push(renderMacroTargetBar('Szénhidrát', dayPlannedCh, dayEatenCh, targets.carbsG.min, targets.carbsG.max, 'g'));
              }
              if (targets.proteinG && (targets.proteinG.min != null || targets.proteinG.max != null)) {
                items.push(renderMacroTargetBar('Fehérje', dayPlannedP, dayEatenP, targets.proteinG.min, targets.proteinG.max, 'g'));
              }
              if (targets.fatG && (targets.fatG.min != null || targets.fatG.max != null)) {
                items.push(renderMacroTargetBar('Zsír', dayPlannedFat, dayEatenFat, targets.fatG.min, targets.fatG.max, 'g'));
              }
              if (items.length === 0) return '';
              return `
                <div class="meals-summary-targets">
                  ${items.join('')}
                </div>
              `;
            })()}
          </div>
        </div>
      </div>
    `;
  };

  return `
    <div class="meals-page">
      <div>
        <a href="#/lab/nutrition" class="btn-back" aria-label="${escapeHtml(T.backToLab)}">
          <svg class="btn-back-icon" aria-hidden="true"><use href="#icon-arrow-left"></use></svg>
          <span>Táplálkozás és hidratáció</span>
        </a>
      </div>

      <div class="meals-header">
        <div>
          <h1>${escapeHtml(tM.title)}</h1>
          <p class="section-subtitle">${escapeHtml(tM.subtitle)}</p>
        </div>
        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <button type="button" class="btn btn-secondary" id="btn-open-macro-targets" style="font-size: 0.8125rem;">
            ${escapeHtml(tM.macroTargetsBtn)}
          </button>
          <a href="#/lab/nutrition/foods" class="btn btn-secondary" style="font-size: 0.8125rem;">
            ${escapeHtml(tM.goToFoodsBtn)}
          </a>
          <div class="show-calories-toggle-wrap">
            <label style="font-size: 0.8125rem; font-weight: 600; color: var(--text-muted); cursor: pointer;" for="toggle-show-calories-meals">
              ${escapeHtml(tM.showCaloriesLabel)}
            </label>
            <input type="checkbox" id="toggle-show-calories-meals" class="toggle-switch-input" data-toggle-show-calories ${showCal ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--accent); cursor: pointer;">
          </div>
        </div>
      </div>

      <!-- Hét-navigációs sáv -->
      <div class="meals-week-nav-bar">
        <div class="meals-week-selector">
          <button type="button" class="btn-week-step" id="btn-meals-prev-week" aria-label="Előző hét">◀</button>
          <span class="meals-week-label">${escapeHtml(formatWeekLabel(currentMonKey))}</span>
          <button type="button" class="btn-week-step" id="btn-meals-next-week" aria-label="Következő hét">▶</button>
        </div>
        <div style="display: flex; gap: 8px;">
          <button type="button" class="btn btn-secondary" id="btn-meals-today" style="font-size: 0.8125rem; padding: 6px 12px;">
            ${escapeHtml(tM.today)}
          </button>
          <button type="button" class="btn btn-secondary" id="btn-meals-copy-prev" style="font-size: 0.8125rem; padding: 6px 12px;">
            ${escapeHtml(tM.copyPrevWeek)}
          </button>
        </div>
      </div>

      <!-- Asztali nézet: 7 oszlop egymás mellett -->
      <div class="meals-desktop-grid">
        ${weekDates.map((d) => renderSingleDayContent(d, false)).join('')}
      </div>

      <!-- Mobil nézet: 7 napos választósáv + aktív nap kártyája -->
      <div class="meals-mobile-view">
        <div class="meals-day-selector">
          ${weekDates.map((d) => {
            const isActive = d.dateKey === selectedDateKey;
            return `
              <button type="button" class="meals-day-pill ${isActive ? 'active' : ''} ${d.isToday ? 'is-today' : ''}" data-select-meal-date="${d.dateKey}">
                <span class="meals-day-pill-name">${escapeHtml(d.dayShort)}</span>
                <span class="meals-day-pill-num">${d.dayNum}</span>
              </button>
            `;
          }).join('')}
        </div>

        <div class="card" style="margin-top: 10px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid var(--border-subtle);">
            <div>
              <h2 style="font-size: 1.125rem; font-weight: 700; color: var(--text);">${escapeHtml(activeDayObj.dayFull)}</h2>
              <span class="text-muted text-small">${escapeHtml(activeDayObj.dateKey)}</span>
            </div>
            ${activeDayObj.isToday ? `<span class="badge" style="background: var(--accent-subtle); color: var(--accent);">${escapeHtml(tM.today)}</span>` : ''}
          </div>
          ${renderSingleDayContent(activeDayObj, true)}
        </div>
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

      <div class="settings-group">
        <div class="section-header"><h2 class="section-title">${tMore.sections.dataManagement}</h2></div>
        <div class="card settings-card-danger" style="display: flex; flex-direction: column; gap: 10px;">
          <div>
            <div style="font-weight: 700; color: var(--text);">${tMore.deleteData.btn}</div>
            <div class="text-muted text-small" style="margin-top: 4px; line-height: 1.4;">${tMore.deleteData.desc}</div>
          </div>
          <div>
            <button type="button" class="btn btn-danger" id="btn-open-delete-data">
              <svg style="width: 16px; height: 16px;" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              <span>${tMore.deleteData.btn}</span>
            </button>
          </div>
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
  // 0. Útvonal hiba nézet gombok ("Újra" és "Vissza")
  const btnRouteRetry = document.getElementById('btn-route-error-retry');
  if (btnRouteRetry) {
    btnRouteRetry.addEventListener('click', () => {
      handleRouteChange();
    });
  }
  const btnRouteBack = document.getElementById('btn-route-error-back');
  if (btnRouteBack) {
    btnRouteBack.addEventListener('click', () => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        navigateTo('#/home');
      }
    });
  }

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

  // 3f. Activity kártyák megnyitása részletek nézetre
  const actCards = document.querySelectorAll('.activity-card[data-activity-id]');
  actCards.forEach((card) => {
    const actId = card.getAttribute('data-activity-id');
    const onCardClick = () => {
      const found = state.journalActivities.find((a) => a.id === actId);
      if (found) {
        openActivityDetailsModal(found);
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

  // 3h. Idegrendszeri mérések oldal eseményei
  const nervousPeriodBtns = document.querySelectorAll('[data-nervous-period]');
  nervousPeriodBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const period = Number(e.currentTarget.getAttribute('data-nervous-period'));
      if (period && period !== state.nervousPeriod) {
        state.nervousPeriod = period;
        state.nervousChartSelectedDay = null;
        render();
      }
    });
  });

  const nervousExcludeToggle = document.getElementById('nervous-exclude-toggle');
  if (nervousExcludeToggle) {
    nervousExcludeToggle.addEventListener('change', (e) => {
      setBaselineExcludeTagged(e.target.checked);
    });
  }

  const nervousPoints = document.querySelectorAll('[data-nervous-date]');
  nervousPoints.forEach((pt) => {
    const dateKey = pt.getAttribute('data-nervous-date');
    const selectDay = () => {
      state.nervousChartSelectedDay = dateKey;
      render();
    };
    pt.addEventListener('click', selectDay);
    pt.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectDay();
      }
    });
  });

  const nervousLogCards = document.querySelectorAll('.nervous-log-card[data-checkin-date]');
  nervousLogCards.forEach((card) => {
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

  const btnNervousLogNewList = document.querySelectorAll('#btn-nervous-log-new');
  btnNervousLogNewList.forEach((btn) => {
    btn.addEventListener('click', () => {
      openCheckinModal();
    });
  });

  // 3i. Hidratáció oldal eseményei
  const btnHydPrev = document.getElementById('btn-hydration-prev-day');
  if (btnHydPrev) {
    btnHydPrev.addEventListener('click', () => {
      const cur = new Date((state.hydrationSelectedDateKey || formatDateKey(new Date())) + 'T00:00:00');
      cur.setDate(cur.getDate() - 1);
      state.hydrationSelectedDateKey = formatDateKey(cur);
      render();
    });
  }

  const btnHydNext = document.getElementById('btn-hydration-next-day');
  if (btnHydNext) {
    btnHydNext.addEventListener('click', () => {
      const cur = new Date((state.hydrationSelectedDateKey || formatDateKey(new Date())) + 'T00:00:00');
      cur.setDate(cur.getDate() + 1);
      state.hydrationSelectedDateKey = formatDateKey(cur);
      render();
    });
  }

  const btnSetGoal = document.getElementById('btn-set-hydration-goal');
  if (btnSetGoal) {
    btnSetGoal.addEventListener('click', () => openHydrationGoalModal());
  }

  const btnEditGoal = document.getElementById('btn-edit-hydration-goal');
  if (btnEditGoal) {
    btnEditGoal.addEventListener('click', () => openHydrationGoalModal());
  }

  const btnRepeatHyd = document.getElementById('btn-repeat-hydration');
  if (btnRepeatHyd) {
    btnRepeatHyd.addEventListener('click', () => handleRepeatLastDrink());
  }

  const drinkTiles = document.querySelectorAll('.drink-tile[data-drink-id]');
  drinkTiles.forEach((tile) => {
    tile.addEventListener('click', () => {
      const drinkId = tile.getAttribute('data-drink-id');
      if (drinkId) openAddHydrationModal(drinkId);
    });
  });

  const hydLogItems = document.querySelectorAll('.hydration-log-item[data-hydration-id]');
  hydLogItems.forEach((item) => {
    item.addEventListener('click', () => {
      const entryId = item.getAttribute('data-hydration-id');
      const entry = (state.hydrationEntries || []).find((e) => e.id === entryId);
      if (entry) openEditHydrationModal(entry);
    });
  });

  const hydChartBars = document.querySelectorAll('[data-hydration-chart-date]');
  hydChartBars.forEach((bar) => {
    const onSelectBar = () => {
      const dKey = bar.getAttribute('data-hydration-chart-date');
      if (dKey) {
        state.hydrationSelectedDateKey = dKey;
        render();
      }
    };
    bar.addEventListener('click', onSelectBar);
    bar.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelectBar();
      }
    });
  });

  // 3j. Home üdvözlő kártya és teendők eseményei
  const btnWelcomeCheckin = document.getElementById('btn-welcome-checkin');
  if (btnWelcomeCheckin) {
    btnWelcomeCheckin.addEventListener('click', () => openCheckinModal());
  }
  const btnWelcomeActivity = document.getElementById('btn-welcome-activity');
  if (btnWelcomeActivity) {
    btnWelcomeActivity.addEventListener('click', () => openActivityModal());
  }
  const todoTaskCheckin = document.getElementById('todo-task-checkin');
  if (todoTaskCheckin) {
    todoTaskCheckin.addEventListener('click', () => openCheckinModal());
  }
  const todoTaskActivity = document.getElementById('todo-task-activity');
  if (todoTaskActivity) {
    todoTaskActivity.addEventListener('click', () => openActivityModal());
  }
  const todoTaskHydration = document.getElementById('todo-task-hydration');
  if (todoTaskHydration) {
    todoTaskHydration.addEventListener('click', () => navigateTo('#/lab/nutrition/hydration'));
  }

  // 3k. More oldal adattörlés eseménye
  const btnOpenDeleteData = document.getElementById('btn-open-delete-data');
  if (btnOpenDeleteData) {
    btnOpenDeleteData.addEventListener('click', () => openDeleteAllDataModal());
  }

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


  // 6b. Ételtár (Foods) eseményei
  const foodsSearchInput = document.getElementById('foods-search-input');
  if (foodsSearchInput) {
    foodsSearchInput.addEventListener('input', (e) => {
      state.foodSearchQuery = e.target.value;
      const q = normalizeSearchText(state.foodSearchQuery);
      const foodCards = document.querySelectorAll('.food-card[data-food-id]');
      foodCards.forEach((card) => {
        const nameNorm = card.getAttribute('data-food-name-norm') || '';
        const ingNorm = card.getAttribute('data-food-ing-norm') || '';
        const isMatch = !q || nameNorm.includes(q) || ingNorm.includes(q);
        card.style.display = isMatch ? '' : 'none';
      });
    });
  }

  const foodTabBtns = document.querySelectorAll('[data-food-tab]');
  foodTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-food-tab');
      if (tab && tab !== state.foodFilterTab) {
        state.foodFilterTab = tab;
        render();
      }
    });
  });

  const btnOpenAddFood = document.getElementById('btn-open-add-food');
  if (btnOpenAddFood) {
    btnOpenAddFood.addEventListener('click', () => openFoodModal(null));
  }
  const btnEmptyAddFood = document.getElementById('btn-empty-add-food');
  if (btnEmptyAddFood) {
    btnEmptyAddFood.addEventListener('click', () => openFoodModal(null));
  }

  const favToggleBtns = document.querySelectorAll('.btn-fav-toggle[data-fav-food-id]');
  favToggleBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const fId = btn.getAttribute('data-fav-food-id');
      if (fId) handleToggleFoodFavorite(fId);
    });
  });

  const foodCards = document.querySelectorAll('.food-card[data-food-id]');
  foodCards.forEach((card) => {
    card.addEventListener('click', () => {
      const fId = card.getAttribute('data-food-id');
      const food = state.foods.find((f) => f.id === fId);
      if (food) openFoodModal(food);
    });
  });

  // 6c. Heti étkezési terv (Meals) eseményei
  const btnMealsPrev = document.getElementById('btn-meals-prev-week');
  if (btnMealsPrev) {
    btnMealsPrev.addEventListener('click', () => {
      const mon = parseDateKey(state.mealsWeekStartKey || getMondayOfDate(new Date()));
      mon.setDate(mon.getDate() - 7);
      state.mealsWeekStartKey = formatDateKey(mon);
      if (state.currentUser?.uid) {
        subscribeWeekMeals(state.currentUser.uid, state.mealsWeekStartKey);
      }
      render();
    });
  }

  const btnMealsNext = document.getElementById('btn-meals-next-week');
  if (btnMealsNext) {
    btnMealsNext.addEventListener('click', () => {
      const mon = parseDateKey(state.mealsWeekStartKey || getMondayOfDate(new Date()));
      mon.setDate(mon.getDate() + 7);
      state.mealsWeekStartKey = formatDateKey(mon);
      if (state.currentUser?.uid) {
        subscribeWeekMeals(state.currentUser.uid, state.mealsWeekStartKey);
      }
      render();
    });
  }

  const btnMealsToday = document.getElementById('btn-meals-today');
  if (btnMealsToday) {
    btnMealsToday.addEventListener('click', () => {
      state.mealsWeekStartKey = getMondayOfDate(new Date());
      state.mealsSelectedDateKey = formatDateKey(new Date());
      if (state.currentUser?.uid) {
        subscribeWeekMeals(state.currentUser.uid, state.mealsWeekStartKey);
      }
      render();
    });
  }

  const btnMealsCopyPrev = document.getElementById('btn-meals-copy-prev');
  if (btnMealsCopyPrev) {
    btnMealsCopyPrev.addEventListener('click', handleCopyPreviousWeek);
  }

  const mealDayPills = document.querySelectorAll('[data-select-meal-date]');
  mealDayPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const dKey = pill.getAttribute('data-select-meal-date');
      if (dKey) {
        state.mealsSelectedDateKey = dKey;
        render();
      }
    });
  });

  const addMealBtns = document.querySelectorAll('[data-add-meal]');
  addMealBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const raw = btn.getAttribute('data-add-meal') || '';
      const [dateKey, mealKey, mealName] = raw.split('|');
      if (dateKey && mealKey) {
        openAddMealEntryModal({ dateKey, mealKey, mealName: mealName || 'Étkezés' });
      }
    });
  });

  const addCustomMealBtns = document.querySelectorAll('[data-add-custom-meal]');
  addCustomMealBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const dKey = btn.getAttribute('data-add-custom-meal');
      if (dKey) handleAddCustomMealPrompt(dKey);
    });
  });

  const mealEatenCheckboxes = document.querySelectorAll('[data-toggle-meal-eaten]');
  mealEatenCheckboxes.forEach((box) => {
    box.addEventListener('click', (e) => {
      e.stopPropagation();
      const entryId = box.getAttribute('data-toggle-meal-eaten');
      const isChecked = box.classList.contains('checked');
      if (entryId) handleToggleMealEntryEaten(entryId, isChecked);
    });
  });

  const mealEntryContents = document.querySelectorAll('[data-edit-meal-item]');
  mealEntryContents.forEach((el) => {
    el.addEventListener('click', () => {
      const entryId = el.getAttribute('data-edit-meal-item');
      const entry = state.mealEntries.find((e) => e.id === entryId);
      if (entry) openEditMealEntryModal(entry);
    });
  });

  const showCaloriesCheckboxes = document.querySelectorAll('[data-toggle-show-calories]');
  showCaloriesCheckboxes.forEach((cb) => {
    cb.addEventListener('change', (e) => {
      setShowCalories(e.target.checked);
    });
  });

  const btnOpenMacroTargets = document.getElementById('btn-open-macro-targets');
  if (btnOpenMacroTargets) {
    btnOpenMacroTargets.addEventListener('click', openMacroTargetsModal);
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

  try {
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
        } else if (state.currentPillar === 'recovery' && state.currentSubpage === 'nervous') {
          htmlContent = renderNervousPage();
        } else if (state.currentPillar === 'nutrition' && state.currentSubpage === 'hydration') {
          htmlContent = renderHydrationPage();
        } else if (state.currentPillar === 'nutrition' && state.currentSubpage === 'foods') {
          htmlContent = renderFoodsPage();
        } else if (state.currentPillar === 'nutrition' && state.currentSubpage === 'meals') {
          htmlContent = renderMealsPage();
        } else if (state.currentPillar && !state.currentSubpage) {
          htmlContent = renderPillar(state.currentPillar);
        } else if (!state.currentPillar && !state.currentSubpage) {
          htmlContent = renderLab();
        } else {
          throw new Error(`A megadott Lab aloldal nem található: ${window.location.hash}`);
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
        throw new Error(`Az útvonal nem található: ${window.location.hash || state.currentRoute}`);
      }
    }
  } catch (err) {
    console.error('Route render error:', err);
    htmlContent = renderRouteError(err);
  }

  container.innerHTML = htmlContent;
  if (state.status === 'signedOut' || state.status === 'onboarding') {
    syncLogoUI();
  }

  if (state.status === 'ready') {
    updateNavigationUI();
  }

  try {
    attachViewEventListeners();
  } catch (err) {
    console.error('attachViewEventListeners error:', err);
  }
}


/* ==========================================================================
   13. ALKALMAZÁS INICIALIZÁLÁSA / INITIALIZATION
   ========================================================================== */

function init() {
  preloadLogos();
  initTheme();
  try {
    const savedLast = localStorage.getItem('lockin_last_drink');
    if (savedLast) state.lastLoggedDrink = JSON.parse(savedLast);
  } catch (e) {}
  initAuth();
  window.addEventListener('hashchange', handleRouteChange);
  handleRouteChange();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
