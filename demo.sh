#!/bin/bash

# Script de démonstration BlaBlaCar

echo "🌱 DEMONSTRATION BlaBlaCar 🌱"
echo "================================"
echo ""

echo "📊 Données de test disponibles :"
echo "• Distance : 25 km (trajet typique domicile-travail)"
echo "• Fréquence : 5 fois/semaine (aller-retour)"
echo "• Comparaison : Voiture seule vs Covoiturage"
echo ""

echo "🧮 Exemple de calcul :"
echo "• Voiture seule : 25 km × 120g CO2/km × 10 trajets/semaine × 52 semaines = 1 560 kg CO2/an"
echo "• Covoiturage : 25 km × 30g CO2/km × 10 trajets/semaine × 52 semaines = 390 kg CO2/an"
echo "• ÉCONOMIE : 1 170 kg CO2/an (75% de réduction !)"
echo ""

echo "💰 Économies financières :"
echo "• Voiture seule : 25 km × 0.35€/km × 10 × 52 = 4 550€/an"
echo "• Covoiturage : 25 km × 0.10€/km × 10 × 52 = 1 300€/an"
echo "• ÉCONOMIE : 3 250€/an"
echo ""

echo "🌳 Impact environnemental :"
echo "• 1 170 kg CO2 économisés = environ 47 arbres plantés"
echo "• 1 trajet partagé = 1 voiture en moins sur la route"
echo ""

echo "🎯 Messages clés du site :"
echo "1. Le transport représente 30% des émissions françaises"
echo "2. Le covoiturage peut réduire l'impact de 75%"
echo "3. C'est économique ET écologique"
echo "4. Chaque geste compte pour l'avenir"
echo ""

echo "🚀 Fonctionnalités à tester :"
echo "• Calculateur d'impact avec différents transports"
echo "• Quiz écologique interactif"
echo "• Témoignages motivants"
echo "• Simulation de recherche de covoiturage"
echo ""

echo "📱 Responsive design :"
echo "• Testé sur mobile, tablette et desktop"
echo "• Navigation tactile optimisée"
echo "• Contenu adapté à tous les écrans"
echo ""

echo "⚡ Technologies :"
echo "• HTMX pour l'interactivité sans rechargement"
echo "• CSS moderne avec animations"
echo "• JavaScript minimal mais efficace"
echo "• Flask backend léger"
echo ""

if command -v open >/dev/null 2>&1; then
    echo "🌐 Ouverture automatique du navigateur..."
    open http://localhost:5001
elif command -v xdg-open >/dev/null 2>&1; then
    echo "🌐 Ouverture automatique du navigateur..."
    xdg-open http://localhost:5001
else
    echo "🌐 Ouvrez votre navigateur à l'adresse : http://localhost:5001"
fi

echo ""
echo "✨ Bonne démonstration ! ✨"
