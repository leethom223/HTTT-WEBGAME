#!/bin/sh
PORT_NUM=${PORT:-8000}

echo "=== STARTING LARAVEL PRODUCTION CONTAINER ON PORT $PORT_NUM ==="

# Check/Generate App Key
if [ -z "$APP_KEY" ]; then
    php artisan key:generate --force
fi

# Ensure SQLite file exists if using sqlite
touch /app/database/database.sqlite 2>/dev/null || true

# Run database migrations and seeders
php artisan migrate --force
php artisan db:seed --force

# Start Laravel Server
echo "Laravel API is now LIVE on port $PORT_NUM!"
exec php artisan serve --host=0.0.0.0 --port=$PORT_NUM
