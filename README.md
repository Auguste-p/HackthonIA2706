# BlaBlaCar - Sensibilisation Écologique

Site web interactif inspiré de BlaBlaCar pour sensibiliser les jeunes à l'impact environnemental des transports et promouvoir le covoiturage.

## Concept

Un site one-page moderne utilisant HTMX pour créer une expérience interactive de sensibilisation à l'écologie des transports, avec des calculateurs d'impact carbone, des témoignages, et des solutions concrètes.

## Structure du projet

```
.
├── README.md
├── requirements.txt
├── app.py              # Serveur Flask simple
├── static/
│   ├── css/
│   │   └── style.css   # Styles thème BlaBlaCar écologique
│   ├── js/
│   │   └── main.js     # Interactions HTMX
│   └── images/         # Assets visuels
└── templates/
    └── index.html      # Page unique avec sections
```

## Fonctionnalités

- 🌱 Calculateur d'empreinte carbone des transports
- 🚗 Simulateur d'économies par covoiturage
- 📊 Visualisations interactives des données environnementales
- 💬 Témoignages dynamiques
- 🎯 Quiz interactif sur l'écologie
- 📱 Design mobile-first et responsive
- ⚡ Navigation fluide avec ancres et HTMX

## Installation et lancement

1. **Cloner et installer :**
   ```bash
   git clone <repository>
   cd hackathon-ia-2706
   make install
   ```

2. **Lancer le serveur :**
   ```bash
   make run
   # ou
   python app.py
   ```

3. **Accéder au site :**
   Ouvrez http://localhost:5001 dans votre navigateur

## Sections du site

### 🏠 Hero Section
- Présentation de BlaBlagreen
- Statistiques d'impact écologique
- Call-to-action vers le calculateur

### 🧮 Calculateur d'Impact
- Saisie des données de transport
- Calcul en temps réel des émissions CO2
- Comparaison avec le covoiturage
- Recommandations personnalisées

### 🧠 Quiz Écologique
- Questions interactives sur l'environnement
- Feedback immédiat
- Faits écologiques surprenants

### 💬 Témoignages
- Histoires réelles de jeunes éco-responsables
- Économies réalisées
- Motivation par l'exemple

### 🚀 Appel à l'Action
- Simulation de recherche de covoiturage
- Encouragement à passer à l'action
- Statistiques d'impact collectif

## Technologies utilisées

- **Backend :** Flask (Python)
- **Frontend :** HTML5, CSS3, JavaScript
- **Interactivité :** HTMX pour les mises à jour dynamiques
- **Design :** CSS custom inspiré de BlaBlaCar
- **Responsivité :** Mobile-first design avec breakpoints optimisés

## Dernières améliorations ✨

### 📱 Correction Responsivité Section IA (27/06/2025)
- ✅ **Suppression des styles inline** : Tous les styles sont maintenant gérés en CSS
- ✅ **Breakpoints optimisés** : Desktop (>1200px), Tablette (768-1200px), Mobile (480-768px), Petit mobile (<480px)
- ✅ **Grilles adaptatives** : Auto-adaptation selon la largeur d'écran
- ✅ **Tailles responsives** : Textes, icônes et espacements proportionnels
- ✅ **Navigation burger** : Menu mobile responsive
- ✅ **Performance CSS** : Classes réutilisables et maintenables

### 🧮 Calculateur Carbone Précis
- ✅ **Algorithme ADEME** : Valeurs officielles d'émissions CO2
- ✅ **Conversion g→kg** : Affichage correct des résultats
- ✅ **Recommandations réalistes** : Seuils et messages adaptés
- ✅ **Redirect BlaBlaCar** : Bouton fonctionnel vers la plateforme

## Fonctionnalités HTMX

- ✅ Calculateur d'impact en temps réel
- ✅ Quiz interactif sans rechargement
- ✅ Témoignages dynamiques
- ✅ Recherche de covoiturage simulée
- ✅ Notifications toast
- ✅ Navigation smooth scroll
- ✅ Animations fluides
- ✅ Sauvegarde locale des préférences

## Messages de sensibilisation

Le site véhicule des messages clés :
- 🌍 **Impact environnemental** des transports individuels
- 💰 **Économies financières** du covoiturage
- 👥 **Dimension sociale** du partage de trajets
- 🌱 **Solutions concrètes** pour agir

## Données et calculs

- Émissions CO2 par km selon le mode de transport
- Coûts réels des déplacements
- Équivalences en arbres plantés
- Économies potentielles annuelles

## Performance et UX

- ⚡ Chargement rapide avec HTMX
- 📱 Interface responsive mobile-first
- ♿ Accessible aux personnes handicapées
- 🎨 Design moderne et engageant
- 🔔 Feedback utilisateur en temps réel
