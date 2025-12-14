// Système d'internationalisation (i18n)
const translations = {
    fr: {
        // Header
        appTitle: "EZVG",
        tagline: "Simplifiez votre transition végétale",
        
        // Upload Section
        uploadTitle: "Scanner un Menu",
        uploadSubtitle: "Uploadez une photo de votre menu pour une analyse automatique",
        uploadText: "Glissez-déposez une image ou cliquez pour sélectionner",
        uploadTypes: "PNG, JPG, JPEG jusqu'à 10MB",
        
        // Manual Input
        manualTitle: "Analyse Manuelle",
        dishLabel: "Nom du plat",
        dishPlaceholder: "Ex: Poulet rôti aux herbes",
        ingredientsLabel: "Ingrédients (optionnel)",
        ingredientsPlaceholder: "Un ingrédient par ligne\nEx: Poulet 200g\nHerbes de Provence 10g",
        analyzeButton: "Analyser",
        
        // Loading
        loadingTitle: "Analyse en cours...",
        loadingScanning: "Scan de l'image en cours...",
        loadingExtracting: "Extraction du texte...",
        loadingAnalyzing: "Génération de l'alternative végétale...",
        loadingNutrition: "Analyse nutritionnelle...",
        loadingImpact: "Calcul des impacts...",
        
        // Results
        resultsTitle: "Résultats de l'Analyse",
        originalDish: "Plat Original",
        veganAlternative: "Alternative Végétale",
        ingredients: "Ingrédients",
        preparation: "Préparation",
        prepTime: "Temps",
        
        // Navigation
        previous: "Précédent",
        next: "Suivant",
        
        // Nutrition
        nutritionTitle: "Comparaison Nutritionnelle",
        proteins: "Protéines",
        calories: "Calories",
        fiber: "Fibres",
        equivalence: "Équivalence",
        vs: "vs",
        
        // Environmental Impact
        environmentalTitle: "Impact Environnemental",
        co2Original: "CO2 Original",
        co2Vegan: "CO2 Végétal",
        co2Gain: "Gain CO2",
        
        // Economic Impact
        economicTitle: "Impact Économique",
        costOriginal: "Coût Original",
        costVegan: "Coût Végétal",
        savings: "Économie",
        
        // Score
        scoreTitle: "Score Global",
        scoreLabel: "Score de qualité de l'alternative",
        
        // Suppliers
        suppliersTitle: "Fournisseurs Recommandés",
        specialties: "Spécialités",
        brandsAvailable: "Marques disponibles",
        whySupplier: "Pourquoi ce fournisseur ?",
        delivery: "Livraison",
        zones: "Zones",
        minOrder: "Min",
        website: "Site web",
        phone: "Téléphone",
        email: "Email",
        
        // Recommendations
        recommendationsTitle: "Recommandations",
        
        // Actions
        newAnalysis: "Nouvelle Analyse",
        download: "Télécharger le Rapport",
        share: "Partager",
        
        // Toast Messages
        toastApiConnected: "API connectée",
        toastDemoMode: "Mode démo activé (API Blackbox non configurée)",
        toastApiError: "Impossible de se connecter à l'API",
        toastSelectImage: "Veuillez sélectionner une image",
        toastImageTooLarge: "L'image est trop volumineuse (max 10MB)",
        toastEnterDish: "Veuillez entrer le nom d'un plat",
        toastNoDishDetected: "Aucun plat détecté dans l'image",
        toastScanError: "Erreur lors du traitement de l'image",
        toastAnalysisError: "Erreur lors de l'analyse",
        toastNoAnalysisSuccess: "Aucune analyse réussie",
        toastReportDownloaded: "Rapport téléchargé",
        toastSharedSuccess: "Partagé avec succès",
        toastCopied: "Copié dans le presse-papier",
        toastCopyError: "Erreur lors de la copie",
        
        // Footer
        footerText: "EZVG © 2024 - Easy Veggie",
        github: "GitHub",
        documentation: "Documentation",
        contact: "Contact",
        
        // Supplier Types
        wholesaler: "grossiste",
        distributor: "distributeur",
        manufacturer: "fabricant",
        
        // Price Levels
        economical: "économique",
        medium: "moyen",
        premium: "premium",
        
        // Dynamic Content Labels
        ingredientsColon: "Ingrédients:",
        preparationColon: "Préparation:",
        timeColon: "Temps:",
        noRecommendations: "Aucune recommandation spécifique",
        onQuote: "Sur devis",
        
        // Chart Labels
        proteinsG: "Protéines (g)",
        caloriesKcal: "Calories (kcal)",
        fiberG: "Fibres (g)",
        original: "Original",
        plantBased: "Végétal",
        saved: "Économisé",
        originalCost: "Coût Original",
        plantBasedCost: "Coût Végétal",
        economy: "Économie",
        eurosLabel: "Euros (€)",
        
        // Nutrition Labels (short)
        proteinsShort: "Protéines",
        caloriesShort: "Calories",
        fiberShort: "Fibres",
        equivalenceShort: "Équivalence",
        
        // Impact Labels
        co2OriginalLabel: "CO2 Original",
        co2PlantLabel: "CO2 Végétal",
        co2GainLabel: "Gain CO2",
        costOriginalLabel: "Coût Original",
        costPlantLabel: "Coût Végétal",
        savingsLabel: "Économie",
        
        // Score Label
        scoreQualityLabel: "Score de qualité de l'alternative",
        
        // Satisfaction Survey
        satisfactionTitle: "Enquête de Satisfaction",
        satisfactionQuestion: "Utiliserez-vous cette recette dans votre restaurant ?",
        satisfactionYes: "Oui",
        satisfactionNo: "Non",
        satisfactionRating: "Notez cette alternative :",
        satisfactionThankYou: "Merci pour votre retour !"
    },
    
    en: {
        // Header
        appTitle: "EZVG",
        tagline: "Simplify your plant-based transition",
        
        // Upload Section
        uploadTitle: "Scan a Menu",
        uploadSubtitle: "Upload a photo of your menu for automatic analysis",
        uploadText: "Drag and drop an image or click to select",
        uploadTypes: "PNG, JPG, JPEG up to 10MB",
        
        // Manual Input
        manualTitle: "Manual Analysis",
        dishLabel: "Dish name",
        dishPlaceholder: "E.g.: Roasted chicken with herbs",
        ingredientsLabel: "Ingredients (optional)",
        ingredientsPlaceholder: "One ingredient per line\nE.g.: Chicken 200g\nHerbs de Provence 10g",
        analyzeButton: "Analyze",
        
        // Loading
        loadingTitle: "Analysis in progress...",
        loadingScanning: "Scanning image...",
        loadingExtracting: "Extracting text...",
        loadingAnalyzing: "Generating plant-based alternative...",
        loadingNutrition: "Nutritional analysis...",
        loadingImpact: "Calculating impacts...",
        
        // Results
        resultsTitle: "Analysis Results",
        originalDish: "Original Dish",
        veganAlternative: "Plant-Based Alternative",
        ingredients: "Ingredients",
        preparation: "Preparation",
        prepTime: "Time",
        
        // Navigation
        previous: "Previous",
        next: "Next",
        
        // Nutrition
        nutritionTitle: "Nutritional Comparison",
        proteins: "Proteins",
        calories: "Calories",
        fiber: "Fiber",
        equivalence: "Equivalence",
        vs: "vs",
        
        // Environmental Impact
        environmentalTitle: "Environmental Impact",
        co2Original: "Original CO2",
        co2Vegan: "Plant-Based CO2",
        co2Gain: "CO2 Savings",
        
        // Economic Impact
        economicTitle: "Economic Impact",
        costOriginal: "Original Cost",
        costVegan: "Plant-Based Cost",
        savings: "Savings",
        
        // Score
        scoreTitle: "Overall Score",
        scoreLabel: "Alternative quality score",
        
        // Suppliers
        suppliersTitle: "Recommended Suppliers",
        specialties: "Specialties",
        brandsAvailable: "Available brands",
        whySupplier: "Why this supplier?",
        delivery: "Delivery",
        zones: "Zones",
        minOrder: "Min",
        website: "Website",
        phone: "Phone",
        email: "Email",
        
        // Recommendations
        recommendationsTitle: "Recommendations",
        
        // Actions
        newAnalysis: "New Analysis",
        download: "Download Report",
        share: "Share",
        
        // Toast Messages
        toastApiConnected: "API connected",
        toastDemoMode: "Demo mode activated (Blackbox API not configured)",
        toastApiError: "Unable to connect to API",
        toastSelectImage: "Please select an image",
        toastImageTooLarge: "Image is too large (max 10MB)",
        toastEnterDish: "Please enter a dish name",
        toastNoDishDetected: "No dish detected in the image",
        toastScanError: "Error processing image",
        toastAnalysisError: "Error during analysis",
        toastNoAnalysisSuccess: "No successful analysis",
        toastReportDownloaded: "Report downloaded",
        toastSharedSuccess: "Shared successfully",
        toastCopied: "Copied to clipboard",
        toastCopyError: "Error copying",
        
        // Footer
        footerText: "EZVG © 2024 - Easy Veggie",
        github: "GitHub",
        documentation: "Documentation",
        contact: "Contact",
        
        // Supplier Types
        wholesaler: "wholesaler",
        distributor: "distributor",
        manufacturer: "manufacturer",
        
        // Price Levels
        economical: "economical",
        medium: "medium",
        premium: "premium",
        
        // Dynamic Content Labels
        ingredientsColon: "Ingredients:",
        preparationColon: "Preparation:",
        timeColon: "Time:",
        noRecommendations: "No specific recommendations",
        onQuote: "On quote",
        
        // Chart Labels
        proteinsG: "Proteins (g)",
        caloriesKcal: "Calories (kcal)",
        fiberG: "Fiber (g)",
        original: "Original",
        plantBased: "Plant-Based",
        saved: "Saved",
        originalCost: "Original Cost",
        plantBasedCost: "Plant-Based Cost",
        economy: "Savings",
        eurosLabel: "Euros (€)",
        
        // Nutrition Labels (short)
        proteinsShort: "Proteins",
        caloriesShort: "Calories",
        fiberShort: "Fiber",
        equivalenceShort: "Equivalence",
        
        // Impact Labels
        co2OriginalLabel: "Original CO2",
        co2PlantLabel: "Plant-Based CO2",
        co2GainLabel: "CO2 Savings",
        costOriginalLabel: "Original Cost",
        costPlantLabel: "Plant-Based Cost",
        savingsLabel: "Savings",
        
        // Score Label
        scoreQualityLabel: "Alternative quality score",
        
        // Satisfaction Survey
        satisfactionTitle: "Satisfaction Survey",
        satisfactionQuestion: "Will you use this recipe in your restaurant?",
        satisfactionYes: "Yes",
        satisfactionNo: "No",
        satisfactionRating: "Rate this alternative:",
        satisfactionThankYou: "Thank you for your feedback!"
    }
};

