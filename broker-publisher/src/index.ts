import amqp from 'amqplib';

async function createAmqpConnection(vhost?: string): Promise<amqp.Connection> {
  const connection = await amqp.connect({
    hostname: 'localhost',
    username: 'admin',
    password: 'admin',
    port: 5673,
    vhost,
  });
  const version = connection.connection.serverProperties.version;
  return connection;
}

async function publish(userId?: string) {
  const connection = await createAmqpConnection();
  const channel = await connection.createChannel();

  await channel.assertQueue('queue:user_login', { durable: true });
  await channel.assertExchange('exchange:user', 'direct', { durable: true });
  await channel.bindQueue('queue:user_login', 'exchange:user', 'rk:user');
  const payload = JSON.stringify({ userId });
  channel.publish('exchange:user', 'rk:user', Buffer.from(payload));
  console.log(`broker-publisher ${userId}`);
}

let counter = 0;
setInterval(() => {
  counter++;
  publish(`${counter} - ${process.pid}`);
}, 1);
