# CONTEXT.md – Avatar Face Expression (Redesign v2)

## 1. Projekt-Überblick
**Avatar Face Expression** ist eine clientseitige Web-App („Animoji im Browser“), die über die Webcam Gesichtsausdrücke erkennt und in Echtzeit auf SVG-Avatare überträgt.

- **Repo:** `https://github.com/SimHub/avatar-face-expression` (Default-Branch: `master`)
- **GitHub Pages (Live):** `https://simhub.github.io/avatar-face-expression/`
- **CodePen Demo:** `https://codepen.io/simhub/pen/RwbXzrj`
- **Tech-Stack:** Reines HTML, CSS, Vanilla JS (kein Bundler/Build-Step) + `face-api.js` + Avataaars SVGs

## 2. Verzeichnisstruktur
```text
.
├── index.html              # Hauptseite (aktuell Spectre.css + Google Font Sacramento)
├── face-api.min.js         # Lokales face-api.js Bundle
├── src/
│   ├── main.css            # Styles & Animationen
│   └── script.js           # Kamera-Setup, Modell-Loading, Detection-Loop
├── models/                 # Vortrainierte face-api.js Gewichte (TinyFaceDetector, Landmarks, Expression, AgeGender, Recognition)
└── img/
    ├── avatar/svg/         # 15 Avataaars-SVGs (7 Emotionen × male/female + neutral_start.svg)
    └── info/               # Screenshots & Icons für README.md
```

## 3. Bekannte Probleme & Altlasten (Stand vor Redesign)
1. **Fehlende Expression:** `fearful` wird aus `detections[0].expressions` gelesen, aber `getAvatar(fearful, gender)` wird nicht aufgerufen (SVGs sind vorhanden).
2. **Emotions-Logik:** `getAvatar()` prüft nur `> 0.6` der Reihe nach auf Strings (`.toFixed(2)`), statt die Emotion mit dem höchsten Score zu wählen.
3. **Unnötige ML-Modelle:** `faceRecognitionNet` (2 Shards) wird geladen, aber nie genutzt; `ageGenderNet` berechnet `age`, das nicht angezeigt wird; `faceLandmark68Net` statt `faceLandmark68TinyNet`.
4. **Pfad-Bug:** `loadFromUri("/models")` funktioniert nicht in Unterverzeichnissen wie `/avatar-face-expression/` auf GitHub Pages (sollte relativ `./models` bzw. konfigurierbare `BASE_URL` sein).
5. **Kamera & Loop:** Kein Fehler-UI bei abgelehnter Kamera-Berechtigung; `setInterval(..., 800)` wird beim Stoppen nicht gecleart; Restart nutzt `location.reload()`.
6. **UI/CSS:** `#imgbox` (HTML) vs. `#imgBox` (CSS), ungenutzte CSS-Klassen, starre `300px`-Breite mit negativen Offsets (`#date`, `#stopStreaming`), schlechte Lesbarkeit durch Schreibschrift `Sacramento` für Status-Texte.

## 4. Redesign-Ziele (v2)
- **Kein Build-Step:** Weiterhin reines HTML/CSS/JS, damit es direkt auf GitHub Pages und CodePen läuft.
- **Privacy-First Onboarding:** Startscreen mit „Kamera starten“-Button und Hinweis *„100 % lokal im Browser – kein Video verlässt dein Gerät“*.
- **Modernes UI:** Ablösung von `Spectre.css` & `Sacramento` durch modernes CSS (Custom Properties, Glassmorphism/Clean Card, responsive für Desktop & Mobile, Barrierefreiheit).
- **Sichtbare KI:** Live-Emotions-Balken (Confidence-Meter für alle 7 Emotionen), optional ein-/ausblendbare gespiegelte Webcam-Vorschau.
- **Bessere UX:** Gender-Lock (`Auto / Male / Female`) gegen Flackern, weiche Avatar-Übergänge, emotionale Hintergrund-Themes, Snapshot-Download (PNG/SVG) und optionales Mini-Game („Emotion Challenge“).

## 5. GitHub Push & CodePen Strategie
> **Wichtig:** Der `master`-Branch ist direkt mit GitHub Pages (`simhub.github.io/avatar-face-expression/`) verknüpft!

- **Wann lokal arbeiten & committen?**
  Alle Redesign-Schritte auf einem eigenen Branch (z. B. `redesign/v2`) entwickeln und lokal über einen HTTP-Server (`python3 -m http.server` oder `npx serve`) testen (`getUserMedia` benötigt `localhost` oder `https`).
- **Wann auf GitHub pushen?**
  - **Zwischenstände:** Auf den Feature-Branch pushen (`git push -u origin redesign/v2`), damit `master` / die Live-Demo nicht kaputtgehen.
  - **Auf `master` pushen:** Erst wenn Phase 1–3 komplett getestet sind (Desktop + Mobile, Kamera an/aus/verweigert, alle 7 Emotionen). Mit dem Push auf `master` geht die neue Version automatisch auf GitHub Pages live.
- **Was beachten wegen CodePen?**
  - CodePen hat keinen Zugriff auf lokale relative Ordner (`./models`, `./img/...`), sondern lädt Assets entweder über die **GitHub Pages URL** (`https://simhub.github.io/avatar-face-expression/...`) oder CDN.
  - Lösung im Code: Eine zentrale `ASSET_BASE_URL`-Konstante am Anfang von `src/script.js` (Standard `"."` für lokal/GitHub Pages, für CodePen einfach auf `"https://simhub.github.io/avatar-face-expression"` umstellbar).
  - CodePen-Update (`pen/RwbXzrj`) erfolgt **erst nach** dem `master`-Push, damit die dort referenzierten Modelle/SVGs bereits live auf GitHub Pages liegen.
