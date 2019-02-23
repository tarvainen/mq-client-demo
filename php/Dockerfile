FROM php:7.3

RUN apt-get update \
      && apt-get install -y \
         zip nano librabbitmq-dev git

# Install amqp-ext
RUN pecl install amqp \
    && docker-php-ext-enable amqp \
    && docker-php-ext-install bcmath sockets

# Install composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && php -r "unlink('composer-setup.php');"

WORKDIR /app

COPY . .

RUN composer install