// Langue actuelle (par défaut: français)
let currentLanguage = 'fr';

// Fonction pour obtenir une traduction
function t(key) {
    return translations[currentLanguage][key] || key;
}

// Fonction pour changer la langue (Désactivée - 100% Français)
function setLanguage(lang) {
    currentLanguage = 'fr';
    updatePageLanguage();
}

// Fonction pour obtenir la langue actuelle
function getCurrentLanguage() {
    return currentLanguage;
}

// Fonction pour mettre à jour toute la page
function updatePageLanguage() {
    // Header
    document.querySelector('.logo h1').textContent = t('appTitle');
    document.querySelector('.tagline').textContent = t('tagline');
    
    // Upload Section
    const uploadSection = document.querySelector('.upload-section');
    if (uploadSection && !uploadSection.classList.contains('hidden')) {
        document.querySelector('.upload-section h2').innerHTML = `<i class="fas fa-camera"></i> ${t('uploadTitle')}`;
        document.querySelector('.subtitle').textContent = t('uploadSubtitle');
        document.querySelector('.upload-content p').textContent = t('uploadText');
        document.querySelector('.file-types').textContent = t('uploadTypes');
        
        // Manual Input
        document.querySelector('.manual-input h3').innerHTML = `<i class="fas fa-keyboard"></i> ${t('manualTitle')}`;
        document.querySelector('label[for="platInput"]').textContent = t('dishLabel');
        document.getElementById('platInput').placeholder = t('dishPlaceholder');
        document.querySelector('label[for="ingredientsInput"]').textContent = t('ingredientsLabel');
        document.getElementById('ingredientsInput').placeholder = t('ingredientsPlaceholder');
        document.getElementById('analyzeBtn').innerHTML = `<i class="fas fa-magic"></i> ${t('analyzeButton')}`;
    }
    
    // Results Section
    const resultsSection = document.getElementById('resultsSection');
    if (resultsSection && !resultsSection.classList.contains('hidden')) {
        document.querySelector('.results-header h2').innerHTML = `<i class="fas fa-check-circle"></i> ${t('resultsTitle')}`;
        document.getElementById('newAnalysisBtn').innerHTML = `<i class="fas fa-redo"></i> ${t('newAnalysis')}`;
        
        // Card Titles
        const cardTitles = document.querySelectorAll('.card-title');
        if (cardTitles[0]) cardTitles[0].innerHTML = `<i class="fas fa-utensils"></i> ${t('originalDish')}`;
        if (cardTitles[1]) cardTitles[1].innerHTML = `<i class="fas fa-leaf"></i> ${t('veganAlternative')}`;
        if (cardTitles[2]) cardTitles[2].innerHTML = `<i class="fas fa-chart-bar"></i> ${t('nutritionTitle')}`;
        if (cardTitles[3]) cardTitles[3].innerHTML = `<i class="fas fa-globe"></i> ${t('environmentalTitle')}`;
        if (cardTitles[4]) cardTitles[4].innerHTML = `<i class="fas fa-euro-sign"></i> ${t('economicTitle')}`;
        if (cardTitles[5]) cardTitles[5].innerHTML = `<i class="fas fa-star"></i> ${t('scoreTitle')}`;
        if (cardTitles[6]) cardTitles[6].innerHTML = `<i class="fas fa-store"></i> ${t('suppliersTitle')}`;
        if (cardTitles[7]) cardTitles[7].innerHTML = `<i class="fas fa-lightbulb"></i> ${t('recommendationsTitle')}`;
        
        // Actions
        document.getElementById('downloadBtn').innerHTML = `<i class="fas fa-download"></i> ${t('download')}`;
        document.getElementById('shareBtn').innerHTML = `<i class="fas fa-share-alt"></i> ${t('share')}`;
        
        // Refresh dynamic content if results are displayed
        if (typeof displayMultipleResults === 'function' && allAnalyses && allAnalyses.length > 0) {
            displayMultipleResults();
        }
    }
    
    // Footer
    document.querySelector('.footer p').textContent = t('footerText');
    
    // Update language toggle button
    updateLanguageToggleButton();
}

// Fonction pour mettre à jour le bouton de langue (Masqué)
function updateLanguageToggleButton() {
    const langToggle = document.getElementById('languageToggle');
    if (langToggle) {
        langToggle.style.display = 'none';
    }
}

// Export des fonctions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { t, setLanguage, getCurrentLanguage, updatePageLanguage };
}
