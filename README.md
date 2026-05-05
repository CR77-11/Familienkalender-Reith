# Familienkalender Reith

Ein iPad-Küchenkalender als Familienzentrale mit Tagesansicht, Wetter für Speyer, Personenfiltern, Fahrtenlogik und Termin-Detailansicht.

## Funktionen im MVP

- Startseite: **Familienkalender Reith**
- Immer sichtbare Tagesansicht mit anstehenden Terminen
- Wettermodul für Speyer oben rechts
- Familienmitglieder: Annette, Christian, Henri, Justus, Greta
- Kategorien: Privat, Beruf, Schule, Sport, Familie
- Personenfilter: Alle oder einzelne Familienmitglieder
- Termine mit iCal-ähnlichen Feldern: Ort, Erinnerung, Notiz, Wiederholung, Ganztägig
- Fahrten: Hinfahrt und Rückfahrt pro Termin
- Touch auf Termin öffnet Detail-Overlay
- Swipe/Buttons für Heute, Morgen, Gestern vorbereitet
- iPad-Querformat optimiert

## Installation

```bash
npm install
npm run start
```

Dann in Expo auf iPad öffnen oder im Simulator starten.

## GitHub Upload

```bash
git init
git add .
git commit -m "Initial family calendar app"
git branch -M main
git remote add origin https://github.com/<dein-user>/familienkalender-reith.git
git push -u origin main
```

## Nächste Ausbaustufen

- Apple-Kalender-Import über `.ics` oder CalDAV-Integration
- Firebase/CloudKit-Backend
- Push-Erinnerungen auf iPad und iPhones
- Login & Rollen: Eltern, Kinder, Lesen/Bearbeiten
- Wiederholungsregeln mit Ferien-Ausnahmen
- Live-Wetter via Wetter-API statt Demo-Wetterdaten
