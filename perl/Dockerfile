FROM perl

RUN apt-get update && apt-get install -y \
        make \
        libclass-data-inheritable-perl \
        libtest-deep-perl \
        libmoosex-app-cmd-perl \
        libcoro-perl \
        libjson-xs-perl \
        libxml-libxml-perl \
        libconfig-any-perl \
        libmoosex-attributehelpers-perl \
        libmoosex-configfromfile-perl \
        libtest-exception-perl \
        libfile-sharedir-perl \
        libreadonly-xs-perl \
        libuuid-tiny-perl

RUN cpan -i Net::RabbitFoot

WORKDIR /app

COPY . .
