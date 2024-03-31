import amqp from 'amqplib';
import express from 'express';

import { rabbitmqBroker } from './broker/RabbitMQBroker';
import { config } from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { socketIO } from './socket/SocketIO';
import { sleep } from '../../util/sleep';

config();

import './events';
import { onUserLogin } from './functions/onUserLogin';

const app = express();
const httpServer = createServer(app);

const socketServer = new Server(httpServer);

async function listenPublish() {
  const amqp = await rabbitmqBroker.createConnection();
  const channel = await amqp.createChannel();
  await channel.assertQueue('queue:user_login', { durable: true });
  channel.prefetch(200);
  channel.consume('queue:user_login', async (payload) => {
    if (!payload?.content.toString()) return;
    const data = payload?.content.toString();
    console.log('published to queue:user_login:', JSON.parse(data).userId);
    await sleep();
    channel.ack(payload);
    socketServer.emit('socket:user_login', data);
  });
}

listenPublish();

httpServer.listen(8080);
