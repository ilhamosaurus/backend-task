import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ServerToClientEvents } from './types/chat';
import { Message } from '@prisma/client';
import { Logger, UseGuards } from '@nestjs/common';
import { WsJwtGuard } from 'src/auth/ws-jwt/ws-jwt.guard';
import { SocketAuthMiddleware } from 'src/auth/ws.mw';

@WebSocketGateway({ namespace: 'chat', cors: { origin: '*' } })
// @UseGuards(WsJwtGuard)
export class ChatGateway {
  @WebSocketServer()
  server: Server<any, ServerToClientEvents>;

  // ! not sure how to implements this
  // afterInit(client: Socket) {
  //   client.use(SocketAuthMiddleware);
  //   Logger.log('afterInit');
  // }

  sendMessage(message: Message) {
    this.server.emit('newMessage', message);
  }

  allMessages(messages: Message[]) {
    this.server.emit('allMessages', messages);
  }
}
