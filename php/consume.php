<?php

use Enqueue\AmqpExt\AmqpConnectionFactory;
use Interop\Amqp\AmqpConsumer;
use Interop\Amqp\AmqpQueue;
use Interop\Amqp\AmqpTopic;
use Interop\Amqp\Impl\AmqpBind;

require_once __DIR__ . '/vendor/autoload.php';

$factory = new AmqpConnectionFactory('amqp://rabbitmq:rabbitmq@rabbitmq:5672');

$context = $factory->createContext();

[, $exchange, $routingKey] = $argv;

if ((string)$exchange === '' || (string)$routingKey === '') {
    print <<<EOF
Consume messages from the exchange by routing key.

Usage:
php consume.php [exchange] [routingKey]

Example:
php consume.php my-exchange my.events.*


EOF;

    exit;
}

/** @var AmqpTopic $topic */
$topic = $context->createTopic($exchange);
$topic->setType('topic');

$context->declareTopic($topic);

/** @var AmqpQueue $queue */
$queue = $context->createQueue('php');
$queue->setFlags(AmqpQueue::FLAG_EXCLUSIVE);

$context->declareQueue($queue);

$context->bind(new AmqpBind($topic, $queue, $routingKey));

/** @var AmqpConsumer $consumer */
$consumer = $context->createConsumer($queue);

while (true) {
    $message = $consumer->receive();

    if (!$message) {
        continue;
    }

    printf(
        "Received message: exchange: \"%s\", routing key: \"%s\", body: \"%s\"\n",
        $exchange,
        $message->getRoutingKey(),
        $message->getBody()
    );
}
