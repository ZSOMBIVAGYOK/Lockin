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

## 3. Fő navigáció (Négy fül)
- **Home (`#/home`)**: Napi áttekintés – Készenlét, Terhelés és Alvás gyűrűk, „Miért?” magyarázat, Mai javaslat, Mai teendők, összehasonlító szűrősáv és e-mail megerősítési sáv.
- **Performance Lab (`#/lab` és `#/lab/<pillar>`)**: 2×2 rács négy sporttudományos pillérrel:
  1. *Fizikai és technikai felkészülés*
  2. *Regeneráció és helyreállítás*
  3. *Táplálkozás és hidratáció*
  4. *Mentális és pszichológiai felkészülés*
- **Journal (`#/journal`)**: Tevékenységek, edzések és szubjektív állapot naplózása (Lista / Naptár nézet, üres állapot és új bejegyzés gomb).
- **More (`#/more` és `#/more/profile`)**: Megjelenés váltó (Auto / Sötét / Világos), Módválasztó, Nyelv, Verzió, működő **Sportolói profil** (névszerkesztés, e-mail megjelenítés, kijelentkezés) és hamarosan érkező funkciók (Eszközök, Adatvédelem, Csapat, Értesítések, Súgó).

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
  - Minimum 44×44 px érintési célméret.
  - Billentyűzetes fókuszkeret (`:focus-visible`) és `prefers-reduced-motion`.

---

## 5. Fájlstruktúra
```text
Lockin/
├── index.html            # PWA alapváz, inline SVG sprite, fejléc, oldalsáv és alsó fülsáv
├── styles.css            # Teljes dizájnrendszer, CSS változók, komponensek, reszponzív grid és auth stílusok
├── app.js                # Router, Firebase Auth & Firestore, T szótár, témavezérlés és renderelők
├── manifest.webmanifest  # Szabványos PWA web app manifest
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
    - **Formátum választó**:
      - *Álló 4:5* (1080×1350 px, alapértelmezett hírfolyam/Instagram/Strava arány).
      - *Négyzet 1:1* (1080×1080 px).
      - *Story 9:16* (1080×1920 px álló képernyős arány).
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

---

## 8. Később kell (Következő fejlesztési fázisok technikai adósságai)
1. **Fiók- és adattörlés (GDPR)**: Felhasználói fiók és kapcsolódó Firestore dokumentumok végleges törlése a kliensből és Cloud Functions segítségével.
2. **Adatkezelési és felhasználási tájékoztató**: Jogi nyilatkozat és link a regisztrációs űrlapon.
3. **Firebase App Check**: ReCaptcha Enterprise vagy Apple DeviceCheck integráció a backend hívások és botok elleni védelmére.
4. **API-kulcs domain-korlátozása**: A Google Cloud Konzolban az API-kulcs korlátozása a hivatalos éles domainre (és localhostra).
5. **Analytics és sütikezelés**: Google Analytics kizárólag felhasználói hozzájárulás (consent banner) után.
6. **Megbízható levélkézbesítés (SMTP / Custom domain)**: Egyéni küldő domain vagy SMTP beállítása a Firebase Authentication → Templates részben az éles indulás előtt.

---

## 9. Javasolt következő lépés
- **7. lépés: Idegrendszeri mérések (kézi nyugalmi pulzus és HRV trend) és személyes alapvonal**
  - Kézi nyugalmi pulzus (RHR) és HRV adatok grafikus követése a Regeneráció pillér alatt.
  - Egyéni mozgóátlag és alapvonal (baseline) számítása a check-in adatokból.
  - Készenlét (Readiness) képlet bővítése a mért idegrendszeri értékekkel.
