# Lockin – Sportolói teljesítmény- és egészségkövető (PWA)

## 1. Projekt neve és célja
A **Lockin** egy sportolói teljesítmény-, terhelés- és regenerációkövető progresszív webalkalmazás (PWA). Célja, hogy tudományosan megalapozott, egyszerűen átlátható és megbízható visszajelzést adjon a sportolóknak a napi készenlétről, edzésterhelésről, alvásról és felkészültségi állapotról.

---

## 2. Felhasználói módok (Modes)
Az alkalmazás három célcsoportra szabott módot támogat:
1. **Athlete (Versenysportoló)** *(Aktív az 1. lépéstől)*: Versenyszerű felkészülés, maximális adaptáció és csúcsteljesítmény.
2. **Junior (Utánpótlás)** *(Hamarosan)*: Fejlődési, alapozási és prevenciós fókusz fiatal sportolók számára (szülői hozzájárulással).
3. **Longevity (Hosszú távú egészség)** *(Hamarosan)*: Vitalitás, autonóm idegrendszeri egyensúly és hosszú távú egészségmegőrzés.

---

## 3. Fő navigáció és teljes Router-tábla
Az alkalmazás hash-alapú kliensoldali útválasztást (SPA Router) használ. Az alábbi táblázat tartalmazza az összes hivatalosan támogatott útvonalat:

| Útvonal (Hash) | Típus | Modul / Funkció | Vissza gomb célja |
|---|---|---|---|
| `#/home` (vagy `#/`, `#`, `""`) | Fő fül | Napi áttekintés, készenlét/terhelés/alvás gyűrűk, üres állapotok, mai teendők | – |
| `#/lab` | Fő fül | Performance Lab – 4 sporttudományos pillér rácsa | – |
| `#/lab/recovery` | Pillér oldal | Regeneráció és helyreállítás (Alvás és Idegrendszer modulok) | `#/lab` |
| `#/lab/recovery/sleep` | Lab aloldal | Alvás-architektúra (7/14/30 napos statisztika, SVG oszlopdiagram) | `#/lab/recovery` |
| `#/lab/recovery/nervous` | Lab aloldal | Idegrendszeri mérések (HRV, nyugalmi pulzus, 60 napos bázisvonal és trendek) | `#/lab/recovery` |
| `#/lab/nutrition` | Pillér oldal | Táplálkozás és hidratáció (Étkezési terv, Ételtár, Hidratáció modulok) | `#/lab` |
| `#/lab/nutrition/hydration` | Lab aloldal | Hidratáció napló (célcsúszka, gyorsbevitel, 14 napos SVG diagram) | `#/lab/nutrition` |
| `#/lab/nutrition/foods` | Lab aloldal | Ételtár (kereső, allergének, makrók, új étel szerkesztő modal) | `#/lab/nutrition` |
| `#/lab/nutrition/meals` | Lab aloldal | Heti étkezési terv (7 napos hét, makrók, ételek, másolás) | `#/lab/nutrition` |
| `#/lab/<pillar>` | Pillér oldal | Érvényes pillér-oldal a felhasználói mód szerint (`physical`, `mental`) | `#/lab` |
| `#/journal` | Fő fül | Journal – naplózott tevékenységek lista és naptár nézete | – |
| `#/more` | Fő fül | More – beállítások, téma, módválasztó, "Összes adatom törlése" | – |
| `#/more/profile` | Aloldal | Sportolói profil – név szerkesztés, e-mail megjelenítés, kijelentkezés | `#/more` |
| *Bármely ismeretlen útvonal* | Nem létező útvonal (`notFound`) | Hibaképernyő (`renderRouteError`) "Újra" és "Vissza" gombokkal | `#/home` vagy előző lap |

---

## 4. Technikai szabályok
- **Stack**: Tiszta Vanilla HTML + CSS + JavaScript (ES modulok). Keretrendszerek, build-eszközök és külső CDN csomagok nélkül (kizárólag hivatalos Firebase ES modulok a gstatic-ról).
- **Fájlstruktúra korlát**: KIZÁRÓLAG az 5 kijelölt fájl létezhet a projekt gyökerében.
- **Fájlméret**: Fájlonként nincs sorszám-korlát. Az alapelv: a projekt kevés fájlból álljon, és a struktúra legyen könnyen követhető. Új fájl csak indokolt esetben jön létre.
- **Nyelv és konvenciók**:
  - Kommentek: **magyarul**.
  - Kód azonosítók (változók, függvények, osztályok): **angolul**.
  - A kód szekciókra bontva, látványos szekciófejlécekkel van tagolva.
  - Minden felhasználói felirat a `T` lokalizációs objektumból származik.
- **Biztonság és védelem**:
  - Felhasználó által megadott szövegek (pl. név) kizárólag `textContent` használatával kerülnek kiírásra a DOM-ba, soha `innerHTML`-lel (XSS védelem).
  - Jelszavak nincsenek tárolva vagy logolva kliensoldalon.
  - A `localStorage`-ban kizárólag a téma-beállítás (`lockin_theme`) tárolódik.
- **Reszponzivitás és elrendezés (Hibajavítva a 2. lépésben)**:
  - Mobile first: 360 px-től 1920 px+ méretig optimális.
  - 900 px felett kétoszlopos CSS Grid elrendezés (`240px minmax(0, 1fr)`), ahol a tartalomoszlop `min-width: 0; max-width: 1080px; margin: 0 auto;`, így megszűnt a korábbi szélső jobbra lógás/levágás.
  - 900 px alatt alsó fülsáv, `safe-area-inset` kezeléssel.
- **Minden lépésre érvényes szabályok (Mintaadatok és almappák tilalma / regisztrációja / oldal-szintű hibakezelés)**:
  - Az alkalmazás SOHA nem jeleníthet meg vagy tárolhat mintaadatot valódi felhasználónál. Az új fiók teljesen üres adatokkal indul (csak a profil: név, mód, nyelv, beállítások). Helyőrző tartalom csak olyan lehet, ami nyilvánvalóan nem adat (pl. "—" vagy üres állapot szöveg).
  - Minden új felhasználói almappa (subcollection) kötelezően felvételre kerül az `USER_DATA_COLLECTIONS` konfigurációs listába (`USER_DATA_COLLECTIONS = ['activities', 'checkins', 'hydration', 'foods', 'mealEntries']`).
  - **Oldal-szintű hibakezelés és útvonal-védelem (9B lépés szabálya)**: Ha egy útvonal oldalának a rajzolása kivételt dob, vagy az útvonal nem található (`notFound`), a felület nem fagyhat le és nem maradhat némán az előző tartalom. Kötelezően a szabványos barátságos hibaüzenet (`renderRouteError`) jelenik meg a felhasználónak az `#app-view` tárolóban: *"Nem sikerült megnyitni az oldalt. Próbáld újra."* „Újra” és „Vissza” gombokkal. A részletes technikai hiba kötelezően megjelenik a konzolon (`console.error`). Ha egy `onSnapshot` adatfeliratkozás hibát ad (pl. jogosultsági hiba vagy hiányzó index), az adott oldalon tartózkodó felhasználónak szintén azonnal meg kell jelennie ennek a hibaüzenetnek.

---

## 5. Fájlstruktúra
```text
Lockin/
├── index.html            # PWA alapváz, inline SVG sprite, fejléc, oldalsáv és alsó fülsáv
├── styles.css            # Teljes dizájnrendszer, CSS változók, komponensek, reszponzív grid és auth stílusok
├── app.js                # Router, Firebase Auth & Firestore, T szótár, témavezérlés és renderelők
├── manifest.webmanifest  # Szabványos PWA web app manifest
├── logo-dark-mode.png    # Márkajelzés (fehér logó sötét kártyához / fehér szöveghez)
├── logo-light-mode.png   # Márkajelzés (fekete logó világos kártyához / fekete szöveghez)
└── PROJEKT.md            # Projektleírás, technikai szabályzat, architektúra és tesztelési napló
```

---

## 6. Firebase konfiguráció és verzió
- **SDK Verzió**: **Firebase v11.0.2** (hivatalos ES modulok: `https://www.gstatic.com/firebasejs/11.0.2/`).
- **Modulok**: `firebase-app.js`, `firebase-auth.js`, `firebase-firestore.js`.
- **Firebase Projekt azonosítók**:
  - `projectId`: `lockinlab`
  - `authDomain`: `lockinlab.firebaseapp.com`
  - `storageBucket`: `lockinlab.firebasestorage.app`
  - `messagingSenderId`: `78200354598`
  - `appId`: `1:78200354598:web:a1c4ac61818016729673e7`

### Firebase Konzol ellenőrzőlista és beállítási lépések
1. **Authentication engedélyezése**:
   - A Firebase Konzolban nyisd meg a *Build* → *Authentication* menüpontot.
   - A *Sign-in method* fülön engedélyezd az **Email/Password** (E-mail és jelszó) szolgáltatót.
   - Ugyanitt az *Add new provider* (Új szolgáltató hozzáadása) gombra kattintva válaszd a **Google** szolgáltatót:
     - Kapcsold be az *Enable* kapcsolót.
     - Állítsd be a **Project support email**-t (projekt-támogató e-mail) a legördülőből.
     - Kattints a *Save* gombra.
     - *(Megjegyzés: A `localhost` alapértelmezésben engedélyezett az *Authorized domains* listában. Ha egyedi domainen futtatod az appot, vedd fel az engedélyezett domainek közé).*
