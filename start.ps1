# Script de Inicio Rápido - Recuerdos Inolvidables

Write-Host "🎁 Iniciando Recuerdos Inolvidables..." -ForegroundColor Cyan
Write-Host ""

# Verificar si node_modules existe
if (-Not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

# Verificar si existe .env
if (-Not (Test-Path ".env")) {
    Write-Host "⚠️  No se encontró archivo .env" -ForegroundColor Red
    Write-Host "📝 Copiando .env.example a .env..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host ""
    Write-Host "✏️  Por favor edita el archivo .env con tus credenciales antes de continuar" -ForegroundColor Yellow
    Write-Host "Presiona Enter cuando hayas configurado el archivo .env..."
    Read-Host
}

Write-Host "🚀 Iniciando servidor de desarrollo..." -ForegroundColor Green
Write-Host ""
Write-Host "📱 La aplicación estará disponible en:" -ForegroundColor Cyan
Write-Host "   http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "🔧 Para probar con Netlify Functions, usa:" -ForegroundColor Cyan
Write-Host "   npm run netlify:dev" -ForegroundColor White
Write-Host ""

npm run dev
