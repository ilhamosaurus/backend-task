import { Message } from '@prisma/client';

export interface ServerToClientEvents {
  newMessage: (payload: Message) => void;
  allMessages: (payload: Message[]) => void;
}