2. **Cloud Firestore adatbázis létrehozása**:
   - A *Build* → *Firestore Database* menüpontban hozz létre egy adatbázist (Production mode).
   - Válassz európai régiót (pl. `europe-west1` vagy `europe-west3`).
   - A *Rules* (Szabályok) fülre másold be az alábbi szabályzatot:

### Firestore-szabályok (Owner-only szabályzat a felhasználói adatokhoz)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isOwner(userId) {
      return request.auth != null && request.auth.uid == userId;
    }

    // A felhasználó saját dokumentuma és összes algyűjteménye (activities, checkins, profil)
    match /users/{userId} {
      allow read, write: if isOwner(userId);

      match /{document=**} {
        allow read, write: if isOwner(userId);
      }
    }
  }
}
```

### Google-belépés architektúra és Redirect Fallback korlátai
- **Elsődleges eljárás**: `signInWithPopup(auth, googleProvider)` felugró ablakos hitelesítés. Gyors, felhasználóbarát, megőrzi az alkalmazás állapotát és nem igényel teljes oldal-újratöltést.
- **Tartalék eljárás (Fallback)**: Ha a böngésző vagy környezet blokkolja a felugró ablakot (`auth/popup-blocked` vagy `auth/operation-not-supported-in-this-environment`, pl. bizonyos mobil webview-k vagy szigorú beállítású böngészők esetén), a rendszer automatikusan átirányításos belépésre vált (`signInWithRedirect`). Az induláskor lefutó `getRedirectResult(auth)` fogadja és hitelesíti a visszatérő munkamenetet.
- **Redirect megoldás ismert korlátai**:
  - *Állapotvesztés (Page Reload)*: Az átirányítás elhagyja az appot és visszatéréskor teljes oldal-újratöltést hajt végre, emiatt az átmeneti űrlapállapotok elveszhetnek.
  - *3rd-party Cookie és Storage Partitioning*: Safari ITP és Chrome Incognito módban a böngészők szigorúan korlátozzák a cross-site azonosító sütiket és session storage-ot, ami ritkán meghiúsíthatja az átirányítás visszatérését, ha a Firebase Auth nem egyedi elsődleges aldomainre van konfigurálva.
  - *PWA Standalone élmény*: Telepített (home screenre mentett) PWA esetén az átirányítás iOS-en kiléptetheti a felhasználót a Safari böngészőbe a standalone konténerből.

---

## 7. Elkészült lépések
- **1. lépés: Alapváz, dizájnrendszer, navigáció** *(KÉSZ)*
  - Hash-alapú router, sötét/világos téma localStorage-ban mentve, SVG gyűrűk, Performance Lab 2×2 rács és aloldalak, Journal üres állapot, More beállítások.
- **2. lépés: Hibajavítás + Firebase bejelentkezés és profil** *(KÉSZ)*
  - Firebase v11.0.2 integráció (Auth, Firestore), e-mailes belépés és regisztráció, profilkezelés a More fülön, e-mail megerősítési sáv.
- **2B lépés: Elrendezés-hiba javítása + Google-belépés** *(KÉSZ)*
  - Elrendezés-hiba diagnózisa és teljes körű javítása (mobil alsó sáv és asztali sticky oldalsáv), Google-belépés popup + redirect, 18+ validáció az onboardingban.
- **2C lépés: Firebase-projekt cseréje (lockinlab)** *(KÉSZ)*
  - Új Firebase projekt konfiguráció (`lockinlab`), régi azonosítók teljes körű törlése, tiszta auth állapotkezelés.
- **2D lépés: Google-belépés, e-mailek, görgethető ablak** *(KÉSZ)*
  - **Google-belépés hibakezelés és diagnózis**:
    - Teljes körű konzol hibalogolás (`code` és `message`).
    - Felhasználói felületen az általános szöveg alatt kis szürke betűkkel megjelenő hibakód (`Hibakód: auth/...`), visszaellenőrizhetőséget biztosítva.
    - Érthető magyar üzenetek a leggyakoribb kódokhoz (`auth/operation-not-allowed`, `auth/unauthorized-domain`, `auth/popup-blocked`, `auth/invalid-api-key`, `auth/internal-error`, `auth/network-request-failed`).
    - `file://` protokoll detektálása és elutasítása útmutatással (helyi szerver szükséges).
    - `localhost` vs `127.0.0.1`: a Firebase Konzolban alapértelmezésben a `localhost` van az engedélyezett domainek között, a `127.0.0.1` nincs. A hibaüzenet közvetlenül a `localhost` használatára irányítja a felhasználót.
  - **E-mailek lokalizációja és viselkedése**:
    - `auth.languageCode = 'hu'` beállítása: a kiküldött levelek sablonja magyar nyelvű.
    - `sendEmailVerification` és `sendPasswordResetEmail` aszinkron kezelése, hiba esetén pontos kódkijelzéssel.
    - Jelszó-visszaállításnál az e-mail enumeráció elleni védelem miatt semleges, biztonságos visszajelzés ("Ha ehhez az e-mail-címhez jelszavas fiók tartozik, elküldtük a levelet...").
    - Megerősítő e-mail újraküldő gombján 60 másodperces visszaszámláló cooldown, siker esetén "Elküldtük. Nézd meg a Spam mappát is." felirattal. Google fiókoknál (automatikus hitelesítés) a sáv rejtett.
  - **Általános görgethető Sheet / Modal komponens**:
    - `max-height: min(90dvh, calc(100% - 24px))` konténer flexibilis oszlopos elrendezéssel.
    - Fix fejléc és rögzített lábléc (a Mentés/Mégse/Törlés gombok minden képernyőméreten és kis magasság esetén is mindig láthatók és elérhetők).
    - `modal-body`: `flex: 1 1 auto; min-height: 0; overflow-y: auto; overscroll-behavior: contain; -webkit-overflow-scrolling: touch;`.
    - Háttérgörgetés zárolása nyitott állapotban (`body.modal-open`), záráskor tiszta visszaállítás.
    - Mobil billentyűzet felnyílásakor a fókuszált mező automatikus láthatósága (`scrollIntoView`).
- **2E lépés: A menü nem jelenik meg belépés után (Hibajavítás)** *(KÉSZ)*
  - **A hiba gyökéroka**:
    - A menü elrejtését a `.app-layout.auth-mode .app-nav, .app-layout.auth-mode .mobile-header { display: none !important; }` CSS szabály vezérli.
    - Korábban az `updateLayoutMode()` függvény adta hozzá és vette le az `.auth-mode` osztályt az `.app-layout` elemről, de ez kizárólag az `onAuthStateChanged`-ben és a `handleUnder18`-ban futott le, a központi `render()` függvény magától soha nem szinkronizálta a layout állapotát.
    - Amikor egy új felhasználó regisztrált, vagy egy Google-fiókkal először belépő felhasználó az Onboardingra került, az `.app-layout` megkapta az `auth-mode` osztályt. Az Onboarding űrlap sikeres beküldésekor (`handleSaveOnboarding`) azonban az `updateLayoutMode()` egyáltalán NEM futott le, és közvetlen `render()` sem hívódott meg, csak egy `navigateTo('#/home')` hash navigáció történt. Mivel a `render()` nem kapcsolta le az `auth-mode` osztályt, az rajta maradt a konténeren: emiatt a menüsor (`#app-nav`) és a mobil fejléc (`.mobile-header`) rejtve maradt mindaddig, amíg a felhasználó F5-tel nem frissítette a teljes oldalt.
    - Ráadásul az alkalmazás állapota több változó között volt szétszórva (`authState`, `currentUser`, `userProfile`), és hiányzott az egyetlen forrású állapotmodell.
  - **Megoldás és determinisztikus állapotgép**:
    - **Egyetlen állapot-forrás**: `state.status: 'loading' | 'signedOut' | 'onboarding' | 'ready'`.
    - Minden állapotváltó metódus (`initAuth`, `handleLogin`, `handleRegister`, `handleGoogleSignIn`, `handleSaveOnboarding`, `handleUnder18`, `handleSignOut`) kizárólag ezen az állapoton keresztül fut, és minden változás azonnal meghívja a `render()`-t.
    - **Központi elrendezés- és láthatóság-szinkronizálás**: `syncLayoutVisibility()` a `render()` legelső sorában fut le deklaratív módon. Ha `state.status === 'ready'`, azonnal eltávolítja az `auth-mode` osztályt és láthatóvá teszi a navigációt (`display: ''`, `aria-hidden` eltávolítva); minden más állapotban (`loading`, `signedOut`, `onboarding`) az `auth-mode` aktív és a menü rejtett.
    - Kijelentkezéskor a Firestore `onSnapshot` figyelők leiratkoznak (`cleanupSubscriptions()`), a `journalActivities` és `todayActivities` tömbök kiürülnek, és a `state.status` azonnal `signedOut`-ra vált.
    - Teljesen mentes az időzítős foltozástól (`setTimeout`) és az oldal-újratöltéstől (`location.reload`).
