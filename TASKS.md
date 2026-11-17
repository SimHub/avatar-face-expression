# TASKS.md – Avatar Face Expression Redesign

## Bereits erledigt (Ist-Stand)
- [x] Grundlegende Webcam-Anbindung mit `navigator.mediaDevices.getUserMedia`
- [x] Integration von `face-api.js` (TinyFaceDetector, Landmarks, Expressions, AgeGender)
- [x] 15 Avataaars-SVGs für alle 7 Emotionen (`neutral`, `happy`, `sad`, `angry`, `surprised`, `disgusted`, `fearful`) in `male` & `female` + Start-Avatar
- [x] GitHub Pages & CodePen Demo eingerichtet
- [x] *(Lokal in `src/script.js`, noch uncommitted)* `try/catch` um `detectAllFaces` & `.catch()` beim Modell-Laden ergänzt

---

## Phase 0: Git-Hygiene & Branch-Setup
- [ ] Aktuelle lokale Änderungen in `src/script.js` prüfen (`git diff`)
- [ ] Neuen Arbeitsbranch `redesign/v2` anlegen (um `master` / GitHub Pages stabil zu halten)
- [ ] Lokalen Testserver einrichten (`python3 -m http.server 8080` o. Ä.)

## Phase 1: Bugfixes & Performance-Basis
- [x] `fearful`-Emotion in `src/script.js` aktivieren
- [x] `getAvatar()` umschreiben: immer die Emotion mit dem höchsten Score wählen (statt `> 0.6`-Kette)
- [x] `ASSET_BASE_URL` einführen (`"."` lokal/GitHub Pages, leicht umschaltbar für CodePen) und `/models` → `${ASSET_BASE_URL}/models` fixen
- [x] Unnötiges `faceRecognitionNet` entfernen und auf `faceLandmark68TinyNet` wechseln (schnellerer Load)
- [x] Sauberes Kamera-Error-Handling (UI-Meldung + Retry-Button bei verweigerter Kamera)
- [x] Detection-Loop von `setInterval` auf kontrollierten Async-Loop umstellen + sauber stoppen/neustarten ohne `location.reload()`

## Phase 2: Größeres UI/UX Redesign
- [x] `Spectre.css` & Font `Sacramento` durch modernes, eigenes CSS ersetzen (System-/Google-Sans-Serif `Inter`, CSS Variables)
- [x] Privacy-First Startscreen („Kamera starten“-Button + Hinweis auf lokale Verarbeitung)
- [x] Responsive Card-Layout (Desktop & Mobile ohne abgeschnittene Elemente)
- [x] Dynamische Hintergrundfarben/Gradients & sanfte Übergänge (Fade/Scale) passend zur erkannten Emotion
- [x] HTML/CSS Altlasten bereinigen (`#imgbox` vs. `#imgBox`, ungenutzte Regeln entfernen, echte `<button>`-Elemente + `aria-label` für Accessibility)

## Phase 3: Attraktive User-Features
- [x] Live-Emotions-Balken (Confidence-Meter in % für alle 7 Emotionen)
- [x] Gender-/Avatar-Lock (`Auto / Male / Female`) gegen unerwünschtes Springen
- [x] Optionaler Webcam-Preview (Toggle an/aus, gespiegelt, optionales Face-Overlay)
- [x] Snapshot-Button: Aktuellen Avatar inkl. Emotion als PNG herunterladen (inkl. Custom-SVGs)
- [x] „Emotion Challenge“ Speed-Run Mini-Game (20s Timer, Highscore in `localStorage`, Web-Audio-Chime)
- [x] Einheitliche Inline-SVG-Icons statt Emojis in allen Controls & Mood-Badges
- [x] Live Head-Tilt (Kopfneigung aus Augen-Landmarks weich auf den Avatar übertragen – nur Kopf, Schultern bleiben ruhig via Inline-SVG `fetch()`)
- [x] Erweiterte Landmark-Dynamik: Blinzeln (EAR), Mundöffnung (MAR) & Kopf-Drehung Links/Rechts (Yaw)
- [x] Zuschaltbares Brillen-Overlay (`No Glasses` / `Glasses` / `Shades`) für alle 3 Avatar-Packs inkl. PNG-Snapshot-Export
- [x] Neue Avatar-Charaktere entwickelt: **Robo-Bot** & **Mood Blob** (programmatische SVGs für alle 7 Emotionen)
- [x] Session Mood Mix (Live-Verteilung der erkannten Emotionen als Farb-Leiste)
- [x] Dark Mode (mit System-Präferenz-Erkennung, `localStorage` & dunklen Mood-Themes)
- [x] Photobooth 2×2 Mood-Collage (4-Posen-Countdown mit Flash & direkter PNG-Vorschau/Download)
- [x] Avatar-Farb-Customizer (Hautton, Haarfarbe & Outfit/Style mit `localStorage`-Speicherung, 0 KB Extra-Dateien)

## Phase 4: Release (GitHub Push & CodePen Sync)
- [x] End-to-End-Test (lokal getestet)
- [x] `README.md` aktualisieren (neue Feature-Liste)
- [ ] Auf `master` committen & `git push origin master` ausführen (GitHub Pages geht live)
- [ ] CodePen (`https://codepen.io/simhub/pen/RwbXzrj`) mit neuem HTML/CSS/JS + `ASSET_BASE_URL` aktualisieren
