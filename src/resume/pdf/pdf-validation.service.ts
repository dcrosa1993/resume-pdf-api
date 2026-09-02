import { Injectable } from '@nestjs/common';
import { PDFParse } from 'pdf-parse';

@Injectable()
export class PdfValidationService {
  async extractText(pdf: Buffer): Promise<{
    text: string;
    pageCount: number;
  }> {
    const parser = new PDFParse({
      data: pdf,
    });

    try {
      const result = await parser.getText();

      return {
        text: this.normalizeText(result.text),
        pageCount: result.total,
      };
    } finally {
      await parser.destroy();
    }
  }

  async validate(
    pdf: Buffer,
    expected: {
      fullName: string;
      jobTitle: string;
    },
  ) {
    const { text, pageCount } = await this.extractText(pdf);

    const checks = {
      validPdf: {
        valid: this.isPdf(pdf),
        message: this.isPdf(pdf)
          ? 'Valid PDF signature detected.'
          : 'Invalid PDF signature.',
      },

      textExtractable: {
        valid: text.length > 0,
        message:
          text.length > 0
            ? 'Text was successfully extracted from the PDF.'
            : 'No extractable text was found.',
      },

      hasName: {
        valid: this.containsText(text, expected.fullName),
        message: this.containsText(text, expected.fullName)
          ? 'Candidate name was found in extracted text.'
          : 'Candidate name was not found.',
      },

      hasJobTitle: {
        valid: this.containsText(text, expected.jobTitle),
        message: this.containsText(text, expected.jobTitle)
          ? 'Job title was found in extracted text.'
          : 'Job title was not found.',
      },

      hasExperience: {
        valid: this.containsText(text, 'Professional Experience'),
        message: this.containsText(text, 'Professional Experience')
          ? 'Professional Experience section was found.'
          : 'Professional Experience section was not found.',
      },

      hasSkills: {
        valid: this.containsText(text, 'Skills'),
        message: this.containsText(text, 'Skills')
          ? 'Skills section was found.'
          : 'Skills section was not found.',
      },
    };

    return {
      valid: Object.values(checks).every(
        (check) => check.valid,
      ),
      pageCount,
      textLength: text.length,
      text,
      checks,
    };
  }

  private isPdf(buffer: Buffer): boolean {
    return buffer.subarray(0, 5).toString() === '%PDF-';
  }

  private containsText(
    text: string,
    value: string,
  ): boolean {
    return text
      .toLowerCase()
      .includes(value.trim().toLowerCase());
  }

  private normalizeText(text: string): string {
    return text
      .replace(/\r/g, '')
      .replace(/[ \t]+/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }
}