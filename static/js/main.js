// ===== BlaBlaGreen - JavaScript pour interface écologique =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVIGATION SMOOTH SCROLL =====
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navbar = document.querySelector('.navbar');
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Mise à jour de l'état actif
                    navLinks.forEach(nl => nl.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });
    }
    
    // ===== INTERSECTION OBSERVER POUR NAVIGATION =====
    function initScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${entry.target.id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-100px 0px -66%'
        });
        
        sections.forEach(section => observer.observe(section));
    }
    
    // ===== NOTIFICATIONS TOAST =====
    function showToast(message, type = 'success', duration = 4000) {
        // Supprimer les anciens toasts
        document.querySelectorAll('.toast').forEach(toast => toast.remove());
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icons = {
            success: '✅',
            info: '💡',
            warning: '⚠️',
            error: '❌'
        };
        
        toast.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-size: 1.2rem;">${icons[type] || icons.info}</span>
                <span>${message}</span>
            </div>
        `;
        
        // Styles
        Object.assign(toast.style, {
            position: 'fixed',
            top: '120px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '10px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
            maxWidth: '300px'
        });
        
        // Couleurs selon le type
        const colors = {
            success: 'linear-gradient(135deg, #4CAF50, #45a049)',
            info: 'linear-gradient(135deg, #00AFF5, #0084C7)',
            warning: 'linear-gradient(135deg, #FF9800, #F57C00)',
            error: 'linear-gradient(135deg, #F44336, #D32F2F)'
        };
        
        toast.style.background = colors[type] || colors.info;
        
        document.body.appendChild(toast);
        
        // Animation d'entrée
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        });
        
        // Suppression automatique
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 400);
        }, duration);
    }
    
    // ===== GESTIONNAIRE D'ÉVÉNEMENTS HTMX =====
    function initHTMXHandlers() {
        // Succès des requêtes
        document.addEventListener('htmx:afterRequest', function(event) {
            const xhr = event.detail.xhr;
            const path = event.detail.requestConfig.path;
            
            if (xhr.status >= 200 && xhr.status < 300) {
                if (path === '/calculate-impact') {
                    showToast('🌱 Impact calculé avec succès !', 'success');
                    
                    // Scroll vers les résultats
                    setTimeout(() => {
                        const results = document.getElementById('impact-results');
                        if (results) {
                            results.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }
                    }, 500);
                }
                else if (path === '/quiz-answer') {
                    const isCorrect = event.detail.xhr.responseText.includes('Correct');
                    showToast(
                        isCorrect ? '🎉 Bonne réponse !' : '📚 Nouvelle connaissance acquise !', 
                        isCorrect ? 'success' : 'info'
                    );
                }
                else if (path === '/find-rides') {
                    showToast('🚗 Trajets trouvés ! Choisissez votre covoiturage.', 'success');
                }
            } else {
                showToast('😔 Une erreur est survenue. Veuillez réessayer.', 'error');
            }
        });
        
        // Erreurs réseau
        document.addEventListener('htmx:responseError', function(event) {
            showToast('🌐 Problème de connexion. Vérifiez votre internet.', 'error');
        });
        
        // Avant les requêtes (loading states)
        document.addEventListener('htmx:beforeRequest', function(event) {
            const indicator = event.detail.elt.querySelector('.htmx-indicator');
            if (indicator) {
                indicator.style.opacity = '1';
            }
        });
        
        // Après les requêtes (remove loading)
        document.addEventListener('htmx:afterRequest', function(event) {
            const indicator = event.detail.elt.querySelector('.htmx-indicator');
            if (indicator) {
                setTimeout(() => {
                    indicator.style.opacity = '0';
                }, 300);
            }
        });
    }
    
    // ===== ANIMATIONS D'ENTRÉE =====
    function initAnimations() {
        // Animation des éléments au scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    animationObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observer les cartes et sections
        document.addEventListener('htmx:afterSwap', function(event) {
            const newElements = event.detail.target.querySelectorAll(
                '.result-card, .testimonial-card, .quiz-question, .share-trip-section, .ride-card'
            );
            newElements.forEach(element => {
                animationObserver.observe(element);
            });
        });
    }
    
    // ===== VALIDATION FORMULAIRES =====
    function initFormValidation() {
        document.addEventListener('input', function(event) {
            if (event.target.matches('input[required], select[required]')) {
                const input = event.target;
                const isValid = input.checkValidity();
                
                // Styles de validation visuels
                if (isValid) {
                    input.style.borderColor = 'var(--eco-green)';
                    input.style.boxShadow = '0 0 0 3px rgba(76, 175, 80, 0.1)';
                } else if (input.value.length > 0) {
                    input.style.borderColor = 'var(--error-red)';
                    input.style.boxShadow = '0 0 0 3px rgba(244, 67, 54, 0.1)';
                } else {
                    input.style.borderColor = '#E9ECEF';
                    input.style.boxShadow = 'none';
                }
            }
        });
        
        // Validation avant soumission HTMX
        document.addEventListener('htmx:configRequest', function(event) {
            const form = event.detail.elt.closest('form');
            if (form) {
                const isValid = form.checkValidity();
                if (!isValid) {
                    event.preventDefault();
                    form.reportValidity();
                    showToast('📝 Veuillez corriger les erreurs du formulaire.', 'warning');
                }
            }
        });
    }
    
    // ===== RACCOURCIS CLAVIER =====
    function initKeyboardShortcuts() {
        document.addEventListener('keydown', function(event) {
            // Ctrl/Cmd + Enter pour soumettre le formulaire actif
            if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
                const activeElement = document.activeElement;
                if (activeElement && activeElement.form) {
                    const submitButton = activeElement.form.querySelector('[type="submit"]');
                    if (submitButton) {
                        submitButton.click();
                    }
                }
            }
            
            // Échap pour fermer les toasts
            if (event.key === 'Escape') {
                document.querySelectorAll('.toast').forEach(toast => {
                    toast.style.opacity = '0';
                    toast.style.transform = 'translateX(100%)';
                    setTimeout(() => toast.remove(), 300);
                });
            }
        });
    }
    
    // ===== SAUVEGARDE LOCALE =====
    function initLocalStorage() {
        // Sauvegarder les valeurs du calculateur
        const calculatorForm = document.querySelector('#calculator form');
        if (calculatorForm) {
            calculatorForm.addEventListener('input', function(event) {
                const formData = new FormData(calculatorForm);
                const data = {};
                for (let [key, value] of formData.entries()) {
                    data[key] = value;
                }
                localStorage.setItem('BlaBlaGreen_calculator', JSON.stringify(data));
            });
            
            // Restaurer les valeurs sauvegardées
            const savedData = localStorage.getItem('BlaBlaGreen_calculator');
            if (savedData) {
                try {
                    const data = JSON.parse(savedData);
                    Object.entries(data).forEach(([key, value]) => {
                        const input = calculatorForm.querySelector(`[name="${key}"]`);
                        if (input) {
                            input.value = value;
                        }
                    });
                } catch (e) {
                    console.log('Erreur lors de la restauration des données:', e);
                }
            }
        }
    }
    
    // ===== COMPTEUR D'IMPACT GLOBAL =====
    function initGlobalCounter() {
        let totalCO2Saved = parseFloat(localStorage.getItem('total_co2_saved') || '0');
        let totalMoneySaved = parseFloat(localStorage.getItem('total_money_saved') || '0');
        
        document.addEventListener('htmx:afterSwap', function(event) {
            if (event.detail.requestConfig.path === '/calculate-impact') {
                const resultCard = event.detail.target.querySelector('.result-card');
                if (resultCard) {
                    // Extraire les économies du contenu
                    const co2Match = resultCard.textContent.match(/-(\d+) kg CO2/);
                    const moneyMatch = resultCard.textContent.match(/-(\d+)€/);
                    
                    if (co2Match) {
                        totalCO2Saved += parseFloat(co2Match[1]);
                        localStorage.setItem('total_co2_saved', totalCO2Saved.toString());
                    }
                    
                    if (moneyMatch) {
                        totalMoneySaved += parseFloat(moneyMatch[1]);
                        localStorage.setItem('total_money_saved', totalMoneySaved.toString());
                    }
                    
                    // Mettre à jour l'affichage dans le footer si présent
                    const footerCO2 = document.querySelector('#footer-co2-saved');
                    if (footerCO2) {
                        footerCO2.textContent = `${totalCO2Saved.toFixed(1)} tonnes`;
                    }
                }
            }
        });
    }
    
    // ===== EASTER EGGS =====
    function initEasterEggs() {
        let clickCount = 0;
        const logo = document.querySelector('.logo');
        
        if (logo) {
            logo.addEventListener('click', function(e) {
                e.preventDefault();
                clickCount++;
                
                if (clickCount === 5) {
                    showToast('🌟 Vous êtes un vrai écolo ! Continuez comme ça !', 'success', 6000);
                    // Effet confetti virtuel
                    document.body.style.background = 'linear-gradient(45deg, #4CAF50, #00AFF5, #4CAF50, #00AFF5)';
                    document.body.style.backgroundSize = '200% 200%';
                    document.body.style.animation = 'gradient 2s ease infinite';
                    
                    setTimeout(() => {
                        document.body.style.background = '';
                        document.body.style.animation = '';
                    }, 2000);
                    
                    clickCount = 0;
                }
            });
        }
    }
    
    // ===== INITIALISATION =====
    initSmoothScroll();
    initScrollSpy();
    initHTMXHandlers();
    initAnimations();
    initFormValidation();
    initKeyboardShortcuts();
    initLocalStorage();
    initGlobalCounter();
    initEasterEggs();
    
    // Message de bienvenue
    setTimeout(() => {
        showToast('Bienvenue sur BlaBlaGreen ! Calculez votre impact environnemental.', 'info', 5000);
    }, 1000);
    
    // Exposer certaines fonctions globalement
    window.showToast = showToast;
});

// ===== EXTENSION HTMX PERSONNALISÉE =====
htmx.defineExtension('eco-animation', {
    onEvent: function (name, evt) {
        if (name === 'htmx:afterSwap') {
            const target = evt.detail.target;
            
            // Animation spéciale pour les résultats de calcul
            if (target.id === 'impact-results') {
                const cards = target.querySelectorAll('.result-card, .savings-section');
                cards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
            
            // Animation pour les quiz
            if (target.classList.contains('quiz-result')) {
                target.style.transform = 'scale(0.8)';
                target.style.opacity = '0';
                
                setTimeout(() => {
                    target.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                    target.style.transform = 'scale(1)';
                    target.style.opacity = '1';
                }, 100);
            }
        }
    }
});

// ===== ANALYTICS SIMPLES =====
function trackEvent(event, data = {}) {
    const analytics = JSON.parse(localStorage.getItem('BlaBlaGreen_analytics') || '{}');
    const today = new Date().toISOString().split('T')[0];
    
    if (!analytics[today]) {
        analytics[today] = {};
    }
    
    if (!analytics[today][event]) {
        analytics[today][event] = 0;
    }
    
    analytics[today][event]++;
    
    // Garder seulement les 30 derniers jours
    const keys = Object.keys(analytics);
    if (keys.length > 30) {
        const oldest = keys.sort()[0];
        delete analytics[oldest];
    }
    
    localStorage.setItem('BlaBlaGreen_analytics', JSON.stringify(analytics));
}

// Tracker les événements
document.addEventListener('htmx:afterRequest', function(event) {
    const path = event.detail.requestConfig.path;
    
    if (path === '/calculate-impact') trackEvent('calculator_used');
    if (path === '/quiz-answer') trackEvent('quiz_answered');
    if (path === '/testimonial') trackEvent('testimonial_viewed');
    if (path === '/find-rides') trackEvent('ride_searched');
});

// CSS pour les animations gradient
const style = document.createElement('style');
style.textContent = `
    @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
`;
document.head.appendChild(style);
