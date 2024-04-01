import amqp from 'amqplib';

import { config } from 'dotenv';

config();

async function createAmqpConnection(vhost?: string): Promise<amqp.Connection> {
  const connection = await amqp.connect({
    hostname: process.env.RABBITMQ_HOST,
    username: process.env.RABBITMQ_USER,
    password: process.env.RABBITMQ_PASSWORD,
    port: Number(process.env.RABBITMQ_PORT),
    vhost,
  });
  return connection;
}

async function publish(value?: string) {
  const connection = await createAmqpConnection();
  const channel = await connection.createChannel();

  await channel.assertQueue('queue:socket', { durable: true });
  await channel.assertExchange('exchange:socket', 'direct', { durable: true });
  await channel.bindQueue('queue:socket', 'exchange:socket', 'rk:socket');
  const payload = JSON.stringify({ value });
  channel.publish('exchange:socket', 'rk:socket', Buffer.from(payload));
  console.log(`broker-publisher ${value}`);
}

let counter = 0;
setInterval(() => {
  counter++;
  publish(`${counter} process: ${process.pid}`);
}, 10);
