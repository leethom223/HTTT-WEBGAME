#!/bin/sh
PORT_NUM="${PORT:-10000}"

echo "=== STARTING LARAVEL PRODUCTION CONTAINER ON PORT $PORT_NUM ==="

# Check/Generate App Key
if [ -z "$APP_KEY" ]; then
    php artisan key:generate --force
fi

# Ensure SQLite file exists if using sqlite
touch /app/database/database.sqlite 2>/dev/null || true

# Run database migrations and seeders
php artisan migrate --force || echo "Migration notice"
php artisan db:seed --force || echo "Seeding notice"

# Clear caches for fresh boot
php artisan config:clear
php artisan route:clear

# Start PHP Built-in Server with server.php router
echo "Laravel API is now serving on 0.0.0.0:$PORT_NUM with server.php router..."
exec php -S 0.0.0.0:$PORT_NUM server.php
