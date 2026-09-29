import { PdfValidationService } from './pdf/pdf-validation.service.js';
import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  Header,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateResumeDto } from './dto/create-resume.dto.js';
import { ResumeService } from './resume.service.js';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import type { Multer } from 'multer';

import { ParseResumeBodyPipe } from './pipes/parse-resume-body.pipe.js';

@ApiTags('Resume')
@Controller('resume')
export class ResumeController {
  constructor(
    private readonly resumeService: ResumeService,
    private readonly pdfValidationService: PdfValidationService,
  ) {}

  @Post('pdf')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('photo'))
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiOperation({
    summary: 'Generate resume PDF',
    description:
      'Generates an ATS/AI-friendly resume PDF. The resume can be sent as JSON or as a JSON string inside multipart/form-data. A profile photo can optionally be uploaded using the "photo" field.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['resume'],
      properties: {
        resume: {
          type: 'string',
          description: 'JSON string containing the resume data.',
          example: JSON.stringify({
            template: 'modern',
            personal: {
              firstName: 'John',
              lastName: 'Doe',
              jobTitle: 'Senior Software Engineer',
              email: 'john.doe@example.com',
            },
            experience: [],
            skills: {
              technical: [],
              soft: [],
            },
          }),
        },
        photo: {
          type: 'string',
          format: 'binary',
          description:
            'Optional profile photo. Supported formats: JPEG, PNG and WebP.',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Resume PDF generated successfully.',
    content: {
      'application/pdf': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid resume data or invalid profile photo.',
  })
  async generatePdf(
    @Body(ParseResumeBodyPipe)
    resume: CreateResumeDto,

    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,

        validators: [
          new MaxFileSizeValidator({
            maxSize: 3 * 1024 * 1024,
          }),

          new FileTypeValidator({
            fileType: /^image\/(jpeg|png|webp)$/,
          }),
        ],
      }),
    )
    photo:
      | {
          buffer: Buffer;
          mimetype: string;
        }
      | undefined,

    @Res()
    response: Response,
  ): Promise<void> {
    const pdf = await this.resumeService.generatePdf(resume, photo);

    response
      .status(HttpStatus.OK)
      .type('application/pdf')
      .setHeader('Content-Disposition', 'attachment; filename="resume.pdf"')
      .send(pdf);
  }
}
