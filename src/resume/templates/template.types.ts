import {
  CreateResumeDto,
} from '../dto/create-resume.dto.js';

export enum ResumeTemplate {
  CLASSIC = 'classic',
  MODERN = 'modern',
  COMPACT = 'compact',
  SHOWCASE = 'showcase',
}

export interface ResumeTemplateContext {
  photoDataUrl?: string;
}

export type ResumeTemplateRenderer = (
  resume: CreateResumeDto,
  context?: ResumeTemplateContext,
) => string;