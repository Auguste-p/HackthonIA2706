# 📱 Menu Burger Responsive - BlaBlaGreen

## 🎯 Objectif
Transformer le menu de navigation horizontal en menu burger responsive pour améliorer l'expérience mobile et tablette.

## 🔧 Modifications apportées

### **1. Structure HTML (index.html)**
```html
<!-- Avant -->
<nav class="navbar" id="navbar">
    <div class="nav-container">
        <a href="#hero" class="logo">BlaBlaGreen</a>
        <ul class="nav-links">
            <li><a href="#hero">Accueil</a></li>
            <!-- ... -->
        </ul>
    </div>
</nav>

<!-- Après -->
<nav class="navbar" id="navbar">
    <div class="nav-container">
        <a href="#hero" class="logo">BlaBlaGreen</a>
        
        <!-- Bouton menu burger -->
        <button class="menu-toggle" id="menu-toggle" aria-label="Menu">
            <span class="hamburger"></span>
            <span class="hamburger"></span>
            <span class="hamburger"></span>
        </button>
        
        <!-- Menu navigation -->
        <ul class="nav-links" id="nav-links">
            <li><a href="#hero" class="nav-link">Accueil</a></li>
            <!-- ... -->
        </ul>
    </div>
</nav>
```

### **2. Styles CSS (style.css)**

#### **Menu burger (caché par défaut)**
```css
.menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 2rem;
    height: 2rem;
    background: transparent;
    border: none;
    cursor: pointer;
}

.hamburger {
    width: 2rem;
    height: 0.25rem;
    background: var(--text-dark);
    border-radius: 10px;
    transition: all 0.3s linear;
    transform-origin: 1px;
}
```

#### **Animation burger → X**
```css
.menu-toggle.active .hamburger:nth-child(1) {
    transform: rotate(45deg);
}

.menu-toggle.active .hamburger:nth-child(2) {
    opacity: 0;
    transform: translateX(20px);
}

.menu-toggle.active .hamburger:nth-child(3) {
    transform: rotate(-45deg);
}
```

#### **Menu mobile plein écran**
```css
@media (max-width: 768px) {
    .menu-toggle {
        display: flex;
    }
    
    .nav-links {
        position: fixed;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100vh;
        background: linear-gradient(135deg, var(--primary-blue), var(--eco-green));
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: left 0.3s ease;
    }
    
    .nav-links.active {
        left: 0;
    }
}
```

### **3. JavaScript (index.html)**

#### **Gestion du toggle**
```javascript
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

// Toggle menu burger
menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});
```

#### **Fermeture automatique**
```javascript
// Fermer le menu quand on clique sur un lien
navLinkItems.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Fermer le menu quand on clique en dehors
document.addEventListener('click', function(event) {
    if (!navbar.contains(event.target)) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});
```

## 🎨 Design et animations

### **Breakpoint responsive**
- **Desktop (> 768px)** : Menu horizontal classique
- **Mobile/Tablette (≤ 768px)** : Menu burger

### **Animations**
1. **Burger → X** : Rotation des barres (0.3s linear)
2. **Menu slide** : Glissement de gauche vers droite (0.3s ease)
3. **Items cascade** : Apparition séquentielle des liens (0.1s à 0.5s)

### **Styles mobile**
- **Fond** : Dégradé bleu/vert plein écran
- **Typographie** : Plus grande, majuscules, espacement des lettres
- **Couleurs** : Texte blanc avec soulignement blanc au hover

## 📱 Expérience utilisateur

### **Fonctionnalités**
✅ **Toggle fluide** : Clic sur burger pour ouvrir/fermer
✅ **Navigation intuitive** : Clic sur lien ferme automatiquement le menu
✅ **Fermeture extérieure** : Clic en dehors ferme le menu
✅ **Accessibilité** : `aria-label` pour lecteurs d'écran
✅ **Animations fluides** : Transitions CSS optimisées

### **États du menu**
- **Fermé** : Burger visible, menu caché (left: -100%)
- **Ouvert** : X visible, menu plein écran (left: 0)
- **Transition** : Animation de glissement latéral

## 🌱 Cohérence avec le thème
- **Couleurs** : Respect de la charte BlaBlaCar (bleu/vert)
- **Logo** : Toujours visible et accessible
- **Ancres** : Navigation par sections préservée
- **Style** : Design moderne et épuré

Le menu burger améliore considérablement l'expérience mobile tout en conservant l'identité visuelle et fonctionnelle du site ! 📱✨
