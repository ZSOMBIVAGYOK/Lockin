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

### Firestore-szabályok (Owner-only és mezőszintű ellenőrzés)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isOwner(userId) {
      return request.auth != null && request.auth.uid == userId;
    }

    match /users/{userId} {
      allow read, write: if isOwner(userId);

      match /activities/{activityId} {
        allow read: if isOwner(userId);
        allow create, update: if isOwner(userId)
          && request.resource.data.category in ['training', 'recovery', 'mental', 'event']
          && request.resource.data.type is string
          && request.resource.data.dateKey is string
          && request.resource.data.startAt is timestamp
          && request.resource.data.durationMin is number
          && request.resource.data.durationMin >= 0
          && request.resource.data.durationMin <= 1440
          && request.resource.data.rpe is number
          && request.resource.data.rpe >= 1
          && request.resource.data.rpe <= 10
          && request.resource.data.strain is number
          && request.resource.data.strain >= 0
          && request.resource.data.strain <= 21
          && request.resource.data.source == 'manual';
        allow delete: if isOwner(userId);
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

---

## 8. Később kell (Következő fejlesztési fázisok technikai adósságai)
1. **Fiók- és adattörlés (GDPR)**: Felhasználói fiók és kapcsolódó Firestore dokumentumok végleges törlése a kliensből és Cloud Functions segítségével.
2. **Adatkezelési és felhasználási tájékoztató**: Jogi nyilatkozat és link a regisztrációs űrlapon.
3. **Firebase App Check**: ReCaptcha Enterprise vagy Apple DeviceCheck integráció a backend hívások és botok elleni védelmére.
4. **API-kulcs domain-korlátozása**: A Google Cloud Konzolban az API-kulcs korlátozása a hivatalos éles domainre (és localhostra).
5. **Analytics és sütikezelés**: Google Analytics kizárólag felhasználói hozzájárulás (consent banner) után.

---

## 9. Javasolt következő lépés
- **4. lépés: Home valós adatokra kötése tovább (Alvás és készenlét naplózás)**
  - Manuális alvásbejegyzés (időtartam, minőség, felébredések) és készenléti kérdőív.
  - A Home Készenlét és Alvás gyűrűinek valós adatra kötése, "Minta adat" badge eltávolítása.