- **3. lépés: Activity Journal alapjai** *(KÉSZ)*
  - **Adatmodell és Firestore gyűjtemény**: `users/{uid}/activities/{activityId}` (`category`, `type`, `title`, `note`, `startAt`, `dateKey`, `durationMin`, `rpe`, `feelAfter`, `load`, `strain`, `source: "manual"`, `createdAt`, `updatedAt`).
  - **Kategóriák és típusok**: 4 fő kategória (`training`, `recovery`, `mental`, `event`) 24 bővíthető altípussal az `ACTIVITY_TYPES` konfigurációban és `T.journal.types` szótárban.
  - **Strain-számítási modul**: `calcStrain(rpe, durationMin)` és napi aggregált `calcDayStrain(activities)` (nem a strainek, hanem az összegzett terhelések exponenciális telítődése alapján: `21 * (1 - e^(-totalLoad / 400))`).
  - **Journal nézetek**:
    - **Lista nézet**: Dátum szerint csoportosított napok (Mai nap, Tegnap, formázott dátumok), fejlécben napi összegzett strain, kattintható activity kártyák típusikonnal, idővel, RPE-vel, érzet emojival és egyéni strain badge-dzsel.
    - **Naptár nézet**: Hétfői kezdésű havi naptárrács, napcella strain színintenzitási szintekkel (0–6 halvány, 7–13 közepes, 14–21 erős), kategória pöttyökkel, kiválasztott nap kártyalistájával és "Hozzáadás ehhez a naphoz" gombbal.
    - **Hónapváltás**: Előző/következő hónap navigáció dinamikus felirattal és Firestore lekérdezési tartomány-váltással.
    - **Üres állapot**: Barátságos üres állapot képviselő kártya gyorsactivity rögzítés gombbal.
  - **Új / szerkesztő űrlap (Bottom Sheet & Modal)**: Mobilon alulról felcsúszó lap (bottom sheet), asztalin középre zárt modális ablak. ESC billentyűvel és háttérre koppintással bezárható. Dinamikus típusválasztó kategóriánként, RPE csúszka élő felirattal és értékkel, 1–5 érzet gombok emojikkal, valós idejű strain előnézet, beépített magyar validáció, szerkesztésnél megerősítéses "Törlés" gomb.
  - **Home integráció**: A Home "Terhelés" (Strain) gyűrűje valós időben összekötve a MAI nap activityjeivel a `calcDayStrain` segítségével. Ha ma nincs bejegyzés: `0,0` és "Ma még nincs bejegyzés". Ezen a gyűrűn nincs mintaadat jelvény.
  - **Valós idejű szinkron**: Firestore `onSnapshot` az aktuális hónapra és a mai napra, azonnali frissüléssel felvitelkor/módosításkor/törléskor, tiszta leiratkozási életciklussal.
- **4. lépés: Reggeli check-in, alvás-számítás, Home valós adatokkal** *(KÉSZ)*
  - **Adatmodell és Firestore gyűjtemény**: `users/{uid}/checkins/{dateKey}` (`bedTime`, `sleepTime`, `wakeTime`, `upTime`, `awakeMin`, `timeInBedMin`, `sleepMin`, `sleepEfficiency`, `sleepQuality`, `restedness`, `soreness`, `mood`, `stress`, `restingHr`, `hrv`, `tags`, `note`, `readiness`, `readinessVersion: 1`, `createdAt`, `updatedAt`). Naponta egy dokumentum, mentéskor `setDoc` és `{ merge: true }`.
  - **Alvás-számítási modul (`calcSleepMetrics`)**:
    - Időpontok és éjszakai ébrenlét feldolgozása, szigorúan támogatva az éjfélen átnyúló alvási ciklusokat:
      - `timeInBedMin = upTime - bedTime`
      - `sleepMin = (wakeTime - sleepTime) - awakeMin`
      - `sleepEfficiency = Math.round((sleepMin / timeInBedMin) * 100)`
    - Beépített validáció: ágyban töltött idő maximum 16 óra (960 perc), ébrenlét nem haladhatja meg a nyers alvási időt, tiszta alvásidő nem lehet negatív.
    - Ellenőrző példa verifikálva: 23:00, 23:15, 06:30, 06:45, 3 perc ébrenlét -> 7 ó 45 p ágyban, 7 ó 12 p tiszta alvás (432 perc), 93% hatékonyság.
  - **Készenlét (Readiness) pontszám képlet (`calcReadiness`)**:
    - Kérdőív-alapú súlyozott modell (`SLEEP_NEED_MIN = 480` perc alapértelmezett igénnyel):
      - Alvásidő komponens: súly = 0.25
      - Alvásminőség: súly = 0.15
      - Kipihentség: súly = 0.20
      - Izomláz/fáradtság (inverz): súly = 0.15
      - Hangulat: súly = 0.10
      - Stressz (inverz): súly = 0.15
    - Ellenőrző teszt verifikálva: 432 perc alvás, minőség: 4, kipihentség: 3, izomláz: 2, hangulat: 4, stressz: 2 -> pontosan **74** pont.
  - **Reggeli check-in modal és felület**:
    - 2D lépésben kialakított reszponzív sheet/modal komponens, ESC és backdrop bezárással, mobil fókusz görgetéssel (`scrollIntoView`).
    - Alvás blokk 4 időponttal, ébrenléti perccel és élő előnézettel (`updateLiveSleepPreview`).
    - Előtöltés: meglévő mai check-in szerkesztésekor a rögzített értékekkel; új kitöltéskor a `localStorage` legutóbbi alvási időpontjaival (`lockin_last_sleep_times`).
    - 5 db 1–5-ös értékelő skála végpontfeliratokkal (min. 44px magasságú érintőgombokkal).
    - Opcionális mért értékek (nyugalmi pulzus 25–220 bpm, HRV 5–300 ms).
    - Körülmény-címkék választható toggle chipekkel (`sick`, `travel`, `alcohol`, `lateTraining`) és megjegyzés (max. 300 karakter).
  - **Home integráció valós adatokkal**:
    - **Mai teendők 1. sora**: Ha nincs mai check-in -> "Reggeli check-in" + "1 perc" gomb (megnyitja az űrlapot); ha kész -> pipa, "Reggeli check-in elvégezve" és "Szerkesztés" link.
    - **ALVÁS gyűrű**: Ha nincs kitöltve -> "—" és "Töltsd ki a check-int" (nincs minta badge); ha kitöltve -> óra és perc kijelzés (pl. "7 ó 12 p"), "Hatékonyság 93%" felirat, a gyűrű íve pedig az alvásidő / 480 perc aránya. Színkód: hatékonyság alapján (zöld >= 85%, sárga >= 70%, piros < 70%).
    - **KÉSZENLÉT gyűrű**: Ha nincs kitöltve -> "—" és "Töltsd ki a check-int" (nincs minta badge); ha kitöltve -> a becsült pontszám (pl. "74"), alatta "kérdőív alapján", kis szürke "Becsült" badge (`.badge-estimated`). Színkód: 67–100 zöld, 34–66 sárga, 0–33 piros.
    - **"Miért?" kártya**: Dinamikus magyarázat a 2 legrosszabb értékelési tényező levonási rangsora alapján (`súly * (1 - komponens)`), pl. "Fő tényezők: kipihentség 3/5, alvásminőség 4/5. A készenléti szinted (74 / 100)..." Ha van check-in, nincs rajta minta badge.
