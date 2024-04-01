import { config } from 'dotenv';
import { SocketService } from './services/SocketService';
import { SocketIOWebSocketAdapter } from './adapters/SocketIOWebSocketAdapter';
import { createAMQPConsumer } from './broker/functions/createBrokerConsumer';

config();

const socketIOSocketAdapter = new SocketIOWebSocketAdapter();
const webSockets = new SocketService(socketIOSocketAdapter);

webSockets.createWSServer();

createAMQPConsumer(
  { queue: 'queue:socket', prefetchCount: 50, options: { durable: true } },
  async (payload) => {
    const payloadData = payload?.content.toString();
    webSockets.send('queue:socket', payloadData);
    console.log('consumer-payload', JSON.parse(payloadData!));
  }
);
