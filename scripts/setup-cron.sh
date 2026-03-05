#!/bin/bash

# Script para configurar cron job local para el scraper multi-país
# Ejecutar con: chmod +x scripts/setup-cron.sh && ./scripts/setup-cron.sh

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# Se ejecuta a diario, pero el propio script respeta una frecuencia de 3 días por país.
CRON_COMMAND="0 9 * * * cd $PROJECT_DIR && npm run scrape:news:all >> $PROJECT_DIR/logs/scraper.log 2>&1"

echo "🔧 Configurando cron job para scraper de noticias..."
echo "📁 Directorio del proyecto: $PROJECT_DIR"

# Crear directorio de logs
mkdir -p "$PROJECT_DIR/logs"

# Verificar si el cron job ya existe
if crontab -l 2>/dev/null | grep -q "npm run scrape:news:all"; then
    echo "⚠️  El cron job ya existe. Eliminando el anterior..."
    crontab -l 2>/dev/null | grep -v "npm run scrape:news:all" | crontab -
fi

# Añadir el nuevo cron job
echo "➕ Añadiendo nuevo cron job..."
(crontab -l 2>/dev/null; echo "$CRON_COMMAND") | crontab -

echo "✅ Cron job configurado exitosamente!"
echo "📅 Se ejecutará todos los días a las 9:00 AM (cada país respeta ciclo de 3 días)"
echo "📋 Para ver los cron jobs actuales: crontab -l"
echo "📝 Los logs se guardarán en: $PROJECT_DIR/logs/scraper.log"
echo ""
echo "🧪 Para probar manualmente: npm run scrape:news:all"
