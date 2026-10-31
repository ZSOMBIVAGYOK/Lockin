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

---

## 7. Elkészült lépések
- **1. lépés: Alapváz, dizájnrendszer, navigáció** *(KÉSZ)*
  - Hash-alapú router, sötét/világos téma localStorage-ban mentve, SVG gyűrűk, Performance Lab 2×2 rács és aloldalak, Journal üres állapot, More beállítások.
- **2. lépés: Hibajavítás + Firebase bejelentkezés és profil** *(KÉSZ)*
  - **Gyökérok-szintű layout javítás**: 900 px felett a korábbi `width: 100%` + `margin-left: 260px` miatti túllógás megszüntetése kétoszlopos CSS Grid architektúrával (`240px minmax(0, 1fr)`). Ellenőrizve 900, 1024, 1280, 1440 és 1920 px szélességen.
  - **Hitelesítési kapu**: `loading`, `unauthenticated` és `authenticated` állapotok kezelése `onAuthStateChanged` alapján. Kijelentkezve a belső fülek elérhetetlenek.
  - **Belépési és regisztrációs felület**: E-mail és jelszó mezők, jelszó mutatása/elrejtése gomb, min. 8 karakter validáció, kötelező 18+ életkor jelölőnégyzet ("A Junior mód később érhető el, gondviselői hozzájárulással"), elfelejtett jelszó visszaállítás e-mailben.
  - **E-mail megerősítés**: Regisztráció után automatikus megerősítő e-mail kiküldése (`sendEmailVerification`). Amíg nincs megerősítve, diszkrét sáv jelenik meg a Home és a Profil tetején "Újraküldés" gombbal.
  - **Firestore Profil és Onboarding**: Első belépéskor egy lépéses "Hogy hívjunk?" képernyő, amely elmenti a `users/{uid}` dokumentumot (`displayName`, `mode: "athlete"`, `language: "hu"`, `ageConfirmed18: true`, `createdAt`, `updatedAt`).
  - **Profil kezelése a More fülön**: Profil nézet név szerkesztéssel, mentéssel a Firestore-ba, regisztrált e-mail megjelenítésével és működő Kijelentkezéssel.
  - **Magyar nyelvű hibaüzenetek**: Barátságos, érthető magyar fordítás az összes Firebase Auth hibakódra (pl. `auth/invalid-credential`, `auth/email-already-in-use`, `auth/weak-password`, `auth/too-many-requests`, `auth/network-request-failed`), nyers hibakódok kizárásával.

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
