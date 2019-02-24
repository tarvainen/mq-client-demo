const amqp = require('amqplib/callback_api');

const [,, exchange, routingKey] = process.argv;

amqp.connect('amqp://rabbitmq:rabbitmq@rabbitmq:5672', (err, conn) => {
  err && console.error(err);

  conn.createChannel((err, channel) => {
    err && console.error(err);

    channel.assertExchange(exchange, 'topic', { durable: false });

    channel.assertQueue('', { exclusive: true }, (err, q) => {
      channel.bindQueue(q.queue, exchange, routingKey);

      channel.consume(q.queue, (msg) => {
        console.log(
          'Received message: exchange: "%s", routing key: "%s", body: "%s"',
          exchange,
          routingKey,
          msg.content.toString()
        );
      });
    });
  });
});