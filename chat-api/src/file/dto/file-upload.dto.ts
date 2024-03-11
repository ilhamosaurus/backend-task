import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

export function ApiFile() {
  return applyDecorators(UseInterceptors(FileInterceptor('file')));
}
