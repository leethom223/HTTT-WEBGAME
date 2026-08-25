#!/bin/sh

# Set port from Render environment variable
PORT_NUM=${PORT:-8000}

echo "=== STARTING LARAVEL PRODUCTION CONTAINER ON PORT $PORT_NUM ==="

# Check/Generate App Key
if [ -z "$APP_KEY" ]; then
    php artisan key:generate --force
fi

# Run database migrations and seeders gracefully
echo "Running database migrations..."
php artisan migrate --force || echo "Migration warning: could not connect to remote DB immediately"

echo "Running seeders..."
php artisan db:seed --force || echo "Seeding warning: skipped"

# Start Laravel Server
echo "Laravel API is now LIVE on port $PORT_NUM!"
exec php artisan serve --host=0.0.0.0 --port=$PORT_NUM
