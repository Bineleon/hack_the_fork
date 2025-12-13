// Configuration
const API_URL = 'http://localhost:3000/api/menu';

// État de l'application
let currentAnalysis = null;

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

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    checkAPIHealth();
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
}

// Vérification de l'état de l'API
async function checkAPIHealth() {
    try {
        const response = await fetch(`${API_URL}/health`);
        const data = await response.json();
        
        if (data.status === 'ok') {
            console.log('✅ API connectée');
            if (data.services.blackbox === 'not_configured') {
                showToast('⚠️ Mode démo activé (API Blackbox non configurée)', 'warning');
            }
        }
    } catch (error) {
        console.error('❌ API non disponible:', error);
        showToast('❌ Impossible de se connecter à l\'API', 'error');
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
        showToast('❌ Veuillez sélectionner une image', 'error');
        return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
        showToast('❌ L\'image est trop volumineuse (max 10MB)', 'error');
        return;
    }
    
    // Afficher le loading
    showLoading('Scan de l\'image en cours...');
    
    try {
        // Upload et scan
        const formData = new FormData();
        formData.append('menu', file);
        
        updateLoadingText('Extraction du texte...');
        const scanResponse = await fetch(`${API_URL}/scan`, {
            method: 'POST',
            body: formData
        });
        
        if (!scanResponse.ok) {
            throw new Error('Erreur lors du scan');
        }
        
        const scanData = await scanResponse.json();
        
        if (!scanData.plats || scanData.plats.length === 0) {
            showToast('❌ Aucun plat détecté dans l\'image', 'error');
            hideLoading();
            return;
        }
        
        // Analyser le premier plat détecté
        const firstPlat = scanData.plats[0];
        updateLoadingText('Génération de l\'alternative végétale...');
        
        await analyzeMenu(firstPlat.nom, firstPlat.ingredients || []);
        
    } catch (error) {
        console.error('Erreur:', error);
        showToast('❌ Erreur lors du traitement de l\'image', 'error');
        hideLoading();
    }
}

