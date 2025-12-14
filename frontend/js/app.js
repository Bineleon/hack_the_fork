// Configuration
const API_URL = 'http://localhost:3000/api/menu';

// État de l'application
let allAnalyses = []; // Stocke toutes les analyses
let currentAnalysisIndex = 0; // Index de l'analyse actuellement affichée

// Instances des graphiques Chart.js
let nutritionChartInstance = null;
let co2ChartInstance = null;
let costChartInstance = null;

// Éléments DOM
const uploadSection = document.getElementById('uploadSection');
const loadingSection = document.getElementById('loadingSection');
const resultsSection = document.getElementById('resultsSection');
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const platInput = document.getElementById('platInput');
const ingredientsInput = document.getElementById('ingredientsInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const newAnalysisBtn = document.getElementById('newAnalysisBtn');
const loadingText = document.getElementById('loadingText');
const toast = document.getElementById('toast');
const languageToggle = document.getElementById('languageToggle');

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    checkAPIHealth();
    updatePageLanguage(); // Initialiser la langue
});

// Configuration des écouteurs d'événements
function setupEventListeners() {
    // Upload d'image
    uploadArea.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileSelect);
    
    // Drag & Drop
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    
    // Analyse manuelle
    analyzeBtn.addEventListener('click', handleManualAnalysis);
    platInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleManualAnalysis();
    });
    
    // Nouvelle analyse
    newAnalysisBtn.addEventListener('click', resetApp);
    
    // Actions
    document.getElementById('downloadBtn')?.addEventListener('click', downloadReport);
    document.getElementById('shareBtn')?.addEventListener('click', shareResults);
    
    // Changement de langue
    languageToggle.addEventListener('click', toggleLanguage);
}

// Fonction pour changer la langue
function toggleLanguage() {
    const newLang = getCurrentLanguage() === 'fr' ? 'en' : 'fr';
    setLanguage(newLang);
    showToast(newLang === 'fr' ? '🇫🇷 Français' : '🇬🇧 English', 'success');
    
    // Rafraîchir l'affichage si des résultats sont présents
    if (allAnalyses.length > 0) {
        displayMultipleResults();
    }
}

// Utilitaire pour récupérer le texte dans la bonne langue
function getLocalizedText(textObj) {
    if (!textObj) return '';
    if (typeof textObj === 'string') return textObj;
    if (typeof textObj === 'object') {
        const lang = getCurrentLanguage();
        return textObj[lang] || textObj['fr'] || textObj['en'] || '';
    }
    return String(textObj);
}

// Vérification de l'état de l'API
async function checkAPIHealth() {
    try {
        const response = await fetch(`${API_URL}/health`);
        const data = await response.json();
        
        if (data.status === 'ok') {
            console.log('✅ API connectée');
            if (data.services.blackbox === 'not_configured') {
                showToast(t('toastDemoMode'), 'warning');
            }
        }
    } catch (error) {
        console.error('❌ API non disponible:', error);
        showToast(t('toastApiError'), 'error');
    }
}

// Gestion du drag & drop
function handleDragOver(e) {
    e.preventDefault();
    uploadArea.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
}

// Gestion de la sélection de fichier
function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
}

