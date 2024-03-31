import { rabbitmqBroker } from '../broker/RabbitMQBroker';
import { socketIO } from '../socket/SocketIO';

import { Socket } from 'socket.io';

export async function onUserLogin(socket: Socket) {
  const amqp = await rabbitmqBroker.createConnection();
  const channel = await amqp.createChannel();
  await channel.assertQueue('queue:user_login', { durable: true });
  channel.prefetch(50);
  channel.consume('queue:user_login', (payload) => {
    if (!payload) return;
    const data = payload?.content.toString();
    const payloadData = JSON.stringify(data);
    socket.emit('socket:user_login', payloadData);
    channel.ack(payload);
    console.log('published to queue:user_login:', JSON.parse(data).userId);
  });
}