- **5. lépés: Alvás-áttekintő (Performance Lab → Regeneráció)** *(KÉSZ)*
  - **Check-in dátumválasztó**:
    - Dátummező a reggeli check-in űrlapon (alapérték: ma, legfeljebb 14 nappal visszamenőleg, jövőbeli dátum tiltva `min` és `max` attribútumokkal és kliensoldali validációval).
    - Dokumentum-azonosító: `users/{uid}/checkins/{dateKey}`.
    - Ha a kiválasztott napra már létezik bejegyzés a Firestore-ban, a rendszer automatikusan betölti és szerkesztési módban jeleníti meg az adatokat (`loadCheckinDateData`).
    - A Home felület továbbra is kizárólag a MAI check-in alapján működik.
  - **Alvásigény a profilban (`sleepNeedMin`)**:
    - Új mező a `users/{uid}` dokumentumban: `sleepNeedMin` (egész szám, 300–720 perc [5 ó – 12 ó], alapérték: 480 perc).
    - Az Alvás-oldalon "Alvásigényed: X ó YY p" sáv és "Módosítás" gomb.
    - Kis modális ablak (`openSleepNeedModal`) élő léptetővel (15 perces lépésközök: − / + gombok), csúszkával és perces megjelenítéssel.
    - A Home Alvás gyűrűje és a `calcReadiness` automatikusan ezt a dinamikus értéket használja a korábbi fix `SLEEP_NEED_MIN` helyett.
  - **Navigáció és útvonalak**:
    - `#/lab/recovery`: az "Alvásminták és alváshigiénia" kártya aktív linkké vált, és a `#/lab/recovery/sleep` aloldalra navigál.
    - Home: az Alvás gyűrű kártyája (`.ring-card-clickable`) közvetlenül a `#/lab/recovery/sleep` oldalra viszi a sportolót.
    - Működő "Vissza a Regenerációhoz" link és böngészős előre-hátra előzménytár támogatás.
  - **Alvás-oldal (`#/lab/recovery/sleep`)**:
    - **Időszak-választó**: 7 / 14 / 30 nap szegmentált vezérlő, dinamikus Firestore tartományi lekérdezéssel (`orderBy(documentId())`), ami composite index nélkül is villámgyors.
    - **Összesítő statisztikai kártyák** ("N éjszaka adatából"):
      - *Átlagos alvás*: kitöltött éjszakák tiszta alvásának átlaga (ó p formátumban).
      - *Átlagos ágyban*: ágyban töltött idő átlaga (ó p formátumban).
      - *Hatékonyság*: kitöltött éjszakák összes alvásideje / összes ágyban töltött idő × 100, kerekítve.
      - *Alvásadósság*: az utolsó 7 naptári nap kitöltött éjszakáira $\sum(\max(0, \text{alvásigény} - \text{alvás}))$.
      - *Lefekvés rendszeressége*: a lefekvési időpontok (18:00 óta eltelt percek) populációs szórása ($\sigma = \sqrt{\frac{\sum (x - \mu)^2}{N}}$), legalább 4 nap esetén. Minősítés és színkód: $\le 30$ perc "Nagyon rendszeres" (zöld), $31\dots60$ perc "Elfogadható" (sárga), $> 60$ perc "Ingadozó" (piros).
    - **Grafikon 1: Alvás és ágyban töltött idő**:
      - Reszponzív natív SVG (`viewBox="0 0 600 210"`).
      - Oszlopdiagram: halvány kék sáv az ágyban töltött idő, belső telt kék sáv a tiszta alvás, szaggatott vonal az egyéni alvásigénynél.
      - A hiányzó napok üres hellyel jelennek meg.
    - **Grafikon 2: Alvásablak (Sleep Window)**:
      - Reszponzív natív SVG lebegő sávdiagram a 18:00–12:00 közötti 18 órás (1080 perces) függőleges időtengelyen.
      - Éjfél (00:00) vastagabb ráccsal kiemelve.
      - Halvány kék lebegő sáv a lefekvéstől felkelésig (`bedTime` – `upTime`), telt kék sáv az elalvástól ébredésig (`sleepTime` – `wakeTime`).
    - **Interaktivitás és üres állapotok**:
      - Bármelyik grafikon oszlopára koppintva/kattintva a grafikonok alatti információs doboz azonnal kiírja a kiválasztott éjszaka részletes adatait (dátum, alvás, ágyban, hatékonyság, alvásablak).
      - Ha a választott időszakban kevesebb mint 3 check-in van: "A trendhez legalább 3 check-in kell" barátságos üres állapot.
    - **Napi naplólista (Alvástörténet)**:
      - Legújabb dátum elöl, dátumcsoport felirattal, alvásidővel, hatékonysággal, alvásablakkal, kipihentséggel és címkékkel.
      - Kattintásra az adott nap check-in űrlapja azonnal megnyílik szerkesztésre.
    - **Alváshigiénia kártya**:
      - Letisztult, lenyitható harmonika (accordion) kártya, tetején és alján tudományos/orvosi figyelmeztetéssel, 8 gyakorlati és sporttudományi tipp-ponttal a `T.sleep.hygiene` szótárból.
    - **Valós idejű szinkronizáció**:
      - `subscribeSleepPeriod(uid, periodDays)`: Firestore `onSnapshot` feliratkozás `documentId()` tartománnyal, az időszak váltásakor azonnali újratöltéssel, útvonalváltáskor és kijelentkezéskor tiszta leiratkozással (`cleanupSubscriptions`).
  - **Ellenőrző adatsor (5 napos verifikációs teszt)**:
    - Tesztadatok:
      - D-4: 23:15–07:00 (465p ágyban), elalvás 23:30, ébredés 06:45, 3p ébren (432p alvás, 93%)
      - D-3: 00:00–07:15 (435p ágyban), elalvás 00:20, ébredés 07:00, 10p ébren (390p alvás, 90%)
      - D-2: 23:00–07:00 (480p ágyban), elalvás 23:15, ébredés 06:50, 5p ébren (450p alvás, 94%)
      - D-1: 23:45–07:15 (450p ágyban), elalvás 00:10, ébredés 07:00, 10p ébren (400p alvás, 89%)
      - D: 23:30–06:40 (430p ágyban), elalvás 23:40, ébredés 06:30, 5p ébren (405p alvás, 94%)
    - Eredmények 480 perces (8 óra) alvásigénynél:
      - Átlagos alvás: **6 ó 55 p** (415.4 perc)
      - Átlagos ágyban: **7 ó 32 p** (452 perc)
      - Hatékonyság: **92%** (2077 / 2260 × 100)
      - Alvásadósság: **5 ó 23 p** (323 perc hiány a kitöltött 5 éjszaka alapján)
      - Lefekvés szórása: **31 perc** (minősítés: "Elfogadható", sárga szín)
    - 450 perces (7 ó 30 p) alvásigénynél:
      - Alvásadósság: **2 ó 53 p** (173 perc)

- **6. lépés: Megosztás-kép az activitykhez** *(KÉSZ)*
  - **Activity-részletek nézet (`openActivityDetailsModal`)**:
    - Az activity-kártyára koppintva (a Journal listában és a naptár kiválasztott napi listájában is) immár nem a szerkesztő, hanem egy letisztult, csak olvasható előugró lap nyílik meg.
    - Csak a létező adatok jelennek meg: kategória-jelvény, típus és egyéni cím, dátum és kezdési idő, strain (0–21 skálával), időtartam, RPE megerőltetés szöveges értékeléssel, érzet utána emojival és felirattal, valamint megjegyzés.
    - Gombsor a lap alján:
      - *Megosztás* (elsődleges, kék kiemelt gomb ikonnal) $\rightarrow$ megnyitja a Megosztás-lapot.
      - *Szerkesztés* (másodlagos gomb) $\rightarrow$ megnyitja a meglévő szerkesztő űrlapot (a törlés funkció a szerkesztőben maradt).
  - **Megosztás-lap (`openShareModal`)**:
    - Általános sheet komponens fix fejléccel és görgethető törzzsel.
    - **Valós idejű előnézet**: A lap tetején megjelenő kép kicsinyítve, reszponzívan skálázva látszik, miközben a háttérben natív teljes felbontásban készül el az offscreen Canvas-en. A vezérlők módosításakor 100 ms késleltetéssel (debounce) automatikusan újrarajzolódik.
    - **Kártya-téma választó**: Sötét (`#0A0C0F` háttér, `#12161B` felület) és Világos (`#F6F7F9` háttér, `#FFFFFF` felület). Alapértelmezett értéke megegyezik az alkalmazás éppen aktív témájával.
    - **Műveleti gombok és API integráció**:
      - *Kép másolása*: `navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])`. Ha a böngésző nem támogatja a közvetlen képmásolást vágólapra vagy nem biztonságos a kontextus, barátságos magyar figyelmeztető üzenet jelenik meg, amely a Letöltés gombra irányítja a felhasználót.
      - *Letöltés (PNG)*: szabványos letöltés `lockin-{típus}-{dateKey}.png` fájlnévvel.
      - *Megosztás*: `navigator.canShare({ files: [file] })` támogatás esetén natív megosztó ablakot indít (`navigator.share`). A felhasználó általi megszakítást (`AbortError`) a rendszer nem kezeli hibaként. Nem támogatott böngészőben a gomb rejtett marad.
      - *Erőforrás-kezelés*: Minden generálás helyben, 100%-ban a böngésző memóriájában fut (Canvas). Nincs felhőbe való feltöltés, nincs Storage-költség, és a blob URL-ek (`URL.revokeObjectURL`) minden állapotváltáskor és ablakzáráskor automatikusan felszabadulnak.
  - **Bővíthető adat-regiszter (`SHARE_FIELDS`)**:
    - Moduláris struktúra: minden elemhez `key`, dinamikus felirat `T`-ből, `defaultChecked` pipa, `available(activity)` feltétel és saját `draw(ctx, area, activity, tokens, options)` rajzoló függvény tartozik.
    - *Jelenleg elérhető elemek (alapértelmezett pipával)*:
      - Típus és cím (be), Dátum (be), Időtartam (be), Strain (be), RPE (be), Érzet utána (ki), Megjegyzés (ki, max. 3 sor tördelve), Kezdési idő (ki), Név (ki, profilnév).
    - *Előkészített elemek (automatikus "Nincs adat ehhez az activityhez" inaktív állapottal)*:
      - Útvonal-rajz (`activity.route`), Pulzus-grafikon (`activity.hrSeries`), Távolság (`activity.distanceM`), Tempó (`activity.paceSecPerKm`), Átlagpulzus (`activity.avgHr`), Max pulzus (`activity.maxHr`), Szintemelkedés (`activity.elevationGainM`).
  - **Útvonal-rajzoló és Haversine adatvédelmi zóna**:
    - `activity.route = [[lat, lon], ...]`: kizárólag a mozgásvonal rajzolódik ki konformális equirectangular vetülettel, térkép-csempék, tengelyek és feliratok nélkül.
    - Beépített adatvédelmi opció (alapból BEKAPCSOLT jelölőnégyzet a megosztás-lapon): *„Kezdő és végpont elrejtése (200 m)”*, amely Haversine távolságszámítással levágja az útvonal elejéről és végéről a 200–200 méteres védelmi zónát (otthon/munkahely védelme). Ha a vágás után 2 pontnál kevesebb marad, a kártyán tájékoztató szöveg jelenik meg.
  - **Pulzus-grafikon rajzoló**:
    - `activity.hrSeries = [{t, bpm}, ...]`: letisztult vonalgrafikon tengelyszámok nélkül, a kártya stílusához illeszkedő, lefelé áttetszővé váló gradiens kitöltéssel.
  - **Kártya dizájn és márkasáv szabályzat**:
    - Arányos és vertikálisan kiegyensúlyozott elrendezés (ha kevés adat van bekapcsolva, a tartalom függőlegesen középre zár és nem torzul; ha sok adat van, arányosan igazodik a formátum magasságához).
    - **MÁRKASÁV (Brand Bar)**: a kártya alján fixen megjelenik a "Lockin" szóvédjegy és a logó, valamint a szlogen. Ezt a felhasználó NEM tudja kikapcsolni (nincs a regiszterben, nincs jelölőnégyzete), és akkor is hibátlanul kirajzolódik, ha az összes adatmező ki van kapcsolva. A logó betöltését az aszinkron `loadBrandLogo` megvárja a rajzolás előtt; hiányzó képfájl esetén elegáns szöveges szóvédjegy jelenik meg.
  - **Tesztelés és verifikáció**:
    - Az útvonal- és pulzusrajzoló függvények mock adatsorral verifikálva lettek; a kódban éles futáskor SEMMILYEN ideiglenes teszt-adat nem maradt.
    - A Web Share API mobilon és asztalin biztonságos (HTTPS) környezetet követel meg; helyi hálózatról vagy nem HTTPS környezetből való teszteléskor a fallback Letöltés / Másolás azonnal elérhető.

