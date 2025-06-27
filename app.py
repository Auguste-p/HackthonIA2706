from flask import Flask, render_template, request, jsonify, render_template_string
import json
import random

app = Flask(__name__)

# Données pour la sensibilisation écologique (CO2 en g/km, coût en €/km)
transport_data = {
    "voiture_seul": {"co2_per_km": 120, "cout_per_km": 0.35, "icon": "🚗"},
    "covoiturage": {"co2_per_km": 30, "cout_per_km": 0.10, "icon": "🚙"},  # 120g/4 personnes = 30g/personne
    "train": {"co2_per_km": 14, "cout_per_km": 0.15, "icon": "🚆"},
    "bus": {"co2_per_km": 20, "cout_per_km": 0.08, "icon": "🚌"},
    "velo": {"co2_per_km": 0, "cout_per_km": 0.02, "icon": "🚴"},  # Usure/entretien vélo
    "marche": {"co2_per_km": 0, "cout_per_km": 0, "icon": "🚶"}
}

testimonials = [
    {
        "name": "Marie, 22 ans",
        "text": "Grâce au covoiturage, j'ai réduit mes émissions de 75% et économisé 200€ par mois !",
        "savings": "75% CO2, 200€/mois",
        "avatar": "👩‍🎓"
    },
    {
        "name": "Lucas, 19 ans", 
        "text": "En partageant mes trajets fac-boulot, j'ai rencontré des amis et aidé la planète.",
        "savings": "60% CO2, 150€/mois",
        "avatar": "👨‍🎓"
    },
    {
        "name": "Emma, 25 ans",
        "text": "Le covoiturage m'a ouvert les yeux sur mon impact environnemental.",
        "savings": "80% CO2, 300€/mois", 
        "avatar": "👩‍💼"
    }
]

eco_facts = [
    "🌍 Le transport représente 30% des émissions de CO2 en France",
    "🚗 Une voiture émet en moyenne 4,6 tonnes de CO2 par an",
    "👥 Le covoiturage peut réduire les émissions de 75%",
    "🌱 1 trajet partagé = 1 arbre planté (équivalent carbone)",
    "💰 Le covoiturage fait économiser en moyenne 2000€ par an"
]

@app.route('/')
def index():
    """Page principale one-page"""
    return render_template('index.html')

@app.route('/calculate-impact', methods=['POST'])
def calculate_impact():
    """Calculer l'impact environnemental"""
    distance = float(request.form.get('distance', 0))
    transport = request.form.get('transport', 'voiture_seul')
    frequency = int(request.form.get('frequency', 1))
    
    if transport not in transport_data:
        transport = 'voiture_seul'
    
    data = transport_data[transport]
    
    # Calculs (conversion g -> kg pour CO2)
    co2_per_trip = (distance * data['co2_per_km']) / 1000  # Conversion g vers kg
    cost_per_trip = distance * data['cout_per_km']
    
    annual_co2 = co2_per_trip * frequency * 52  # 52 semaines
    annual_cost = cost_per_trip * frequency * 52
    
    # Comparaison avec covoiturage
    covoiturage_co2 = (distance * transport_data['covoiturage']['co2_per_km'] / 1000) * frequency * 52
    covoiturage_cost = distance * transport_data['covoiturage']['cout_per_km'] * frequency * 52
    
    savings_co2 = annual_co2 - covoiturage_co2
    savings_cost = annual_cost - covoiturage_cost
    
    result = {
        "transport": transport,
        "icon": data['icon'],
        "annual_co2": round(annual_co2, 1),  # Plus de précision
        "annual_cost": round(annual_cost),
        "savings_co2": round(max(0, savings_co2), 1),
        "savings_cost": round(max(0, savings_cost)),
        "trees_equivalent": round(annual_co2 / 25, 1),  # 1 arbre absorbe ~25kg CO2/an
        "recommendation": get_recommendation(annual_co2)
    }
    
    return render_template_string("""
    <div class="result-card fade-in">
        <h3>{{ result.icon }} Impact de votre transport</h3>
        <div class="impact-stats">
            <div class="stat">
                <span class="stat-value">{{ result.annual_co2 }} kg</span>
                <span class="stat-label">CO2 par an</span>
            </div>
            <div class="stat">
                <span class="stat-value">{{ result.annual_cost }}€</span>
                <span class="stat-label">Coût annuel</span>
            </div>
            <div class="stat">
                <span class="stat-value">{{ result.trees_equivalent }}</span>
                <span class="stat-label">Arbres nécessaires</span>
            </div>
        </div>
        
        {% if result.savings_co2 > 0 %}
        <div class="savings-section">
            <h4>💡 Avec le covoiturage, vous pourriez économiser :</h4>
            <div class="savings-stats">
                <div class="saving">
                    <span class="saving-value">-{{ result.savings_co2 }} kg CO2</span>
                    <span class="saving-label">Émissions évitées</span>
                </div>
                <div class="saving">
                    <span class="saving-value">-{{ result.savings_cost }}€</span>
                    <span class="saving-label">Économies</span>
                </div>
            </div>
        </div>
        {% endif %}
        
        <div class="recommendation">
            {{ result.recommendation }}
        </div>
        
        <a href="https://www.blablacar.fr/" target="_blank" rel="noopener" class="btn btn-primary" style="text-decoration: none; display: inline-block;">
            🚗 Trouver un covoiturage sur BlaBlaCar
        </a>
    </div>
    """, result=result)

