import { Server, Socket } from 'socket.io';

class SocketIO {
  private _socket: Socket;

  set socket(socket: Socket) {
    this.socket = socket;
  }

  get socket() {
    return this._socket;
  }
}
const socketIO = new SocketIO();

export { socketIO };
