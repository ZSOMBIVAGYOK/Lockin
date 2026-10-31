# Lockin – Sportolói teljesítmény- és egészségkövető (PWA)

## 1. Projekt neve és célja
A **Lockin** egy sportolói teljesítmény-, terhelés- és regenerációkövető progresszív webalkalmazás (PWA). Célja, hogy tudományosan megalapozott, egyszerűen átlátható és megbízható visszajelzést adjon a sportolóknak a napi készenlétről, edzésterhelésről, alvásról és felkészültségi állapotról.

---

## 2. Felhasználói módok (Modes)
Az alkalmazás három célcsoportra szabott módot támogat a jövőben:
1. **Athlete (Versenysportoló)** *(Aktív az 1. lépéstől)*: Versenyszerű felkészülés, maximális adaptáció és csúcsteljesítmény.
2. **Junior (Utánpótlás)** *(Hamarosan)*: Fejlődési, alapozási és prevenciós fókusz fiatal sportolók számára.
3. **Longevity (Hosszú távú egészség)** *(Hamarosan)*: Vitalitás, autonóm idegrendszeri egyensúly és hosszú távú egészségmegőrzés.

---

## 3. Fő navigáció (Négy fül)
- **Home (`#/home`)**: Napi áttekintés – Készenlét, Terhelés és Alvás gyűrűk, „Miért?” magyarázat, Mai javaslat, Mai teendők és összehasonlító szűrősáv.
- **Performance Lab (`#/lab` és `#/lab/<pillar>`)**: 2×2 rács négy sporttudományos pillérrel:
  1. *Fizikai és technikai felkészülés*
  2. *Regeneráció és helyreállítás*
  3. *Táplálkozás és hidratáció*
  4. *Mentális és pszichológiai felkészülés*
- **Journal (`#/journal`)**: Tevékenységek, edzések és szubjektív állapot naplózása (Lista / Naptár nézet, üres állapot és új bejegyzés gomb).
- **More (`#/more`)**: Megjelenés váltó (Auto / Sötét / Világos), Módválasztó, Nyelv, Verzió és hamarosan érkező funkciók (Profil, Eszközök, Adatvédelem, Csapat, Értesítések, Súgó).

---

## 4. Technikai szabályok
- **Stack**: Tiszta Vanilla HTML + CSS + JavaScript (ES modulok). Keretrendszerek, build-eszközök és külső CDN könyvtárak nélkül.
- **Fájlstruktúra korlát**: KIZÁRÓLAG az 5 kijelölt fájl létezhet a gyökérben.
- **Fájlméret**: Egyetlen fájl sem haladhatja meg az 1500 sort.
- **Nyelv és konvenciók**:
  - Kommentek: **magyarul**.
  - Kód azonosítók (változók, függvények, osztályok): **angolul**.
  - A kód szekciókra bontva, látványos szekciófejlécekkel van tagolva.
  - Minden felhasználói felirat a `T` lokalizációs objektumból származik.
- **Reszponzivitás és akadálymentesség**:
  - Mobile first: optimális megjelenés 360 px-től 1440 px-ig.
  - 900 px alatt alsó fülsáv, 900 px felett bal oldali asztali menüsáv.
  - `safe-area-inset` kezelése mobil kijelzőkhöz (pl. iPhone Dynamic Island / Home Indicator).
  - Minimum 44×44 px érintési célméret.
  - Billentyűzetes navigáció és `:focus-visible` fókuszkeret.
  - `prefers-reduced-motion` figyelembevétele.
- **Dizájnrendszer és témák**:
  - Sötét (#0A0C0F) és Világos (#F6F7F9) téma CSS változókkal.
  - Villanásmentes témaindítás (`<head>` inline script).
  - Számokhoz `tabular-nums` használata.
  - Inline SVG sprite a külső ikon-könyvtárak helyett.
  - Robusztus logó fallback: `logo-dark-mode.svg` / `logo-light-mode.svg` -> `.png` -> szöveges "Lockin" wordmark.

---

## 5. Fájlstruktúra
```text
Lockin/
├── index.html            # PWA alapváz, inline SVG sprite, fejléc, oldalsáv és alsó fülsáv
├── styles.css            # Teljes dizájnrendszer, CSS változók, komponensek és reszponzív töréspontok
├── app.js                # Router, reaktív témavezérlés, állapot (state), T szótár és komponens renderelők
├── manifest.webmanifest  # Szabványos PWA web app manifest
└── PROJEKT.md            # Projektleírás, technikai szabályzat, architektúra és tesztelési napló
```

---

## 6. Elkészült lépések
- **1. lépés: Alapváz, dizájnrendszer, navigáció** *(KÉSZ)*
  - Hash-alapú router (`#/home`, `#/lab`, `#/lab/<pillar>`, `#/journal`, `#/more`) a böngésző vissza-gombjának támogatásával.
  - Dinamikus sötét / világos / auto téma tárolása `localStorage`-ban és azonnali érvényesítése.
  - Home oldal a 3 funkcionális SVG gyűrűvel (Készenlét, Terhelés, Alvás), Mai javaslattal és teendőkkel.
  - Performance Lab 2×2 rács és a 4 pillér részletes aloldala.
  - Journal üres állapot és More beállítások oldal.
  - Mobile first reszponzivitás tesztelve 360 px, 768 px és 1280 px méretekben.
  - Teljes akadálymentesség (`aria-current`, billentyűzet fókusz).

---

## 7. Következő lépés
- **2. lépés: Firebase bejelentkezés és felhasználói profil**
  - Firebase SDK integráció az `app.js` kijelölt helyén (`// FIREBASE: a 2. lépésben`).
  - Felhasználói regisztráció és bejelentkezés (Google Auth és Email/Jelszó).
  - Alapvető sportolói profil adatok (név, sportág, alapértelmezett mód).

---

## 8. Minden lépésre érvényes szabályok
1. **Kis lépések elve**: Mindig csak az adott lépésben leírt követelményeket valósítsd meg, ne vezess be jövőbeli függőségeket vagy felesleges logikát.
2. **Kérdezz, ha bizonytalan vagy**: Ha egy funkció vagy részlet nem egyértelmű, nem kitalálni kell, hanem egyeztetni a felhasználóval.
3. **Dokumentáció megőrzése**: Minden lépés végén frissíteni kell a `PROJEKT.md` fájlt.
4. **Kötelező tesztelés**: Minden lépés lezárása előtt helyi szerverrel ellenőrizni kell az összes felületet, témát, konzolhibát és töréspontot.
5. **Felhasználói teszt-útmutató**: A lépés átadásakor lépésről-lépésre érthető tesztelési útmutatót kell adni a felhasználónak.
