export type WSHandler = (...args: any[]) => void;

export declare abstract class IWebSocketsAdapter {
  createWebSocketServer(): Promise<void>;
  on(channel: string, handler: WSHandler): void;
  send(channel: string, payload: any): void;
}
