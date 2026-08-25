# Production Dockerfile for Laravel 11 Backend on Render
FROM php:8.3-cli-alpine

WORKDIR /app

# Install system dependencies & PHP extensions
RUN apk add --no-cache \
    mysql-client \
    curl \
    git \
    libpng-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev \
    ca-certificates \
    && docker-php-ext-install pdo pdo_mysql zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy project backend files
COPY game-portal-backend/ .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Set permissions
RUN chmod -R 777 storage bootstrap/cache && chmod +x entrypoint.sh

EXPOSE 8000 10000

CMD ["/bin/sh", "entrypoint.sh"]
