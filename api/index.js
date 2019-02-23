const express    = require('express');
const bodyParser = require('body-parser');
const amqp       = require('amqplib/callback_api');

const app  = express();
const port = 3000;

const mqcs = 'amqp://rabbitmq:rabbitmq@rabbitmq:5672';

app.use(bodyParser.json());

app.post('/publish', (req, res) => {
  const { exchange, key, body } = req.body;

  // Connect rabbitMq
  amqp.connect(mqcs, (err, conn) => {
    err && console.error(err);

    // Create channel
    conn.createChannel((err, channel) => {
      err && console.error(err);

      // Make sure exchange exists
      channel.assertExchange(exchange, 'topic', { durable: false });

      // Publish to exchange
      channel.publish(exchange, key, Buffer.from(body));

      console.log(`Sent '${body}' to '${exchange}' with key '${key}'`);

      setTimeout(() => conn.close(), 500);
    });
  });

  res.send();
});

app.listen(port, () => console.log(`App listening on port ${port}!`));