FROM php:8.3-cli-alpine

# Install system dependencies & PHP extensions
RUN apk add --no-cache \
    curl \
    git \
    unzip \
    libpng-dev \
    libxml2-dev \
    libzip-dev \
    oniguruma-dev \
    ca-certificates \
    && update-ca-certificates \
    && docker-php-ext-install pdo pdo_mysql mbstring bcmath gd zip

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copy application files
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Copy entrypoint & server scripts
COPY entrypoint.sh .
COPY server.php .
RUN chmod +x entrypoint.sh

# Set directory permissions
RUN chown -R www-data:www-data /app \
    && chmod -R 775 /app/storage /app/bootstrap/cache

EXPOSE 8000 10000

CMD ["/bin/sh", "entrypoint.sh"]
