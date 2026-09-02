import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller.js';
import { ResumeService } from './resume.service.js';
import { PdfService } from './pdf/pdf.service.js';
import { PdfValidationService } from './pdf/pdf-validation.service.js';

@Module({
  controllers: [ResumeController],
  providers: [ResumeService, PdfService, PdfValidationService]
})
export class ResumeModule {}
