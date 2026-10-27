# Notes de version

## 0.3.0 — 2026-10-23

* Six composants : `hmi-mimic` (synoptique à taille fixe mis à l'échelle), `hmi-pipe` (tuyauterie animée en écoulement), `hmi-trend-chart` (tendance multi-courbes, axe des temps, échelle par courbe, curseur de lecture), `hmi-event-log` (journal filtrable, export CSV), `hmi-interlock` (permissifs, premier défaut, shunts), `hmi-sequence` (étapes, temps écoulé, dépassement).
* `bindTags` : liaison de données temps réel par attributs `data-tag`, qualité de donnée et marquage « figée » à la perte de liaison.
* Déclarations JSX livrées (`import type {} from 'hmi-kit/jsx'`).
* Anglais : `setLocale('en')` traduit tous les composants affichés ; textes remplaçables ; nombres et heures selon la langue.
* `hmi-equipment` : 117 symboles (pid-symbols 1.1).
* Démo : le détail pompe démarre par une séquence et bloque le démarrage sans permissifs ; réarmement du défaut ; journal des commandes et consignes ; catalogue interactif de tous les composants.
* Nouveaux jetons : `--hmi-trend-2` à `--hmi-trend-4`, `--hmi-pipe`, `--hmi-alarm-2-text`.
* Tests : 93 Vitest, 16 Playwright.

## 0.2.0 — 2026-10-23

* Nouveaux composants : `hmi-tank` (cuve), `hmi-command` (marche/arrêt avec confirmation et annulation automatique), `hmi-setpoint` (consigne bornée, validation explicite), `hmi-alarm-banner` (bandeau d'alarmes), `hmi-comm-status` (état de liaison et âge de la donnée).
* `hmi-equipment` utilise désormais les 57 symboles de pid-symbols et gère les états ouvert / fermé. Les noms `pump`, `valve`, `motor` restent acceptés.
* 3 templates de pages : vue d'ensemble avec synoptique animé, détail d'équipement, alarmes avec filtres et journal.
* Exemple Angular 21 (signals, sans zone.js) compilé et testé dans Chromium.
* Accessibilité : liseré foncé sur la couleur d'alarme de priorité 2 (contraste du jaune insuffisant seul sur fond clair).
* Correction de la documentation : l'exemple Angular de la 0.1 ne compilait pas avec les templates stricts.
* Tests : 71 Vitest, 13 Playwright.

## 0.1.0 — 2026-10-23 (MVP)

Première version : `hmi-value`, `hmi-analog-bar`, `hmi-trend`, `hmi-alarm-list`, `hmi-equipment`, jetons de design, démo.
