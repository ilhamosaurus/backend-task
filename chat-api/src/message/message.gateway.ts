import { Logger } from '@nestjs/common';
import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway()
export class MessageGateway implements OnGatewayInit {
  private logger: Logger = new Logger('MessageGateway');

  afterInit(server: any) {
    this.logger.log(`initialized`);
  }
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
