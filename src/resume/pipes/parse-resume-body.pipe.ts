import {
  BadRequestException,
  Injectable,
  PipeTransform,
  ValidationError,
} from '@nestjs/common';

import { plainToInstance } from 'class-transformer';

import { validate } from 'class-validator';

import { CreateResumeDto } from '../dto/create-resume.dto.js';

@Injectable()
export class ParseResumeBodyPipe implements PipeTransform {
  async transform(value: unknown): Promise<CreateResumeDto> {
    let resumeData: unknown;

    /*
     * application/json
     *
     * Body:
     * {
     *   "template": "modern",
     *   "personal": { ... }
     * }
     */
    if (this.isObject(value) && typeof value['resume'] !== 'string') {
      resumeData = value;
    }

    /*
     * multipart/form-data
     *
     * resume:
     * "{ \"template\": \"modern\", ... }"
     */
    else if (this.isObject(value) && typeof value['resume'] === 'string') {
      try {
        resumeData = JSON.parse(value['resume']);
      } catch {
        throw new BadRequestException({
          message: ['The "resume" field must contain valid JSON.'],
          error: 'Bad Request',
          statusCode: 400,
        });
      }
    } else {
      throw new BadRequestException({
        message: ['Resume data is required.'],
        error: 'Bad Request',
        statusCode: 400,
      });
    }

    const resume = plainToInstance(CreateResumeDto, resumeData);

    const errors = await validate(resume, {
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    });

    if (errors.length > 0) {
      throw new BadRequestException({
        message: this.flattenErrors(errors),
        error: 'Bad Request',
        statusCode: 400,
      });
    }

    return resume;
  }

  private isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }

  private flattenErrors(errors: ValidationError[], parentPath = ''): string[] {
    return errors.flatMap((error) => {
      const currentPath = parentPath
        ? `${parentPath}.${error.property}`
        : error.property;

      const messages = error.constraints
        ? Object.values(error.constraints).map(
            (message) => `${currentPath} ${message}`,
          )
        : [];

      const children = error.children?.length
        ? this.flattenErrors(error.children, currentPath)
        : [];

      return [...messages, ...children];
    });
  }
}