// Traitement du fichier
async function handleFile(file) {
    // Validation
    if (!file.type.startsWith('image/')) {
        showToast(t('toastSelectImage'), 'error');
        return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
        showToast(t('toastImageTooLarge'), 'error');
        return;
    }
    
    // Afficher le loading
    showLoading(t('loadingScanning'));
    
    try {
        // Upload et scan
        const formData = new FormData();
        formData.append('menu', file);
        
        updateLoadingText(t('loadingExtracting'));
        const scanResponse = await fetch(`${API_URL}/scan`, {
            method: 'POST',
            body: formData
        });
        
        if (!scanResponse.ok) {
            throw new Error('Erreur lors du scan');
        }
        
        const scanData = await scanResponse.json();
        
        if (!scanData.plats || scanData.plats.length === 0) {
            showToast(t('toastNoDishDetected'), 'error');
            hideLoading();
            return;
        }
        
        // Analyser TOUS les plats détectés
        allAnalyses = [];
        const platsToAnalyze = scanData.plats.slice(0, 5); // Limiter à 5 plats max
        
        for (let i = 0; i < platsToAnalyze.length; i++) {
            const plat = platsToAnalyze[i];
            const analysisText = getCurrentLanguage() === 'fr' 
                ? `Analyse ${i + 1}/${platsToAnalyze.length}: ${plat.nom}...`
                : `Analysis ${i + 1}/${platsToAnalyze.length}: ${plat.nom}...`;
            updateLoadingText(analysisText);
            
            try {
                const analysis = await analyzeSingleMenu(plat.nom, plat.ingredients || []);
                allAnalyses.push(analysis);
            } catch (error) {
                console.error(`Erreur analyse ${plat.nom}:`, error);
            }
        }
        
        if (allAnalyses.length === 0) {
            showToast(t('toastNoAnalysisSuccess'), 'error');
            hideLoading();
            return;
        }
        
        currentAnalysisIndex = 0;
        hideLoading();
        displayMultipleResults();
        
    } catch (error) {
        console.error('Erreur complète:', error);
        console.error('Message d\'erreur:', error.message);
        console.error('Stack:', error.stack);
        showToast(t('toastScanError') + ': ' + error.message, 'error');
        hideLoading();
    }
}

// Analyse manuelle
async function handleManualAnalysis() {
    const plat = platInput.value.trim();
    
    if (!plat) {
        showToast(t('toastEnterDish'), 'error');
        return;
    }
    
    // Parser les ingrédients
    const ingredientsText = ingredientsInput.value.trim();
    const ingredients = ingredientsText
        ? ingredientsText.split('\n').map(line => {
            const parts = line.trim().split(/\s+/);
            return parts.length > 0 ? parts.join(' ') : line;
        }).filter(ing => ing.length > 0)
        : [];
    
    showLoading(t('loadingTitle'));
    
    const analysis = await analyzeSingleMenu(plat, ingredients);
    allAnalyses = [analysis];
    currentAnalysisIndex = 0;
    
    hideLoading();
    displayMultipleResults();
}

// Analyse d'un seul plat via l'API
async function analyzeSingleMenu(plat, ingredients) {
    try {
        const response = await fetch(`${API_URL}/analyze`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                plat,
                ingredients: ingredients.length > 0 ? ingredients : undefined
            })
        });
        
        if (!response.ok) {
            throw new Error('Erreur lors de l\'analyse');
        }
        
        const result = await response.json();
        return result.data;
        
    } catch (error) {
        console.error('Erreur:', error);
        throw error;
    }
}

// Affichage des résultats multiples avec navigation
function displayMultipleResults() {
    if (allAnalyses.length === 0) return;
    
    // Créer la navigation si plusieurs plats
    if (allAnalyses.length > 1) {
        createDishNavigation();
    }
    
    // Afficher le plat actuel
    displaySingleResult(allAnalyses[currentAnalysisIndex]);
    
    // Afficher la section résultats
    showResults();
}

