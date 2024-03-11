import { z } from 'zod';

export const CreateMessageSchema = z.object({
  message: z.string().min(1, { message: 'message is required' }),
  /**
   * @description
   * @alias to
   * using username as recipient identifier
   */
  to: z.string().min(1, { message: 'Recepient is required' }),
  from: z.string().min(1, { message: 'Sender username is required' }),
});

export interface CreateMessageDto extends z.infer<typeof CreateMessageSchema> {}
