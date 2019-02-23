# Cross-app events using RabbitMq

Simple example how to handle events between multiple applications written in several languages using RabbitMq.

```
docker-compose up -d
```

## Services

### Api

**Use `api` to publish messages to RabbitMq topics.**

Available at [localhost:3000](http://localhost:3000)

### RabbitMQ

**RabbitMq provides the messaging infrastructure.**

Management console available at [localhost:15672](http://localhost:15672)