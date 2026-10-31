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
- **Fájlméret**: Egyetlen fájl sem haladhatja meg az 1500 sort.
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
  - `projectId`: `lockin-37a53`
  - `authDomain`: `lockin-37a53.firebaseapp.com`
  - `storageBucket`: `lockin-37a53.firebasestorage.app`

### Firebase Konzol beállítási lépések
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

### Firestore-szabályok (a Firebase-konzolba kell beírni)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /{document=**} {
      allow read, write: if false;
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
  - **Elrendezés-hiba diagnózisa és gyökéroka**:
    1. *Szándékos auth-kapu elrejtés (a)*: A felhasználói jelzés szerinti "menü hiánya" valójában az auth-kapu működéséből fakadt: kijelentkezett (`unauthenticated`), `loading` és `onboarding` állapotban az alkalmazás szándékosan elrejtette a navigációs sávot és a mobil fejlécet (`.app-layout.auth-mode .app-nav { display: none !important; }`), hogy a védett belső funkciók ne látszódjanak. Amikor a felhasználó megnyitotta az oldalt és még nem lépett be, a menüsor emiatt hiányzott.
    2. *Egységesített DOM struktúra*: A korábbi kettéosztott navigáció (`desktop-sidebar` és `mobile-bottom-nav`) helyett egyetlen tiszta, akadálymentes `<nav id="app-nav">` kezeli a navigációt mobilon és asztalin is.
    3. *Layout szekció teljes újraírása (ne foltozd)*:
       - Tiszta globális reset: `*, *::before, *::after { box-sizing: border-box; }`, `html, body { margin: 0; padding: 0; }`.
       - Teljesen eltávolítva: `overflow-x: hidden` a body-ról és `100vw` a szélességekről.
       - Mobil (<900 px): `.app-layout` 1 oszlopos grid (`minmax(0, 1fr)`), `#app-nav` rögzített alsó sáv (`position: fixed; left: 0; right: 0; bottom: 0; z-index: 100`), tartalom padding alul `calc(76px + env(safe-area-inset-bottom))`.
       - Asztali (≥900 px): `.app-layout` kétoszlopos grid (`240px minmax(0, 1fr)`), `#app-nav` sticky bal oldalsáv (`grid-column: 1; position: sticky; top: 0; height: 100dvh; width: 240px`), `.main-content` `grid-column: 2; min-width: 0; max-width: 1080px; margin: 0 auto; width: 100%`.
       - Mérési igazolás 360, 768, 899, 900, 1024, 1280, 1440 és 1920 px szélességeken mindkét témában: nincs vízszintes túlcsordulás (`scrollWidth <= innerWidth`), a tartalom jobb széle sosem lóg le.
  - **Google-belépés**:
    - Színes hivatalos Google "G" SVG ikonnal ellátott „Folytatás Google-lal” gomb a Belépés és Regisztráció fülön is, „vagy” elválasztóval.
    - `GoogleAuthProvider` + `signInWithPopup`, fallback `signInWithRedirect` + `getRedirectResult`.
    - Felhasználóbarát magyar hibaüzenetek: popup bezárásakor csendes visszalépés (`auth/popup-closed-by-user`, `auth/cancelled-popup-request`), fiókütközéskor egyértelmű útmutatás (`auth/account-exists-with-different-credential`).
  - **Onboarding és 18+ életkor megerősítés (EGY helyen)**:
    - A regisztrációs űrlapról lekerült a checkbox, helyette tájékoztató szöveg jelenik meg.
    - Az új felhasználóknak (mind e-mailes, mind Google-ös regisztrációnál) az Onboarding felületen kötelező a név (Google fióknévvel előtöltve, szerkeszthetően) és az „Elmúltam 18 éves” jelölőnégyzet. A „Folytatás” gomb csak akkor válik aktívvá, ha mindkettő ki van töltve.
    - Új gomb: „Nem múltam el 18 éves” — kattintáskor a regisztrált fiók azonnal törlődik a Firebase Auth-ból (`deleteUser`), kijelentkezik (`signOut`), és visszairányít a belépőre a tájékoztatóval: *„A Junior mód később érhető el, gondviselői hozzájárulással.”*
    - Firestore profil mezők változatlanok: `displayName`, `mode: "athlete"`, `language: "hu"`, `ageConfirmed18: true`, `createdAt`, `updatedAt: serverTimestamp()`.

---

## 8. Később kell (Következő fejlesztési fázisok technikai adósságai)
1. **Fiók- és adattörlés (GDPR)**: Felhasználói fiók és kapcsolódó Firestore dokumentumok végleges törlése a kliensből és Cloud Functions segítségével.
2. **Adatkezelési és felhasználási tájékoztató**: Jogi nyilatkozat és link a regisztrációs űrlapon.
3. **Firebase App Check**: ReCaptcha Enterprise vagy Apple DeviceCheck integráció a backend hívások és botok elleni védelmére.
4. **API-kulcs domain-korlátozása**: A Google Cloud Konzolban az API-kulcs korlátozása a hivatalos éles domainre (és localhostra).
5. **Szigorúbb mezőszintű Firestore-szabályok**: A `users` dokumentum mezőinek típus- és hosszkövetelményeinek érvényesítése security rules szinten.
6. **Analytics és sütikezelés**: Google Analytics kizárólag felhasználói hozzájárulás (consent banner) után.

---

## 9. Javasolt következő lépés
- **3. lépés: Activity Journal alapjai (kézi naplózás Firestore-ba)**
  - Edzéstípusok, időtartam, RPE terhelés és szubjektív érzések manuális rögzítése.
  - Firestore gyűjtemény a bejegyzéseknek (`users/{uid}/activities/{activityId}`).
  - Lista és naptár nézet összekapcsolása valós adatokkal.
