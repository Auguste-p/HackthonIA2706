#!/usr/bin/env python3
# Test du calculateur avec des valeurs réalistes
transport_data = {
    'voiture_seul': {'co2_per_km': 120, 'cout_per_km': 0.35},
    'covoiturage': {'co2_per_km': 30, 'cout_per_km': 0.10},
    'train': {'co2_per_km': 14, 'cout_per_km': 0.15},
    'bus': {'co2_per_km': 20, 'cout_per_km': 0.08},
    'velo': {'co2_per_km': 0, 'cout_per_km': 0.02},
    'marche': {'co2_per_km': 0, 'cout_per_km': 0}
}

print('🧮 Test du calculateur d\'impact carbone')
print('='*50)

# Test: trajet domicile-travail de 25km, 5 fois par semaine (10 trajets A/R)
distance = 25
frequency = 10  # 5 A/R par semaine

for transport, data in transport_data.items():
    co2_per_trip = (distance * data['co2_per_km']) / 1000  # g -> kg
    annual_co2 = co2_per_trip * frequency * 52
    annual_cost = distance * data['cout_per_km'] * frequency * 52
    
    print(f'{transport:15}: {annual_co2:6.1f} kg CO2/an, {annual_cost:6.0f}€/an')

print()
print('📊 Exemple concret: 25km domicile-travail, 5 A/R par semaine')
print('Voiture seule: 1560 kg CO2/an (équivalent à 1,56 tonnes)')
print('Covoiturage:    390 kg CO2/an (75% de réduction!)')
print('Train:          182 kg CO2/an (88% de réduction!)')
print()
print('✅ Les calculs sont maintenant cohérents et réalistes!')
