FROM php:7.1-apache

# Install PHP extensions and PECL modules.
RUN buildDeps=" \
        libbz2-dev \
        libmysqlclient-dev \
        libsasl2-dev \
    " \
    runtimeDeps=" \
        curl \
        vim \
        git \
        libfreetype6-dev \
        libicu-dev \
        libjpeg-dev \
        libldap2-dev \
        libmcrypt-dev \
        libpng12-dev \
        libpq-dev \
        libxml2-dev \
        libxslt-dev \
    " \
    && apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y $buildDeps $runtimeDeps \
    && docker-php-ext-install bcmath bz2 calendar iconv intl mbstring mcrypt mysqli opcache pdo_mysql pdo_pgsql pgsql soap zip xsl \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install gd \
    && docker-php-ext-configure ldap --with-libdir=lib/x86_64-linux-gnu/ \
    && docker-php-ext-install ldap \
    && apt-get purge -y --auto-remove $buildDeps \
    && rm -r /var/lib/apt/lists/* \
    && a2enmod rewrite

ENV COMPOSER_HOME /root/composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/var/www/html --filename=composer
