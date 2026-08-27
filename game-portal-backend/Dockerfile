FROM php:8.3-cli-alpine

# Install system dependencies, zip tools & PHP extensions
RUN apk add --no-cache \
    curl \
    git \
    unzip \
    zip \
    libpng-dev \
    libxml2-dev \
    libzip-dev \
    oniguruma-dev \
    ca-certificates \
    && update-ca-certificates \
    && docker-php-ext-install pdo pdo_mysql mbstring bcmath gd zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Set Composer environment flags
ENV COMPOSER_ALLOW_SUPERUSER=1
ENV COMPOSER_NO_INTERACTION=1

# Copy composer files first for optimal caching
COPY composer.json composer.lock* ./

# Install dependencies reliably without scripts
RUN composer install --no-dev --prefer-dist --no-scripts --no-progress --optimize-autoloader

# Copy application files
COPY . .

# Re-run autoloader with full code
RUN composer dump-autoload --optimize --no-scripts

# Copy entrypoint & server scripts
COPY entrypoint.sh .
COPY server.php .
RUN chmod +x entrypoint.sh

# Set directory permissions
RUN chown -R www-data:www-data /app \
    && chmod -R 775 /app/storage /app/bootstrap/cache

EXPOSE 8000 10000

CMD ["/bin/sh", "entrypoint.sh"]
