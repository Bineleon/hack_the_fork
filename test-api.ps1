# Hack the Fork - Tests API (PowerShell)

Write-Host ""
Write-Host "🧪 ========================================" -ForegroundColor Cyan
Write-Host "🧪  Hack the Fork - Tests API" -ForegroundColor Cyan
Write-Host "🧪 ========================================" -ForegroundColor Cyan
Write-Host ""

$API_URL = "http://localhost:3000/api/menu"

# Test 1: Health Check
Write-Host "📋 Test 1: Health Check" -ForegroundColor Yellow
Write-Host "GET $API_URL/health" -ForegroundColor Gray
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri "$API_URL/health" -Method Get
    $response | ConvertTo-Json -Depth 10
    Write-Host ""
    Write-Host "✅ Test 1 terminé" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur: $_" -ForegroundColor Red
}
Write-Host ""

# Test 2: Analyse Simple
Write-Host "📋 Test 2: Analyse d'un plat" -ForegroundColor Yellow
Write-Host "POST $API_URL/analyze" -ForegroundColor Gray
Write-Host ""

$body = @{
    plat = "Boeuf Bourguignon"
    ingredients = @("Boeuf 300g", "Carottes 200g", "Vin rouge 200ml")
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$API_URL/analyze" -Method Post -Body $body -ContentType "application/json"
    $response | ConvertTo-Json -Depth 10
    Write-Host ""
    Write-Host "✅ Test 2 terminé" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur: $_" -ForegroundColor Red
}
Write-Host ""

# Test 3: Analyse avec ingrédients complexes
Write-Host "📋 Test 3: Analyse avec ingrédients détaillés" -ForegroundColor Yellow
Write-Host "POST $API_URL/analyze" -ForegroundColor Gray
Write-Host ""

$body = @{
    plat = "Poulet Rôti aux Herbes"
    ingredients = @(
        "Poulet fermier 1.2kg",
        "Thym frais 20g",
        "Romarin 15g",
        "Ail 3 gousses",
        "Citron 1 pièce"
    )
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$API_URL/analyze" -Method Post -Body $body -ContentType "application/json"
    $response | ConvertTo-Json -Depth 10
    Write-Host ""
    Write-Host "✅ Test 3 terminé" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur: $_" -ForegroundColor Red
}
Write-Host ""

Write-Host "🧪 ========================================" -ForegroundColor Cyan
Write-Host "🧪  Tous les tests terminés !" -ForegroundColor Cyan
Write-Host "🧪 ========================================" -ForegroundColor Cyan
Write-Host ""
