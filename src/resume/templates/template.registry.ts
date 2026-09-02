import { CreateResumeDto } from '../dto/create-resume.dto.js';
import { ResumeTemplate } from './template.types.js';
import { buildClassicResumeHtml } from './classic.template.js';
import { buildModernResumeHtml } from './modern.template.js';
import { buildCompactResumeHtml } from './compact.template.js';

export type ResumeTemplateRenderer = (
  resume: CreateResumeDto,
) => string;

export const RESUME_TEMPLATES: Record<
  ResumeTemplate,
  ResumeTemplateRenderer
> = {
  [ResumeTemplate.CLASSIC]: buildClassicResumeHtml,
  [ResumeTemplate.MODERN]: buildModernResumeHtml,
  [ResumeTemplate.COMPACT]: buildCompactResumeHtml,
};