- **6B. lépés: Átlátszó (Strava-szerű) megosztás-matrica** *(KÉSZ)*
  - **Átlátszóság és alfa-csatorna**:
    - Új Háttér-választó: **Átlátszó** (alapértelmezett), **Sötét**, **Világos**.
    - Átlátszó módban a vászon `clearRect`-tel tisztul; egyetlen pixel sem kap szilárd háttérszínt (`ctx.fillRect` kizárva). A sarokpixelek alfa-értéke szigorúan 0 (`getImageData(0,0,1,1).data[3] === 0`).
    - Nincsenek szilárd csempe-hátterek (a `tokens.surface` értéke `null`), csak finom, áttetsző körvonalak és szellős térközök.
    - Az export szigorúan `canvas.toBlob(..., 'image/png')`, amely megtartja a teljes 32-bites RGBA alfa-csatornát.
  - **Olvashatóság saját fotón (Monokromatikus dizájn és soft árnyék)**:
    - **Szövegszín választó**: Fehér (alapértelmezett) / Fekete. Átlátszó módban minden elem (szövegek, számok, strain gyűrű, grafikonok, elválasztók, jelvények) szigorúan monokromatikus, az akcentus- és kategóriaszínek mellőzésével. A másodlagos elemek (címkék, gyűrű-nyomvonal, finom keretek) 25–40% alfa áttetszőséggel jelennek meg. Sötét és Világos módban a korábbi színes jelvények és felületek érvényesülnek.
    - **Árnyék a jobb olvashatóságért**: Alapértelmezetten BEKAPCSOLT kapcsoló. Lágy drop-shadow (`blur: 12px`, `offsetY: 3px`, fehér szövegnél sötét `rgba(0,0,0,0.45)`, fekete szövegnél világos `rgba(255,255,255,0.50)`). A kártya margói (oldalt 64 px, fent és lent 50 px) biztonsági zónát adnak, így az árnyék nem vágódik le a kép szélén.
    - **Vastagabb vonalak**: Az útvonal (vonalvastagság: 8 px) és a pulzusgörbe (vonalvastagság: 6 px) lekerekített végekkel és csatlakozásokkal (`round`) rajzolódik ki a fotók feletti tiszta láthatóságért.
  - **Logó MINDIG legfelül**:
    - A kártya alján lévő korábbi márkasáv megszűnt. A logó fixen a kártya tetején, középre zártan jelenik meg.
    - Aszinkron betöltés (`loadBrandLogo` Promise): fehér szöveghez és sötét kártyához `logo-dark-mode`, fekete szöveghez és világos kártyához `logo-light-mode`, memóriában gyorstárazva (`cachedBrandLogos`). Ha a képfájl hiányzik, szöveges "Lockin" szóvédjegy jelenik meg tartalékként. A logó nem kikapcsolható, nincs jelölőnégyzete, üres kártyán is látható.
  - **Dinamikus matricamagasság és kétmenetes rajzolás (`measure` / `draw`)**:
    - Szélessége 1080 px, magassága a bekapcsolt adatok méretéhez mért (`padTop + logoH + logoGap + contentH + padBottom`), így az exportált PNG nem tartalmaz felesleges üres sávot alul.
    - Kétmenetes rajz: a `SHARE_FIELDS` regiszter elemei rendelkeznek `measure(ctx, width, activity, options)` és `draw(ctx, area, activity, tokens, options)` függvénnyel. Először a rendszer kiszámítja a szükséges canvas-magasságot, beállítja a `canvas.height` értékét, majd kirajzolja a tartalmat.
  - **Interaktív előnézeti háttér**:
    - **Kockás (alapértelmezett)**: CSS-ben generált sakktábla minta a téma színeivel, amely azonnal láthatóvá teszi az átlátszóságot.
    - **Sötét és Világos**: Szilárd színű előnézeti háttér összehasonlító teszteléshez.
    - **Saját fotó**: Fájlválasztó (`<input type="file" accept="image/*">`), amellyel a felhasználó a saját fotóját töltheti be a matrica mögé (`object-fit: cover`). A kép kizárólag a kliens memóriájában él (Blob URL), nincs hálózati feltöltés, ablakzáráskor vagy cserekor a memóriacím automatikusan felszabadul (`URL.revokeObjectURL`).
    - Tájékoztató felirat a felületen: *„A kockás mező átlátszó. A letöltött és kimásolt PNG-ben nincs háttér.”*
  - **Vágólap és letöltés viselkedése**:
    - *Kép másolása*: `navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])` megtartva az átlátszóságot.
    - Tájékoztató a felületen: *„Néhány alkalmazás beillesztéskor fehér vagy fekete háttérre lapítja a képet. Ha ez történik, használd a Letöltés gombot!”*
    - *Letöltés*: Átlátszó módban a fájlnév formátuma: `lockin-{típus}-{dateKey}-atlatszo.png`, szilárd módban `lockin-{típus}-{dateKey}.png`.

