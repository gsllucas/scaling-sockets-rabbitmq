import { config } from 'dotenv';
import { SocketService } from './services/SocketService';
import { SocketIOWebSocketAdapter } from './adapters/SocketIOWebSocketAdapter';
import { createAMQPConsumer } from './broker/functions/createBrokerConsumer';
import { parseJSON } from './util/parseJSON';
import { stringifyJSON } from './util/stringifyJSON';

config();

const socketIOSocketAdapter = new SocketIOWebSocketAdapter();
const webSockets = new SocketService(socketIOSocketAdapter);

webSockets.createWSServer();

createAMQPConsumer(
  { queue: 'queue:socket', prefetchCount: 50, options: { durable: true } },
  async (payload) => {
    const queueData = parseJSON(payload?.content.toString()!);
    webSockets.send(queueData.socketChannel, stringifyJSON(queueData.data));
    console.log('consumer-payload', queueData);
  }
);