// Créer la navigation entre plats
function createDishNavigation() {
    // Supprimer l'ancienne navigation si elle existe
    const oldNav = document.getElementById('dishNavigation');
    if (oldNav) oldNav.remove();
    
    const nav = document.createElement('div');
    nav.id = 'dishNavigation';
    nav.className = 'dish-navigation';
    nav.innerHTML = `
        <button id="prevDish" class="nav-btn" ${currentAnalysisIndex === 0 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i> ${t('previous')}
        </button>
        <div class="dish-tabs">
            ${allAnalyses.map((analysis, index) => `
                <button class="dish-tab ${index === currentAnalysisIndex ? 'active' : ''}" 
                        data-index="${index}">
                    <span class="dish-tab-number">${index + 1}</span>
                    <span class="dish-tab-name">${analysis.plat_original}</span>
                </button>
            `).join('')}
        </div>
        <button id="nextDish" class="nav-btn" ${currentAnalysisIndex === allAnalyses.length - 1 ? 'disabled' : ''}>
            ${t('next')} <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    // Insérer la navigation APRÈS le header (en dessous du bouton "Nouvelle Analyse")
    const resultsHeader = document.querySelector('.results-header');
    resultsHeader.insertAdjacentElement('afterend', nav);
    
    // Event listeners
    document.getElementById('prevDish').addEventListener('click', () => navigateToDish(currentAnalysisIndex - 1));
    document.getElementById('nextDish').addEventListener('click', () => navigateToDish(currentAnalysisIndex + 1));
    
    document.querySelectorAll('.dish-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.dataset.index);
            navigateToDish(index);
        });
    });
}

// Naviguer vers un plat spécifique
function navigateToDish(index) {
    if (index < 0 || index >= allAnalyses.length) return;
    
    currentAnalysisIndex = index;
    displayMultipleResults();
    
    // Scroll vers le haut
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Affichage d'un seul résultat
function displaySingleResult(data) {
    // Plat original
    document.getElementById('originalDish').innerHTML = `
        <div class="dish-name">${data.plat_original}</div>
        <h4>${t('ingredientsColon')}</h4>
        <ul class="ingredients-list">
            ${data.ingredients_originaux.map(ing => `
                <li>
                    <span>${getLocalizedText(ing.nom)}</span>
                    <span>${ing.quantite}${ing.unite || ''}</span>
                </li>
            `).join('')}
        </ul>
    `;
    
    // Alternative végétale
    document.getElementById('veganAlternative').innerHTML = `
        <div class="dish-name">${getLocalizedText(data.alternative_vegetale.nom)}</div>
        <h4>${t('ingredientsColon')}</h4>
        <ul class="ingredients-list">
            ${data.alternative_vegetale.ingredients.map(ing => `
                <li>
                    <span>${getLocalizedText(ing.nom)}</span>
                    <span>${ing.quantite}${ing.unite || ''}</span>
                </li>
            `).join('')}
        </ul>
        <div class="preparation">
            <h4><i class="fas fa-book"></i> ${t('preparationColon')}</h4>
            <p>${getLocalizedText(data.alternative_vegetale.preparation)}</p>
            ${data.alternative_vegetale.temps_preparation ? `
                <p><strong>⏱️ ${t('timeColon')}</strong> ${data.alternative_vegetale.temps_preparation}</p>
            ` : ''}
        </div>
    `;
    
    // Comparaison nutritionnelle
    displayNutritionComparison(data.nutrition);
    
    // Impact environnemental
    displayEnvironmentalImpact(data.impact_environnemental);
    
    // Impact économique
    displayEconomicImpact(data.impact_economique);
    
    // Score global
    displayGlobalScore(data.score_global);
    
    // Fournisseurs recommandés
    displaySuppliers(data.fournisseurs_recommandes || []);
    
    // Recommandations
    displayRecommendations(data.recommandations || []);
    
    // Enquête de satisfaction
    displaySatisfactionSurvey();
    
    // Afficher la section résultats
    showResults();
}

// Affichage des fournisseurs
function displaySuppliers(suppliers) {
    const container = document.getElementById('suppliers');
    const card = document.getElementById('suppliersCard');
    
    if (!suppliers || suppliers.length === 0) {
        card.style.display = 'none';
        return;
    }
    
    card.style.display = 'block';
    
    container.innerHTML = suppliers.map(supplier => `
        <div class="supplier-card">
            <div class="supplier-header">
                <h4 class="supplier-name">
                    <i class="fas fa-store"></i> ${supplier.nom}
                </h4>
                <span class="supplier-type ${supplier.type}">${t(supplier.type)}</span>
            </div>
            
            <div class="supplier-body">
                <div class="supplier-section">
                    <h5><i class="fas fa-box"></i> ${t('specialties')}</h5>
                    <div class="supplier-tags">
                        ${supplier.specialites.slice(0, 3).map(spec => 
                            `<span class="tag">${spec}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="supplier-section">
                    <h5><i class="fas fa-tags"></i> ${t('brandsAvailable')}</h5>
                    <div class="supplier-tags">
                        ${supplier.marques_disponibles.slice(0, 4).map(marque => 
                            `<span class="tag brand">${marque}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="supplier-section">
                    <h5><i class="fas fa-info-circle"></i> ${t('whySupplier')}</h5>
                    <p class="supplier-relevance">${getLocalizedText(supplier.pertinence)}</p>
                </div>
                
                <div class="supplier-info">
                    <div class="info-row">
                        <i class="fas fa-truck"></i>
                        <span>${t('delivery')}: ${supplier.livraison.delai_moyen}</span>
                    </div>
                    <div class="info-row">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${supplier.livraison.zones.join(', ')}</span>
                    </div>
                    <div class="info-row">
                        <i class="fas fa-shopping-cart"></i>
                        <span>${t('minOrder')}: ${supplier.livraison.commande_minimum || t('onQuote')}</span>
                    </div>
                    <div class="info-row">
                        <i class="fas fa-euro-sign"></i>
                        <span class="price-${supplier.prix_indicatif}">${t(supplier.prix_indicatif)}</span>
                    </div>
                </div>
            </div>
            
            <div class="supplier-footer">
                ${supplier.contact.site_web ? `
                    <a href="${supplier.contact.site_web}" target="_blank" class="supplier-link">
                        <i class="fas fa-globe"></i> ${t('website')}
                    </a>
                ` : ''}
                ${supplier.contact.telephone ? `
                    <a href="tel:${supplier.contact.telephone}" class="supplier-link">
                        <i class="fas fa-phone"></i> ${supplier.contact.telephone}
                    </a>
                ` : ''}
                ${supplier.contact.email ? `
                    <a href="mailto:${supplier.contact.email}" class="supplier-link">
                        <i class="fas fa-envelope"></i> ${t('email')}
                    </a>
                ` : ''}
            </div>
        </div>
    `).join('');
}

// Affichage de la comparaison nutritionnelle
function displayNutritionComparison(nutrition) {
    const container = document.getElementById('nutritionComparison');
    
    container.innerHTML = `
        <div class="comparison-item">
            <h4>${t('proteinsShort')}</h4>
            <div class="comparison-value">${nutrition.vegetale.proteines}<span class="comparison-unit">g</span></div>
            <small>${t('vs')} ${nutrition.original.proteines}g</small>
        </div>
        <div class="comparison-item">
            <h4>${t('caloriesShort')}</h4>
            <div class="comparison-value">${nutrition.vegetale.calories}<span class="comparison-unit">kcal</span></div>
            <small>${t('vs')} ${nutrition.original.calories}kcal</small>
        </div>
        <div class="comparison-item">
            <h4>${t('fiberShort')}</h4>
            <div class="comparison-value">${nutrition.vegetale.fibres}<span class="comparison-unit">g</span></div>
            <small>${t('vs')} ${nutrition.original.fibres}g</small>
        </div>
        <div class="comparison-item">
            <h4>${t('equivalenceShort')}</h4>
            <div class="comparison-value">${nutrition.equivalence_pourcent}<span class="comparison-unit">%</span></div>
        </div>
    `;
    
    // Créer le graphique
    createNutritionChart(nutrition);
}

// Graphique nutritionnel
function createNutritionChart(nutrition) {
    const ctx = document.getElementById('nutritionChart');
    
    // Détruire le graphique existant s'il existe
    if (nutritionChartInstance) {
        nutritionChartInstance.destroy();
    }
    
    nutritionChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [t('proteinsG'), t('caloriesKcal'), t('fiberG')],
            datasets: [
                {
                    label: t('original'),
                    data: [nutrition.original.proteines, nutrition.original.calories / 10, nutrition.original.fibres],
                    backgroundColor: 'rgba(239, 68, 68, 0.5)',
                    borderColor: 'rgba(239, 68, 68, 1)',
                    borderWidth: 2
                },
                {
                    label: t('plantBased'),
                    data: [nutrition.vegetale.proteines, nutrition.vegetale.calories / 10, nutrition.vegetale.fibres],
                    backgroundColor: 'rgba(16, 185, 129, 0.5)',
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Affichage de l'impact environnemental
function displayEnvironmentalImpact(impact) {
    const container = document.getElementById('environmentalImpact');
    
    container.innerHTML = `
        <div class="impact-item">
            <div class="impact-label">${t('co2OriginalLabel')}</div>
            <div class="impact-value negative">${impact.co2_original_kg.toFixed(2)} kg</div>
        </div>
        <div class="impact-item">
            <div class="impact-label">${t('co2PlantLabel')}</div>
            <div class="impact-value positive">${impact.co2_vegetale_kg.toFixed(2)} kg</div>
        </div>
        <div class="impact-item">
            <div class="impact-label">${t('co2GainLabel')}</div>
            <div class="impact-value positive">-${impact.gain_co2_kg.toFixed(2)} kg</div>
            <div class="impact-percentage">(-${impact.gain_co2_pourcent}%)</div>
        </div>
        <div class="impact-explanation">
            <i class="fas fa-info-circle"></i> ${getLocalizedText(impact.explication)}
        </div>
    `;
    
    // Créer le graphique
    createCO2Chart(impact);
}

// Graphique CO2
function createCO2Chart(impact) {
    const ctx = document.getElementById('co2Chart');
    
    // Détruire le graphique existant s'il existe
    if (co2ChartInstance) {
        co2ChartInstance.destroy();
    }
    
    co2ChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [t('original'), t('plantBased'), t('saved')],
            datasets: [{
                data: [
                    impact.co2_vegetale_kg,
                    0,
                    impact.gain_co2_kg
                ],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.7)',
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(16, 185, 129, 0.3)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Affichage de l'impact économique
function displayEconomicImpact(impact) {
    const container = document.getElementById('economicImpact');
    
    // Debug: afficher les données reçues
    console.log('💰 Impact économique:', {
        cout_original: impact.cout_original_euros,
        cout_vegetale: impact.cout_vegetale_euros,
        economie: impact.economie_euros,
        economie_pourcent: impact.economie_pourcent
    });
    
    container.innerHTML = `
        <div class="impact-item">
            <div class="impact-label">${t('costOriginalLabel')}</div>
            <div class="impact-value negative">${impact.cout_original_euros.toFixed(2)} €</div>
        </div>
        <div class="impact-item">
            <div class="impact-label">${t('costPlantLabel')}</div>
            <div class="impact-value positive">${impact.cout_vegetale_euros.toFixed(2)} €</div>
        </div>
        <div class="impact-item">
            <div class="impact-label">${t('savingsLabel')}</div>
            <div class="impact-value positive">-${impact.economie_euros.toFixed(2)} €</div>
            <div class="impact-percentage">(-${impact.economie_pourcent}%)</div>
        </div>
        <div class="impact-explanation">
            <i class="fas fa-info-circle"></i> ${getLocalizedText(impact.explication)}
        </div>
    `;
    
    // Créer le graphique
    createCostChart(impact);
}

// Graphique coûts
function createCostChart(impact) {
    const ctx = document.getElementById('costChart');
    
    // Détruire le graphique existant s'il existe
    if (costChartInstance) {
        costChartInstance.destroy();
    }
    
    costChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [t('originalCost'), t('plantBasedCost'), t('economy')],
            datasets: [{
                label: t('eurosLabel'),
                data: [
                    impact.cout_original_euros,
                    impact.cout_vegetale_euros,
                    impact.economie_euros
                ],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.5)',
                    'rgba(16, 185, 129, 0.5)',
                    'rgba(59, 130, 246, 0.5)'
                ],
                borderColor: [
                    'rgba(239, 68, 68, 1)',
                    'rgba(16, 185, 129, 1)',
                    'rgba(59, 130, 246, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Affichage du score global
function displayGlobalScore(score) {
    const container = document.getElementById('globalScore');
    
    container.innerHTML = `
        <div class="score-circle" style="--score: ${score}">
            <div class="score-number">${score}</div>
        </div>
        <div class="score-label">${t('scoreQualityLabel')}</div>
    `;
}

// Affichage des recommandations
function displayRecommendations(recommendations) {
    const container = document.getElementById('recommendations');
    
    if (recommendations.length === 0) {
        container.innerHTML = `<li>${t('noRecommendations')}</li>`;
        return;
    }
    
    container.innerHTML = recommendations.map(rec => `<li>${getLocalizedText(rec)}</li>`).join('');
}

// Affichage de l'enquête de satisfaction
function displaySatisfactionSurvey() {
    // Vérifier si l'enquête existe déjà
    const existingSurvey = document.getElementById('satisfactionSurvey');
    if (existingSurvey) {
        existingSurvey.remove();
    }
    
    // Créer le bloc d'enquête
    const surveyHTML = `
        <div class="satisfaction-survey" id="satisfactionSurvey">
            <h4><i class="fas fa-clipboard-check"></i> ${t('satisfactionTitle')}</h4>
            
            <div class="satisfaction-question">
                <p>${t('satisfactionQuestion')}</p>
                <div class="satisfaction-buttons">
                    <button class="satisfaction-btn" data-answer="yes">
                        <i class="fas fa-check-circle"></i> ${t('satisfactionYes')}
                    </button>
                    <button class="satisfaction-btn" data-answer="no">
                        <i class="fas fa-times-circle"></i> ${t('satisfactionNo')}
                    </button>
                </div>
            </div>
            
            <div class="satisfaction-rating">
                <p>${t('satisfactionRating')}</p>
                <div class="rating-stars">
                    <i class="fas fa-star star" data-rating="1"></i>
                    <i class="fas fa-star star" data-rating="2"></i>
                    <i class="fas fa-star star" data-rating="3"></i>
                    <i class="fas fa-star star" data-rating="4"></i>
                    <i class="fas fa-star star" data-rating="5"></i>
                </div>
            </div>
            
            <div class="satisfaction-thank-you" id="satisfactionThankYou">
                <i class="fas fa-heart"></i>
                <p>${t('satisfactionThankYou')}</p>
            </div>
        </div>
    `;
    
    // Insérer l'enquête après les actions (boutons Télécharger/Partager)
    const actionsDiv = document.querySelector('.actions');
    if (actionsDiv) {
        actionsDiv.insertAdjacentHTML('afterend', surveyHTML);
        
        // Ajouter les event listeners
        setupSatisfactionListeners();
    }
}

// Configuration des event listeners pour l'enquête
function setupSatisfactionListeners() {
    let selectedAnswer = null;
    let selectedRating = 0;
    
    // Boutons Oui/Non
    const answerButtons = document.querySelectorAll('.satisfaction-btn[data-answer]');
    answerButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Retirer la sélection des autres boutons
            answerButtons.forEach(b => b.classList.remove('selected'));
            // Ajouter la sélection au bouton cliqué
            this.classList.add('selected');
            selectedAnswer = this.dataset.answer;
            
            // Vérifier si on peut afficher le message de remerciement
            checkSurveyCompletion(selectedAnswer, selectedRating);
        });
    });
    
    // Étoiles de notation
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.dataset.rating);
            selectedRating = rating;
            
            // Mettre à jour l'affichage des étoiles
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
            
            // Vérifier si on peut afficher le message de remerciement
            checkSurveyCompletion(selectedAnswer, selectedRating);
        });
        
        // Effet hover
        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.dataset.rating);
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.style.color = '#fbbf24';
                }
            });
        });
        
        star.addEventListener('mouseleave', function() {
            stars.forEach((s, index) => {
                if (index < selectedRating) {
                    s.style.color = '#fbbf24';
                } else {
                    s.style.color = '#d1d5db';
                }
            });
        });
    });
}

// Vérifier si l'enquête est complète et afficher le message de remerciement
function checkSurveyCompletion(answer, rating) {
    if (answer && rating > 0) {
        // Afficher le message de remerciement
        const thankYouDiv = document.getElementById('satisfactionThankYou');
        if (thankYouDiv) {
            thankYouDiv.classList.add('show');
            
            // Log les données (pour analyse future)
            console.log('📊 Enquête de satisfaction:', {
                utilisera_recette: answer === 'yes',
                note: rating,
                timestamp: new Date().toISOString()
            });
            
            // Masquer le message après 3 secondes
            setTimeout(() => {
                thankYouDiv.classList.remove('show');
            }, 3000);
        }
    }
}

// Téléchargement du rapport
function downloadReport() {
    if (allAnalyses.length === 0) return;
    
    const currentData = allAnalyses[currentAnalysisIndex];
    
    const report = {
        date: new Date().toISOString(),
        plat_original: currentData.plat_original,
        alternative_vegetale: currentData.alternative_vegetale,
        nutrition: currentData.nutrition,
        impact_environnemental: currentData.impact_environnemental,
        impact_economique: currentData.impact_economique,
        score_global: currentData.score_global,
        recommandations: currentData.recommandations
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ezvg-${currentData.plat_original.replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showToast(t('toastReportDownloaded'), 'success');
}

// Partage des résultats
function shareResults() {
    if (allAnalyses.length === 0) return;
    
    const currentData = allAnalyses[currentAnalysisIndex];
    
    const text = `🌱 EZVG - Easy Veggie\n\n${currentData.plat_original} → ${currentData.alternative_vegetale.nom}\n\n💚 -${currentData.impact_environnemental.gain_co2_kg.toFixed(1)}kg CO2\n💰 -${currentData.impact_economique.economie_euros.toFixed(2)}€\n\nScore: ${currentData.score_global}/100`;
    
    if (navigator.share) {
        navigator.share({
            title: 'EZVG - Easy Veggie',
            text: text
        }).then(() => {
            showToast(t('toastSharedSuccess'), 'success');
        }).catch(() => {
            copyToClipboard(text);
        });
    } else {
        copyToClipboard(text);
    }
}

// Copier dans le presse-papier
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(t('toastCopied'), 'success');
    }).catch(() => {
        showToast(t('toastCopyError'), 'error');
    });
}

// Gestion de l'affichage
function showLoading(text) {
    uploadSection.classList.add('hidden');
    resultsSection.classList.add('hidden');
    loadingSection.classList.remove('hidden');
    loadingText.textContent = text;
}

function hideLoading() {
    loadingSection.classList.add('hidden');
}

function showResults() {
    uploadSection.classList.add('hidden');
    loadingSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateLoadingText(text) {
    loadingText.textContent = text;
}

function resetApp() {
    uploadSection.classList.remove('hidden');
    resultsSection.classList.add('hidden');
    loadingSection.classList.add('hidden');
    platInput.value = '';
    ingredientsInput.value = '';
    fileInput.value = '';
    allAnalyses = [];
    currentAnalysisIndex = 0;
    
    // Détruire les graphiques
    if (nutritionChartInstance) {
        nutritionChartInstance.destroy();
        nutritionChartInstance = null;
    }
    if (co2ChartInstance) {
        co2ChartInstance.destroy();
        co2ChartInstance = null;
    }
    if (costChartInstance) {
        costChartInstance.destroy();
        costChartInstance = null;
    }
    
    // Supprimer la navigation
    const nav = document.getElementById('dishNavigation');
    if (nav) nav.remove();
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Toast notifications
function showToast(message, type = 'info') {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}
