import { PdfValidationService } from './pdf/pdf-validation.service.js';
import {
  BadRequestException,
  Body,
  Controller,
  Header,
  HttpCode,
  HttpStatus,
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

@ApiTags('Resume')
@Controller('resume')
export class ResumeController {
  constructor(
    private readonly resumeService: ResumeService,
    private readonly pdfValidationService: PdfValidationService,
  ) {}

  @Post('pdf')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Generate resume PDF',
    description:
      'Receives resume information and generates an ATS/AI-friendly PDF.',
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
    description: 'Invalid resume data.',
  })
  @Header('Content-Type', 'application/pdf')
  async generatePdf(
    @Body() resume: CreateResumeDto,
    @Res() response: Response,
  ): Promise<void> {
    const pdf = await this.resumeService.generatePdf(resume);

    response.setHeader(
      'Content-Disposition',
      'attachment; filename="resume.pdf"',
    );

    response.send(pdf);
  }
@Post('pdf/validate')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('file'),
  )
  @ApiOperation({
    summary: 'Analyze PDF text extraction',
    description:
      'Analyzes a PDF and returns the text extracted from it. Useful for verifying ATS/AI readability.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['file'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'PDF analyzed successfully.',
  })
  async validatePdf(
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException(
        'PDF file is required.',
      );
    }

    if (file.mimetype !== 'application/pdf') {
      throw new BadRequestException(
        'Only PDF files are allowed.',
      );
    }

    return this.pdfValidationService.extractText(
      file.buffer,
    );
  }
}