- **7. lépés: Matrica-finomítás + Idegrendszeri mérések és személyes alapvonal** *(KÉSZ)*
  - **A) Megosztás-matrica finomítása**:
    - **Új fejléc-blokk (Header Block)**:
      - Mindig a kép legtetején, középre zártan jelenik meg.
      - Első sor: A logó és közvetlenül mellette a "Lockin" név; ha a logókép hiányzik, tartalékként kizárólag a "Lockin" felirat jelenik meg középre igazítva, logó-kihagyás nélkül.
      - Második sor (alatta): "Performance Lab" alcím visszafogott szürkével (fehér szövegnél `rgba(255,255,255,0.6)`, fekete szövegnél `rgba(0,0,0,0.55)`, sötét kártyán `#8E99A6`, világos kártyán `#64748B`). Az árnyék-beállítás erre a blokkra is érvényesül.
      - A fejléc-blokk kötelező és állandó: nem kapcsolható ki és nem szerepel a választható mezőregiszterben. A tartalom alatta kezdődik.
    - **Fix, adat-vezérelt méret**:
      - A fix formátumok (4:5, 1:1, 9:16) és a formátum-választó véglegesen eltávolítva a felületről és a kódból.
      - A kép szélessége mindig fixen 1080 px; a kép magassága dinamikusan, kétmenetes méréssel alkalmazkodik a bekapcsolt mezőkhöz (~60 px margóval).
      - Ha minden adat ki van kapcsolva (`activeFields.length === 0`), a kép kizárólag a fejléc-blokkot tartalmazza (nem rajzol üres kártyatestet).
  - **B) Idegrendszeri mérések (`#/lab/recovery/nervous`)**:
    - **Navigáció**: A Regeneráció pillér (`#/lab/recovery`) "Idegrendszeri mérések" kártyája aktív link a `#/lab/recovery/nervous` aloldalra; fejlécben vissza-gombbal és böngésző-előzményekkel.
    - **Adatforrás és kizárási beállítás**:
      - Forrás: a reggeli check-inek `restingHr` (nyugalmi pulzus, bpm) és `hrv` (rMSSD, ms) mezői.
      - Új beállítás a `users/{uid}` dokumentumban: `baselineExcludeTagged` (logikai, alapérték: `true`).
      - Oldali kapcsoló: *"Beteg, utazásos és alkoholos napok kihagyása az alapvonalból"*. Bekapcsolt állapotban a `sick`, `travel`, `alcohol` címkékkel ellátott napok kimaradnak az alapvonal-számításból.
      - Adatlekérés: `onSnapshot` az utolsó 60 napra `orderBy(documentId())` tartományi lekérdezéssel összetett Firestore index nélkül; útvonalváltáskor és kijelentkezéskor tiszta leiratkozási életciklussal.
    - **Személyes alapvonal modul (`calcRhrBaseline`, `calcHrvBaseline`, `calc7DayMovingAvg`, `computeBaselinesFromCheckins`)**:
      - Ablak: az elmúlt 28 nap mérései a MAI nap NÉLKÜL (a mai érték nem torzítja a saját alapvonalát).
      - Minimum 14 mérés szükséges; addig az állapot *"Tanulunk (N/14)"*.
      - **HRV alapvonal**: ln(rMSSD) értékeken számított átlag és populációs szórás ($N$-nel osztva). Szórás alsó korlátja: 0,05. Normál sáv: $\text{meanLn} \pm 0,75 \times \text{effectiveSdLn}$, megjelenítéskor vissza-exponenciálva mértani középre és ms értékre.
      - **Nyugalmi pulzus alapvonal**: Nyers bpm értékek átlaga és populációs szórása ($N$-nel osztva). Szórás alsó korlátja: 1,0 bpm. Normál sáv: $\text{meanRhr} \pm 0,75 \times \text{effectiveSdRhr}$.
      - **7 napos mozgóátlag**: Az utolsó 7 naptári nap mérései (legalább 3 mérés megléte esetén, HRV-nél ln-átlag exponenciálva).
      - Állapot: a 7 napos mozgóátlag a sávon belül / felett / alatt van.
    - **Oldaltartalom**:
      - Időszak-választó: 14 / 30 / 60 nap.
      - "Személyes alapvonal" kártya (HRV és RHR sorok, státuszjelvény, normál sáv, 7 napos átlag).
      - Két reszponzív SVG grafikon (HRV és Nyugalmi pulzus) napi pontokkal, 7 napos átlag vonallal és halvány háttérsávval aktív alapvonal esetén; pontra koppintva interaktív infósávval.
      - "Jelzések" kártya (csak aktív alapvonalnál, ha az utolsó 3 napban legalább 2 mérés van; mindkét mutató eltérésekor kiemelt figyelmeztetés, egy mutató eltérésekor enyhébb tájékoztatás; kötelező "Ez nem diagnózis." zárással).
      - Összecsukható "Mérési útmutató" kártya 6 gyakorlati mérési szabállyal és orvosi felelősségkizárással.
      - Napi napló lista a check-in mérésekkel és címkékkel; koppintásra megnyitja a check-in szerkesztőt.
  - **C) Készenlét (Readiness) v2 képlet (`calcReadiness`)**:
    - Súlyozott komponensmodell (0–1 skála):
      - `sleep` (súly 0,20), `quality` (0,10), `rested` (0,15), `soreness` (0,10), `mood` (0,05), `stress` (0,10).
      - Ha az alapvonal aktív és van mai mérés:
        - $z_{\text{HRV}} = (\ln(\text{todayHrv}) - \text{meanLn}) / \text{effectiveSdLn} \rightarrow \text{hrvComp} = \text{clamp}(0,5 + 0,25 \times z_{\text{HRV}}, 0, 1)$ (súly 0,20).
        - $z_{\text{RHR}} = (\text{todayRhr} - \text{meanRhr}) / \text{effectiveSdRhr} \rightarrow \text{rhrComp} = \text{clamp}(0,5 - 0,25 \times z_{\text{RHR}}, 0, 1)$ (súly 0,10).
      - $\text{Readiness} = \text{round}(100 \times \sum(w_i \cdot c_i) / \sum(w_i))$. Mentéskor `readinessVersion: 2` és `isWithMetrics: boolean`.
      - Home Készenlét gyűrű jelvény: *"Becsült (kérdőív)"* vs. *"Becsült (kérdőív + mérések)"*.
      - Home "Miért?" kártya: a 2 legnagyobb súlyozott levonást okozó tényező kiírása, HRV és RHR esetén a mért értékkel és a normál sávval.
    - *Megjegyzés*: Ideiglenes képlet, a későbbi fázisokban cserélhető.
  - **Matematikai egység-ellenőrzési eredmények (verifikálva)**:
    - *Nyugalmi pulzus (14 érték: 50, 52, 48, 50, 51, 49, 50, 52, 48, 50, 51, 49, 50, 50)*:
      - Átlag: **50,0 bpm**
      - Populációs szórás: **1,1952 bpm**
      - Normál sáv: **49,1–50,9 bpm**
    - *HRV (14 érték: 60, 64, 58, 62, 66, 60, 57, 63, 61, 59, 65, 62, 60, 63 ms)*:
      - Mértani közép: **61,4 ms**
      - Számított ln-szórás: **0,0411** (< 0,05 alsó korlát, ezért az érvényes szórás **0,0500**)
      - Normál sáv: **59,1–63,7 ms**
    - *Készenlét v2 (alvás 432 p / 480 p igény, quality 4, restedness 3, soreness 2, mood 4, stress 2)*:
      - Mérésekkel (mai HRV 61 ms, mai RHR 50 bpm és aktív alapvonal): **66**
      - Kizárólag kérdőív alapján (nincs mai mérés vagy tanuló alapvonal): **74**
    - *Alapvonal aktiválási küszöb*: 13 mérésnél *"Tanulunk (13/14)"*, 14 mérésnél *"Aktív"*.

- **7B. lépés: Megosztás-előnézet javítása és hibatűrővé tétele** *(KÉSZ)*
  - **Gyökérok (Root Cause)**:
    - A 7. lépésben a kötött formátumok (4:5, 1:1, 9:16) törlésekor a `scale` változó megszűnt, azonban a `drawShareCard` ciklusában egy hivatkozás benne maradt: `currentY += actualH + gap * scale;`.
    - Emiatt bármilyen mező bekapcsolásakor azonnal fellépett egy `ReferenceError: scale is not defined` kezeletlen kivétel.
    - Mivel az `updateSharePreview` nem tartalmazott `try/catch` blokkot, a `setTimeout`-ban futó aszinkron Promise elutasítása elnyelődött: a `canvas.toBlob` sosem hívódott meg, a `previewImg.src` nem kapott értéket, és a kép üres maradt kizárólag az alternatív szöveggel (`alt`).
  - **Javítások és robusztus architektúra**:
    1. *Blokk-térköz számítás javítása*: `currentY += actualH + gap;`, valamint véges, pozitív vászonmagasság garantálása (`height >= 200`).
    2. *PNG és SVG logó prioritás*: A `loadBrandLogo` immár a PNG fájlokat részesíti előnyben (`logo-dark-mode.png` / `logo-light-mode.png`), és csak hiányuk/hibájuk esetén próbálja az SVG-t. SVG esetén explicit szélesség/magasság kerül beállításra (megelőzve a méret nélküli SVG-k Firefox alatti `drawImage` hibáit). Ha egyik sincs, a Promise tiszta `null` értékkel zárul.
    3. *Tainted canvas fallback*: Ha a `canvas.toBlob` biztonsági hibát (`SecurityError`) dobna egy külső/hibás SVG logó miatt, az `updateSharePreview` automatikusan egy új, tiszta vásznon megismétli a rajzolást logó nélkül (szöveges "Lockin" felirattal), figyelmeztetést naplózva a konzolra.
    4. *Blob URL élettartam és versenyhelyzet védelem*:
       - Kérés-azonosító token (`sharePreviewRequestId`): kizárólag a legutolsó debounce kérés eredménye kerül megjelenítésre, a közben elavult rajzok eldobódnak.
       - Az előző blob URL csak azután szabadul fel (`URL.revokeObjectURL`), hogy az új kép már sikeresen betöltődött a DOM-ban (`img.onload`).
    5. *Felületi hibakezelés*: Hiba esetén barátságos magyar hibaüzenet ("Nem sikerült elkészíteni a képet. Próbáld újra.") és "Újra" gomb jelenik meg a törött kép helyett, a részletes hiba a konzolra kerül.
  - **Verifikáció**: Mind a 180 kombináció (3 háttér × 2 szövegszín × 2 árnyék × 3 mezőkészlet × 5 logó-szcenárió) automatizált méréssel ellenőrizve: `width: 1080`, `height > 0`, `blob.size > 0`, átlátszó sarokpixel alfa = 0.
