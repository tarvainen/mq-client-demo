# Cross-app events using RabbitMq

Simple example how to handle events between multiple applications written in several languages using RabbitMq.

```
docker-compose up -d
```

## Services

### Api

**Simple api to publish messages to RabbitMq topics.**

Available at [localhost:3000](http://localhost:3000)

```
curl --request POST \
  --url http://localhost:3000/publish \
  --header 'content-type: application/json' \
  --data '{
     "exchange": "my-exchange",
     "body": "my-body",
     "key": "my.event.created"
  }'
```

### RabbitMQ

**RabbitMq provides the messaging infrastructure.**

Management console available at [localhost:15672](http://localhost:15672)

### PHP

**Use PHP client to consume messages**

This example uses [php-enqueue/enqueue-dev](https://github.com/php-enqueue/enqueue-dev)

**Usage:**
```
docker-compose exec php php consume.php my exchange
```

### Perl

**Use Perl client to consume messages**

This example uses [Net::RabbitFoot](https://metacpan.org/pod/Net::RabbitFoot) in RabbitMq communication

**Usage:**
```
docker-compose exec perl perl consume.pl my exchange
```

### Python

**Use Python to consume messages**

This example uses [pika](https://github.com/pika/pika) in RabbitMq communication

**Usage:**
```
docker-compose exec python python consume.py my exchange
```

### Nodejs

**Use Nodejs to consume messages**

This example uses [amqplib](https://www.npmjs.com/package/amqplib) in RabbitMq communication.

**Usage:**
```
docker-compose exec nodejs node consume.js my exchange
```
