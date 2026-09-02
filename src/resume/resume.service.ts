import { Injectable } from '@nestjs/common';
import { PdfService } from './pdf/pdf.service.js';
import { PdfValidationService } from './pdf/pdf-validation.service.js';
import { CreateResumeDto } from './dto/create-resume.dto.js';

@Injectable()
export class ResumeService {
  constructor(
    private readonly pdfService: PdfService,
    private readonly pdfValidationService: PdfValidationService,
  ) {}

  async generatePdf(
    resume: CreateResumeDto,
  ): Promise<Buffer> {
    const pdf =
      await this.pdfService.generateResumePdf(resume);

    const fullName =
      `${resume.personal.firstName} ${resume.personal.lastName}`;

    const validation =
      await this.pdfValidationService.validate(pdf, {
        fullName,
        jobTitle: resume.personal.jobTitle,
      });

    if (!validation.valid) {
      console.error(
        'Generated PDF failed validation:',
        validation,
      );
    }

    return pdf;
  }
}