// Analyse manuelle
async function handleManualAnalysis() {
    const plat = platInput.value.trim();
    
    if (!plat) {
        showToast('❌ Veuillez entrer le nom d\'un plat', 'error');
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
    
    showLoading('Analyse en cours...');
    await analyzeMenu(plat, ingredients);
}

// Analyse du menu via l'API
async function analyzeMenu(plat, ingredients) {
    try {
        updateLoadingText('Analyse nutritionnelle...');
        
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
        currentAnalysis = result.data;
        
        updateLoadingText('Calcul des impacts...');
        
        // Petit délai pour l'effet
        setTimeout(() => {
            hideLoading();
            displayResults(currentAnalysis);
        }, 500);
        
    } catch (error) {
        console.error('Erreur:', error);
        showToast('❌ Erreur lors de l\'analyse', 'error');
        hideLoading();
    }
}

// Affichage des résultats
function displayResults(data) {
    // Plat original
    document.getElementById('originalDish').innerHTML = `
        <div class="dish-name">${data.plat_original}</div>
        <h4>Ingrédients:</h4>
        <ul class="ingredients-list">
            ${data.ingredients_originaux.map(ing => `
                <li>
                    <span>${ing.nom}</span>
                    <span>${ing.quantite}${ing.unite || ''}</span>
                </li>
            `).join('')}
        </ul>
    `;
    
    // Alternative végétale
    document.getElementById('veganAlternative').innerHTML = `
        <div class="dish-name">${data.alternative_vegetale.nom}</div>
        <h4>Ingrédients:</h4>
        <ul class="ingredients-list">
            ${data.alternative_vegetale.ingredients.map(ing => `
                <li>
                    <span>${ing.nom}</span>
                    <span>${ing.quantite}${ing.unite || ''}</span>
                </li>
            `).join('')}
        </ul>
        <div class="preparation">
            <h4><i class="fas fa-book"></i> Préparation:</h4>
            <p>${data.alternative_vegetale.preparation}</p>
            ${data.alternative_vegetale.temps_preparation ? `
                <p><strong>⏱️ Temps:</strong> ${data.alternative_vegetale.temps_preparation}</p>
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
                <span class="supplier-type ${supplier.type}">${supplier.type}</span>
            </div>
            
            <div class="supplier-body">
                <div class="supplier-section">
                    <h5><i class="fas fa-box"></i> Spécialités</h5>
                    <div class="supplier-tags">
                        ${supplier.specialites.slice(0, 3).map(spec => 
                            `<span class="tag">${spec}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="supplier-section">
                    <h5><i class="fas fa-tags"></i> Marques disponibles</h5>
                    <div class="supplier-tags">
                        ${supplier.marques_disponibles.slice(0, 4).map(marque => 
                            `<span class="tag brand">${marque}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="supplier-section">
                    <h5><i class="fas fa-info-circle"></i> Pourquoi ce fournisseur ?</h5>
                    <p class="supplier-relevance">${supplier.pertinence}</p>
                </div>
                
                <div class="supplier-info">
                    <div class="info-row">
                        <i class="fas fa-truck"></i>
                        <span>Livraison: ${supplier.livraison.delai_moyen}</span>
                    </div>
                    <div class="info-row">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${supplier.livraison.zones.join(', ')}</span>
                    </div>
                    <div class="info-row">
                        <i class="fas fa-shopping-cart"></i>
                        <span>Min: ${supplier.livraison.commande_minimum || 'Sur devis'}</span>
                    </div>
                    <div class="info-row">
                        <i class="fas fa-euro-sign"></i>
                        <span class="price-${supplier.prix_indicatif}">${supplier.prix_indicatif}</span>
                    </div>
                </div>
            </div>
            
            <div class="supplier-footer">
                ${supplier.contact.site_web ? `
                    <a href="${supplier.contact.site_web}" target="_blank" class="supplier-link">
                        <i class="fas fa-globe"></i> Site web
                    </a>
                ` : ''}
                ${supplier.contact.telephone ? `
                    <a href="tel:${supplier.contact.telephone}" class="supplier-link">
                        <i class="fas fa-phone"></i> ${supplier.contact.telephone}
                    </a>
                ` : ''}
                ${supplier.contact.email ? `
                    <a href="mailto:${supplier.contact.email}" class="supplier-link">
                        <i class="fas fa-envelope"></i> Email
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
            <h4>Protéines</h4>
            <div class="comparison-value">${nutrition.vegetale.proteines}<span class="comparison-unit">g</span></div>
            <small>vs ${nutrition.original.proteines}g</small>
        </div>
        <div class="comparison-item">
            <h4>Calories</h4>
            <div class="comparison-value">${nutrition.vegetale.calories}<span class="comparison-unit">kcal</span></div>
            <small>vs ${nutrition.original.calories}kcal</small>
        </div>
        <div class="comparison-item">
            <h4>Fibres</h4>
            <div class="comparison-value">${nutrition.vegetale.fibres}<span class="comparison-unit">g</span></div>
            <small>vs ${nutrition.original.fibres}g</small>
        </div>
        <div class="comparison-item">
            <h4>Équivalence</h4>
            <div class="comparison-value">${nutrition.equivalence_pourcent}<span class="comparison-unit">%</span></div>
        </div>
    `;
    
    // Créer le graphique
    createNutritionChart(nutrition);
}

// Graphique nutritionnel
function createNutritionChart(nutrition) {
    const ctx = document.getElementById('nutritionChart');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Protéines (g)', 'Calories (kcal)', 'Fibres (g)'],
            datasets: [
                {
                    label: 'Original',
                    data: [nutrition.original.proteines, nutrition.original.calories / 10, nutrition.original.fibres],
                    backgroundColor: 'rgba(239, 68, 68, 0.5)',
                    borderColor: 'rgba(239, 68, 68, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Végétal',
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
            <div class="impact-label">CO2 Original</div>
            <div class="impact-value negative">${impact.co2_original_kg.toFixed(2)} kg</div>
        </div>
        <div class="impact-item">
            <div class="impact-label">CO2 Végétal</div>
            <div class="impact-value positive">${impact.co2_vegetale_kg.toFixed(2)} kg</div>
        </div>
        <div class="impact-item">
            <div class="impact-label">Gain CO2</div>
            <div class="impact-value positive">-${impact.gain_co2_kg.toFixed(2)} kg</div>
            <div class="impact-percentage">(-${impact.gain_co2_pourcent}%)</div>
        </div>
        <div class="impact-explanation">
            <i class="fas fa-info-circle"></i> ${impact.explication}
        </div>
    `;
    
    // Créer le graphique
    createCO2Chart(impact);
}

// Graphique CO2
function createCO2Chart(impact) {
    const ctx = document.getElementById('co2Chart');
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Original', 'Végétal', 'Économisé'],
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
    
    container.innerHTML = `
        <div class="impact-item">
            <div class="impact-label">Coût Original</div>
            <div class="impact-value negative">${impact.cout_original_euros.toFixed(2)} €</div>
        </div>
        <div class="impact-item">
            <div class="impact-label">Coût Végétal</div>
            <div class="impact-value positive">${impact.cout_vegetale_euros.toFixed(2)} €</div>
        </div>
        <div class="impact-item">
            <div class="impact-label">Économie</div>
            <div class="impact-value positive">-${impact.economie_euros.toFixed(2)} €</div>
            <div class="impact-percentage">(-${impact.economie_pourcent}%)</div>
        </div>
        <div class="impact-explanation">
            <i class="fas fa-info-circle"></i> ${impact.explication}
        </div>
    `;
    
    // Créer le graphique
    createCostChart(impact);
}

// Graphique coûts
function createCostChart(impact) {
    const ctx = document.getElementById('costChart');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Coût Original', 'Coût Végétal', 'Économie'],
            datasets: [{
                label: 'Euros (€)',
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
        <div class="score-label">Score de qualité de l'alternative</div>
    `;
}

// Affichage des recommandations
function displayRecommendations(recommendations) {
    const container = document.getElementById('recommendations');
    
    if (recommendations.length === 0) {
        container.innerHTML = '<li>Aucune recommandation spécifique</li>';
        return;
    }
    
    container.innerHTML = recommendations.map(rec => `<li>${rec}</li>`).join('');
}

// Téléchargement du rapport
function downloadReport() {
    if (!currentAnalysis) return;
    
    const report = {
        date: new Date().toISOString(),
        plat_original: currentAnalysis.plat_original,
        alternative_vegetale: currentAnalysis.alternative_vegetale,
        nutrition: currentAnalysis.nutrition,
        impact_environnemental: currentAnalysis.impact_environnemental,
        impact_economique: currentAnalysis.impact_economique,
        score_global: currentAnalysis.score_global,
        recommandations: currentAnalysis.recommandations
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hack-the-fork-${currentAnalysis.plat_original.replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('✅ Rapport téléchargé', 'success');
}

// Partage des résultats
function shareResults() {
    if (!currentAnalysis) return;
    
    const text = `🌱 Hack the Fork\n\n${currentAnalysis.plat_original} → ${currentAnalysis.alternative_vegetale.nom}\n\n💚 -${currentAnalysis.impact_environnemental.gain_co2_kg.toFixed(1)}kg CO2\n💰 -${currentAnalysis.impact_economique.economie_euros.toFixed(2)}€\n\nScore: ${currentAnalysis.score_global}/100`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Hack the Fork',
            text: text
        }).then(() => {
            showToast('✅ Partagé avec succès', 'success');
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
        showToast('✅ Copié dans le presse-papier', 'success');
    }).catch(() => {
        showToast('❌ Erreur lors de la copie', 'error');
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
    currentAnalysis = null;
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
