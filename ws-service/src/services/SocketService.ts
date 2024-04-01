import {
  IWebSocketsAdapter,
  WSHandler,
} from '../adapters/interfaces/IWebSocketsAdapter';

export class SocketService {
  constructor(private webSocketsAdapter: IWebSocketsAdapter) {}

  createWSServer() {
    this.webSocketsAdapter.createWebSocketServer();
  }

  on(channel: string, handler: WSHandler) {
    this.webSocketsAdapter.on(channel, handler);
  }

  send(channel: string, payload: any) {
    this.webSocketsAdapter.send(channel, payload);
  }
}