- **8. lépés: Üres állapotok, "Összes adatom törlése", hidratációs napló** *(KÉSZ)*
  - **A) Home: Valódi üres állapotok**:
    - Az összes "Minta adat" feliratú jelvény véglegesen eltávolítva a Home felületről.
    - "Miért?" kártya: ha van mai reggeli check-in, a két legnagyobb levonást okozó tényező jelenik meg szövegesen; ha nincs mai check-in, helyőrzőként barátságos felhívás látható: *"Töltsd ki a reggeli check-int, és megmutatjuk, mi áll a számok mögött."*
    - A "Mai javaslat" kártya és a Saját múlt / Csapat / Referencia chipsor ideiglenesen eltávolítva a valódi algoritmus megvalósításáig.
    - "Mai teendők": valós, számolt 3 elemű feladatlista közvetlenül kattintható elemekkel (kész állapotban pipával):
      1. *Reggeli check-in*: kész, ha van mai check-in; koppintásra megnyitja a check-in lapot.
      2. *Edzés vagy regeneráció naplózása*: kész, ha van mai activity (training, recovery vagy mental); koppintásra megnyitja az új activity lapot.
      3. *Hidratáció naplózása*: kész, ha van mai folyadékbejegyzés (a rögzített összeggel); koppintásra a hidratáció oldalra navigál.
    - Új fiókos üdvözlőkártya: ha a profil `createdAt` értéke az utolsó 7 napban van, és még semmilyen mai adat (check-in, activity, hidratáció) nincs rögzítve, a gyűrűk felett barátságos üdvözlőkártya jelenik meg két gyors műveletgombbal (Check-in, Új activity).
    - Üres fiók esetén a gyűrűk rendezett "—" és "0,0" állapotban jelennek meg.
  - **B) Összes adatom törlése (More fül -> Adatkezelés)**:
    - A More fülön új "Adatkezelés" szakasz piros figyelmeztető kártyával és "Összes adatom törlése" veszélyes gombbal (`.btn-danger`).
    - Megerősítő párbeszédablak (sheet modal):
      - Részletes leírás a visszavonhatatlan adatvesztésről és a megmaradó adatokról (fiók és alapbeállítások megmaradnak).
      - Megjeleníti az érintett gyűjtemények listáját (`activities`, `checkins`, `hydration`).
      - Biztonsági megerősítés: a jóváhagyás gomb kizárólag a pontos "TÖRLÉS" szó beírása után válik aktívvá.
    - Batch törlés és aszinkron életciklus:
      - Törlés előtt leiratkozás az összes aktív figyelőről (`cleanupSubscriptions`).
      - Ciklus a `USER_DATA_COLLECTIONS` (`activities`, `checkins`, `hydration`) konfiguráción, maximum 400 elemenként darabolt `writeBatch` törlésekkel.
      - Folyamatjelzés a modalban (*"Törlés… N elem törölve"*).
      - Befejezéskor a modal bezárul, a helyi állapot kiürül, az alkalmazás automatikusan újra feliratkozik az üres kollekciókra, azonnal frissül a felület oldal-újratöltés nélkül, és megjelenik a megerősítő értesítés (*"Minden rögzített adat sikeresen törölve."*). Hiba esetén magyar hibaüzenet és újrapróbálkozási lehetőség.
  - **C) Hidratációs napló (Performance Lab -> Táplálkozás -> Hidratáció, `#/lab/nutrition/hydration`)**:
    - A Táplálkozás pillérben (`#/lab/nutrition`) a "Hidratáció és elektrolit-háztartás" kártya aktívvá tétele "Megnyitás" linkkel; fejlécben vissza-gombbal és böngésző-előzményekkel.
    - Adatmodell: `users/{uid}/hydration/{entryId}` (`drinkType`, `amountMl`, `loggedAt`, `dateKey`, `hydrationFactor`, `caffeineMg`, `createdAt`, `updatedAt`) és `users/{uid}.hydrationGoalMl`.
    - `DRINKS` szótár (15 ital 3 BHI kategóriában):
      - *Kiemelkedő (1,3×)*: ORS (300 ml), Tej (250 ml), Csokis tej (250 ml), 100%-os gyümölcslé (250 ml).
      - *Víz-szintű (1,0×)*: Víz (300 ml), Szénsavas víz (300 ml), Izotóniás sportital (500 ml), Elektrolit-oldat (500 ml), Kókuszvíz (330 ml), Tea (250 ml, 20 mg/dl), Kávé (150 ml, 40 mg/dl), Hígított szörp (300 ml), Fehérje shake (350 ml), Szénsavas üdítő (330 ml, 10 mg/dl).
      - *Kevésbé hatékony (0,9×)*: Energiaital (250 ml, 32 mg/dl).
    - Dátumválasztó sáv lapozó nyilakkal ("Ma" és előző napok legfeljebb 14 nappal visszamenőleg; határoknál letiltott nyilakkal).
    - Összesítő kártya:
      - 4-es statisztikai rács: Nyers folyadék (`fmtMl`), Hatékony folyadék (BHI súlyozva), Koffein (mg), Utolsó koffein időpontja.
      - Napi cél sáv: ha van cél, folyamatjelző csík százalékkal és "Módosítás" gombbal; ha nincs cél, "Napi cél beállítása (opcionális)" gomb.
    - Folyadék rögzítése:
      - "⚡ Ismét" gomb: ha van előző bejegyzés a helyi állapotban, 1 koppintással azonnal újra rögzíti az utolsó italt és mennyiséget a mostani időponttal.
      - 15 kényelmes italcsempe kategóriapöttyel (zöld, kék, sárga), szorzóval és alapértelmezett adaggal.
      - Rögzítő modal gyors dl gombokkal (1, 2, 3, 5 dl), szabad ml bevitellel, időponttal és élő előnézettel (számolt hatékony ml és koffein mg).
    - Napi napló: időrendi növekvő lista (időpont, név, kategóriapötty, szorzó, koffein jelvény, ml), koppintásra szerkesztő/törlő modallal.
    - Heti SVG grafikon: az utolsó 7 nap oszlopai a nyers folyadékkal, szaggatott célvonal, oszlopválasztó infósáv, üres állapot ha < 2 nap van adattal.
    - Összecsukható tudományos kártya: a BHI mutató háttere (Maughan et al., 2016), a koffein és az alvásminőség élettana, valamint diszkrét orvosi felelősségkizárás.
  - **Matematikai és számítási verifikáció**:
    - *1. tesztnap (4 bejegyzés: Víz 300 ml, Kávé 150 ml, Tej 200 ml, Tea 250 ml)*:
      - Nyers összeg: **900 ml** (300 + 150 + 200 + 250)
      - Hatékony összeg (BHI): **960 ml** ($300 \times 1,0 + 150 \times 1,0 + 200 \times 1,3 + 250 \times 1,0 = 300 + 150 + 260 + 250$)
      - Összkoffein: **110 mg** ($150 \times 0,4 + 250 \times 0,2 = 60 + 50$)
      - Utolsó koffein időpontja: **15:30**
    - *+ Energiaital 250 ml (17:00)*:
      - Nyers összeg: **1 150 ml** (900 + 250)
      - Hatékony összeg (BHI): **1 185 ml** ($960 + 250 \times 0,9 = 960 + 225$)
      - Összkoffein: **190 mg** ($110 + 250 \times 0,32 = 110 + 80$)
      - Utolsó koffein időpontja: **17:00**

