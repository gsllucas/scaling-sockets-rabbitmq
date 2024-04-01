import { IWebSocketsAdapter, WSHandler } from './interfaces/IWebSocketsAdapter';
import { Server } from 'socket.io';
import { createServer } from 'http';

import express from 'express';

export class SocketIOWebSocketAdapter implements IWebSocketsAdapter {
  private wsServer: Server;

  constructor() {}

  async createWebSocketServer(): Promise<void> {
    const app = express();
    const httpServer = createServer(app);
    const wsServer = new Server(httpServer);
    this.wsServer = wsServer;
    const WS_PORT = Number(process.env.WS_PORT) || 8083;
    wsServer.listen(WS_PORT);
  }

  on(channel: string, handler: WSHandler): void {
    this.wsServer.on(channel, handler);
  }

  send(channel: string, payload: any): void {
    this.wsServer.emit(channel, payload);
  }
}
