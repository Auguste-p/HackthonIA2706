# Makefile pour le projet HTMX

.PHONY: help install run clean test

# Variables
PYTHON = python3
VENV = venv
FLASK_APP = app.py

help: ## Afficher l'aide
	@echo "Commandes disponibles :"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: ## Installer les dépendances
	@echo "📦 Installation de l'environnement..."
	$(PYTHON) -m venv $(VENV)
	./$(VENV)/bin/pip install --upgrade pip
	./$(VENV)/bin/pip install -r requirements.txt
	@echo "✅ Installation terminée!"

run: ## Démarrer l'application
	@echo "🚀 Démarrage de l'application..."
	./$(VENV)/bin/python $(FLASK_APP)

dev: ## Démarrer en mode développement
	@echo "🔧 Mode développement..."
	FLASK_ENV=development FLASK_DEBUG=True ./$(VENV)/bin/python $(FLASK_APP)

clean: ## Nettoyer les fichiers temporaires
	@echo "🧹 Nettoyage..."
	find . -type f -name "*.pyc" -delete
	find . -type d -name "__pycache__" -delete
	find . -type d -name "*.egg-info" -exec rm -rf {} +

freeze: ## Générer requirements.txt à partir de l'environnement
	./$(VENV)/bin/pip freeze > requirements.txt

setup: install ## Installation complète du projet
	@echo "🎉 Projet prêt!"
	@echo "Utilisez 'make run' pour démarrer l'application"

check: ## Vérifier la syntaxe Python
	./$(VENV)/bin/python -m py_compile $(FLASK_APP)
	@echo "✅ Syntaxe correcte!"
