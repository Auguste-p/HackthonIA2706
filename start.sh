#!/bin/bash

# Script de démarrage pour le projet HTMX

echo "🚀 Démarrage du projet HTMX..."

# Vérifier si Python est installé
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 n'est pas installé"
    exit 1
fi

# Créer un environnement virtuel s'il n'existe pas
if [ ! -d "venv" ]; then
    echo "📦 Création de l'environnement virtuel..."
    python3 -m venv venv
fi

# Activer l'environnement virtuel
echo "🔧 Activation de l'environnement virtuel..."
source venv/bin/activate

# Installer les dépendances
echo "📚 Installation des dépendances..."
pip install -r requirements.txt

# Charger les variables d'environnement
if [ -f ".env" ]; then
    export $(cat .env | xargs)
fi

# Démarrer l'application
echo "✅ Démarrage de l'application sur http://localhost:5000"
python app.py