def get_recommendation(co2):
    """Recommandations basées sur l'impact CO2 annuel en kg"""
    if co2 < 100:
        return "🌟 Excellent ! Votre impact est déjà très faible. Vous êtes un éco-citoyen exemplaire !"
    elif co2 < 300:
        return "🌱 Bon effort ! Votre impact est modéré. Le covoiturage pourrait l'optimiser davantage."
    elif co2 < 600:
        return "⚠️ Impact notable. Le covoiturage pourrait réduire vos émissions de 75% !"
    else:
        return "🚨 Impact élevé ! Le covoiturage est fortement recommandé pour réduire drastiquement vos émissions."

@app.route('/quiz-question')
def quiz_question():
    """Obtenir une question de quiz"""
    questions = [
        {
            "question": "Quel transport émet le moins de CO2 ?",
            "options": ["Voiture seule", "Covoiturage", "Train", "Vélo"],
            "correct": 3,
            "explanation": "Le vélo n'émet aucun CO2 ! C'est le transport le plus écologique."
        },
        {
            "question": "De combien peut-on réduire ses émissions avec le covoiturage ?",
            "options": ["25%", "50%", "75%", "90%"],
            "correct": 2,
            "explanation": "Le covoiturage peut réduire les émissions jusqu'à 75% en partageant les trajets !"
        },
        {
            "question": "Combien de CO2 une voiture émet-elle par km en moyenne ?",
            "options": ["50g", "120g", "200g", "300g"],
            "correct": 1,
            "explanation": "Une voiture émet environ 120g de CO2 par kilomètre."
        }
    ]
    
    question = random.choice(questions)
    return render_template_string("""
    <div class="quiz-question fade-in">
        <h4>{{ question.question }}</h4>
        <div class="quiz-options">
            {% for i, option in enumerate(question.options) %}
            <button class="quiz-option" 
                    data-correct="{{ i == question.correct }}"
                    data-explanation="{{ question.explanation }}"
                    hx-post="/quiz-answer" 
                    hx-vals='{"answer": {{ i }}, "correct": {{ question.correct }}, "explanation": "{{ question.explanation }}"}'
                    hx-target="#quiz-result">
                {{ option }}
            </button>
            {% endfor %}
        </div>
        <div id="quiz-result"></div>
    </div>
    """, question=question, enumerate=enumerate)

@app.route('/quiz-answer', methods=['POST'])
def quiz_answer():
    """Traiter la réponse du quiz"""
    answer = int(request.form.get('answer'))
    correct = int(request.form.get('correct'))
    explanation = request.form.get('explanation')
    
    is_correct = answer == correct
    
    return render_template_string("""
    <div class="quiz-result {{ 'correct' if is_correct else 'incorrect' }}">
        {% if is_correct %}
            <h4>🎉 Correct !</h4>
        {% else %}
            <h4>❌ Pas tout à fait...</h4>
        {% endif %}
        <p>{{ explanation }}</p>
        <button class="btn btn-secondary" hx-get="/quiz-question" hx-target="#quiz-container">
            Question suivante
        </button>
    </div>
    """, is_correct=is_correct, explanation=explanation)

@app.route('/testimonial')
def get_testimonial():
    """Obtenir un témoignage aléatoire"""
    testimonial = random.choice(testimonials)
    return render_template_string("""
    <div class="testimonial-card fade-in">
        <div class="testimonial-avatar">{{ testimonial.avatar }}</div>
        <div class="testimonial-content">
            <p>"{{ testimonial.text }}"</p>
            <div class="testimonial-author">— {{ testimonial.name }}</div>
            <div class="testimonial-savings">{{ testimonial.savings }}</div>
        </div>
    </div>
    """, testimonial=testimonial)

@app.route('/eco-fact')
def get_eco_fact():
    """Obtenir un fait écologique"""
    fact = random.choice(eco_facts)
    return render_template_string("""
    <div class="eco-fact fade-in">
        <p>{{ fact }}</p>
    </div>
    """, fact=fact)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
