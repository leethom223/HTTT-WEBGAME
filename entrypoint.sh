#!/bin/sh
PORT_NUM="${PORT:-10000}"

echo "=== STARTING LARAVEL PRODUCTION CONTAINER ON PORT $PORT_NUM ==="

# Check/Generate App Key
if [ -z "$APP_KEY" ]; then
    php artisan key:generate --force
fi

# Ensure SQLite file exists if using sqlite
touch /app/database/database.sqlite 2>/dev/null || true

# Clear caches for fresh boot
php artisan config:clear 2>/dev/null || true
php artisan route:clear 2>/dev/null || true

# Run database migrations and seeders in background so port binds instantly
(
    sleep 1
    echo "Running background migrations and seeds..."
    php artisan migrate --force || echo "Migration notice"
    php artisan db:seed --force || echo "Seeding notice"
) &

# Start PHP Built-in Server IMMEDIATELY to satisfy Render health check
echo "Laravel API is now serving on 0.0.0.0:$PORT_NUM with server.php router..."
exec php -S 0.0.0.0:$PORT_NUM server.php
