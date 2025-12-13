# Hack the Fork - Installation Script pour Windows

Write-Host ""
Write-Host "🌱 ========================================" -ForegroundColor Green
Write-Host "🌱  Hack the Fork - Installation" -ForegroundColor Green
Write-Host "🌱 ========================================" -ForegroundColor Green
Write-Host ""

# Vérifier Node.js
try {
    $nodeVersion = node --version
    $npmVersion = npm --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
    Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "❌ Node.js n'est pas installé" -ForegroundColor Red
    Write-Host "📥 Installez Node.js depuis https://nodejs.org" -ForegroundColor Yellow
    exit 1
}

# Installation Backend
Write-Host "📦 Installation des dépendances backend..." -ForegroundColor Cyan
Set-Location backend

try {
    npm install
    Write-Host "✅ Dépendances backend installées" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur lors de l'installation des dépendances" -ForegroundColor Red
    exit 1
}

# Vérifier .env
if (-not (Test-Path .env)) {
    Write-Host "⚠️  Fichier .env non trouvé" -ForegroundColor Yellow
    Write-Host "📝 Création du fichier .env..." -ForegroundColor Cyan
    Copy-Item .env.example .env
    Write-Host "✅ Fichier .env créé" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠️  IMPORTANT: Configurez votre clé API Blackbox dans backend/.env" -ForegroundColor Yellow
    Write-Host "   BLACKBOX_API_KEY=votre_cle_api" -ForegroundColor Yellow
    Write-Host ""
}

Set-Location ..

Write-Host ""
Write-Host "🌱 ========================================" -ForegroundColor Green
Write-Host "🌱  Installation terminée !" -ForegroundColor Green
Write-Host "🌱 ========================================" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Pour démarrer l'application:" -ForegroundColor Cyan
Write-Host ""
Write-Host "   1. Backend:" -ForegroundColor White
Write-Host "      cd backend" -ForegroundColor Gray
Write-Host "      npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "   2. Frontend:" -ForegroundColor White
Write-Host "      Ouvrir frontend/index.html dans un navigateur" -ForegroundColor Gray
Write-Host "      OU" -ForegroundColor Gray
Write-Host "      cd frontend; python -m http.server 5500" -ForegroundColor Gray
Write-Host ""
Write-Host "📖 Documentation: README.md" -ForegroundColor Cyan
Write-Host "🚀 Guide rapide: QUICKSTART.md" -ForegroundColor Cyan
Write-Host ""
