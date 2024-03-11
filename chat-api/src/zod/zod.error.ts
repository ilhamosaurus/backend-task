import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError)
export class ZodFilter<T extends ZodError> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const errors = exception.errors;
    const messages = errors.map((e) => e.message);
    response.status(400).json(messages);
  }
}
