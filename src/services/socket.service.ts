import socketIOClient from 'socket.io-client';
import { serverUrl } from './data.service';

enum IncomingMessages {
  General = 'general',
}

export enum OutgoingMessages {
  General = 'general',
}

export class SocketService {
  private _socket: SocketIOClient.Socket;

  constructor() {
    this._socket = socketIOClient(serverUrl, { autoConnect: false });
  }

  public connect(): void {
    this._socket.connect();
  }

  public disconnect(): void {
    this._socket.disconnect();
  }

  public onNewData() {}

  public onDataChange() {}

  public onGeneral() {}

  public send(message: OutgoingMessages, data?: any): void {
    this._socket.emit(message, data);
  }

  //#region Helper Methods

  //#endregion Helper Methods
}
