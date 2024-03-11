import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    this.schema.parse(value);
    return value;
  }
}
