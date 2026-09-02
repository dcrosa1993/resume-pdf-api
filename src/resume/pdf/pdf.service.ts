import { Injectable, OnModuleDestroy } from '@nestjs/common';
import puppeteer, { Browser } from 'puppeteer';
import { CreateResumeDto } from '../dto/create-resume.dto.js';
import { RESUME_TEMPLATES } from '../templates/template.registry.js';
import { ResumeTemplate } from '../templates/template.types.js';

@Injectable()
export class PdfService implements OnModuleDestroy {
  private browser: Browser | null = null;

  private async getBrowser(): Promise<Browser> {
    if (this.browser) {
      return this.browser;
    }

    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    return this.browser;
  }

  async generateResumePdf(resume: CreateResumeDto): Promise<Buffer> {
    const browser = await this.getBrowser();
    const page = await browser.newPage();

    try {
      const template = resume.template ?? ResumeTemplate.CLASSIC;

      const renderer = RESUME_TEMPLATES[template];

      if (!renderer) {
        throw new Error(`Resume template "${template}" is not available.`);
      }

      const html = renderer(resume);

      await page.setContent(html, {
        waitUntil: 'load',
      });

      const pdf = await page.pdf({
        format: 'Letter',
        printBackground: true,
        preferCSSPageSize: false,
        margin: {
          top: '0.55in',
          right: '0.6in',
          bottom: '0.55in',
          left: '0.6in',
        },
      });

      return Buffer.from(pdf);
    } finally {
      await page.close();
    }
  }
  async onModuleDestroy(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}