- **9. lépés: Csúszka-javítás + Ételtár és heti étkezési terv** *(KÉSZ)*
  - **A) Hibajavítás: Hidratációs napi cél csúszka**:
    - A csúszka alatti félrevezető számozott skála (`500 ml`, `2 500 ml`, `6 000 ml`) eltávolítva.
    - A kiválasztott érték kizárólag a csúszka FELETT látható ezres szóközzel tagolva (pl. "2 500 ml"), azonnal és élőben követve az `input` eseményt.
    - Érintésbarát léptető gombok (− és +, 50 ml lépésközökkel) és billentyűzetes nyílnavigáció támogatása.
    - A csúszka mellett balra és jobbra kizárólag a két végpont statikus címkéje látszik ("500 ml" balra, "6 000 ml" jobbra).
    - A megjelenített és mentett érték mindig szinkronban van a csúszka értékével (500–6000 ml közötti korlátozással).
  - **B) Ételtár (`#/lab/nutrition/foods`)**:
    - A Táplálkozás és hidratáció pillérben (`#/lab/nutrition`) új aktív almodulkártya: *"Ételtár"* (`#/lab/nutrition/foods`).
    - Adatmodell: `users/{uid}/foods/{foodId}`:
      - `name` (1–80 karakter), `per` ("serving" [1 adag] vagy "100g" [100 g]).
      - `kcal` (0–5000), `carbsG`, `proteinG`, `fatG` (0–1000, 1 tizedesre kerekítve).
      - `ingredients` (szöveg, max 1000 kar.), `method` (szöveg, max 3000 kar.).
      - `allergens` (tömb a 7 főbb kategóriából: `gluten`, `milk`, `egg`, `nuts`, `fish`, `soy`, `sesame`).
      - `favorite` (logikai), `createdAt`, `updatedAt`.
    - Felület:
      - Keresőmező ékezet- és kis/nagybetű-független valós idejű szűréssel (`normalizeSearchText`).
      - "Mind" és "Kedvencek" szűrőkapcsoló.
      - Ételkártya: név, adagolási alap jelvény ("1 adag" vagy "100 g"), azonnal kapcsolható szív/kedvenc gomb, makrók (CH, F, ZS és kcal), allergéncímkék, összetevők előnézete, kattintásra szerkesztő lap.
      - "+ Új étel" gomb és szerkesztő modal:
        - "Kalória számolása a makrókból" segédgomb ($4 \times \text{carbs} + 4 \times \text{protein} + 9 \times \text{fat}$).
        - Allergén toggle chipek és "Kedvencekhez adom" kapcsoló.
        - "Étel törlése" gomb megerősítéssel (a már rögzített étkezési bejegyzéseket nem érinti).
    - "Kalória megjelenítése" kapcsoló:
      - A felhasználói profilban mentődik (`users/{uid}.showCalories`, alapértelmezett értéke `true`).
      - Ha ki van kapcsolva, a kcal érték sehol sem látszik az ételtárban és az étkezési tervben, csak a makrotápanyagok (szénhidrát, fehérje, zsír).
  - **C) Heti étkezési terv (`#/lab/nutrition/meals`)**:
    - A Táplálkozás pillérben a "Makrotápanyag-periodizáció" kártya *"Étkezési terv"* néven aktív linkké vált.
    - Hét-navigáció: szigorúan hétfővel induló 7 napos hét lapozó nyilakkal, dinamikus magyar formázással (pl. "2026. nov. 2–8.") és "Ma" gombbal.
    - Reszponzív elrendezés (1100 px töréspont):
      - *Mobil / keskeny nézet (< 1100 px)*: 7 napos választósáv (H, K, Sze, Cs, P, Szo, V pill-ek nap-sorszámmal, a mai nap kiemelve), alatta a kiválasztott nap kártyája.
      - *Asztali nézet (≥ 1100 px)*: 7 oszlopos grid egymás mellett (`.meals-desktop-grid`), vízszintes oldalsó görgetősáv nélkül.
    - Alap étkezések: Reggeli (`breakfast`), Tízórai (`snack1`), Ebéd (`lunch`), Uzsonna (`snack2`), Vacsora (`dinner`) mindig látható, plusz "+ Új étkezés" gomb tetszőleges egyedi étkezés felvételéhez.
    - Étkezés-kártya:
      - Ételek listája: "Megettem" pipa-kapcsoló, étel neve és mennyisége, részletes makrók, kattintásra szerkesztő modal.
      - Étkezés részösszeg (makrók és kalória).
      - "+" gomb: étel hozzáadása modal 3 füllel:
        1. *Étel az ételtárból*: ételtár kereső, étel kiválasztása, adag/gramm léptető és élő számított makró-előnézet, "+ Új étel létrehozása" gyorsgomb.
        2. *Gyors hozzáadás*: egyedi név, makrók, kalóriaszámítás, és "Mentés az ételtárba is" opció.
        3. *Vonalkód-olvasás*: inaktív csempe "Hamarosan" jelvénnyel.
    - Napi összesítő kártya: "Tervezett" és "Megevett" sorok a napi szénhidrát, fehérje, zsír és kalória összegekkel magyar tizedesvesszős formázással.
    - "Előző hét betöltése" gomb: az előző hét étkezéseit átmásolja a jelenlegi hét üres napjaira (a már rögzített napokat nem írja felül), "Megettem" állapot nélkül (`eaten: false`), megerősítő kérdés után, folyamat végi darabszám-értesítéssel.
    - Pillanatkép (snapshot) elv: az étkezési bejegyzés (`mealEntries`) a hozzáadás pillanatában számított tápértékeket tárolja, így az ételtár későbbi módosítása vagy törlése nem változtatja meg a naplózott múltbeli adatokat.
    - Adattörlés integráció: az `USER_DATA_COLLECTIONS` konfiguráció kiegészítve `['activities', 'checkins', 'hydration', 'foods', 'mealEntries']` listára, így az "Összes adatom törlése" funkció mindkét új algyűjteményt kiüríti.
  - **Matematikai és számítási verifikáció (sikeresen lefutva)**:
    - *Zabkása (1 adag, 350 kcal, 55 g CH, 12 g F, 8 g ZS)* + *Csirkemell (150 g az alap 100g-os 165 kcal, 0 g CH, 31 g F, 3.6 g ZS értékekből)*:
      - Csirkemell 150 g: 248 kcal ($\text{round}(165 \times 1,5)$), 0 g CH, 46,5 g F, 5,4 g ZS.
      - 1. nap tervezett összesen: **598 kcal, 55 g CH, 58,5 g F, 13,4 g ZS**.
      - Ha csak a Zabkása van megevettként jelölve: **350 kcal, 55 g CH, 12 g F, 8 g ZS**.
    - *Gyors hozzáadás: "Alma" (80 kcal, 20 g CH, 0.4 g F, 0.2 g ZS)*:
      - 1. nap tervezett új összesen: **678 kcal, 75 g CH, 58,9 g F, 13,6 g ZS**.
    - Kalória megjelenítés kikapcsolásakor: a kcal érték mindenhol rejtett, csak a makrók látszanak.
- **9B. lépés (Hibajavítás: "Étkezési terv" kártya megnyitási hiba és oldal-szintű hibakezelés)**:
  - **Gyökérok pontos diagnózisa**:
    - A 9. lépésben bevezetett heti étkezési terv több ponton (`subscribeWeekMeals`, `renderMealsPage`, `formatWeekLabel`, `getWeekDates`, `handleCopyPreviousWeek`, stb.) a `parseDateKey(dateKey)` segédfüggvényre támaszkodott.
    - A dátumformázó `formatDateKey` függvény létezett, a vele szimmetrikus `parseDateKey` viszont nem került definiálásra az `app.js`-ben.
    - Amikor a felhasználó a `#/lab/nutrition` oldalon az "Étkezési terv" modulra kattintott, a router meghívta a `handleRouteChange()` függvényt, ami azonnal elindította a `subscribeWeekMeals(uid, mondayKey)` feliratkozást. Ez `parseDateKey`-t hívott, kiváltva a `ReferenceError: Can't find variable: parseDateKey` futásidejű kivételt.
    - Mivel sem a router `handleRouteChange()` függvénye, sem a `render()` diszpécser nem tartalmazott hibahatárt (`try...catch`), a kezeletlen kivétel azonnal elvágta a végrehajtást még az `#app-view` DOM-tartalom frissítése előtt. Ennek következtében a felület némán lefagyva a korábbi pillér-oldalt mutatta.
  - **Megoldás és implementáció**:
    - `parseDateKey(dateKey)` implementálása: robusztus dátum-értelmező helyi időzónás `new Date(year, monthIndex, day)` hívással (elkerülve az ISO string UTC-eltolódásából adódó nap-ugrásokat), és exportálása a dátumkezelő blokkban.
    - Új központi oldal-szintű hibakezelő komponens: `renderRouteError(err)` a szabványos üres/hibaállapot felülettel (`.empty-state.route-error-state`), `#icon-empty` ikonnal, és a lokalizált `T.routeError` szövegekkel: *"Nem sikerült megnyitni az oldalt. Próbáld újra."*, valamint `btn-route-error-retry` („Újra”) és `btn-route-error-back` („Vissza”) gombokkal.
    - A `parseHash()` függvény szigorítása: ha a megadott hash nem felel meg semmilyen érvényes útvonalnak (pl. `#/nonexistent`, `#/lab/ismeretlen`, `#/lab/nutrition/ismeretlen`), nem létező útvonalként (`notFound`) jelöli meg.
    - A `render()` és `handleRouteChange()` függvények teljes `try...catch` hibahatárt kaptak: bármilyen oldalrajzolási hiba, hiányzó útvonal vagy inicializálási kivétel esetén azonnal kirajzolják a barátságos magyar hibaoldalt, és `console.error`-ral naplózzák a részletes technikai hibát.
    - Az összes Firestore feliratkozási hibaág (`subscribeSleepPeriod`, `subscribeNervousPeriod`, `subscribeHydrationPeriod`, `subscribeFoods`, `subscribeWeekMeals`) fel lett készítve arra, hogy amennyiben az `onSnapshot` hibát jelez (pl. index hiánya vagy jogosultság hiba), és a felhasználó az érintett oldalon tartózkodik, automatikusan kirajzolja a szabványos hibaállapotot.
  - **Ellenőrzések és verifikáció**:
    - Mind a 8 Performance Lab útvonal (`#/lab`, `#/lab/recovery`, `#/lab/recovery/sleep`, `#/lab/recovery/nervous`, `#/lab/nutrition`, `#/lab/nutrition/hydration`, `#/lab/nutrition/meals`, `#/lab/nutrition/foods`) ellenőrizve kártya-koppintással és közvetlen URL-lel is.
    - Vissza-gombok hierarchikus működése ellenőrizve (`#/lab/nutrition/meals` -> `#/lab/nutrition` -> `#/lab`).
    - Helyi asztali (1280 px: 7 oszlopos grid) és mobil (390 px: napi pill sáv) elrendezés működése tesztelve.
    - Hibahatár működése ismeretlen útvonalakon (`#/nonexistent`, `#/lab/invalidpillar`, `#/lab/nutrition/unknownsub`) sikeresen tesztelve.

---

## 8. Később kell (Következő fejlesztési fázisok technikai adósságai)
1. **Fiók végleges törlése (GDPR)**: Felhasználói auth fiók és auth profil törlése a kliensből és Cloud Functions segítségével (az adatok törlése a 8. lépésben már működik).
2. **Adatkezelési és felhasználási tájékoztató**: Jogi nyilatkozat és link a regisztrációs űrlapon.
3. **Firebase App Check**: ReCaptcha Enterprise vagy Apple DeviceCheck integráció a backend hívások és botok elleni védelmére.
4. **API-kulcs domain-korlátozása**: A Google Cloud Konzolban az API-kulcs korlátozása a hivatalos éles domainre (és localhostra).
5. **Analytics és sütikezelés**: Google Analytics kizárólag felhasználói hozzájárulás (consent banner) után.
6. **Megbízható levélkézbesítés (SMTP / Custom domain)**: Egyéni küldő domain vagy SMTP beállítása a Firebase Authentication → Templates részben az éles indulás előtt.

---

## 9. Javasolt következő lépés
- **10. lépés: Vonalkód-olvasás (Open Food Facts API) és sportági napi makró-célsávok**
  - Vonalkód-olvasó kamera-integráció (BarCode Detector API / html5-qrcode) az Open Food Facts adatbázisával.
  - Dinamikus napi makró-célsávok a terheléshez (edzésnap vs. pihenőnap szénhidrát- és fehérje-periodizációja).


