import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';

@Injectable()
export class ParseResumeMultipartInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();

    /*
     * multipart/form-data sends the resume
     * as a JSON string.
     *
     * Convert:
     *
     * {
     *   resume: "{ ... }"
     * }
     *
     * into:
     *
     * {
     *   template: "...",
     *   personal: { ... },
     *   ...
     * }
     */

    if (request.body && typeof request.body.resume === 'string') {
      try {
        request.body = JSON.parse(request.body.resume);
      } catch {
        throw new BadRequestException({
          message: ['The "resume" field must contain valid JSON.'],
          error: 'Bad Request',
          statusCode: 400,
        });
      }
    }

    return next.handle();
  }
}
