# hmi-kit (édition gratuite)

Deux composants web pour écrans de supervision, sous licence MIT :

* `<hmi-value>` : valeur avec unité et qualité de donnée (bonne, incertaine, mauvaise, figée).
* `<hmi-analog-bar>` : indicateur analogique « haute performance » avec seuils LL / L / H / HH.

```html
<link rel="stylesheet" href="dist/tokens.css" />
<script type="module" src="dist/hmi-kit-free.min.js"></script>
<hmi-analog-bar label="Pression" value="4.2" min="0" max="10" h="7.5" hh="8.5" unit="bar"></hmi-analog-bar>
```

Framework-agnostique (Angular, React, HTML), sans dépendance.

## Édition complète

L'édition complète ajoute 14 composants (synoptique à l'échelle, tuyauteries animées, cuve, tendances multi-courbes, liste, bandeau et journal d'alarmes, commande confirmée, consigne, permissifs, séquence, état de liaison, équipements), 117 symboles P&ID, l'anglais, 3 templates de pages, un catalogue interactif et un exemple Angular testé : https://consignestudio.fr/en/hmi-web-components/.
