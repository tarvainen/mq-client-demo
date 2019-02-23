#!/usr/bin/env python

import pika
import sys

credentials = pika.PlainCredentials('rabbitmq', 'rabbitmq')

connection = pika.BlockingConnection(
    pika.ConnectionParameters(
        'rabbitmq',
         5672,
        '/',
        credentials
    )
)

# Create channel
channel = connection.channel()

exchange   = sys.argv[1]
routingKey = sys.argv[2]

channel.exchange_declare(
    exchange=exchange,
    exchange_type='topic'
)

# Create exclusive queue
result = channel.queue_declare(exclusive=True)
queue_name = result.method.queue

# Bind queue to exchange with routing key
channel.queue_bind(
    exchange=exchange,
    queue=queue_name,
    routing_key=routingKey
)

def callback(ch, method, properties, body):
    print(
        'Received message: exchange: \"%s\", routing key: \"%s\", body: \"%s\"' %
         (exchange, method.routing_key, body.decode('utf-8'))
    )

channel.basic_consume(
    callback,
    queue=queue_name,
    no_ack=True
)

channel.start_consuming()