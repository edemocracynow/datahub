const amqp = require('amqplib/callback_api');
const rabbit = process.env.RABBIT_HOST || "localhost:5672";
const user = process.env.RABBIT_USER || "bureaudevote";
const pass = process.env.RABBIT_PASSWORD || "bureaudevote";

amqp.connect(`amqp://${user}:${pass}@${rabbit}`, function(error, connection) {
  if (error) {
    throw error;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    let queue = 'admin';
    let msg = 'Test message';

    channel.assertQueue(queue, {
      durable: true
    });
    channel.sendToQueue(queue, Buffer.from(msg), {
      persistent: true
    });
    console.log("Sent '%s'", msg);
  });
  setTimeout(function() {
    connection.close();
    process.exit(0)
  }, 500);
});